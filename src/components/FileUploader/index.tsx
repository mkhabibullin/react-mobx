import * as React from 'react';
import './style.css'
import { RouteComponentProps } from 'react-router';
import { inject } from 'mobx-react';

export interface FilesProps extends RouteComponentProps<any> {
    activeColor: string;
    baseColor: string;
    overlayColor: string;
}

// export interface FilesState {
//     active: boolean,
//     imageSrc: string,
//     loaded: boolean
// }

@inject("filesStore")
class FileUploader extends React.Component<any,any> {
    constructor(props: FilesProps) {
        super(props);
        
        this.state = {
            active: false,
            imageSrc: '',
            loaded: false
        }
        
        this.onDragEnter  = this.onDragEnter.bind(this);
        this.onDragLeave  = this.onDragLeave.bind(this);
        this.onDrop       = this.onDrop.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    get store() { return this.props['filesStore']; }
    
    onDragEnter(e) {
        this.setState({ active: true });
    }
    
    onDragLeave(e) {
        this.setState({ active: false });
    }
    
    onDragOver(e) { 
        e.preventDefault(); 
    }
    
    onDrop(e) {
        e.preventDefault();
        this.setState({ active: false });
        this.onFileChange(e, e.dataTransfer.files);
    }
    
    onFileChange(e, files) {
        var items = files || e.target.files;

        var formData = new FormData();

        for (let i=0; i<items.length; i++) 
        {
            formData.append('files[]', items[i], items[i].name);
        };
        this.store.upload(formData);
    }
    
    getFileObject() {
        return (this.refs.input as HTMLInputElement).files[0];
    }
    
    getFileString() {
        return this.state.imageSrc;
    }
    
    render() {
        let state = this.state,
            props = this.props,
            labelClass  = `uploader ${state.loaded && 'loaded'}`,
            borderColor = state.active ? props.activeColor : props.baseColor,
            iconColor   = state.active 
                ? props.activeColor
                : (state.loaded) 
                    ? props.overlayColor 
                    : props.baseColor;
        
        return (
            <label 
                className={labelClass}
                onDragEnter={this.onDragEnter}
                onDragLeave={this.onDragLeave} 
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
                style={{outlineColor: borderColor}}>
                
                <img src={state.imageSrc} className={state.loaded && 'loaded'}/>
                <i className="icon icon-upload" 
                    style={{ color: iconColor }}></i>
                    {/* accept="image/*" */}
                <input type="file" onChange={this.onFileChange.bind(this)} ref="input" />
            </label>
        );
    }
}

export default FileUploader