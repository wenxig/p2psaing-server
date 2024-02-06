import { isObject, isString } from 'lodash-es';
// import axios from 'axios';
export const api = async (data: Record<string, any>, req: Request) => {
  data = {
    ...data,
    user: DB_NAME,
    secret: DB_KEY
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
export async function get(req: Request, key: string | number): Promise<[User.WebDbSaveDeep, true] | [undefined, false]> {
  const data = await api({
    tag: key.toString(),
    action: 'get'
  }, req)
  if (data[key] == 'null' && data[key] == null) return [undefined, false]
  if (isObject(data[key])) return [data[key], true]
  return [JSON.parse(data[key]), true]
}
export async function search(req: Request, tag: string | number, type: "tag", no?: number, count?: number): Promise<string[]>
export async function search(req: Request, tag: string | number, type: "value", no?: number, count?: number): Promise<User.WebDbSave[]>
export async function search(req: Request, tag: string | number, type: "both", no?: number, count?: number): Promise<{ tag: string, value: User.WebDbSave }[]>
export async function search(req: Request, tag: string | number, type: "value" | "tag" | "both" = "both", no = 1, count = 100,): Promise<string[] | User.WebDbSave[] | { tag: string, value: User.WebDbSave }[]> {
  const result = await api({
    tag,
    action: 'search',
    no,
    count,
    type
  }, req)
  const allKeys = Object.keys(result)
  if (allKeys.length > 1) return allKeys.map((tag) => ({
    value: ((): User.WebDbSave => isString(result[tag]) ? JSON.parse(result[tag]) : result[tag])(),
    tag
  }))
  return result[allKeys[0]] = (<any[]>result[allKeys[0]]).map((value) => isString(value) ? JSON.parse(value) : value)
}
export const searchByUid = async (req: Request, uid: number) => (await search(req, `uid-${uid}|`, 'value', undefined, 1))[0]
export const searchByEmail = async (req: Request, email: string) => (await search(req, `|email-${email}|`, 'value', undefined, 1))[0]
export const getTimeByUid = async (req: Request, uid: number) => (await search(req, `time_uid-${uid}*`, 'value', undefined, 1))[0] as unknown as number
export const getTimeByEmail = async (req: Request, email: string) => (await search(req, `*email-${email}*`, 'value', undefined, 1))[0] as unknown as number
