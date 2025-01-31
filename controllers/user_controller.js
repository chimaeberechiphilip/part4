const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user_model')
const Blog = require('../models/blog_model')

//This Prints everything
// usersRouter.get("/", async(request, response) => {
//     const users = await User
//     .find({}).populate('notes')
//   response.json(users)
//   });

usersRouter.get('/', async (request, response) => {
    const users = await User
      .find({}).populate('blogs', {
        author: 1,
        title: 1,
        url:1,
      })
  
    response.json(users)
  })

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if (username.length < 3 || password.length < 3) {
    return res.status(500).json({ error: 'Username and password must be at least 3 characters long.' });
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  } )

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get("/:id", async(request, response, next) => {
    const user = await User.findById(request.params.id)
    if (user) {
      response.json(user)
    } else {
      response.status(404).end()
    }
  });

usersRouter.delete('/:id', async (request, response) => {
    await User.findByIdAndDelete(request.params.id)
    response.status(204).end()
})
  
 
  // Updating a record
  
  usersRouter.put("/:id", async(request, response, next) => {
    
    const { username, name, password} = request.body;
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user=await User.findByIdAndUpdate(
       request.params.id,
      { username, name, passwordHash},
      { new: true, runValidators: true, context: "query" }
    )
        
    if (user) {
      response.json(user)
    } else {
      response.status(404).end()
    }
    
 });

module.exports =usersRouter