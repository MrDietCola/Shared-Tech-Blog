const User = require('./User');
const BlogPost = require('./blogPost');


User.hasMany(BlogPost, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
  foreignKey: 'author_id'
});

module.exports = { User, BlogPost };
