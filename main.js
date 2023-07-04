import { Tree, prettyPrint } from "./tree.js"

let tree = new Tree([ 1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67]);
const outputDisplay = document.querySelector("#output");
const inputBox = document.querySelector("#input-box");
// selectors for information section
const heightDisplay = document.querySelector("#height");
const balancedDisplay = document.querySelector("#balanced");
const levelOrderDisplay = document.querySelector("#level-order");
const preorderDisplay = document.querySelector("#preorder");
const inorderDisplay = document.querySelector("#inorder");
const postorderDisplay = document.querySelector("#postorder");


updateDisplay()

inputBox.addEventListener("input", handleNewInput)

function updateDisplay(){
  updateOutput(); 
  updateInformation();
}

function updateOutput(){
  const output = prettyPrint(tree.root);
  outputDisplay.textContent = output;
}

function updateInformation(){
  heightDisplay.textContent = tree.height();
  // balanced to do
  levelOrderDisplay.textContent = tree.levelOrder().join(", ");
  preorderDisplay.textContent = tree.preorder().join(", ");
  inorderDisplay.textContent = tree.inorder().join(", ");
  postorderDisplay.textContent = tree.postorder().join(", ");
}

function handleNewInput(){
  const input = inputBox.value;
  const arr = input.split(" ").filter(element => element !== "")
  const numbersArr = arr.map(element => Number(element)).filter(number => !isNaN(number))
  
  tree = new Tree(numbersArr);
  updateDisplay();
}