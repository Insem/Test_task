# Тестовое задание

Запуск `REPLICA_COUNT=5  sh start.sh`

Проверка `node test.js`
Статус: http://localhost:8080/get_tasks
Прибавить: http://localhost:8080/add_balance?userId=1&balance=3
Отнять: http://localhost:8080/subtract_balance?userId=1&balance=3

Задачи находятся в ./app/src/cron_task/tasks
