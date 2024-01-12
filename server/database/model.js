import { DataTypes, Model } from 'sequelize';
import connectToDB from './db.js';
import url from 'url';
import util from 'util';

const db = await connectToDB('postgresql://postgres:postgres@localhost:5432/uplow');

// ANCHOR -- Customer
class Customer extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Customer.init(
  {
    customer_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER(10),
      alllowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING(100), // TODO - make sure data type is right for pictures
      allowNull: true,
    },
    // PROPERTIES
  },
  {
    sequelize: db,
  }
);

// ANCHOR -- Worker
class Worker extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Worker.init(
  {
    worker_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER(10),
      alllowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING(100), // TODO - make sure data type is right for pictures
      allowNull: true,
    },
    // SERVICES PROVIDED
  },
  {
    sequelize: db,
  }
);

// ANCHOR -- Worker Service
class WorkerService extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

WorkerService.init(
  {
    workerService_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    jobType: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(),
    },
    rateType: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    rate: {
      type: DataTypes.DECIMAL(2),
      allowNull: null,
    },
  },
  {
    sequelize: db,
  }
);

// ANCHOR -- Property
class Property extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Property.init(
  {
    property_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    picture: {
      type: DataTypes.ARRAY(DataTypes.STRING(60)), // NOTE -- not sure if this will work, will have to check
      allowNull: false,
      validate: { notEmpty: true },
    },

    // ownerId: {
    // NOTE - foreign key for user connection
    // }
  },
  {
    sequelize: db,
  }
);

// ANCHOR -- Job
class Job extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Job.init(
  {
    job_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    jobType: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    instructions: {
      type: DataTypes.ARRAY(DataTypes.STRING(255)), // NOTE - make sure array works and string length is appropriate
      allowNull: false,
      validate: { notEmpty: true },
    },
    // NOTE - FK - subscriber_id - connects to worker
    // NOTE - FK - property_id, connects to worker
  },
  {
    sequelize: db,
  }
);

// ANCHOR -- Service
class Service extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Service.init(
  {
    service_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    paymentAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    dateCompleted: {
      type: DataTypes.DATE(), // TODO - make sure we are using the right DataType
    },
  },
  {
    sequelize: db,
  }
);

// ANCHOR -- Alert
class Alert extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Alert.init(
  {
    alert_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    alertType: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    hasRead: {
      type: DataTypes.BOOLEAN(),
      defaultValue: false,
    },
    message: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    timestamps: true,
  }
);
// ANCHOR -- Message
class Message extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Message.init(
  {
    message_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    hasRead: {
      type: DataTypes.BOOLEAN(),
      defaultValue: false,
    },
    message: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    // NOTE -- FK - Sender_id
    // NOTE -- FK - Recipient_id
    // NOTE -- FK - service_id
  },
  {
    sequelize: db,
    timestamps: true,
  }
);

// ANCHOR -- Relationships
Customer.hasMany(Property, { foreignKey: 'customer_id' });
Property.belongsTo(Customer, { foreignKey: 'customer_id' });
// --
Property.hasMany(Job, { foreignKey: 'property_id' });
Job.belongsTo(Property, { foreignKey: 'property_id' });
// --
Job.hasMany(Service, { foreignKey: 'job_id' });
Service.belongsTo(Job, { foreignKey: 'job_id' });
// --
Worker.hasMany(Service, { foreignKey: 'worker_id' });
Service.belongsTo(Worker, { foreignKey: 'worker_id' });
// --
Worker.hasMany(WorkerService, { foreignKey: 'worker_id' });
WorkerService.belongsTo(Worker, { foreignKey: 'worker_id' });
// --
Customer.hasMany(Message, { foreignKey: 'customer_id' });
Message.belongsTo(Customer, { foregnKey: 'customer_id' });
// --
Worker.hasMany(Message, { foreignKey: 'worker_id' });
Message.belongsTo(Worker, { foregnKey: 'worker_id' });
// --
Customer.hasMany(Alert, { foreignKey: 'customer_id' });
Alert.belongsTo(Customer, { foreignKey: 'customer_id' });
// --
Worker.hasMany(Alert, { foreignKey: 'worker_id' });
Alert.belongsTo(Worker, { foreignKey: 'worker_id' });

// ANCHOR -- Export
export default db;
