const row = document.querySelector('.row');

const formatedPopulation = (population) => {
    if(population < 1000) {
        return population.toLocaleString() + ' people';
    } else if(population < 1000000) {
        return (population / 1000).toFixed(1) + ' K';
    } else {
        return (population/ 1000000).toFixed(1) + ' mln'
    }
};

const getLangs = (languages) => {
    return Object.values(languages).join(', ');
};

const getCurrencies = (currencies) => {
    return Object.values(currencies).map(currency => {
        let symbol = currency.symbol ? currency.symbol : '';
        let name = currency.name ? currency.name : '';
        return `${name} (${symbol})`;
    }).join(', ');
};

const renderCards = (data) => {
    for(let i = 0; i < data.length; i += 4){
        let src = data[i].flags.svg;
        let country = data[i].name.official;
        let region = data[i].region;
        let population = data[i].population;
        let formatedPop = formatedPopulation(population);
        let langs = getLangs(data[i].languages);
        let currencies = data[i].currencies ? getCurrencies(data[i].currencies) : 'Нет валюты';
        
        row.insertAdjacentHTML('beforeend', `
        <div class="col">
            <div class="card h-100">
                <img src="${src}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${country}</h5>
                    <p class="card-text">${region}</p>
                    <p class="card-text">&#128106; ${formatedPop}</p>
                    <p class="card-text"></p>&#128227; ${langs}</p>
                    <p class="card-text">&#128176; ${currencies}</p>
                </div>
            </div>
        </div>
        `);
    }
};

fetch('https://restcountries.com/v3.1/all')
.then((responce) => responce.json())
.then((data) => {
    renderCards(data);
});
