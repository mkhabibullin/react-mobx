export default class AppConfig
{
    public static ApiUrl = process.env.NODE_ENV == 'production' ? 'http://i2x2.net:5000/api' : 'http://localhost:5000/api';
}