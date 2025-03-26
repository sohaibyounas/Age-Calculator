document.getElementById("ageForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const inputs = ["day", "month", "year"].map(id => document.getElementById(id));
    const [dayInput, monthInput, yearInput] = inputs;
    const [day, month, year] = inputs.map(input => parseInt(input.value.trim(), 10));
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);

    // Reset styles and clear errors
    document.querySelectorAll(".error").forEach(e => e.remove());
    inputs.forEach(input => input.classList.remove("input-error"));
    let hasError = false;

    // Show error helper
    const showError = (input, message) => {
        hasError = true;
        input.classList.add("input-error");
        const errorMsg = document.createElement("p");
        errorMsg.className = "error";
        errorMsg.textContent = message;
        input.parentElement.appendChild(errorMsg);
    };

    // Validation
    if (!day) showError(dayInput, "Day is required.");
    if (!month) showError(monthInput, "Month is required.");
    if (!year) showError(yearInput, "Year is required.");
    if (day < 1 || day > 31) showError(dayInput, "Must be between 1-31.");
    if (month < 1 || month > 12) showError(monthInput, "Must be between 1-12.");
    if (birthDate > today) showError(yearInput, "Date cannot be in the future.");
    if (month >= 1 && month <= 12 && !isNaN(year) && !isNaN(day) &&
        (birthDate.getFullYear() !== year || birthDate.getMonth() + 1 !== month || birthDate.getDate() !== day)) {
        showError(dayInput, "Invalid date.");
    }
    if (hasError) return;

    // Age Calculation
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();
    if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    // Animate Results
    ["years", "months", "days"].forEach((id, i) => animateNumber(id, [ageYears, ageMonths, ageDays][i]));
});

function animateNumber(id, finalValue) {
    const element = document.getElementById(id);
    let startValue = 0, step = finalValue / 50;
    const counter = setInterval(() => {
        startValue += step;
        if (startValue >= finalValue) {
            startValue = finalValue;
            clearInterval(counter);
        }
        element.textContent = Math.floor(startValue);
    }, 20);
}
