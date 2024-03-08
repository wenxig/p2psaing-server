import { isObject, isString, forEach } from 'lodash-es';
import { store } from 'src/store';
// import axios from 'axios';
export const api = async (data: Record<string, any>) => {
  data = {
    ...data,
    user: 'p2psaing',
    secret: '59c44c2f'
  }
  const body = new FormData()
  for (const key in data) body.append(key, data[key])

  const headers = new Headers()
  headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
  forEach(store.header, (v, k) => headers.set(k, v))
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
export const count = async (): Promise<number> => (await api({
  action: "count"
})).count
export async function get(key: string | number): Promise<any> {
  const data = await api({
    tag: key.toString(),
    action: 'get'
  })
  if (data[key] == 'null' && data[key] == null) return null
  if (isObject(data[key])) return data[key]
  return JSON.parse(data[key])
}
export async function search(tag: string | number, type: "tag", no?: number, count?: number): Promise<string[]>
export async function search(tag: string | number, type: "value", no?: number, count?: number): Promise<any[]>
export async function search(tag: string | number, type: "both", no?: number, count?: number): Promise<{ tag: string, value: any }[]>
export async function search(tag: string | number, type: "value" | "tag" | "both" = "both", no = 1, count = 100,): Promise<string[] | any[] | { tag: string, value: any }[]> {
  try {
    const result = await api({
      tag,
      action: 'search',
      no,
      count,
      type
    })
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
export const remove = async (tag: string | number): Promise<void> => (await api({
  action: "delete",
  tag
}))
export const searchByUid = async (uid: number) => (await get(`${uid}.value`)) as User.WebDbSave
export const searchByEmail = async (email: string) => (await get(`${email}.value`)) as User.WebDbSave
export const getTimeByUid = async (uid: number) => (await get(`${uid}.time`)) as number
export const getTimeByEmail = async (email: string) => (await get(`${email}.time`)) as number

export const deleteStore = async (ids: string | number, key: string) => (await remove(`${ids}.store.${key}`)) as any
export const getStore = async (ids: string | number, key: string) => (await get(`${ids}.store.${key}`)) as any
export const setStore = async (ids: string | number, key: string, value: string) => {
  if (isString(ids)) var u = await searchByEmail(ids)
  else var u = await searchByUid(ids)
  await api({
    action: 'update',
    tag: `${u.email}.store.${key}`,
    value,
  })
  await api({
    action: 'update',
    tag: `${u.uid}.store.${key}`,
    value,
  })
}

export function updateImage() {
  forEach(store.header, (v, k) => {
    if (/authorization/ig.test(v[0])) {
      const headers = new Headers()
      headers.set(k, v)
      const type = v[1] as 'github' | 'smms'
      switch (type) {
        case 'github': {
          headers.set('Authorization', "token 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")
          fetch('https://api.github.com/repos/wenxig/p2psaing-app-db/contents', { headers })
          return
        }
        case 'smms': {
          return
        }
      }
    }
  })
}