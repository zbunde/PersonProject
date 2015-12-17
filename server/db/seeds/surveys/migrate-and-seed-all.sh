#!/bin/bash
node server/db/migrate.js surveys

node server/db/seeds/surveys/body-consciousness-scale.js
node server/db/seeds/surveys/demographics.js
node server/db/seeds/surveys/feedback.js
node server/db/seeds/surveys/mos-social-support.js
node server/db/seeds/surveys/real-world-sharing.js
