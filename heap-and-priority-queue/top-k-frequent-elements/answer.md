# 347. Top K Frequent Elements

## STEP 1

* 配列をソートする方法
  * HashTableで数字ごとの回数を数える。
  * 回数でソートをして、トップKの数を数える。
  * mapをvalueでsortする箇所は分からなかったため、stackoverflowを参照した。
    https://stackoverflow.com/questions/37982476/how-to-sort-a-map-by-value-in-javascript
  * 時間計算量 : N LogN
  * 空間計算量 : N

```javascript
const topKFrequent = function(nums, k) {
    const count = new Map()
    for (const num of nums) {
        if (count.get(num) === undefined) {
            count.set(num, 0)
        }
        count.set(num, count.get(num) + 1)
    }
    const sortedCount = new Map([...count.entries()].sort((a, b)=> b[1] - a[1]))
    const ans = sortedCount.keys().toArray().slice(0, k)
    return ans
};
```

## STEP 2

* コメントを追加
* countという変数名を、`numToCount`に変更。
* ansを`topkFrequentNum`
* map のdefault valueを|| operatorで実装する。

```javascript
const topKFrequent = function(nums, k) {
    const numToCount = new Map()
    for (const num of nums) {
        const currentCount = numToCount.get(num) || 0
        numToCount.set(num, currentCount + 1)
    }
    // Mapが入力した順序を記憶することを利用する。
    const countSortedNum = new Map([...numToCount.entries()].sort((a, b) => b[1] - a[1]))
    const topkFrequentNum = countSortedNum.keys().toArray().slice(0, k)
    return topkFrequentNum
}
```

## STEP3

* 順序でソートを行う方法。

```javascript
const topKFrequent = function(nums, k) {
    const numToCount = new Map()
    for (const num of nums) {
        const currentCount = numToCount.get(num) || 0
        numToCount.set(num, currentCount + 1)
    }
    const countSortedNum = new Map([...numToCount.entries()].sort((a, b) => b[1] - a[1]))
    const topkFrequentNum = countSortedNum.keys().toArray().slice(0, k)
    return topkFrequentNum
};
```

* quickSelectを用いる方法
  * 1回目 6分
  * 2回目 6分
  * 3回目 5分
```javascript

const swap = function(i, j, array) {
    const tmp = array[i]
    array[i] = array[j]
    array[j] = tmp
}
const partition = function(left, right, targetIdx, uniqueNums, numToCount) {
    const targetCount = numToCount.get(uniqueNums[targetIdx])
    swap(right, targetIdx, uniqueNums)

    let correctTargetIdx = left
    for (let i = left; i < right; i++){
        const ithNumCount = numToCount.get(uniqueNums[i])
        if (ithNumCount < targetCount)　{
            swap(correctTargetIdx, i, uniqueNums)
            correctTargetIdx++
        }
    }
    swap(correctTargetIdx, right, uniqueNums)
    return correctTargetIdx
}

const quickSelect = function(left, right, kthLargestIdx, uniqueNums, numToCount) {
    if (right <= left) {
        return
    }

    const randomIdx = Math.floor(Math.random() * (right - left + 1)) + left
    const returnIdx = partition(left, right, randomIdx, uniqueNums, numToCount)
    if (returnIdx === kthLargestIdx) {
        return
    }
    if (returnIdx < kthLargestIdx) {
        quickSelect(returnIdx + 1, right, kthLargestIdx, uniqueNums, numToCount)
        return
    }
    quickSelect(left, returnIdx - 1, kthLargestIdx, uniqueNums, numToCount)
}
const topKFrequent = function(nums, k) {
    const numToCount = new Map()
    for (const num of nums) {
        numToCount.set(num, (numToCount.get(num) || 0) + 1)
    }

    const uniqueNums = numToCount.keys().toArray()
    const N = uniqueNums.length
    quickSelect(0, N - 1, N - k, uniqueNums, numToCount)
    return uniqueNums.slice(N - k)
};
```

## 感想

### コメント集を読んで

* sortでは、keyにlambda関数を用いたり、getを使う方法がある。

## 他の人のPRを読んで

* Ryotaro25
  * PR: https://github.com/Ryotaro25/leetcode_first60/pull/10/
  * C++において、unordered_mapの方が、ordered_mapよりもおそい
  * countよりもfrequencyの方がわかりやすいという意見がある。

