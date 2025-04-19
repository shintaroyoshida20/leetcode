# 206. Reverse Linked List

## STEP 1

* 手作業でやってみる
  * 工場のライン作業を逆転させると仮定する。 
  * 先頭の人から以下の作業を更新する。
    * 自分のむき先を前の人から後ろの人に向ける。

```javascript
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

```javascript
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

```javascript
const reverseList = function(head) {
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

```javascript
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

* goto-untrapped のPR https://github.com/goto-untrapped/Arai60/pull/27/
  * 再帰を行う際には、次の人に、何を渡して、何を返してもらうかを考える。

* fhiyoのPR https://github.com/fhiyo/leetcode/pull/7/
  * while文の主人公をnextにする方法もある (`*1`)
  * stackを使う方法もある。 (`*2`)

* olsen-blue https://github.com/olsen-blue/Arai60/pull/7/ 
  * > 細かい遷移ステップを考えると「prev」や「current」などが思いつきやすいものの、これは「ループ中のある一瞬の状況」を「コードを書く人の目線」で切り取っているに過ぎず、「(初めて)コードを見る人」の視点でコード全体を俯瞰して眺めたときに意味を成さない、と自戒を込めて、理解。
    こちらが、自分が意識できていなかった。

## その他の解法

* `*1` while文の主役をnextにする方法

```javascript
const reverseList = function(head) {
    let current = head
    if (current === null) return current
    let next = current.next

    // あらかじめ初期化しておく.
    current.next = null

    while (next) {
        const twoAhead = next.next
        next.next = current
        current = next
        next = twoAhead
    }
    return current
};
```

* `*2` スタックを使って、一番後ろから順番に向き先を変更する方法

```javascript

const reverseList = function(head) {
    if (head === null) {
        return null
    }
    const stack = []
    let node = head
    while (node !== null) {
        stack.push(node)
        node = node.next
    }

    const new_head = stack.pop()
    let current = new_head
    while (stack.length > 0) {
        const next = stack.pop()
        current.next = next
        current = next
    }
    // While文では、もともとheadだったノードの向き先を変えられないため。
    head.next = null
    return new_head
};
```

* `*3` Stackと番兵を使う方法もある

```
```
