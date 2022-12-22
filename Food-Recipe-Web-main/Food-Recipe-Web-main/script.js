const searchBtn = document.getElementById('search-btn');
const mealList =  document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const container = document.querySelector('.container');
const main = document.querySelector('.main');


searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getmealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`).then(response => response.json())
    .then(data =>{
        let html = "";
        
        if(data.meals && searchInputTxt != ""){
                document.body.style.background = "#fff";
            data.meals.forEach(meal =>{
                html += `
                        <div class="meal-item" data-id =  "${meal.idMeal}">
                        <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="food" />
                        </div>
                        <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                        </div>
                `;
            });
            mealList.classList.remove('notFound');
        }else{
            html = "Sorry, We didn't find any meal"
            mealList.classList.add('notFound');
            // document.body.style.background = 'url("https://source.unsplash.com/1600x900/?food")';
        }
        mealList.innerHTML = html;
    });
}

// get recipe of the meal

function getmealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`).then(response => response.json())
        .then(data => mealRecipeModal(data.meals));

    }

}

//  create a modal
function mealRecipeModal(meal){
    meal = meal[0];
    let html = `
 
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <div class="recipe-category"><h3>${meal.strCategory}</h3></div>
    <div class="recipe-instruct">
      <h3>Instructions</h3>
      <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
      <img src="${meal.strMealThumb}" alt="" />
    </div>
    <div class="recipe-link">
      <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}