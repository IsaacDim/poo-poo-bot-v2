# Poo Poo Bot

Ice's discord bot!

## Development

If you want to test and develop locally, you will need to first stop the application in the server.

1. SSH into the server
2. Navigate to `~/actions-runner/_work/poo-poo-bot/poo-poo-bot`
3. Run `pm2 stop all`

Afterwards simply run `npm run dev` in your local terminal (NOT in the server!).

## Manually start

If your application has stopped, you may be able to manually restart it.

1. SSH into the server
2. Navigate to `~/actions-runner/_work/poo-poo-bot/poo-poo-bot`
3. Run `pm start dist/index.js`

## TODO

[] Set-up proper environment file handling on the server
[] Set-up proper local dev testing
