window.addEventListener("load", ()=>{
  let lat;
  let long
  let TempDes = document.querySelector(".temp-des");
  let TempDeg = document.querySelector(".temp-degree");
  let locTime = document.querySelector(".location-timezone");
  let tempSection = document.queryCommandEnabled(".temp");//why isn't working
  let tempSpan = document.querySelector(".temp span");

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const api = `${proxy}https://api.darksky.net/forecast/16da66bf0598aa44c9d138d8c62e55b2/${lat},${long}`;

        fetch(api)
          .then(response=>{
            return response.json();

          })
            .then(data =>{
              console.log(data);
              const {temperature,summary,icon} = data.currently;
              TempDeg.textContent = temperature;
              TempDes.textContent = summary;
              locTime.textContent = data.timezone;
              //icons
              setIcon(document.querySelector(".icon1"),icon);
              //c to f
              let celsius = (temperature - 32) * (5/9);
              let celTemp = Math.floor(celsius)
              tempSpan.addEventListener("click",()=>{
                if(tempSpan.textContent === "°F"){
                  tempSpan.textContent = "°C";
                  TempDeg.textContent = celTemp;
                }else{
                  tempSpan.textContent = "°F";
                  TempDeg.textContent = temperature;
                }
              });
            });
        });
    }



function setIcon(iconId,icon) {

  const skycons = new Skycons({"color": "white"});
  const currentIcon = icon.replace(/-/g,"_").toUpperCase();
  skycons.play();
  skycons.set(iconId, Skycons[currentIcon]);


}

});

