import knex from "knex";
//@ts-ignore
const pgsql = await knex({
  client: "pg",
  connection: {
    database: "task",
    user: "task",
    password: "task",
    host: "localhost",
    port: 5432,
  },
});

export { pgsql };
