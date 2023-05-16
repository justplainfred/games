import { Point } from "@r-t-p/tools";

type DrawableBase = {
  alpha?: number;
  rotation?: number;
  strokeStyle?:  string | CanvasGradient | CanvasPattern;
  fillStyle?:  string | CanvasGradient | CanvasPattern;
}

export type Square = {
  start: Point;
  height: number;
  width: number;
}

export type Circle = {
  center: Point;
  radius: number;
}

export type Shape = Square | Circle

export type Word = {
  start: Point;
  text: string;
}

export type Image = {
  src: string;
  center: string;
}

export type Drawable = DrawableBase & (Shape | Image | Word);

export type Render = {
  draw(drawable: Drawable): void;
}
