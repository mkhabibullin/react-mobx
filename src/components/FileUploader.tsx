import React, { Component } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';
import FilesStore from '../services/stores/FilesStore';
import { inject, observer } from 'mobx-react';

export interface FilesProps extends RouteComponentProps<any> {
    /** MobX Stores will be injected via @inject() **/
    // [STORE_ROUTER]: RouterStore;
    // [STOURE_TODO]: TodoStore;
  }

export interface FilesState {
}

@inject("filesStore")
@observer
class FileUploader extends Component<FilesProps, FilesState> {

    componentDidMount() {
        this.props['filesStore'].getDirectories();
    }

    fileUpload()
    {
        var formData = new FormData();
        var files = (document.querySelector('input[type="file"]') as any).files;

        for (let i=0; i<files.length; i++) 
        {
            formData.append('files[]', files[i], files[i].name);
        };

        axios.post('http://localhost:5000/api/files', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    }

    render() {
        const directories = this.props['filesStore'].Directories;
    return (
        <div>
            <div>
                <input type="file" name="files" multiple/>
            </div>
            <button onClick={this.fileUpload.bind(this)}>Upload</button>

            {(directories || []).map(d => d.name)}
        </div>
    );
    }
}

export default FileUploader;