#!/bin/bash

# git pull git@github.com:TonyDC/lgp1617-iwashere-web.git &&
npm install &&
./node_modules/.bin/sequelize db:migrate db:migrate &&
NODE_ENV=production webpack --config ./webpack.prod.config.js --progress --colors &&
NODE_ENV=production node ./app.js
