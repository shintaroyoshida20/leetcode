# Title

## STEP1

* 発想(誤り)
  * しゃくとり虫みたいに、2つのポインターを用意し、
    合計値より小さい場合には、右のポインターを動かし、
    合計値より大きい場合には、左のポインターを動かす。

```javascript
const subarraySum = function(nums, k) {
    let currentSum = nums[0]
    let left = 0
    let right = 0
    let subArrayCount = 0
    while (right < nums.length) {
        if (currentSum === k) {
            subArrayCount++
        }
        if (left < right && k < currentSum) {
            currentSum -= nums[left]
            left++
            continue
        }
        right++
        currentSum += nums[right]
    }
    return subArrayCount
};
```

* 上の発想では、要素にマイナスのケースが入ることを考慮できていなかった。
  ---> 答えを見る。

* 発想 (正しい)
  * for文で回す
    * 各インデックスをsubarrayのお尻となるインデックスを固定し、
      先頭となるインデックスを累積和をkey, 回数をvalueとするハッシュテーブルから見つける。

```javascript
const subarraySum = function(nums, k) {
    const cumSumToCount = new Map()
    cumSumToCount.set(0, 1)

    let sum = 0
    let count = 0
    for (const num of nums) {
        sum += num
        if (cumSumToCount.has(sum - k)) {
            count += cumSumToCount.get(sum - k)
        }
        if (!cumSumToCount.has(sum)) {
            cumSumToCount.set(sum, 0)
        }
        cumSumToCount.set(sum, cumSumToCount.get(sum) + 1)
    }
    return count
};
```

## STEP2

* 特に治すところはないと感じた。

