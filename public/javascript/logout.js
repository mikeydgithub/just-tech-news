async function logout() {

    // start an http request to 'logout' and because of await the asynchronous function is paused until the request completes
    const response = await fetch ('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#logout').addEventListener('click', logout);
