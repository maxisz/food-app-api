const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const cartList = document.getElementById('cartegory');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

window.onload = function() {
    let items=['rice','cucumber','bread','egg'];
    let searchInputTxt = items[getRandomInt(4)];
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });

  };

// get meal list that matches with the ingredients
function getMealList(){
    setTimeout(() => { window.scrollTo(0, 620); }, 20);
    
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}

// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal){
    meal = meal[0];
    
    console.log(meal);
    
  

    
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
        <div class="meal-result">
        <p class="title">Ingredients</p>
        <img class="ingredient" src="https://www.themealdb.com/images/ingredients/${meal.strIngredient1}.png" alt="" >
        <img class="ingredient" src="https://www.themealdb.com/images/ingredients/${meal.strIngredient2}.png" alt="" >
        
        <img class="ingredient" src="https://www.themealdb.com/images/ingredients/${meal.strIngredient3}.png" alt="" >
        <img class="ingredient" src="https://www.themealdb.com/images/ingredients/${meal.strIngredient4}.png" alt="" >
        <img class="ingredient" src="https://www.themealdb.com/images/ingredients/${meal.strIngredient5}.png" alt="" >
        <img class="ingredient" src="https://www.themealdb.com/images/ingredients/${meal.strIngredient6}.png" alt="" >
        <img class="ingredient" src="https://www.themealdb.com/images/ingredients/${meal.strIngredient7}.png" alt="" >
        <img class="ingredient" src="https://www.themealdb.com/images/ingredients/${meal.strIngredient8}.png" alt="" >
        <img class="ingredient" src="https://www.themealdb.com/images/ingredients/${meal.strIngredient9}.png" alt="" >
        <img class="ingredient" src="https://www.themealdb.com/images/ingredients/${meal.strIngredient10}.png" alt="" >
        <img class="ingredient" src="https://www.themealdb.com/images/ingredients/${meal.strIngredient11}.png" alt="" >
        <img class="ingredient" src="https://www.themealdb.com/images/ingredients/${meal.strIngredient12}.png" alt="" >
        <img class="ingredient" src="https://www.themealdb.com/images/ingredients/${meal.strIngredient13}.png" alt="" >
        </div>  
        <h2 class="title" >Instructions:</h3>
            <p class="title" >${meal.strInstructions}</p>

            
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
        <cite>made by Maxisz</cite> check my <a href="http://maxisz.ga/" target="blank"> portfolio</a>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
    //
    //console.log(image);
}
