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
    // return user that was removed
  }
  getUser(id) {}

  getUserList(room) {
    // just retruning an array of strings
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
