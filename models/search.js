const axios = require('axios');
const fs = require('fs');



class Search{

    filePath = "./db/data.json";
   historial = [];

   constructor(){
    this.readInfo();
   } 

   async point(place = '') {

    try{

        const resp = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?language=es&access_token=${process.env.MAPBOX_KEY}`);

        return resp.data.features.map(lugar =>({
            id: lugar.id,
            nombre: lugar.place_name,
            lng: lugar.center[0],
            lat: lugar.center[1],
        }));

    }catch(error){

        return [];
    }
    
   }
   async weatherPlace(lat, lon){
       try{
        const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_KEY}&lang=es`);

        const {weather, main } = resp.data;

        return {
            desc: weather[0].description,
            min: main.temp_min,
            max: main.temp_max,
            temp: main.temp,
        };
        
       }catch(error){

            return [];
       }
   }

   addHistorial(lugar = ''){
       if(this.historial.includes(lugar.toLocaleLowerCase())){
           return;
       }

       this.historial.unshift(lugar.toLocaleLowerCase());

      const payload = {
          historial: this.historial
      } 

     this.saveInfo(payload);
    
   } 
   get historialCase(){

       return this.historial.map(lugar =>{
           let words = lugar.split(' ');
           words = words.map(p => p[0].toUpperCase() + p.substring(1));
           return words.join(' ');
       });
   }

   saveInfo(data){
    fs.writeFileSync(this.filePath,JSON.stringify(data)); 
    }

    readInfo(){

        if(!fs.existsSync(this.filePath)){
            return;
        }

        const info = fs.readFileSync(this.filePath,{encoding:'utf-8'});

        const data = JSON.parse(info);

        this.historial = data.historial;
    }
}
module.exports = Search;