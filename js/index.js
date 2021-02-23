document.querySelector('#search-button').addEventListener("click", async event => {
    event.preventDefault();
    const search_value = document.querySelector('#search-bar').value;
    if(!search_value){
        return;
    } 
    const loader = document.getElementById("loader");
    loader.style.display = 'block';
    const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${search_value}&limit=10&exchange=NASDAQ`);
    const data = await response.json();
    if(data){
        
        const results_list = document.querySelector('#results-list');
        while(results_list.firstChild){
            results_list.removeChild(results_list.lastChild);
        }
        if(data.length !== 0){
            data.map(company => {
                fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${company.symbol}`)
                .then(response => {
                    return response.json()
                })
                .then(companyData => {
                    const list_item = document.createElement('li');
                    list_item.className = "list-item";
                    const company_image = document.createElement('img');
                    company_image.className = "company-image";
                    company_image.src = companyData.profile.image;
                    const result_link = document.createElement('a');
                    result_link.className = "result-link";
                    result_link.href = `/company.html?symbol=${company.symbol}`;
                    result_link.innerText = `${company.name}`;
                    const company_symbol = document.createElement('span');
                    company_symbol.innerText = `(${company.symbol})`;
                    company_symbol.className = "list-item-price"
                    const changes_price = document.createElement('span');
                    changes_price.innerText = companyData.profile.changesPercentage;
                    changes_price.className = "list-item-price";
                    if(changes_price.innerText.indexOf("-") !== -1){
                        changes_price.className = "negative-price list-item-price ";
                    }
                    else if(changes_price.innerText.indexOf("+") !== -1){
                        changes_price.className = "positive-price list-item-price ";
                    }
                    list_item.appendChild(company_image);
                    list_item.appendChild(result_link);
                    list_item.appendChild(company_symbol);
                    list_item.appendChild(changes_price);
                    results_list.appendChild(list_item);
                }); 
            });
            
        }
    }
    loader.style.display = 'none';
});