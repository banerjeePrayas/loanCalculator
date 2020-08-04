// Listen for Submit
document.getElementById("loan-form").addEventListener("submit", function (e) {
  // Hide Results
  document.getElementById("results").style.display = "none";

  // Show Loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResult, 2000);

  e.preventDefault();
});

// CAlculate REsults
function calculateResult() {
  // UI Variables
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principle = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //   Monthly Payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principle * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principle).toFixed(2);
    // Show Results
    document.getElementById("results").style.display = "block";

    // Hide Loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("UhOhhh, Please Check Your Numbers");
  }
}

// Show Errors
function showError(error) {
  // Create Div
  const errorDiv = document.createElement("div");

  // Get Elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add Class
  errorDiv.className = "alert alert-danger";

  // Create Text Node and Append to  Div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert Error above Heading
  card.insertBefore(errorDiv, heading);

  // Clear Error after 3sec
  setTimeout(clearError, 2000);
  // Hide Loader
  document.getElementById("loading").style.display = "none";
  // Hide Results
  document.getElementById("results").style.display = "none";
}

// ClearError Function
function clearError() {
  document.querySelector(".alert").remove();
}
