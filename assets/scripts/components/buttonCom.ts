import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('buttonCom')
export class buttonCom extends Component {

    @property(Label)
    private buttonLabel: Label = null;

    start() {

    }

    setString(value: string) {
        this.buttonLabel.string = value
    }

    update(deltaTime: number) {
        
    }
}

