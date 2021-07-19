import Cookies from 'js-cookie'
import { tokenCookieKey } from '../store/variables'

const tokenKey = 'V3-Admin-Token'

export const getToken = (): string | null => {
    return localStorage.getItem(tokenKey)
}

export const setToken = (token: string): void => {
    Cookies.set(tokenCookieKey, token)
    return localStorage.setItem(tokenKey, token)
}

export const removeToken = (): void => {
    Cookies.remove(tokenCookieKey)
    return localStorage.removeItem(tokenKey)
}
