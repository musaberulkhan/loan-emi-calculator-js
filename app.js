//********************************************************************
//                   Declare All HTML Elements
const loanAmountInput = document.getElementById('loan-amount-input');
const bankInterestInput = document.getElementById('bank-interest-input');
const numberofEMIsInput = document.getElementById('number-of-emis-input');
const calculateButton = document.getElementById('calculate-button');

//********************************************************************
//                 Calculate Button Event Listener
calculateButton.addEventListener('click', function () {
    const loanAmountValue = loanAmountInput.value;
    const bankInterestValue = bankInterestInput.value;
    const numberofEMIsValue = numberofEMIsInput.value;
    const errorMessageField = document.getElementById('error-message');

    if (loanAmountValue === '' || bankInterestValue === '' || numberofEMIsValue === '') {
        errorMessageField.innerText = "Please Input Data to All Fields";
    }
    else if (parseFloat(loanAmountValue) <= 0 || parseFloat(bankInterestValue) <= 0 || parseFloat(numberofEMIsValue) <= 0) {
        errorMessageField.innerText = "Negative or Zero Inputs are Not Allowed";
    }
    else {
        errorMessageField.innerText = "";
        const table = document.getElementById('breakdown-table');
        table.innerHTML=``;
        const tr_heading = document.createElement('tr');
        tr_heading.innerHTML = `
            <th>EMI No.</th>
            <th>Principal Adjusted</th>
            <th>Interest</th>
            <th>Remaining Loan</th>`;
        table.appendChild(tr_heading);

        const loanAmount = parseFloat(loanAmountValue);
        const bankInterest = parseFloat(bankInterestValue);
        const numberofEMIs = parseFloat(numberofEMIsValue);
        for (let i = 1; i <= numberofEMIs; i++) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${i}</td>
                <td>${i}</td>
                <td>${i}</td>
                <td>${i}</td>
            `;
            table.appendChild(tr);
        }
    }
});


