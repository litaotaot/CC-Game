import { _decorator, Component, Label, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('blockLongCom')
export class blockLongCom extends Component {

    @property(Node)
    private blockImgNode: Node = null;

    @property(Label)
    private labelValue1: Label = null;
    @property(Label)
    private labelValue2: Label = null;
    @property(Label)
    private labelValue3: Label = null;
    @property(Label)
    private labelValue4: Label = null;
    @property(Label)
    private labelValue5: Label = null;

    start() {

    }

    setImg(value: string) {

    }

    setValue(params: {label1?: string, label2?: string, label3?: string, label4?: string, label5?: string, img?: SpriteFrame}) {
        const { img } = params
        img && this.setSpriteNode(img)
        for (let i = 1; i <= 5; i++) {
            let value = params['label' + i] || ''
            this['labelValue' + i].string = value
        }
    }

    setSpriteNode(img: SpriteFrame) {
        let sprite = this.blockImgNode.getComponent(Sprite);
        sprite.spriteFrame = img;
    }

    update(deltaTime: number) {
        
    }
}

