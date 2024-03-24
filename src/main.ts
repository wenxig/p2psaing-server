import { Hono, type Context } from 'hono'
import { sign, verify } from 'hono/jwt'
import { ResponseType, createError, createSuccess, isType } from './res';
import { z } from 'zod';
import * as dataType from './type';
import * as db from './db';
import { store } from "./store";
import { forEach, isEmpty, remove, toNumber } from 'lodash-es';
import type { StatusCode } from 'hono/utils/http-status';
import type { BlankInput } from 'hono/types';
namespace jwt {
  export const payload = {
    sub: 'p2psaing',
    role: 'wenxig',
    alg: 'HS512'
  } as const
  export const secret = 'vhbuioy78a32et6r7drtxfcyutfdresxyrtuyfdresxdfcgtyfui7uihfip239u0hjfaf2hf89h29fniune2iuf'
  export let value = ''

}
jwt.value = await sign(jwt.payload, jwt.secret, jwt.payload.alg)
/* Cloudflare绑定 */
type Bindings = {};
/* Hono变量 */
type Variables = {};
type ContextEnv = { Bindings: Bindings; Variables: Variables };
const app = new Hono<ContextEnv>()
app.get('/jwt', c => createSuccess(c, jwt.value))
app.use('/user/*', async (c, n) => {
  const header = store.header = c.req.header()
  const authorization = z.string().safeParse(header.authorization)
  if (authorization.success && await verify(authorization.data, jwt.secret, 'HS512')) return n()
  return createError(c, '认证错误', ResponseType.FailCode.unauthorization, 401)
})
async function handleGetUser(c: Context<ContextEnv, "/user", BlankInput>) {
  store.header = c.req.header()
  const body = await c.req.json()
  if (isType(body, dataType.getUser)) {
    try {
      switch (body.type) {
        case "uid": {
          return createSuccess(c, await db.searchByUid(body.uid))
        }
        case "email": {
          return createSuccess(c, await db.searchByEmail(body.email))
        }
        case "pid": {
          return createSuccess(c, await db.get(body.pid))
        }
      }
    } catch (error) {
      return createError(c, error, ResponseType.FailCode.server, 500)
    }
  }
  return createError(c, '消息格式错误', ResponseType.FailCode.format, 406)
}

app.post('/user', handleGetUser).put(async c => {
  store.header = c.req.header()
  const body: User.WebDbSaveDeep = await c.req.json()
  if (!isType(body, dataType.webSaveDeepRule)) return createError(c, '消息格式错误', ResponseType.FailCode.format, 200)
  try {
    await db.api({
      tag: body.pid,
      value: body,
      action: 'update'
    })
    await db.api({
      tag: `${body.uid}.value`,
      value: dataType.webSaveRule.parse(body),
      action: 'update'
    })
    await db.api({
      tag: `${body.email}.value`,
      value: dataType.webSaveRule.parse(body),
      action: 'update'
    })
    const time = new Date().getTime()
    await db.api({
      tag: `${body.uid}.time`,
      value: time,
      action: 'update'
    })
    await db.api({
      tag: `${body.email}.time`,
      value: time,
      action: 'update'
    })
    return createSuccess(c, time)
  } catch (error) {
    console.error(error);
    return createError(c, error, ResponseType.FailCode.server, 500)
  }
})

app.post('/user/has', async c => {
  const _res = await handleGetUser(c)
  const res: ResponseType.Fail | ResponseType.Success = await _res.json()
  if (res.code == ResponseType.Code.success) return createSuccess(c, !isEmpty(res.data))
  return c.json(res, _res.status as StatusCode)
})

const handleDelAddListUser = async (c: Context) => {
  store.header = c.req.header()
  const body = await c.req.json()
  if (isType(body, dataType.getAddress)) {
    try {
      if (body.type == 'uid') {
        var val: dataType.Link = await db.getStore(body.uid, `add.address`)
        remove(val.chat, { uid: toNumber(body.uid) })
        await db.setStore(body.uid, `add.address`, JSON.stringify(val))
      }
      else {
        var val: dataType.Link = await db.getStore(body.email, `add.address`)
        remove(val.chat, { email: body.email })
        await db.setStore(body.email, `add.address`, JSON.stringify(val))
      }
      return createSuccess(c,val)
    } catch (error) {
      return createError(c, error, ResponseType.FailCode.server, 500)
    }
  }
  return createError(c, '消息格式错误', ResponseType.FailCode.format, 406)
}
app.post('/user/address/add-list', async c => {
  store.header = c.req.header()
  const body = await c.req.json()
  if (isType(body, dataType.getAddress)) {
    try {
      if (body.type == 'uid') return createSuccess(c, await db.getStore(body.uid, `add.address`) || {
        group: [],
        chat: [],
      })
      else return createSuccess(c, await db.getStore(body.email, `add.address`) || {
        group: [],
        chat: [],
      })
    } catch (error) {
      return createError(c, error, ResponseType.FailCode.server, 500)
    }
  }
  return createError(c, '消息格式错误', ResponseType.FailCode.format, 406)
}).patch(async c => {
  store.header = c.req.header()
  const body = await c.req.json()
  if (isType(body, dataType.addAddress)) {
    try {
      if ((!await db.get(body.pid)) || !(body.type == 'email' ? !await db.searchByEmail(body.email) : await db.searchByUid(body.uid))) return createError(c, '用户不存在', ResponseType.FailCode.notFound, 404)
      const v: dataType.Link = JSON.parse(await db.getStore((<any>body).uid || (<any>body).email, `add.address`) || JSON.stringify({
        group: [],
        chat: [],
      }))
      const u = await db.searchByUid(body.is)
      v.chat.push(u)
      if (body.type == 'uid') await db.setStore(body.uid, `add.address`, JSON.stringify(v))
      else await db.setStore(body.email, `add.address`, JSON.stringify(v))
      return createSuccess(c, v)
    } catch (error) {
      return createError(c, error, ResponseType.FailCode.server, 500)
    }
  }
  return createError(c, '消息格式错误', ResponseType.FailCode.format, 406)
}).delete(handleDelAddListUser)

