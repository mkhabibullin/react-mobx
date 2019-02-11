
import axios from 'axios';
import AppConfig from '../../AppConfig';


class FileActions {
    
    public static getDirectories(): Promise<any> {
        const path: string = `${AppConfig.ApiUrl}/files`;

        return axios.get(path);
    }
}

export default FileActions