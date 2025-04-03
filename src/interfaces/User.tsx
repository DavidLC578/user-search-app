export interface User {
    username: string
    email: string
    phone: string
    picture: string
}

export interface ApiUser {
    login: {
        username: string
    }
    email: string
    phone: string
    picture: {
        medium: string
    }
}