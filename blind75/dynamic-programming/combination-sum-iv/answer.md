# 377. Combination Sum IV

## STEP1

### 発想

### 想定されるユースケース

### 何が分からなかったか?

- 最初に間違えた時のコード

```javascript
const combinationSum4 = function(nums, target) {
    const combinations = new Array(target + 1).fill(0)
    for (let i = 1; i <= target; i++) {
        for (const step of nums) {
            if (i < step) {
                continue
            }
            combinations[i] += combinations[i - step]
        }
    }
    return combinations[target]
};
```

```javascript
const combinationSum4 = function(nums, target) {
    const combinations = new Array(target + 1).fill(0)
    for (const num of nums) {
        combinations[num] += 1
    }
    for (let i = 1; i <= target; i++) {
        for (const step of nums) {
            if (i < step) {
                continue
            }
            combinations[i] += combinations[i - step]
        }
    }
    return combinations[target]
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

