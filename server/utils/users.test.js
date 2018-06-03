const expect = require('expect');

var {Users} = require('./users');

describe('Users', ()=>{
  var users;
  beforeEach(()=>{
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    },{
      id: '2',
      name: 'Jenny',
      room: 'React Course'
    },{
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }]
  });
  it('should add new user', ()=>{
    var users = new Users();
    var user = {
      id: '123',
      name: 'Abc',
      room: 'The Noders'
    };
    var resUser = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  });
  it('should remove a user',()=>{
    var user = users.removeUser('1');
    expect(user.id).toBe('1');
    expect(users.users.length).toBe(2);
  });
  it('should not remove user',()=>{
    var user = users.removeUser('5');
    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });
  it('should find user',()=>{
    var user = users.getUser('2');
    expect(user.id).toBe('2');
  });
  it('should not find user',()=>{
    var user = users.getUser('-2');
    expect(user).toBeFalsy();
  });
  it('should return names for node course', ()=>{
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike','Julie']);
  });
  it('should return names for react course', ()=>{
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jenny']);
  });
});
