import { _decorator, Component, Label, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('appCom')
export class appCom extends Component {

    @property(Node)
    private appSprite: Node = null;

    @property(Label)
    private appLabel: Label = null;


    start() {

    }

    setValue(params: {label?: string, sprite?: SpriteFrame}) {
        const { label, sprite } = params;
        this.appLabel.string = label;
        if (sprite) {
            let spriteComponent = this.appSprite.getComponent(Sprite);
            spriteComponent.spriteFrame = sprite;
        }

    }

    update(deltaTime: number) {
        
    }
}

