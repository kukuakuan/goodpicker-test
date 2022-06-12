import axios from 'axios'
export default class AuthService {
	static login = body => {
		return axios.post('/api/auth/login', body)
	}

	static logout = token => {
		return axios.post('/api/auth/logout', null, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	}

	static register = body => {
		return axios.post('/api/auth/register', body)
	}

	static getMe = token => {
		return axios.get('/api/auth/user', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	}
}
