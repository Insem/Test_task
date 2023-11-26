import * as amqplib from "amqplib";
//@ts-ignore
const rabbit_conn = await amqplib.connect("amqp://guest:guest@localhost:5672/");
export { rabbit_conn };
