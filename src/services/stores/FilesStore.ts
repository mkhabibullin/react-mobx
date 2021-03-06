import { action, observable, runInAction } from "mobx";
import filesActions from '../actions/FileActions';
import FilesDirectoryItemModel from "../../components/Files/Models/FilesDirectoryItemModel";

class FilesStore {

    @observable public Directories: Array<FilesDirectoryItemModel> = new Array<FilesDirectoryItemModel>();

    @action.bound
    public getDirectories(): Promise<any> {
        return filesActions.getDirectories()
            .then(r => {
                runInAction(() => this.Directories = r.map(d => new FilesDirectoryItemModel(d.name, new Date(d.createdAt))));
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

    @action.bound
    public delete(id: string)
    {
        return filesActions.delete(id)
            .then(r => {
                this.getDirectories()
            });
    }

    @action.bound
    public getDirectoryItems(id: string)
    {
        return filesActions.getDirectoryItems(id)
            .then(r => {
                const dir = this.Directories.find(i => i.name === id);
                if(dir) {
                    runInAction(() => {                        
                        dir.files = r.files;
                        dir.subDirectories = r.directories;
                    });
                }
            });
    }
}

export default FilesStore