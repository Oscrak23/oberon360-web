import * as jose from 'jose'
import { VITE_JWT_SECRET } from './config'
export const verifyJWT = async (token: string) => {
    try {
        const secret = new TextEncoder().encode(VITE_JWT_SECRET)
        const { payload } = await jose.jwtVerify(token, secret)
        return payload
    } catch (error) {
        return false
    }
}