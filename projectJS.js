document.addEventListener('DOMContentLoaded', function() {
    const mealPlanForm = document.getElementById('mealPlanForm');
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const goalInput = document.getElementById('goalInput');
    const clearButton = document.getElementById('clearButton');
    const addMealPlanButton = document.getElementById('addMealPlan');
    const addedMealPlansContainer = document.getElementById('addedMealPlans');
    const daySelect = document.getElementById('day');
    const breakfastInput = document.getElementById('breakfastInput');
    const lunchInput = document.getElementById('lunchInput');
    const snackInput = document.getElementById('snackInput');
    const snackInput2 = document.getElementById('snackInput2');
    const dinnerInput = document.getElementById('dinnerInput')

    let mealPlans = [];

    mealPlanForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const goal = goalInput.value.trim();

        if (isValidEmail(email) && mealPlans.length > 0) {
            document.getElementById('name').textContent = name;
            document.getElementById('email').textContent = email;
            document.getElementById('goal').textContent = goal;

            generateMealPlan();
        } else if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
        } else {
            alert('Please add at least one meal plan.');
        }
    });
    clearButton.addEventListener('click', function() {
        mealPlanForm.reset();
        clearMealPlan();
    });

    addMealPlanButton.addEventListener('click', function() {
        const day = daySelect.value;
        const breakfast = breakfastInput.value.trim();
        const lunch = lunchInput.value.trim();
        const snack = snackInput.value.trim();
        const snack2 = snackInput2.value.trim();
        const dinner = dinnerInput.value.trim();
        if (breakfast !== '' && lunch !== '') {
            mealPlans.push({ day, breakfast, lunch, snack, snack2, dinner});
            renderAddedMealPlans();
            clearMealInputs();
        } else {
            alert('Please enter both breakfast and lunch.');
        }
    });

    function renderAddedMealPlans() {
        addedMealPlansContainer.innerHTML = '';
        mealPlans.forEach(function(item) {
            const mealPlanItem = document.createElement('div');
            mealPlanItem.textContent = `${item.day}: Breakfast - ${item.breakfast}, Snack - ${item.snack}, Lunch - ${item.lunch} Snack #2 - ${item.snack2}, Dinner - ${item.dinner}`;
            addedMealPlansContainer.appendChild(mealPlanItem);
        });
    }
    function clearMealInputs() {
        breakfastInput.value = '';
        lunchInput.value = '';
        snackInput.value = '';
        snackInput2.value = '';
        dinnerInput.value = '';
    }

    function generateMealPlan() {
        const mealPlanWindow = window.open('', '_blank');
        const nameInput = document.getElementById('nameInput');
        const name = nameInput.value.toUpperCase();
        const goalInput = document.getElementById('goalInput');
        const goal = goalInput.value;

        mealPlanWindow.document.write(`
            <html>
                <head>
                    <title>Your Meal Plan</title>
                </head>
                    <style>
                        /* Add your CSS styles here */
                        body {
                            font-family: Arial, sans-serif;
                            margin: 50px;
                            background-color: whitesmoke;
                            margin: 0;
                            padding: 0;
                        }
                        h1 {
                            text-align: center;
                        }
                        
                        h2{ 
                            text-align: center;
                        }
                        
                        p{
                            width: 40%;
                            height: auto;
                            padding: 5px;
                            border: 2px solid grey;
                            margin: 0;
                            margin-left: auto;
                            margin-right: auto; 
                        }

                        header{
                            background-color: #294144;
                            padding: 20px;
                        }
                    </style>
                <body>
                <header>
                    <h1>WE GOT YOUR MEAL PREP ${name}!</h1>
                    <h2><strong>Your goal is to ${goal}</strong></h2>
                </header>
                    <div>
        `);
        
        mealPlans.forEach(function(item) {
            mealPlanWindow.document.write(`<h2><strong>${item.day}:</strong></h2> <p><strong>Breakfast</strong> - ${item.breakfast}, <strong>Snack</strong> - ${item.snack}, <strong>Lunch</strong> - ${item.lunch}, <strong>Snack #2</strong> - ${item.snack2},<strong> Dinner</strong> - ${item.dinner}</p>`);
        });
        mealPlanWindow.document.write(`
                    </div>
                </body>
            </html>
        `);
        
        mealPlanWindow.document.close();
    }

    function printPlanner() {
        window.print();
    }
    document.getElementById('printPlanner').addEventListener('click', printPlanner);

    function clearMealPlan() {
        document.getElementById('name').textContent = '';
        document.getElementById('email').textContent = '';
        document.getElementById('goal').textContent = '';
        mealPlans = []; 
        renderAddedMealPlans(); 
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

});
