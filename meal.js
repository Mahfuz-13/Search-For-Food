const searchFood = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    if(searchField.value == ''){
        const div = document.createElement('div');
        div.classList.add('div');
        const h1 = document.createElement('h1');
        h1.innerText = 'Please Search Something'
        div.appendChild(h1);
    }
    else{
            // Load Data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        fetch(url)
        .then(res=>res.json())
        .then(data=>displaySearchResult(data.meals));
    }
        // Clear Data
    searchField.value = '';

}



const displaySearchResult = meals=>{
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = ''
    meals.forEach(meal =>{
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
    <div onclick='loadMealDetails(${meal.idMeal})' class="card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
        </div>
    </div>
      `
        searchResult.appendChild(div)
    })
}


const loadMealDetails = mealId =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
    .then(res=>res.json())
    .then(data=> displayMealDetails(data.meals[0]))
}


const displayMealDetails = meal =>{
    console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML=`
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions}</p>
      <a target="_blank" href="${meal.strYoutube}" class="btn btn-primary">Youtube</a>
    </div>
    `
    mealDetails.appendChild(div);
}