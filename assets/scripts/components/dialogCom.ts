import { _decorator, Component, EditBox, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('dialogCom')
export class dialogCom extends Component {

    @property(Node)
    private dialogNode: Node = null;
    @property(Node)
    private maskBgNode: Node = null;
    @property(Node)
    private sureButtonNode: Node = null;
    @property(Node)
    private cancelButtonNode: Node = null;
    @property(Node)
    private ascButtonNode: Node = null;
    @property(Node)
    private decButtonNode: Node = null;
    @property(Node)
    private numInputNode: Node = null;

    @property(Label)
    private headerLabel: Label = null;
    @property(Label)
    private editBoxLabel: Label = null;
    @property(Label)
    private bodyLabel: Label = null;

    start() {
        this.initEvent();
        this.maskBgNode.on(Node.EventType.TOUCH_START, (event) => {
            event.propagationStopped = true;
        }, this);
    }

    initDialog(type?: string, label: string = '数量') {
        this.initValue();
        if (type === 'input') {
            this.numInputNode.active = true;
            this.editBoxLabel.string = label;
        } else {
            this.numInputNode.active = false;
            this.ascButtonNode.active = false;
            this.decButtonNode.active = false;
            this.editBoxLabel.string = '';
            this.bodyLabel.string = label;
        }
    }

    initValue(value: string = '1') {
        this.numInputNode.getComponent(EditBox).string = value;
    }

    initEvent() {
        this.sureButtonNode.on(Node.EventType.TOUCH_END, this.sureButtonEvent, this);
        this.cancelButtonNode.on(Node.EventType.TOUCH_END, this.cancelButtonEvent, this);
        this.ascButtonNode.on(Node.EventType.TOUCH_END, this.ascButtonEvent, this);
        this.decButtonNode.on(Node.EventType.TOUCH_END, this.decButtonEvent, this);
    }

    sureButtonEvent() {
        this.node.emit('dialogEvent', {type: 'sure', value: this.numInputNode.getComponent(EditBox).string})
    }

    cancelButtonEvent() {
        this.node.emit('dialogEvent', {type: 'cancel'})
    }

    ascButtonEvent() {
        let value = this.numInputNode.getComponent(EditBox).string || 1
        this.numInputNode.getComponent(EditBox).string = String(Number(value) + 1)
    }

    decButtonEvent() {
        let value = this.numInputNode.getComponent(EditBox).string
        if (Number(value) <= 1) return;
        this.numInputNode.getComponent(EditBox).string = String(Number(value) - 1)
    }

    update(deltaTime: number) {
        
    }
}

