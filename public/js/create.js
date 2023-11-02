let public = true;
const publicBtn = $('#public');
const privateBtn = $('#private');

const currentDate = new Date();

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const month = months[currentDate.getMonth()]; // Get the month as a string
const day = currentDate.getDate(); // Get the day of the month
const year = currentDate.getFullYear(); // Get the year

const date_created = `${month} ${day}, ${year}`;

const createBlogPost = async () => {
  // Collect values from the login form
  const title = document.querySelector('#blog-title').value.trim();
  const description = document.querySelector('#description').value.trim();
  const author_id = $('.card').attr('id')

  if (title && description) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/blogPosts', {
      method: 'POST',
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


