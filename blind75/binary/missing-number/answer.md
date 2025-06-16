# Title

## STEP1

### 発想

### 想定されるユースケース

### 何が分からなかったか?

### ソートを用いた方法

- 手作業でやる
ソートをして、前後を比較する。

- 間違えた時のコード

```javascript
const missingNumber = function(nums) {
    nums.sort((a, b) => a - b)
    if (nums[0] !== 0) {
        return 0
    }
    for (let i = 1; i < nums.length; i++) {
        if (nums[i - 1] + 1 !== nums[i]) {
            return nums[i - 1] + 1
        }
    }
    throw new Error("invalid input")
};
```

- 正解した時のコード

[0,1]のケースを想定できていなかった。必ず、[0,n]の中でnが含まれることを想定したコードとなっていた。

```javascript
const missingNumber = function(nums) {
    nums.sort((a, b) => a - b)
    if (nums[0] !== 0) {
        return 0
    }
    for (let i = 1; i < nums.length; i++) {
        if (nums[i - 1] + 1 !== nums[i]) {
            return nums[i - 1] + 1
        }
    }
    return nums.length
};
```

- HashTableを使用する方法

```javascript
const missingNumber = function(nums) {
    const seenNum = new Map()
    for (let i = 0; i < nums.length + 1; i++) {
        seenNum.set(i, false)
    }
    for (let i = 0; i < nums.length; i++) {
        seenNum.set(nums[i], true)
    }
    for (let i = 0; i < nums.length + 1; i++) {
        if (seenNum.get(i) === false) {
            return i
        }
    }
    throw new Error("This error never be called")
};
```

- xorを用いた方法
  - まったく発想ができず、LeetCodeの答えを見て、理解を行った。

```javascript
const missingNumber = function(nums) {
    let xorResult = 0
    for (let i = 0; i < nums.length + 1; i++) {
        xorResult ^= i
    }
    for (const num of nums) {
        xorResult ^= num
    }
    return xorResult
};
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
