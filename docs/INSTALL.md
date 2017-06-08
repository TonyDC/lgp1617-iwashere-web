# Product Installation and Maintenance Packages

The purpose of this manual focus on helping the user in deploying the application in a Unix-based server. The development team tested the deployment in a virtual machine with `Ubuntu 16.04.2 LTS`

## Required Software

The user must have installed the following software in the server:

-  Node.JS (version 7)
-  make 
-  gcc
-  nginx
-  python (version 2.7)
-  PostgreSQL 9.6

## Required Resources

- In order to comply with `HTTPS` protocol, it is required to have the certificate and the respective private key, both in PEM format. Add them inside `/etc/ssl/certs` and `/etc/ssl/private`, respectively.
- In order to support third-party authentication providers (e.g.: Facebook, Google), this project requires the creation of a **Firebase** project. To do so, go to https://firebase.google.com/. Also, it is required to create a **Facebook App** to allow users to login via this provider.

## Steps

### Install Webpack

- Run `npm install -g webpack`

### Unpack software

- Unzip the package in a directory (*e.g.: /home/user/). This process will create a new directory called `lgp1617-iwashere-web`.
- `cd lgp1617-iwashere-web`
- Add execution permissions to the file `run.sh`, by executing `chmod u+x run.sh`
- Run `npm install`

### Create a new dedicated database for the application

- Login into PostgreSQL: `psql -U <user> -h localhost` (add `-W` option, if a password is required)
- Run `CREATE DATABASE <name-of-database>;`
- Run `\q`

### Configure NGINX

- `sudo nano /etc/nginx/sites-available/default`
- Add the following code (which allows to obtain ```A+``` classification by SSL Labs):

```
server {
    listen 80;
	 listen [::]:80;
	 server_name _;
	 return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    ssl_certificate <path-to-certificate>;
    ssl_certificate_key <path-to-key>;
    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDH+AESGCM:DH+AESGCM:ECDH+AES256:DH+AES256:ECDH+AES128:DH+AES:ECDH+3DES:DH+3DES:RSA+AESGCM:RSA+AES:RSA+3DES:!aNULL:!MD5:!DSS;
    ssl_dhparam /etc/ssl/certs/dhparam.pem;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:30m;

    ssl_buffer_size 8k;
    ssl_session_timeout 30m;
    ssl_stapling on;
    resolver 8.8.8.8;
    ssl_stapling_verify on;

   add_header Strict-Transport-Security max-age=31536000;
    
   add_header Public-Key-Pins 'pin-sha256="KvarTbN+F01kra6ejpHlLeS3p3XpbDmmUmdbaW7NVlE="; pin-sha256="8651wEkMkH5ftiaLp57oqmx3KHTFzDgp7ZeJXR0ToBs="; pin-sha256="1z6W8tyqOAOiB5cGerao6Y8o6I9pKsF0QcFkqK63iY0="; max-age=5184000; includeSubDomains';

   server_name _;

   location / {
        proxy_pass http://localhost:8080;
    }
}

```
- `sudo systemctl restart nginx`


### Adjust application configuration parameters

- `cd /home/user/lgp1617-iwashere-web/config`
- `nano config.js`
- Add the following code:

```
module.exports = {
    FIREBASE_ADMIN_SDK_PATH: '<path-to-firebase-admin-sdk-credentials-file>',
    FIREBASE_CONFIG: {
        apiKey: "<API-key>",
        authDomain: "<authentication-domain>",
        databaseURL: "<database-URL>",
        messagingSenderId: "<messaging-sender-ID>",
        projectId: "<project-ID>",
        storageBucket: "<storage-bucket-URL>"
    },
    POSTGRESQL_CONFIG: {
        DATABASE: '<the-name-of-the-created-database>',
        USERNAME: '<username>',
        PASSWORD: '<password>',
        CONN_CONFIG: {
            logging: false,
            host: '<location>',
            dialect: 'postgres',
            pool: {
                max: 10,
                min: 0,
                idle: 10000
            },
        }
    },
    GOOGLE_MAPS_API_KEY: '<Google-Maps-API-KEY>'
};
```
*(Note: ```FIREBASE_ADMIN_SDK_PATH```, ```FIREBASE_CONFIG ```, ```GOOGLE_MAPS_API_KEY``` must be obtained using the Firebase Console and Google API Console)*

- `nano db-config.json`
- Add the following code:

```
{
  "development": {
    "username": "<username>",
    "password": "<password>",
    "database": "<database-name>",
    "host": "<location>",
    "dialect": "postgresql"
  },
  "production": {
    "username": "<username>",
    "password": "<password>",
    "database": "<database-name>",
    "host": "<location>",
    "dialect": "postgresql"
  }
}
``` 

### Configure NPM

- Run `npm config set python <path-to-python2.7>`

### Create background script

- Run `sudo nano /etc/systemd/system/iwashere.service`
- Add the following code:

```
[Unit]
Description=iwashere Node.js server service

[Service]
ExecStart=/bin/sh /home/user/lgp1617-iwashere-web/run.sh
Restart=on-success
User=user
Group=user
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=/home/user/lgp1617-iwashere-web

[Install]
WantedBy=multi-user.target
```

- Run `sudo systemctl daemon-reload`

### Run server

- Run `sudo systemctl start iwashere`