// profile.js
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Fetch user data from your API
        const response = await fetch('/api/user-profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();

        // Update profile information
        document.getElementById('username').textContent = userData.username;
        document.getElementById('userEmail').textContent = userData.email;

        // Populate games history
        const gamesHistory = document.getElementById('gamesHistory');
        gamesHistory.innerHTML = ''; // Clear existing content

        userData.games.forEach(game => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${game.date}</td>
                <td>${game.score}</td>
                <td>${game.timePerQuestion}</td>
            `;
            gamesHistory.appendChild(row);
        });

        // Update total scores
        document.getElementById('easyScore').textContent = userData.totalScores.easy;
        document.getElementById('mediumScore').textContent = userData.totalScores.medium;
        document.getElementById('hardScore').textContent = userData.totalScores.hard;

    } catch (error) {
        console.error('Error fetching profile data:', error);
        // Handle error - show error message to user
    }
});