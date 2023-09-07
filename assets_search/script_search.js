var form = document.querySelector('form');
var searchResult = document.querySelector('.search');
var container = document.querySelector('.container');
let userQuery = '';



var ID = '9f670c22';
var KEY = 'caba1f8a7e18bad86b2babf5a09611bb';

form.addEventListener('submit', (e) => {
    e.preventDefault();

    userQuery = e.target.querySelector('input').value;
    console.log(userQuery);
    fetchData();
});

async function fetchData() {
    const baseUrl = `https://api.edamam.com/search?q=${userQuery}&app_id=${ID}&app_key=${KEY}`;
    const response = await fetch(baseUrl);
    const data = await response.json();
    createContent(data.hits);
    console.log(data);
}

function createContent(results) {
    initalContent = '';

    results.map(results => {
        initalContent +=
            `<div class="search">
        <div class="item">
            <img src="${results.recipe.image}" alt="">
            <div class="flex-container">
                <h1 class="title">${results.recipe.label}</h1>
                <a class="view-bin" target="_blank" href="${results.recipe.url}">View Recipe</a>
            </div>
            <p class="recipe-desc">Calories : ${results.recipe.calories.toFixed(2)}</p>
        </div>
    </div>
        `
    })

    function renderStorage() {
        var history = JSON.parse(localStorage.getItem('past-searches')) || [];
        console.log(history);
        if (history.length === 0) {
            return;
        } else {
            var searchHistoryEl = document.querySelector("#search_history");
            searchHistoryEl.innerHTML = "";
            var searchHistory = JSON.parse(localStorage.getItem(history)) || [];
            for (var i = 0; i < history.length; i++) {
                var cityList = document.createElement("button");
                cityList.classList.add("search");
                cityList.textContent = `${history[i]}`;
                cityList.setAttribute("data-index", i);
                searchHistoryEl.prepend(cityList);
                cityList.addEventListener("click", function () {
                    searchApi(this.textContent);
                }, false);
            }
        }
    }

    function saveToStorage(foodSearch) {
        var history = JSON.parse(localStorage.getItem('past-searches')) || [];
        if (!history.includes(foodSearch)) {
            history.push(foodSearch);
            if (history.length > 5) {
                history.shift();
            }
        }
        localStorage.setItem('past-searches', JSON.stringify(history));
        renderStorage();
        show(horizontalLineEl);
    }

    searchResult.innerHTML = initalContent;
}