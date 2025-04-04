# 142. Linked List Cycle II

## STEP 1

```javascript
var detectCycle = function(head) {
    const visited = new Set()
    let cur = head 
    while (cur) {
        if (visited.has(cur)) return cur
        visited.add(cur)
        cur = cur.next
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
```
    let faster_node = head
    let slower_node = head
```
誤り 
```
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

```
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

* フロイドの循環検出法を学んだ。
  * ノードの開始から、サイクルの開始までの距離をF
  * サイクルの開始から衝突までの距離をA
  * 衝突からサイクル終了までの距離をBとする。

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

