async function deleteFormHandler(event) {
    event.preventDefault();

    // toString() method returns a string reprensting the object
    // split() method divides a string into an ordered list of substrings, then goes into an array, and returns the array.
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

    // replace() method removes the page from the session history and navigates to the given URL
    // redirect users to the dashboard after successful login
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}
  
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);