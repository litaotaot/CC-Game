import { _decorator, Component, Label, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('workCom')
export class workCom extends Component {

    @property(Node)
    private workImgNode: Node = null;

    @property(Label)
    private settleValue: Label = null;
    @property(Label)
    private salaryValue: Label = null;
    @property(Label)
    private titleValue: Label = null;

    start() {

    }

    setImg(value: string) {

    }

    setValue(params: {title: string, salary: string, settle: string, img: SpriteFrame}) {
        const { title, salary, settle, img } = params
        this.titleValue.string = title;
        this.salaryValue.string = salary;
        this.settleValue.string = settle;
        let sprite = this.workImgNode.getComponent(Sprite);
        sprite.spriteFrame = img;
    }

    update(deltaTime: number) {
        
    }
}

