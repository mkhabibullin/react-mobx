import axios from 'axios';

class FileActions {

    private static API_URL = process.env.REACT_APP_API + '/files';
    
    public static getDirectories(): Promise<any> {
        const path: string = `${FileActions.API_URL}`;

        return axios.get(path)
            .then((resp) => {
                return resp.data;
            });
    }

    public static upload(files: FormData): Promise<any> {
        return axios.post(`${FileActions.API_URL}`, files, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    }

    public static delete(id: string): Promise<any> {
        return axios.delete(`${FileActions.API_URL}/${id}`);
    }

    public static getDirectoryItems(id: string): Promise<any> {
        const path: string = `${FileActions.API_URL}/${id}/items`;

        return axios.get(path)
            .then((resp) => {
                return resp.data;
            });
    }
}

export default FileActions