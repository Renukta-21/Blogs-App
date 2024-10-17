const {test, describe} = require('node:test')
const assert = require('node:assert')

const average = require('../utils/for_testing').average

describe('Average', ()=>{
    test('of many: ',()=>{
        const result = average([1, 2, 3, 4, 5, 6])
        assert.strictEqual(result, 3.5)
    })
    test('of empty array', ()=>{
        const result = average([])
        assert.strictEqual(result, 0)
    })
})