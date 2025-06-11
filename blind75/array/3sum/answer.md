# 15. 3Sum

## STEP1

### 発想

### 想定されるユースケース

### 何が分からなかったか?

- まず、For文を回してやってみる。

```javascript
const threeSum = function(nums) {
    const uniqueTriplets = new Set()
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length;j++) {
            for (let k = j + 1; k < nums.length; k++) {
                if (nums[i] + nums[j] + nums[k] !== 0) {
                    continue
                }
                const maxVal = Math.max(nums[i], Math.max(nums[j], nums[k]))
                const minVal = Math.min(nums[i], Math.min(nums[j], nums[k]))
                const middle = 0 - maxVal - minVal
                uniqueTriplets.add(`${minVal}_${middle}_${maxVal}`)
            }
        }
    }
    const result = []
    for (const triplet of uniqueTriplets.values()) {
        const triplet_arr = triplet.split("_").map((a) => Number(a))
        result.push(triplet_arr)
    }
    return result
};
```

- 2ポインターを用いた方法
  - Time Complexity O(N^2)
  - 解法を理解して、自分で解いてた際に、以下のコードをつけておらず、
    [-1, -1, 0, 1]のケースを考慮できていなかった。

```javasciprt
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue
        }
```

```javascript
const threeSum = function(nums) {
    nums.sort((a, b) => a - b)
    const result = []
    for (let i = 0; i < nums.length; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue
        }
        if (nums[i] > 0) {
            break
        }
        let left = i + 1
        let right = nums.length - 1
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right]
            if (sum < 0) {
                left++
                continue
            }
            if (0 < sum) {
                right--
                continue
            }
            result.push([nums[i], nums[left], nums[right]])
            left++
            right--
            while (left < right && nums[left - 1] === nums[left]) {
                left++
            }
        }
    }
    return result
};
```

- 間違えた時のコード

```javascript
const threeSum = function(nums) {
    nums.sort((a, b) => a - b)
    const result = []
    for (let i = 0; i < nums.length; i++) {
        if (0 < nums[i]) {
            break
        }
        if (0 < i && nums[i] === nums[i-1]) {
            continue
        }
        const seenNum = new Set()
        let j = i + 1
        while (j < nums.length) {
            const complement = - nums[i] - nums[j]
            if (seenNum.has(complement)) {
                result.push([nums[i], nums[j], complement])
            }
            if (nums[i] === 0 && nums[j] === 0 && nums[j + 1] === 0) {
                result.push([0, 0, 0])
                j++
            }
            seenNum.add(nums[j])
            while (j < nums.length - 1 && nums[j] === nums[j + 1]) {
                j++
            }
            j++
            
        }
    }
    return result
};
```

- 正しくは、
jを1つずつ増やす際に、ペアが見つかった時のみスキップするようにしないと、[-2, 1, 1]というケースを見逃してしまう。


```javascript
const threeSum = function(nums) {
    nums.sort((a, b) => a - b)
    const result = []
    for (let i = 0; i < nums.length; i++) {
        if (0 < nums[i]) {
            break
        }
        if (0 < i && nums[i] === nums[i-1]) {
            continue
        }
        const seenNum = new Set()
        let j = i + 1
        while (j < nums.length) {
            const complement = - nums[i] - nums[j]
            if (seenNum.has(complement)) {
                result.push([nums[i], nums[j], complement])
                while (j < nums.length - 1 && nums[j] === nums[j + 1]) {
                    j++
                }
            }
            seenNum.add(nums[j]) 
            j++
        }
    }
    return result
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

- `*2` 

```javascript
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

