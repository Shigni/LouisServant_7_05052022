import { recipes } from "../recipes.js";
import recipeClass from "../factory/recipeFactory.js";

const searchInput = document.getElementById("main_search_bar")
const inputIngredient = document.getElementById("search_input_ingredient")
const inputUstensil = document.getElementById("search_input_ustensil")
const inputAppareil = document.getElementById("search_input_appareil")
const recipeContainer = document.getElementById("recipe_container")
const tagContainer = document.querySelectorAll(".tag_container")
const tagArray = document.getElementById("tag_array")
const errorText = document.getElementById("error")

let ingredients = []
let ingredientsArr = []
let appareils = []
let appareilsArr = []
let ustensils = []
let ustensilsArr = []
let searchWord = ""
let valid = false

var foundArray = []
var foundArrayTemp = []

function ingredientsFilter(arr) {
    ingredientsArr = []
    arr.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredientsArr.push(ingredient.ingredient.toLowerCase())
            ingredients = [...new Set(ingredientsArr)].sort()
        })
    })
    return ingredients
};

function appareilsFilter(arr) {
    appareilsArr = []
    arr.forEach(recipe => {
        appareilsArr.push(recipe.appliance.toLowerCase())
        appareils = [...new Set(appareilsArr)].sort()
    })
    return appareils
};

function ustensilsFilter(arr) {
    ustensilsArr = []
    arr.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            ustensilsArr.push(ustensil.toLowerCase())
            ustensils = [...new Set(ustensilsArr)].sort()
        })
    })
    return ustensils
};

function createRecipe(recipeArr) {
    recipeArr.map(function (recipe) {
        let showRecipe = new recipeClass(
            recipe.name,
            recipe.servings,
            recipe.time,
            recipe.ingredients,
            recipe.description,
            recipe.appliance,
            recipe.ustensils,
        )
        showRecipe.recipeCard()
    }).join("")
};

function inputValidation(value) {
    if (value < 3 && value > 0) {
        errorText.innerText = ""
        errorText.classList.remove("hidden")
        errorText.classList.add("error_text")
        errorText.innerText = "Veuillez saisir au moins 3 caractères."
        valid = false
        return valid
    } else {
        errorText.innerText = ""
        valid = true
        return valid
    }
};
//algo
function search(recipeArrays, value) {
    const foundArray = recipeArrays.filter((recipeArray) => {
        function listIngredient(){
            let x = ""
            recipeArray.ingredients.forEach(ingredient => {
                x += ingredient.ingredient.toLowerCase() + ' '
            });
            return x
        } 
        
        function listUstensil(){
            let y = ""
            recipeArray.ustensils.forEach(ustensil => {
                y += ustensil.toLowerCase() + ' '
            });
            return y
        }

        let isFound = recipeArray.name.toLowerCase().includes(value) ||
                    recipeArray.description.toLowerCase().includes(value) ||
                    listIngredient().includes(value) ||
                    listUstensil().includes(value) ||
                    recipeArray.appliance.toLowerCase().includes(value)

        return isFound
    });

    
    if(foundArray.length > 0){
        recipeContainer.innerHTML = ""
        ingredientsFilter(foundArray)
        appareilsFilter(foundArray)
        ustensilsFilter(foundArray)
        createRecipe(foundArray)
    } else {
        recipeContainer.innerHTML = `<span id="errorMessage">Aucune recette ne correspond à votre critère...vous pouvez chercher 'tarte aux pommes', 'poisson'. etc </span>`
    }

    foundArrayTemp = foundArray
    return foundArrayTemp, foundArray
};


createRecipe(recipes)
ingredientsFilter(recipes)
appareilsFilter(recipes)
ustensilsFilter(recipes)
searchInput.focus()


searchInput.addEventListener("input", (e) => {
    e.preventDefault()
    let searchKey = searchInput.value
    searchWord = searchKey.toLowerCase()
    searchWord = searchWord.trim()
    let searchWordLength = searchInput.value.length


    inputValidation(searchWordLength)
    if (valid === false) {
        return
    }
    search(recipes, searchWord)
})

function createTags(category){
    let createTag = `${category.map(function(item){
        return `<li class="tag cursor"> ${item}</li>`
    }).join('')} `
    return createTag
};

