// Imported Model class and DataTypes object from Sqeulize.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');
const bcrypt = require('bcrypt');

// create our User model
// This Model class is what we create our own models from using the extends keyword so User inherits all the functionality the model class has.
class User extends Model {}

// define table columns and configuration
// .init() method to initilize the model's data  and configuration, passing in two objects as arguments.
// the first object will define the columns and data types.
// the second object it accepts configures certain options for the table.
User.init(
  {
    // define an id column
    id: {
      // use the special Sequelize DataTypes Object provide what type of data it is.
      type: DataTypes.INTEGER,
      // this is the equivalent of SQL's `NOT NULL` option
      allowNull: false,
      // instruct that this is the Primary Key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true
    },
    // define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // define an email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // there cannot be any duplicate email values in this table
      unique: true,
      // if allowNull is set to false, we can run our data through validator before creating the table data
      validate: {
        isEmail: true
      }
    },
    // define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this means the password must be at least four characters long
        len: [4]
      }
    }
    // TABLE COLUMN DEFINITIONS GO HERE
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionalitys
      // saltround value of 10 - how much time is needed to calculate a single BCrypt has.
      async beforeCreate(newUserData){
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    }
  },
  {
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user'
  }
);

module.exports = User;