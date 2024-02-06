import { enc, HmacSHA256 } from 'crypto-js';
import { round } from 'lodash-es';
export function getJWT() {
  const base64UrlEncode = (str: CryptoJS.lib.WordArray) => enc.Base64.stringify(str).replace(/=+$/, '').replace(/\+/g, '-').replace(new RegExp('/', 'g'), '_');
  const before_sign = base64UrlEncode(enc.Utf8.parse(JSON.stringify({
    "alg": "HS256",
    "typ": "JWT"
  }))) + '.' + base64UrlEncode(enc.Utf8.parse(JSON.stringify({
    date: round((new Date()).getUTCDay() + 114514 - 1919810),
    iss: 'wenxig',
    exp: 'none'
  })));
  return `${before_sign}.${base64UrlEncode(HmacSHA256(before_sign, "afspw$&^%*(eauifbu4[b98b3gq9bg94ubgijqb4u9wfqb@#$%^&*()gu4ibgb]qebj(kfbgfwq&(^&*^ejkf{bgiuq894b}guibueiqbw)9fdkbvxclbnljabpb"))}`
}