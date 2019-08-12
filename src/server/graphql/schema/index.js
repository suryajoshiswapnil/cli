import {
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLError,
  GraphQLObjectType
} from "graphql";

const schema = `
  type User {
    _id: String
    name: String
    email: String
    password: String
  }

  type Query {
    user(id: String): User
  }
`;

const UserFiels = {
  name: { type: GraphQLString },
  email: { type: GraphQLString },
  password: { type: GraphQLString }
};

const UserType = new GraphQLObjectType({
  name: "User",
  fields: { _id: { type: GraphQLID }, ...UserFiels }
});

const UserMutationResponse = new GraphQLObjectType({
  name: "UserMutationResponse",
  fields: { message: { type: GraphQLString }, user: { type: UserType } }
});

const QueryType = new GraphQLObjectType({
  name: "UserQuery",
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (db, { id }) => {
        const user = db.users.find(user => user._id === id);
        if (user) return user;

        throw new GraphQLError("User not found.");
      }
    }
  }
});

const QueryMutation = new GraphQLObjectType({
  name: "QueryMutation",
  fields: {
    addUser: {
      type: UserMutationResponse,
      args: UserFiels,
      resolve: (db, userData) => {
        const user = db.addUser(userData);
        if (user) {
          return { message: "User creation is successful.", user };
        }

        throw new GraphQLError("User not found.");
      }
    },
    deleteUser: {
      type: UserMutationResponse,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (db, { id }) => {
        const user = db.deleteUser(id);
        if (user) {
          return { message: "User delete is successful.", user };
        }

        throw new GraphQLError("User not found.");
      }
    },
    updateUser: {
      type: UserMutationResponse,
      args: {
        id: { type: GraphQLString },
        ...UserFiels
      },
      resolve: (db, { id, ...data }) => {
        const user = db.updateUser(id, data);
        if (user) {
          return { message: "User update is successful.", user };
        }

        throw new GraphQLError("User not found.");
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: QueryType,
  mutation: QueryMutation
});

export default Schema;
