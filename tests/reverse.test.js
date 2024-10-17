const { test, describe } = require('node:test')
const assert = require('node:assert')

const reverse = require('../utils/for_testing').reverse

describe('Reverse', ()=>{
    test('of a ', () => {
        const result = reverse('a')
        assert.strictEqual(result, 'a')
      })
      test('of React', () => {
        const result = reverse('React')
        assert.strictEqual(result, 'tcaeR')
      })
      test('of saippuakauppias', () => {
        const result = reverse('saippuakauppias')
      
        assert.strictEqual(result, 'saippuakauppias')
      })
      
})