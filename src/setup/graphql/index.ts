import path from 'path';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const typesArray = loadFilesSync(path.join(__dirname, '../../**/*.typeDef.*'));
export const typeDefs = mergeTypeDefs(typesArray);

const resolversArray = loadFilesSync(path.join(__dirname, '../../**/*.resolvers.*'));
export const resolvers = mergeResolvers(resolversArray);
