# 528. Random Pick with Weight

## STEP1

* 発想
  * 重み付きの確率を行う方法。
  * 0から1までに、

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
```


## STEP2

```javascript
var Solution = function(w) {
    let sum = 0
    for (const weight_i of w) {
        sum += weight_i
    }
    // 番兵として、0を入れておく。
    this.cum_sum_weights = []
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
        const ith_cum_sum_weight = this.cum_sum_weights[i]
        if (random_val <= ith_cum_sum_weight) {
            return i-1
        }
    }
};
```

## STEP3

```javascript
```

## 感想

### コメント集を読んで

## その他の解法
