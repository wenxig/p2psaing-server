import { toString } from 'lodash-es';
import { TypeOf } from 'zod';
import * as db from './db';
import * as typeCheck from './type';
import { getJWT } from './jwt';
addEventListener('fetch', event => event.respondWith(handleRequest(event)));
const jwtToken = getJWT()
function encryptBykaisa(str: string, iv: number) {
  let outStr = "";
  for (let i = 0; i < str.length; i++)if (str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90) outStr += String.fromCharCode((str.charCodeAt(i) - 65 + iv + 26) % 26 + 65)
  else if (str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122) outStr += String.fromCharCode((str.charCodeAt(i) - 97 + iv + 26) % 26 + 97)
  else outStr += String.fromCharCode(str.charCodeAt(i));
  return outStr;
}
async function handleRequest({ request }: FetchEvent) {
  const data: TypeOf<(typeof typeCheck.baseRType)[number]> = await request.json()
  const isRequest = typeCheck.baseRType.some(r => r.safeParse(data).success)
  if (!isRequest) return new Response('request format error');
  if (data.method == 'getJWT') return new Response(jwtToken);
  for (const headers of request.headers.entries()) if (/jwt/ig.test(headers[0])) {
    var headerJwt = headers[1]
    break
  } else if (/authorization/ig.test(headers[0])) {
    var updataType = headers[1]
  }
  const json = {
    headers: { 'Content-Type': 'application/json' },
  }
  if (headerJwt! != jwtToken) return new Response('jwt error');
  //不能提取函数 不能sw
  if (data.method == 'getUser_uid') return new Response(JSON.stringify(await db.searchByUid(request, data.data)), json);
  if (data.method == 'getUser_email') return new Response(JSON.stringify(await db.searchByEmail(request, data.data)), json);
  if (data.method == 'getSerectUser') {
    const user = await db.get(request, data.data)
    if (!user[1]) return new Response('user not found');
    return new Response(encryptBykaisa(JSON.stringify(user), 10));
  }
  if (data.method == 'getAddAddress') return new Response(JSON.stringify((await db.getStore(request, data.data, 'addAddress') ?? [])), json);
  if (data.method == 'getTime_uid') return new Response((await db.getTimeByUid(request, data.data)).toString());
  if (data.method == 'getTime_email') return new Response((await db.getTimeByEmail(request, data.data)).toString());
  if (data.method == 'count') return new Response(toString(await db.count(request)));
  if (data.method == 'updateUser') {
    const { data: user } = data
    await db.api({
      data: {
        tag: user.pid,
        value: user,
        action: 'update'
      }
    }, request)
    await db.api({
      data: {
        tag: `${user.uid}.value`,
        value: typeCheck.webSaveRule.parse(user),
        action: 'update'
      }
    }, request)
    await db.api({
      data: {
        tag: `${user.email}.value`,
        value: typeCheck.webSaveRule.parse(user),
        action: 'update'
      }
    }, request)
    const time = new Date().getTime()
    await db.api({
      tag: `${user.uid}.time`,
      value: time,
      action: 'update'
    }, request)
    await db.api({
      tag: `${user.email}.time`,
      value: time,
      action: 'update'
    }, request)

    return new Response(JSON.stringify({ time }), { headers: { 'Content-Type': 'application/json' } });
  }
  if (data.method == 'addAddress') return new Response(toString(await db.setStore(request, data.data.to, 'addAddress', JSON.stringify((<User.WebDbSave[]>await db.getStore(request, data.data.to, 'addAddress')).push(data.data.from)))), json);
  if (data.method == 'updateFile') {
    const h = new Headers(request.headers)
    if (updataType! && updataType == 'smms') {
      h.set('Authorization', 'bipd73BhOqJYyPnMr8e5kA64jtWREomu')
      return new Response(await (await fetch('https://sm.ms/api/v2' + data.path, {
        headers: h,
      })).text(), json)
    }
    if (updataType! && updataType == 'github') {
      h.set('Authorization', 'token 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')
      return new Response(await (await fetch('https://api.github.com/repos/wenxig/p2psaing-app-db' + data.path, {
        headers: h,
      })).text(), json)
    }
  }
  return new Response('method error');
}