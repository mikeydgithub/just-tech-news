const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connections');
const { init } = require('./User');

// create our Post model
class Post extends Model {}

// create fields/columns for Post model
// define Post schema
Post.init(
    {
        id: {
            type: Datatypes.INTEGEER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Datatypes.STRING,
            allowNull: false
        },
        post_url: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        user_id: {
            type: Datatypes.INTEGEER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

// export expression to make the Post model accessible to other parts of the application
module.exports = Post;