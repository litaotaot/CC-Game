import { _decorator, Component, Node, Label, Color, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('squareCom')
export class squareCom extends Component {

    @property(Node)
    private squareNode: Node = null;
    
    @property(Label)
    private squareLabel: Label = null;

    start() {

    }

    setSquareLabel(value: string) {
        this.squareLabel.string = value
    }

    setSquareBackground(color: Color) {
        let sprite = this.node.getComponent(Sprite);
        if (sprite) {
            sprite.color = color;
        }
    }

    setSquareFrame(img: SpriteFrame) {
        let sprite = this.squareNode.getComponent(Sprite);
        if (sprite) {
            sprite.color = new Color(255, 255, 255, 255);
            sprite.spriteFrame = img;
        }
    }

    update(deltaTime: number) {
        
    }
}

