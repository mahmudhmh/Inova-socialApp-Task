// Find middle node of a linked list
// Time Complexity: O(n)
// Space Complexity: O(1)

const middleNode = function (head) {
  let newHead = head;
  let length = 0;
  while (newHead) {
    length++;
    newHead = newHead.next;
  }

  let midpoint = Math.floor(length / 2) + 1;

  while (midpoint > 1) {
    head = head.next;
    midpoint--;
  }

  return head;
};
