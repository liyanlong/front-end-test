/*  
* 二叉树节点对象
* Function Node {}
* Node = { left: [Node|null], right: [Node|null] }
*
*/

function Node (name) {
  this.name = name;
}
// 初始化节点
/*
*
*     a
*   /  \
*  b    d
*    \
*     c
*/
const nodeA = new Node('a');
const nodeB = new Node('b');
const nodeC = new Node('c');
const nodeD = new Node('d');

nodeA.left = nodeB;
nodeB.right = nodeC;
nodeA.right = nodeD;
/**
 * 前序遍历
 *
 * @param {*} root
 */
function preOrderSort(root) {
  console.info(root.name);
  root.left && preOrderSort(root.left);
  root.right && preOrderSort(root.right);
}

// preOrderSort(nodeA);

/**
 * 中序遍历
 * 
 * @param {*} root 
 */
function afterOrderSort (root) {
  root.left && afterOrderSort(root.left);
  console.info(root.name);
  root.right && afterOrderSort(root.right);
}

// afterOrderSort(nodeA);


/*
* 获取 二叉树的深度, 完整遍历数结构
*/
function getBinaryTreeDepth (root) {

  function _getBinaryTreeDepth (node, i) {
    if (!node) {
      return i;
    }
    const letfDeep = node.left ? _getBinaryTreeDepth(node.left, i + 1) : i;
    const rightDeep = node.right ? _getBinaryTreeDepth(node.right, i + 1) : i;
    return Math.max(letfDeep, rightDeep);
  }
  return _getBinaryTreeDepth(root, 1);

}
let depth = getBinaryTreeDepth(nodeA);