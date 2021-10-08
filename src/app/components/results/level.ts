export class Level {
  id: number;
  width: number;
  height: number;
  fromLeft: number;

  constructor(allLevels: Level[], usedLevel: Level, boxSize: number) {
    if (allLevels && usedLevel && boxSize) {
      this.id = usedLevel.id;
      this.width = boxSize;
      this.height = usedLevel.height + boxSize;
      this.fromLeft = usedLevel.id + 1 !== allLevels.length ? usedLevel.fromLeft : 0;
    }
  }

  public static getInitialValues(): Level {
    return {
      id: 0,
      width: 100,
      height: 0,
      fromLeft: 0,
    };
  }
}
