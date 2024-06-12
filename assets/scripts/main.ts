import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {
    start() {
        console.log('main start');
        director.preloadScene('game', () => {
            console.log('load game scene')
            director.loadScene("game");
        })
    }

    update(deltaTime: number) {
        
    }
}

