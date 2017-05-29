# Installing native modules in Windows (node-gyp)

### Required software

- Python version 2 **(NOT VERSION 3!!!)**
- Microsoft Visual Studio with C/C++ components installed (or Microsoft Build Tools 2015 - https://www.microsoft.com/en-us/download/details.aspx?id=48159 - , if you don't want to install the whole IDE - it worked on my computer)

### Steps

- Remove the `node-modules` folder (e.g., move it to the recycle bin)
- Run `npm config set python <path-to-python-executable> --global`
- Run `npm config set msvs_version xxxx --global`, being `xxxx` the year of the Microsoft Visual Studio installed
- Run `npm install`
