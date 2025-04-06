# 82. Remove Duplicates from Sorted List II

## STEP 1

### 解き方
* 先頭から進める
  * previous,current,nextを設定する。
  * current とNextが一致していた場合
    * currentをnextに設定する。
      --> それ以上先に進めなかった。
      --> currentは動かさず、nextのみ動かすと言う発想ができなかった。回答を確認した。
    * previous.nextをその次にする
  * 自分と次の人が重複なし
    * previousとcurrentを動かす。
  

### 解法

* 番兵を使う解法

```javascript
var deleteDuplicates = function(head) {
    let sentinel = new ListNode(0, head)
    let previous = sentinel
    let current = head
    while (current) {
        let next = current.next
        if (next && current.val === next.val) {
            while (next && current.val === next.val) {
                next = next.next
            }
            previous.next = next
        } else {
            previous = previous.next
        }
        current = next
    }
    return sentinel.next
};
```

## STEP 2

* 番兵を使う解法

```javascript
var deleteDuplicates = function(head) {
    let sentinel = new ListNode(0, head)
    let last_non_duplicate_node = sentinel
    let current = head
    while (current) {
        let next = current.next
        if (next && current.val === next.val) {
            // ノードの重複があった場合
            while (next && current.val === next.val) {
                next = next.next
            }
            last_non_duplicate_node.next = next
            current = next
            continue
        }

        // ノードの重複がない場合
        last_non_duplicate_node = current
        current = next
    }
    return sentinel.next
};
```

* 番兵を使わない解法
  * 番兵を使う方法をもとに、使わない方法を整えた。

```javascript
var deleteDuplicates = function(head) {
    let first_non_duplicate_node = null
    let last_non_duplicate_node = null
    let current = head
    while (current) {
        let next = current.next
        if (next && current.val === next.val) {
            // ノードの重複があった場合
            while (next && current.val === next.val) {
                next = next.next
            }
            if (last_non_duplicate_node) {
                last_non_duplicate_node.next = next
            }
            current = next 
            continue
        }

        // ノードの重複がない場合
        if (!first_non_duplicate_node) {
            first_non_duplicate_node = current
        }
        last_non_duplicate_node = current
        current = next
    }
    return first_non_duplicate_node
};
```

## STEP 3

* 番兵を使う解法

```javascript
var deleteDuplicates = function(head) {
    let first_non_duplicate_node = null
    let last_non_duplicate_node = null
    let current = head

    while (current) {
        let next = current.next

        if (next && current.val === next.val) {
            while (next && current.val === next.val) {
                next = next.next
            }
            if (last_non_duplicate_node) {
                last_non_duplicate_node.next = next
            }
            current = next 
            continue
        }

        if (!first_non_duplicate_node) {
            first_non_duplicate_node = current
        }
        last_non_duplicate_node = current
        current = next
    }

    return first_non_duplicate_node
};
```

### 感想

* 連結リストで、一番初めのノードが簡単に設定できない場合、番兵を検討する

* 他の人のコードを読んでみた感想

  * hayashi-ayのコード github.com/hayashi-ay/leetcode/pull/23/
    * 状態(`value_to_remove`)を1つ余計に持つので、理解するのが大変。
    * 関数における主役となる変数を意識したことがなかった。
        ```
            これは趣味の範囲ですが、current_node は名前として長い感じがします。
            ここのループにおいては主役なんだから、主役に、他と区別するためではない形容詞がついているのは不自然なんです。
        ```
  * ryotaroのコード https://github.com/Ryotaro25/leetcode_first60/pull/4
    * 数をカウントして、1回しか出てこない値を連携リストに追加していく方法でも解けることを知った。
      * 単純明快なため、まずこの解法を思いつきたかった。

  * fuga-98 のコード https://github.com/fuga-98/arai60/pull/5
    * 再帰を使った解法が、大変勉強になった。

  * olsen-blue https://github.com/olsen-blue/Arai60/pull/4/
    * 自分と解法が一致していた。
