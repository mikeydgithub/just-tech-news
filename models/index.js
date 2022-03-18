// Importing the User model and export an object with it as a property.
const User = require('./User');
const Post = require('./Post');

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// reverse associations
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Post };