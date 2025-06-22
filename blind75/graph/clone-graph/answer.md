# Title

## STEP1

### 発想

### 想定されるユースケース

### 何が分からなかったか?

- 途中まで作成したコード (間違い)
  - 無向グラフに対して、どのようにノードを作成すべきか? が思いつかなかった。

```javascript
const cloneGraph = function(node) {
    if (node === null) {
        return null
    }
    if (node.neighbors.length === 0) {
        return new _Node(node.val)
    }
    const new = new _Node(node.val)
    return new
};
```

- DFSを用いた方法

```javascript
const cloneGraphHelper = function(node, nodeValToPointer) {
    if (node === null) {
        return null
    }
    if (nodeValToPointer.has(node.val)) {
        return nodeValToPointer.get(node.val)
    }
    // 新しくコピーしたもののみ、コピーをしておく。
    const newNode = new _Node(node.val)
    nodeValToPointer.set(node.val, newNode)
    for (const neighbor of node.neighbors) {
        newNode.neighbors.push(cloneGraphHelper(neighbor, nodeValToPointer))
    }
    return newNode
}

const cloneGraph = function(node) {
    const nodeValToPointer = new Map()
    return cloneGraphHelper(node, nodeValToPointer)
};
```

- BFSを使用して間違った時のコード

```javascript
const cloneGraph = function(node) {
    const nodeValToPointer = new Map()
    const container = []
    if (node !== null) {
        container.push(node)
    }

    let rootNode = null
    while (container.length > 0) {
        const target = container.shift()
        if (nodeValToPointer.has(target.val)) {
            continue
        }
        const newNode = new _Node(target.val)
        if (rootNode === null) {
            rootNode = newNode
        }
        for (const neighbor of target.neighbors) {
            container.push(neighbor)
            if (nodeValToPointer.has(neighbor.val)) {
                newNode.neighbors.push(nodeValToPointer.get(neighbor.val))
                continue
            }
            const newNeighbor = new _Node(neighbor.val)
            newNode.neighbors.push(newNeighbor)
        }
        nodeValToPointer.set(newNode.val, newNode)
        console.log(newNode)
    }
    return rootNode
};
```

- BFSを用いたコード(正解)

```javascript
const cloneGraph = function(node) {
    if (node === null) {
        return null
    }
    const nodeValToPointer = new Map()
    const container = []
    container.push(node)
    nodeValToPointer.set(node.val, new _Node(node.val))
    while (container.length > 0) {
        const target = container.shift()
        const newTarget = nodeValToPointer.get(target.val)
        for (const neighbor of target.neighbors) {
            if (!nodeValToPointer.has(neighbor.val)) {
                nodeValToPointer.set(neighbor.val, new _Node(neighbor.val))
                container.push(neighbor)
            }
            newTarget.neighbors.push(nodeValToPointer.get(neighbor.val))
        }
    }
    return nodeValToPointer.get(node.val)
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
  * 時間計算量:
  * 空間計算量:

* `*1`
  * 時間計算量:
  * 空間計算量:

* `*2`
  * 時間計算量:
  * 空間計算量:

## 調べたこと

