
const cartList = document.getElementById('cartegory');



// event listeners




window.onload = function() {
    getCartegory();
  
  };


//get cartegories
function getCartegory(){
   
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.categories){
            data.categories.forEach(meal => {
                var truncString = meal.strCategoryDescription.substring(0, 400);
                html += `
                <div class = "meal-item" data-id = "${meal.idCategory}">
                        <div class = "meal-img">
                            <img src = "${meal.strCategoryThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                        <h3>${meal.strCategory}</h3>
                            <p class="descript">${truncString}</span>
                            <a href = "" class = "recipe-btn">Explore</a>
                        </div>
                    </div>
                `;
                
            });
            cartList.innerHTML=html; 
        }
      
       
    });
   ;
}
