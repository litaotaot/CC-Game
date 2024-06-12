import { _decorator, Component, Label, Node, SpriteFrame, Sprite, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('chatCom')
export class chatCom extends Component {

    @property(Node)
    private chatLeftSprite: Node = null;
    @property(Node)
    private chatRightSprite: Node = null;

    @property(Label)
    private chatLabel: Label = null;


    start() {

    }

    setValue(value: string = '', type: string = 'l', img?: SpriteFrame) {
        this.chatLabel.string = value;
        if (type === 'l') {
            this.chatLabel.horizontalAlign = Label.HorizontalAlign.LEFT;
            if (img) {
                let sprite = this.chatLeftSprite.getComponent(Sprite);
                sprite.spriteFrame = img;
            }
            // left
        } else {
            this.chatLabel.horizontalAlign = Label.HorizontalAlign.RIGHT;
            if (img) {
                let sprite = this.chatRightSprite.getComponent(Sprite);
                sprite.spriteFrame = img;
            }
            // right
        }
    }


    update(deltaTime: number) {
        
    }
}

