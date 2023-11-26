import express, { Request, Response } from "express";
import { TBalance } from "../types";

export async function validate_balance(
  req: Request,
  res: Response
): Promise<TBalance | undefined> {
  const { userId, balance } = req.query;
  if (!userId || !balance) {
    res.status(500).send("No userId or balance was set");
    return;
  }
  if (isNaN(Number(balance)) || isNaN(Number(userId))) {
    res.status(500).send("Balance or UserId is not number");
    return;
  }
  //@ts-ignore
  if (!isInt(balance)) {
    res.status(500).send("Balance is not integer");
    return;
  }

  //@ts-ignore
  return { balance, userId };
}
function isInt(n: number) {
  return n % 1 === 0;
}
