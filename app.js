document.getElementById('loan-form').addEventListener('submit', (e) => {
  e.preventDefault();

  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'block';

  setTimeout(calcResult, 2000);
});

function calcResult() {
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calcIntrest = parseFloat(interest.value) / 100 / 12;
  const calcPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calcIntrest, calcPayments);
  const monthly = (principal * x * calcIntrest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calcPayments).toFixed(2);
    totalInterest.value = (monthly * calcPayments - principal).toFixed(2);

    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }
}

function showError(error) {
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'none';
  // Create a div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
  document.querySelector('.alert').remove();
}
