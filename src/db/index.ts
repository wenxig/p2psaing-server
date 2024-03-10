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
  for (const key in data) body.set(key, isString(data[key]) ? data[key] : JSON.stringify(data[key]))
  const headers = new Headers()
  forEach({
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'max-age=0',
    'Host': 'localhost:8787',
    'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
    'Sec-Ch-Ua-Mobile': '?0', 'Sec-Ch-Ua-Platform': '"macOS"',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  }, (v, k) => headers.set(k, v))
  try {
    console.log(body);

    return await (await fetch(`https://tinywebdb.appinventor.space/api`, {
      method: 'POST',
      headers,
      body,
      redirect: "follow",
    })).json() as any
  } catch (error) {
    console.log('err:', error)
  }
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