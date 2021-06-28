export default function(url, data = {}, method = "GET") {
	return new Promise((resolve, reject) => {
		wx.request({
			url: "http://localhost:3000" + url,
			data,
			method,
			success(res) {
				resolve(res.data)
			},
			fail() {
				reject(err.message)
			}

		})
	})

}
