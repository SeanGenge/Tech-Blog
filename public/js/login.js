const loginFormHandler = async (event) => {
	event.preventDefault();
	const loginForm = document.getElementById("login-form");
	const username = document.getElementById("login-username").value.trim();
	const password = document.getElementById("login-password").value.trim();

	if (username && password) {
		// If a username and password fields are not empty, attempt login the user
		const response = await fetch('/api/users/login', {
			method: 'POST',
			body: JSON.stringify({
				username,
				password
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
			window.location = '/dashboard';
		}
		else {
			// Invalidate the form
			loginForm.classList.add('invalid-login');
			document.getElementById("login-password").value = "";
		}
	}
}

document.querySelector("#login-form")?.addEventListener("submit", loginFormHandler);