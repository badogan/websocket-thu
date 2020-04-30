const http = require("http");
const WebSocketServer = require("websocket").server;
let connection = null;

const sendevery5seconds = () =>{
    connection.send(`Message ${Math.random()}`)
    setTimeout(sendevery5seconds,3000)
}

const httpserver = http.createServer((req, res) => {
  console.log("we have received a request");
});

const websocket = new WebSocketServer({
  "httpServer": httpserver
});

websocket.on("request", request => {
  connection = request.accept(null, request.origin);
  sendevery5seconds()
  connection.on("open", () => console.log("Opened!!"));
  connection.on("close", () => console.log("Closed!!"));
  connection.on("message", message => {

    console.log(`Received message ${message.utf8Data}`);
  });
});



httpserver.listen(8080, () => console.log("my server is listening 8080"));


