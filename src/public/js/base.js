class Subject {
    constructor(){
        this.state = 0;
        this.observe = [];
    }

    getState(){
        return this.state
    }

    setState(state){
        this.state = state
    }

    attach(observer){
        this.observe.push(observer)
    }

    notifyAllObservers() {
        this.observers.forEach(observer => {
            observer.update()
        })
    }
}

class Observer{
    constructor(name, subject){
        this.name = name;
        this.subject = subject;
        this.subject.attach(this)
    }
    update() {
        console.log(`${this.name} update, state: ${this.subject.getState()}`)
    }
}


/**
 * 循环队列
 */

     // JS实现环形队列

    /**
     * CircleQueue
     *
     * @param capacity  队列容量
     * @constructor
     */
    var CircleQueue = function (capacity) {

        this.queue = new Array(capacity);   // 队列数组
        this.queueCapacity = capacity;   // 队列容量
        this.queueHead = 0;  // 队头
        this.queueTail = 0;  // 队尾
        this.queueLength = 0;    // 队列长度

        // 方便在函数嵌套内部引用
        var that = this;

        // 销毁队列
        this.destroyQueue = function () {
            that.queue.splice(0, that.queue.queueLength);    // 删除数组中所有元素
            that.queue = null;  // 地址的引用置为空
        };

        // 清空队列
        this.clearQueue = function () {
            console.log('清空队列');
            that.queueHead = 0;
            that.queueTail = 0;
            that.queueLength = 0;
            // that.queue.splice(0, that.queue.queueLength); // 这一步并不是必要的，因为队列的头、尾和长度一旦全部置为0，就已经找不到之前的数据了
        };

        // 判断队列是否为空
        this.isQueueEmpty = function () {
            return that.queueLength === 0;   // 如果长度为0返回true，否则返回false
        };

        // 判断队列是否为满
        this.isQueueFull = function () {
            return that.queueCapacity === that.queueLength; // 如果容量与长度相等，返回true，否则返回false
        };

        // 获取队列长度
        this.getQueueLength = function () {
            return that.queueLength;
        };

        // 入队
        this.enQueue = function (element) {
            // 如果队满, return false
            if (that.isQueueFull()) {
                console.log('入队失败，队列已满 入队元素为 element = ' + element);
                return false;
            }
            // 队尾插入
            that.queue[that.queueTail] = element;
            that.queueTail++;
            that.queueTail = that.queueTail % that.queueCapacity;   // 要对队列容量做取余操作，才能实现环形队列
            that.queueLength++;
            console.log('入队成功 入队元素为 element = ' + element);
            return true;
        };

        // 出队
        this.deQueue = function () {
            // 如果队空, return false
            if (that.isQueueEmpty()) {
                console.log('出队失败，队列为空');
                return false;
            }
            var element = that.queue[that.queueHead];
            that.queueHead++;
            that.queueHead = that.queueHead % that.queueCapacity;   // 要对队列容量做取余操作，才能实现环形队列
            that.queueLength--;
            console.log('出队成功 出队元素为 element = ' + element);
            return element;
        };

        // 遍历队列
        this.traverseQueue = function () {
            var queuesStr = '';
            var i;
            // 从队头开始，次数为队头下标加上队长度, 保证循环次数不受队头位置变化影响
            for (i = that.queueHead; i < that.queueHead + that.queueLength; i++) {
                var element = that.queue[i % that.queueCapacity];
                queuesStr += element + ' ';
            }
            console.log('队列中所有元素 queuesStr = ' + queuesStr)
        };
    };

    // 测试用例, chrome console
module.exports = {
    Subject: Subject,
    Observer: Observer,
    CircleQueue: CircleQueue
}