import { Sequelize } from 'sequelize';

async function connectToDB(dbURI) {
  // setup the database connection
  const sequelize = new Sequelize(dbURI, {
    logging: console.log,
    define: {
      timestanmps: false,
      underscored: true,
    },
  });

  // test the connection
  try {
    await sequelize.authenticate();
  } catch (err) {
    console.log(err);
  }
  // return the database connection
  return sequelize;
}

export default connectToDB;
