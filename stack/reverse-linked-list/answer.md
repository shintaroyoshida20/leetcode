# 206. Reverse Linked List

## STEP 1

* 手作業でやってみる
  * 工場のライン作業を逆転させると仮定する。 
  * 先頭の人から以下の作業を更新する。
    * 自分のむき先を前の人から後ろの人に向ける。

```
const reverseList = function(head) {
    let current = head
    let previous = null
    while (current !== null) {
        const next = current.next
        current.next = previous
        previous = current
        current = next
    }
    return previous
};
```

* 再帰でやってみる。
  * 先頭の人から以下の作業を行う。
    * 自分の後ろの人全員の向き先を変えてもらう。(再帰)
    * 自分のむき先を前の人にする。
    * 一番後ろの人を次の人から受け取り、返す。

```
const reverseList = function(current, previous = null) {
    if (current === null) return previous
    const new_head_node = reverseList(current.next, current)
    current.next = previous
    return new_head_node
};
```

## STEP 2

* やったこと
  * コメントをつける。

```
var reverseList = function(head) {
    let current = head
    let previous = null

    while (current !== null) {
        // 次の人を保持しておく。
        const next = current.next

        // 自分の向き先を前の人に向ける。
        current.next = previous

        previous = current
        current = next
    }

    return previous
}
```

## STEP 3

```
const reverseList = function(head) {
    let current = head
    let previous = null
    while (current !== null) {
        const next = current.next
        current.next = previous
        previous = current
        current = next
    }
    return previous
};
```

## 感想

### 他の人のコードを読んで
