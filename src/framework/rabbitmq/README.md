# RabbitMQ App Plug-in

### Version

`rabbitmq-core-1.0.0v`

## Plug-in Dependencies

- domain
- infrastructure

## Dependencies

- amqplib
- @types/amqplib
- debug
- @types/debug
- axios

```
npm install amqplib debug axios
```

```
npm install --save-dev @types/amqplib @types/debug
```

## Environment Variables

- TEST_CONTEXT

- RABBITMQ_URL
- RABBITMQ_CONNECTION_NAME
- RABBITMQ_EXCHANGE
- RABBITMQ_EXCHANGE_TYPE
- RABBITMQ_QUEUE

- RABBITMQ_VHOST_TEST
- RABBITMQ_QUEUE_TEST
- RABBITMQ_CONNECTION_NAME_TEST

```
TEST_CONTEXT=

RABBITMQ_URL=
RABBITMQ_CONNECTION_NAME=
RABBITMQ_EXCHANGE=
RABBITMQ_EXCHANGE_TYPE=
RABBITMQ_QUEUE=

RABBITMQ_VHOST_TEST=
RABBITMQ_QUEUE_TEST=
RABBITMQ_CONNECTION_NAME_TEST=
```
