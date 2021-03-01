class SearchForm {
    constructor(formElement) {
        this.formElement = formElement;
        this.init();
    }

    init() {
        this.searchBar = document.createElement('input');
        this.searchBar.type = "search";
        this.searchBar.id = "search-bar";
        this.searchBar.className = "form-control"
        this.formElement.appendChild(this.searchBar);
        this.searchButton = document.createElement('button');
        this.searchButton.type = "submit";
        this.searchButton.id = "search-button";
        this.searchButton.className = "btn btn-primary";
        this.searchButton.innerText = "Search";
        this.formElement.appendChild(this.searchButton);
        this.loader = document.createElement('div');
        this.loader.id = "loader";
        this.loader.className = "spinner-border mt-3 d-none";
        this.loader.role = "status";
        const loaderSpan = document.createElement('span');
        loaderSpan.className = "visually-hidden";
        loaderSpan.innerText = "Loading...";
        this.loader.appendChild(loaderSpan);
        document.querySelector(".container").insertBefore(this.loader, document.getElementById("search-results-container"));
    }

    onSearch(searchFunc) {
        this.searchButton.addEventListener("click", async event => {
            this.loader.className= "spinner-border mt-3 d-flex me-auto ms-auto";
            const searchValue = document.querySelector('#search-bar').value;
            if(!searchValue){
                return;
            }
            const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchValue}&limit=10&exchange=NASDAQ`);
            const companies = await response.json();
            searchFunc(companies);
            this.loader.className = "spinner-border mt-3 d-none";
        });
    }
}
