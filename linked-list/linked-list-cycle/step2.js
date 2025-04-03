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
    const everSeen = new Set()
    let currentNode = head
    while (currentNode !== null) {
        if (everSeen.has(currentNode)) return true
        everSeen.add(currentNode)
        currentNode = currentNode.next
    }
    return false
};
