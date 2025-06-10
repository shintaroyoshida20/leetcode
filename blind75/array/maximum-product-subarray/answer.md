# 152. Maximum Product Subarray

## STEP1

### 発想

### 想定されるユースケース

### 何が分からなかったか?

```javascript
const maxProduct = function(nums) {
    // use prefix product.
    let maxProduct = -Infinity
    for (let i = 0; i< nums.length; i++) {
        let currentProduct = 1
        for (let j = i; j < nums.length; j++) {
            currentProduct *= nums[j]
            maxProduct = Math.max(maxProduct, currentProduct)
        }
    }
    return maxProduct
};
```

- LeetCodeの解法を見た。
- 最大に加えて、最小を残すという方法が思いつかなかった。

- 動かなかった時のコード
```javascript
const maxProduct = function(nums) {
    let minSoFar = nums[0]
    let maxSoFar = nums[0]
    let maxProduct = nums[0]
    for (let i = 1; i < nums.length; i++) {
        const num = nums[i]
        maxProductCandidate1 = Math.max(minSoFar * num, maxSoFar * num)
        maxProductCandidate2 = Math.max(maxProduct, num)
        maxProduct = Math.max(maxProductCandidate1, maxProductCandidate2)
        
        minSoFar = Math.min(num, Math.min(minSoFar * num, maxSoFar * num))
        maxSoFar = Math.max(num, Math.max(minSoFar * num, maxSoFar * num))
    }
    return maxProduct
}
```
- 正しい時のコード
```javascript
const maxProduct = function(nums) {
    let minSoFar = nums[0]
    let maxSoFar = nums[0]
    let maxProduct = nums[0]
    for (let i = 1; i < nums.length; i++) {
        const num = nums[i]
        const tempMaxSoFar = Math.max(num, Math.max(minSoFar * num, maxSoFar * num))
        maxProduct = Math.max(maxProduct, tempMaxSoFar)
        
        minSoFar = Math.min(num, Math.min(minSoFar * num, maxSoFar * num))
        maxSoFar = tempMaxSoFar
    }
    return maxProduct
}
```
## STEP2

```javascript
```

## STEP3

```javascript
```

## 感想

### コメント集を読んで

## 他の人のPRを読んで

## その他の方法

### コードの良し悪し

* `*0`
  * 時間計算量:
  * 空間計算量:

* `*1`
  * 時間計算量:
  * 空間計算量:

* `*2`
  * 時間計算量:
  * 空間計算量:

## 調べたこと
