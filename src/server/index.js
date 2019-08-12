import express from "express";
import GraphQLMiddleWare from "./graphql";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GraphQL
app.use("/graphql", GraphQLMiddleWare);

export default app;
