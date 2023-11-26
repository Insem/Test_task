import amqplib from "amqplib";
const rabbit_conn = await amqplib.connect("amqp://admin:admin@localhost:5672/");

export { rabbit_conn };
