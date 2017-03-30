
function getLocation(){
  var showtrue=false;
  var lat;
  var api;
  var long;
  var city;
  if ( window.chrome ) {
                $.getJSON('http://ip-api.com/json', function(json) {
                      lat = json.lat;
                      long = json.lon;
                  
                      getInfo(lat,long,showtrue);
                      getIcon()
                });
   }
   else {
        if ( navigator.geolocation ) {
                navigator.geolocation.getCurrentPosition(function(data) {
                  lat = data.coords.latitude;
                  long = data.coords.longitude;
                 });
          getInfo(lat,long, showtrue);
          
        }
   }
};
function getInfo(lat, long ,showtrue ){
  // openweather API
         api='http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' +   long + '&units=imperial&appid=407a576b16bcb66611f58d2cdf30b088';


          $.getJSON(api, function(json) 
          {


              $("#desc").html(json.weather[0].main+" </br>")

              $("#icon").html('<img src="http://openweathermap.org/img/w/'+json.weather[0].icon+'.png">')

              $("#CityCountry").html(json.name+",         "+json.sys.country);

              var celcius = Math.round((json.main.temp - 32) * 5 / 9)

              $("#temp").html(parseInt(json.main.temp)+"°")

              $( "#unit-switch" ).click(function() 
                {
                     if(showtrue===true)
                       {
                         $("#temp").html(parseInt(json.main.temp)+"°")
                           showtrue=false;
                       }
                     else
                       {
                          $("#temp").html(parseInt(celcius)+"°")
                          showtrue=true;
                       }
                });
          });
    }; 


$(function(){
  getLocation();
 
})