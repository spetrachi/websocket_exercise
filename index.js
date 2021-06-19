const wsUri = 'wss://echo.websocket.org';
let websocket = null;


const init = () => {
        websocket = new WebSocket(wsUri);
        if (websocket) {
            websocket.onopen = () => {
                console.log('connessione aperta');
                const connessione = document.getElementById('info-connessione');
                connessione.innerHTML = 'Connesso al Websocket: ' + wsUri;
            }
            websocket.onclose = () => console.log('connessione chiusa');
            websocket.onmessage = event => {
                const msgs = document.getElementById('messages');
                msgs.innerHTML += 'Messaggio ricevuto: ' + event.data + '</br>';
            }
            websocket.onerror = error => console.log('Errore: ' + error);
        }
}

function inviaMessaggio() {
    const msg = document.getElementById('messaggio').value;
    stampaMsgInviato(msg);
    return websocket.send(msg);
}

function stampaMsgInviato(msg) {
    const msgs = document.getElementById('messages');
    msgs.innerHTML += 'Messaggio inviato: ' + msg + '</br>';
}

function closeConnection() {
    websocket.close();
    const connessione = document.getElementById('info-closed');
    connessione.innerHTML = '<span style="color:red">Connessione terminata con il WebSocket: ' + wsUri + '</span>';
}

window.addEventListener('load', init);