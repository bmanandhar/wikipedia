
var arrResults = [];
  var html = "";

  //Create structure for the data
  function Result(title, snippet) {
    this.title = title;
    this.snippet = snippet;
  }

  function search() {
  //Ajax for data manipulation
  $.ajax({
    url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + $('#search').val(),
    dataType: "jsonp",
    type: "POST",
    headers: {"Api-User-Agent": "Example/1.0"
             },
    success: function(data) {
      //clear the children from our class to make sure no previous results are showing up.
      $(".results").empty();
      // Then clear the array with results before getting new information
      arrResults.length = 0;
      var resArr = data.query.search;
      //For each result, generate the html data.
      for (var result in resArr) {
        arrResults.push(new Result(resArr[result].title, resArr[result].snippet));
        html = '<div id="articles" class="well"><a href="https://en.wikipedia.org/wiki/' + resArr[result].title + '"target="_blank"><h3>' + resArr[result].title + '</h3><p>' + resArr[result].snippet + '</p></a></div>';

        //Displays elements to the page
        $(".results").append(html);
      }
    }
  });
    //This will handle when to display results based on the search bar.
    if ($("#search").val().length > 0) {
      $(".articles").css("display", "none");
    } else if ($("#search").val().length < 1) {
      //Display everything again
      $(".articles").css("display", "block");
    }
    //This makes things tick with each key strokr
    $("#search").unbind("keyup");
    $("#search").keyup(function(){
      search();
    });
  }
  $("#search").keyup(function() {
    search();
  });
