#!/bin/bash

git pull git@github.com:TonyDC/lgp1617-iwashere-web.git &&
npm install &&
webpack --config ./webpack.prod.config.js --progress --colors &&
node ./server.js
