let public = true;

const currentDate = new Date();

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const month = months[currentDate.getMonth()]; // Get the month as a string
const day = currentDate.getDate(); // Get the day of the month
const year = currentDate.getFullYear(); // Get the year

const date_created = `${month} ${day}, ${year}`;

const createComment = async () => {
  // Collect values from the login form
  const text = $('#comment').val().trim();
  const author_id = $('#user').attr('data-id')
  const blogpost_id = $('#info').attr('data-id')


  if (text) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/comments/', {
      method: 'POST',
      body: JSON.stringify({ text, author_id, blogpost_id, date_created }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace(`/post/${blogpost_id}`);
    } 
  }
};

$('#submit').on('click', function(event) {
  event.preventDefault();

  createComment()
})


