
const commentForm = document.querySelector('#comment-form');



const commentFormHandler = async (event) => {
    event.preventDefault();
    const body = document.querySelector('#comment').value;

if(body){
    const response = await fetch('/api/posts/:id', {
        method: 'POST',
        body: JSON.stringify({ body }),
        headers: { 'Content-Type': 'application/json' },
});

if (response.ok) {
    window.location.reload();
}else {
    alert('Try again !');
}; 
}};

commentForm.addEventListener('submit', commentFormHandler);
document
    .querySelector('#comment-button')
    .addEventListener('submit', commentFormHandler);



var imgs = document.getElementsByClassName('avatar');

for (var i = 0; i < imgs.length; i++) {
  var num = Math.floor(Math.random() * 10) + 1;
  imgs[i].src = '/assets/avatar' + num + '.png';
  imgs[i].alt = imgs[i].src;
}