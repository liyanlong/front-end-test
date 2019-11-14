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
*   /
*  b
*    \
*     c
*/
const nodeA = new Node('a');
const nodeB = new Node('b');
const nodeC = new Node('c');

nodeA.left = nodeB;
nodeB.right = nodeC;

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


/*
* 获取 二叉树的深度
*/
function getBinaryTreeDepth (root) {

}