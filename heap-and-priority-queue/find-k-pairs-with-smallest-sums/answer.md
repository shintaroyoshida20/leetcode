# Title

## STEP1

* 発想
  * うまくいかなかったケース
    * 全てのペアを優先度付きキューに入れる。
    * 毎回入れた後に、k個を超えていた場合には、最大の和をもつペアを取り除く。
    * K個を取り出す。


```javascript
var kSmallestPairs = function(nums1, nums2, k) {
    this.top_k = new PriorityQueue((a, b) => b.sum - a.sum)
    for (const num1 of nums1) {
        for (const num2 of nums2) {
            const pair = {
                num1: num1,
                num2: num2,
                sum: num1 + num2,
            }
            if (this.top_k.size() < k) {
                this.top_k.enqueue(pair)
                continue
            }
            const max_pair = this.top_k.front()
            if (max_pair.sum > pair.sum) {
                this.top_k.enqueue(pair)
                while (this.top_k.size() > k) {
                    this.top_k.dequeue()
                }
            }
        }
    }
    const ans = []
    while (this.top_k.size() > 0) {
        const pair_and_sum = this.top_k.pop()
        ans.push([pair_and_sum.num1, pair_and_sum.num2])
    }
    return ans
};
```

* 上の例だと、Time Limit Exceededが発生した。
  * nums1とnums2がソートされていることを利用した。
    nusm1の個数 x nums2の個数を全て探索するのではなく、ある1つが条件を満たさない場合に
    それ以上大きいnums2を探さないように変更した。

```javascript
const kSmallestPairs = function(nums1, nums2, k) {
    this.top_k = new PriorityQueue((a, b) => b.sum - a.sum)
    for (const num1 of nums1) {
        for (const num2 of nums2) {
            const pair = {
                num1: num1,
                num2: num2,
                sum: num1 + num2,
            }
            if (this.top_k.size() < k) {
                this.top_k.enqueue(pair)
                continue
            }
            const max_pair = this.top_k.front()
            // Add these 3 lines compared with Time Limit Exceeded Code.
            if (max_pair.sum <= pair.sum) {
                break
            }
            this.top_k.enqueue(pair)
            while (this.top_k.size() > k) {
                this.top_k.dequeue()
            }
        }
    }
    const ans = []
    while (this.top_k.size() > 0) {
        const pair_and_sum = this.top_k.pop()
        ans.push([pair_and_sum.num1, pair_and_sum.num2])
    }
    return ans
};
```

* 改善した方法

## STEP2

### 整える
* 毎回優先度付きキューにペアを入れるのではなく、より小さいペアが見つかった際に入れる。
* 

```javascript
```

## STEP3

```javascript
```

## 感想

### コメント集を読んで

## その他の解法

