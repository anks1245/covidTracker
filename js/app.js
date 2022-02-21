const countries=document.querySelector('datalist');
const search=document.querySelector('#srch');
const date=document.querySelector('#date');
const nameCountry=document.querySelector('#name-country');
const confirmed=document.querySelector('.confirmed');
const deaths=document.querySelector('.deaths');
const recovered=document.querySelector('.recovered');
const chart=document.querySelector('.chart');

let dataChart=[ ];
const API_URL_GLOBAL= "https://api.coronatracker.com/v3/stats/worldometer/global";
const API_URL_COUNTRY = "https://api.coronatracker.com/v3/stats/worldometer/country";
async function covid(country){
    countries.innerHTML='<option value="World">World</option>';
    resetValue(confirmed);
    resetValue(deaths);
    resetValue(recovered);
    const res1= await fetch(API_URL_GLOBAL);
    const res2= await fetch(API_URL_COUNTRY);

    //console.log(res);
    const data1= await res1.json();
    const data2= await res2.json();

    console.log(country);

    if(res1.status === 4 || res1.status === 200){
        date.textContent= new Date(data1.created).toDateString();
        if(country === '' || country === 'World'){
            const {totalConfirmed,totalDeaths,totalRecovered,totalNewCases,totalNewDeaths,totalActiveCases} = data1;
            total(totalConfirmed,totalDeaths,totalRecovered);
            newUpdate(totalNewCases,totalNewDeaths,totalActiveCases);

            console.log(data1);
            
            // //Total Confirmed
            // confirmed.children[1].textContent=TotalConfirmed ;
            // confirmed.children[2].textContent=NewConfirmed ;
            // //Total Deaths
    
            // deaths.children[1].textContent=TotalDeaths ;
            // deaths.children[2].textContent=NewDeaths ;
    
            // //Total Recovered
    
            // recovered.children[1].textContent=TotalRecovered ;
            // recovered.children[2].textContent=NewRecovered ;
            nameCountry.textContent='The World';
            dataChart=[totalConfirmed,totalDeaths,totalRecovered];

        };
        
        data2.forEach(item=>{
            const option = document.createElement('option');
            option.value = item.country;
            option.textContent = item.country;
            countries.appendChild(option);
            if(country === item.country){
                total(item.totalConfirmed,item.totalDeaths,item.totalRecovered);
                newUpdate(item.totalConfirmedPerMillionPopulation,item.totalDeathsPerMillionPopulation,item.activeCases);
                // confirmed.children[1].textContent=item.TotalConfirmed ;
                // confirmed.children[2].textContent=item.NewConfirmed ;
                // //Total Deaths
        
                // deaths.children[1].textContent=item.TotalDeaths ;
                // deaths.children[2].textContent=item.NewDeaths ;
        
                // //Total Recovereds
        
                // recovered.children[1].textContent=item.TotalRecovered ;
                // recovered.children[2].textContent=item.NewRecovered ;

                nameCountry.textContent=item.Country;
                dataChart=[item.totalConfirmed,item.totalDeaths,item.totalRecovered];

                console.log(item);
         
            }
        });
        drawChart(dataChart);


    }else{
        chart.innerHTML=`<h2>Loading......</h2>`;
    }
}
const speed=100;
function counting(target,element){
    const inc=target/speed;
    const count= +element.textContent;
    if(count<target){
        element.textContent=Math.ceil(count+inc);
        setTimeout(()=>{
            counting(target,element)
        },1)
    }else{
        element.textContent=target ;
    } 
};

function total(Confirmed,Deaths,Recovered){
    // const inc=Confirmed/speed;
    // const count= +confirmed.children[1].textContent;
    // if(count<Confirmed){
    //     confirmed.children[1].textContent=Math.ceil(count+inc);
    //     setTimeout(()=>{
    //         total(Confirmed,Deaths,Recovered)
    //     },1)
    // }else{
    //     confirmed.children[1].textContent=Confirmed ;
    // }
    counting(Confirmed,confirmed.children[1] );
    counting(Deaths,deaths.children[1] );
    counting(Recovered,recovered.children[1] );


            //Total Deaths
        
    // deaths.children[1].textContent=Deaths ;
        
    //             //Total Recovered
        
    // recovered.children[1].textContent=Recovered ;

};
function newUpdate(Confirmed,Deaths,Recovered){
    counting(Confirmed,confirmed.children[2] );
    //confirmed.children[2].textContent=Confirmed;
                //Total Deaths
    counting(Deaths,deaths.children[2] );
    //deaths.children[2].textContent=Deaths ;
        
                //Total Recovered
    counting(Recovered,recovered.children[2] );
    //recovered.children[2].textContent=Recovered ;

};

function resetValue(element){
    element.children[1].textContent=0;
    element.children[2].textContent=0;

};
function drawChart(data){
    chart.innerHTML='';
    const ctx=document.createElement('canvas');
    chart.appendChild(ctx);
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Total Confirmed', 'Total Deaths', 'Total Recovered'],
            datasets: [{
                label: nameCountry.textContent,
                data: data,
                backgroundColor: [ 'crimson','coral','green']
                
            }]
        },
        options: { }
    });
};


covid(search.value);

const btnSearch=document.querySelector('button');
btnSearch.addEventListener('click',(e)=>{
    e.preventDefault();
    covid(search.value);
    search.value='';
})

