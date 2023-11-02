let public = true;
const publicBtn = $('#public');
const privateBtn = $('#private');

const createBlogPost = async () => {
  // Collect values from the login form
  const title = document.querySelector('#blog-title').value.trim();
  const description = document.querySelector('#description').value.trim();
  const author_id = $('.card').attr('id');
  const date_created = $('.card').attr('data-created');

  if (title && description) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/blogPosts', {
      method: 'PUT',
      body: JSON.stringify({ title, description, public, author_id, date_created}),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace(`/profile`);
    } 
  }
};

$('#public').on('click', function(event) {
  event.preventDefault();
  privateBtn.removeClass('selected');
  publicBtn.addClass('selected');
  public = true;
})

$('#private').on('click', function(event) {
  event.preventDefault();
  publicBtn.removeClass('selected');
  privateBtn.addClass('selected');
  public = false;
})

$('#submit').on('click', function(event) {
  event.preventDefault();
  createBlogPost()
})