import React, { Component } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';
import FilesStore from '../services/stores/FilesStore';
import { inject, observer } from 'mobx-react';
import FileUploader from '../components/FileUploader/index';
import DirectoryItem from '../components/DirectoryItem';
import DirectoryItemsList from '../components/DirectoryItemsList';

export interface FilesProps extends RouteComponentProps<any> {
    /** MobX Stores will be injected via @inject() **/
    // [STORE_ROUTER]: RouterStore;
    // [STOURE_TODO]: TodoStore;
  }

export interface FilesState {
}

@inject("filesStore")
@observer
class FileUploaderApp extends Component<FilesProps, FilesState> {

    componentDidMount() {
        this.store.getDirectories();
    }

    get store():FilesStore { return this.props['filesStore']; }

    render() {
        return (
            <div>
                <DirectoryItemsList Items={this.store.Directories}
                    delete={this.store.delete}
                    getDirectoryItems={this.store.getDirectoryItems}/>
                <FileUploader activeColor={'green'} baseColor={"gray"} overlayColor={"rgba(255,255,255,0.3)"} />
            </div>
        );
    }
}

export default FileUploaderApp;