const fromAmountElement = document.querySelector(".amount");
const convertedAmountElement = document.querySelector(".convertedAmount");
const fromCurrencyElement = document.querySelector(".fromCurrency");
const toCurrenccyElement = document.querySelector(".toCurrency");
const resultElement = document.querySelector(".result");
const converterCode = document.querySelector(".converter");

const countries = [

    { code: "USD", name: "United States Dollar" },
    { code: "INR", name: "Indian Rupee" },
    { code: "AFN", name: "Afghani" },
    { code: "ALL", name: "Lek" },
    { code: "DZD", name: "Algerian Dinar" },
    { code: "EUR", name: "Euro" },
    { code: "AOA", name: "Kwanza" },
    { code: "XCD", name: "East Caribbean Dollar" },
    { code: "AMD", name: "Armenian Dram" },
    { code: "AWG", name: "Aruban Florin" },
]



// showing countries from array to selector tag

countries.forEach(country => {

    const option1 = document.createElement('option');
    const option2 = document.createElement('option');

    option1.value = option2.value = country.code;
    option1.textContent = option2.textContent = `${country.code} (${country.name})`;
    fromCurrencyElement.appendChild(option1);
    toCurrenccyElement.appendChild(option2);

    fromCurrencyElement.value = "USD";
    toCurrenccyElement.value = "INR";

});

//function to get exchange rate using API

const getExchangeRate = async () => {

    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrenccyElement.value;

    resultElement.textContent = "Fetching excahnage Rates";

    try {
        //fetch data from API
        const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_iBMbKSGoSIO9NRJeUeulstMM7LdPnKSNyy2Mu7ZU ${fromCurrency}`);
        const data = await response.json();

        const converetedrates = data.reats[toCurrency];
        const convertedAmount = (amount * converetedrates).toFixed(2);

        if(typeof converetedrates ==='undefined'){
            resultElement.textContent=" Exchnage rate data is not available for selected countires";
            convertedAmountElement=" ";

        }else {
        convertedAmountElement.value = convertedAmount;
        resultElement.textContent = `${amount} ${fromCurrency} ${convertedAmount} ${toCurrency}`
    }

    } catch (error) {

        converterCode.innerHTML= `<h2>Error While fetching exchange rates !!</h2>`;


    }
}

//fetching exchange rate when user input the amount
fromAmountElement.addEventListener('input', getExchangeRate);

//fetching exchange rate when user change currency
fromCurrencyElement.addEventListener('change', getExchangeRate);
toCurrenccyElement.addEventListener('change', getExchangeRate);
window.addEventListener('load', getExchangeRate);