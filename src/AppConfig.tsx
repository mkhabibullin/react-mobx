export default class AppConfig
{
    public static ApiUrl = process.env.NODE_ENV == 'production' ? 'https://i2x2.net/api' : 'http://localhost:5001/api';
}