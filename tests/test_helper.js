const Blog=require("../models/blog_model")
const User=require("../models/user_model")


const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ author: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

//User Database
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const testUser = {
  username:'testuser',
  name: 'philio',
  password: 'testpassword',
  token: ''
}

module.exports={
  initialBlogs, nonExistingId, blogsInDb, usersInDb, testUser
}