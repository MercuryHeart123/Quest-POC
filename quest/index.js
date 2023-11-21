const express = require('express');
var cors = require('cors');

const app = express();
const kafka = require('kafka-node');
app.use(express.json());
app.use(cors());

const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_URL });
const producer = new kafka.Producer(client);

producer.on('ready', () => {
    app.get('/quest', (req, res) => {
        const payload = [{
            topic: 'notification',
            messages: "Hello World"
        }];
        producer.send(payload, (err, data) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(201).send(data);
        });
    });
});
app.listen(8080, () => {
    console.log('Listening on port 8080');
});