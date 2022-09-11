const addCommentFormHandler = async (event) => {
	event.preventDefault();
	const comment = document.getElementById("add-comment").value.trim();
	const blogId = document.getElementById("blog-id").value.trim();
	const userId = document.getElementById("user-id").value.trim();

	if (comment) {
		const response = await fetch('/api/comments/', {
			method: 'POST',
			body: JSON.stringify({
				text: comment,
				blog_id: blogId,
				user_id: userId
			}),
			headers: {
				'content-type': 'application/json'
			}
		})
			.catch(err => {
				console.log(err);
			});

		// If the user was successfully logged in, redirect to the dashboard page
		if (response.ok) {
			window.location.reload();
		}
	}
}

document.querySelector("#comment-form").addEventListener("submit", addCommentFormHandler);