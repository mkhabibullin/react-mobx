import React, { Component } from 'react';
import DirectoryItemModel from '../../Models/DirectoryItemModel';
import { observer } from 'mobx-react';
import './style.css'

export interface DirectoryItemActions {
    delete: (id: string) => any;
    getDirectoryItems: (id: string) => any;
  }

export interface DirectoryItemProps extends DirectoryItemActions {
    item: DirectoryItemModel
}

export interface DirectoryItemState {
    itemsIsShowed: boolean;
}

@observer
class DirectoryItem extends Component<DirectoryItemProps, DirectoryItemState> {

    constructor(props?: DirectoryItemProps, context?: any) {
        super(props, context);
        this.state = { itemsIsShowed : false }
    }

    onDelete(name: string) {
        if (confirm(`Delete ${name}?`)) this.props.delete(name);
    }

    onShow(name: string) {
        this.setState({itemsIsShowed: true});
        this.props.getDirectoryItems(name);
    }

    render() {
        const { name, date, files, subDirectories } = this.props.item;
        return (
            <article className="card">
                {date.toLocaleDateString()} <b>{date.getHours()}:{(date.getMinutes()<10?'0':'') + date.getMinutes()}</b>
                <p>{name}</p>
                <a className="App-link" onClick={this.onDelete.bind(this, name)}>X</a>
                {!this.state.itemsIsShowed && <a className="App-link" onClick={this.onShow.bind(this, name)}>show items</a>}
                {this.state.itemsIsShowed && <p className='break-line'/>}
                {subDirectories && subDirectories.map(sd => <div className={'card__sub-directories'}>{sd.name}</div>)}
                {files && files.map((f, idx) => <div key={idx} className={'card__files'}>{f.name}</div>)}
            </article>
        );
    }
}

export default DirectoryItem