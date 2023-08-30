import client from "../client"
import bcrypt from "bcrypt"

export default {
    Mutation: {
        createAccount: async (
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
        ) => {
            const existingUser = await client.user.findFirst({
                where: {
                    OR: [
                        {
                            username,
                        },
                        {
                            email,
                        },
                    ],
                },
            })
            if (existingUser) {
                throw new Error("This username/password is already taken.")
            }

            const uglypassword = await bcrypt.hash(password, 10)
            return client.user.create({
                data: {
                    username,
                    email,
                    name,
                    location,
                    password: uglypassword,
                    avatarURL,
                    githubUsername,
                },
            })
        },
    },
}
