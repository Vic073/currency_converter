const amountInput = document.getElementById("amount");
        const fromSelect = document.getElementById("from");
        const toSelect = document.getElementById("to");
        const convertBtn = document.getElementById("convert-btn");
        const resultText = document.getElementById("result-text");

        const apiKey = 'd247c21fc009f3c65a5f024d';
        const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

        let exchangeRates = {};

        // Fetch currency options and populate the select fields
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                exchangeRates = data.conversion_rates;
                const currencies = Object.keys(exchangeRates).sort();
                
                currencies.forEach(code => {
                    const currencyName = getCurrencyName(code);
                    const option = `<option value="${code}">${code} - ${currencyName}</option>`;
                    fromSelect.insertAdjacentHTML('beforeend', option);
                    toSelect.insertAdjacentHTML('beforeend', option);
                });

                // Set default values
                fromSelect.value = 'USD';
                toSelect.value = 'EUR';

                // Initialize Select2
                $('.currency-select').select2({
                    width: '100%',
                    dropdownAutoWidth: false,
                    placeholder: 'Search for a currency...',
                    minimumResultsForSearch: 5,
                    templateResult: formatCurrency,
                    templateSelection: formatCurrency
                });

                // Enable live conversion
                [amountInput, fromSelect, toSelect].forEach(el => 
                    el.addEventListener('input', convertCurrency)
                );

                convertBtn.addEventListener('click', convertCurrency);
            })
            
            .catch(error => console.error("Error fetching currency list:", error));

        function getCurrencyName(code) {
            const currencyNames = {
                USD: "United States Dollar",
EUR: "Euro",
GBP: "British Pound",
JPY: "Japanese Yen",
AUD: "Australian Dollar",
CAD: "Canadian Dollar",
CHF: "Swiss Franc",
CNY: "Chinese Yuan",
SEK: "Swedish Krona",
NZD: "New Zealand Dollar",
INR: "Indian Rupee",
SGD: "Singapore Dollar",
HKD: "Hong Kong Dollar",
NOK: "Norwegian Krone",
MXN: "Mexican Peso",
RUB: "Russian Ruble",
ZAR: "South African Rand",
BRL: "Brazilian Real",
TRY: "Turkish Lira",
AED: "United Arab Emirates Dirham",
ARS: "Argentine Peso",
AWG: "Aruban Florin",
BBD: "Barbadian Dollar",
BDT: "Bangladeshi Taka",
BGN: "Bulgarian Lev",
BMD: "Bermudian Dollar",
BND: "Brunei Dollar",
BOB: "Bolivian Boliviano",
BRL: "Brazilian Real",
BTN: "Bhutanese Ngultrum",
BYN: "Belarusian Ruble",
CAD: "Canadian Dollar",
CDF: "Congolese Franc",
CLP: "Chilean Peso",
COP: "Colombian Peso",
CRC: "Costa Rican Colón",
CUP: "Cuban Peso",
CVE: "Cape Verdean Escudo",
CZK: "Czech Koruna",
DJF: "Djiboutian Franc",
DKK: "Danish Krone",
DOP: "Dominican Peso",
DZD: "Algerian Dinar",
EGP: "Egyptian Pound",
ERN: "Eritrean Nakfa",
ETB: "Ethiopian Birr",
FJD: "Fijian Dollar",
FKP: "Falkland Islands Pound",
GEL: "Georgian Lari",
GHS: "Ghanaian Cedi",
GIP: "Gibraltar Pound",
GMD: "Gambian Dalasi",
GNF: "Guinean Franc",
GTQ: "Guatemalan Quetzal",
GYD: "Guyanese Dollar",
HKD: "Hong Kong Dollar",
HNL: "Honduran Lempira",
HRK: "Croatian Kuna",
HTG: "Haitian Gourde",
HUF: "Hungarian Forint",
IDR: "Indonesian Rupiah",
ILS: "Israeli New Shekel",
IMP: "Isle of Man Pound",
INR: "Indian Rupee",
IQD: "Iraqi Dinar",
IRR: "Iranian Rial",
ISK: "Icelandic Króna",
JMD: "Jamaican Dollar",
JOD: "Jordanian Dinar",
KES: "Kenyan Shilling",
KGS: "Kyrgyzstani Som",
KHR: "Cambodian Riel",
KPW: "North Korean Won",
KRW: "South Korean Won",
KWD: "Kuwaiti Dinar",
KYD: "Cayman Islands Dollar",
KZT: "Kazakhstani Tenge",
LAK: "Lao Kip",
LBP: "Lebanese Pound",
LKR: "Sri Lankan Rupee",
LRD: "Liberian Dollar",
LSL: "Lesotho Loti",
LYD: "Libyan Dinar",
MAD: "Moroccan Dirham",
MDL: "Moldovan Leu",
MGA: "Malagasy Ariary",
MKD: "Macedonian Denar",
MMK: "Myanmar Kyat",
MNT: "Mongolian Tögrög",
MOP: "Macanese Pataca",
MRU: "Mauritanian Ouguiya",
MUR: "Mauritian Rupee",
MVR: "Maldivian Rufiyaa",
MWK: "Malawian Kwacha",
MXN: "Mexican Peso",
MYR: "Malaysian Ringgit",
MZN: "Mozambican Metical",
NAD: "Namibian Dollar",
NGN: "Nigerian Naira",
NIO: "Nicaraguan Córdoba",
NOK: "Norwegian Krone",
NPR: "Nepalese Rupee",
NZD: "New Zealand Dollar",
OMR: "Omani Rial",
PAB: "Panamanian Balboa",
PEN: "Peruvian Sol",
PGK: "Papua New Guinean Kina",
PHP: "Philippine Peso",
PKR: "Pakistani Rupee",
PLN: "Polish Zloty",
PYG: "Paraguayan Guarani",
QAR: "Qatari Rial",
RON: "Romanian Leu",
RSD: "Serbian Dinar",
RUB: "Russian Ruble",
RWF: "Rwandan Franc",
SAR: "Saudi Riyal",
SBD: "Solomon Islands Dollar",
SCR: "Seychellois Rupee",
SEK: "Swedish Krona",
SGD: "Singapore Dollar",
SHP: "Saint Helena Pound",
SLL: "Sierra Leonean Leone",
SOS: "Somali Shilling",
SRD: "Surinamese Dollar",
SSP: "South Sudanese Pound",
STD: "São Tomé and Príncipe Dobra",
SYP: "Syrian Pound",
SZL: "Swazi Lilangeni",
THB: "Thai Baht",
TJS: "Tajikistani Somoni",
TMT: "Turkmenistani Manat",
TND: "Tunisian Dinar",
TOP: "Tongan Paʻanga",
TRY: "Turkish Lira",
TTD: "Trinidad and Tobago Dollar",
TWD: "New Taiwan Dollar",
TZS: "Tanzanian Shilling",
UAH: "Ukrainian Hryvnia",
UGX: "Ugandan Shilling",
USD: "United States Dollar",
UYU: "Uruguayan Peso",
UZS: "Uzbekistani Som",
VES: "Venezuelan Bolívar",
VND: "Vietnamese Đồng",
VUV: "Vanuatu Vatu",
WST: "Samoan Tala",
XAF: "Central African CFA Franc",
XAG: "Silver Ounce",
XAU: "Gold Ounce",
XCD: "East Caribbean Dollar",
XDR: "Special Drawing Rights",
XOF: "West African CFA Franc",
XPF: "CFP Franc",
YER: "Yemeni Rial",
ZAR: "South African Rand",
ZMW: "Zambian Kwacha",
ZWL: "Zimbabwean Dollar"
    };
            
            return currencyNames[code] || code;
        }

        function formatCurrency(currency) {
            const code = currency.id;
            const name = getCurrencyName(code);
            return $(`<span>${code} - ${name}</span>`);
        }

        function convertCurrency() {
            const amount = parseFloat(amountInput.value);
            const fromCurrency = fromSelect.value;
            const toCurrency = toSelect.value;

            if (isNaN(amount)) {
                resultText.textContent = '';
                return;
            }

            const conversionRate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
            const convertedAmount = (amount * conversionRate).toFixed(2);
            resultText.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        }