* Yoshiki-Iawasa
  * PR: https://github.com/Yoshiki-Iwasa/Arai60/pull/8/files
  * Pythonではheappushpopという関数があり、topよりも追加する値が小さかった場合のみ、
    popを行っている。

* olsen-blue 
  * PR: https://github.com/olsen-blue/Arai60/pull/9/

* hayashi-ay 
  * PR: 
    * https://github.com/hayashi-ay/leetcode/pull/60
    * https://github.com/hayashi-ay/leetcode/pull/3
  * Quick SelectのAverage時間計算量は、 O(N)
    * N + N/2 + N/4 + ... = 2N に収束するから。

* hroc135
  * PR: https://github.com/hroc135/leetcode/pull/10/
## その他の方法

* `*1` Heapを用いた方法
  入力でユニークな数の個数をNとする。
  * 時間計算量: N log N + k log N
  * 空間計算量: N 

```javascript
const topKFrequent = function(nums, k) {
    const frequencySortedNum = new PriorityQueue((a, b) => b.frequency - a.frequency)
    const numToFrequency = new Map()
    for (const num of nums) {
        const count = numToFrequency.get(num) || 0
        numToFrequency.set(num, count + 1)
    }

    const generator = numToFrequency.entries()
    let next = generator.next()
    while (!next.done) {
        const [num, frequency] = next.value
        frequencySortedNum.push({num, frequency})
        next = generator.next()
    }

    const topKFrequent = []
    while (k > 0) {
        const pair = frequencySortedNum.pop()
        topKFrequent.push(pair.num)
        k--
    }
    return topKFrequent
};
```

* `*2` QuickSelectアルゴリズムを用いた方法

```javascript
const swap = function(i, j, array) {
    const tmp = array[i]
    array[i] = array[j]
    array[j] = tmp
}
// uniqueNumsを回数順に昇順となるように、
// targetIdxの数字を正しい場所に置き、正しい場所のインデックスを返却する。
// また、targetIdxの数字より大きい値は、全て右側になるように配列を並び替える。
const partition = function(left, right, targetIdx, uniqueNums, numToCount) {
    const targetCount = numToCount.get(uniqueNums[targetIdx])
    swap(right, targetIdx, uniqueNums)
    let correctTargetIdx = left
    for (let i = left; i < right; i++) {
        const ithNumCount = numToCount.get(uniqueNums[i])
        if (ithNumCount < targetCount) {
            swap(i, correctTargetIdx, uniqueNums)
            correctTargetIdx++
        }
    }
    swap(correctTargetIdx, right, uniqueNums)
    return correctTargetIdx
}
// k番目より大きい値が、右からK番目以内に来るように並び替えを行う関数。
// ただし、順序は担保されない。
const quickSelect = function(left, right, kthLargestIdx, uniqueNums, numToCount) {
    if (right <= left) {
        return
    }
    // left以上right以下のランダムな数を生成する。
    const randomIdx = Math.floor(Math.random() * (right - left + 1)) + left
    const returnIdx = partition(left, right, randomIdx, uniqueNums, numToCount)
    if (returnIdx === kthLargestIdx) {
        return
    }
    if (returnIdx < kthLargestIdx) {
        quickSelect(returnIdx + 1, right, kthLargestIdx, uniqueNums, numToCount)
        return
    }
    quickSelect(left, returnIdx - 1, kthLargestIdx, uniqueNums, numToCount)
}
const topKFrequent = function(nums, k) {
    const numToCount = new Map()
    for (const num of nums) {
        const count = numToCount.get(num) || 0
        numToCount.set(num, count + 1)
    }

    const uniqueNums = numToCount.keys().toArray()
    const N = uniqueNums.length
    quickSelect(0, N - 1, N - k, uniqueNums, numToCount)
    return uniqueNums.slice(N - k)
};
```

* `*3` QuickSelectを再帰を用いずに、Stackで解く方法 

