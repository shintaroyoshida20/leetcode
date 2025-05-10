# 349. Intersection of Two Arrays

## STEP1

* 発想

* nums1で数字ごとの出現の有無を記録しておく。
* nums2のそれぞれの数字について、
    * nums1で出現している場合には、回答に追加。
    * nums1の出現の記録を消す。

```javascript
const intersection = function(nums1, nums2) {
    const is_num_appeared = new Map()
    for (const num1 of nums1) {
        is_num_appeared.set(num1, true)
    }
    const ans = []
    for (const num2 of nums2) {
        if (is_num_appeared.get(num2) === true) {
            ans.push(num2)
            // 重複して数えないように, mapの値をfalseにする.
            is_num_appeared.set(num2, false)
        }
    }
    return ans
};
```

## STEP2

* 整え方
  * 例外処理をif statementで書き、追加処理をif continueの後の処理で書くようにした.

```javascript
const intersection = function(nums1, nums2) {
    const is_num_appeared = new Map()
    for (const num1 of nums1) {
        is_num_appeared.set(num1, true)
    }
    const ans = []
    for (const num2 of nums2) {
        if (!is_num_appeared.has(num2) || is_num_appeared.get(num2) === false) {
            continue
        }
        ans.push(num2)
        is_num_appeared.set(num2, false)
    }
    return ans
};
```

## STEP3

```javascript
const intersection = function(nums1, nums2) {
    const is_num_appeared = new Map()
    for (const num1 of nums1) {
        is_num_appeared.set(num1, true)
    }
    const ans = []
    for (const num2 of nums2) {
        if (!is_num_appeared.has(num2) || is_num_appeared.get(num2) === false) {
            continue
        }
        is_num_appeared.set(num2, false)
        ans.push(num2)
    }
    return ans
};
```

## 感想

* STEP1で使用した方法が、CountingSortの概念と近いというコメントを見て、
  Counting Sortを勉強したところ、配列の要素をマイナス側に更新するところが類似していた。

### コメント集を読んで

* 両方が大きい場合
  * メモリの制約がある場合、Two Pointerを用いて解く。
    空間計算量が O(1)
    時間計算量が O(N log N)
  * メモリの制約がない場合には、setを作成して解く。
    空間計算量が、O(N + M)
    時間計算量が、O(N + M)
      * 内訳は、setの作成にO(N) + O(M)で、intersectionの作成は、O(min(N, M))

* 片方が大きい場合 
  * 小さい方の配列の要素数をN, 大きい方の配列の要素数をMとする
  * すでにソートがされているとすると、
  * バイナリサーチを用いる。
    * 時間計算量 O(N * logM)
    * 空間計算量 O(N)

### 他の人のコードを読んで

* hayashi-ay
  * PR: https://github.com/hayashi-ay/leetcode/pull/21/

* Ryotaro25
  * PR: https://github.com/Ryotaro25/leetcode_first60/pull/14/

* olsen-blue
  * PR: https://github.com/olsen-blue/Arai60/pull/13/
  * binary searchの終了条件について、曖昧に理解していたので、
    理解ができた。
    参考: https://github.com/olsen-blue/Arai60/pull/13/files#r1911982288 

* hroc135
  * PR: https://github.com/hroc135/leetcode/pull/13/

## その他の解法

* `*1` Setを用いた方法.
  * 質問者に、期待されている解き方ではない。

```javascript
const intersection = function(nums1, nums2) {
    const num1_set = new Set(nums1)
    const num2_set = new Set(nums2)

    const generator = num1_set.values()
    let next = generator.next()
    const ans = []
    while (!next.done) {
        const num1 = next.value
        if (!num2_set.has(num1)) {
            next = generator.next()
            continue
        }
        ans.push(num1)
        next = generator.next()
    }
    return ans
};
```

* `*2` Setのintersection関数を使用した方法

```javascript
const intersection = function(nums1, nums2) {
    const num1_set = new Set(nums1)
    const num2_set = new Set(nums2)

    const intersection = num1_set.intersection(num2_set)
    return intersection.values().toArray()
};
```

* `*3` Two Pointerを使った方法 

