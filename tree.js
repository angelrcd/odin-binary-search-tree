class Node {
  constructor(value){
    this.data = value;
    this.left = null;
    this.right = null;
  }

  setLeft(subtree){
    this.left = subtree;
  }

  setRigth(subtree){
    this.right = subtree;
  }
} 

class Tree {
  constructor(arr){
    arr = [...new Set(arr)]
    arr.sort((a, b) => a - b )
    console.log(arr);
    this.root = buildTree(arr)
  }
}

function buildTree(arr){
  const start = 0;
  const end = arr.length - 1;
  if(start > end) return null;

  const mid = Math.floor(( start + end ) / 2);
  const root = new Node(arr[mid]);  
  root.setLeft(buildTree(arr.slice(0, mid)));
  root.setRigth(buildTree(arr.slice(mid + 1)));
  return root;
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(tree.root);