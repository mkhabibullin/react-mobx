import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import FilesStore from '../../services/stores/FilesStore';
import { inject, observer } from 'mobx-react';
import FilesUploader from './FilesUploader/index';
import FilesDirectoryItemsList from './FilesDirectoryItemsList';
import { HubConnection } from '@aspnet/signalr';
import { autorun } from 'mobx';

export interface FilesProps extends RouteComponentProps<any> {
    /** MobX Stores will be injected via @inject() **/
    // [STORE_ROUTER]: RouterStore;
    // [STOURE_TODO]: TodoStore;
  }

export interface FilesState {
}

@inject("filesStore")
@inject("filesHub")
@observer
class Files extends Component<FilesProps, FilesState> {

    autorunDisposal = autorun(() => {
        console.log('Directories length is changed');
        console.log(this.store.Directories.length);
    });

    constructor(props: FilesProps, context: any) {
        super(props, context);
    }

    componentWillUnmount(){
        this.autorunDisposal();
    }

    componentDidMount() {
        this.store.getDirectories();
        this.filesHub.on('updated', () => {
            this.store.getDirectories();
        });
    }

    get store():FilesStore { return this.props['filesStore']; }

    get filesHub(): HubConnection { return this.props['filesHub']; } 

    render() {
        return (
            <div>
                <FilesDirectoryItemsList Items={this.store.Directories}
                    delete={this.store.delete}
                    getDirectoryItems={this.store.getDirectoryItems}/>
                <FilesUploader activeColor={'green'} baseColor={"gray"} overlayColor={"rgba(255,255,255,0.3)"} />
            </div>
        );
    }
}

export default Files;
