# 141. Linked List Cycle

## STEP1

```javascript
var hasCycle = function(head) {
    const hashMap = new Map()
    let currentNode = head
    while (currentNode !== null) {
        if (hashMap.has(currentNode)) return true
        hashMap.set(currentNode, true)
        currentNode = currentNode.next
    }
    return false
}
```

#### 感想

```
For文で繰り返して、
過去に見たことがあるかをチェックするところは、思いつけた。
```

## STEP2

```javascript
var hasCycle = function(head) {
    const everSeen = new Set()
    let currentNode = head
    while (currentNode !== null) {
        if (everSeen.has(currentNode)) return true
        everSeen.add(currentNode)
        currentNode = currentNode.next
    }
    return false
}
```

#### 感想

```
そのままのhashMapだと何のを表しているかわからないため、
また、今回の問題では重複がないため、MapよりもSetが適している。
```

## STEP3

```javascript
var hasCycle = function(head) {
    const everSeen = new Set()
    let currentNode = head
    while (currentNode !== null) {
        if (everSeen.has(currentNode)) return true
        everSeen.add(currentNode)

        currentNode = currentNode.next
    }
    return false
}
```

#### 感想

```
Two Pointer(Fast, Slow)の解法は、
思いつかなかった。
```
