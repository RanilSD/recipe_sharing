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
       `<div class="card small">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="${results.recipe.image}">
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${results.recipe.label}<i class="material-icons right">more_vert</i></span>
        <p><a href="${results.recipe.url}">View Recipe</a></p>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">${results.recipe.label}<i class="material-icons right">close</i></span>
        <p><b>Calories :</b> ${results.recipe.calories.toFixed(2)}</p>
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
                var foodSearchListList = document.createElement("button");
                foodSearchList.classList.add("search");
                foodSearchList.textContent = `${history[i]}`;
                foodSearchList.setAttribute("data-index", i);
                searchHistoryEl.prepend(foodSearchList);
                foodSearchList.addEventListener("click", function () {
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