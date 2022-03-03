const cors = require("cors");
const ApolloServer = require("apollo-server-express").ApolloServer;
const ApolloServerPluginDrainHttpServer =
  require("apollo-server-core").ApolloServerPluginDrainHttpServer;
const express = require("express");
const http = require("http");
const fs = require("fs");

async function startApolloServer() {
  //Fake Data

  const typeDefs = `

    type Desserts {
        id: ID!
        data: Dessert
    }
    type Dessert {
        name: String
        calories: Float
        fat: Float
        carbs: Float
        protein: Float
        bro: String!
        brah: String!
    }
    type Author {
        id: ID!
        info: Person
    }
    type Person {
        name: String!
        age: Int
        gender: String
    }
    type Query {
        getAuthors: [ Author ]
        desserts: [ Desserts ]
    }
    type Mutation {
        deleteDessert(dessertId: [ String ]): [Dessert]

    }
`;

  const resolvers = {
    Query: {
      getAuthors: () => JSON.parse(fs.readFileSync("authors.json", "utf-8")),
      desserts: () => JSON.parse(fs.readFileSync("desserts.json", "utf-8")),
    },
    Mutation: {
      deleteDessert: (prev, args) => {
        const desserts = JSON.parse(fs.readFileSync("desserts.json", "utf-8"));
        const dessertsFound = [];

        desserts.forEach((element) => {
          if (args.dessertId.includes(element.id)) {
            dessertsFound.push(element);
          }
        });

        if (dessertsFound.length === 0) return null;
        const updatedDesserts = desserts.filter(
          (dessert) => !args.dessertId.includes(dessert.id)
        );

        fs.writeFileSync(
          "desserts.json",
          JSON.stringify(updatedDesserts),
          "utf-8"
        );
        return dessertsFound;
      },
    },
    Dessert: {
      bro: (prev) => `${prev.name} bro`,
      brah: (prev) => `miras las calorias bro${prev.calories}`,
    },
  };
  const app = express();
  app.use(cors());
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startApolloServer();
