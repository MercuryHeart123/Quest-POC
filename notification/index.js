const express = require('express');
var cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const app = express();
const kafka = require('kafka-node');

app.use(cors());
const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_URL });
const consumer = new kafka.Consumer(client, [{ topic: 'notification' }], { autoCommit: false });
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    consumer.on('message', (message) => {
        console.log(message);
        socket.emit('notification', message.value);
    });
});

io.on('disconnect', () => {
    console.log('user disconnected');
});

server.listen(8081, () => {
    console.log('Listening on port 8081');
});