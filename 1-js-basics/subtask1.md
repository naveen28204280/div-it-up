1. Subtopic data-types

    Challenge:
    The gotchas I found are:
    - Difference between == and ===: '==' only checks if it's the same value and doesn't check the data type so int and str can be the same according to it but '===' checks both the value and the data type
    - Using parseInt: Parsing strings normally converts them to their numbers but if the string starts with 0x then it takes 16 as the base when the base is generally 10

    Assignment:
    - We will need an **array** to store each iem inside the cart
    - We would need an **object** (key-value pair) to store the details of each item
2. Subtopic functions-methods

    Challenge:
    A **method** is a **function** that is defined inside an object as a property

    Assignment:
    functions that don't return anything:
``` 
function HelloWorld() {
    console.log("Hello, World!");
};
HelloWorld()
```
        functions that return something:
``` 
function add(a, b) {
    return a+b;
};
sum=add(5, 5);
console.log(sum);
```
    A function with undefined variables
``` 
function Intro(name,age=17, country='India') {
    console.log(`Hi, I am ${name}. I am ${age} years old and from ${country}`)
};
Intro ("Naveen","18","USA");
Intro("Naveen");
```
    In the first call the age country are defined so it prints them but in the second call they are not defined so it prints the default values.

3. Subtopic 3-making-decisions

    Challenge:
    A function using logic operators is:
```
let num=parseInt(prompt("Enter a number: "));
if (num>0){
    console.log("Positive")
}
else if (num<0){
    console.log("Negative")
}
else{
    console.log("Zero")
}
```
    A function using ternary operators is:
```
let num=parseInt(prompt("Enter a number: "));
if (num>0){
    console.log("Positive")
}
else if (num<0){
    console.log("Negative")
}
else{
    console.log("Zero")
}
```
    Assignment:
``` 
let allStudents=['A','B-',1,4,5,2]
let studentswhoPassed=[];
for (i=0;i<allStudents.length;i++ ) {
    if (!isNaN(parseInt(allStudents[i], 10)) && parseInt(allStudents[i],10).toString()===allStudents[i].toString()){
        if (parseInt(allStudents[i],10)>=3){
            studentswhoPassed.push(allStudents[i]);
        }
    }
    else if (allStudents[i]!='C-') {
        studentswhoPassed.push(allStudents[i]);
    }
}
console.log(studentswhoPassed)
```
4. Subtopic arrays-loops

    Challenge:
    For loop:
```
let num=10;
for (i=1;i<num+1;i++){
    console.log(i)
}
```
    forEach loop:
```
let num=10;
const numbers = Array.from({ length: num }, (_, i) => i + 1);
numbers.forEach(i=>{
    console.log(i);
```
    for-of loop:
```
let num=10;
const numbers = Array.from({ length: num }, (_, i) => i + 1);
for (const i of numbers) {
    console.log(i);
}
```
    map:
```
let num=10;
const numbers=Array.from({length: num }, (_, i) => i + 1);
numbers.map(i=>console.log(i));
```
    Assignment:
```
for (i = 3; i <= 20; i +=3) {
    console.log(i)
}
```