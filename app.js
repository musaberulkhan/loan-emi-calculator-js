//********************************************************************
//                   Declare All HTML Elements
const loanAmountInput = document.getElementById('loan-amount-input');
const bankInterestInput = document.getElementById('bank-interest-input');
const numberofEMIsInput = document.getElementById('number-of-emis-input');
const calculateButton = document.getElementById('calculate-button');


//********************************************************************
//                      Chart Declare
const canvas = document.getElementById('principalInterestChart').getContext('2d');
let config = {
    type: 'pie',
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    }
}
var principalInterestChart = new Chart(canvas, config);

//Chart Update/Add Data Function
function addData(chart, label, data) {
    chart.data.labels = label;
    chart.data.datasets[0].data = data;
    chart.update();
}


//********************************************************************
//                 Calculate Button Event Listener
calculateButton.addEventListener('click', function () {
    const loanAmountValue = loanAmountInput.value;
    const bankInterestValue = bankInterestInput.value;
    const numberofEMIsValue = numberofEMIsInput.value;
    const errorMessageField = document.getElementById('error-message');
    const tableLoanDetails = document.getElementById('loan-details-table');
    tableLoanDetails.innerHTML = "";
    const tableBreakdown = document.getElementById('breakdown-table');
    tableBreakdown.innerHTML = ``;
    document.getElementById('breakdown-table-title').innerText = "";

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
        const bankInterest = (parseFloat(bankInterestValue) / 100 / 12);
        const numberofEMIs = parseFloat(numberofEMIsValue);
        const x = (Math.pow((1 + bankInterest), numberofEMIs)).toFixed(5);

        const EMIAmount = ((loanAmount * bankInterest * x) / (x - 1)).toFixed(2);
        const totalPayable = (EMIAmount * numberofEMIs).toFixed(2);
        const totalInterestPayable = (totalPayable - loanAmount).toFixed(2);

        //------ Loan Details Table ---------

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
        
        //------ Principal and Interest Pie Chart ---------
       
        addData(principalInterestChart, 
            ["Interest","Principal"], 
            [totalInterestPayable,totalPayable-totalInterestPayable]);

        

        //------ Loan Breakdown Table ---------        
        const tr_heading = document.createElement('tr');
        tr_heading.innerHTML = `
            <th>EMI No.</th>
            <th>Principal Adjusted</th>
            <th>Interest</th>
            <th>Remaining Loan</th>`;
        tableBreakdown.appendChild(tr_heading);

        let remainingLoan = loanAmount;
        for (let i = 1; i <= numberofEMIs; i++) {
            const interest = (remainingLoan * bankInterest);
            remainingLoan = (remainingLoan - EMIAmount + interest).toFixed(2);
            const principalAdjusted = (EMIAmount - interest).toFixed(2);
            const tr = document.createElement('tr');
            if (i === numberofEMIs) {
                remainingLoan = 0;
            }
            tr.innerHTML = `
                <td>${i}</td>
                <td>${principalAdjusted}</td>
                <td>${interest.toFixed(2)}</td>
                <td>${remainingLoan}</td>
            `;
            tableBreakdown.appendChild(tr);
        }

        //------ Display Heading ---------
        document.getElementById('breakdown-table-title').innerText = "Amortization Chart";
    }

});




