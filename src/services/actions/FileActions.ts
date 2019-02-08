import appConfig from '../../AppConfig';
import axios from 'axios';


class FileActions {
    
    public static getDirectories(): Promise<any> {

        const path: string = `${appConfig.ApiUrl}/files`;

        return axios.get(path);
    }
}

export default FileActions