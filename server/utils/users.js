//addUser(id,name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

//ES6 classes
class Person {
  constructor(name, age) {
    // console.log(name, age);
    this.name = name;
    this.age = age;
  }
  getUserDescription() {
    return `${this.name} is ${this.age} year(s) old.`;
  }
}

let me = new Person('Andrew', 25);
// console.log('this.name', me.name);
// console.log('this.age', me.age);
let description = me.getUserDescription();
console.log(description);

// Old way to do it
// var users =[]
// var adduser = (id , name , room) => {
//   users.push({})
// }
//
// modules.export = { addUsers}
