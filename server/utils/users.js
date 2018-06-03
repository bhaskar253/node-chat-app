class Users {
  constructor () {
    this.users = [];
  }
  addUser (id,name,room) {
    var user = {id,name,room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    // let userRemoved;
    // this.users = this.users.filter((user)=>{
    //   if(user.id!==id)
    //     return true;
    //   userRemoved = user;
    //   return false;
    // });
    // return userRemoved;
    return this.users.find((user,index) => user.id === id?this.users.splice(index,1):false);
  }
  getUser (id) {
    return this.users.find((user)=>user.id===id);
  }
  getUserList (room) {
    return this.users.reduce((names,user)=>user.room===room && names.push(user.name) && names || names,[]);
  }
}
module.exports = {Users};
