import React, { Component } from 'react';
import FilesDirectoryItem, { FilesDirectoryItemActions } from '../FilesDirectoryItem';
import './style.css'
import FilesDirectoryItemModel from '../Models/FilesDirectoryItemModel';

export interface FilesDirectoryItemsListProps extends FilesDirectoryItemActions
{
    Items: Array<FilesDirectoryItemModel>
}

class FilesDirectoryItemsList extends Component<FilesDirectoryItemsListProps> {

    render() {
        const { Items, ...actions } = this.props;
        return (
            <div className="centered">
                <section className="cards">
                    {Items.length > 0 && Items.map((i, idx) => <FilesDirectoryItem key={idx} item={i} {...actions}/>)}
                </section>
            </div>
        );
    }
}

export default FilesDirectoryItemsList