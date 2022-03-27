// get the upvote button to work. add event listener to the button and then make a fetch() request 
// to the api/posts/upvote endpoint

async function upvoteClickHandler(event) {
    event.preventDefault();

    // toString() method returns a string reprensting the object
    // split() method divides a string into an ordered list of substrings, then goes into an array, and returns the array.
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    // start an http request to 'upvote' and because of await the asynchronous function is paused until the request completes
    const response = await fetch('/api/posts/upvote', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        // reload() method reloads the current URL, like the refresh button.
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}
  
document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);

