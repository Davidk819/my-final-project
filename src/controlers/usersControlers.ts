import { newUser } from "../configoratin/postgresQL"


export const sinUpC = async (args: any) => {
    const { name, password } = args
    const data = await newUser(name, password)
}