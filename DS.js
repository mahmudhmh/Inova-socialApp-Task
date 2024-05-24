//DS-1: Queue implementation using array
class Queue {
  constructor(size) {
    this.queue = new Array(size);
    this.front = -1;
    this.rear = -1;
    this.size = size;
  }

  isEmpty() {
    return this.front === -1;
  }

  isFull() {
    return this.rear === this.size - 1;
  }

  enqueue(element) {
    if (this.isFull()) {
      console.log("Queue is full");
    } else {
      if (this.front === -1) {
        this.front = 0;
      }
      this.rear += 1;
      this.queue[this.rear] = element;
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      console.log("Queue is empty");
    } else {
      const element = this.queue[this.front];
      if (this.front === this.rear) {
        this.front = -1;
        this.rear = -1;
      } else {
        this.front += 1;
      }
      return element;
    }
  }
}

// complexity: O(1) for both enqueue and dequeue operations.

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//DS-2: MaxPriorityQueue implementation using array
class MaxPriorityQueue {
  constructor(size) {
    this.queue = new Array(size)
      .fill(null)
      .map(() => ({ value: null, priority: null }));
    this.front = -1;
    this.rear = -1;
    this.size = size;
  }

  isEmpty() {
    return this.front === -1;
  }

  isFull() {
    return this.rear === this.size - 1;
  }

  enqueue(value, priority) {
    if (this.isFull()) {
      console.log("Queue is full");
      return;
    }

    if (this.front === -1) {
      this.front = 0;
    }
    this.rear += 1;
    this.queue[this.rear] = { value, priority };
    this.sortQueue();
  }

  dequeue() {
    if (this.isEmpty()) {
      console.log("Queue is empty");
      return null;
    }

    const element = this.queue[this.front];
    if (this.front === this.rear) {
      this.front = -1;
      this.rear = -1;
    } else {
      this.front += 1;
    }
    return element;
  }

  sortQueue() {
    for (let i = 1; i <= this.rear; i++) {
      const key = this.queue[i];
      let j = i - 1;
      while (j >= 0 && this.queue[j].priority < key.priority) {
        this.queue[j + 1] = this.queue[j];
        j -= 1;
      }
      this.queue[j + 1] = key;
    }
  }
}

// Time complexity of enqueue operation is O(n) and dequeue operation is O(1).
