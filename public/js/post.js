const postForm = document.querySelector('#post-form');


const postFormHandler = async (event) => {
    event.preventDefault();
    const body = document.querySelector('#post').value;
    const title = document.querySelector('#postTitle').value;

if(body && title){
    const response = await fetch('/', {
        method: 'POST',
        body: JSON.stringify({ body, title }),
        headers: { 'Content-Type': 'application/json' },
});

if (response.ok) {
    console.log(body + title)
    window.location.reload();
}else {
    alert('Try again !');
}; 
}};

postForm.addEventListener('submit', postFormHandler);
document
    .querySelector('#post-button')
    .addEventListener('submit', postFormHandler);
