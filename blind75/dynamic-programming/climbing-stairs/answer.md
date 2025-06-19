# 70. Climbing Stairs

## STEP1

### 発想

### 想定されるユースケース

### 何が分からなかったか?

```javascript
const climbStairs = function(n) {
    const steps = new Array(n + 1).fill(0)
    steps[1] = 1
    steps[2] = 2
    for (let i = 3; i <= n; i++) {
        steps[i] = steps[i - 2] + steps[i - 1]
    }
    return steps[n]
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

