let monthlySip = document.getElementById("monthlySip");
let oneTime = document.getElementById("oneTime");
let inputLabel = document.getElementById("inputLabel");
let dateLabel = document.getElementById("dateLabel");
let dateInput = document.getElementById("sipCalInput");
let calIcon = document.getElementById("calendarIcon");
let sipInput = document.getElementById("sipAmountInput");
let paymentNote = document.getElementById("paymentNote");

async function addToCart(product_id) {
    if (sipInput.value == "" || sipInput.value < 100 || sipInput.value > 50000) {
        alert("Please enter minimum amount");
    }
    else {
        let data = await fetch(`cart/${product_id}`);
        console.log('data:', data)
        let dt = await data.json();
        console.log('dt:', dt)
        let newProductId = dt.addtocart._id;
        updateProduct(newProductId);
        console.log('newProductId:', newProductId)
    }
}

async function updateProduct(newProductId) {
    let product = await fetch(`cart/${newProductId}/${sipInput.value}`);
    let productDt = await product.json();
    console.log(productDt);
    alert("Product Successfully added to cart");
}

function showMonthlySip() {
    oneTime.setAttribute("class", "whenNotClicked");
    monthlySip.setAttribute("class", "whenClicked");
    dateLabel.setAttribute("class", "letDisplay");
    dateInput.setAttribute("class", "letDisplay");
    calIcon.setAttribute("class", "letDisplay");
    paymentNote.setAttribute("class", "letDisplay");
    inputLabel.innerHTML = "SIP Amount";
}

monthlySip.onclick = function () {
    showMonthlySip();
}

function showOneTime() {
    oneTime.setAttribute("class", "whenClicked");
    monthlySip.setAttribute("class", "whenNotClicked");
    dateLabel.setAttribute("class", "doNotDisplay");
    dateInput.setAttribute("class", "doNotDisplay");
    calIcon.setAttribute("class", "doNotDisplay");
    paymentNote.setAttribute("class", "doNotDisplay");
    inputLabel.innerHTML = "Amount";
}

oneTime.onclick = function () {
    showOneTime();
}

function calendar() {
    let temp = dateInput.value;
    let newDate = temp.split("").map(Number);
    if (newDate[5] == 0 && newDate[6] == 9) {
        newDate[5] = 1;
        newDate[6] = 0;
    }
    else if (newDate[5] == 0 && newDate[6] < 9) {
        newDate[6] += 1;
    }
    else if ((newDate[5] == 1 && newDate[6] == 0) || (newDate[5] == 1 && newDate[6] == 1)) {
        newDate[6] += 1;
    }
    else if (newDate[5] == 1 && newDate[6] == 2) {
        newDate[5] = 0;
        newDate[6] = 1;
        newDate[3] += 1;
    }
    let date = [];
    let month = [];
    let year = [];
    date.push(newDate[8], newDate[9]);
    month.push(newDate[5], newDate[6]);
    year.push(newDate[0], newDate[1], newDate[2], newDate[3]);
    newDate = (`${date.join("")}-${month.join("")}-${year.join("")}`);
    paymentNote.innerHTML = "Next SIP Instalment on " + newDate;
}

//return calculation
let rangeValue = document.getElementById("rangeValue");
let totalInvest = document.getElementById("returnCalDetOne");
let interestReturn = document.getElementById("returnCalDetTwo");
let oneYear = document.getElementById('intervalOneYear');
let threeYear = document.getElementById('intervalThreeYear');
let fiveYear = document.getElementById('intervalFiveYear');
let flagOneYear = true;
let flagThreeYear = false;
let flagFiveYear = false;

oneYear.onclick = () => {
    flagOneYear = true;
    flagThreeYear = false;
    flagFiveYear = false;
    oneYear.setAttribute("class", "onclicked");
    threeYear.setAttribute("class", "onNotclicked");
    fiveYear.setAttribute("class", "onNotclicked");
    totalInvest.innerHTML = `Total investment of ₹60000`;
    interestReturn.innerHTML = "";
}

threeYear.onclick = () => {
    flagThreeYear = true;
    flagOneYear = false;
    flagFiveYear = false;
    oneYear.setAttribute("class", "onNotclicked");
    threeYear.setAttribute("class", "onclicked");
    fiveYear.setAttribute("class", "onNotclicked");
    totalInvest.innerHTML = `Total investment of ₹180000`;
    interestReturn.innerHTML = "";
}

fiveYear.onclick = () => {
    flagThreeYear = false;
    flagOneYear = false;
    flagFiveYear = true;
    oneYear.setAttribute("class", "onNotclicked");
    threeYear.setAttribute("class", "onNotclicked");
    fiveYear.setAttribute("class", "onclicked");
    totalInvest.innerHTML = `Total investment of ₹300000`;
    interestReturn.innerHTML = "";
}

function calculate(prin, retrunPercent) {
    let p = prin;
    retrunPercent = +retrunPercent;

    if (flagOneYear) {
        let totalInvestment = p * 12;
        let newReturn = (((retrunPercent / 100) * totalInvestment) + totalInvestment).toFixed(2);

        rangeValue.innerHTML = `₹${p} per month`;
        totalInvest.innerHTML = `Total investment of ₹${totalInvestment}`;
        interestReturn.innerHTML = `Would have become ₹${newReturn} (+${retrunPercent})`;
    }
    else if (flagThreeYear) {
        let totalInvestment = p * 36;
        let newReturn = (((retrunPercent / 100) * totalInvestment) + totalInvestment).toFixed(2);

        rangeValue.innerHTML = `₹${p} per month`;
        totalInvest.innerHTML = `Total investment of ₹${totalInvestment}`;
        interestReturn.innerHTML = `Would have become ₹${newReturn} (+${retrunPercent})`
    }
    else if (flagFiveYear) {
        let totalInvestment = p * 60;
        let newReturn = (((retrunPercent / 100) * totalInvestment) + totalInvestment).toFixed(2);

        rangeValue.innerHTML = `₹${p} per month`;
        totalInvest.innerHTML = `Total investment of ₹${totalInvestment}`;
        interestReturn.innerHTML = `Would have become ₹${newReturn} (+${retrunPercent})`
    }
}
