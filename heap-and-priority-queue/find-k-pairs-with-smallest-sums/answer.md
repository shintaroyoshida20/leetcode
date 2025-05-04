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

* nums1, nums2の全ての組み合わせを探索する方法.

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

* nums1, nums2no全ての組み合わせを探索する方法.

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

* k個未満の要素が返ってきた時にどうするか? 

### 他の人のコードを読んで

* Mike0121のコード 
  * Folder : https://github.com/Mike0121/LeetCode/tree/528c89c1dfc93228cecabcc524b0eaf449cf9735/Arai60%202023/50.%20Find%20K%20Pairs%20with%20Smallest%20Sums
  * PR : https://github.com/Mike0121/LeetCode/pull/20
  * `while k > 0 and heap:` が読みづらい。
    * condition の中の個数を心の理論で決める。
    * 長くなった場合には、for/while statementの中で制御することも検討する。 
    * while statement / for statementの主役となる変数を元に考えれば良さそう。

* YukiMichishitaのコード
  * PR : https://github.com/YukiMichishita/LeetCode/pull/4/
  * 二方向ではなく、一方向だけチェックすればよい。

* https://github.com/nittoco/leetcode/pull/33/
  * 

* https://github.com/TORUS0818/leetcode/pull/12/

## その他の解法

* LeetCodeの解法 (左上を基点として、右方向/下方向に伸びていく方法)
  発想(手でやる)
  * 1. [0,0]を箱に入れる。
  * 2. 最小の和となるペアを箱から取り出す。
  * 3. ペアを紙袋に詰める。
  * 4. ペアに対して、id1 + 1をしたペアとid2 + 1をしたペアを作り、箱に入れる。
  * 5. 2と3を、紙袋の中身がk個になるまで実行する。

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

* setを使わずに解く方法 https://github.com/TORUS0818/leetcode/pull/12#discussion_r1623146530

```
const kSmallestPairs = function(nums1, nums2, k) {
    //  \  i_1, i_2, i_3, ... (nums1)
    // j_1  O    O    X
    // j_2  O    X    X
    // j_3  O    X    X
    // j_4  X    X    X
    // ...
    // (nums2)

    // 上の例だと、配列は以下になる。
    // next_i_in_each_j = [2, 1, 1, 0, ...]
    // next_j_in_each_i = [3, 1, 0, ...]


    // next_i_in_each_j: j行目が次に何を出すかを表す配列。
    // 言い換えると、nums2の各値に対して、
    // nums1の探索が小さい方からどれだけ終わったかを表す。
    const next_i_in_each_j = new Array(nums2.length).fill(0)

    // next_j_in_each_i: i列目が次に何を出すかを表す配列。
    // 言い換えると、nums1の各値に対して、
    // nums2の探索が小さい方からどれだけ終わったかを表す。
    const next_j_in_each_i = new Array(nums1.length).fill(0)

    const index_pairs = new PriorityQueue((pair1, pair2) => {
        const sum1 = nums1[pair1[0]] + nums2[pair1[1]]
        const sum2 = nums1[pair2[0]] + nums2[pair2[1]]
        return sum1 - sum2
    })

    index_pairs.push([0, 0])
    const ans = []
    while (ans.length < k) {
        const [i, j] = index_pairs.pop()
        console.log(i, j, nums1[i], nums2[j])
        ans.push([nums1[i], nums2[j]])
        ++next_i_in_each_j[j];
        ++next_j_in_each_i[i];

        if (i + 1 < nums1.length && next_j_in_each_i[i + 1] === j) {
            if (next_i_in_each_j[j] !== i + 1) {
                throw new Error("unexepected behavior")
            }
            index_pairs.push([i + 1, j])
        }

        if (j + 1 < nums2.length && next_i_in_each_j[j + 1] === i) {
            if (next_j_in_each_i[i] !== j + 1) {
                throw new Error("unexepected behavior")
            }
            index_pairs.push([i, j + 1])
        }
    }
    return ans
};
```

* ahayashiのPR に対するOdaのコメントを考慮した方法 
  * 参考: https://discord.com/channels/1084280443945353267/1200089668901937312/1222573940610695341
  * `add_to_heap_if_necessary(i + 1, j)`を関数化した方がよい
  * (x - 1, y) と (x, y - 1) が両方 pairs の中にある、または、x, y どちらかが0でなければ、heap に足さなくていいとは思うんですよね。 

```javascript
const kSmallestPairs = function(nums1, nums2, k) {
    const candidates = new PriorityQueue((index_pair1, index_pair2) => {
        const [i1, j1] = index_pair1
        const [i2, j2] = index_pair2
        return nums1[i1] + nums2[j1] - (nums1[i2] + nums2[j2])
    })
    const seen = new Set()

    function add_to_heap_if_necessary(i, j) {
        const key = `${i}_${j}`
        if (seen.has(key)) {
            return
        }
        if (i >= nums1.length || j >= nums2.length) {
            return
        }
        if (i === 0 || j === 0) {
            candidates.push([i, j])
            seen.add(key)
            return
        }
        const key1 = `${i - 1}_${j}`
        const key2 = `${i}_${j - 1}`
        if (seen.has(key1) && seen.has(key2)) {
            candidates.push([i, j])
            seen.add(key)
            return
        }
    }

    add_to_heap_if_necessary(0, 0)
    const ans = []
    while (ans.length < k) {
        if (candidates.size() === 0) {
            break
        }
        const [i, j] = candidates.pop()
        ans.push([nums1[i], nums2[j]])

        add_to_heap_if_necessary(i + 1, j)
        add_to_heap_if_necessary(i, j + 1)
    }
    return ans
};
```

* yield generatorを使った方法

```javascript
```

* 右と下への探索ではなく、下方向のみにする方法もある。(右方向のみも可能)

```
```

