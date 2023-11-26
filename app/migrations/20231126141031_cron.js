/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("cron_tasks", (table) => {
      table.increments("id");
      table.string("name").nullable();
      table.string("replica_id").nullable();
      table.string("result").nullable();
      table.timestamp("timestamp").defaultTo(knex.fn.now());
    }),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.all([knex.schema.dropTable("cron_tasks")]);
};
