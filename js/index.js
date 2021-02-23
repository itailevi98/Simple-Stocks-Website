document.querySelector('#search-button').addEventListener("click", async event => {
    const search_value = document.querySelector('#search-bar').value;
    if(!search_value){
        return;
    } 
    const loader = document.getElementById("loader");
    loader.style.display = 'block';
    const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${search_value}&limit=10&exchange=NASDAQ`);
    const data = await response.json();
    if(data){
        loader.style.display = 'none';
        const results_list = document.querySelector('#results-list');
        while(results_list.firstChild){
            results_list.removeChild(results_list.lastChild);
        }
        if(data.length !== 0){
            for(let company of data){
                const list_item = document.createElement('li');
                list_item.className = "list-item";
                const result_link = document.createElement('a');
                result_link.href = `/company.html?symbol=${company.symbol}`;
                result_link.innerText = `${company.name} (${company.symbol})`;
                list_item.appendChild(result_link);
                results_list.appendChild(list_item);
            }     
        }
    }
});