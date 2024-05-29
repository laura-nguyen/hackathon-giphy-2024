const apiKey = '0thCxkVC9t6pASWSYfxwUsReCPVxluoV';
let currentPrompt = 'How do you feel on a Monday morning?';

async function getNewPrompt() {
    const prompts = [
        "How do you feel on a Monday morning?",
        "Describe your weekend.",
        "Express your reaction to winning a lottery.",
        "What do you think about your favorite food?",
        "How do you feel about rain?",
        "What was your last vacation like?",
        "Show your reaction to meeting a celebrity.",
        "How do you feel about your favorite movie?",
        "Describe your morning routine.",
        "What is your reaction to a surprise party?",
        "How do you feel when you get a new job?",
        "Express your reaction to seeing a beautiful sunset.",
        "How do you feel about your favorite hobby?",
        "Describe your reaction to bad news.",
        "What is your reaction to a funny joke?",
        "How do you feel when you are stuck in traffic?",
        "Describe your reaction to finding money on the ground.",
        "How do you feel about your favorite holiday?",
        "What is your reaction to a scary movie?",
        "Describe your reaction to trying a new food.",
        "How do you feel about waking up early?",
        "What is your reaction to a thunderstorm?",
        "How do you feel when you receive a gift?",
        "Describe your reaction to a sports victory.",
        "How do you feel about working out?",
        "What is your reaction to a difficult challenge?",
        "How do you feel when you see a cute animal?",
        "Describe your reaction to hearing your favorite song.",
        "How do you feel about the beach?",
        "What is your reaction to a good book?",
        "Describe your reaction to a long weekend.",
        "How do you feel about a spontaneous adventure?",
        "What is your reaction to a crowded place?",
        "How do you feel when you accomplish a goal?",
        "Describe your reaction to a new technology.",
        "How do you feel about your favorite season?",
        "What is your reaction to a romantic gesture?",
        "How do you feel about learning something new?",
        "Describe your reaction to an unexpected visitor."
    ];
    
    currentPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    document.getElementById('prompt').innerText = currentPrompt;
}

async function fetchTrendingGifs() {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&rating=g&bundle=messaging_non_clips`;
    const response = await fetch(url);
    const result = await response.json();
    displayGifs(result.data);
}

async function searchGifs() {
    const query = document.getElementById('searchInput').value;
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=25&rating=g&bundle=messaging_non_clips`;
    const response = await fetch(url);
    const result = await response.json();
    displayGifs(result.data);
}

async function fetchRandomGif() {
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&rating=g&bundle=messaging_non_clips`;
    const response = await fetch(url);
    const result = await response.json();
    displayGifs([result.data]);
}

function displayGifs(gifs) {
    
    const gifsContainer = document.getElementById('gifsContainer');
    gifsContainer.innerHTML = '';
    gifs.forEach(gif => {
        const gifElement = document.createElement('div');
        gifElement.classList.add('gifContainer');

        const img = document.createElement('img');
        img.src = gif.images.fixed_height.url;
        img.alt = 'gif';
        gifElement.appendChild(img);
        
        const button = document.createElement('button');
        button.innerHTML = '♡';
        button.onclick = function() {
            addToFavorites(gif);
            button.innerHTML = '❤';
        };   
        gifElement.appendChild(button);  
        gifsContainer.appendChild(gifElement);
    });
}

function addToFavorites(gif) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(fav => fav.id === gif.id)) { // Prevent duplicates
        favorites.push({ id: gif.id, prompt: currentPrompt, gifUrl: gif.images.fixed_height.url });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Added to favorites');
    } else {
        alert('This gif is already in favorites');
    }
}

document.getElementById('newPrompt').addEventListener('click', getNewPrompt);
document.getElementById('searchGifs').addEventListener('click', searchGifs);
document.getElementById('surpriseMe').addEventListener('click', fetchRandomGif);
fetchTrendingGifs();
