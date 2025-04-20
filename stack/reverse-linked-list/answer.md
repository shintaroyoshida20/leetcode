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

### コメント集を読んで

* stackの初めは特殊なので、番兵を立てるか、分岐をするか、ループの外に出すかの選択を意識する。 

* ループの中で、事前に保証されていることを意識する。 
  * スタックを使う際に、1つ目のループでnextを破壊しておく方法がある。 https://github.com/quinn-sasha/leetcode/pull/7/files/4ddfeff795ae1b5137089b3d59b9ff97da8409c4#r1948254138

### 他の人のコードを読んで

* goto-untrapped のPR https://github.com/goto-untrapped/Arai60/pull/27/
  * 再帰を行う際には、次の人に、何を渡して、何を返してもらうかを考える。
  * 先頭から順番に付け替える方法で、再帰を使う方法もある (`*4`)
    https://github.com/goto-untrapped/Arai60/pull/27/files#r1641789968

* fhiyoのPR https://github.com/fhiyo/leetcode/pull/7/
  * while文の主人公をnextにする方法もある (`*1`)
  * stackを使う方法もある。 (`*2`)

* olsen-blue https://github.com/olsen-blue/Arai60/pull/7/ 
  * > 細かい遷移ステップを考えると「prev」や「current」などが思いつきやすいものの、これは「ループ中のある一瞬の状況」を「コードを書く人の目線」で切り取っているに過ぎず、「(初めて)コードを見る人」の視点でコード全体を俯瞰して眺めたときに意味を成さない、と自戒を込めて、理解。
    自分が意識できていなかった。

* hayashi-ay のコード https://github.com/hayashi-ay/leetcode/pull/13/
  * 大変読みやすかった。

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

* `*4` 再帰を用いて、先頭から順番に向き先を付け替える

```
const reverseListHelper = function(new_chain_head, old_chain_head) {
    if (old_chain_head === null) return new_chain_head
    const old_chain_new_head = old_chain_head.next
    old_chain_head.next = new_chain_head
    return reverseListHelper(old_chain_head, old_chain_new_head)
};
const reverseList = function(head) {
    return reverseListHelper(null, head)
}
```
### レビューを受けて

* 変更前

```javascript
const reverseList = function(current, previous = null) {
    if (current === null) return previous
    const new_head_node = reverseList(current.next, current)
    current.next = previous
    return new_head_node
};
```

* 変更後 (「解体中の先頭」「構築中の先頭」が素直な名前の付け方というコメント集を見て)

```javascript
const reverseListHelper = function(old_chain_current, old_chain_previous = null) {
    if (old_chain_current === null) return old_chain_previous
    const old_chain_next = old_chain_current.next
    const new_chain_head = reverseListHelper(old_chain_next, old_chain_current)
    old_chain_current.next = old_chain_previous
    return new_chain_head
};
const reverseList = function(head) {
    return reverseListHelper(head)
}
```


