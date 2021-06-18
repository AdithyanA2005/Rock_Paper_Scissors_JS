const game_container = document.getElementById('game_container');
const startup_container = document.getElementById('game_start_up_container');


function ok_guide() {
    // This function will hide the guide and show the game
    startup_container.style.display = 'none';
    game_container.style.display = 'flex';
};

document.onkeydown = (e) => {
    console.log(e.key);
}

