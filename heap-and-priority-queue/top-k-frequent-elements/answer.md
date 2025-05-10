# 347. Top K Frequent Elements

## STEP 1

* 配列をソートする方法
  * HashTableでカウントをする。valueで降順でソートをして、keyをk個返す。
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
    const sorted_count = new Map([...count.entries()].sort((a, b)=> b[1] - a[1]))
    const ans = sorted_count.keys().toArray().slice(0, k)
    return ans
};
```

* LeetCodeの解法を見て、HeapでK LogK

  * 時間計算量 : K logK

