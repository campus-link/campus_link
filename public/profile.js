document.addEventListener('DOMContentLoaded', async () => {
    const profileInfo = document.getElementById('profileInfo');
    const backButton = document.getElementById('backButton');

    const userId = localStorage.getItem('userId');
    const authToken = localStorage.getItem('authToken');

    if (!userId || !authToken) {
        profileInfo.innerText = 'User not logged in. Please login first.';
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/users/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }
        const user = await response.json();

        profileInfo.innerHTML = `
            <div><strong>Name:</strong> ${user.name}</div>
            <div><strong>Email:</strong> ${user.email}</div>
            <div><strong>Role:</strong> ${user.role}</div>
        `;
    } catch (error) {
        profileInfo.innerText = 'Error loading profile.';
        console.error(error);
    }

    backButton.addEventListener('click', () => {
        window.location.href = 'user-groups.html';
    });
});
