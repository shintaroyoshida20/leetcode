# Title

## STEP1

### 発想

* 境界を探す問題。境界がないこともありうる。
  
### 想定されるユースケース

### 何が分からなかったか?

* 不明点なく進めることができた。

```javascript
const findMin = function(nums) {
    // find the index which is a[i - 1] > a[i]. This index might not be found.
    // left <= target <= right
    // loop condition is left <= right
    // break condition is right < left or target is found

    let left = 1
    let right = nums.length - 1
    while (left <= right) {
        const middle = Math.floor((left + right) / 2)
        console.log(left, right, middle)
        if (nums[middle] < nums[middle - 1]) {
            return nums[middle]
        }
        if (nums[0] < nums[middle]) {
            left = middle + 1
            continue
        }
        right = middle - 1
    }
    return nums[0]
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

* (`*1`) 末尾と比較する方法

```javascript
const findMin = function(nums) {
    let left = 1
    let right = nums.length - 1
    while (left <= right) {
        const middle = Math.floor((left + right) / 2)
        if (nums[middle] < nums[middle - 1]) {
            return nums[middle]
        }
        if (nums[middle] < nums[nums.length - 1]) {
            right = middle - 1
            continue
        }
        left = middle + 1
    }
    return nums[0]
};
```

### コードの良し悪し

* `*0`

* `*1`

## 調べたこと

