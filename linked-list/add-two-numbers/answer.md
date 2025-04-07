# 2. Add Two Numbers

## STEP 1

### 考えたこと

* 1の位から一番大きい位まで、キャリーオーバーを用いながら、加算をしていく問題。

```javascript
var addTwoNumbers = function(l1, l2) {
    let carry_over = 0
    let l1_node = l1
    let l2_node = l2
    let sentinel = new ListNode()
    let digit_value_of_sum = sentinel
    while (l1_node || l2_node || carry_over) {
        sum_per_digit = carry_over
        if (l1_node) {
            sum_per_digit += l1_node.val
            l1_node = l1_node.next
        }
        if (l2_node) {
            sum_per_digit += l2_node.val
            l2_node = l2_node.next
        }
        carry_over = parseInt(sum_per_digit / 10)
        digit_value_of_sum.next = new ListNode(parseInt(sum_per_digit % 10), null)
        digit_value_of_sum = digit_value_of_sum.next
    }
    return sentinel.next
};
```

## STEP 2

```javascript
var addTwoNumbers = function(l1, l2) {
    let sentinel = new ListNode()

    let l1_digit_node = l1
    let l2_digit_node = l2
    let sum_digit_node = sentinel
    let carry_over = 0

    while (l1_digit_node || l2_digit_node || carry_over) {

        // 桁の値を合計する。
        let digit_value_sum = carry_over
        if (l1_digit_node) {
            digit_value_sum += l1_digit_node.val
        }
        if (l2_digit_node) {
            digit_value_sum += l2_digit_node.val
        }

        // キャリーオーバー、合計値の1の位の値を求める。
        carry_over = parseInt(digit_value_sum / 10)
        ones_place_value = parseInt(digit_value_sum % 10)

        // 合計のノードを一つ先に進める。
        sum_digit_node.next = new ListNode(ones_place_value, null)
        sum_digit_node = sum_digit_node.next

        if (l1_digit_node) {
            l1_digit_node = l1_digit_node.next
        }
        if (l2_digit_node) {
            l2_digit_node = l2_digit_node.next
        }
    }

    return sentinel.next
};
```

## STEP 3

```javascript
var addTwoNumbers = function(l1, l2) {
    let sentinel = new ListNode()

    let l1_digit_node = l1
    let l2_digit_node = l2
    let sum_digit_node = sentinel
    let carry_over = 0

    while (l1_digit_node || l2_digit_node || carry_over) {

        let digit_value_sum = carry_over
        if (l1_digit_node) {
            digit_value_sum += l1_digit_node.val
        }
        if (l2_digit_node) {
            digit_value_sum += l2_digit_node.val
        }

        let one_place_value = parseInt(digit_value_sum % 10)
        carry_over = parseInt(digit_value_sum / 10)

        sum_digit_node.next = new ListNode(one_place_value, null)
        sum_digit_node = sum_digit_node.next

        if (l1_digit_node) {
            l1_digit_node = l1_digit_node.next
        }
        if (l2_digit_node) {
            l2_digit_node = l2_digit_node.next
        }
    }

    return sentinel.next
};
```

## 感想

* carry_overのみが残っているケースが思いつかなかった。

### 他の人のコードを読んで

* hayashi-ay https://github.com/hayashi-ay/leetcode/pull/24/files 
  * 同じ解き方で取り組んでいた。

*


