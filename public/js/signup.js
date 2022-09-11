const signupFormHandler = async (event) => {
	event.preventDefault();

	const signupForm = document.getElementById("signup-form");
	const username = document.querySelector('#signup-username').value.trim();
	const password = document.querySelector('#signup-password').value.trim();
	const passwordCheck = document.querySelector('#signup-password-check').value.trim();

	if (username && password && password === passwordCheck && password.length >= 6) {
		// A value has been entered in all three and the password and password check all match
		const response = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			console.log('Failed to sign up.');
		}
	}
	else {
		// Invalidate the form
		signupForm.classList.add('invalid-signup');
		document.getElementById("signup-password").value = "";
		document.getElementById("signup-password-check").value = "";
	}
};

document.querySelector('#signup-form')?.addEventListener('submit', signupFormHandler);
