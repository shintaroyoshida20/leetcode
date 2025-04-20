# 703. Kth Largest Element in a Stream

## STEP 1

* Heapを使って、データを保存する。 
* heapの中に要素数Nを保存しておいて、K番目の数を見つける際に、N-K番目の値を取り出す。 
  --> ここから先が思い付かず、回答を見た。

* ソートされた文字列を1つ保持しておき、値が挿入されるたびにソートし直す形で確かに動きそう。
  * 時間計算量 : O(N^2)
  * 空間計算量 : O(N)

```javascript
const KthLargest = function(k, nums) {
    nums.sort((a,b) => a-b)

    this.nums = nums
    this.k = k
};

KthLargest.prototype.add = function(val) {
    this.nums.push(val)
    const total = this.nums.length
    for (let i=total-2; i>=0; i--) {
        if (this.nums[i] > this.nums[i+1]) {
            const tmp = this.nums[i+1]
            this.nums[i+1] =this.nums[i]
            this.nums[i] = tmp
        } else {
            break
        }
    }
    if (this.k > this.nums.length) {
        throw new Error("k is invalid value.")
    }
    return this.nums[this.nums.length-this.k]
};
```

* Heapを用いる方法
  * 最大K個の要素を保持しておけば十分。
  * 配列を使うと、要素の追加し、ソートするのにO(K)の時間計算量がかかる。 
  * 一方で、MinHeapを使うと、追加にO(LogK)
    * 実際には、追加をしてPopを行う。
https://stackoverflow.com/questions/42919469/efficient-way-to-implement-priority-queue-in-javascript

```javascript
const top = 0
class MinHeap {
    constructor() {
        this.heap = []
    }
    peek() {
        return this.heap[top]
    }
    size() {
        return this.heap.length
    }
    push(value) {
        this.heap.push(value)
        this.siftUp()
    }
    pop() {
        const poppedValue = this.heap[top]
        const bottom = this.size() - 1
        if (bottom > top) {
            this._swap(top, bottom)
        }
        this.heap.pop()
        this.siftDown()
        return poppedValue
    }
    _swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
    }
    _getParentIdx(idx) {
        return Math.floor((idx - 1) / 2)
    }
    _getRightIdx(idx) {
        return 2 * idx + 2
    }
    _getLeftIdx(idx) {
        return 2 * idx + 1
    }
    siftUp() {
        let idx = this.heap.length - 1
        let parentIdx = this._getParentIdx(idx)
        while (idx > top && this.heap[idx] < this.heap[parentIdx]) {
            this._swap(idx, this._getParentIdx(idx))
            idx = this._getParentIdx(idx)
            parentIdx = this._getParentIdx(idx)
        }
    }
    siftDown() {
        let idx = top
        let rightIdx = this._getRightIdx(idx)
        let leftIdx = this._getLeftIdx(idx)
        while (
            (leftIdx < this.heap.length && this.heap[leftIdx] < this.heap[idx]) ||
            (rightIdx < this.heap.length && this.heap[rightIdx] < this.heap[idx])
        ) {
            let smallerChildIdx = (rightIdx < this.heap.length && this.heap[leftIdx] > this.heap[rightIdx]) ? rightIdx : leftIdx
            this._swap(idx, smallerChildIdx)
            idx = smallerChildIdx
            rightIdx = this._getRightIdx(idx)
            leftIdx = this._getLeftIdx(idx)
        }
    }
}

const KthLargest = function (k, nums) {
    const heap = new MinHeap()
    this.heap = heap
    this.k = k
    for (const num of nums) {
        this.heap.push(num)
        if (this.heap.size() === this.k + 1) {
            this.heap.pop()
        }
    }
};

KthLargest.prototype.add = function (value) {
    this.heap.push(value)
    if (this.heap.size() === this.k + 1) {
        this.heap.pop()
    }
    return this.heap.peek()
};
```

## STEP2

* 問題で期待されているHeapを用いてStep2以降を行う。

* やったこと
  * early return で認知負荷を下げる。
  * 関数名が冗長だと感じたので、以下に変更
    * `getParentIdx` -> `getParent`
    * `getLeftIdx` -> `getLeft`
    * `getRightIdx` -> `getRight`
  * 三項演算子を削除 

