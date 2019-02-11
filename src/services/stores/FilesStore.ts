import { action, observable } from "mobx";
import filesActions from '../actions/FileActions';
import axios from 'axios';

class FilesStore {

    @observable public Directories: Array<any> = new Array();

    @action
    public getDirectories(): Promise<any> {
        return filesActions.getDirectories()
            .then(r => {
                this.Directories = r;
            });
    }

    @action.bound
    public upload(files: FormData)
    {
        return filesActions.upload(files)
            .then(r => {
                this.getDirectories()
            });
    }
}

const filesStoreSingleton = new FilesStore();
export default filesStoreSingleton;