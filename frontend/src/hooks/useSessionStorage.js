import React from 'react'

const useSessionStorage = (
	key,
	defaultValue = '',
	{ serialize = JSON.stringify, deserialize = JSON.parse } = {}
) => {
	const [state, setState] = React.useState(() => {
		var valueInSessionStorage
		if (typeof window != 'undefined')
			valueInSessionStorage = window.sessionStorage.getItem(key)

		if (valueInSessionStorage) return deserialize(valueInSessionStorage)

		return typeof defaultValue == 'function' ? defaultValue() : defaultValue
	})

	const prevKeyRef = React.useRef(key)

	React.useEffect(() => {
		const prevKey = prevKeyRef.current
		if (prevKey !== key) window.sessionStorage.removeItem(prevKey)

		prevKeyRef.current = key
		window.sessionStorage.setItem(key, serialize(state))
	}, [key, serialize, state])

	return [state, setState]
}

export { useSessionStorage }
