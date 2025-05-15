dragElement(document.getElementById('plant1'));
dragElement(document.getElementById('plant2'));
dragElement(document.getElementById('plant3'));
dragElement(document.getElementById('plant4'));
dragElement(document.getElementById('plant5'));
dragElement(document.getElementById('plant6'));
dragElement(document.getElementById('plant7'));
dragElement(document.getElementById('plant8'));
dragElement(document.getElementById('plant9'));
dragElement(document.getElementById('plant10'));
dragElement(document.getElementById('plant11'));
dragElement(document.getElementById('plant12'));
dragElement(document.getElementById('plant13'));
dragElement(document.getElementById('plant14'));

function dragElement(terrariumElement) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    terrariumElement.onpointerdown = function (e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onpointermove = elementDrag;
        document.onpointerup = stopElementDrag;
    };

    function elementDrag(e) {
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        terrariumElement.style.top = terrariumElement.offsetTop - pos2 + 'px';
        terrariumElement.style.left = terrariumElement.offsetLeft - pos1 + 'px';
    }

    function stopElementDrag() {
        document.onpointermove = null;
        document.onpointerup = null;
    }

    terrariumElement.addEventListener('mouseenter', () => {
        terrariumElement.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
        terrariumElement.style.transform = 'scale(1.1)'; // Slightly enlarge the element.
    });

    terrariumElement.addEventListener('mouseleave', () => {
        terrariumElement.style.boxShadow = 'none';
        terrariumElement.style.transform = 'scale(1)'; // Restore to original size.
    });
}

for (let i = 1; i <= 14; i++) {
    const plant = document.getElementById(`plant${i}`);
    if (plant) dragElement(plant);
}