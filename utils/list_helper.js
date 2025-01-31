const _ = require('lodash'); // Import Lodash
const dummy = (blogs) => {
    // ...
    return null
  }

  const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0); // Sum up likes of all blogs
  };  

  const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null; // Handle empty list case
  
    const favorite = blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog));
  
    // Return the favorite blog in the specified format
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes,
    };
  };

  const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null;
  
    // Group blogs by author and count the number of blogs per author
    const authorCounts = _.countBy(blogs, 'author');
  
    // Find the author with the most blogs
    const topAuthor = _.maxBy(_.keys(authorCounts), (author) => authorCounts[author]);
  
    return {
      author: topAuthor,
      blogs: authorCounts[topAuthor],
    };
  };

 

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  // Group blogs by author and sum up likes for each author
  const likesByAuthor = _(blogs)
    .groupBy('author')
    .mapValues((authorBlogs) => _.sumBy(authorBlogs, 'likes'))
    .value();

  // Find the author with the most likes
  const topAuthor = _.maxBy(_.keys(likesByAuthor), (author) => likesByAuthor[author]);

  return {
    author: topAuthor,
    likes: likesByAuthor[topAuthor],
  };
};  
  
  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }