
let BASE_URL = "https://api.exchangerate-api.com/v5/latest/USD";
const btn=document.querySelector("form button");
const dropdowns=document.querySelectorAll(".dropdown select");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");


import countryList from './codes.js';  // Adjust the path if necessary

for(let select of dropdowns){
    for(let currcode in countryList){
       let newoption=document.createElement("option");
     newoption.innerText=currcode;
     newoption.value=currcode;
     if(select.name=="from"&& currcode=="USD"){
        newoption.selected="selected";
     }else if(select.name=="to" && currcode=="INR"){
        newoption.selected="selected";
     }
     select.append(newoption);
    } 
    select.addEventListener("change",(eve)=>{
        updateFlag(eve.target);
    });
};
const updateFlag=(Element)=>{
    let currcode=Element.value;
     let countrycode=countryList[currcode];
     let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
     let img= Element.parentElement.querySelector("img");
     img.src=newsrc;
    };

    btn.addEventListener("click", async(evt)=>{
        evt.preventDefault();
        let amount=document.querySelector(".amount input");
        let amtval=amount.value;
        if(amtval===""|| amtval < 0){
            alert("Plese enter a valid amount");
            amount.value="1";
        }
        const fromCurrency = fromcurr.value.toLowerCase();
        const toCurrency = tocurr.value.toLowerCase();
        const url=`https://api.exchangerate-api.com/v4/latest/USD`;
        let responce=await fetch(url);

        console.log(fromCurrency,toCurrency);
        console.log(responce);
        let data= await responce.json();
        console.log(data);
        let rate=data.rates[tocurr.value];
        console.log(rate);
        let finalAmount=amtval * rate;
        msg.innerText=`${amtval} ${fromCurrency} =${finalAmount} ${toCurrency}`
        
    });
    