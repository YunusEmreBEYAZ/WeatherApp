
window.addEventListener('load', () => {
    let lon;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let iconImg = document.querySelector('.icon');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
           lon = position.coords.longitude;
           lat = position.coords.latitude;

           const api = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=daily&appid=7791ac8416d3e364e417f68a325c2119`;
       
           fetch(api)
           .then(response => response.json())
           .then(data => {
            console.log(data);
            const {temp} = data.current;
            const {description} = data.current.weather[0];
            const {icon} = data.current.weather[0];

            temperatureDegree.textContent = Math.floor(temp);
            temperatureDescription.textContent = description;
            locationTimezone.textContent = data.timezone;
            iconImg.src =`http://openweathermap.org/img/wn/${icon}@2x.png`;

            //Formula for celsius
            let celsius = (temp - 273,15);

            //Change temperature to Celsius/Fahrenheit
            temperatureSection.addEventListener('click', () => {
                if(temperatureSpan.textContent === 'F'){
                    temperatureSpan. textContent = 'C';
                    temperatureDegree.textContent = Math.floor(celsius);
                } else {
                    temperatureSpan. textContent = 'F';
                    temperatureDegree.textContent = Math.floor(temp);
                }

            });


           });
        });
    } 
})