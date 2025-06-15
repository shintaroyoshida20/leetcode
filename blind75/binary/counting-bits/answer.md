# 338. Counting Bits

## STEP1

### 発想

### 想定されるユースケース

### 何が分からなかったか?

### 手作業でやってみる

- i = 0からnまで以下を繰り返す
  - bit maskで、countを数える

```javascript
const countBits = function(n) {
    const result = []
    for (let i = 0; i <= n; i++) {
        let mask = 1
        count = 0
        while (mask <= i) {
            if ((i & mask) > 0) {
                count++
            }
            mask <<= 1
        }
        result.push(count)
    }
    return result
};
```

- 動かなかった時のコード 

```javascript
const countBits = function(n) {
    const result = []
    for (let num = 0; num <= n; num++) {
        let count = 0
        while (num !== 0) {
            count++
            num = num & (num - 1)
        }
        result.push(count)
    }
    return result
};
```

- 動くコード
  - numが1の時に、while文の中で0に変更され、for文で1に戻ることで、無限ループが発生していた.

```javascript
const countBits = function(n) {
    const result = []
    for (let num = 0; num <= n; num++) {
        let count = 0
        let target = num
        while (target !== 0) {
            count++
            target &= target - 1
        }
        result.push(count)
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
  - bottom upで足していく方法
  - step(1,2,4,8, ...)ごとに正しい数に変更していく
  
```javascript
// 0 --> 1 (+1)
// 0,1 --> 2,3 (+2)
// 0,1,2,3 -> 4,5,6,7 (+4)
// 0,1,2,3,4,5,6,7 -> 8,9,10,11,12,13,14,15 (+8)
const countBits = function(n) {
    const result = new Array(n + 1).fill(0)
    let num = 0
    let step = 1
    while (step <= n) {
        while (num < step && num + step <= n) {
            result[num + step] = result[num] + 1
            num++
        }
        num = 0
        step <<= 1
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

