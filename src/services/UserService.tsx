import axios from "axios"
import { User, ApiUser } from "../interfaces/User"

export const getUsers = async (): Promise<User[]> => {
    const response = await axios.get("https://randomuser.me/api/?results=10")
    return response.data.results.map((apiUser: ApiUser): User => ({
        username: apiUser.login.username,
        email: apiUser.email,
        phone: apiUser.phone,
        picture: apiUser.picture.medium
    }))
}