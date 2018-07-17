var ecountersArr = [];
var encountersTable = document.getElementById('encounters-table');
var demo = document.getElementById('demo');
var locationSelect = document.getElementById('Location-Select');
var areaSelect = document.getElementById('Area-Select');
console.log("hello world");
var pokeapi = 'https://pokeapi.co/api/v2/';
locationsArr = [];
locationAreasArr = [];
function LocationArea(url, name) {
    this.url = url;
    this.name = name;
}
//getRequest(pokeapi + 'location-area/290/', LocationAreaData);


//Select functions
function selectVersion() {
console.log("in selectVersion()");
  var regionsArr = [];
  var vGroupPath;
  var version = document.getElementById('Version-Select').value;
  console.log(version);


  getRequest( 'https://pokeapi.co/api/v2/version/' + version + '/', getRequestVersionGroup);

}

function selectLocation() {
  console.log("in select location");
  var val = locationSelect.value;
  var path = pokeapi +'location/' + val + '/'
  getRequestLocation(path);
}


function selectArea(){
  console.log(document.getElementById("Area-Select").value );
  locationAreasArr.forEach(function(item, index){
    if (item.name == document.getElementById("Area-Select").value) {getRequestLocationArea(item.url) }
  });

}
//load functions
function loadVersions(data) {
  console.log(data.results);
  for(var i = 0; i < data.results.length; i++) {

    document.getElementById('Version-Select').innerHTML += '<option value="' + data.results[i].name +'">' +data.results[i].name+'</option>';
    if(data.next) {

      getRequest(data.next,  loadVersions);
    }
    else {
      return
    }

  }
}



function getRequestLocation(path){
  console.log('in getRequestLocation')
  console.log('path: ' + path);
  getRequest(path, getRequestLocationAreas);
}

function getRequestLocationAreas(data){
  console.log("in get getRequestLocationAreas");
  var len = data.areas.length;
  //console.log(data.areas[0].url);
  if(data.areas.length > 0)
  {
   document.getElementById('area-select-control').style.display = "block";
  for(var i = 0; i < data.areas.length; i++)
  {
    locationAreasArr.push(new LocationArea(data.areas[i].url, data.areas[i].name));
     //push obj into locationAreasArr
     console.log(locationAreasArr);
     //console.log("add area: " + data.url);

    console.log(data.areas[i].url);
    getRequest(data.areas[i].url, addArea);

  }
}
//else console.log("only 1 area load encounters")
}
function loadAreaSelect(){
var text = '<select name="Area"><option value="default">Select Area</option></select>'
areaSelect.innerHTML = text;
}
function addArea(data){
  //create LocationArea obj
  document.getElementById("Area-Select").innerHTML += '<option value="' + data.name+ '">'+data.name +'</option>'
}


///get functions
function getRequest(path, Success) {
  $.ajax({
    url: path,//'https://pokeapi.co/api/v2/' + path + '/',
    dataType: 'json',
    type: 'get',
    cache: false,
    success: Success
  });
}

function getRequestVersion() {
  demo.innerHTML += 'Loading versions<br>';
  getRequest('https://pokeapi.co/api/v2/version/',  loadVersions   );
        demo.innerHTML += 'Versions Loded<br>';
}

function getRequestVersionGroup(data) {

  vGroupPath = data.version_group.url;
  console.log(vGroupPath);
  getRequest(vGroupPath, getRequestRegions );

}

var getRequestRegions = function(data){
  var regionsArr = [];
  //console.log("inside success 2");


  for(var i = 0; i < data.regions.length; i++)regionsArr.push(data.regions[i].url );
  for(var i = 0; i < regionsArr.length; i++)
  {
      //console.log("about to call suuc3")
      getRequest(regionsArr[i], getRequestLocations)
  }
}

 function getRequestLocations(data){
   console.log("inside get request location");
  var l = locationsArr.length;
  for(var i = 0; i < data.locations.length; i++)
  {
    locationsArr.push(data.locations[i]);
  }
    for (var i = l; i < locationsArr.length; i++)
    {
        //getRequest(locationsArr[i].url, getRequestLocationAreas);
        locationSelect.innerHTML += '<option value="' + locationsArr[i].name+ '">'+locationsArr[i].name +'</option>'
    }
    //reveal location select
    document.getElementById('location-select-control').style.display = "block";
}

function getRequestLocationArea(path) {
  getRequest(path, LocationAreaData)
}

function  LocationAreaData(data){
  console.log(data.pokemon_encounters);
  encountersTable.innerHTML += '<tr><th>Pokemon</th><th>Encounter Rate</th></tr>'
  for (var i = 0; i< data.pokemon_encounters.length;i++){
      for(var j = 0; j < data.pokemon_encounters[i].version_details.length; j++) {
      //if(data.pokemon_encounters[i].version_details[j].version.name == "red") {
      if (data.pokemon_encounters[i].version_details[j].version.name == document.getElementById('Version-Select').value) {
          encountersTable.innerHTML += '<tr><td>' +data.pokemon_encounters[i].pokemon.name + '</td><td>'+ data.pokemon_encounters[i].version_details[j].max_chance +'</td></tr>'
      }

    }
    }
 }
