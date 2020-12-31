const amqp = require("amqplib");

connect();

async function connect() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = channel.assertQueue("jobs");

        console.log("Waiting for messages...");

        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Received job: ${input.number}`);
            channel.ack(message);
            console.log(`Processed job: ${input.number}`);
        });

    } catch (ex) {
        console.error(ex);
    }
}