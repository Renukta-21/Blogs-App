const reverse = (string) => {
  return string.split('').reverse().join('')
}

const average = (array) => {
  if(array.length){
    return array.reduce((sum, item) => sum + item, 0) / array.length
  }else{
    return 0
  }
}

module.exports = {
  reverse,
  average,
}
