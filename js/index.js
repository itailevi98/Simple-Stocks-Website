window.onload = fetchMarquee();

async function fetchMarquee() {
    const response = await fetch("https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock/list");
    let data = await response.json();
    data = data.slice(0, 50);
    const marqueeText = document.createElement("p");
    data.map(element => {
        const symbol = document.createElement("span");
        symbol.innerText = `${element.symbol} `;
        symbol.style.color = "rgba(104, 103, 109, 0.849)";
        const price = document.createElement('span');
        price.innerText = `$${element.price}`;
        price.style.color = "rgb(27, 206, 27)";
        price.style.marginRight = "8px";
        marqueeText.appendChild(symbol);
        marqueeText.appendChild(price);
        marqueeText.style.fontSize = "12px";
    });
    document.getElementById("marquee").appendChild(marqueeText);
}

document.querySelector('#search-button').addEventListener("click", async event => {
    event.preventDefault();
    const searchValue = document.querySelector('#search-bar').value;
    if(!searchValue){
        return;
    } 
    fetchSearchResults(searchValue);
});

async function fetchSearchResults(searchValue){
    const loader = document.getElementById("loader");
    loader.style.display = 'block';
    const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchValue}&limit=10&exchange=NASDAQ`);
    const data = await response.json();
    if(data){
        const resultsList = document.querySelector('#results-list');
        while(resultsList.firstChild){
            resultsList.removeChild(resultsList.lastChild);
        }
        if(data.length !== 0){
            data.map(async company => {
                const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${company.symbol}`)
                const companyData = await response.json();
                const listItem = document.createElement('li');
                listItem.className = "list-item";
                const companyImage = document.createElement('img');
                companyImage.className = "company-image";
                companyImage.src = companyData.profile.image;
                const resultLink = document.createElement('a');
                resultLink.className = "result-link";
                resultLink.href = `/company.html?symbol=${company.symbol}`;
                resultLink.innerText = `${company.name}`;
                const companySymbol = document.createElement('span');
                companySymbol.innerText = `(${company.symbol})`;
                companySymbol.className = "list-item-price"
                const changesPrice = document.createElement('span');
                changesPrice.innerText = companyData.profile.changesPercentage;
                changesPrice.className = "list-item-price";
                if(changesPrice.innerText.indexOf("-") !== -1){
                    changesPrice.className = "negative-price list-item-price ";
                }
                else if(changesPrice.innerText.indexOf("+") !== -1){
                    changesPrice.className = "positive-price list-item-price ";
                }
                listItem.appendChild(companyImage);
                listItem.appendChild(resultLink);
                listItem.appendChild(companySymbol);
                listItem.appendChild(changesPrice);
                resultsList.appendChild(listItem);
            });
        }
    }
    loader.style.display = 'none';
}
