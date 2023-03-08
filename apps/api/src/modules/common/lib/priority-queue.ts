/**
 * Generic Priority Queue implemented with a heap to get the best performance.
 */
export class PriorityQueue<T> {
  private heap: T[];
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.heap = [];
    this.comparator = comparator;
  }

  private getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }

  private getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  private getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  private swap(index1: number, index2: number): void {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  private heapifyUp(): void {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.comparator(this.heap[index], this.heap[parentIndex]) >= 0) {
        break;
      }
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  private heapifyDown(): void {
    let index = 0;
    while (this.getLeftChildIndex(index) < this.heap.length) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);
      const smallerChildIndex =
        rightChildIndex < this.heap.length &&
        this.comparator(this.heap[rightChildIndex], this.heap[leftChildIndex]) <
          0
          ? rightChildIndex
          : leftChildIndex;
      if (
        this.comparator(this.heap[smallerChildIndex], this.heap[index]) >= 0
      ) {
        break;
      }
      this.swap(smallerChildIndex, index);
      index = smallerChildIndex;
    }
  }

  /**
   * Enqueue an item to the priority queue.
   * @param item Item to enqueue.
   */
  enqueue(item: T): void {
    this.heap.push(item);
    this.heapifyUp();
  }

  /**
   * Dequeue an item from the priority queue.
   * @param item Item to dequeue.
   */
  dequeue(): T | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }
    if (this.heap.length === 1) {
      return this.heap.pop();
    }
    const item = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return item;
  }

  /**
   * Peek the item from the top.
   * @returns The top item.
   */
  peek(): T | undefined {
    return this.heap[0];
  }

  /**
   * @returns The size of the priority queue.
   */
  size(): number {
    return this.heap.length;
  }

  /**
   * @returns Wether the priority queue is empty or not.
   */
  isEmpty(): boolean {
    return this.heap.length === 0;
  }
}
