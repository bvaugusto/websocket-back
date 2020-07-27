const express = require('express');
const http = require('http');
const webSocket = require('ws');
const app = express();
const server = http.createServer(app);
const wss = new webSocket.Server({ server });
const arqCalculator = require('arq-calculator');

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    const operation = data.split(' ');
    const param1 = parseFloat(operation[0]);
    const param2 = parseFloat(operation[2]);
    let result;

    switch (operation[1]) {
      case '+':
        result = arqCalculator.addition(param1, param2);
        ws.send(result);
        break;
      case '-':
        result = arqCalculator.subtraction(param1, param2);
        ws.send(result);
        break;
      case '/':
        result = arqCalculator.division(param1, param2);
        ws.send(result);
        break;
      case '*':
        result = arqCalculator.multiplication(param1, param2);
        ws.send(result);
        break;
      default:
        ws.send("Operador inválido!");
        break;
    }
  });
});


server.listen(process.env.PORT || 9898, () => {
  console.log("Connect port:", server.address().port);
})