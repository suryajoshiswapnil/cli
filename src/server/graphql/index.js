import GraphQLHTTP from "express-graphql";
import GraphQLSchema from "./schema";

const fakeDB = {
  users: [
    {
      _id: "1",
      name: "swapnil",
      email: "swap@gmail.com",
      password: "swap123"
    },
    {
      _id: "2",
      name: "Dr Strange",
      email: "strange@hotmail.com",
      password: "mrstrange"
    },
    {
      _id: "3",
      name: "Tony Stark",
      email: "tony@stark.com",
      password: "ironman"
    },
    {
      _id: "4",
      name: "Thor",
      email: "thunder@god.com",
      password: "thor123"
    },
    {
      _id: "5",
      name: "Rakesh Singh",
      email: "rakesh@singh.com",
      password: "rakeshsingh"
    },
    {
      _id: "6",
      name: "Ebony Mau",
      email: "magician@thanos.com",
      password: "ebonymau"
    }
  ],
  usersCount: 6,
  updateUser(id, data) {
    let found = null;
    this.users = this.users.map(user => {
      if (user._id === id) {
        found = { ...user, ...data };
        return found;
      }
      return user;
    });
    return found;
  },
  deleteUser(id) {
    let found = null;
    this.users = this.users.filter(user => {
      if (user._id === id) {
        found = user;
        return false;
      }
      return true;
    });

    return found;
  },
  addUser(data) {
    const count = this.usersCount + 1;
    const newUser = {
      _id: count.toString(),
      name: data.name,
      email: data.email,
      password: data.password
    };
    this.users.push(newUser);

    return newUser;
  },

  messages: []
};
const GraphQLMiddleWare = GraphQLHTTP({
  schema: GraphQLSchema,
  rootValue: fakeDB,
  customFormatErrorFn: err => {
    const { path, message } = err;

    return {
      path: path ? path.join(".") : "",
      message
    };
  },
  graphiql: true
});

export default GraphQLMiddleWare;