```javascript
class MinHeap {
    constructor() {
        this.heap = []
    }
    top() {
        return this.heap[0]
    }
    size() {
        return this.heap.length
    }
    push(value) {
        this.heap.push(value)
        this.siftUp()
    }
    pop() {
        if (this.size() === 0) {
            return null
        }
        const poppedValue = this.top()
        if (this.size() === 1) {
            this.heap.pop()
            return poppedValue
        }
        const bottom = this.size() - 1
        this._swap(0, bottom)
        this.heap.pop()
        this.siftDown()
        return poppedValue
    }
    _swap(i, j) {
        const temp = this.heap[i]
        this.heap[i] = this.heap[j]
        this.heap[j] = temp
    }
    _getParent(idx) {
        return Math.floor((idx - 1) / 2)
    }
    _getRight(idx) {
        return 2 * idx + 2
    }
    _getLeft(idx) {
        return 2 * idx + 1
    }
    siftUp() {
        let idx = this.size() - 1
        let parentIdx = this._getParent(idx)
        while (idx > 0 && this.heap[idx] < this.heap[parentIdx]) {
            this._swap(idx, parentIdx)
            idx = parentIdx
            parentIdx = this._getParent(idx)
        }
    }
    siftDown() {
        let idx = 0
        let rightIdx = this._getRight(idx)
        let leftIdx = this._getLeft(idx)
        while (
            (leftIdx < this.size() && this.heap[leftIdx] < this.heap[idx]) ||
            (rightIdx < this.size() && this.heap[rightIdx] < this.heap[idx])
        ) {
            let smallerChildIdx = (rightIdx < this.size() && this.heap[rightIdx] > this.heap[leftIdx]) ? rightIdx : leftIdx
            this._swap(idx, smallerChildIdx)
            idx = smallerChildIdx
            rightIdx = this._getRight(idx)
            leftIdx = this._getLeft(idx)
        }
    }
}

const KthLargest = function (k, nums) {
    const heap = new MinHeap()
    this.heap = heap
    this.k = k
    for (const num of nums) {
        this.heap.push(num)
        if (this.heap.size() === this.k + 1) {
            this.heap.pop()
        }
    }
};

KthLargest.prototype.add = function (value) {
    this.heap.push(value)
    if (this.heap.size() === this.k + 1) {
        this.heap.pop()
    }
    return this.heap.peek()
};
```
## STEP 3

```javascript
class MinHeap {
    constructor() {
        this.heap = []
    }
    top() {
        return this.heap[0]
    }
    size() {
        return this.heap.length
    }
    push(value) {
        this.heap.push(value)
        this.siftUp()
    }
    pop() {
        if (this.size() === 0) {
            return null
        }
        const poppedValue = this.top()
        if (this.size() === 1) {
            this.heap.pop()
            return poppedValue
        }
        const bottom = this.size() - 1
        this._swap(0, bottom)
        this.heap.pop()
        this.siftDown()
        return poppedValue
    }
    siftUp() {
        const bottom = this.size() - 1
        let idx = bottom
        let parentIdx = this._getParent(idx)
        while (0 < idx && this.heap[idx] < this.heap[parentIdx]) {
            this._swap(idx, parentIdx)
            idx = parentIdx
            parentIdx = this._getParent(idx)
        }
    }
    siftDown() {
        const top = 0
        let idx = top
        let leftIdx = this._getLeft(idx)
        let rightIdx = this._getRight(idx)
        while (
            (leftIdx < this.size() && this.heap[leftIdx] < this.heap[idx]) ||
            (rightIdx < this.size() && this.heap[rightIdx] < this.heap[idx])
        ) {
            let smallerIdx
            if (rightIdx < this.size() && this.heap[rightIdx] < this.heap[leftIdx]) {
                smallerIdx = rightIdx
            } else {
                smallerIdx = leftIdx
            }
            this._swap(idx, smallerIdx)
            idx = smallerIdx
            leftIdx = this._getLeft(idx)
            rightIdx = this._getRight(idx)
        }
    }
    _getParent(idx) {
        return Math.floor((idx - 1) / 2)
    }
    _getLeft(idx) {
        return 2 * idx + 1
    }
    _getRight(idx) {
        return 2 * idx + 2
    }
    _swap(i, j) {
        const temp = this.heap[i]
        this.heap[i] = this.heap[j]
        this.heap[j] = temp
    }
}
const KthLargest = function(k, nums) {
    this.heap = new MinHeap()
    this.k = k
    for (const num of nums) {
        this.heap.push(num)
        if (this.heap.size() === this.k + 1) {
            this.heap.pop()
        }
    }
};

KthLargest.prototype.add = function(val) {
    this.heap.push(val)
    if (this.heap.size() === this.k + 1) {
        this.heap.pop()
    }
    return this.heap.top()
};

```
## 感想 

* こちらのロジックが誤っていることに気づけなかった。
  * 右のノードが存在しない際には、左のノードのidxを返して欲しいが、右のノードのidxが返却されていること。

```
const smallerIdx = rightIdx < this.size() && this.heap[leftIdx] < this.heap[rightIdx] ? leftIdx : rightIdx
```
