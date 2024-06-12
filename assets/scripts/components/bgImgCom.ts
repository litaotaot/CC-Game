import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bgImgCom')
export class bgImgCom extends Component {

    @property(Label)
    private bgImgLabel: Label = null;
    displaySpeed = 0.1;
    text = '';
    list = [];
    index = 0;
    lineIndex = 0;
    textLength = 0;

    start() {
        // this.setString();
    }

    setString(value: string) {
        this.bgImgLabel.string = value
    }

    setArrString(list: string[]) {
        this.bgImgLabel.string = '';
        this.unschedule(this.displayTextOneByOne);
        
        this.list = list;
        this.index = 0;
        this.lineIndex = 0;
        this.text = list[this.lineIndex]
        this.textLength = list.length - 1;

        list.forEach((item) => {
            this.textLength += item.length
        })

        this.schedule(this.displayTextOneByOne, this.displaySpeed);
    }

    displayTextOneByOne() {
        if (this.index < this.text.length) {
            // 逐字显示文本内容
            this.bgImgLabel.string += this.text[this.index];
            this.index++;
        } else {
            // 换行
            this.bgImgLabel.string += '\n';
            this.lineIndex++;
            if (this.lineIndex >= this.list.length) {
                this.unschedule(this.displayTextOneByOne);
            } else {
                this.text = this.list[this.lineIndex];
                this.index = 0;
            }
        }
    }


    update(deltaTime: number) {

    }
}

