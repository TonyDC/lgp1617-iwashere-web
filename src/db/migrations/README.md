# Migrations file

### Command 
`node_modules/.bin/sequelize migration:create --name <table-name> --attributes <name>:<type>[,<name>:<type>]`

This command will create the migration, as well the model.

### Notes
- each function must return a Promise, so as to support asynchronous behaviour

```
/*
WITH RECURSIVE path(context_id, parent_id, name) AS (
    SELECT context_id, parent_id, name FROM contexts WHERE name = 'FEUP'
  UNION
    SELECT c.context_id, c.parent_id, c.name
    FROM path p, contexts c
    WHERE c.context_id = p.parent_id
  ) select * from path;
  */

  WITH RECURSIVE children(context_id, parent_id, name) AS (
    SELECT context_id, parent_id, name FROM contexts WHERE name = 'UP'
  UNION
    SELECT c.context_id, c.parent_id, c.name
    FROM children p, contexts c
    WHERE p.context_id = c.parent_id
  ) select * from children;
  
  
  WITH RECURSIVE path(context_id, parent_id, name) AS (
      SELECT context_id, parent_id, name FROM contexts WHERE name = 'root'
    UNION
      SELECT c.context_id, c.parent_id, c.name
      FROM path p, contexts c
      WHERE c.context_id = p.parent_id
    ) select * from path inner join user_contexts ON (children.context_id = user_contexts.context_id) where user_contexts.user_id = '2PR6AlwJNsR24FqVXx8HKIivpwY2'
```
