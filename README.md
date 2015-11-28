## Set Up

```
npm install knex -g
npm install nodemon -g
npm install bower -g
createdb princeton-users-development
createdb princeton-surveys-development
cp .env{.example,}
npm install
nodemon
```

## Databases

The app requires two databases, so most Knex commands won't _just work_.  To that end, there are custom database migration scripts:

### Running Migrations

To migrate to the latest version, run:

```
node db/migrate.js
```

To migrate just one database run:

```
node db/migrate.js users
```

To rollback just one database run:

```
node db/migrate.js users rollback
```

### Creating Migrations

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
node db/seed_surveys.js
node db/survey_items_seeds/depression_closure.js
node db/survey_items_seeds/determining_causality.js
```

## Running tests

The test suite uses Mocha, Chai and Supertest.

To prepare the test database, run:

```
node db/prepare.js
```

To run server tests, run:

```
npm test
```

To run integration tests, first run the server:

```
npm start
```

Then run protractor:

```
npm run protractor
```
