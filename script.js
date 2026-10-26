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
// Function to validate user inputs before sending requests
function validateInput(formData) {
    if (!formData || Object.keys(formData).length === 0) {
        console.warn("QA Check: Submitted data is empty.");
        return false;
    }
    console.log("QA Check: Input validation passed.");
    return true;
}

// Global error logger for QA testing
window.addEventListener('error', (event) => {
    console.error("Home Choice Runtime Error caught:", event.message);
});
git add script.js
git commit -m "Add input validation and error logging for QA testing"
git push origin main
