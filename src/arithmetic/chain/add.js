/**
 * listNode
 * {1, 0, 0} list a
 * {2, 5, 6} list b
 */
// 单向链表
function Node(val) {
    this.val = val;
    this._next = null;
}

Node.prototype.setNext = function (node) {
    return this._next = node;
}

Node.prototype.next = function () {
    return this._next;
}


function ListNode() {
    this._length = 0;
    this.head = null;
}

ListNode.prototype.addNode = function (node) {
    if (!(node instanceof Node)) {
        node = new Node(node);
    }
    if (!this.head) {
        this.head = node;
    } else {
        let point = this.head;
        while(point && point.next()) {
            point = point.next();
        }
        point.setNext(node);
    }
    this._length += 1;
    return this;
}

ListNode.prototype.prependNode = function (node) {
    if (!(node instanceof Node)) {
        node = new Node(node);
    }

    if (!this.head) {
        this.head = node;
    } else {
        let head = this.head;
        node.setNext(head);
        this.head = node;
    }

    this._length += 1;
    return this;
}

ListNode.prototype.get = function (i) {
    let point = this.head;
    for(let j = 0; j< Math.min(i,this._length); j++) {
        if (point && point.next()) {
            point = point.next();            
        } {
            return null;
        }
    }
    return point;
}

ListNode.prototype.last = function (i) {
    i = i || 0;
    let point = this.head;
    let length = this._length;
    let j = length - i - 1;
    while (j--) {
        if (point && point.next()) {
            point = point.next();            
        } else {
            return null;
        }
    }
    return point;
}

ListNode.prototype.print = function () {
    let str = '';
    let node = this.head;
    while(node) {
        str += node.val;
        node = node.next();
    }
    console.info(str);
}

ListNode.prototype.add = function (listNodeB) {
    var listNodeA = this;
    var listNodeALength = listNodeA._length;
    var listNodeBLength = listNodeB._length;
    var maxLength = Math.max(listNodeALength, listNodeBLength);
    var listNode = new ListNode();
    let leftVal = 0;
    for (let i = 0; i < maxLength; i++) {
        var nodeA = listNodeA.last(i);
        var nodeB = listNodeB.last(i);
        var countVal = (Number(nodeA && nodeA.val || 0)) + (Number(nodeB && nodeB.val) || 0);
        var val = (leftVal + countVal) % 10;
        leftVal = Math.floor((leftVal + countVal) / 10);
        listNode.prependNode(new Node(val));
    }
    if (leftVal > 0 && leftVal < 10) {
        listNode.prependNode(new Node(leftVal));
    }
    return listNode;
}
