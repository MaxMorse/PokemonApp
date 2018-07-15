var demo = document.getElementById('demo');
var locationSelect = document.getElementById('Location-Select');
var areaSelect = document.getElementById('Area-Select');
console.log("hello world");
var pokeapi = 'https://pokeapi.co/api/v2/';
locationsArr = [];
locationAreasArr = [];
function getLocationAreas() {
  console.log("inside getLocationAreas");
  var Success = function(data) {
    console.log('success!');
    console.log(data.results[0].name);
    //getRequest(data.next, 'json', 'get', false, Success)
  };
  getRequest('https://pokeapi.co/api/v2/location-area/',  Success   );
}
function getRequest(path, Success) {
  $.ajax({
    url: path,//'https://pokeapi.co/api/v2/' + path + '/',
    dataType: 'json',
    type: 'get',
    cache: false,
    success: Success
  });
}


function getVersion() {
  demo.innerHTML += 'Loading versions<br>';
  getRequest('https://pokeapi.co/api/v2/version/',  loadVersions   );
        demo.innerHTML += 'Versions Loded<br>';
}




function selectVersion() {
  var regionsArr = [];
  var vGroupPath;

  var version = document.getElementById('Version-Select').value;
  //console.log(version);


  getRequest( 'https://pokeapi.co/api/v2/version/' + version + '/', getRequestVersionGroup);

}

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

}
function selectLocation() {
  console.log("in select location");
  var val = locationSelect.value;
  var path = pokeapi +'location/' + val + '/'
  getRequestLocation(path);
}

function getRequestLocation(path){
  console.log('in getRequestLocation')
  console.log('path: ' + path);
  getRequest(path, getRequestLocationAreas);
}

function getRequestLocationAreas(data)
{
  console.log("in get getRequestLocationAreas");
  var len = data.areas.length;
  console.log(data.areas[0].url);
  //if(data.areas.length > 0)
  //{
    loadAreaSelect();
  for(var i = 0; i < data.areas.length; i++)
  {
    //console.log("code is here");
    //console.log("data.areas.length: " +data.areas.length);
    console.log(data.areas[i].url);
    getRequest(data.areas[i].url, addArea);

  }
//}
//else console.log("only 1 area load encounters")
}
function loadAreaSelect(){
var text = '<select name="Area"><option value="default">Select Area</option></select>'
areaSelect.innerHTML = text;
}
function addArea(data){
  console.log("add area" + data.name);
  //areaSelect.innerHTML += '<option value='+data.name +'>' +data.name+'</option>';
}
