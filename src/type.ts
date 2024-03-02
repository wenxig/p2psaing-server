import { z } from 'zod';

export const webSaveDeepRule = z.object({
  email: z.string(),
  img: z.string(),
  lid: z.string(),
  name: z.string(),
  uid: z.number(),
  introduction: z.string().optional(),
  password: z.string(),
  pid: z.string(),
  delImg: z.string().optional()
})
export const webSaveRule = z.object({
  email: z.string(),
  img: z.string(),
  lid: z.string(),
  name: z.string(),
  uid: z.number(),
  introduction: z.string().optional()
})
export const baseRType = [z.object({
  method: z.enum(['getUser_uid', 'getTime_uid']),
  data: z.number()
}), z.object({
  method: z.enum(['getSerectUser', 'getUser_email', 'getTime_email', 'getAddAddress']),
  data: z.string()
}), z.object({
  method: z.enum(['count'])
}), z.object({
  method: z.enum(['updateUser']),
  data: webSaveDeepRule
}), z.object({
  method: z.enum(['getJWT'])
}), z.object({
  method: z.enum(['addAddress']),
  data: z.object({
    from: webSaveRule,
    to: z.number().or(z.string())
  })
}), z.object({
  method: z.enum(['updateFile']),
  path: z.string()
})]