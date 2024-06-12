import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('messageCom')
export class messageCom extends Component {

    @property(Label)
    private messageLabel: Label = null;

    start() {

    }

    setMessage(value: string) {
        this.messageLabel.string = value;
        this.node.active = true;
        setTimeout(() => {
            this.node.active = false;
        }, 2000)
    }

    update(deltaTime: number) {
        
    }
}

