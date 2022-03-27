async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const id = window.location.toString().split('/') [
        window.location.toString().split('/').length -1
    ];
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title
        }),
        headers: {
            'Content-Type': 'applications/json'
        }
    });
    
    // replace() method removes the page from the session history and navigates to the given URL
    // redirect users to the dashboard after successful login
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}
  
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);