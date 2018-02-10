const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  it('should add new user', () => {
    var users = new Users();
    const user = {
      id: '123',
      name: 'gerson',
      room: 'Overwatch fans'
    };
    const resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });
});
