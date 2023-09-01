const grid = document.querySelector('.popularFood')
const full=document.querySelector('.fullscreen')

async function recipeCall(appendTo) {
    const randomId = 52764 + Math.floor(Math.random() * 235) 

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomId}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        const meal = data.meals[0];
        //Meal image
        const mealImage = meal.strMealThumb;
        appendTo.src = mealImage;


        //Meal Info
        appendTo.setAttribute('data-name', meal.strMeal);
        appendTo.setAttribute('data-instruct', meal.strInstructions);
        appendTo.setAttribute('data-source', meal.strSource);
        appendTo.setAttribute('data-youtube', meal.strYoutube);

        //loop to get ingreditents 
        //accoring to the api 20 total ingredients
        for (let i = 1; i <= 20; i++) {
            const ingredientKey = `strIngredient${i}`;
            const ingredientValue = meal[ingredientKey];

            if (ingredientValue) {
                appendTo.setAttribute(`data-ingredient${i}`, ingredientValue);
            }

        }

        for (let i = 1; i <= 20; i++) {
            const ingredientKey = `strMeasure${i}`;
            const ingredientValue = meal[ingredientKey];

            if (ingredientValue) {
                appendTo.setAttribute(`data-measure${i}`, ingredientValue);
            }

        }

    } catch (error) {
        console.error(error);
    }
}

const contentImg = document.querySelectorAll('.content-img');
contentImg.forEach(element => {
    recipeCall(element);
    element.addEventListener('click',()=>{
        grid.style.display='none'
        full.style.display='grid '
        fullScreen(element)
    })
});

function fullScreen(element){
    const thumb=document.querySelector('.thumbNail')
    const name=document.querySelector('.name')
    const instruct=document.querySelector('.instruct')
    const source=document.querySelector('.source')
    const youtube=document.querySelector('.youtube')
    const ingredient = document.querySelector('.Ingredients')
    const measure=document.querySelector('.measure')

    name.textContent=element.getAttribute('data-name')
    instruct.textContent=element.getAttribute('data-instruct')
    source.href=element.getAttribute('data-source')
    youtube.href=element.getAttribute('data-youtube')
    thumb.src=element.src

    for (let i = 1; i <= 20; i++) {
        const ingredientValue = element.getAttribute(`data-ingredient${i}`);
        const measureValue = element.getAttribute(`data-measure${i}`);
        if (ingredientValue && measureValue) {
            const liElement = document.createElement('li');
            liElement.textContent = `${ingredientValue} ${measureValue}`;
            ingredient.appendChild(liElement);
        }
    }
}

