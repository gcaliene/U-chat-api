//addUser(id,name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    const user = this.getUser(id);
    if (user) {
      this.users = this.users.filter(user => user.id !== id);
    }
    // if there was no user, that is fine the statement will continue to run
    return user;
    // return user that was removed
  }

  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }

  getUserList(room) {
    const users = this.users.filter(user => {
      //this will get an array of objects, map will get you the array of strings
      //filter takes a function as an argument,
      return user.room === room;
      //if equal then its true and will be returned and added to the list above
    });
    const namesArray = users.map(user => user.name);
    return namesArray;
  }
}
module.exports = { Users };

// //ES6 classes
// class Person {
//   constructor(name, age) {
//     // console.log(name, age);
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription() {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }
//
// let me = new Person('Andrew', 25);
// // console.log('this.name', me.name);
// // console.log('this.age', me.age);
// let description = me.getUserDescription();
// console.log(description);
// // End of ES6 classes

// Old way to do it
// var users =[]
// var adduser = (id , name , room) => {
//   users.push({})
// }
//
