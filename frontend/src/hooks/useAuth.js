import React from 'react'
import { CookiesProvider, useCookies } from 'react-cookie'
import { useSessionStorage } from './useSessionStorage'

const AuthStateContext = React.createContext()
const AuthDispatchContext = React.createContext()

const AuthProvider = ({ children }) => {
	const [user, setUser] = useSessionStorage('user')
	const [cookies, setCookies, removeCookies] = useCookies(['gp_token'])

	const value = React.useMemo(
		() => ({ user, setUser, cookies, setCookies, removeCookies }),
		[user, setUser, cookies, setCookies, removeCookies]
	)

	const authState = React.useMemo(
		() => ({ user: value.user, cookies: value.cookies }),
		[value]
	)

	const setAuthState = React.useCallback(
		({ user, token, clearToken, clearUser }) => {
			if (clearToken) {
				value.removeCookies('gp_token', { path: '/' })
			} else {
				var expireDate = new Date()
				expireDate.setDate(expireDate.getDate() + 5)

				value.setCookies('gp_token', token, { expires: expireDate, path: '/' })
			}

			if (clearUser) {
				value.setUser('')
			} else {
				value.setUser(user)
			}
		},
		[value]
	)

	return (
		<CookiesProvider>
			<AuthStateContext.Provider value={authState}>
				<AuthDispatchContext.Provider value={setAuthState}>
					{children}
				</AuthDispatchContext.Provider>
			</AuthStateContext.Provider>
		</CookiesProvider>
	)
}

const useAuthState = () => {
	const authState = React.useContext(AuthStateContext)

	if (typeof authState == 'undefined') {
		throw new Error('useAuthState must be used within a AuthProvider')
	}

	return authState
}

const useAuthenticate = () => {
	const setAuthState = React.useContext(AuthDispatchContext)

	if (typeof setAuthState == 'undefined') {
		throw new Error('useAuthenticate must be used within a AuthProvider')
	}

	const authenticate = React.useCallback(
		({ user, token }) => {
			setAuthState({ user, token })
		},
		[setAuthState]
	)

	return authenticate
}

const useLogout = () => {
	const setAuthState = React.useContext(AuthDispatchContext)

	if (typeof setAuthState == 'undefined') {
		throw new Error('useLogout must be used within a AuthProvider')
	}

	const logout = React.useCallback(() => {
		setAuthState({ clearToken: true, clearUser: true })
	}, [setAuthState])

	return logout
}

// const useClearUser = () => {
// 	const setAuthState = React.useContext(AuthDispatchContext)

// 	if (typeof setAuthState == 'undefined') {
// 		throw new Error('useClearUser must be used within a AuthProvider')
// 	}

// 	const clearUser = React.useCallback(() => {
// 		setAuthState({ clearUser: true })
// 	}, [setAuthState])

// 	return clearUser
// }

export { AuthProvider, useAuthState, useAuthenticate, useLogout }
