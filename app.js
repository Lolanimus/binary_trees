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
    this.stack = [];
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
}

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = new Tree();
let head = tree.buildTree(arr, 0, arr.length);
tree.insert(6346);
tree.deleteItem();
tree.prettyPrint(head);
