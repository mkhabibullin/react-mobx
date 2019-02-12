
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

    public static delete(id: string): Promise<any> {
        return axios.delete(`${AppConfig.ApiUrl}/files/${id}`);
    }

    public static getDirectoryItems(id: string): Promise<any> {
        const path: string = `${AppConfig.ApiUrl}/files/${id}/items`;

        return axios.get(path)
            .then((resp) => {
                return resp.data.result;
            });
    }
}

export default FileActions