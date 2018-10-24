/**
 *
 * @param {*} value 该节点要存储的数据
 * @param {ListNode} next 下一节点
 */
function CreateNode (value, next){
  this.value = value;
  this.next = next;
}
/**
 *
 * @param {Array} arr - 将要创建链表的数组
 * @return {List} 反序链表
 */
const creatListNode = (arr) => {
  let head = null;
  arr.forEach(item => {
    head = new CreateNode(item, head);
  });

  return head;
};
