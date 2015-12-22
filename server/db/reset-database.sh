#!/bin/bash
dropdb princeton-surveys-development
dropdb princeton-users-development
createdb princeton-surveys-development
createdb princeton-users-development

node server/db/migrate.js users
node server/db/seeds/users/users.js
./server/db/seeds/surveys/migrate-and-seed-all.sh
