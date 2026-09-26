import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { DUMMY_ACCOUNTS, ROLE_LABELS } from './roles'
import type { Role } from './roles'

export interface AuthUser {
  username: string
  role: Role
  roleLabel: string
  name: string
  initials: string
  laboratory: string
  laboratoryShort: string
}

interface AuthContextValue {
  user: AuthUser | null
  login: (username: string, password: string) => { success: boolean; error?: string }
  logout: () => void
}

const STORAGE_KEY = 'weighmetric.session'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser())

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: (username, password) => {
        const account = DUMMY_ACCOUNTS.find(
          (a) => a.username.toLowerCase() === username.trim().toLowerCase() && a.password === password,
        )
        if (!account) {
          return { success: false, error: 'Invalid username or password. Please check your credentials and try again.' }
        }
        setUser({
          username: account.username,
          role: account.role,
          roleLabel: ROLE_LABELS[account.role],
          name: account.name,
          initials: account.initials,
          laboratory: account.laboratory,
          laboratoryShort: account.laboratoryShort,
        })
        return { success: true }
      },
      logout: () => setUser(null),
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
