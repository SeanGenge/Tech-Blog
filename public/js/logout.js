const logout = async () => {
	const response = await fetch('/api/users/logout', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) {
		// Go back to the home page
		document.location.replace('/');
	} else {
		console.log('Failed to log out!');
	}
};

document.querySelector('#logout')?.addEventListener('click', logout);
