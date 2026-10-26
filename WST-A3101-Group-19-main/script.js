// Web Systems & Tech - Group 19
// Script by: Miguel

window.onload = function() {
    console.log("page is ready!");

    // Simple click tracker for buttons
    let allButtons = document.querySelectorAll("button");
    
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener("click", function(e) {
            console.log("Clicked button:", e.target.innerText);
        });
    }

    // Form checker
    let formElement = document.querySelector("form");
    if (formElement) {
        formElement.addEventListener("submit", function(e) {
            e.preventDefault();
            alert("Form submitted successfully!");
        });
    }
};
