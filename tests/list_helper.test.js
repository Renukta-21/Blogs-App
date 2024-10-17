const { test, describe } = require('node:test')
const assert = require('node:assert')
const list_helper = require('../utils/list_helper')

const listWithMoreBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 23,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Going to be a Fullstack Dev',
    author: 'Daniel Martinez',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 30,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Going to be a Fullstack Dev',
    author: 'Daniel Martinez',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 30,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'On the road to get a great bike',
    author: 'Pablo Ceron',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 45,
    __v: 0,
  },
]
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0,
  },
]

describe('Total likes', () => {
  test('of an empty array is zero', () => {
    assert.strictEqual(list_helper.totalLikes([]), 0)
  })

  test('When list has only one blog equals the like of that', () => {
    assert.strictEqual(list_helper.totalLikes(listWithOneBlog), 5)
  })

  test('of a bigger list is calculated right', () => {
    assert.strictEqual(list_helper.totalLikes(listWithMoreBlogs), 128)
  })
})

describe('Favorite blog', () => {
  test('of an empty list is zero', () => {
    assert.strictEqual(list_helper.favoriteBlog([]), 0)
  })

  test('of list of blogs has biggest likes', () => {
    assert.deepStrictEqual(list_helper.favoriteBlog(listWithMoreBlogs), {
      title: 'On the road to get a great bike',
      author: 'Pablo Ceron',
      likes: 45,
    })
  })
})

describe('Most blogs author',()=>{
  test('with empty array', ()=>{
    assert.strictEqual(list_helper.mostBlogs([]), null)
  })
  test('of list of blogs', ()=>{
    assert.deepStrictEqual(list_helper.mostBlogs(listWithMoreBlogs), {
      author: 'Daniel Martinez',
      blogs:2
    })
  })
})

describe('Author with most likes', ()=>{
  test('with an empty array', ()=>{
    assert.strictEqual(list_helper.mostLikes([]), null)
  })

  test('with an list of authors', ()=>{
    assert.deepStrictEqual(list_helper.mostLikes(listWithMoreBlogs), {
      author: 'Daniel Martinez',
      likes: 60
    })
  })
})
