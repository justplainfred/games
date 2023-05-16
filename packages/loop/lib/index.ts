import { Loop, Item,  } from "../private/loop";
import { Render } from "../private/external";

export {
  Item,
  Loop,
  Render
}

function CreateLoop (renderer: Render): Loop {
  return new Loop(renderer);
}
