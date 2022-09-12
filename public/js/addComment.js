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

		if (response.ok) {
			window.location.reload();
		}
	}
}

const deleteComment = async (event) => {
	const deleteBtn = event.target;
	const commentId = deleteBtn.getAttribute("data-id");

	if (commentId) {
		const response = await fetch(`/api/comments/${commentId}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json'
			}
		})
			.catch(err => {
				console.log(err);
			});

		if (response.ok) {
			window.location.reload();
		}
	}
}

document.querySelector("#comment-form")?.addEventListener("submit", addCommentFormHandler);
const deleteCommentBtns = document.querySelectorAll(".delete-comment");
deleteCommentBtns.forEach(btn => btn.addEventListener("click", deleteComment));