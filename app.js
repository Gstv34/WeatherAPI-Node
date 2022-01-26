 require('dotenv').config(); 
 require('colors');
const {readInput,showMenu,pause,listPlaces} = require("./helpers/inquirer");
const Search = require("./models/search");

   const main = async() =>{

    const search = new Search();

    let opt = 0;
    do{
        opt = await showMenu();

        switch(opt){

            case 1:
            //Show message
            const busqueda = await readInput(``.red + ' Lugar:');
            
            //Search point
            const lugares = await search.point(busqueda);

            //Select place
            const id = await listPlaces(lugares);
            if(id === '0') continue;

            const lugarSelect = lugares.find(lug => lug.id === id);
             search.addHistorial(lugarSelect.nombre);
            //Weather
            const clima = await search.weatherPlace(lugarSelect.lat,lugarSelect.lng);
            //Show results
             console.log('`\n\tCiudad: ',lugarSelect.nombre );
             console.log('\tLat: ',lugarSelect.lat );
             console.log('\tLong: ',lugarSelect.lng );
             console.log(`\tTemperatura: ${clima.temp} ${iconWeather(clima.desc)}`);
             console.log('\tMin: ',clima.min );
             console.log('\tMax: ', clima.max);

             await pause();
            break;

            case 2: search.historialCase.forEach((place,i)=>{
                console.log(`\n\t${(i+1)}. ${place} `);
            })
            await pause();
             break;
        }
        
    }while(opt !== 3);
    
    }

    const iconWeather = (desc) =>{

        switch(desc){
            case 'muy nuboso': return ` ${desc}`.magenta ; 
            case 'algo de nubes': return `杖 ${desc}`.cyan ;
            case 'nubes': return ` ${desc}`.blue ; 
            case 'nubes dispersas': return `摒 ${desc}`.green ;  
            case 'cielo claro': return ` ${desc}`.yellow ; 
            default : return desc;
        }
    }

    main();
