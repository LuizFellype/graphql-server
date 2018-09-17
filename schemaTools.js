const gt = require('graphql-tools')
const axios = require('axios');

const typeDefs = `
    type Customer {
        id: String!
        name: String!
        email: String!
        age: Int
    }
    type Query {
        customer(id: String!): Customer
        customers: [Customer]
    }
    type Mutation {
        addCustomer(name: String!, email: String!, age: Int): Customer
        deleteCustomer(id: String!): Customer
        editCustomer(id: String!
            name: String!
            email: String!
            age: Int!
        ): Customer
    }
`

const resolvers = {
    Query: {
        customer: (_, { id }) => {
            return axios.get('http://localhost:3005/customers/'+ id)
                .then(res => res.data);
        },
        customers: () => {
            return axios.get('http://localhost:3005/customers')
                    .then(res => res.data);
        },
    },
    Mutation: {
        addCustomer: (_, { name, email, age }) => {
            return axios.post('http://localhost:3005/customers', {
                    name, email,age 
                }).then(res => res.data);
        },
        deleteCustomer: (_, { id }) => {
            return axios.delete('http://localhost:3005/customers/'+id)
                .then(res => res.data);
        },
        editCustomer: (_, args) => {
            return axios.patch('http://localhost:3005/customers/'+args.id, args)
                .then(res => res.data);
        }
    },
};

module.exports = gt.makeExecutableSchema({
    typeDefs,
    resolvers,
  });
