document.addEventListener('DOMContentLoaded', async () => {
    const groupsCountContainer = document.getElementById('groupsCountContainer');
    const groupsList = document.getElementById('groupsList');
    const messagesContainer = document.getElementById('messagesContainer');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const greetingContainer = document.getElementById('greetingContainer');

    const profileButton = document.getElementById('profileButton');
    const logoutButton = document.getElementById('logoutButton');

    const userId = localStorage.getItem('userId');
    const authToken = localStorage.getItem('authToken');

    if (!userId || !authToken) {
        groupsCountContainer.innerText = 'User not logged in. Please login first.';
        return;
    }

    // Fetch user info to display greeting
    try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user info');
        const user = await response.json();
        greetingContainer.innerText = `Hey ${user.name}`;
    } catch (error) {
        greetingContainer.innerText = 'Hey User';
        console.error('Error fetching user info:', error);
    }

    profileButton.addEventListener('click', () => {
        window.location.href = 'profile.html';
    });

    logoutButton.addEventListener('click', () => {
        localStorage.clear();
        window.location.href = 'multi-login.html';
    });

    let selectedGroupId = null;

    // Fetch and display user groups
    try {
        console.log('Fetching groups for user:', userId);
        const response = await fetch(`http://localhost:5000/api/user/${userId}/groups`);
        console.log('Groups fetch response status:', response.status);
        if (!response.ok) throw new Error('Failed to fetch groups');
        const groups = await response.json();
        console.log('Groups fetched:', groups);
        groupsCountContainer.innerText = `You are a member of ${groups.length} group(s).`;

        groupsList.innerHTML = '';
        if (groups.length > 0) {
            groups.forEach(group => {
                const li = document.createElement('li');
                li.textContent = group.name || `Group ID: ${group.id}`;
                li.dataset.groupId = group.id;
                li.addEventListener('click', () => {
                    selectedGroupId = group.id;
                    loadMessages(selectedGroupId);
                    // Highlight selected group
                    Array.from(groupsList.children).forEach(child => child.classList.remove('active'));
                    li.classList.add('active');
                });
                groupsList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'No groups found.';
            groupsList.appendChild(li);
        }
    } catch (error) {
        groupsCountContainer.innerText = 'Error loading groups. Please try again later.';
        console.error('Error fetching groups:', error);
    }

    // Load messages for a group
    async function loadMessages(groupId) {
        messagesContainer.style.display = 'block';
        messageInput.style.display = 'inline-block';
        sendButton.style.display = 'inline-block';
        messagesContainer.innerHTML = 'Loading messages...';

        try {
            const response = await fetch(`http://localhost:5000/group/${groupId}/messages`);
            if (!response.ok) throw new Error('Failed to fetch messages');
            const messages = await response.json();
            displayMessages(messages);
        } catch (error) {
            messagesContainer.innerText = 'Error loading messages.';
            console.error('Error fetching messages:', error);
        }
    }

    // Display messages in the messages container
    function displayMessages(messages) {
        messagesContainer.innerHTML = '';
        if (messages.length === 0) {
            messagesContainer.innerText = 'No messages in this group.';
            return;
        }
        messages.forEach(msg => {
            const div = document.createElement('div');
            div.textContent = `${msg.name}: ${msg.message}`;
            div.classList.add('message');
            if (msg.user_id == userId) {
                div.classList.add('own');
            } else {
                div.classList.add('other');
            }
            messagesContainer.appendChild(div);
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Send message event
    sendButton.addEventListener('click', async () => {
        const message = messageInput.value.trim();
        if (!message) return;

        if (!selectedGroupId) {
            alert('Please select a group first.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/group/${selectedGroupId}/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    message: message
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            messageInput.value = '';
            loadMessages(selectedGroupId);
        } catch (error) {
            alert('Error sending message. Please try again.');
            console.error('Error sending message:', error);
        }
    });
});
