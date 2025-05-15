let state = Object.freeze({
    account: null
});

const storageKey = 'savedAccount';
const routes = {
    '/login': { templateId: 'login' },
    '/dashboard': { templateId: 'dashboard', init: refresh },
    '/send-money': { templateId: 'send-money' },
};

function onLinkClick(event) {
    event.preventDefault();
    const path = event.target.getAttribute('href');
    navigate(path);
};

function navigate(path) {
    window.history.pushState({}, path, path);
    updateRoute();
};

function updateRoute() {
    const path = window.location.pathname;
    const route = routes[path];

    if (!route) {
        return navigate('/login');
    }

    const template = document.getElementById(route.templateId);
    const view = template.content.cloneNode(true);
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(view);

    if (route.init) {
        route.init();
    }
};

async function register() {
    const registerForm = document.getElementById('registerForm');
    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData);
    const jsonData = JSON.stringify(data);
    const result = await createAccount(jsonData);
    updateState('account', result);

    if (result.error) {
        if (result.error == 'User already exists') {
            return console.log('This one already exists');
        }
        return console.log('An error occurred:', result.error);
    }
    console.log('Account created!', result);
    navigate('/dashboard');
};

async function createAccount(account) {
    try {
        const response = await fetch('//localhost:8080/api/accounts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: account
        });
        return await response.json();
    } catch (error) {
        return { error: error.message || 'Unknown error' };
    }
}

async function getAccount(user) {
    try {
        const response = await fetch('//localhost:8080/api/accounts/' + encodeURIComponent(user));
        return await response.json();
    } catch (error) {
        return { error: error.message || 'Unknown error' };
    }
}

async function login() {
    const loginForm = document.getElementById('loginForm');
    const user = loginForm.user.value;
    const data = await getAccount(user);

    if (data.error) {
        return console.log('loginError', data.error);
    }

    updateState('account', data);
    navigate('/dashboard');
}

function updateElement(id, textOrNode) {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`Element with id '${id}' not found`);
        return;
    }
    element.textContent = '';
    element.append(textOrNode);
}

function updateDashboard() {
    const account = state.account;

    if (!account) {
        return navigate('/login');
    }

    const elements = {
        description: document.getElementById('description'),
        name: document.getElementById('name'),
        balance: document.getElementById('balance'),
        currency: document.getElementById('currency'),
        transactions: document.getElementById('transactions')
    };

    if (elements.description) elements.description.textContent = account.description || '';
    if (elements.name) elements.name.textContent = account.user || '';
    if (elements.balance) elements.balance.textContent = account.balance.toFixed(2);
    if (elements.currency) elements.currency.textContent = account.currency;

    const transactionsBody = document.querySelector('#transactions tbody');
    if (transactionsBody) {
        transactionsBody.innerHTML = '';
        const transactionsRows = document.createDocumentFragment();
        for (const transaction of account.transactions) {
            const transactionRow = createTransactionRow(transaction);
            transactionsRows.appendChild(transactionRow);
        }
        transactionsBody.appendChild(transactionsRows);
    }
}

function createTransactionRow(transaction) {
    const template = document.getElementById('transaction');
    if (!template) {
        console.warn('Transaction template not found');
        return document.createElement('tr');
    }

    const transactionRow = template.content.cloneNode(true);
    const tr = transactionRow.querySelector('tr');
    if (!tr) {
        console.warn('Transaction row structure not found');
        return document.createElement('tr');
    }

    const dateCell = tr.querySelector('.date');
    const objectCell = tr.querySelector('.object');
    const amountCell = tr.querySelector('.amount');

    if (dateCell) dateCell.textContent = transaction.date;
    if (objectCell) objectCell.textContent = transaction.object;
    if (amountCell) amountCell.textContent = transaction.amount.toFixed(2);

    return transactionRow;
}

function updateState(property, newData) {
    state = Object.freeze({
        ...state,
        [property]: newData
    });
    localStorage.setItem(storageKey, JSON.stringify(state.account));
}

function logout() {
    updateState('account', null);
    navigate('/login');
}

function init() {
    const savedAccount = localStorage.getItem(storageKey);
    if (savedAccount) {
        updateState('account', JSON.parse(savedAccount));
    }

    window.onpopstate = () => updateRoute();
    updateRoute();
}

async function updateAccountData() {
    const account = state.account;
    if (!account) {
        return logout();
    }

    const data = await getAccount(account.user);
    if (data.error) {
        return logout();
    }

    updateState('account', data);
}

async function refresh() {
    await updateAccountData();
    updateDashboard();
}

async function addTransaction() {
    const transactionForm = document.getElementById('transactionForm');
    const formData = new FormData(transactionForm);
    const data = Object.fromEntries(formData);
    const jsonData = JSON.stringify({
        date: data.date,
        object: data.object,
        amount: parseFloat(data.amount)
    });

    const account = state.account;

    try {
        const response = await fetch(`//localhost:8080/api/accounts/${encodeURIComponent(account.user)}/transactions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: jsonData
        });

        const result = await response.json();
        if (result.error) {
            return console.log('Error adding transaction:', result.error);
        }
        await refresh();
        console.log('Transaction added:', result);

        account.balance += result.amount;
        account.transactions.push(result);
        updateState('account', account);
        updateDashboard();
    } catch (error) {
        console.log('Error:', error.message);
    }
}

init();