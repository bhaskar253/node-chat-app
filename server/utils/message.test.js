var expect = require('expect');

var {generateMessage} = require('./message')

describe('generateMessage',()=>{
  it('should generate correct Message',()=>{
    var from = 'Bhaskar';
    var text = 'This is a sample test';
    var res = generateMessage(from,text);

    expect(res).toMatchObject({from,text});
    // expect(res.from).toBe(from);
    // expect(res.text).toBe(text);
    expect(typeof res.createdAt).toBe('number');
  });
});