```javascript
const swap = function(i, j, array) {
    const tmp = array[i]
    array[i] = array[j]
    array[j] = tmp
}
const partition = function(left, right, uniqueNums, numToCount) {
    const targetIdx = Math.floor(Math.random() * (right - left + 1)) + left
    const targetCount = numToCount.get(uniqueNums[targetIdx])
    swap(right, targetIdx, uniqueNums)

    let correctTargetIdx = left
    for (let i = left; i < right; i++){
        const ithNumCount = numToCount.get(uniqueNums[i])
        if (ithNumCount < targetCount)　{
            swap(correctTargetIdx, i, uniqueNums)
            correctTargetIdx++
        }
    }
    swap(correctTargetIdx, right, uniqueNums)
    return correctTargetIdx
}

const quickSelect = function(left, right, kthLargestIdx, uniqueNums, numToCount) {
    const container = []
    container.push([left, right])
    while (container.length > 0) {
        [left, right] = container.pop()
        if (right <= left) {
            continue
        }
        const returnedIdx = partition(left, right, uniqueNums, numToCount)
        if (returnedIdx === kthLargestIdx) {
            return
        }
        if (returnedIdx < kthLargestIdx) {
            container.push([returnedIdx + 1, right])
            continue
        }
        container.push([left, returnedIdx - 1])
    }
}
const topKFrequent = function(nums, k) {
    const numToCount = new Map()
    for (const num of nums) {
        numToCount.set(num, (numToCount.get(num) || 0) + 1)
    }

    const uniqueNums = numToCount.keys().toArray()
    const N = uniqueNums.length
    quickSelect(0, N - 1, N - k, uniqueNums, numToCount)
    return uniqueNums.slice(N - k)
};
```

### コードの良し悪し


numsの配列数をM, ユニークな数をNとする。
空間計算量を減らせるという観点で、PriorityQueueが優れており、
時間計算量を減らせるという観点だと、Sortアルゴリズムが優れている。

* `*4` Sort
  * クイックソートだとO(N)
  * 時間計算量 : M + N
  * 空間計算量 : N

* `*5` PriorityQueue
  * 時間計算量 : M + N log N + k log N 
    ( Push時に、ストリームの時と同様にk個以上を保持しないようにすることで、k log k にすることが可能)
  * 空間計算量 : N
    ( Push時に、ストリームの時と同様にk個以上を保持しないようにすることで、Kにすることが可能)

* `*6`
  * 時間計算量 : M + N 
  * 空間計算量 : N 

### 動かないコード

* `*7`
```
const swap = function(i, j, array) {
    const tmp = array[i]
    array[i] = array[j]
    array[j] = tmp
}
const partition = function(left, right, targetIdx, uniqueNums, numToCount) {
    const targetNumCount = numToCount.get(uniqueNums[targetIdx])
    swap(targetIdx, right, uniqueNums)
    let correctTargetIdx = 0
    for (let i = left; i < right; i++) {
        const ithNumCount = numToCount.get(uniqueNums[i])
        if (ithNumCount < targetNumCount) {
            swap(i, correctTargetIdx, uniqueNums)
            correctTargetIdx++
        }
    }
    swap(correctTargetIdx, right, uniqueNums)
    return correctTargetIdx
}
const quickSelect = function(left, right, kthLargestIdx, uniqueNums, numToCount) {
    if (right <= left) {
        return
    }
    const randomIdx = Math.floor(Math.random() * (right - left + 1)) + left
    const returnIdx = partition(left, right, randomIdx, uniqueNums, numToCount)
    if (returnIdx === kthLargestIdx) {
        return
    }
    if (returnIdx < kthLargestIdx) {
        quickSelect(returnIdx + 1, right, kthLargestIdx, uniqueNums, numToCount)
        return
    }
    quickSelect(left, returnIdx - 1, kthLargestIdx, uniqueNums, numToCount)
}
var topKFrequent = function(nums, k) {
    const numToCount = new Map()
    for (const num of nums) {
        numToCount.set(num, (numToCount.get(num) || 0) + 1)
    }

    const uniqueNums = numToCount.keys().toArray()
    const N = uniqueNums.length
    quickSelect(0, N - 1, N - k, uniqueNums, numToCount)
    return uniqueNums.slice(N - k)
};
```

* バグの原因は、`let correctTargetIdx = 0`としている箇所で、
  正しくは`let correctTargetIdx = left`。
  partition関数のfor文は、計算量を少なくするため、
  leftからrightを走査する。しかし、correctTargetIdx=0とすることで、
  誤った箇所にtargetIdxが挿入されるため、バグが発生する。
