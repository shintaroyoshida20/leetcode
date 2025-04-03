/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    const hashMap = new Map()
    let currentNode = head
    while (currentNode !== null) {
        if (hashMap.has(currentNode)) return true
        hashMap.set(currentNode, true)
        currentNode = currentNode.next
    }
    return false
};
