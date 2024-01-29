const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)

    if (blogs.length === 0) {return 0}

    return likes.reduce((total, like) => total + like)
}

const favoriteBlog = (blogs) => {
    if (!blogs || blogs.length === 0) {
        return null
    }

    let favorite = blogs[0]

    blogs.forEach(blog => {
        favorite = blog.likes > favorite.likes
            ? blog
            : favorite
    })

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const maximum = (authors) => {
    let max = 0

    Object.values(authors).forEach(num => {
        max = num > max
            ? num
            : max
    })

    let maxAuthor
    Object.keys(authors).forEach(author => {
        maxAuthor = authors[author] === max
            ? author
            : maxAuthor
    })

    return {
        author: maxAuthor,
        maxParam: max
    }
}

const mostBlogs = (blogs) => {
    if (!blogs || blogs.length === 0) {
        return null
    }

    let authors = {}
    blogs.forEach(blog => {
        if (!authors[blog.author]){
            authors[blog.author] = 1
        }
        else {
            authors[blog.author] += 1
        }
    })

    const result = maximum(authors)

    return {
        author: result.author,
        blogs: result.maxParam
    }
}

const mostLikes = (blogs) => {
    if (!blogs || blogs.length === 0) {
        return null
    }
    
    let authors = {}
    blogs.forEach(blog => {
        if (!authors[blog.author]){
            authors[blog.author] = blog.likes
        }
        else {
            authors[blog.author] += blog.likes
        }
    })

    const result = maximum(authors)
    
    return {
        author: result.author,
        likes: result.maxParam
    }
}

const sortByLikes = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
}
  
export default {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    sortByLikes
}