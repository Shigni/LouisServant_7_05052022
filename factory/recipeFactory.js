export default class recipeClass {
    constructor(name,serving, time, ingredients, description, appliance, ustensiles){
        this.name = name
        this.serving = serving
        this.time = time
        this.ingredients = ingredients
        this.description = description
        this.appliance = appliance
        this.ustensiles = ustensiles
    }

    recipeCard() {
        const recipeContainer = document.getElementById("recipe_container")

        let recipeContainerHTML = `
        <article>
            <div class="recipe_card">
                <div class="recipe_header">
                    <h3>${this.name}</h3>
                    <h4><i class="far fa-clock"></i>${this.time} min</h4>
                </div>
                <div class="cook_method">
                    <ul class="ingredients">
                        ${this.createIngredient()}
                    </ul>
                    <p class="description">${this.description}</p>
                </div>
            </div>
        </article>
        `

        recipeContainer.innerHTML += recipeContainerHTML
    }

    createIngredient() {
        return `
        ${this.ingredients.map(function(eachIngredient){
            let unit = eachIngredient.unit
            let quantity = eachIngredient.quantity
                function quantityCheck(){
                    if(quantity === undefined){
                        quantity = ""
                        return quantity
                    } else {
                        return quantity
                    }
                }
                function unitCheck(){
                    if(unit === undefined){
                        unit = ""
                        return unit
                    } else if(unit === "grammes"){
                        return "g"
                    } else if (unit === "cuillères à soupe"){
                        return "cuillères"
                    } else if (unit === "cuillère à soupe"){
                        return "cuillère"
                    } else if (unit === "cuillères à café"){
                        return "cuillères"
                    } else if (unit === "cuillère à café"){
                        return "cuillère"
                    }
                    else {
                        return unit
                    }
                }
                function colonAdd(){
                    if(unit || quantity){
                        return ":"
                    } else {
                        return ""
                    }
                }
            return ` <li> ${eachIngredient.ingredient} ${colonAdd()} ${quantityCheck()} ${unitCheck()} </li>
            `
        }).join('')}
        `
    }
}