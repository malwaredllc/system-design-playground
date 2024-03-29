const {Kafka} = require("kafkajs");
const msg = process.argv[2];

run();
async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["Mac-6003088bc45e.local:9092"]
        })

        const producer = kafka.producer()
        console.log("Connecting...")

        await producer.connect()
        console.log("Connected!")


        // publish message to users topic
        const partition = msg[0] < "N" ? 0 : 1;
        const result = await producer.send({
            "topic": "Users",
            "messages": [{
                "value": msg,
                "partition": partition
            }]
        })
        console.log(`Sent message: ${msg}`)
        console.log(`Result: ${JSON.stringify(result)}`)

        // publish message to likes topic
        const result_like = await producer.send({
            "topic": "Likes",
            "messages": [{
                "value": 1
            }]
        })
        console.log(`Sent message: ${msg}`)
        console.log(`Result: ${JSON.stringify(result)}`)

        // publish message to events topic
        const result_event = await producer.send({
            "topic": "Events",
            "messages": [{
                "value": "purchase"
            }]
        })
        console.log(`Sent message: ${msg}`)
        console.log(`Result: ${JSON.stringify(result)}`)

        await producer.disconnect()
    } catch(ex) {
        console.error(`Something bad happened: ${ex}`)
    } finally {
        process.exit(0);
    }
}