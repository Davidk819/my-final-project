import { sinUpC } from "../controlers/usersControlers";

const array1: string[] = [];
export const resolvers = {
  Query: {
    david: async () => {
      let rand = Math.floor(Math.random() * 10) + 1;

      return rand;
    },
  },
  Mutation: {
    sinUp: async (a: any, args: any) => {
        sinUpC(args)
        const b = {
            name: args.name,
            password: args.password
        }
        return args
        
    },
  },
};