* STEP3をやった後に、感じた修正点

  * sumという変数名よりもprefixSum, cumSumの方が良い。

  * 以下の記法でも良い。(https://github.com/goto-untrapped/Arai60/pull/28/files#r1641918143のレビューを見て)
    JavaScriptでもPythonのDefaultDictのdefaultの値のようなことができる。

(変更前)

```javascript
        if (!cumSumToCount.has(sum)) {
            cumSumToCount.set(sum, 0)
        }
        cumSumToCount.set(sum, cumSumToCount.get(sum) + 1)
```

(変更後)

```javascript
        cumSumToCount.set(sum, (cumSumToCount.get(sum) || 0) + 1)
```

```javascript
const subarraySum = function(nums, k) {
    const cumSumToCount = new Map()
    cumSumToCount.set(0, 1)
    let count = 0
    let sum = 0
    for (const num of nums) {
        sum += num
        if (cumSumToCount.has(sum - k)) {
            count += cumSumToCount.get(sum - k)
        }
        if (!cumSumToCount.has(sum)) {
            cumSumToCount.set(sum, 0)
        }
        cumSumToCount.set(sum, cumSumToCount.get(sum) + 1)
    }
    return count
};
```

## STEP3

* 時間計算量 : O(N)
* 空間計算量 : O(N)

```javascript
const subarraySum = function(nums, k) {
    const cumSumToCount = new Map()
    cumSumToCount.set(0, 1)

    let sum = 0
    let count = 0
    for (const num of nums) {
        sum += num
        if (cumSumToCount.get(sum - k)) {
            count += cumSumToCount.get(sum - k)
        }
        if (!cumSumToCount.has(sum)) {
            cumSumToCount.set(sum, 0)
        }
        cumSumToCount.set(sum, cumSumToCount.get(sum) + 1)
    }
    return count
};
```

## 感想

### コメント集を読んで

* 特になし

### 他の人のPRを読んで

* katataku 
  * PR: https://github.com/katataku/leetcode/pull/15
  * 変数名は、sum よりも `prefixSum`, `cumSum`とすべきだった。
    https://github.com/katataku/leetcode/pull/15/files#diff-302b3c57a99f55a6ede5338b83f17a5d903d52dbeddd3fe485ae5f5d1cdc4badR64-R68

* goto-untrapped
  * PR: https://github.com/goto-untrapped/Arai60/pull/28/
  * mapのset時の短縮記法をJavascriptでもできることを知りました。

* Harukawa2121
  * PR: https://github.com/Hurukawa2121/leetcode/pull/16/

* hproc
  * PR: https://github.com/hroc135/leetcode/pull/16/
  * https://github.com/hroc135/leetcode/pull/16/files#r1739569493
  * 実行時間を見積もってみる
    * `*0`の場合、
      N = 2 * (10 ** 4)
      実行時間の見積もり
      = 2 * (10 `**` 4) * 2 * (10 `**` 4) / (10 `**` 7) (C++よりもJavascriptが100倍遅いとする, 1G / 100 = 10 `**` 7)
      = 40 seconds
      実際には、
      = 1.569 seconds
    * 上で生じた差の考察としては、もう少しjavascriptの処理できるステップ数が大きいということなのだろうか?
      * まだ考察できる引き出しが少ない。

* Yoshiki-Iwasa
  * https://github.com/Yoshiki-Iwasa/Arai60/pull/15

* hayashi-ay 
  * PR: https://github.com/hayashi-ay/leetcode/pull/31/
  * DPを用いた方法が理解できなかった。 https://github.com/hayashi-ay/leetcode/pull/31/files#diff-302b3c57a99f55a6ede5338b83f17a5d903d52dbeddd3fe485ae5f5d1cdc4badR49-R61

## エラーだったコード

* `*0` 演算子の優先順位

* 誤り

```javascript
const cumSumToIndex = new Map()
cumSumToIndex.set(0, 1)
let cumSum = 0
cumSumToIndex.set(cumSum, cumSumToIndex.get(0) || 0 + 1)
```

* 正解
  * `+`の演算子 が `||`の演算子よりも先に処理される
  * 参考: 演算子の優先順位 https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Operator_precedence

```javascript
const cumSumToIndex = new Map()
cumSumToIndex.set(0, 1)
let cumSum = 0
cumSumToIndex.set(cumSum, (cumSumToIndex.get(0) || 0) + 1)
```

## その他の解法

* `*0` ブルートフォースの方法
  * N = numsの長さ
  * 時間計算量 : O(N^2)
  * 空間計算量 : O(1)

```javascript
const subarraySum = function(nums, k) {
    let subArrayCount= 0
    for (let i = 0; i < nums.length; i++) {
        let sum = 0;
        for (let j = i; j < nums.length; j++) {
            sum += nums[j]
            if (sum === k) {
                subArrayCount++
            }
        }
    }
    return subArrayCount
};
```

* `*1` 累積和を使った方法
  * N = numsの長さ
  * 時間計算量 : O(N^2)
  * 空間計算量 : O(N)

```javascript
const subarraySum = function(nums, k) {
    const cumSum = new Array(nums.length + 1)
    cumSum[0] = 0
    for (let i = 0; i < nums.length; i++) {
        cumSum[i + 1] = cumSum[i] + nums[i]
    }

    let count = 0
    for (let i = 0; i < nums.length; i++) {
        for (let j = i; j < nums.length; j++) {
            if (cumSum[j + 1] - cumSum[i] === k) {
                count++
            }
        }
    }
    return count
};
```

* `*2` 山に駅があり、標高差がKである駅を求めるというイメージで解いた方法

```javascript
//　山に駅があり、標高差がある。
// それぞれの駅は前の駅との標高差が書いてある。
// 駅と駅の間の標高差が、K mの組み合わせの個数を求める。
const subarraySum = function(nums, k) {
    const heightToCount = new Map()
    heightToCount.set(0, 1)
    let count = 0
    let currentHeight = 0
    for (const num of nums) {
        currentHeight += num
        const targetStationCount = heightToCount.get(currentHeight - k)
        if (targetStationCount !== undefined) {
            count += targetStationCount
        }
        const previousCount = heightToCount.get(currentHeight) || 0
        heightToCount.set(currentHeight, previousCount + 1)
    }
    return count
};
```

## 調べたこと

* cumulative sumをjavascriptでどのようにかけるか? 
https://stackoverflow.com/questions/20477177/creating-an-array-of-cumulative-sum-in-javascript

* JavaScriptにおける演算子の優先順位 
  * || よりも +が早いことを知らなかった
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Operator_precedence 


