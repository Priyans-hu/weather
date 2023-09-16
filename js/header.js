const toggleButton = document.getElementById('toggleButton');
const searchContainer = document.getElementById('searchContainer');

toggleButton.addEventListener('click', () => {
    searchContainer.classList.toggle('hidden');
});