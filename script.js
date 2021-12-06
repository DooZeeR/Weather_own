
const selectField = {type: "select", name: "city", label: "Cíty?", options: ['Budapest', 'Kecskemet', 'Miskolc', 'Szeged', 'Pecs']};

const selectElement = (type, name, label, options) =>{
    let optionsToSelect = ""; 
    for (const opt of options) {
        optionsToSelect += `
        <option value="${opt}">${opt}</option>
        `;
    }

    return `
        <div class="${type}">
        <${type} name="${name}" id="">
        ${optionsToSelect}
        </${type}>
        <label>${label}</label>
        </div>
    `;
};




const formElement = (id, sel) => {
    return `
    <form id=${id}>
        ${selectElement(sel.type, sel.name, sel.label, sel.options)}
    </form>
    `;
};


const selectUpdate = async (event) => {
    if (event.target.getAttribute("name") === 'city') {
        document.getElementById('selectValue').innerHTML = event.target.value;

        const weatherRes = await request(event.target.value);
        const weatherObj = await weatherRes.json(); 
        console.log(weatherObj);
        document.getElementById('temperature').innerHTML = `<h2>${weatherObj.location.name} Temperature: ${weatherObj.current.feelslike_c} C</h2>`;
    }
};


const temperature =  (weatherObj) => {
    let returnHTML = "";
    returnHTML += `<h2>${weatherObj.location.name} Temperature: ${weatherObj.current.feelslike_c} C</h2>`;
    return returnHTML;
};
const country =  (weatherObj) => {
    let returnHTML = "";
    returnHTML += `<h2>Country: ${weatherObj.location.country}</h2>`;
    return returnHTML;
};
const gust =  (weatherObj) => {
    let returnHTML = "";
    returnHTML += `<h2>Gust(széllőkés): ${weatherObj.current.gust_kph} km/h</h2>`;
    return returnHTML;
};
const condition =  (weatherObj) => {
    let returnHTML = "";
    returnHTML += `
    <h2>Condition: ${weatherObj.current.condition.text}</h2>
    <img src="${weatherObj.current.condition.icon}">`;
    return returnHTML;
};


const request = async (city) =>{
    return fetch(`http://api.weatherapi.com/v1/forecast.json?key=b9130aafe432439095b164704210512&q=${city}&days=1&aqi=no&alerts=no`);

};



async function loadEvent() {
    const rootElement = document.getElementById('root');
    rootElement.insertAdjacentHTML('afterbegin', formElement("form", selectField));

    const weatherRes = await request("Budapest");
    const weatherObj = await weatherRes.json(); 
    console.log(weatherObj);

    rootElement.insertAdjacentHTML('afterend', `
    <div id="selectValue"></div>
    `); 

    rootElement.insertAdjacentHTML("beforeend", `<div id="temperature">${temperature(weatherObj)}</div>`);
    rootElement.insertAdjacentHTML("beforeend", `<div id="country">${country(weatherObj)}</div>`);
    rootElement.insertAdjacentHTML("beforeend", `<div id="gust">${gust(weatherObj)}</div>`);
    rootElement.insertAdjacentHTML("beforeend", `<div id="gust">${condition(weatherObj)}</div>`);
    const selectList = document.getElementById('form').querySelectorAll('select');
    for (const select of selectList) {
        select.addEventListener('change', selectUpdate)
    }

}
  
window.addEventListener("load", loadEvent);











