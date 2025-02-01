function createCard() {
    const card = document.createElement('div');
    card.className = 'card';
    card.draggable = true;

    const cardHeader = document.createElement('input');
    cardHeader.type = 'text';
    cardHeader.placeholder = 'Enter header...';
    cardHeader.className = 'card-header';
    card.appendChild(cardHeader);

    const cardDesc = document.createElement('textarea');
    cardDesc.placeholder = 'Enter description...';
    cardDesc.className = 'card-desc';
    card.appendChild(cardDesc);

    const creationTime = document.createElement('div');
    creationTime.className = 'creation-time';
    creationTime.textContent = new Date().toLocaleString();
    card.appendChild(creationTime);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-card';
    deleteButton.textContent = '✗';
    deleteButton.onclick = () => {
        card.remove();
        saveState();
    };
    card.appendChild(deleteButton);

    cardHeader.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            cardDesc.focus();
        }
    });

    cardDesc.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const newCard = createCard();
            card.parentNode.insertBefore(newCard, card.nextSibling);
            newCard.querySelector('.card-header').focus();
            saveState();
        }
    });

    card.ondragstart = (event) => {
        event.dataTransfer.setData('text/plain', event.target.dataset.id);
    };

    card.ondragover = (event) => {
        event.preventDefault();
    };

    card.ondrop = (event) => {
        event.preventDefault();
        const id = event.dataTransfer.getData('text');
        const draggable = document.querySelector(`[data-id="${id}"]`);
        const targetList = event.currentTarget.closest('.list');
        targetList.appendChild(draggable);
        sortCardsByCreationTime(targetList);
        saveState();
    };

    return card;
}

function sortCardsByCreationTime(list) {
    const cards = Array.from(list.querySelectorAll('.card'));
    cards.sort((a, b) => {
        const timeA = new Date(a.querySelector('.creation-time').textContent);
        const timeB = new Date(b.querySelector('.creation-time').textContent);
        return timeB - timeA;
    });
    cards.forEach(card => list.appendChild(card));
}