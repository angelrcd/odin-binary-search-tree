import { Tree, prettyPrint } from "./tree.js"

let tree = new Tree([ 1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67]);
const outputDisplay = document.querySelector("#output");
const inputBox = document.querySelector("#input-box");
const insertButton = document.querySelector("#insert-btn");
const rebalanceButton = document.querySelector("#rebalance-btn");
// selectors for information section
const heightDisplay = document.querySelector("#height");
const balancedDisplay = document.querySelector("#balanced");
const levelOrderDisplay = document.querySelector("#level-order");
const preorderDisplay = document.querySelector("#preorder");
const inorderDisplay = document.querySelector("#inorder");
const postorderDisplay = document.querySelector("#postorder");


updateDisplay();

inputBox.addEventListener("input", handleNewInput);

insertButton.addEventListener("click", () => {
  const insertInputBox = document.querySelector("#insert");
  const newValue = insertInputBox.value;
  insertInputBox.value = "";

  if (newValue === "") return;

  tree.insert(+newValue);
  updateDisplay();
})

rebalanceButton.addEventListener("click", () => {
  tree.rebalance();
  updateDisplay();
})

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
  balancedDisplay.textContent = tree.isBalanced();
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