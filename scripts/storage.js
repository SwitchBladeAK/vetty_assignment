function saveState() {
    const lists = [];
    document.querySelectorAll('.list').forEach(list => {
        const cards = [];
        list.querySelectorAll('.card').forEach(card => {
            cards.push({
                header: card.querySelector('.card-header').value,
                desc: card.querySelector('.card-desc').value,
                creationTime: card.querySelector('.creation-time').textContent
            });
        });
        lists.push({
            title: list.querySelector('.list-header input').value,
            cards: cards
        });
    });
    localStorage.setItem('boardState', JSON.stringify(lists));
}

function loadState() {
    const savedState = localStorage.getItem('boardState');
    if (savedState) {
        const lists = JSON.parse(savedState);
        lists.forEach(listData => {
            const list = createList();
            list.querySelector('.list-header input').value = listData.title;
            listData.cards.forEach(cardData => {
                const card = createCard();
                card.querySelector('.card-header').value = cardData.header;
                card.querySelector('.card-desc').value = cardData.desc;
                card.querySelector('.creation-time').textContent = cardData.creationTime;
                list.appendChild(card);
            });
            document.getElementById('lists-container').appendChild(list);
        });
    }
}