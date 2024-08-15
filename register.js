document.addEventListener('DOMContentLoaded', function() {
    // Load existing users from localStorage or initialize an empty array
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    const registerForm = document.getElementById('register-form');
    const registerMessage = document.getElementById('register-message');

    // Handle the form submission for creating a new account
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newUsername = document.getElementById('new-username').value.trim();
        const newPassword = document.getElementById('new-password').value.trim();

        if (!newUsername || !newPassword) {
            registerMessage.textContent = 'Username and password cannot be empty.';
            return;
        }

        // Check if the username already exists
        if (users.some(user => user.username === newUsername)) {
            registerMessage.textContent = 'Username already exists. Please choose another.';
            return;
        }

        // Create a new user object and add it to the users array
        const newUser = {
            username: newUsername,
            password: newPassword // Note: In a real app, passwords should be hashed!
        };

        users.push(newUser);

        // Store the updated users array in localStorage
        localStorage.setItem('users', JSON.stringify(users));

        alert( 'Account created successfully! You can now log in.');
        
        // Optionally, redirect to the login page
        // window.location.href = 'login.html';

        // Clear the form fields
        registerForm.reset();
    });
});
