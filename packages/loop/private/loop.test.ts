import { Item, Loop } from "./loop"
import { Drawable, Render } from "./external";

describe("GameLoop", () => {
  let gameLoop: Loop;
  let loopItem: Item;
  let renderer: Render = {
    draw: jest.fn(() => {})
  };

  beforeEach(() => {
    gameLoop = new Loop(renderer);
    gameLoop.fps = 1;
    loopItem = {
      id: "id",
      handleInput: jest.fn(),
      update: jest.fn(),
      render: jest.fn(),
      isFinished: false,
    };
  });

  test("should start the game loop", () => {
    expect(gameLoop.isLooping).toBe(true);
  });

  test("should pause and unpause the game loop", () => {
    gameLoop.pause();
    expect(gameLoop.isLooping).toBe(false);

    gameLoop.unpause();
    expect(gameLoop.isLooping).toBe(true);
  });

  test("should add and remove items from the game loop", () => {
    gameLoop.addItem(loopItem);
    expect(gameLoop.getItem(loopItem.id)).toBe(loopItem);

    gameLoop.removeItem(loopItem.id);
    expect(gameLoop.getItem(loopItem.id)).toBeUndefined();
  });

  test("should update and render loop items", () => {
    gameLoop.addItem(loopItem);

    expect(loopItem.handleInput).toHaveBeenCalled();
    expect(loopItem.update).toHaveBeenCalled();
    expect(loopItem.render).toHaveBeenCalled();
    gameLoop.removeItem(loopItem.id);
  });

  test("should remove finished loop items", () => {
    loopItem.isFinished = true;
    gameLoop.addItem(loopItem);
    for(var i = 0; i < 100; ++i) {
      let m = Math.random()
      m.toFixed();
    }
    expect(gameLoop.getItem(loopItem.id)).toThrow();
  });
});