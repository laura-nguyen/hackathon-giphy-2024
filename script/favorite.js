document.addEventListener('DOMContentLoaded', function() {
    const favoritesContainer = document.getElementById('favoritesContainer');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    console.log('Favorites on load:', favorites);

    favorites.forEach((item) => {
        const favoriteElement = document.createElement('div');
        favoriteElement.classList.add('favoriteContainer');
        favoriteElement.innerHTML = `
            <p>${item.prompt}</p>
            <img src="${item.gifUrl}" alt="Gif">
            <button class="remove-btn" data-id="${item.id}">Remove</button>
        `;
        favoritesContainer.appendChild(favoriteElement);
    });

    favoritesContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-btn')) {
            const id = e.target.getAttribute('data-id');
            console.log('Removing item with id:', id);
            removeFromFavorites(id);
        }
    });
});

function removeFromFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => fav.id !== id); // Filter out the item to remove
    localStorage.setItem('favorites', JSON.stringify(favorites)); // Update local storage
    console.log('Updated favorites:', favorites);
    const elementToRemove = document.querySelector(`.remove-btn[data-id="${id}"]`).parentElement;
    if (elementToRemove) {
        elementToRemove.remove(); 
    }
}
