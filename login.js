document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    // Check if there's a new user and pre-fill the username field
    const newUser = localStorage.getItem('newUser');
    if (newUser) {
        document.getElementById('username').value = newUser;
        localStorage.removeItem('newUser'); // Remove it after pre-filling
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem('currentUser', username);
            window.location.href = 'post.html'; // Redirect to homepage or dashboard
        } else {
            errorMessage.textContent = 'Invalid credentials. Please try again.';
        }
    });
});
