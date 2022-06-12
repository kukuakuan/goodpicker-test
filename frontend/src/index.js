import React from 'react'
import ReactDOM from 'react-dom'
import TimeAgo from 'javascript-time-ago'
import vi from 'javascript-time-ago/locale/vi'
import 'antd/dist/antd.css'
import 'swiper/swiper.scss'
import './styles/index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { AuthProvider } from './hooks/useAuth'

TimeAgo.addDefaultLocale(vi)

ReactDOM.render(
	<AuthProvider>
		<App />
	</AuthProvider>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
