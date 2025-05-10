# 142. Linked List Cycle II

## STEP 1

```javascript
var detectCycle = function(head) {
    const visited = new Set()
    let node = head 
    while (node) {
        if (visited.has(node)) return node
        visited.add(node)
        node = node.next
    }
    return null
};
```

```javascript
var detectCycle = function(head) {

    if (head === null || head.next === null) return null
    let faster_node = head.next.next
    let slower_node = head.next

    while (faster_node !== slower_node) {
        if (faster_node === null || faster_node.next === null) return null
        faster_node = faster_node.next.next
        slower_node = slower_node.next
    }

    faster_node = head
    while (faster_node !== slower_node) {
        faster_node = faster_node.next
        slower_node = slower_node.next
    }
    return faster_node
};
```

### 感想 

* 以下の初期値を設定した際に、フロイドの循環検出法の条件と一致しておらず、無限ループが発生した。
  * このエラーのデバッグに時間がかかった。

正しい 

```javascript
    let faster_node = head
    let slower_node = head
```

誤り 

```javascript
    let faster_node = head.next
    let slower_node = head
```

## STEP 2

```javascript
var detectCycle = function(head) {

    // 先頭がnullまたは、先頭の次のノードがnullの場合には、サイクルが存在しない.
    if (head === null || head.next === null) return null
    let fast_node = head.next.next
    let slow_node = head.next

    // フロイドの循環検出法を用いる。
    // ステップ1) 速いノードと遅いノードが一致する地点を見つける。
    // もし、速いノードがnullになった場合、サイクルは存在しない。
    while (fast_node !== slow_node) {
        if (fast_node === null || fast_node.next === null) return null
        fast_node = fast_node.next.next
        slow_node = slow_node.next
    }
    const merged_node = fast_node

    // ステップ2) 一致した地点と先頭から1つずつノードを進め、一致する点を見つける。
    let first_node = head
    let second_node = merged_node
    while (first_node !== second_node) {
        first_node = first_node.next
        second_node = second_node.next
    }
    const cycle_start_node = first_node
    return cycle_start_node
};
```

## STEP 3

```javascript
var detectCycle = function(head) {
    if (head === null || head.next === null) return null
    let fast_node = head.next.next
    let slow_node = head.next

    while (fast_node !== slow_node) {
        if (fast_node === null || fast_node.next === null) return null
        fast_node = fast_node.next.next
        slow_node = slow_node.next
    }
    const merged_node = fast_node

    let first_node = head
    let second_node = merged_node
    while (first_node !== second_node) {
        first_node = first_node.next
        second_node = second_node.next
    }
    const cycle_start_node = first_node
    return cycle_start_node
};
```

### 感想

* 1つの変数名が複数の意味を持つのを避けるため、変数を付け直す形で実装した。

* 時間計算量は、O(N)
  詳しくは、O(2F + A) < O(2N) = O(N)
  ただし、
  * 連結リストの先頭から、サイクルの開始までの距離をFとし、
  * サイクルの開始から合流地点までの距離をAとする。
* 空間計算量は、O(1)

* フロイドの循環検出法を学んだ。
  参考) [Wikipedia Cycle detection](https://en.wikipedia.org/wiki/Cycle_detection)
  * 以下は、数式を用いない説明。
    * カメとウサギが衝突した地点から、逆の方向に同じスピードで戻るとします。
      * その際に、カメはスタート地点まで直線の道でもどり、ウサギはサイクルを一周してから戻るものとします。
    * カメがスタート地点まで戻った時には、ウサギの地点は衝突地点にいます。
      * なぜなら
        * ウサギが順方向に走った距離は、カメが順方向に歩いた距離の2倍です。
        * 逆の方向に同じスピードで戻ったので、うさぎの残りの距離はカメが歩いた距離です。
        * カメが順方向に歩いた距離は、スタート地点から衝突地点までの距離です。
    * 戻る際の道順では、サイクルの開始地点までは同じ距離を同じスピードで歩き、
      そこからウサギは、サイクルの終了地点に進み、カメはスタート地点に向かって進みます。
    カメがスタート地点に戻った時、ウサギは衝突地点にいることを踏まえると、
    スタート地点からサイクルの開始地点までの距離は、衝突地点からサイクルの終了地点までの距離と等しいです。

  * 以下は数式を用いた説明。
    * 連結リストの先頭から、サイクルの開始までの距離をF
    * サイクルの開始から合流地点までの距離をA
    * 合流地点からサイクル終了までの距離をBとする。

```
カメ : F + A 
ウサギ : F + A + N * (A + B)

カメの速度 : 1
ウサギの速度 : 2
なので、
2 * (F + A) = F + A + N * (A + B)
F = (N - 1) * (A + B) + B
--> 先頭からF進むと、衝突箇所からB進んだ地点にいることになり、ちょうどサイクルの開始地点にいることになる。
```

