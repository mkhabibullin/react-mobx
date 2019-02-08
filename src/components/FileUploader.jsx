import React, { Component } from 'react';
import axios from 'axios';
import FilesStore from '../services/stores/FilesStore';

export interface FilesProps extends RouteComponentProps<any> {
    /** MobX Stores will be injected via @inject() **/
    // [STORE_ROUTER]: RouterStore;
    // [STOURE_TODO]: TodoStore;
  }

export interface FilesState {
}

class FileUploader extends Component<FilesProps, FilesState> {


    componentDidMount() {
        this.props.
    }

    fileUpload()
    {
        var formData = new FormData();
        var files = document.querySelector('input[type="file"]').files;

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
    return (
        <div>
            <div>
                <input type="file" name="files" multiple/>
            </div>
            <button onClick={this.fileUpload.bind(this)}>Upload</button>
        </div>
    );
    }
}

export default FileUploader;