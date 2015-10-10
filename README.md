## Set Up

```
npm install knex -g
createdb princeton-users-development
createdb princeton-surveys-development
cp .env{.example,}
npm install
nodemon
```

To migrate to the latest version, run:

```
node db/migrate.js
```

To create new migrations for the **users** database, run:

```
node db/make-migration.js users migration-name
```

To create new migrations for the **surveys** database, run:

```
node db/make-migration.js surveys migration-name
```

To seed the database, run:

```
node db/seed.js
```
