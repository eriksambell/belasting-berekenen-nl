import { Level } from "./level";

export class Position {
  left: number;
  bottom: number;

  constructor(level: Level) {
    if (!level) throw new Error("Invalid: no level was provided");
    this.left = level.fromLeft;
    this.bottom = level.height;
  }
}
