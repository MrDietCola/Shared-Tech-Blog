  console.log('working');
  const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();
  const needed_funding = document.querySelector('#project-funding').value.trim();
  const description = document.querySelector('#project-desc').value.trim();

  if (name && needed_funding && description) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ name, needed_funding, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const deleteBlogPost = async (id) => {
  const response = await fetch(`/api/blogPosts/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/homePage');
  }
};

const editBlogPost = async (id) => {
  const response = await fetch(`/api/blogPosts/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/homePage');
  } else {
    alert('Failed to delete project');
  }
};

  $('button').on('click', function(event) {
    event.preventDefault();
    const button = $(this).attr('id')
    const id = $(this).parent().attr('id')

    if (button === 'edit') {
      editBlogPost(id)
    } else if (button === 'delete') {
      deleteBlogPost(id)
    }
  })