app.post('/user/address', async c => {
  store.header = c.req.header()
  const body = await c.req.json()
  if (isType(body, dataType.getAddress)) {
    try {
      if (body.type == 'uid') return createSuccess(c, (await db.getStore(body.uid, `address`)) || {
        group: [],
        chat: [],
      })
      else return createSuccess(c, (await db.getStore(body.email, `address`)) || {
        group: [],
        chat: [],
      })
    } catch (error) {
      return createError(c, error, ResponseType.FailCode.server, 500)
    }
  }
  return createError(c, '消息格式错误', ResponseType.FailCode.format, 406)
}).patch(async c => {
  store.header = c.req.header()
  const body = await c.req.json()
  if (isType(body, dataType.addAddress)) {
    try {
      if ((!await db.get(body.pid)) || !(body.type == 'email' ? (!await db.searchByEmail(body.email)) : await db.searchByUid(body.uid))) return createError(c, '用户不存在', ResponseType.FailCode.notFound, 404)
      if (body.type == 'uid') {
        var v: dataType.Link = JSON.parse(await db.getStore(body.uid, 'address') || JSON.stringify({
          chat: [],
          group: []
        }))
        const user = await db.searchByUid(body.uid)
        if (isEmpty(user)) return createError(c, '用户未找到', ResponseType.FailCode.notFound, 404)
        v.chat.push(user)
        await db.setStore(body.uid, `address`, JSON.stringify(v))
      }
      else {
        var v: dataType.Link = JSON.parse(await db.getStore(body.email, 'address') || JSON.stringify({
          chat: [],
          group: []
        }))
        const user = await db.searchByEmail(body.email)
        if (isEmpty(user)) return createError(c, '用户未找到', ResponseType.FailCode.notFound, 404)
        v.chat.push(user)
        await db.setStore(body.email, `address`, JSON.stringify(v))
      }
      await handleDelAddListUser(c)
      return createSuccess(c, v)
    } catch (error) {
      console.error(error)
      return createError(c, error, ResponseType.FailCode.server, 500)
    }
  }
  return createError(c, '消息格式错误', ResponseType.FailCode.format, 406)
}).delete(async (c: Context) => {
  store.header = c.req.header()
  const body = await c.req.json()
  if (isType(body, dataType.getAddress)) {
    try {
      if (body.type == 'uid') {
        var val: dataType.Link = await db.getStore(body.uid, `address`)
        remove(val.chat, { uid: toNumber(body.uid) })
        await db.setStore(body.uid, `address`, JSON.stringify(val))
      }
      else {
        var val: dataType.Link = await db.getStore(body.email, `address`)
        remove(val.chat, { email: body.email })
        await db.setStore(body.email, `address`, JSON.stringify(val))
      }
      return createSuccess(c, val)
    } catch (error) {
      return createError(c, error, ResponseType.FailCode.server, 500)
    }
  }
})
app.post('/user/time', async c => {
  store.header = c.req.header()
  try {
    const body = await c.req.json()
    if (!isType(body, dataType.getTime)) return createError(c, '消息格式错误', ResponseType.FailCode.format, 406)
    if (body.type == 'uid') return createSuccess(c, await db.getTimeByUid(body.uid))
    else return createSuccess(c, await db.getTimeByEmail(body.email))
  } catch (error) {
    return createError(c, error, ResponseType.FailCode.server, 500)
  }
})

app.get('/user/count', async c => {
  store.header = c.req.header()
  return createSuccess(c, await db.count())
})

app.put('/user/:uid/store/*', async c => {
  store.header = c.req.header()
  const key = c.req.path.match(/(?<=\/user\/\w+\/store\/).+/g)![0].replaceAll('/', '.')
  try {
    await db.setStore(c.req.param().uid, key, await c.req.text())
    return createSuccess(c, await c.req.json())
  } catch (error) {
    return createError(c, error, ResponseType.FailCode.server, 500)
  }
}).delete(async c => {
  const key = c.req.path.match(/(?<=\/user\/\w+\/store\/).+/g)![0].replaceAll('/', '.')
  try {
    await db.deleteStore(c.req.param().uid, key)
    return createSuccess(c, await c.req.json())
  } catch (error) {
    return createError(c, error, ResponseType.FailCode.server, 500)
  }
}).get(async c => {
  const key = c.req.path.match(/(?<=\/user\/\w+\/store\/).+/g)![0].replaceAll('/', '.')
  store.header = c.req.header()
  try {
    return createSuccess(c, await db.getStore(c.req.param().uid, key))
  } catch (error) {
    return createError(c, error, ResponseType.FailCode.server, 500)
  }
})

app.all('*', c => createError(c, '未知的路径', ResponseType.FailCode.falseMethod, 405))
export default app
