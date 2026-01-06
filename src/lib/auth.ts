import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import prisma from '@/src/lib/prisma'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      address: {
        type: "string",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      title: {
        type: "string",
        required: false,
      },
      lyrics: {
        type: "string",
        required: false,
      },
    },
  },
})