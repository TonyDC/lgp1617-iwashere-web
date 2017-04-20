# Migrations file

### Command 
`node_modules/.bin/sequelize model:create --name <table-name> --attributes <name>:<type>[,<name>:<type>]`

This command will create the migration, as well the model.

### Notes
- each function must return a Promise, so as to support asynchronous behaviour
