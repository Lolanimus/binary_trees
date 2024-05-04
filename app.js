function merge(left, right) {
  let resultArray = [],
    leftIndex = 0,
    rightIndex = 0;

  // Loop through both arrays, comparing elements and adding the smaller one to the resultArray
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex++; // Move to the next element in the `left` array
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++; // Move to the next element in the `right` array
    }
  }

  // Concatenate the remaining elements from either `left` or `right` (if any)
  return resultArray
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

function mergeSort(array) {
  // Base case: If the array has only one element, return it (already sorted)
  if (array.length === 1) {
    return array;
  }

  // Divide the array into two halves
  const middle = Math.floor(array.length / 2); // Find the middle index
  const left = array.slice(0, middle); // Split the array into left half
  const right = array.slice(middle); // Split the array into right half

  // Recursively call mergeSort on the left and right halves
  return merge(
    mergeSort(left), // Recursively sort the left half
    mergeSort(right) // Recursively sort the right half
  );
}

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
    this.counter = 0;
    this.orderArr = [];
    this.orderCount = 0;
  }

  buildTree(arr, start = 0, end = 0) {
    if (this.counter == 0) {
      arr = mergeSort(Array.from(new Set(arr)));
      start = 0;
      end = arr.length;
      this.counter++;
    }

    if (start > end) return null;
    let mid = Math.floor((start + end) / 2);
    if (arr[mid] == undefined) return null;
    let head = new Node(arr[mid]);
    head.left = this.buildTree(arr, start, mid - 1);
    head.right = this.buildTree(arr, mid + 1, end);
    this.root = head;
    return this.root;
  }

  prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  insert(value, root = this.root) {
    if (root.data == undefined || value == root.data) return null;
    else if (value > root.data) {
      if (root.right == undefined) root.right = new Node(value);
      else this.insert(value, root.right);
    } else {
      if (root.left == undefined) root.left = new Node(value);
      else this.insert(value, root.left);
    }
  }

  deleteItem(value, root = this.root) {
    if (root == undefined) return root;
    if (value < root.data) root.left = this.deleteItem(value, root.left);
    else if (value > root.data) root.right = this.deleteItem(value, root.right);
    else {
      if (root.left == undefined) return root.right;
      else if (root.right == undefined) return root.left;
      root.data = this.minValue(root.right);
      root.right = this.deleteItem(root.data, root.right);
    }
    return root;
  }

  minValue(node) {
    let minv = node.data;
    while (node.left !== null) {
      minv = node.left.data;
      node = node.left;
    }
    return minv;
  }

  find(value, root = this.root) {
    if (root == undefined) return null;
    if (root.data > value) return this.find(value, root.left);
    else if (root.data < value) return this.find(value, root.right);
    else return root;
  }

  levelOrder(root) {
    let result = [];
    if (root === null) return result;

    let queue = [root];

    while (queue.length > 0) {
      let levelSize = queue.length;
      let currentLevel = [];

      for (let i = 0; i < levelSize; i++) {
        let currentNode = queue.shift();
        currentLevel.push(currentNode.data);
        if (currentNode.left !== null) queue.push(currentNode.left);
        if (currentNode.right !== null) queue.push(currentNode.right);
      }

      result.push(currentLevel);
    }

    return result;
  }

  inOrder(root, results) {
    if (root == undefined) return null;
    this.inOrder(root.left, results);
    results.push(root.data);
    this.inOrder(root.right, results);
  }

  preOrder(root, results) {
    if (root == undefined) return null;

    results.push(root.data);
    this.preOrder(root.left, results);
    this.preOrder(root.right, results);
  }

  postOrder(root, results) {
    if (root == undefined) return null;

    this.postOrder(root.left, results);
    this.postOrder(root.right, results);
    results.push(root.data);
  }

  depth(node) {
    let levelOrderArr = this.levelOrder(node);
    return levelOrderArr.length;
  }

  isBalanced(head) {
    let leftTree = tree.depth(head.left);
    let rightTree = tree.depth(head.right);
    return !(Math.abs(leftTree - rightTree) > 1);
  }

  balance(head, results) {
    this.inOrder(head, results);
    this.root = null;
    this.counter = 0;
    let newRoot = this.buildTree(results, 0, results.length);
    return newRoot;
  }
}

let arr = [];
for (let i = 0; i < 20; i++) {
  arr.push(Math.floor(Math.random() * 100));
}
let tree = new Tree();
let head = tree.buildTree(arr, 0, arr.length);
console.log("The tree is balanced: " + tree.isBalanced(head));
console.log();
console.log("Tree in level order: " + tree.levelOrder(head));
console.log();
let results = [];
tree.inOrder(head, results);
console.log("Tree in order: " + results);
console.log();
results = [];
tree.preOrder(head, results);
console.log("Tree in pre order: " + results);
console.log();
results = [];
tree.postOrder(head, results);
console.log("Tree in post order: " + results);
console.log();
tree.prettyPrint(head);
results = [];
for (let i = 0; i < 20; i++) {
  results.push(Math.floor(Math.random() * 1000));
}
head = tree.balance(head, results);
console.log("The tree is balanced: " + tree.isBalanced(head));
console.log();
console.log("Tree in level order: " + tree.levelOrder(head));
console.log();
results = [];
tree.inOrder(head, results);
console.log("Tree in order: " + results);
console.log();
results = [];
tree.preOrder(head, results);
console.log("Tree in pre order: " + results);
console.log();
results = [];
tree.postOrder(head, results);
console.log("Tree in post order: " + results);
console.log();
tree.prettyPrint(head);
