import React, { Component } from 'react';
import DirectoryItem, { DirectoryItemActions } from '../DirectoryItem';
import './style.css'
import DirectoryItemModel from '../../Models/DirectoryItemModel';

export interface DirectoryItemsListProps extends DirectoryItemActions
{
    Items: Array<DirectoryItemModel>
}

class DirectoryItemsList extends Component<DirectoryItemsListProps> {

    render() {
        const { Items, ...actions } = this.props;
        return (
            <div className="centered">
                <section className="cards">
                    {Items.length > 0 && Items.map((i, idx) => <DirectoryItem key={idx} item={i} {...actions}/>)}
                </section>
            </div>
        );
    }
}

export default DirectoryItemsList