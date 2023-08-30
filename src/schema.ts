import { makeExecutableSchema } from "@graphql-tools/schema"
import { loadFilesSync } from "@graphql-tools/load-files"
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge"

import path from "path"
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`)

const loadedResolvers = loadFilesSync(
    `${__dirname}/**/*.{queries,mutations}.ts`
)

const typeDefs = mergeTypeDefs(loadedTypes)
const resolvers = mergeResolvers(loadedResolvers)

const schema = makeExecutableSchema({ typeDefs, resolvers })

export default schema
