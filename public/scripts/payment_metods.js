async function updateTotalPrice(cart){
    let data = await fetch(`http://localhost:7500/payment/price`);
    let totalPrice = await data.json();
    console.log(totalPrice.sum);
    let totalDiv = document.getElementById('total_amount');
    totalDiv.textContent = '₹'+ totalPrice.sum;
}

let arr = document.querySelectorAll("form");
arr.forEach(x => x.addEventListener('submit', paymentMethod));
let i = 0;

let selectedType = 'upi';

let upi = document.getElementById('upi');
let creditCard = document.getElementById('creditCard');
let netBanking = document.getElementById('netBanking');

const options = [upi, netBanking, creditCard]

options.forEach((item, i, array) => {
    const currentItem = i;

    item.addEventListener('click', (e) => {

        const currentType = e.path.filter(ele => {
            const type = ele.dataset?.type;

            if (Boolean(type)) {
                selectedType = type
            }
        })

        if (selectedType === array[currentItem].id) {
            arr[currentItem].classList.add('open');


            options.filter((item, i) => i !== currentItem).forEach(element => {
                const elemntForm = element.querySelector('form')
                elemntForm.classList.remove('open')

            })
        }
    })
})

arr[0].classList.add('open')



function paymentMethod(e) {
    e.preventDefault();
    const curButton = e.target.id;
    const upicheck = /[a-zA-Z0-9\.\-]{2,256}\@[a-zA-Z][a-zA-Z]{2,64}/;
    const netBankingcheck = /^(?=[a-zA-Z0-9.]{8,20}$)(?!.*[.]{2})[^.].*[^.]$/;
    const creditCardcheck = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    // /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    if(curButton=='upiData'){
        if(upicheck.test(e.target.vpa.value)){
            async function sendData(){
                let upiValue = e.target.vpa.value;
                console.log(upiValue);
                let data = await fetch(`http://localhost:7500/payment/${upiValue}/${"UPI"}`);
                let dt = await data.json();
                console.log(dt);
                alert("Paid");
            }
            sendData();
            window.location.href = "netbanking";
        }
        else{
            alert("Enter a valid UPI Id");
        }
    }
    else if(curButton=='netBankingData'){
        if(netBankingcheck.test(e.target.username.value)){
            async function sendData(){
                let upiValue = e.target.username.value;
                console.log(upiValue);
                let data = await fetch(`http://localhost:7500/payment/${upiValue}/${"Net_Banking"}`);
                let dt = await data.json();
                console.log(dt);
                // alert("Paid");
            }
            sendData();
            window.location.href = "netbanking";
        }
        else{
            alert('Enter a valid net banking username')
        }
    }
    else if(curButton=='creditCardData'){
        if(creditCardcheck.test(e.target.creditCardNumber.value)){
            async function sendData(){
                let upiValue = e.target.creditCardNumber.value;
                console.log(upiValue);
                let data = await fetch(`http://localhost:7500/payment/${upiValue}/${"Credit_card"}`);
                let dt = await data.json();
                console.log(dt);
                alert("Paid");
            }
            sendData();
            window.location.href = "netbanking";
        }
        else{
            alert('Enter a valid credit card number');
        }
    }
}