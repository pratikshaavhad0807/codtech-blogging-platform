document.addEventListener('DOMContentLoaded', function() {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    const currentUser = localStorage.getItem('currentUser');

    const postForm = document.getElementById('post-form');
    const postList = document.getElementById('post-list');
    const postMessage = document.getElementById('post-message');

    // Function to render posts
    function renderPosts() {
        postList.innerHTML = ''; // Clear existing posts

        posts.forEach(post => {
            const postEl = document.createElement('div');
            postEl.className = 'post';
            postEl.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <p><em>by ${post.author}</em></p>
                ${currentUser === post.author ? `
                <div class="actions">
                    <button onclick="editPost(${post.id})">Edit</button>
                    <button onclick="deletePost(${post.id})">Delete</button>
                </div>
                ` : ''}
            `;
            postList.appendChild(postEl);
        });
    }

    // Render posts on page load
    renderPosts();

    // Handle the form submission to create a new post
    postForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!currentUser) {
            postMessage.textContent = 'You must be logged in to create a post.';
            return;
        }

        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();

        if (!title || !content) {
            postMessage.textContent = 'Title and content cannot be empty.';
            return;
        }

        const newPost = {
            id: posts.length + 1,
            title: title,
            content: content,
            author: currentUser
        };

        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));

        alert('Post created successfully!');
        postForm.reset();

        renderPosts(); // Refresh the post list
    });

    // Edit Post Function
    window.editPost = function(id) {
        const post = posts.find(post => post.id === id);
        if (post && post.author === currentUser) {
            const newTitle = prompt('Edit the title:', post.title).trim();
            const newContent = prompt('Edit the content:', post.content).trim();

            if (newTitle && newContent) {
                post.title = newTitle;
                post.content = newContent;
                localStorage.setItem('posts', JSON.stringify(posts));
                renderPosts(); // Refresh the post list
                postMessage.textContent = 'Post updated successfully!';
            } else {
                alert('Title and content cannot be empty.');
            }
        } else {
            alert('You can only edit your own posts.');
        }
    };

    // Delete Post Function
    window.deletePost = function(id) {
        const postIndex = posts.findIndex(post => post.id === id);
        if (postIndex !== -1 && posts[postIndex].author === currentUser) {
            if (confirm('Are you sure you want to delete this post?')) {
                posts.splice(postIndex, 1);
                localStorage.setItem('posts', JSON.stringify(posts));
                renderPosts(); // Refresh the post list
                postMessage.textContent = 'Post deleted successfully!';
            }
        } else {
            alert('You can only delete your own posts.');
        }
    };
});
