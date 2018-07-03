console.log("hello world");
var response;
/*$.getJSON('pokemon.json', function(dsta) {
  console.log('it worked');
});
*/
$.ajax({
  url: 'pokemon.json',
  dataType: 'json',
  type: 'get',
  cache: false,
  success: function(data) {
    $(data.pokemon).each(function(index, value){
      console.log(value.name);
    });

  }
});
/*
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        response = JSON.parse(xhttp.responseText);
        console.log(response)
    }
  };
  xhttp.open("GET", "pokemon.json", true);
  xhttp.send();
}
*/
