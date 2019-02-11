import React, { Component } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';
import FilesStore from '../services/stores/FilesStore';
import { inject, observer } from 'mobx-react';
import FileUploader from './FileUploader/index';

export interface FilesProps extends RouteComponentProps<any> {
    /** MobX Stores will be injected via @inject() **/
    // [STORE_ROUTER]: RouterStore;
    // [STOURE_TODO]: TodoStore;
  }

export interface FilesState {
}

@inject("filesStore")
@observer
class FileUploaderOld extends Component<FilesProps, FilesState> {

    componentDidMount() {
        this.store.getDirectories();
    }

    get store() { return this.props['filesStore']; }

    render() {
        const directories = this.store.Directories;
        return (
            <div>
                {(directories || []).map(d => {
                    const date = new Date(d.createdAt);
                    return <div>{date.toLocaleDateString()} <b>{date.getHours()}:{date.getMinutes()}</b> - {d.name}</div>
                    })}
                <FileUploader activeColor={'green'} baseColor={"gray"} overlayColor={"rgba(255,255,255,0.3)"} />
            </div>
        );
    }
}

export default FileUploaderOld;