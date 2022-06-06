import Sprite from "./Sprite";

interface Sprites {
    idle?: Sprite,
    run?: Sprite,
    jump?: Sprite,
    fall?: Sprite,
    landing?: Sprite,
}

export default Sprites;