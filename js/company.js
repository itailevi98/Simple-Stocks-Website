const urlParams = new URLSearchParams(window.location.search);
const symbol = urlParams.get('symbol');
document.querySelectorAll(".loader")[0].style.display = "block";
fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        document.querySelectorAll(".loader")[0].style.display = "none";
        const company_link = document.createElement("a");
        company_link.href = data.profile.website;
        company_link.innerText = data.profile.companyName;
        const company_name = document.getElementById("company-name");
        company_name.appendChild(company_link);
        document.getElementById("company-image").src = data.profile.image;
        document.getElementById("company-description").innerText = data.profile.description;
        const stock_price = document.createElement('span');
        stock_price.innerText = `Stock Price: ${data.profile.price} `;
        const prices_change = document.createElement('span');
        prices_change.innerText = data.profile.changesPercentage;
        try{
            if(data.profile.changesPercentage.includes('+')){
                prices_change.style.color = "rgb(27, 206, 27)";
            }
            else if(data.profile.changesPercentage.includes('-')){
                prices_change.style.color = "red";
            }
        }
        catch(error){
            console.log(error);
        }
        
        document.getElementById("stock-price").appendChild(stock_price);
        document.getElementById("stock-price").appendChild(prices_change);
        getChart(symbol);
    });

async function getChart(symbol){
    document.querySelectorAll(".loader")[1].style.display = "block";
    const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`);
    const data = await response.json();
    var ctx = document.getElementById('company-chart').getContext('2d');
    let dates = [];
    let points = [];
    for(let arr of data.historical){
        dates.push(arr.date);
        points.push(arr.close);
    }
    dates.reverse();
    points.reverse();
    let datesArr = [];
    let pointsArr = [];
    let increment = Math.ceil(dates.length / 20);
    for(let i = 0; i < 20; i++){
        let dTempArr = dates.splice(0, increment);
        datesArr.push(dTempArr);
        let pTempArr = points.splice(0, increment);
        pointsArr.push(pTempArr);
        if(dates.length < increment) {
            break;
        }
    }
    dates = [];
    points = [];
    for(let array of datesArr){
        let item = array[array.length - 1];
        dates.push(item);
    }
    for(let array of pointsArr){
        let item = array[array.length - 1];
        points.push(item);
    }
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: dates,
            datasets: [{
                label: 'Stock Price History',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: points
            }]
        },

        // Configuration options go here
        options: {
            
        }
    });
    document.querySelectorAll(".loader")[1].style.display = "none";
}