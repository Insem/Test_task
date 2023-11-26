import { TBalance } from "../types";
import { pgsql } from "./postgres";

export async function psql_subtract_balance(
  data: TBalance
): Promise<{ isErr: boolean; reply: string }> {
  let result: Array<{ balance: number }> = await pgsql("users")
    .update({
      balance: pgsql.raw("balance - ?", [data.balance]),
    })
    .whereRaw("id = ? AND balance - ? >= 0", [data.userId, data.balance])
    .returning("balance");
  if (result.length == 0) {
    return { isErr: true, reply: "Balance of user couldn't be less than 0" };
  }
  if (!result[0].balance) {
    return { isErr: true, reply: "Some error happened there is no balance" };
  }
  return { isErr: false, reply: result[0].balance.toString() };
}
