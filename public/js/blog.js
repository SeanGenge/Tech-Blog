const editBlog = async () => {
	const blogId = document.getElementById("blog-id").value.trim();
	
	// Go to a new page
	window.location = `/blog/edit/${blogId}`;
};

const deleteBlog = async () => {
	const blogId = document.getElementById("blog-id").value.trim();
	
	const response = await fetch(`/api/blog/${blogId}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) {
		document.location.replace('/dashboard');
	} else {
		console.log('Failed to log out!');
	}
};

const updateBlog = async () => {
	const blogId = document.getElementById("blog-id").value.trim();
	const title = document.getElementById("blog-title").value.trim();
	const blogText = document.getElementById("blog-text").value.trim();
	const userId = document.getElementById("user-id").value.trim();

	if (title && blogText) {
		const response = await fetch(`/api/blog/${blogId}`, {
			method: 'PUT',
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
			window.location = `/blog/view/${blogId}`;
		}
	}
};

document.querySelector('#blog-edit')?.addEventListener('click', editBlog);
document.querySelector('#blog-delete')?.addEventListener('click', deleteBlog);
document.querySelector('#update-blog')?.addEventListener('click', updateBlog);