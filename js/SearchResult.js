class SearchResult {
    constructor(divElement) {
        this.divElement = divElement;
        this.init();
    }

   init() {
       this.resultsList = document.createElement('ul');
       this.resultsList.id = "results-list";
       this.resultsList.className = "list-group list-group-flush"
       this.divElement.appendChild(this.resultsList);
   }

   async renderResults(companies) {
        if(companies){
            const searchTerm = document.getElementById("search-bar").value;
            while(this.resultsList.firstChild){
                this.resultsList.removeChild(this.resultsList.lastChild);
            }
            if(companies.length !== 0){
                companies.forEach(async company => {
                    const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${company.symbol}`)
                    const companyData = await response.json();
                    const listItem = document.createElement('li');
                    listItem.className = "list-group-item";
                    const companyImage = document.createElement('img');
                    companyImage.className = "company-image";
                    companyImage.src = companyData.profile.image;
                    const resultLink = document.createElement('a');
                    resultLink.className = "result-link";
                    resultLink.href = `/company.html?symbol=${company.symbol}`;
                    resultLink.innerHTML = `${company.name}`.replace(new RegExp(searchTerm, "gi"), (match) => `<mark>${match}</mark>`);
                    const companySymbol = document.createElement('span');
                    companySymbol.innerHTML = `(${company.symbol})`.replace(new RegExp(searchTerm, "gi"), (match) => `<mark>${match}</mark>`);
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
                    this.resultsList.appendChild(listItem);
                });
            }
        }
    }
}
