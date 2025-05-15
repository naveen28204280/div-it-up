# NodeLists

## What are NodeLists

- NodeLists are a type of collection in JavaScript that is similar to arrays, but it is a collection of html elements by class, id
- It can be created using queryselectorAll()
- It does not map, filter, reduce methods like arrays
- NodeLists also won't automatically update when the DOM changes so we have to manually update it

## Uses

- We can use NodeList to dynamically add ,remove or update elements from the DOM
- We can use NodeLists to loop through elements
- We can create event handlers for each element in the NodeList

## Applications

NodeLists are used in various websites like Google and Amazon to interact with **results of a search** or **details of a product**

### In Google Search
When we search for an item in Google:
1. Each result is a DOM element with a unique tag
2. Using document.querySelectorAll, Google collects all search result elements as a NodeList
3. Google then loops through the NodeList to display each result