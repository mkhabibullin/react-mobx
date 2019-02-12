import { observable, action, computed, autorun } from "mobx";

export class BirdStore {
    
    @observable birds: Array<any> = [];

    @action
    addBird = (bird: any): void => {
        this.birds.push(bird);
    }

    @computed
    get birdCount() {
        return this.birds.length;
    }
}

export default BirdStore