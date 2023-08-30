import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { PrismaClient } from "@prisma/client"

const client = new PrismaClient()

const typeDefs = `#graphql

    type User{
        id: Int
        username: String
        email: String
        name: String
        location: String
        password: String
        avatarURL: String
        githubUsername: String
    }
    type Query {
        users: [User]
        user: User
    }

    type Mutation {
        createAccount(username: String!, email: String!, name: String, location: String, password: String!, avatarURL: String, githubUsername: String): User
        }
`

const resolvers = {
    Query: {
        users: () => client.user.findMany(),
        user: (_, { id }) => client.user.findUnique({ where: { id } }),
    },

    Mutation: {
        createAccount: (
            _,
            {
                username,
                email,
                name,
                location,
                password,
                avatarURL,
                githubUsername,
            }
        ) =>
            client.user.create({
                data: {
                    username,
                    email,
                    name,
                    location,
                    password,
                    avatarURL,
                    githubUsername,
                },
            }),
    },
}

const server = new ApolloServer({ typeDefs, resolvers })

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
})

console.log(`🚀  Server ready at: ${url}`)
