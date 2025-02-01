function createList() {
    const list = document.createElement('div');
    list.className = 'list';

    const listHeader = document.createElement('div');
    listHeader.className = 'list-header';

    const listTitle = document.createElement('input');
    listTitle.type = 'text';
    listTitle.placeholder = 'Enter list title...';
    listHeader.appendChild(listTitle);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-list';
    deleteButton.textContent = 'X';
    deleteButton.onclick = () => {
        document.getElementById('lists-container').removeChild(list);
        saveState();
    };
    listHeader.appendChild(deleteButton);

    list.appendChild(listHeader);

    const addCardButton = document.createElement('button');
    addCardButton.className = 'add-card';
    addCardButton.textContent = '+ Add a card';
    addCardButton.onclick = () => {
        const card = createCard();
        list.appendChild(card);
        saveState();
    };
    list.appendChild(addCardButton);

    document.getElementById('lists-container').appendChild(list);
    return list;
}