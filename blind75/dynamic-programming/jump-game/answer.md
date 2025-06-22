# 55. Jump Game

## STEP1

### 発想

### 想定されるユースケース

### 何が分からなかったか?

- Brute Forceを用いたTLEになる誤ったコード
  - 全く思いつくことができなかった。

```javascript
const canJumpFromPosition = function(nums, position) {
    if (position === nums.length - 1) {
        return true
    }
    const maxStep = nums[position]
    for (let step = 1; step <= maxStep; step++) {
        if (canJumpFromPosition(nums, position + step)) {
            return true
        }
    }
    return false
}

const canJump = function(nums) {
    return canJumpFromPosition(nums, 0)
};
```

- Top-Downで、Good Index / Bad Indexを保持しておく。

```javascript
const canJumpFromPosition = function(nums, memo, position) {
    if (memo[position] !== -1) {
        return memo[position] === 1
    }
    const maxStep = nums[position]
    for (let step = 1; step <= maxStep; step++) {
        if (canJumpFromPosition(nums, memo, position + step)) {
            memo[position] = 1
            return true
        }
    }
    memo[position] = 0
    return false
}

const canJump = function(nums) {
    const memo = new Array(nums.length).fill(-1)
    // -1: Unknown
    // 0:  Bad
    // 1:  Good
    memo[memo.length - 1] = 1
    return canJumpFromPosition(nums, memo, 0)
};
```

- 再帰を使わない方法

```javascript
const canJump = function(nums) {
    const memo = new Array(nums.length).fill(-1)
    memo[nums.length - 1] = 1
    for (let i = nums.length - 2; i >= 0; i--) {
        const maxIndex = Math.min(i + nums[i], nums.length - 1)
        for (let j = i + 1; j <= maxIndex; j++) {
            if (memo[j] === 1) {
                memo[i] = 1
                break
            }
        }
    }
    return memo[0] === 1
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

