import { Level } from "./level";

export class Position {
  left: number;
  bottom: number;

  constructor(level: Level) {
    this.left = level.fromLeft;
    this.bottom = level.height;
  }
}
