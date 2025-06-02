# Title

## STEP1

### 発想

### 想定されるユースケース

### 何が分からなかったか?

* 動かなかった時のコード

```javascript
const search = function(nums, target) {
    let left = 0
    let right = nums.length - 2
    // loop condition: left <= target <= right, and 2 vars exists on 
    let rotationIdx = 0
    while (left < right) {
        const middle = Math.floor((left + right) / 2)
        if (nums[middle + 1] < nums[middle]) {
            rotationIdx = middle + 1
            break
        }
        if (nums[0] < nums[middle]) {
            left = middle + 1
            continue
        }
        right = middle - 1
    }
    if (rotationIdx > 0 && nums[0] <= target) {
        left = 0
        right = rotationIdx - 1
    } else if (rotationIdx > 0 && target < nums[0]) {
        left = rotationIdx
        right = nums.length - 1
    } else {
        left = 0
        right = nums.length - 1
    }
    while (left < right) {
        const middle = Math.floor((left + right) / 2)
        if (nums[middle] < target) {
            left = middle + 1
            continue
        }
        right = middle
    }
    if (nums[left] === target) {
        return left
    }
    return -1
    
};
```

```javascript
const search = function(nums, target) {
    let left = 0
    let right = nums.length - 2
    // loop condition: left <= target <= right, and 1 vars exists on 
    // break condition: when we find the rotation Index or cannot find the rotation index
    let rotationIdx = 0
    while (left <= right) {
        const middle = Math.floor((left + right) / 2)
        if (nums[middle + 1] < nums[middle]) {
            rotationIdx = middle + 1
            break
        }
        if (nums[0] <= nums[middle]) {
            left = middle + 1
            continue
        }
        right = middle - 1
    }
    if (rotationIdx > 0 && nums[0] <= target) {
        left = 0
        right = rotationIdx - 1
    } else if (rotationIdx > 0 && target < nums[0]) {
        left = rotationIdx
        right = nums.length - 1
    } else {
        left = 0
        right = nums.length - 1
    }
    while (left < right) {
        const middle = Math.floor((left + right) / 2)
        if (nums[middle] < target) {
            left = middle + 1
            continue
        }
        right = middle
    }
    if (nums[left] === target) {
        return left
    }
    return -1
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

* `*1`

## 調べたこと

