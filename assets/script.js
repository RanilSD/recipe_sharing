const grid = document.querySelector('.popularFood')
const full=document.querySelector('.fullscreen')

// the api call
async function recipeCall(appendTo) {
    const randomId = 52764 + Math.floor(Math.random() * 235) 

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomId}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
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





// recicipe call on each image
const contentImg = document.querySelectorAll('.content-img');
const escImg=document.querySelector('.escImg')
contentImg.forEach(element => {
    recipeCall(element);
    element.addEventListener('click',()=>{
        grid.style.display='none'
        escImg.style.display='block'
        full.style.display='grid'
        fullScreen(element)
        
        let clicked=true;
        const recipeSpan = document.querySelector('.recipeSpan img')
        const instruct = document.querySelector('.instruct')
        recipeSpan.addEventListener('click',()=>{     
            if(clicked){
                instruct.style.display = 'none'
                split()   
                clicked = false;
            }
            else{
                instruct.style.display = '' 
                const instructFull = document.querySelector('.instructFull')
                instructFull.innerHTML=''
                clicked=true;
            }

        })

        escImg.addEventListener('click',()=>{
            grid.style.display = 'block'
            escImg.style.display = 'none'
            full.style.display = 'none'
        })
    })
});

// veiw the content of each image
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

function split(){
    const instruct = document.querySelector('.instruct').textContent
    const instructFull=document.querySelector('.instructFull')
    
    const result = instruct.match(/[^\.!\?]+[\.!\?]+/g);
    result.forEach(element=>{
        const div = document.createElement('div')

        const check=document.createElement('input')
        check.type='checkbox'
        check.addEventListener('change', function () {
            if (this.checked) {
                instructLi.style.textDecoration = 'line-through';
                instructLi.style.textDecorationColor = 'green';
            } else {
                instructLi.style.textDecoration = 'none';
            }
        });

        const instructLi=document.createElement('li')
        instructLi.textContent=element

        div.appendChild(check)
        div.appendChild(instructLi)

        instructFull.appendChild(div)
    })
    
}  
