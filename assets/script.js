async function recipeCall() {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=A';
    try {
        const response = await fetch(url);
        const result = await response.json(); // Parse response as JSON
        console.log(result.meals);
        result.meals.forEach(Element=>{
            for(const property in Element){
                const pElement=document.createElement('p')
                pElement.textContent=property
                console.log(pElement)
            }
        })
    } catch (error) {
        console.error(error);
    }
}
recipeCall();

