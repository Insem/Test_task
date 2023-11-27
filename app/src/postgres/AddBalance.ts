import { TBalance } from "../types";
import { pgsql } from "./postgres";

export async function psql_add_balance(
  data: TBalance
): Promise<{ isErr: boolean; reply: string }> {
  let result: Array<{ balance: number }> = await pgsql("users")
    .update({
      balance: pgsql.raw("balance + ?", [data.balance]),
    })
    .returning("balance");

  if (!result[0].balance) {
    return { isErr: true, reply: "Some error happened there is no balance" };
  }
  return { isErr: false, reply: result[0].balance.toString() };
}
