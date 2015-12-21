#!/bin/bash
node server/db/migrate.js surveys

echo "body-consciousness-scale"
node server/db/seeds/surveys/body-consciousness-scale.js

echo "demographics"
node server/db/seeds/surveys/demographics.js

echo  "feedback"
node server/db/seeds/surveys/feedback.js

echo "mos-social-support"
node server/db/seeds/surveys/mos-social-support.js

echo "real-world-sharing"
node server/db/seeds/surveys/real-world-sharing.js

echo "extraversion"
node server/db/seeds/surveys/extraversion.js

echo "loneliness"
node server/db/seeds/surveys/loneliness.js

echo "depression"
node server/db/seeds/surveys/depression.js
