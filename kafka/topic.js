const {Kafka} = require("kafkajs");

run();
async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["Mac-6003088bc45e.local:9092"]
        })

        const admin = kafka.admin()
        console.log("Connecting...")
        await admin.connect()
        console.log("Connected!")

        // Users topic has 2 partitions: A-M, N-Z
        await admin.createTopics({
            "topics": [
                {
                    "topic": "Users",
                    "numPartitions": 2
                },
                {
                    "topic": "Likes",
                    "numPartitions": 1
                },
                {
                    "topic": "Comments",
                    "numPartitions": 1
                },
            ]
        })

        console.log("Created successfully!")
        await admin.disconnect()
    } catch(ex) {
        console.error(`Something bad happened: ${ex}`)
    } finally {
        process.exit(0);
    }
}