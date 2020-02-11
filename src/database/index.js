import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Courier from '../app/models/Courier';
import File from '../app/models/File';

const models = [User, Recipient, Courier, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
