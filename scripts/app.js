document.addEventListener('DOMContentLoaded', () => {
    const addListButton = document.getElementById('add-list');
    addListButton.onclick = () => {
        const list = createList();
        document.getElementById('lists-container').appendChild(list);
        saveState();
    };
    loadState();
});