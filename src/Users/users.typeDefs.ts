import gql from "graphql-tag"

export default gql`
    type User {
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
        createAccount(
            username: String!
            email: String!
            name: String
            location: String
            password: String!
            avatarURL: String
            githubUsername: String
        ): User
    }
`
