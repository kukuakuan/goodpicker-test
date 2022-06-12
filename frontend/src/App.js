import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserProfilePage from './pages/profile'
import UserPage from './pages/user'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import AboutUs from './pages/about-us'
import NewPost from './pages/new-post'
import ProjectBudget from './pages/prj-budget'
import Custom404 from './pages/404'
import SearchPage from './pages/search'
import Chat from './pages/chat'
import { useAuthState, useAuthenticate, useLogout } from './hooks/useAuth'
import AuthService from './service/AuthService'
import GoodsPage from './pages/goods'
import NewBudget from './pages/prj-budget/budget-content/create-new-budget'

function App() {
	const { user, cookies } = useAuthState()
	const authenicate = useAuthenticate()
	const logout = useLogout()

	React.useLayoutEffect(() => {
		if (cookies['gp_token'] && !user) {
			AuthService.getMe(cookies['gp_token'])
				.then(res =>
					authenicate({ user: res.data, token: cookies['gp_token'] })
				)
				.catch(err => logout())
		}
	}, [cookies, user, authenicate, logout])

	return (
		<BrowserRouter>
			<div className="App">
				<div className="content">
					<Routes>
						<Route path="/" element={<HomePage/>} />
						<Route path="/project-budget/new-budget" element={<NewBudget/>} />
						<Route path="/login" element={<LoginPage/>} />
						<Route path="/profile" element={<UserProfilePage/>} />
						<Route path="/project-budget" element={<ProjectBudget/>} />
						<Route path="/about-us" element={<AboutUs/>} />
						<Route path="/new-post" element={<NewPost/>} />
						<Route path="/users" element={<UserPage/>} />
						<Route path="/search" element={<SearchPage/>} />
						<Route path="/chat/:chatID/" element={<Chat/>} />
						<Route path="/goods/:goodsId" element={<GoodsPage/>} />
						<Route element={<Custom404/>} />
					</Routes>

				</div>
			</div>
		</BrowserRouter>
	)
}

export default App
