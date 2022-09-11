const addBlogFormhandler = async (event) => {
	event.preventDefault();
	const title = document.getElementById("blog-title").value.trim();
	const blogText = document.getElementById("blog-text").value.trim();
	const userId = document.getElementById("user-id").value.trim();

	if (title && blogText) {
		const response = await fetch('/api/blog/', {
			method: 'POST',
			body: JSON.stringify({
				title: title,
				contents: blogText,
				user_id: userId
			}),
			headers: {
				'content-type': 'application/json'
			}
		})
			.catch(err => {
				console.log(err);
			});

		if (response.ok) {
			window.location = "/dashboard";
		}
	}
}

document.querySelector("#publish-blog").addEventListener("click", addBlogFormhandler);