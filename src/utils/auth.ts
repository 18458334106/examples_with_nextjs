import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token:string) {
  let endTimeStr = new Date().getTime() + 30 * 60 * 1000
  let expires = new Date(endTimeStr)
  return Cookies.set(TokenKey, token, { expires: expires })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}