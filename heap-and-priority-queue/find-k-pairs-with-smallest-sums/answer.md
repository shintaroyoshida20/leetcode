# 373. Find K Pairs with Smallest Sums

## STEP1

* 発想
  * うまくいかなかったケース
    * 全てのペアを優先度付きキューに入れる。
    * 毎回入れた後に、k個を超えていた場合には、最大の和をもつペアを取り除く。
    * K個を取り出す。

```javascript
const kSmallestPairs = function(nums1, nums2, k) {
    this.top_k = new PriorityQueue((a, b) => b.sum - a.sum)
    for (const num1 of nums1) {
        for (const num2 of nums2) {
            const pair = {
                num1: num1,
                num2: num2,
                sum: num1 + num2,
            }
            if (this.top_k.size() < k) {
                this.top_k.enqueue(pair)
                continue
            }
            const max_pair = this.top_k.front()
            if (max_pair.sum > pair.sum) {
                this.top_k.enqueue(pair)
                while (this.top_k.size() > k) {
                    this.top_k.dequeue()
                }
            }
        }
    }
    const ans = []
    while (this.top_k.size() > 0) {
        const pair_and_sum = this.top_k.pop()
        ans.push([pair_and_sum.num1, pair_and_sum.num2])
    }
    return ans
};
```

* 上の例だと、Time Limit Exceededが発生した。
  * nums1とnums2がソートされていることを利用し、Time Limit Exceededが発生しないようにした。
    nusm1の個数 x nums2の個数を全て探索するのではなく、ある1つが条件を満たさない場合に
    それ以上大きいnums2を探さないように変更した。

```javascript
const kSmallestPairs = function(nums1, nums2, k) {
    this.top_k = new PriorityQueue((a, b) => b.sum - a.sum)
    for (const num1 of nums1) {
        for (const num2 of nums2) {
            const pair = {
                num1: num1,
                num2: num2,
                sum: num1 + num2,
            }
            if (this.top_k.size() < k) {
                this.top_k.enqueue(pair)
                continue
            }
            const max_pair = this.top_k.front()
            // Add these 3 lines compared with Time Limit Exceeded Code.
            if (max_pair.sum <= pair.sum) {
                break
            }
            this.top_k.enqueue(pair)
            while (this.top_k.size() > k) {
                this.top_k.dequeue()
            }
        }
    }
    const ans = []
    while (this.top_k.size() > 0) {
        const pair_and_sum = this.top_k.pop()
        ans.push([pair_and_sum.num1, pair_and_sum.num2])
    }
    return ans
};
```

* 改善した方法

## STEP2

* nums1, nums2を全て探索する方法.

```javascript
const kSmallestPairs = function(nums1, nums2, k) {
    this.top_k = new PriorityQueue((a, b) => b.sum - a.sum)
    for (const num1 of nums1) {
        for (const num2 of nums2) {
            const pair = {
                num1,
                num2,
                sum: num1 + num2,
            }
            if (this.top_k.size() < k) {
                this.top_k.push(pair)
                continue
            }
            const max_pair = this.top_k.front()
            if (max_pair.sum <= pair.sum) {
                break
            }
            this.top_k.push(pair)
            this.top_k.pop()
        }
    }
    const ans = []
    while (this.top_k.size() > 0) {
        const pair_and_sum = this.top_k.pop()
        ans.push([pair_and_sum.num1, pair_and_sum.num2])
    }
    return ans
};
```

## STEP3

* nums1, nums2を全て探索する方法.

```javascript
const kSmallestPairs = function(nums1, nums2, k) {
    const top_k = new PriorityQueue((a, b) => b.sum - a.sum)
    for (const num1 of nums1) {
        for (const num2 of nums2) {
            const pair = {
                num1,
                num2,
                sum: num1 + num2,
            }
            if (top_k.size() < k) {
                top_k.push(pair)
                continue
            }
            const max_pair = top_k.front()
            if (max_pair.sum <= pair.sum) {
                break
            }
            top_k.push(pair)
            top_k.pop()
        }
    }
    const ans = []
    while (top_k.size() > 0) {
        const pair = top_k.pop()
        ans.push([pair.num1, pair.num2])
    }
    return ans
};
```

## 感想

* 3回書く中で、頭の中が整理されてくる感覚を持つことができた。
* 先頭と最後を、対応させると書きやすい。

### コメント集を読んで

## その他の解法

* LeetCodeの解法
  発想は、
  * 1. [0,0]を箱に入れる。
  * 2. 最小となるの和となるペアを取り出す。
  * 3. ペアに対して、id1 + 1をしたペアとid2 + 1をしたペアを作り、箱に入れる。
  * 4. 2と3をkが満たされるまで実行する。

```javascript
const kSmallestPairs = function(nums1, nums2, k) {
    const visited_pairs = new Set()
    // nums1のインデックスをid1とする。
    const id1 = 0
    // nums2のインデックスをid2とする。
    const id2 = 0
    const key = `${id1}_${id2}`
    visited_pairs.add(key)
    const container = new PriorityQueue((a, b) => a.sum - b.sum)
    container.push({id1, id2, sum: nums1[id1] + nums2[id2]})

    const ans = []
    while (k > 0) {
        const min_pair = container.pop()
        const id1 = min_pair.id1
        const id2 = min_pair.id2
        ans.push([nums1[id1], nums2[id2]])

        const key1 = `${id1 + 1}_${id2}`
        if (id1 + 1 < nums1.length && !visited_pairs.has(key1)) {
            container.push({id1: id1 + 1, id2, sum: nums1[id1 + 1] + nums2[id2]})
            visited_pairs.add(key1)
        }

        const key2 = `${id1}_${id2 + 1}`
        if (id2 + 1 < nums2.length && !visited_pairs.has(key2)) {
            container.push({id1, id2: id2 + 1, sum: nums1[id1] + nums2[id2 + 1]})
            visited_pairs.add(key2)
        }

        k--
    }
    return ans
};
```
