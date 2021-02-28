class SearchForm {
    constructor(formElement) {
        this.formElement = formElement;
        this.init();
    }

    init() {
        this.searchBar = document.createElement('input');
        this.searchBar.type = "search";
        this.searchBar.id = "search-bar";
        this.formElement.appendChild(this.searchBar);
        this.searchButton = document.createElement('button');
        this.searchButton.type = "submit";
        this.searchButton.id = "search-button";
        this.searchButton.innerText = "Search";
        this.formElement.appendChild(this.searchButton);
        this.loader = document.createElement('div');
        this.loader.id = "loader";
        this.loader.style.display = "none";
        document.getElementById("wrapper").insertBefore(this.loader, document.getElementById("search-results-container"));
    }

    async onSearch(searchFunc) {
        this.searchButton.addEventListener("click", async event => {
            this.loader.style.display = "block";
            const searchValue = document.querySelector('#search-bar').value;
            if(!searchValue){
                return;
            }
            const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchValue}&limit=10&exchange=NASDAQ`);
            const companies = await response.json();
            searchFunc(companies);
            this.loader.style.display = "none";
        });
    }
}