tagContainer.forEach(tagContainer =>{

    tagContainer.addEventListener('click', (e)=>{
        e.preventDefault()
        closeTag()

        const ulTagContent = tagContainer.nextElementSibling
        tagContainer.classList.add("active")

        if((tagContainer.classList.contains("active") && tagContainer.classList.contains("blue"))){
            ulTagContent.classList.add("ul_active")
            ulTagContent.innerHTML = createTags(ingredients)

            inputIngredient.classList.remove('hidden')
            inputIngredient.focus()
            tagCall("blue")

            inputIngredient.addEventListener('keyup', (e)=>{
                e.preventDefault()
                let searchInput = e.target.value.toLowerCase().trim()
                const tagsFound = ingredients.filter((ingredient)=>{
                    return ingredient.toLowerCase().includes(searchInput)
                })

                if(tagsFound.length > 0){
                    ulTagContent.innerHTML = createTags(tagsFound)
                } else {
                    ulTagContent.innerHTML = "Aucuns ingrédients ne correspond à votre recherche"
                }
                tagCall("blue")

            })

        } else if (tagContainer.classList.contains("active") && tagContainer.classList.contains("green")){
            ulTagContent.classList.add("ul_active")
            ulTagContent.innerHTML = createTags(appareils)

            inputAppareil.classList.remove('hidden')
            inputAppareil.focus()
            tagCall("green")

            inputAppareil.addEventListener('keyup', (e)=>{
                e.preventDefault()
                let searchInput = e.target.value.toLowerCase().trim()
                const tagsFound = appareils.filter((appareil)=>{
                    return appareil.toLowerCase().includes(searchInput)
                })

                if(tagsFound.length > 0){
                    ulTagContent.innerHTML = createTags(tagsFound)
                } else {
                    ulTagContent.innerHTML = "Aucuns ingrédients ne correspond à votre recherche"
                }
                tagCall("green")

            })

        } else if (tagContainer.classList.contains("active") && tagContainer.classList.contains("red")){
            ulTagContent.classList.add("ul_active")
            ulTagContent.innerHTML = createTags(ustensils)

            inputUstensil.classList.remove('hidden')
            inputUstensil.focus()
            tagCall("red")

            inputUstensil.addEventListener('keyup', (e)=>{
                e.preventDefault()
                let searchInput = e.target.value.toLowerCase().trim()
                const tagsFound = ustensils.filter((ustensil)=>{
                    return ustensil.toLowerCase().includes(searchInput)
                })

                if(tagsFound.length > 0){
                    ulTagContent.innerHTML = createTags(tagsFound)
                } else {
                    ulTagContent.innerHTML = "Aucuns ingrédients ne correspond à votre recherche"
                }
                tagCall("red")

            })
        }
    })
})

function tagCall(color){
    const tagLi = document.querySelectorAll(".tag")
    
    tagLi.forEach(tag =>{
        tag.addEventListener('click', (e)=>{
            e.preventDefault()
            let tagSelected = e.target.innerHTML.toLowerCase()
            tagSelected = tagSelected.trim()
            
            if(tagSelected === ""){
                return
            } else {
                var p = document.createElement('p')
                var pTag = document.createTextNode(tagSelected)
                p.appendChild(pTag)
                p.classList.add("tag_selected")
                p.classList.add("cursor")
                p.classList.add(color)

                tagArray.appendChild(p)
                closeTag()
            }

            if (foundArrayTemp.length === 0){
                search(recipes,tagSelected)
            } else {
                search(foundArrayTemp,tagSelected)
            }
            removeSelectedTag()
        })
    })
}

function closeTag(){
    tagContainer.forEach(tagContainers =>{
        inputIngredient.classList.add("hidden")
        inputIngredient.innerText=""
        inputAppareil.classList.add("hidden")
        inputAppareil.innerText=""
        inputUstensil.classList.add("hidden")
        inputUstensil.innerText=""
        tagContainers.classList.remove("active")
        const ulTagContent = tagContainers.nextElementSibling
        ulTagContent.classList.remove("ul_active")
    })
}

function removeSelectedTag(){
    const tagSelected = document.querySelectorAll(".tag_selected")
    tagSelected.forEach(tagSelected =>{
        tagSelected.addEventListener('click', (e) =>{
            e.target.remove(e.target)

            if (tagArray.childElementCount == 0 && searchWord == ""){
                location.reload()
            } else if (tagArray.childElementCount >= 1 && searchWord == "") {
                search(recipes, tagArray.childNodes[0].innerText)
                for(let i = 1; i < tagArray.childElementCount; i++){
                    search(foundArrayTemp, tagArray.childNodes[i].innerText)
                }
            } else if (searchWord){
                search(recipes, searchWord)
                for(let i = 0; i < tagArray.childElementCount; i++){
                    search(foundArrayTemp, tagArray.childNodes[i].innerText)
                }
                searchInput.classList.remove("disable")
            }
        })
    })
}

const closeClick = document.querySelectorAll("html")
closeClick.forEach(item =>{
    item.addEventListener('click', (e)=>{
        e.preventDefault()
        if((e.target.classList.contains("active")) || (e.target.classList.contains("ul_active"))){
        } else {
            closeTag()
        }
    })
});