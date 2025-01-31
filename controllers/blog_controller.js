const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const blogsRouter = require('express').Router()
const User = require('../models/user_model')
const Blog = require('../models/blog_model')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})


blogsRouter.get("/:id", async(request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
});

//Saving inside a database
//Start
blogsRouter.post("", async(request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  
  //This gets the ID of the person that submitted username
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    author: body.author,
    title: body.title,
    url:body.url, //!== undefined ? body.url : 0,
    likes:body.likes!== undefined ? body.likes : 0, // Default likes to 0,
    user:user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
});


blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  //This gets the ID of the person that submitted username
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() !== user.id.toString()) {
    return response
      .status(401)
      .json({ error: 'only the creator can delete blogs' })
  }

  // Remove the blog reference from the user's blogs array
  await User.findByIdAndUpdate(blog.user, { $pull: { blogs: blog._id } });
  
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

// Updating a record
blogsRouter.put("/:id", async(request, response, next) => {
  const { author, title, url, likes} = request.body;

  const blog=await Blog.findByIdAndUpdate(
     request.params.id,
    { author, title, url, likes},
    { new: true, runValidators: true, context: "query" }
  )
      
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
  
});


module.exports = blogsRouter;
//const blogsRouter = require('./blogsRouter');
