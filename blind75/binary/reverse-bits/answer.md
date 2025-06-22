# Title

## STEP1

### 発想

### 想定されるユースケース

### 何が分からなかったか?

- 間違った時のコード その1

```javascript
const reverseBits = function(n) {
    const maxInt32Num = parseInt('1'.repeat(32), 2)
    return n ^ maxInt32Num
};
```

- 間違えた時のコード その2

```javascript
const reverseBits = function(n) {
    let power = 31
    let result = 0;
    while (n !== 0) {
        result += ((n & 1) << power)
        n = n >> 1
        power -= 1
    }
    return result
};
```

```javascript
const reverseBits = function(n) {
    let power = 31
    let result = 0;
    while (n !== 0) {
        result += ((n & 1) << power)
        n = n >>> 1
        power -= 1
    }
    // 符号あり整数を、符号なし整数に変換する。
    result = result >>> 0
    return result
};
```

- 間違えた時のコード

```javascript
const reverseBits = function(n) {
    let result = 0
    let power = 24 
    while (power >= 0) {
        result |= reverse8Bits(n & 255) << power
        n = n >>> 8
        power -= 8
    }
    return result >>> 0
};

const reverse8Bits = function(byteNum) {
    return (byteNum * 0x0202020202 & 0x010884422010) % 1023
}
```

- 正解した時のコード

```javascript
const reverseBits = function(n) {
    let result = 0
    let power = 24 
    while (power >= 0) {
        result |= Number(reverse8Bits(n & 0xFF)) << power
        n = n >>> 8
        power -= 8
    }
    return result >>> 0
};

const reverse8Bits = function(byteNum) {
    const byteNumBigInt = BigInt(byteNum)
    const multiplier = 0x0202020202n
    const mask = 0x010884422010n
    return (byteNumBigInt * multiplier & mask) % 1023n
}
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

```javascript
console.log(0x7FFFFFFF + 1); // 2147483649
console.log((0x7FFFFFFF + 1) >> 0); // -2147483648
```
