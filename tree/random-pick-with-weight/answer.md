# 528. Random Pick with Weight

* 703. Kth Larget Element in a Streamの関連問題がDiscordにあったので、
  Arai60の途中で解いてみました。

## STEP1

* 発想
  * 重み付きの確率を行う方法。
  * `w_0`, `w_1`, `w_2`, ...を`w_0`/sum, `w_1`/sum, `w_2`/sum, ...に割り算をして累積和をとり、0から1のランダムな値がどの重みに属するかを調べることで、重みを考慮したサンプリングできそう。

* 詰まったところ
  * `for (const i in w)` というfor in 文を使った際に、iにstringが帰ってくることを忘れており、
    numberを返すべきところをstringで返してしまっていた。

### 線形探索を用いた方法

```javascript
const Solution = function(w) {
    this.cum_sum_weights = [0]
    let sum = 0
    for (const weight_i of w) {
        sum += weight_i
    }
    for (let i=0; i<w.length; i++) {
n       const weight_i = w[i]
        this.cum_sum_weights.push(this.cum_sum_weights[Number(i)] + weight_i / sum)
    }
};

Solution.prototype.pickIndex = function() {
    const random_val = Math.random()
    for (let i=1; i<=this.cum_sum_weights.length; i++) {
        const cum_sum_weight_i = this.cum_sum_weights[i]
        if (random_val <= cum_sum_weight_i) {
            return i-1
        }
    }
};
```

### 二分探索を用いた方法

```javascript
const Solution = function(w) {
    let sum = 0
    for (const weight_i of w) {
        sum += weight_i
    }
    this.cum_sum_weights = []
    this.cum_sum_weights.push(0)
    for (let i=0; i<w.length; i++) {
        const weight_i = w[i]
        const ith_cum_sum_weight = this.cum_sum_weights[i]
        this.cum_sum_weights.push(ith_cum_sum_weight + weight_i / sum)
    }
};

// 見つけたいターゲット:
//   i-1番目の累積和 < random_value <= i番目の累積和となるiの値
// while文の引き継ぎの条件: 
//   left以上で、right以下であること。
Solution.prototype.pickIndex = function() {
    const random_val = Math.random()
    let left = 1
    let right = this.cum_sum_weights.length - 1
    while (left < right) {
        const middle = Math.floor(left + (right - left) / 2)
        if (random_val <= this.cum_sum_weights[middle]) {
            right = middle
        } else {
            left = middle + 1
        }
    }
    return left - 1
};
```


## STEP2

* 線形探索を用いた方法
  * `this.cum_sum_weights` が使用する直前で宣言する形に変更。sumを求める際には使用しないため。

```javascript
const Solution = function(w) {
    let sum = 0
    for (const weight_i of w) {
        sum += weight_i
    }
    this.cum_sum_weights = []
    // 番兵として、0を入れておく。
    this.cum_sum_weights.push(0)
    for (let i=0; i<w.length; i++) {
        const weight_i = w[i]
        const ith_cum_sum_weight = this.cum_sum_weights[i]
        this.cum_sum_weights.push(ith_cum_sum_weight + weight_i / sum)
    }
};

Solution.prototype.pickIndex = function() {
    const random_val = Math.random()
    for (let i=1; i<=this.cum_sum_weights.length; i++) {
        // ith cumulative sum of weight.
        const ith_cum_sum_weight = this.cum_sum_weights[i]
        if (random_val <= ith_cum_sum_weight) {
            return i-1
        }
    }
};
```

## STEP3

* 二分探索を用いた方法でやってみる。

```javascript
const Solution = function(w) {
    let sum = 0
    for (const weight_i of w) {
        sum += weight_i
    }

    this.cum_sum_weights = []
    this.cum_sum_weights.push(0)
    for (let i=0; i<w.length; i++) {
        const ith_cum_sum_weight = this.cum_sum_weights[i]
        this.cum_sum_weights.push(ith_cum_sum_weight + w[i] / sum)
    }
};

// Target: 
//   i-1 < target <= i
// while statement condition:
//   left <= ith index <= right
Solution.prototype.pickIndex = function() {
    let left = 0
    let right = this.cum_sum_weights.length - 1
    const random_val = Math.random()
    while (left < right) {
        const middle = left + Math.floor((right - left) / 2)
        if (random_val <= this.cum_sum_weights[middle]) {
            right = middle
        } else {
            left = middle + 1
        }
    }
    return left - 1
};
```

## 感想

* 二分探索において、ターゲットと引き継ぎ条件を考えることで、
  left,rightの設定や等号の有無について迷わなくなった。

* 前のレビュー依頼から時間が空いてしまったので、もう一度習慣化する。

## その他の解法

* 二分探索のターゲットを変更する。
  * 見つけたいターゲット: i-1番目の累積和 <= `random_value` < i番目の累積和となるiの値
  * while文の引き継ぎの条件: ターゲットはleft以上で、right以下であること。

```javascript
Solution.prototype.pickIndex = function() {
    const random_val = Math.random()
    let left = 1
    let right = this.cum_sum_weights.length - 1
    while (left < right) {
        const middle = Math.floor(left + (right - left) / 2)
        if (random_val < this.cum_sum_weights[middle]) {
            right = middle
        } else {
            left = middle + 1
        }
    }
    return left - 1
};
```
