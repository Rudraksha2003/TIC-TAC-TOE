// mode_script.js

function selectMode(mode) {
    // Your existing code for handling mode selection

    // Redirect to the game screen based on the selected mode
    if (mode === 'computer') {
        window.location.href = 'game_screen.html?mode=computer';
    } else if (mode === 'friend') {
        window.location.href = 'game_screen.html?mode=friend';
    }
}

function redirectToIndex() {
    // Redirect back to the index.html
    window.location.href = 'index.html';
}
