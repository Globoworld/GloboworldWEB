document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var query = document.getElementById('search-input').value;
    if (query) {
        performSearch(query);
    }
});

function performSearch(query) {
    var resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Pulisce i risultati precedenti

    var apiKey = 'AIzaSyCQidRcAS6YvQwMYb2Ij0ZkuM_pQGA_Lo8';  // Sostituisci con la tua chiave API
    var cx = 'e58a5ac12ce85427c';  // Sostituisci con il tuo motore di ricerca personalizzato ID
    var url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${cx}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.items.forEach(item => {
                var resultDiv = document.createElement('div');
                resultDiv.classList.add('result');

                var resultTitle = document.createElement('h2');
                var resultLink = document.createElement('a');
                resultLink.href = item.link;
                resultLink.textContent = item.title;
                resultTitle.appendChild(resultLink);

                var resultDescription = document.createElement('p');
                resultDescription.textContent = item.snippet;

                resultDiv.appendChild(resultTitle);
                resultDiv.appendChild(resultDescription);

                resultsContainer.appendChild(resultDiv);
            });
        })
        .catch(error => {
            console.error('Errore durante la ricerca:', error);
        });
}
