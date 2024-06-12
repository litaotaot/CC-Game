import { _decorator, Component, Label, Node, Sprite, SpriteFrame, Color } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('blockTxtCom')
export class blockTxtCom extends Component {

    @property(Node)
    private blockTxtNode: Node = null;

    @property(Label)
    private blockTxtLabel1: Label = null;
    @property(Label)
    private blockTxtLabel2: Label = null;

    start() {

    }

    setBlockTxtCom(params: { label1: string, label2: string, img: SpriteFrame }) {
        this.blockTxtLabel1.string = params.label1;
        this.blockTxtLabel2.string = params.label2;
        let sprite = this.blockTxtNode.getComponent(Sprite);
        if (sprite) {
            sprite.color = new Color(255, 255, 255, 255);
            sprite.spriteFrame = params.img;
        }
    }

    update(deltaTime: number) {
        
    }
}

