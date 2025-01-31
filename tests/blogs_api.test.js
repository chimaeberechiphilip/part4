const { test, after, beforeEach, describe }=require("node:test")
const assert = require("node:assert")
const supertest= require("supertest")
const mongoose= require("mongoose")
const helper= require("./test_helper")
const app= require("../app")
const api = supertest(app)

const Blog= require("../models/blog_model")
const User= require("../models/user_model")
const jwt = require('jsonwebtoken');

describe('when there are some blogs saved initially', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json and check posted', async () => {
    // Fetch an existing user
    const usersAtStart = await helper.usersInDb();
    const user = usersAtStart[0];
  
    if (!user) {
      throw new Error('No users found in the database!');
    }
  
    // Generate a valid token
    const token = jwt.sign({ username: user.username, id: user._id.toString() }, process.env.SECRET);
  
    // Send GET request with Authorization header
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`) // Add token
      .expect(200)
      .expect('Content-Type', /application\/json/);
  
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

test('unique identifier property of blogs is named id', async () => {
  const response = await api
    .get('/api/blogs') 
    .expect(200)
    .expect('Content-Type', /application\/json/);

    for (const blog of response.body) {
      if (!blog.id) {
        throw new Error('Blog does not have id property');
      }
      if (blog._id) {
        throw new Error('Blog exposes _id property');
      }
    }
  });


// test('a valid blog can be added ', async () => {
  
//   const newBlog = {
//     title: 'React patterns',
//     author: 'Michael Chan',
//     url: 'www.reactpatterns.com',
//     likes: 7,
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(401)
//     .expect('Content-Type', /application\/json/)

//     const blogsAtEnd = await helper.blogsInDb()
//     assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

//     const titles = blogsAtEnd.map(n => n.title)
//     assert(titles.includes('React patterns'))
  
// })

test('a valid blog can be added', async () => {
  // Create a valid token for an existing user
  const usersAtStart = await helper.usersInDb();
  const user = usersAtStart[0];
  const token = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET);

  const newBlog = {
    title: 'A new blog',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5,
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`) // Add token here
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length+1)
      
    const titles = blogsAtEnd.map(n => n.title)
    assert(titles.includes('React patterns'))
});


test('blog without like is not added', async () => {
  const newBlog = {
    title: 'Test Blog Without Likes',
    author: 'Jane Doe',
    url: 'http://example.com/test-blog',
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const savedBlog = response.body;
  assert.strictEqual(savedBlog.likes, 0); // Verify that likes is 0 by default
})

test('Verify that if the title or url properties are missing', async () => {
  const newBlog = {
    author: 'Jane Doe',
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  //const savedBlog = response.body;
  //assert.strictEqual(savedBlog.likes, 0); // Verify that likes is 0 by default
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    
    const blogAtStart = await helper.blogsInDb()
    const blogToDelete = blogAtStart[0]
    
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(r => r.title)
    assert(!titles.includes(blogToDelete.title))
  })
})

describe('Update of a blog', () => {
  test('succeeds with status code 204 if it is valid', async () => {
    
    const blogAtStart = await helper.blogsInDb()
    const blogToUpdte = blogAtStart[0]

    const updateBlog = {
      likes: 24,
    };
    
    const response=await api
      .put(`/api/blogs/${blogToUpdte.id}`)
      .send(updateBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const justUpdatedlike=response.body.likes
    assert.strictEqual(justUpdatedlike, 24)
    
  })
})

})



after(async () => {
  await mongoose.connection.close()
})
