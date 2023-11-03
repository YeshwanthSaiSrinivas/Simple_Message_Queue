const amqp = require('amqplib/callback_api');
// const connection = require('mysql/lib/Connection');

amqp.connect('amqp://localhost', (err, connection) => {
    if(err){
        throw err;
    }
    connection.createChannel((err, channel) => {
        if(err){
            throw err;
        }
        let queueName = 'hello';
        let message = 'Hello World!';
        channel.assertQueue(queueName, {durable: false});
        channel.sendToQueue(queueName, Buffer.from(message));
        console.log(`Message Sent: ${message}`);
        setTimeout(()=>{
            connection.close();
        },1000)
    })
})