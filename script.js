// Search Meal Function

async function searchMeal() {

    let meal = document.getElementById("searchInput").value.trim();

    let recipeContainer = document.getElementById("recipeContainer");
    let loading = document.getElementById("loading");
    let error = document.getElementById("error");
    let resultCount = document.getElementById("resultCount");
    recipeContainer.innerHTML = "";
    error.innerHTML = "";

    if (meal == "") {
        error.innerHTML = "Please enter a meal name.";
        return;
    }

    loading.style.display = "block";

    try {

        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);

        const data = await response.json();

        loading.style.display = "none";

        if (data.meals == null) {

    resultCount.innerHTML = "0 Recipes Found";

    error.innerHTML = "No meals found!";

    return;
}
resultCount.innerHTML = `
<div class="result-box">
    🍽️ <span>${data.meals.length}</span> Recipes Found
</div>
`;        data.meals.forEach(item => {

            recipeContainer.innerHTML += `

            <div class="card">

                <img src="${item.strMealThumb}">

                <div class="card-content">

                    <h2>${item.strMeal}</h2>

                    <p><b>Category :</b> ${item.strCategory}</p>

                    <p><b>Cuisine :</b> ${item.strArea}</p>

                    <button onclick="showRecipe(${item.idMeal})">
                        View Recipe
                    </button>

                </div>

            </div>

            `;

        });

    }

    catch (err) {

        loading.style.display = "none";

        error.innerHTML = "Something went wrong!";
    }

}


// View Recipe

async function showRecipe(id) {

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

    const data = await response.json();

    const meal = data.meals[0];

    document.getElementById("modalImage").src = meal.strMealThumb;

    document.getElementById("modalTitle").innerHTML = meal.strMeal;

    document.getElementById("modalCategory").innerHTML = meal.strCategory;

    document.getElementById("modalArea").innerHTML = meal.strArea;

    document.getElementById("modalInstructions").innerHTML = meal.strInstructions;

    let ingredientList = document.getElementById("ingredientsList");

    ingredientList.innerHTML = "";

    for (let i = 1; i <= 20; i++) {

        let ingredient = meal["strIngredient" + i];

        let measure = meal["strMeasure" + i];

        if (ingredient && ingredient.trim() != "") {

            ingredientList.innerHTML +=

                `<li>${ingredient} - ${measure}</li>`;
        }

    }

    document.getElementById("recipeModal").style.display = "block";

}


// Close Modal

function closeModal() {

    document.getElementById("recipeModal").style.display = "none";

}


// Close Modal when clicking outside

window.onclick = function (event) {

    let modal = document.getElementById("recipeModal");

    if (event.target == modal) {

        modal.style.display = "none";
    }

}