const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')



test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, null)
})

describe('totalLikes', () => {
  test('of empty list is zero', () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 0); // Total likes of an empty list should be 0
  });

  test('when list has only one blog, equals the likes of that blog', () => {
    const blogs = [
      {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
      },
    ];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 7); // Total likes should equal the likes of the single blog
  });

  test('of a bigger list is calculated right', () => {
    const blogs = [
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
      },
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
      },
    ];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 24); // Total likes should be 7 + 5 + 12 = 24
  });
});

describe('favoriteBlog', () => {

  test('of empty list is zero', () => {
    const blogs = [];
    const result = listHelper.favoriteBlog(blogs);
    assert.strictEqual(result, null); // Empty list should return null
  });

  test('when list has only one blog, it is the favorite', () => {
    const blogs = [
      {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
      },
    ];
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7,
    }); // Single blog should return its details in the specified format
  });
  
test('of a bigger list is determined correctly', () => {
  const blogs = [
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
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    },
  ];
  const result = listHelper.favoriteBlog(blogs);
  assert.deepStrictEqual(result, {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12,
  }); // Blog with 12 likes should be returned in the specified format
});
});


describe('mostBlogs', () => {
  test('of empty list is zero', () => {
    const blogs = [];
    const result = listHelper.mostBlogs(blogs);
    assert.strictEqual(result, null); // Empty list should return null
  });

  test('when list has only one blog, that author is the top', () => {
    const blogs = [
      {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
      },
    ];
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, {
      author: 'Michael Chan',
      blogs: 1,
    }); // Single blog author should be the top
  });

  test('of a bigger list is calculated correctly', () => {
    const blogs = [
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
      },
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
      },
      {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
      },
      {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TDD-Harms-Architecture.html',
        likes: 0,
      },
      {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
      },
    ];
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 3,
    }); // Robert C. Martin has the most blogs (3)
  });
});

describe('mostLikes', () => {
  test('of empty list is zero', () => {
    const blogs = [];
    const result = listHelper.mostLikes(blogs);
    assert.strictEqual(result, null); // Empty list should return null
  });

  test('when list has only one Most like, that author is the top', () => {
    const blogs = [
      {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
      },
    ];
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, {
      author: "Michael Chan",
      likes: 7
    });  // Single likes author should be the top
  });

  test('of a bigger list is calculated correctly', () => {
    const blogs = [
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
      },
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
      },
      {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
      },
      {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TDD-Harms-Architecture.html',
        likes: 0,
      },
      {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
      },
    ];
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17
    }); // Robert C. Martin has the most blogs (3)
  });
});
