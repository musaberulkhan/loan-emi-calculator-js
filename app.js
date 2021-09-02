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
        //------ Calculate EMI ---------
        errorMessageField.innerText = "";
        const loanAmount = parseFloat(loanAmountValue);
        const bankInterest = parseFloat(bankInterestValue) / 100 / 12;
        const numberofEMIs = parseFloat(numberofEMIsValue);
        const x = Math.pow((1 + bankInterest), numberofEMIs);
        const EMIAmount = ((loanAmount * bankInterest * x) / (x - 1)).toFixed(2);
        const totalPayable = (EMIAmount * numberofEMIs).toFixed(2);
        const totalInterestPayable = (totalPayable - loanAmount).toFixed(2);

        //------ Loan Details Table ---------
        const tableLoanDetails = document.getElementById('loan-details-table');
        tableLoanDetails.innerHTML = "";
        tableLoanDetails.innerHTML =
        `
            <tr>
                <td>Monthly Payment (EMI)</td>
                <td class="text-end fw-bold">${EMIAmount}</td>                
            </tr>
            <tr>
                <td>Total Interest Payable</td>
                <td class="text-end fw-bold">${totalInterestPayable}</td>                
            </tr>
            <tr>
                <td>Total Payable</td>
                <td class="text-end fw-bold">${totalPayable}</td>                
            </tr>
        `

        const tableBreakdown = document.getElementById('breakdown-table');
        tableBreakdown.innerHTML = ``;
        const tr_heading = document.createElement('tr');
        tr_heading.innerHTML = `
            <th>EMI No.</th>
            <th>Principal Adjusted</th>
            <th>Interest</th>
            <th>Remaining Loan</th>`;
        tableBreakdown.appendChild(tr_heading);
        // let remainingLoan = loanAmount;        
        // for (let i = 1; i <= numberofEMIs; i++) {
        //     const interest = remainingLoan*(bankInterest);
        //     remainingLoan = remainingLoan - interest;

        //     const tr = document.createElement('tr');
        //     tr.innerHTML = `
        //         <td>${i}</td>
        //         <td>${i}</td>
        //         <td>${interest}</td>
        //         <td>${remainingLoan}</td>
        //     `;
        //     table.appendChild(tr);
    // }
}
});


