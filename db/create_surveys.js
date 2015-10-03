require('dotenv').load()
var pg = require('pg');
var connectionString = process.env.SURVEY_DATABASE_URL || 'postgres://localhost:5432/person-project-surveys-development';

var createSurveys = 'CREATE TABLE surveys(id SERIAL PRIMARY KEY, name VARCHAR(40) not null, ' +
'description TEXT not null, ' +
'version INTEGER not null, ' +
'estimated_time_to_complete INTEGER not null, ' +
'status VARCHAR(40) not null, ' +
'created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), ' +
'updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW())';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query(createSurveys);
query.on('end', function() { client.end(); });
