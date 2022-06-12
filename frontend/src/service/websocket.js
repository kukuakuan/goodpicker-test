class WebSocketService {
	static instance = null
	callbacks = {}

	static getInstance() {
		if (!WebSocketService.instance) {
			WebSocketService.instance = new WebSocketService()
		}
		return WebSocketService.instance
	}

	constructor() {
		this.socketRef = null
	}

	connect(chatUrl) {
		const path = `ws://127.0.0.1:8000/ws/chat/${chatUrl}/`
		this.socketRef = new WebSocket(path)

		this.socketRef.onopen = () => {
			console.log('WebSocket open')
		}

		this.socketRef.onmessage = e => {
			this.socketNewMessage(e.data)
		}

		this.socketRef.onerror = e => {
			console.log(e.message)
		}

		this.socketRef.onclose = () => {
			console.log('WebSocket closed')
		}
	}

	disconnect() {
		if (this.socketRef) {
			this.socketRef.close()
		}
	}

	socketNewMessage(data) {
		const parsedData = JSON.parse(data)
		const command = parsedData.command
		if (Object.keys(this.callbacks).length === 0) {
			return
		}
		if (command === 'new_message') {
			this.callbacks[command](parsedData.message)
		}
	}

	newChatMessage({ from, content, chatId }) {
		this.sendMessage({
			command: 'new_message',
			from,
			message: content,
			chatId
		})
	}

	addCallbacks(newMessageCallback) {
		this.callbacks['new_message'] = newMessageCallback
	}

	sendMessage(data) {
		try {
			this.socketRef.send(JSON.stringify({ ...data }))
		} catch (err) {
			console.log(err.message)
		}
	}

	state() {
		return this.socketRef.readyState
	}
}

const WebSocketInstance = WebSocketService.getInstance()

export default WebSocketInstance
