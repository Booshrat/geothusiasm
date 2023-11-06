const axios = require('axios'); // allows to make HTTP requests from a web application.

async function randomFlag() {
    try {
        const response = await axios.get("https://geothusiasm-0gow.onrender.com/countries/random");

        const flag = response.data.flag;
        const fact = response.data.fact;

        console.log(flag);
        //console.log(fact);

    } catch(error) {
        console.log(error)
    }
}

randomFlag();
