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
  

const singleton = new BirdStore();
export default singleton;

autorun(() => {
    alert(`${singleton.birds.length}`)
  })