```javascript

const intersection = function(nums1, nums2) {
    nums1.sort((a, b) => a - b)
    nums2.sort((a, b) => a - b)

    let i = 0
    let j = 0
    const result = []
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] === nums2[j]) {
            result.push(nums1[i])
            // nums1で異なる値がみつかるまで、iを増やす
            while (nums1[i] === nums1[i+1] && i < nums1.length) {
                i++
            }
            i++
            // nums2で異なる値がみつかるまで、jを増やす
            while (nums2[j] === nums2[j+1] && j < nums2.length) {
                j++
            }
            j++
            continue
        }
        if (nums1[i] < nums2[j]) {
            i++
            continue
        }
        j++
    }
    return result
};
```

* `*4` 配列の片方がすごく大きく、ソートされている場合に、Binary Searchを使って解く方法がある。

```javascript
const intersection = function(nums1, nums2) {
    // nums2の配列がとても大きいとする。
    // かつ、nums2がソートされている場合を考える。
    nums2.sort((a, b) => a - b)

    const num1_set = new Set(nums1)
    // merge sort
    // ターゲット:
    //  存在しないこともありうる。
    // 引き継ぎ条件:
    //  left <= target <= right
    const generator = num1_set.values()
    let next = generator.next()
    const ans = []
    while (!next.done) {
        const num1 = next.value
        let left = 0
        let right = nums2.length - 1
        while (left <= right) {
            const middle = Math.floor((left + right) / 2)
            if (nums2[middle] === num1) {
                ans.push(num1)
                break
            }
            if (nums2[middle] < num1) {
                left = middle + 1
                continue
            }
            right = middle - 1
        }
        next = generator.next()
    }
    return ans
};
```

## レビューコメントを受けて

### レビュー(1) If文にどの条件/どの順番で書くか?

* (変更前)

```javascript
const intersection = function(nums1, nums2) {
    nums1.sort((a, b) => a - b)
    nums2.sort((a, b) => a - b)

    let i = 0
    let j = 0
    const result = []
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] === nums2[j]) {
            result.push(nums1[i])
            while (nums1[i] === nums1[i+1] && i < nums1.length) {
                i++
            }
            i++
            while (nums2[j] === nums2[j+1] && j < nums2.length) {
                j++
            }
            j++
            continue
        }
        if (nums1[i] < nums2[j]) {
            i++
            continue
        }
        j++
    }
    return result
};
```

* (変更後)

* セルフレビュー
  * `j++`と`i++`がwhileの外にあって読みづらい.
  * どの条件式をearly returnにするか? 
    * ロジックが長いものは、後ろに回す。

```javascript
const intersection = function(nums1, nums2) {
    nums1.sort((a, b) => a - b)
    nums2.sort((a, b) => a - b)

    let i = 0
    let j = 0
    const result = []
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] < nums2[j]) {
            i++
            continue
        }
        if (nums2[j] < nums1[i]) {
            j++
            continue
        }
        const common = nums1[i]
        result.push(common)
        while (nums1[i] === common && i < nums1.length) {
            i++
        }
        while (nums2[j] === common && j < nums2.length) {
            j++
        }
    }
    return result
};
```

### レビュー (2) 配列の範囲外のアクセスを考慮した実装

* 変更前

```javascript
const intersection = function(nums1, nums2) {
    nums1.sort((a, b) => a - b)
    nums2.sort((a, b) => a - b)

    let i = 0
    let j = 0
    const result = []
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] === nums2[j]) {
            result.push(nums1[i])
            // nums1で異なる値がみつかるまで、iを増やす
            while (nums1[i] === nums1[i+1] && i < nums1.length) {
                i++
            }
            i++
            // nums2で異なる値がみつかるまで、jを増やす
            while (nums2[j] === nums2[j+1] && j < nums2.length) {
                j++
            }
            j++
            continue
        }
        if (nums1[i] < nums2[j]) {
            i++
            continue
        }
        j++
    }
    return result
};
```

* 変更後

```javascript
const intersection = function(nums1, nums2) {
    nums1.sort((a, b) => a - b)
    nums2.sort((a, b) => a - b)

    let i = 0
    let j = 0
    const result = []
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] === nums2[j]) {
            result.push(nums1[i])
            // UPDATED. 先にiがnums1の上に載っていることを確認する。
            while (i < nums1.length && nums1[i] === nums1[i + 1]) {
                i++
            }
            i++
            // UPDATED. 先にjがnums2の上に載っていることを確認する。
            while (j < nums2.length && nums2[j] === nums2[j + 1]) {
                j++
            }
            j++
            continue
        }
        if (nums1[i] < nums2[j]) {
            i++
            continue
        }
        j++
    }
    return result
};
```

