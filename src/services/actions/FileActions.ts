
import axios from 'axios';
import AppConfig from '../../AppConfig';


class FileActions {
    
    public static getDirectories(): Promise<any> {
        const path: string = `${AppConfig.ApiUrl}/files`;

        return axios.get(path)
            .then((resp) => {
                return resp.data;
            });
    }

    public static upload(files: FormData): Promise<any> {
        return axios.post(`${AppConfig.ApiUrl}/files`, files, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    }
}

export default FileActions