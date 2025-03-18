const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const resultDiv = document.getElementById('results'); //where the search recommendation will be shown

const dataUrl = './data/travel_recommendation_api.json'; //to simulate an API

// to reset search input field
function resetSearch() {
    searchText = document.getElementById('conditionInput');
    searchText.value = '';
    resultDiv.innerHTML='';
}



//to dynamically display results matching destination or keyword
function searchPlace() {
    const input = document.getElementById('conditionInput').value.toLowerCase().trim(); 
    
    if( input==='')  {
        alert('Please enter some search criteria');
        return;
    }

    resultDiv.innerHTML = ''; //reinitialize the contents of resultDiv

    fetch(dataUrl)
      .then(response => response.json())
      .then( data => { 

        let results = []; //initialize search results as an empty array

        //first check search terms to match either country or city key
        data.countries.forEach( (country) => {

            //add all cities in a country if keyword search matches country
            if(country.name.toLowerCase().includes(input)) { 
                country.cities.forEach( (city)=> results.push(city) );
            } else {             

                //add all cities in a country if keyword search matches a city
                country.cities.forEach( (city)=> {
                    if (city.name.toLowerCase().includes(input)) results.push(city) 
                 });
            }
        })
        
        /* if no results from country or city search, 
         then keyword (input) should match the keys of array (beaches or temples) */
        if(results.length ===0) results = data[input];        
        

        if (results) {            
            resultDivHTML = results.map( (details, index) => {
                return ` <div class="result-item" >
                <img src="${details.imageUrl}" alt="location image" />
                <h2> ${details.name} </h2>
                <p> ${details.description} </p>
                <button class="btnBook"> Visit Now !</button>
                </div>
                `
            }).join('')

            resultDiv.innerHTML = resultDivHTML;

        } else {
            resultDiv.innerHTML = "<h1> No results found </h1>."
        }

       })

    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = '<h1> An error occurred while fetching data. </h1>';
     });


 }



