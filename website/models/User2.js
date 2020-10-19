const mongoose =  require("mongoose");
const Schema = mongoose.Schema;

const dbUser = require("../dbmodels/User");

var users = [];

module.exports = class User {
    constructor(
      name,
      email,
      admin,
      shoppingCart,
      pastPurchases,
      psw
      
    ) {
        this.name;
      this.email;
      this.admin;
      this.shoppingCart;
      this.pastPurchases;
      this.psw;
      
    }
  
    //Gets movies from db and stores details locally
    static async loadDB() {
      try {
        console.log("Loading DB...");
        const dbusers = await dbUser.find();
        dbusers.forEach(function (user) {
          var newUser = new User(
            user.name,
            user.email,
            user.admin,
            user.shoppingCart,
            user.pastPurchases,
            user.psw
          );
          newUser.add();
          console.log("Added: " + newUser.title);
        });
        console.log("Finished loading DB");
      } catch (err) {
        console.log(err);
      }
    }
  
    //Adds movie to list of movies locally
    add() {
      users.push(this);
    }
  
    //Searchs for a user locally by id
    static search(id) {
      var foundUser = null;
      users.forEach(function (user) {
        if (user.id == id) {
          foundUser = user;
        }
      });
      return foundUser;
    }
  
    //Gets all movies in local list
    static all() {
      return users;
    }
  
    //Gets all movies in local list, sorted alphabetically
    // static allByTitle() {
    //   return users.sort(function (a, b) {
    //     if (a.title < b.title) {
    //       return -1;
    //     }
    //     if (a.title > b.title) {
    //       return 1;
    //     }
    //     return 0;
    //   });
    // }
  
    // static getLatest() {
    //   return movies[movies.length - 1];
    // }
  
    // order() {
    //   movies.sort();
    // }
  
    // static delete(id) {
    //   const toDelete = this.search(id);
    //   var i = 0;
    //   while (i < movies.length) {
    //     if (movies[i] == toDelete) {
    //       movies.splice(i, 1);
    //     } else {
    //       i = i + 1;
    //     }
    //   }
    // }
  };
  