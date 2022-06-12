const getBase64 = file => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onloadend = () => resolve(reader.result)
	})
}

export { getBase64 }
