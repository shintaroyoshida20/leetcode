# 146. LRU Cache

## STEP1

###  発想

- 優先度つきキューで、キャッシュを保存する。
getを行う際には、一度popし、その後にpushする。
putを行う際には、
  キーが存在しない場合には最も古いキャッシュをpopし、キャッシュをpushする。
  キーが存在する場合には一度キャッシュをpopし、新しい時刻でpushしなおす。

###  想定されるユースケース

###  何が分からなかったか?

- 以下のコードはTimeout Limit Exceededが発生。

```javascript
const LRUCache = function(capacity) {
    this.caches = new PriorityQueue((a, b) => a.clock - b.clock)
    this.capacity = capacity
    this.clock = 0
};

LRUCache.prototype.get = function(key) {
    this.clock += 1
    if (this.caches.contains((cache) => cache.key === key)) {
        const cache = this.caches.remove((cache) => cache.key === key)[0]
        this.caches.enqueue({
            key: key,
            value: cache.value,
            clock: this.clock,
        })
        return cache.value
    }
    return -1
};

LRUCache.prototype.put = function(key, value) {
    this.clock += 1
    if (this.caches.contains((cache) => cache.key === key)) {
        const cache = this.caches.remove((cache) => cache.key === key)[0]
        this.caches.enqueue({
            key: key,
            value: value,
            clock: this.clock,
        }) 
        return
    }
    while (this.caches.size() >= this.capacity) {
        this.caches.dequeue()
    }
    this.caches.enqueue({
        key: key,
        value: value,
        clock: this.clock,
    })
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

* `*1`

## 調べたこと

