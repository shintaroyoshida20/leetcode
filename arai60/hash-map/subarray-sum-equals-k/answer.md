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
