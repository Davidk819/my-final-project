export const typeDefs = `

type User {
    name: String
    password: String
}

type Query{
    david: Int
}
type Mutation {
    sinUp(name: String! password: String!): User
  }

schema {
    query:Query
    mutation: Mutation
} 
`
