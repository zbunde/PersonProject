var Schema = {
  users: {
    id: {type: 'increments', nullable: false, primary: true},
    username: {type: 'string', nullable: false, unique: true},
    hashed_pass: {type: 'string', nullable: false}
  }
}

module.exports = Schema;
