import { Product } from "./product"

export interface User {
    id: string
    userName: string, 
    userPassword: string,
    userEmail: string,
    userRole: string, 
    cart: Product[],

        
}
