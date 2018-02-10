const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'Mike',
        room: 'Node Course'
      },
      {
        id: '2',
        name: 'Jen',
        room: 'react Course'
      },
      {
        id: '3',
        name: 'gerson',
        room: 'Node Course'
      }
    ];
  });

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
