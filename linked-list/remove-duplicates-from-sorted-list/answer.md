# 83. Remove Duplicates from Sorted List

## STEP 1

### 解法(1)

* 解法(1)の考え方

  * 先頭から開始し、ノードが無くなるまで以下を行う。
    * (1) 自分とは値が違うノードが見つかるまで次のノードを探索する。
    * (2) 値が違うノードが見つかれば、自分のむき先を、値が違うノードに向ける。
    * (3) (1)に戻る。

* 解法(1)の感想 
  * 2つ目のWhile分のnullチェックを忘れてしまった。ノードを次に進める際には、nullチェックをセットでやるようにする。

    * 誤り 
      ```
        while (current.val === nextNode.val) {
      ```

    * 正しい
      ```
        while (nextNode && current.val === nextNode.val) {
      ```

```javascript
var deleteDuplicates = function(head) {
    let current = head
    while (current !== null && current.next !== null) {
        let nextNode = current.next
        while (nextNode && current.val === nextNode.val) {
            nextNode = nextNode.next
        }
        current.next = nextNode
        current = nextNode
    }
    return head
};
```

### 解法(2)

* 解法(2)の考え方

  * 先頭から開始し、ノードが無くなるまで以下を行う。
    * 自分のノードと次のノードの値を比較する。
      * 値が違う場合には、次のノードに進む。
      * 値が同じ場合には、自分のノードのむき先を次の次のノードに向ける。

```javascript
var deleteDuplicates = function(head) {
    let current = head
    while (current !== null && current.next !== null) {
        let nextNode = current.next
        if (current.val === nextNode.val) {
            current.next = nextNode.next
        } else {
            current = nextNode
        }
    }
    return head
};
```

## STEP 2

### 感想

* 解法(1) の方が、コードが読みやすいと感じたため、解法(1)を採用した。

* 情報量は同じだと考えたので、nullチェックを短縮記法に切り替えた。

  * 変更前

```
    while (current !== null && current.next !== null) {
```

  * 変更後

```
    while (current && current.next) {
```

### 解法

```javascript
var deleteDuplicates = function(head) {
    let current = head
    while (current && current.next) {
        // 値が異なるノードが見つかるまで探索する。
        let nextNode = current.next
        while (nextNode && current.val === nextNode.val) {
            nextNode = nextNode.next
        }

        // 現在のノードのむき先を更新する。
        current.next = nextNode

        // 現在のノードを更新する。
        current = nextNode
    }
    return head
};
```

## STEP 3

### 感想

* 頭で考えたことをコードに落とし込めたことがよかった。
  * いきなりコードを書かずに、解法の戦略を練ってから解くことを意識する。

```javascript
var deleteDuplicates = function(head) {
    let current = head 
    while (current && current.next) {
        let nextNode = current.next
        while (nextNode && current.val === nextNode.val) {
            nextNode = nextNode.next
        }
        current.next = nextNode
        current = nextNode
    }
    return head
};
```
