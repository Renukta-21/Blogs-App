const totalLikes = (blogList)=>{
    if(blogList.length===0)return 0
    return blogList.reduce((sum, post)=>{
        return sum + post.likes
      },0)
  }

  const favoriteBlog = (blogList)=>{
    if(blogList.length===0) return 0
    const favorite = blogList.reduce((prev, current)=>{
        return current.likes> prev.likes ? current : prev
    })

    return {
        title:favorite.title,
        author:favorite.author,
        likes: favorite.likes
    }
  }
module.exports = {
    totalLikes, favoriteBlog
}