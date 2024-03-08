import { Hono } from 'hono'
import { sign, verify } from 'hono/jwt'
import { ResponseType } from './res';
import { z } from 'zod';
import * as dataType from './type';
import * as db from './db';
import { store } from "./store";
import { HmacSHA512, AES } from "crypto-js";
import { forEach } from 'lodash-es';
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

app.get('/jwt', c => c.json({
  code: ResponseType.Code.success,
  data: jwt.value
} as ResponseType.Success, 200))

app.post('/user', async c => {
  const header = store.header = c.req.header()
  const body = dataType.getUser.safeParse(await c.req.json())
  const authorization = z.string().safeParse(header.authorization)
  if (authorization.success && await verify(authorization.data, jwt.secret, 'HS512')) {
    if (body.success) {
      try {
        switch (body.data.type) {
          case "uid": {
            return c.json({
              code: ResponseType.Code.success,
              data: await db.searchByUid(body.data.uid)
            } as ResponseType.Success, 200)

          }
          case "email": {
            return c.json({
              code: ResponseType.Code.success,
              data: await db.searchByEmail(body.data.email)
            } as ResponseType.Success, 200)
          }
          case "pid": {
            return c.json({
              code: ResponseType.Code.success,
              data: await db.get(body.data.pid)
            } as ResponseType.Success, 200)
          }
        }
      } catch (error) {
        return c.json({
          code: ResponseType.Code.success,
          data: error
        } as ResponseType.Success, 500)
      }
    }
    return c.json({
      code: ResponseType.Code.fail,
      data: {
        code: ResponseType.FailCode.format,
        message: '消息格式错误'
      }
    } as ResponseType.Fail, 406)
  }
  return c.json({
    code: ResponseType.Code.fail,
    data: {
      code: ResponseType.FailCode.unauthorization,
      message: '认证错误'
    }
  } as ResponseType.Fail, 401)
}).put(async c => {
  const header = store.header = c.req.header()
  const authorization = z.string().safeParse(header.authorization)
  if (!(authorization.success && await verify(authorization.data, jwt.secret, 'HS512'))) return c.json({
    code: ResponseType.Code.fail,
    data: {
      code: ResponseType.FailCode.unauthorization,
      message: '认证错误'
    }
  } as ResponseType.Fail, 401)

  const body: User.WebDbSaveDeep = await c.req.json()
  if (!dataType.webSaveDeepRule.safeParse(body).success) return c.json({
    code: ResponseType.Code.fail,
    data: {
      code: ResponseType.FailCode.format,
      message: '消息格式错误'
    }
  } as ResponseType.Fail, 406)
  try {
    await db.api({
      data: {
        tag: body.pid,
        value: body,
        action: 'update'
      }
    })
    await db.api({
      data: {
        tag: `${body.uid}.value`,
        value: dataType.webSaveRule.parse(body),
        action: 'update'
      }
    })
    await db.api({
      data: {
        tag: `${body.email}.value`,
        value: dataType.webSaveRule.parse(body),
        action: 'update'
      }
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
    return c.json({
      code: ResponseType.Code.success,
      data: time
    } as ResponseType.Success, 200)
  } catch (error) {
    return c.json({
      code: ResponseType.Code.success,
      data: error
    } as ResponseType.Success, 500)
  }
})

app.post('/time', async c => {
  const header = store.header = c.req.header()
  const body = dataType.getTime.safeParse(await c.req.json())
  const authorization = z.string().safeParse(header.authorization)
  if (authorization.success && await verify(authorization.data, jwt.secret, 'HS512')) {
    if (body.success) {
      try {
        switch (body.data.type) {
          case "uid": {
            return c.json({
              code: ResponseType.Code.success,
              data: await db.getTimeByUid(body.data.uid)
            } as ResponseType.Success, 200)
          }
          case "email": {
            return c.json({
              code: ResponseType.Code.success,
              data: await db.getTimeByEmail(body.data.email)
            } as ResponseType.Success, 200)
          }
        }
      } catch (error) {
        return c.json({
          code: ResponseType.Code.success,
          data: error
        } as ResponseType.Success, 500)
      }

    }
    return c.json({
      code: ResponseType.Code.fail,
      data: {
        code: ResponseType.FailCode.format,
        message: '消息格式错误'
      }
    } as ResponseType.Fail, 406)
  }
  return c.json({
    code: ResponseType.Code.fail,
    data: {
      code: ResponseType.FailCode.unauthorization,
      message: '认证错误'
    }
  } as ResponseType.Fail, 401)
})

app.get('/count', async c => c.json({
  code: ResponseType.Code.success,
  data: await db.count()
} as ResponseType.Success, 200))
app.all('/file/*', async c => {
  const header = store.header = c.req.header()
  const authorization = z.string().safeParse(header.authorization).success ? header.authorization : ''
  const headers = new Headers()
  forEach(header, (v, k) => headers.set(k, v));
  try {
    switch (authorization) {
      case 'github': {
        headers.set('Authorization', 'token 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')
        return c.json({
          code: ResponseType.Code.success,
          data: await fetch(c.req.path.replace(/^\/file/g, 'https://api.github.com'), { headers, body: await c.req.text(), method: c.req.method })
        } as ResponseType.Success, 401)
      }
      case 'smms': {
        headers.set('Authorization', 'bipd73BhOqJYyPnMr8e5kA64jtWREomu')
        return c.json({
          code: ResponseType.Code.success,
          data: await fetch(c.req.path.replace(/^\/file/g, 'https://sm.ms'), { headers, body: await c.req.formData(), method: c.req.method })
        } as ResponseType.Success, 401)
      }
      default: {
        return c.json({
          code: ResponseType.Code.fail,
          data: {
            code: ResponseType.FailCode.format,
            message: '不允许的参数'
          }
        } as ResponseType.Fail, 405)
      }
    }
  } catch (error) {
    return c.json({
      code: ResponseType.Code.success,
      data: error
    } as ResponseType.Success, 500)
  }
})

app.put('/user/:uid/store/*', async c => {
  const key = c.req.path.match(/(?<=\/user\/\w+\/store\/).+/g)![0].replaceAll('/', '.')
  try {
    await db.setStore(c.req.param().uid, key, await c.req.text())
    return c.json({
      code: ResponseType.Code.success,
      data: await c.req.json()
    } as ResponseType.Success)
  } catch (error) {
    return c.json({
      code: ResponseType.Code.success,
      data: error
    } as ResponseType.Success, 500)
  }
}).delete(async c => {
  const key = c.req.path.match(/(?<=\/user\/\w+\/store\/).+/g)![0].replaceAll('/', '.')
  try {
    await db.deleteStore(c.req.param().uid, key)
    return c.json({
      code: ResponseType.Code.success,
      data: await c.req.json()
    } as ResponseType.Success)
  } catch (error) {
    return c.json({
      code: ResponseType.Code.success,
      data: error
    } as ResponseType.Success, 500)
  }
}).get(async c => {
  const key = c.req.path.match(/(?<=\/user\/\w+\/store\/).+/g)![0].replaceAll('/', '.')
  try {
    return c.json({
      code: ResponseType.Code.success,
      data: await db.getStore(c.req.param().uid, key)
    } as ResponseType.Success)
  } catch (error) {
    return c.json({
      code: ResponseType.Code.success,
      data: error
    } as ResponseType.Success, 500)
  }
})

app.get('/echo/*', c => c.text(c.req.url))

app.all('*', c => {
  return c.json({
    code: ResponseType.Code.fail,
    data: {
      code: ResponseType.FailCode.falseMethod,
      message: '未知的路径'
    }
  } as ResponseType.Fail, 405)
})
export default app
