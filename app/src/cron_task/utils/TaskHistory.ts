import { REPLICA_ID } from "../../consts";
import { pgsql } from "../../postgres/postgres";

export async function task_history(result: string, name: string) {
  await pgsql("cron_tasks").insert({
    name,
    replica_id: REPLICA_ID,
    result,
  });
}
