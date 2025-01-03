// leaderboard.js
document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch leaderboard data
    async function fetchLeaderboardData(difficulty) {
        try {
            const response = await fetch(`/api/leaderboard/${difficulty}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch leaderboard data');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching leaderboard data:', error);
            return [];
        }
    }

    // Function to update leaderboard display
    async function updateLeaderboard(difficulty) {
        const leaderboardList = document.getElementById('leaderboardList');
        leaderboardList.innerHTML = ''; // Clear existing content
        
        const players = await fetchLeaderboardData(difficulty);
        
        players.forEach((player, index) => {
            const li = document.createElement('li');
            li.className = 'leaderboard-item';
            li.innerHTML = `
                <span class="rank">${index + 1}</span>
                <div class="player-info">
                    <img src="${player.avatar}" alt="${player.username}" class="player-avatar">
                    <span>${player.username}</span>
                </div>
                <span class="score">${player.score}%</span>
            `;
            leaderboardList.appendChild(li);
        });
    }

    // Handle tab switching
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            updateLeaderboard(tab.dataset.difficulty);
        });
    });

    // Initialize with easy difficulty
    updateLeaderboard('easy');
});