# 238. Product of Array Except Self

## STEP1

### 発想

### 想定されるユースケース

### 何が分からなかったか?

### 発想 

* 自分の前までの積と自分の後ろ以降の積を掛け合わせる。

```javascript
const productExceptSelf = function(nums) {
    const prefixProductForward = new Array(nums.length).fill(0)
    const prefixProductReversed = new Array(nums.length).fill(0)

    let currentProduct = 1
    for (let i = 0; i < nums.length; i++) {
        currentProduct *= nums[i]
        prefixProductForward[i] = currentProduct
    }
    
    currentProduct = 1
    for (let i = nums.length - 1; i >=0; i--) {
        currentProduct *= nums[i]
        prefixProductReversed[i] = currentProduct
    }

    const result = []
    for (let i = 0; i < nums.length; i++) {
        if (i === 0) {
            result.push(prefixProductReversed[i + 1])
            continue
        }
        if (i === nums.length - 1) {
            result.push(prefixProductForward[i - 1])
            continue
        }
        result.push(prefixProductForward[i - 1] * prefixProductReversed[i + 1])
    }
    return result
};
```

## STEP2

```javascript
const productExceptSelf = function(nums) {
    const prefixProduct = new Array(nums.length)
    const prefixProductReversed = new Array(nums.length)

    let currentProduct = 1
    for (let i = 0; i < nums.length; i++) {
        currentProduct *= nums[i]
        prefixProduct[i] = currentProduct
    }
    
    let currentProductReversed = 1
    for (let i = nums.length - 1; 0 <= i; i--) {
        currentProductReversed *= nums[i]
        prefixProductReversed[i] = currentProductReversed
    }

    const result = []
    result.push(prefixProductReversed[1])
    for (let i = 1; i < nums.length - 1; i++) {
        result.push(prefixProduct[i - 1] * prefixProductReversed[i + 1])
    }
    result.push(prefixProduct[nums.length - 2])
    return result
};
```

## STEP3

```javascript
```

## 感想

### コメント集を読んで

## 他の人のPRを読んで

## その他の方法

* `*1` 番兵を使う方法 

```javascript
const productExceptSelf = function(nums) {
    const prefixProductForward = new Array(nums.length + 2)
    const prefixProductReversed = new Array(nums.length + 2)

    prefixProductForward[0] = 1
    prefixProductForward[nums.length + 1] = 1
    prefixProductReversed[0] = 1
    prefixProductReversed[nums.length + 1] = 1

    for (let i = 0; i < nums.length; i++) {
        prefixProductForward[i + 1] = prefixProductForward[i] * nums[i]
    }
    
    for (let i = nums.length - 1; i >=0; i--) {
        prefixProductReversed[i + 1] = prefixProductReversed[i + 2] * nums[i]
    }

    const result = []
    for (let i = 0; i < nums.length; i++) {
        result.push(prefixProductForward[i] * prefixProductReversed[i + 2])
    }
    return result
};
```

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

