import { ApolloServer, gql } from 'apollo-server-micro';
import axios from 'axios';

// Construct a schema using GraphQL schema language
const typeDefs = gql`
  type Launch {
    id: String
    flight_number: Int
    name: String
    date_local: String
    upcoming: Boolean
    success: Boolean
    rocket: String
    details: String
  }

  type Rocket {
    id: String
    name: String
    first_flight: String
    active: Boolean 
    type: String
    description: String 
  }

  type Query {
    launches: [Launch]
    rocket(id: String!): Rocket!

  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
   launches: async () => {
      return await axios
        .get('https://api.spacexdata.com/v4/launches')
        .then(res => res.data);   
   },
    rocket: async (_, args) => {
      return await axios
        .get(`https://api.spacexdata.com/v4/rockets/${args.id}`)
        .then(res => res.data);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

export default server.createHandler({
  path: '/api/graphql',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

