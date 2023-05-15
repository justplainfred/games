import { Loop, Item,  } from "../private/loop";
import { Render } from "../private/external";

export {
  Item,
  Render,
  CreateLoop
}

function CreateLoop (renderer: Render): Loop {
  return new Loop(renderer);
}
