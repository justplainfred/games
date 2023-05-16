import { Shape, Circle } from "../lib/types";
test("render", () => {
  let circle: Circle = {
    center: {
      x: 0,
      y: 0
    },
    radius: 1
  }
  expect(circle).toBeDefined();
})