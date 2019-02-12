import { observable } from 'mobx';

export class DirectoryItemModel {
    
  public name: string;
  public date: Date;

  @observable public subDirectories: Array<any>;
  @observable public files: Array<any>;

  constructor(name: string, date: Date) {
    this.name = name;
    this.date = date;
  }
}

export default DirectoryItemModel;
