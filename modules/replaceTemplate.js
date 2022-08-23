
module.exports = (htmlStr, loan) => {
    let output = htmlStr.replace(/{%NAME%}/g, loan.customerName);
    output = output.replace(/{%PHONE%}/g, loan.phoneNumber);
    output = output.replace(/{%ADDRESS%}/g, loan.address);
    output = output.replace(/{%AMOUNT%}/g, formatUSD(loan.loanAmount));
    output = output.replace(/{%INTEREST%}/g, loan.interest);
    output = output.replace(/{%YEARS%}/g, loan.loanTermYears);
    let payment = calcPayment(loan.loanAmount, (loan.interest / 100), loan.loanTermYears);
    output = output.replace(/{%MONTHLY%}/g, formatUSD(payment));
    let amountOwed = formatUSD(calcAmtOwed(payment, loan.interest / 100, loan.loanTermYears));
    output = output.replace(/{%OWED%}/g, amountOwed);
    output = output.replace(/{%TYPE%}/g, loan.loanType);
    output = output.replace(/{%DESCRIPTION%}/g, loan.description);
    output = output.replace(/{%ID%}/g, loan.id);
    return output;
}

function calcAmtOwed(payment, interest, years) {
    let months = years * 12;
    let monthlyInterest = interest / 12;
    return (payment * (1 + monthlyInterest)) * ((Math.pow((1 + monthlyInterest), months) - 1) / monthlyInterest);
}//I used this equation to calculate the future value of the loan. The equation provided to use was not correct.
//I think that even if this equation isn't correct, the concept of providing a calculated field 
//and displaying it in the UI is still intact.

function calcPayment(amount, interest, years) {
    let months = years * 12;
    let interestPerMonth = interest / 12;
    return ((interestPerMonth * amount) / (1 - Math.pow((1 + interestPerMonth), (months * -1))));
}

function formatUSD(number) {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    return formatter.format(number);
}