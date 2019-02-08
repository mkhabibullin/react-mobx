import * as React from "react";
import { inject, observer } from "mobx-react";
import { BirdStore } from './../stores/BirdStore';
import { RouteComponentProps } from "react-router";

export interface BridsProps extends RouteComponentProps<any> {
    /** MobX Stores will be injected via @inject() **/
    // [STORE_ROUTER]: RouterStore;
    // [STOURE_TODO]: TodoStore;
  }

export interface BirdsState {
}

@inject("birdsStore")
@observer
export default class Birds extends React.Component<BridsProps, BirdsState> {

    constructor(props: BridsProps, context: any){
        super(props, context);
        this.state = {};
    }

    birdInput: HTMLInputElement | null = null;

    handleSubmit = (e: any) => {
        e.preventDefault();
        const store = this.props['birdsStore'] as BirdStore;
        store.addBird(this.birdInput ? this.birdInput.value : '');
        e.target.reset();
        };

    render() {
        const someStore = this.props['birdsStore'] as BirdStore;

        return (
        <div>
            <h2>You have {someStore.birdCount} birds</h2>

            <form onSubmit={e => this.handleSubmit(e)}>
            <input
                type="text"
                ref={input => (this.birdInput = input)}
                placeholder="Add a bird"
            />
            </form>

            <ul>
            {someStore.birds.map((bird:any) => (
                <li key={bird}>{bird}</li>
            ))}
            </ul>
        </div>
        );
    }
}