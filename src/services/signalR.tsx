import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';

const buildHub = function(hubName: string) {
    const url = process.env.REACT_APP_API;
    const wsPrefix = process.env.REACT_APP_WS_PREFIX;

    const hubConnection = new HubConnectionBuilder()
        .withUrl(`${url}${wsPrefix || ''}/${hubName}`)
        .configureLogging(LogLevel.Information)
        .build();

        hubConnection
        .start()
        .then(() => console.log(`Connection with '${hubName}' hub started!`))
        .catch(err => console.log(`rror while establishing connection with '${hubName}' hub`));

    return hubConnection;
}

export default buildHub
