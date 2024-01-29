import listHelper from "../utils/list_helper"


describe('dummy', () => {
    test('dummy returns one', () => {
        const blogs = []
      
        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
})

describe('favorite blog', () => {
    const blogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f9',
          title: 'The Mythical Man-Month',
          author: 'Frederick P. Brooks',
          url: 'https://en.wikipedia.org/wiki/The_Mythical_Man-Month',
          likes: 10,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17fa',
          title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
          author: 'Robert C. Martin',
          url: 'https://www.goodreads.com/book/show/3735293-clean-code',
          likes: 8,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17fb',
          title: 'JavaScript: The Good Parts',
          author: 'Douglas Crockford',
          url: 'https://www.oreilly.com/library/view/javascript-the-good/9780596517748/',
          likes: 7,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17fc',
          title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
          author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
          url: 'https://www.goodreads.com/book/show/8509.Design_Patterns',
          likes: 12,
          __v: 0
        }
    ];

    test('Should be the one with 12 likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({
            title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
            author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
            likes: 12
        })
    })

    test ('null', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toBe(null)
    })
})

describe('most blogs or likes', () => {
    const blogs = [
        { title: 'Blog 1', author: 'Autor A', likes: 8 },
        { title: 'Blog 2', author: 'Autor B', likes: 15 },
        { title: 'Blog 3', author: 'Autor C', likes: 10 },
        { title: 'Blog 4', author: 'Autor A', likes: 5 },
        { title: 'Blog 5', author: 'Autor D', likes: 12 },
        { title: 'Blog 6', author: 'Autor B', likes: 20 },
        { title: 'Blog 7', author: 'Autor C', likes: 7 },
        { title: 'Blog 8', author: 'Autor A', likes: 18 },
        { title: 'Blog 9', author: 'Autor E', likes: 9 },
        { title: 'Blog 10', author: 'Autor A', likes: 25 }
    ]

    test('Most blogs: Author A', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({
            author: 'Autor A',
            blogs: 4
        })
    })

    test('Most likes: Author A', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({
            author: 'Autor A',
            likes: 8 + 5 + 18 + 25
        })
    })

    console.log(listHelper.sortByLikes(blogs))
})