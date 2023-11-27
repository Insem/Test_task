import express, { Request, Response } from "express";
import { validate_balance } from "./validators/ValidateBalance";
import { TBalance } from "./types";
import { send_balance } from "./workers/SendBalance";
import { get_tasks } from "./workers/GetTasks";
const app = express();
const port = 8080;

app.get(
  "/subtract_balance",
  async (req: Request, res: Response): Promise<void> => {
    const send: TBalance | undefined = await validate_balance(req, res);

    if (!send) {
      res.status(500);
      return;
    }

    const result = await send_balance(send, "subtract");
    res.status(200).send(result);
  }
);

app.get("/add_balance", async (req: Request, res: Response): Promise<void> => {
  const send: TBalance | undefined = await validate_balance(req, res);

  if (!send) {
    res.status(500);
    return;
  }

  const result = await send_balance(send, "add");
  res.status(200).send(result);
});

app.get("/get_tasks", async (req: Request, res: Response): Promise<void> => {
  const result = await get_tasks("status");
  res.status(200).send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
