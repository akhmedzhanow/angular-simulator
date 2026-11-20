export class Collection<T> {
  private items: T[];

  constructor(items: T[]) {
    this.items = [...items];
  }

  getAll(): T[] {
    return [...this.items];
  }

  getItem(index: number): T | undefined {
    return this.items[index];
  }

  clear(): void {
    this.items = [];
  }

  removeItem(index: number): boolean {
    if (!Number.isInteger(index) || index < 0 || index >= this.items.length) {
      return false;
    }

    this.items.splice(index, 1);
    return true;
  }

  replaceItem(index: number, item: T): boolean {
    if (!Number.isInteger(index) || index < 0 || index >= this.items.length) {
      return false;
    }

    this.items[index] = item;
    return true;
  }
}
