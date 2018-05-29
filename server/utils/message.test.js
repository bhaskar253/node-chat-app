var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message')

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

describe('generateLocationMessage',()=>{
  it('should generate correct location object',()=>{
    var lat = 1.514355;
    var lng =  103.872770;
    var from = 'Bhaskar';
    var url = 'https://www.google.com/maps?q=1.514355,103.872770'

    var res = generateLocationMessage(from,lat,lng);

    expect(res).toMatchObject({from,url});
    expect(typeof res.createdAt).toBe('number');
  });
});
