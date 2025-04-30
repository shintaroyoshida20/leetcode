# 528. Random Pick with Weight

## STEP1

```javascript
const Solution = function(w) {
    this.cum_sum_weights = [0]
    let sum = 0
    for (const weight_i of w) {
        sum += weight_i
    }
    for (let i=0; i<w.length; i++) {
        const weight_i = w[i]
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

## STEP2

```javascript
```

## STEP3

```javascript
```

## 感想

### コメント集を読んで

## その他の解法
