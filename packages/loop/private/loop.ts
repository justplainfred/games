import { Render } from "./external";

export type Item = {
  id: string;
  isFinished: boolean;
  handleInput(): void;
  update(elapsedMS: number): void;
  render(renderer: Render): void;
}

export class Loop {
  private items: Item[] = [];
  private lastUpdateTime: number = 0;
  
  private _isLooping: boolean = true;
  public get isLooping() { return this._isLooping; }
  
  public fps: number = 60;

  constructor(private renderer: Render) {}
  
  public addItem(item: Item): void {
    this.items.push(item);
    if (this.items.length === 1) {
      this.lastUpdateTime = performance.now();
      this.loop();
    }
  }
  
  public getItem(id: string): Item {
    let item = this.items.find(i => i.id === id);
    if (item === undefined) {
      let err = new Error('item not found');
      console.log(err)
      throw err;
    }
    return item;
  }
  
  public removeItem(id: string): void {
    this.items = this.items.filter(i => i.id !== id);
  }
  
  public pause(): void {
    this._isLooping = false;
  }
  
  public unpause(): void {
    this._isLooping = true;
    this.lastUpdateTime = performance.now();
    this.loop();
  }

  private loop(): void {
    const now = performance.now();
    const elapsedMS = now - this.lastUpdateTime;
    this.lastUpdateTime = now;

    this.input();
    this.update(elapsedMS);
    this.render();
    this.removeFinishedItems();

    if (this.isLooping && this.items.length > 0) {
      let waitTime =  (1000 / this.fps) - elapsedMS;
      setTimeout(() => this.loop(), Math.max(waitTime, 1));      
    }
  }

  private input(): void {
    this.items.forEach(i => i.handleInput());
  }

  private update(elapsedMS: number): void {
    this.items.forEach(i => i.update(elapsedMS));
  }
  
  private render(): void {
    this.items.forEach(i => i.render(this.renderer));
  }
  
  private removeFinishedItems(): void {
    this.items = this.items.filter(i => !i.isFinished);
  }
}

