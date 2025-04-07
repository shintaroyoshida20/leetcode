# 2. Add Two Numbers

## STEP 1

### 考えたこと

* 1の位から順番に、キャリーオーバーを用いながら、加算をしていく問題。

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
        ones_place_value = digit_value_sum % 10

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

* carry_overのみが残っているケースに注意する.
  * 99 + 1みたいなケース
* 他の人のコードを読んで、全体的に自分のコードの変数名が冗長であるように感じた。
* parseIntは、Math.floorでも良い.
* 好みは、再帰を使わず、l1とl2の番兵を使う。

### 他の人のコードを読んで

* hayashi-ay さんのPR https://github.com/hayashi-ay/leetcode/pull/24/ 
  * 同じ解き方で取り組んでいた。

* Ryotaro25さんのPR https://github.com/Ryotaro25/leetcode_first60/pull/5/
  * [memo] carryの反対はborrow
  * While/For文で解ける問題は、再帰もイメージする

* fuga-98さんのPR https://github.com/fuga-98/arai60/pull/6
  * 再帰を使った方法がコードの行数が短くなっており、理解が早い。
  * 再帰の解法で問題を解いてみる( `*1` )

### [典型コメント](https://docs.google.com/document/d/11HV35ADPo9QxJOpJQ24FcZvtvioli770WWdZZDaLOfg/edit?tab=t.0#heading=h.lxzt19oefrb8)を読んで

* 再帰でも、dummyを使う方法と使わない方法がある。 (https://discord.com/channels/1084280443945353267/1235829049511903273/1238087350995779674)
  * 再帰は、処理を子供に押し付けるというイメージを持つ。

* この記法が勉強になった。(3つ以上の値の合計で重宝しそう)
    ```
        for curr_temp in [curr1, curr2]:
          if curr_temp:
            digit_sum += curr_temp.val 
    ```
* headのdummyを使わない方法がある (`*3`)

* 再帰で書く際には、スタックサイズを意識する。 
  * https://github.com/Yoshiki-Iwasa/Arai60/pull/4#discussion_r1644191582
  * Rustは、2M。Javascirptは調べたがStackサイズに関する公式ドキュメントが見つからなかった。
    * https://stackoverflow.com/questions/7826992/browser-javascript-stack-size-limit

* 問題の制約が、何かを考えながら解いた方が良い。https://discord.com/channels/1084280443945353267/1227464441235509308/1229681213803860008
  * 今回だと、連結リストのノード数は最大100個 

> あくまで私の場合の話なのですが、コードを丸暗記して覚えていたので、制約が何なのかを考えることすらしていませんでした。やねうらおさんに考え方を教えていただき、やっと制約が何なのかを考えながら書けるようになりました。

* 問題の一般化を考える (今回は2つの数だったので、3つ以上だとどうするか) (https://github.com/Yoshiki-Iwasa/Arai60/pull/4#discussion_r1644051434)

* l1とl2の番兵を使う方法もある。(https://github.com/yus-yus/leetcode/pull/5#discussion_r1945199144) (`*2`)

* コード領域、データ領域、スタック領域、ヒープ領域の認識
  * スタック領域
    * 関数の呼び出している間に、スタック領域のメモリが確保される。
    * 関数から値が変えると、スタック領域のメモリが解放される。

### その他の解法

* `*1` 再帰を用いた解法

```
var addTwoNumbers = function(l1, l2, carry = 0) {
    if (!l1 && !l2 && !carry) return null

    if (!l1) {
        l1 = new ListNode(0, null)
    }
    if (!l2) {
        l2 = new ListNode(0, null)
    }

    const total = l1.val + l2.val + carry
    
    const new_carry = Math.floor(total / 10)
    const value = total % 10

    const head = new ListNode(value, null)
    head.next = addTwoNumbers(l1.next, l2.next, new_carry)

    return head
};
```

* `*2` L1/L2の番兵を使う解法
```
var addTwoNumbers = function(l1, l2) {
    let sentinel = new ListNode()

    let l1_digit_node = l1
    let l2_digit_node = l2
    let sum_digit_node = sentinel
    let carry_over = 0

    while (l1_digit_node || l2_digit_node || carry_over) {

        if (!l1_digit_node) {
            l1_digit_node = new ListNode(0, null)
        }
        if (!l2_digit_node) {
            l2_digit_node = new ListNode(0, null)
        }
        const digit_value_sum = l1_digit_node.val + l2_digit_node.val + carry_over

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

* `*3` headの番兵を使わない解放 

```
var addTwoNumbers = function(l1, l2) {
    let head = null
    let node = null
    let carry = 0
    while (l1 || l2 || carry) {
        if (!l1) {
            l1 = new ListNode(0)
        }
        if (!l2) {
            l2 = new ListNode(0)
        }
        const total = l1.val + l2.val + carry
        carry = parseInt(total / 10)
        one_place_value = total % 10

        if (!head) {
            head = new ListNode(one_place_value, null)
            node = head
        } else {
            node.next = new ListNode(one_place_value, null)
            node = node.next
        }
        if (l1) {
            l1 = l1.next
        }
        if (l2) {
            l2 = l2.next
        }
    }

    return head
};
```
