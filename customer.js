const amqp = require('amqplib/callback_api');
// const connection = require('mysql/lib/Connection');

amqp.connect('amqp://localhost', (err, connection) => {
    if(err){
        throw err;
    }
    connection.createChannel((err,channel)=>{
        if(err){
            throw err;
        }
        let queueName = "hello";
        channel.assertQueue(queueName,{
            durable: false,   
        });
        channel.consume(queueName,(msg)=>{
            console.log(`received: ${msg.content.toString()}`);
            channel.ack(msg);
        });
    })
})