

var citiesList = new Array();


  $( document ).ready(function() {
    console.log( "ready!" );
	$.getJSON('cities.json', function(data) {
            for(var i=0;i<data.cities.length;i++){
                citiesList.push(data.cities[i].name);
				};
	});
	console.log("json ready");
	$( "#tags" ).autocomplete({
      source: citiesList,
	  minLength: 3
    });
	
	
});
