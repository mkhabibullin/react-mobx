import { observable } from 'mobx';

export class FilesDirectoryItemModel {
    
  public name: string;
  public date: Date;

  @observable public subDirectories: Array<any>;
  @observable public files: Array<any>;

  constructor(name: string, date: Date) {
    this.name = name;
    this.date = date;
  }
}

export default FilesDirectoryItemModel;
