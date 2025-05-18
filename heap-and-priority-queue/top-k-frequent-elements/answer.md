# 347. Top K Frequent Elements

## STEP 1

* 配列をソートする方法
  * HashTableで数字ごとの回数を数える。
  * 回数でソートをして、トップKの数を数える。
  * mapをvalueでsortする箇所は分からなかったため、stackoverflowを参照した。
    https://stackoverflow.com/questions/37982476/how-to-sort-a-map-by-value-in-javascript
  * 時間計算量 : N LogN
  * 空間計算量 : N

```javascript
const topKFrequent = function(nums, k) {
    const count = new Map()
    for (const num of nums) {
        if (count.get(num) === undefined) {
            count.set(num, 0)
        }
        count.set(num, count.get(num) + 1)
    }
    const sortedCount = new Map([...count.entries()].sort((a, b)=> b[1] - a[1]))
    const ans = sortedCount.keys().toArray().slice(0, k)
    return ans
};
```

* LeetCodeの解法を見て、HeapでK LogK

  * 時間計算量 : K logK

## STEP 2

* コメントを追加
* countという変数名を、`numToCount`に変更。
* ansを`topkFrequentNum`
* map のdefault valueを|| operatorで実装する。

```javascript
const topKFrequent = function(nums, k) {
    const numToCount = new Map()
    for (const num of nums) {
        const currentCount = numToCount.get(num) || 0
        numToCount.set(num, currentCount + 1)
    }
    const countSortedNum = new Map([...numToCount.entries()].sort((a, b) => b[1] - a[1]))
    const topkFrequentNum = countSortedNum.keys().toArray().slice(0, k)
    return topkFrequentNum
}
```

## STEP3

```javascript
const topKFrequent = function(nums, k) {
    const numToCount = new Map()
    for (const num of nums) {
        const currentCount = numToCount.get(num) || 0
        numToCount.set(num, currentCount + 1)
    }
    const countSortedNum = new Map([...numToCount.entries()].sort((a, b) => b[1] - a[1]))
    const topkFrequentNum = countSortedNum.keys().toArray().slice(0, k)
    return topkFrequentNum
};
```

## 感想

### コメント集を読んで

## 他の人のPRを読んで

## その他の方法

* `*0` Heapを用いた方法
  入力でユニークな数の個数をNとする。
  * 時間計算量: N log N + k log N
  * 空間計算量: N 

```javascript
const topKFrequent = function(nums, k) {
    const frequencySortedNum = new PriorityQueue((a, b) => b.frequency - a.frequency)
    const numToFrequency = new Map()
    for (const num of nums) {
        const count = numToFrequency.get(num) || 0
        numToFrequency.set(num, count + 1)
    }

    const generator = numToFrequency.entries()
    let next = generator.next()
    while (!next.done) {
        const [num, frequency] = next.value
        frequencySortedNum.push({num, frequency})
        next = generator.next()
    }

    const topKFrequent = []
    while (k > 0) {
        const pair = frequencySortedNum.pop()
        topKFrequent.push(pair.num)
        k--
    }
    return topKFrequent
};
```

### コードの良し悪し

* `*0`

* `*1`

