import { isObject, isString, update } from 'lodash-es';
// import axios from 'axios';
export const api = async (data: Record<string, any>, req: Request) => {
  data = {
    ...data,
    user: 'p2psaing',
    secret: '59c44c2f'
  }
  const body = new FormData()
  for (const key in data) body.append(key, data[key])

  const headers = new Headers()
  headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
  req.headers.forEach((v, k) => headers.set(k, v))

  let bodySearch = '?'
  for (const key in data) {
    const d = JSON.stringify(data[key])
    bodySearch += `${key}=${d.substring(1, d.length - 1)}&`
  }
  bodySearch.substring(bodySearch.length - 1)
  return (await fetch(`https://tinywebdb.appinventor.space/api${bodySearch}`, {
    method: 'POST',
    headers,
    body,
    redirect: "follow",
    cf: { apps: false },
  })).json() as any
}
export const count = async (req: Request): Promise<number> => (await api({
  action: "count"
}, req)).count
export async function get(req: Request, key: string | number): Promise<[any, true] | [undefined, false]> {
  const data = await api({
    tag: key.toString(),
    action: 'get'
  }, req)
  if (data[key] == 'null' && data[key] == null) return [undefined, false]
  if (isObject(data[key])) return [data[key], true]
  return [JSON.parse(data[key]), true]
}
export async function search(req: Request, tag: string | number, type: "tag", no?: number, count?: number): Promise<string[]>
export async function search(req: Request, tag: string | number, type: "value", no?: number, count?: number): Promise<any[]>
export async function search(req: Request, tag: string | number, type: "both", no?: number, count?: number): Promise<{ tag: string, value: any }[]>
export async function search(req: Request, tag: string | number, type: "value" | "tag" | "both" = "both", no = 1, count = 100,): Promise<string[] | any[] | { tag: string, value: any }[]> {
  try {
    const result = await api({
      tag,
      action: 'search',
      no,
      count,
      type
    }, req)
    const allKeys = Object.keys(result) ?? []
    if (allKeys.length > 1) return allKeys.map((tag) => ({
      value: ((): User.WebDbSave => isString(result[tag]) ? JSON.parse(result[tag]) : result[tag])(),
      tag
    }))
    return result[allKeys[0]] = (<any[]>result[allKeys[0]]).map((value) => isString(value) ? JSON.parse(value) : value)
  } catch {
    return []
  }
}

export const searchByUid = async (req: Request, uid: number) => (await get(req, `${uid}.value`))[0] as User.WebDbSave
export const searchByEmail = async (req: Request, email: string) => (await get(req, `${email}.value`))[0] as User.WebDbSave
export const getTimeByUid = async (req: Request, uid: number) => (await get(req, `${uid}.time`))[0] as number
export const getTimeByEmail = async (req: Request, email: string) => (await get(req, `${email}.time`))[0] as number
export const getStore = async (req: Request, ids: string | number, key: string) => (await get(req, `${ids}.store.${key}`))[0] as any
export const setStore = async (req: Request, ids: string | number, key: string, value: string) => {
  if (isString(ids)) var u = await searchByEmail(req, ids)
  else var u = await searchByUid(req, ids)
  await api({
    action: 'update',
    tag: `${u.email}.store.${key}`,
    value,
  }, req)
  await api({
    action: 'update',
    tag: `${u.uid}.store.${key}`,
    value,
  }, req)
}

export function updateImage(req: Request) {
  for (const v of req.headers.entries()) if (/authorization/ig.test(v[0])) {
    const type = v[1] as 'github' | 'smms'
    switch (type) {
      case 'github': {
        req.headers.set('Authorization', "token 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")
        fetch('https://api.github.com/repos/wenxig/p2psaing-app-db/contents', new Request(req, {
          headers: req.headers,
        }))
        return
      }
      case 'smms': {
        return
      }
    }
  }
}