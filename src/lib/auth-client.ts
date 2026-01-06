import { createAuthClient } from 'better-auth/react'

const client = createAuthClient()

export const { signIn, signOut } = client

export type User = {
    id: string
    email: string
    emailVerified: boolean
    name: string
    createdAt: Date
    updatedAt: Date
    image?: string | null
    address?: string | null
    phone?: string | null
    title?: string | null
    lyrics?: string | null
}

export type Session = {
    id: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
}

export const useSession = client.useSession as () => {
    data: {
        user: User
        session: Session
    } | null
    isPending: boolean
    error: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const signUp = {
  ...client.signUp,
  email: async (data: {
    email: string
    password: string
    name: string
    image?: string
    address?: string
    phone?: string
    title?: string
    lyrics?: string
    callbackURL?: string
  }) => {
    return client.signUp.email(data as unknown as Parameters<typeof client.signUp.email>[0])
  },
}

