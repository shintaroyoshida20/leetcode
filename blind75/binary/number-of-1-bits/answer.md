# Title

## STEP1

### 発想

### 想定されるユースケース

### 何が分からなかったか?

- Bitwise Operator を用いた際に、間違ってしまったコード

```javascript
const hammingWeight = function(n) {
    let count = 0
    let mask = 1
    for (let i = 0; i < 31; i++) {
        if (mask & n > 0) {
            count++
        }
        mask *= 2
    }
    return count
};
```

- Bitwise Operator を用いた際に、正解になったコード
  - 7: bitwise AND よりも9: relational operatorsの方が先に処理されるため、mask & (n > 0) となってしまっていた。
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence

```javascript
const hammingWeight = function(n) {
    let count = 0
    let mask = 1
    for (let i = 0; i < 31; i++) {
        if ((mask & n) > 0) {
            count++
        }
        mask *= 2
    }
    return count
};
```

- bitwise operator を使用せずに、割り算のみで解いた方法
  - Math.floorを最初つけておらず、整数 / 整数が小数点になることを気付く気なかった。

```javascript
const hammingWeight = function(n) {
    let bigDivisor = 2
    let smallDivisor = 1
    let count = 0
    for (let i = 0; i < 31; i++) {
        if (n < smallDivisor) {
            break
        }
        const remainder = n % bigDivisor
        if (Math.floor(remainder / smallDivisor) === 1) {
            count++
        }
        bigDivisor *= 2
        smallDivisor *= 2
    }
    return count
};
```

```javascript
const hammingWeight = function(n) {
    let count = 0
    while (n !== 0) {
        count++
        n &= n - 1
    }
    return count++
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

