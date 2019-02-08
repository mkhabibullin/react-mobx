import { action, observable } from "mobx";
import filesActions from '../actions/FileActions';

class FilesStore {

    @observable public Directories: Array<any> = new Array();

    @action
    public getDirectories(): Promise<any> {
        return filesActions.getDirectories()
            .then(r => {
                this.Directories = r;
            });
    }
}

const filesStoreSingleton = new FilesStore();
export default filesStoreSingleton;