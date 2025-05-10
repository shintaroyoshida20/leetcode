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
For文で1つずつノードを確認し、
以前出てきたノードかを確認する箇所は、思いつけた。
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
hashMapという変数名だと何を表しているかわからないため、今まで見たことがあるか?を表すeverSeenという変数名に変更.
また、今回の問題では重複がないため、MapよりもSetが適している。
```

## STEP3

```javascript
var hasCycle = function(head) {
    const visited = new Set()
    let node = head
    while (node !== null) {
        if (visited.has(node)) return true
        visited.add(node)

        node = node.next
    }
    return false
}
```

#### 感想

```
Two Pointer(Fast, Slow)の解法は、
思いつかなかった。
```
