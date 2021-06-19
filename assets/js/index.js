const startup_container = document.getElementById('game_start_up_container');
const modal_subheading = document.getElementById('modal_body_subheading');
const modal_heading = document.getElementById('modal_body_heading');
const game_container = document.getElementById('game_container');
const modal_button = document.getElementById('modal_btn');
const modal = document.getElementById("winner_container");
const c_score = document.getElementById('computer_score');
const modal_img = document.getElementById('modal_image');
const p_score = document.getElementById('player_score');
const c_scissor = document.getElementById('c_scissor');
const p_scissor = document.getElementById('p_scissor');
const p_paper = document.getElementById('p_papaer');
const c_paper = document.getElementById('c_paper');
const p_rock = document.getElementById('p_rock');
const cards = document.querySelectorAll('.card');
const c_rock = document.getElementById('c_rock');

let score_of_computer = 0;
let score_of_player = 0;
let start_game = false;



function retry() {
    close_winner_modal();
    start_game = true;
};

function open_winner_modal(winner) {
    start_game = false;
    if (winner === 'computer') {
        modal_img.src = 'assets/images/failed.webp';
        
        modal_heading.innerHTML = "Sorry, You Failed try again";
        modal_subheading.innerHTML = "Click on the below button to try again";

        modal_heading.classList.add('lightred');
        modal_subheading.classList.add('pink')

        modal_btn.classList.add('blightred');
        modal_btn.innerHTML = "Try Again";
    }
    else {
        modal_img.src = 'assets/images/winner.jpg';

        modal_heading.innerHTML = "Wow You are a Winner";
        modal_subheading.innerHTML = "Click on the below button to restart the game";

        modal_heading.classList.add('limegreen');
        modal_subheading.classList.add('lightgreen');

        modal_btn.classList.add('blightgreen');
        modal_btn.innerHTML = "Play Again";
    }
    
    modal.classList.remove('dnone');
};

function close_winner_modal() {
  modal.classList.add('dnone');
};

function ok_guide() {
    // This function will hide the guide and show the game
    startup_container.classList.add('dnone');
    game_container.classList.remove('dnone');
    start_game = true;
};

function generate_computer_wepon() {
    // This function will generate a wepon for the computer randomly
    // 1 - Rock 
    // 2 - Paper 
    // 3 - Scissors

    let wepon = null;
    let random_integer = Math.floor(Math.random() * 3) + 1;

    if (random_integer === 1) {
        wepon = c_rock;
    } 
    else if (random_integer === 2) {
        wepon = c_paper;
    } 
    else if (random_integer === 3) {
        wepon = c_scissor;
    }

    return wepon;
};

function show_cards(computer_wepon, player_wepon){
    // This Function will first hide all the cards 
    // Then it will show the cards provided in params 

    cards.forEach((card) => card.classList.add('dnone'));
    computer_wepon.classList.remove('dnone');
    player_wepon.classList.remove('dnone');
};

function fight(player_wepon) {
    let computer_wepon = generate_computer_wepon();
    show_cards(computer_wepon, player_wepon);

    if(player_wepon === p_rock) {
        if (computer_wepon === c_paper) { score_of_computer += 1; }
        else if (computer_wepon === c_scissor) { score_of_player += 1; }
    }
    else if(player_wepon === p_paper) {
        if (computer_wepon === c_scissor) { score_of_computer += 1; }
        else if (computer_wepon === c_rock) {score_of_player += 1; }
    }
    else {
        if (computer_wepon === c_rock) { score_of_computer += 1; }
        else if (computer_wepon === c_paper) { score_of_player += 1; }
    }
};

function find_winner() {
    c_score.innerHTML = score_of_computer;
    p_score.innerHTML = score_of_player;

    if(score_of_computer === 10) {
        open_winner_modal('computer');
        score_of_computer = 0;
    } 
    else if (score_of_player === 10) {
        open_winner_modal('player')
        score_of_player = 0;
    }
};


game_container.classList.add('dnone');
modal.classList.add('dnone');

c_score.innerHTML = 0;
p_score.innerHTML = 0;

document.onkeydown = (e) => {
    let pressed_key = e.key.toLowerCase();
    console.log(pressed_key);
    if(start_game){
        if (pressed_key === 'a') {
            fight(p_rock); 
        } 
        else if (pressed_key === 's') {
            fight(p_paper); 
        }
        else if (pressed_key === 'd') {
            fight(p_scissor);
        }
    }
    else {
        if (pressed_key === 'enter') {
            close_winner_modal();
            ok_guide();
            score_of_computer = 0;
            score_of_player = 0;
        }
    }
    find_winner();
};