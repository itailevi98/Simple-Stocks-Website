class Marquee {
    constructor(divElement){
        /*
        <div class="progress">
</div>
        */
        this.divElement = divElement;
        this.marqueeText = document.createElement("p");
        this.marqueeText.style.fontSize = "12px";
        this.progressBar = document.createElement('div');
        this.progressBar.className = "progress d-none";
        this.progressBar.innerHTML = '<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>';
        this.divElement.appendChild(this.progressBar);
    }

    async load(){
        this.progressBar.className= "progress d-flex";
        const response = await fetch("https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock/list");
        this.data = await response.json();
        // Browser is stuck for a long time when doing full list, so only use first 50 elements for marquee
        this.data = this.data.slice(0, 50);
        this.data.forEach((element) => {
            this.buildMarqueeElement(element);
        });
        this.divElement.appendChild(this.marqueeText);
        this.progressBar.className = "progress d-none";
    }

    buildMarqueeElement(element){
        const symbol = document.createElement("span");
        symbol.innerText = `${element.symbol} `;
        symbol.style.color = "rgba(104, 103, 109, 0.849)";
        const price = document.createElement('span');
        price.innerText = `$${element.price}`;
        price.style.color = "rgb(27, 206, 27)";
        price.style.marginRight = "8px";
        this.marqueeText.appendChild(symbol);
        this.marqueeText.appendChild(price);
    }
}
