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
    this.root = buildTree(arr)
  }

  insert(value, node = this.root){
    if(this.root == null){
      return;
    }

    // Don't insert duplicate values
    if(node.data === value){
      return;
    }

    if(node.data > value && !node.left){
      node.setLeft(new Node(value));
      return;
    } else if (node.data < value && !node.right){
      node.setRigth(new Node(value))
      return;
    }

    (node.data > value) ? this.insert(value, node.left) : this.insert(value, node.right);
  }

  delete(value, node = this.root){
    if (!node){
      return null;
    }
    
    // Case 1: Node to delete is a leaf node
    if (node.data === value && !node.left && !node.right){
      return null;
    }
    // Case 2: Node to delete has one child
    if (node.data === value && (!node.left && node.right)){
      return node.right;
    } else if (node.data === value && (node.left && !node.right)){
      return node.left;
    }
    // Case 3: Node with two children
    // TODO

    node.setLeft(this.delete(value, node.left));
    node.setRigth(this.delete(value, node.right));
    return node;
  }

  find(value){
    let current = this.root;
    
    do {
      if (current.data === value) return current;

      if(value < current.data){
        current = current.left;
      } else {
        current = current.right;
      }
    } while (current?.data != null)

    return null;
  }

  levelOrder(callback){
    const queu = [this.root];
    const result = [];
    if (!callback){
      callback = (node) => {
        result.push(node.data)
      }
    }

    while(queu.length != 0){
      const current = queu.shift();
      callback(current);
      if(current.left){
        queu.push(current.left);
      }
       if (current.right){
        queu.push(current.right);
      }
    }

    return result;
  }

  inorder(callback){
    const result = [];
    if (!callback){
      callback = (node) => {
        result.push(node.data)
      }
    }
    function traversal(node){
      if (node === null) return;
      traversal(node.left);
      callback(node);
      traversal(node.right);
    }
    traversal(this.root)
    return result;
  }

  preorder(callback){
    const result = [];
    if (!callback){
      callback = (node) => {
        result.push(node.data)
      }
    }
    function traversal(node){
      if (node === null) return;
      callback(node);
      traversal(node.left);
      traversal(node.right);
    }
    traversal(this.root)
    return result;
  }

  postorder(callback){
    const result = [];
    if (!callback){
      callback = (node) => {
        result.push(node.data)
      }
    }
    function traversal(node){
      if (node === null) return;
      traversal(node.left);
      traversal(node.right);
      callback(node);
    }
    traversal(this.root)
    return result;
  }

  height(node = this.root){
    if (node === null) return -1;

    let lHeight = this.height(node.left);
    let rHeight = this.height(node.right);

    if (lHeight < rHeight){
      return rHeight + 1;
    } else {
      return lHeight + 1;
    }
  }

  depth(node){
    let depth = 0;
    let current = this.root;
    while(current !== node){
      if(node.data < current.data){
        current = current.left;
        depth++;
      } else if (node.data > current.data){
        current = current.right;
        depth++;
      }
    }
    return depth;
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
const tree2 = new Tree([0, 1, 2, 3, 4, 5, 6])
tree2.insert(10)
tree2.insert(11)
tree2.insert(12)
tree.insert(6)

prettyPrint(tree.root);
console.log(tree.depth(tree.root.left.left.right));



function prettyPrint(node, prefix = "", isLeft = true) {
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