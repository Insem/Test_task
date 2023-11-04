import * as express from "express";
import * as knex from "knex";
const app = express();
const port = 8080;
const pgsql = knex({
  client: "pg",
  connection: {
    database: "task",
    user: "task",
    password: "task",
    host: "db",
    port: 5432,
  },
});
app.get("/update_balance", async (req, res): Promise<void> => {
  if (!req.query.userId || !req.query.balance) {
    res.status(500).send("No userId or balance was set");
    return;
  }

  let result: Array<{ balance: number }> = await pgsql("users")
    .update({
      balance: pgsql.raw("balance - ?", [req.query.balance]),
    })
    .whereRaw("id = ? AND balance - ? >= 0", [
      req.query.userId,
      req.query.balance,
    ])
    .returning("balance");

  if (result.length == 0) {
    res.status(500).send("Balance of user couldn't be less than 0");
    return;
  }

  res.status(200).send(result[0]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
