# 82. Remove Duplicates from Sorted List II

## STEP 1

### 問題を解く際に考えたこと 

* 先頭から進める
  * previous,current,nextを初期化する。
  * current とNextが一致していた場合
    * currentをnextに更新する。
      --> それ以上先に進めなかった。
      --> currentは動かさず、nextのみ動かすと言う発想ができなかった。回答を確認した。
    * previousの向き先をnextにする。
  * 自分と次の人が重複なし
    * previousとcurrentを更新する。
  
### 番兵を使う解法

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

### 番兵を使う解法

* previousを `last_non_duplicate_node` に変更した。
* 改行を入れた
  * returnの前に改行があると読みやすい.

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

### 番兵を使わない解法

番兵を使う方法をもとに、使わない方法を作成した.

* `first_non_duplicate_node` を追加し、こちらの変数を関数の返り値にした 

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

* 番兵を使わない解法

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

* まず、日本語で指示ができる状態を作る。


* 連結リストで、初期値が簡単に設定できない場合、番兵を検討する
  * 番兵を使わなくても解けるので、重複したノードがあった際に、SKIPを行うロジックを思いつくことの方がより重要。

* 他の人のコードを読んでみた感想

  * hayashi-ayのコード github.com/hayashi-ay/leetcode/pull/23/
    * 状態(`value_to_remove`)を1つ余計に持つので、理解するのが大変。
    * 関数における主役となる変数を意識したことがなかった。
        * (oda) これは趣味の範囲ですが、current_node は名前として長い感じがします。
          ここのループにおいては主役なんだから、主役に、他と区別するためではない形容詞がついているのは不自然なんです。

  * ryotaroのコード https://github.com/Ryotaro25/leetcode_first60/pull/4
    * 数をカウントして、1回しか出てこない値を連携リストに追加していく方法でも解けることを知った。
      * 単純明快なため、まずこの解法を思いつきたかった。

  * fuga-98 のコード https://github.com/fuga-98/arai60/pull/5
    * 再帰を使った解法が、大変勉強になった。
    * 前のノードから解く解法がある場合には、後ろのノードから解く再帰を使った方法もあるはず。

  * olsen-blue https://github.com/olsen-blue/Arai60/pull/4/
    * 自分と解法が一致していた。

  * nodchipのコメント node 変数と sentinel 変数のみを用いて処理
    https://github.com/h1rosaka/arai60/pull/6#discussion_r1740940281 

### 他の人の解法

* `*1` node 変数と sentinel 変数のみを用いて処理

```javascript
    var deleteDuplicates = function(head) {
        let sentinel = new ListNode(0, head)
        let node = sentinel
    
        while (node) {
            if (node.next && node.next.next && node.next.val === node.next.next.val) {
                while (node.next && node.next.next && node.next.val === node.next.next.val) {
                    node.next = node.next.next
                }
                node.next = node.next.next
                continue
            }
            node = node.next
        }
        return sentinel.next
    };
```

* `*2` 引き継ぎ条件を変更する。

  * `*0`の引き継ぎ条件は、
    * 自分と最後に重複がない人は、重複していません。
    * 最後に重複がない人の向き先は、自分に向いています。
    * 自分と次のノードが重複している場合には、最後に重複がない人の向き先を変更します。
    * 自分と次のノードが重複していない場合には、向き先を変更せず、最後に重複していない人と自分を更新します。

```javascript
// 引き継ぎ条件の中に、向き先が含まれている場合。
const deleteDuplicates = function(head) {
    const sentinel = new ListNode(0, head)
    // last_non_duplicate_nodeの向き先は、先頭になっている。
    let last_non_duplicate_node = sentinel
    let node = head
    while (node) {
        let next = node.next
        if (next === null) {
            break
        }
        if (node.val !== next.val) {
            last_non_duplicate_node = node
            // last_non_duplicate_nodeの向き先は、nextに向いているので更新の必要なし。
            node = next
            continue
        }
        while (next && node.val === next.val) {
            next = next.next
        }
        last_non_duplicate_node.next = next
        node = next
    }
    return sentinel.next
}
```

  * `*2`の引き継ぎ条件は、
    * 自分と最後に重複がない人は、重複していません。
    * 最後に重複がない人の向き先は、どこにも向いてません。
    * 自分が次の人と重複がなかった場合のみ、最後に重複がない人の向き先を自分に向けます。自分の向き先を切ります。
    * 自分が次の人と重複があった場合には、自分の更新のみを行います。

```javascript
// 引き継ぎ条件の中に、向き先が含まれていない場合。
const deleteDuplicates = function(head) {
    const sentinel = new ListNode(0, null) 
    let last_non_duplicate_node = sentinel
    let node = head
    while (node) {
        let next = node.next
        if (next === null) {
            last_non_duplicate_node.next = node
            break
        }
        if (node.val !== next.val) {
            last_non_duplicate_node.next = node
            last_non_duplicate_node = node
            node = next
            // 最後に重複した人の向き先を切ります。
            last_non_duplicate_node.next = null
            continue
        }
        while (next && node.val === next.val) {
            next = next.next
        }
        node = next
    }
    return sentinel.next
};
```
