const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', ()=>{
  it('should generate correct message object', ()=> {
    const from = 'Jen';
    const text = 'some';
    const message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({                 //this was .toInclude
      from,
      text
    })
  })
})