# Advanced Configuration
This file helps with the configuration in a Ubuntu machine.

## Steps

### Credentials used by the application 
It is necessary to create a folder ```config``` in the project root. Add a file ```config.js``` inside with the credentials.

### NGINX configuration
**Commands to execute:**

```
sudo apt-get update
sudo apt-get install nginx
cd /etc/nginx/sites-available/
sudo nano default 
```

**File Content:**  

```
server {
    listen 80;

    server_name _;

    location / {
        proxy_pass http://localhost:8080;
    }
}
```

### Git Deploy Keys
**Generate Keys:**
```
ssh-keygen -t rsa -C "up201305244@gcloud.fe.up.pt"
```
**GiHub:** Add public key to GitHub ```(Settings -> Deploy Keys)```

### Script file
**Name:** run.sh  
**Location:** _project location_

```
#!/bin/bash

git pull git@github.com:TonyDC/lgp1617-iwashere-web.git &&
npm install &&
webpack --config ./webpack.prod.config.js --progress --colors &&
node ./server.js
```

### Service configuration file
**Name:** iwashere.service  
**Location:** ```/etc/systemd/system```

```
[Unit]
Description=iwashere Node.js server service

[Service]
ExecStart=/bin/sh /home/ubuntu/Sites/lgp1617-iwashere-web/run.sh
Restart=on-success
User=ubuntu
Group=ubuntu
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=/home/ubuntu/Sites/lgp1617-iwashere-web

[Install]
WantedBy=multi-user.target
```

**Commands to run:**

```
sudo systemctl daemon-reload
sudo systemctl start iwashere
journalctl --follow -u iwashere
```
