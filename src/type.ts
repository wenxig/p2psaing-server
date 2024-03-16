import { z, type TypeOf } from 'zod';

export const webSaveDeepRule = z.object({
  email: z.string().email(),
  img: z.string(),
  lid: z.string(),
  name: z.string(),
  uid: z.number().int(),
  introduction: z.string().optional(),
  pid: z.string(),
  delImg: z.string().optional()
})
export type WebSaveDeepRule = TypeOf<typeof webSaveDeepRule>
export const webSaveRule = z.object({
  email: z.string().email(),
  img: z.string(),
  lid: z.string(),
  name: z.string(),
  uid: z.number().int(),
  introduction: z.string().optional()
})
export type WebSaveRule = TypeOf<typeof webSaveRule>

export const getUser = z.object({
  type: z.enum(['uid']),
  uid: z.number().int(),
}).or(z.object({
  type: z.enum(['email']),
  email: z.string().email()
})).or(z.object({
  type: z.enum(['pid']),
  pid: z.string()
}))

export const hasUser = z.object({
  type: z.enum(['uid']),
  uid: z.number().int(),
}).or(z.object({
  type: z.enum(['email']),
  email: z.string().email()
})).or(z.object({
  type: z.enum(['pid']),
  pid: z.string()
}))

export const getTime = z.object({
  type: z.enum(['uid']),
  uid: z.number().int(),
}).or(z.object({
  type: z.enum(['email']),
  email: z.string().email()
}))


export const getAddress = z.object({
  type: z.enum(['uid']),
  uid: z.number().int(),
}).or(z.object({
  type: z.enum(['email']),
  email: z.string().email()
}))
export const addAddress = z.object({
  type: z.enum(['uid']),
  uid: z.number().int(),
  is: z.number(),
  pid: z.string()
}).or(z.object({
  type: z.enum(['email']),
  email: z.string().email(),
  is: z.number(),
  pid: z.string()
}))

export const linkRule = z.object({
  group: z.object({
    gid: z.string()
  }).array(),
  chat: z.object({
    uid: z.number()
  }).array(),
})
export type Link = TypeOf<typeof linkRule>