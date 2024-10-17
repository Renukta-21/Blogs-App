const totalLikes = (blogList) => {
  if (blogList.length === 0) return 0
  return blogList.reduce((sum, post) => {
    return sum + post.likes
  }, 0)
}

const favoriteBlog = (blogList) => {
  if (blogList.length === 0) return 0
  const favorite = blogList.reduce((prev, current) => {
    return current.likes > prev.likes ? current : prev
  })

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const mostBlogs = (blogList) => {
  if(blogList.length === 0) return null
  const blogCountByAuthor = blogList.reduce((acc, blog) => {
    if (acc[blog.author]) {
      acc[blog.author]++
    } else {
      acc[blog.author] = 1
    }
    return acc
  }, {})

  const authorWithMostBlogs = Object.keys(blogCountByAuthor).reduce(
    (prevAuthor, currentAuthor) => {
      return blogCountByAuthor[currentAuthor] > blogCountByAuthor[prevAuthor]
        ? currentAuthor
        : prevAuthor
    }
  )
  return {
    author: authorWithMostBlogs,
    blogs: blogCountByAuthor[authorWithMostBlogs]
  }

}

const mostLikes = (blogList)=>{
  if(blogList.length === 0) return null
    const likesCountByAuthor = blogList.reduce((acc, current)=>{
      if(acc[current.author]){
        acc[current.author] += current.likes
      }else{
        acc[current.author] = current.likes
      }

      return acc
    },{})

    const authorWithMostLikes = Object.keys(likesCountByAuthor).reduce((prevAuthor, currentAuthor)=>{
      return likesCountByAuthor[currentAuthor]>likesCountByAuthor[prevAuthor] ? currentAuthor : prevAuthor
    })

    return {
      author: authorWithMostLikes,
      likes: likesCountByAuthor[authorWithMostLikes]
    }
}



module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
