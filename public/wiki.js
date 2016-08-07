$(document).ready(init);

function init() {
    // $('div :input').fancyInput();
    $('#searchbox').keypress(function (e) {
      if (e.which == 13) {
          var searchterm = $('#searchbox').val();
        $('#searchstuff').removeClass('centered').addClass('topcentered')  
        $('#data').html('');
        $('#clear').show();  
        $.ajax({
          type: "POST",
          url: '/api',
          data: {searchterm},
          success: function (data) {
            var data = JSON.parse(data);
            var pages = data.query.pages;
             // console.log(data.query.pages);
            for (var a in pages) {
                var thumb = pages[a].thumbnail
                //var thumb = "https://upload.wikimedia.org/wikipedia/commons/6/6c/"+pages[a].pageimage
                if (thumb) {
                //console.log(thumb)
              //  console.log(thumb.source.match(/\d+px/))
                thumb2 = thumb.source.replace(/\d+px/,"150px")
                //console.log(thumb2)
                    //$('#data').append('<img src ="'+thumb.source+'">')
                $('#data').append(
                    '<a class="nodecorate" target="_blank" href="https://en.wikipedia.org/?curid='+pages[a].pageid+'"> <div class="wikipage animated fadeInLeft hvr-grow hvr-outline-in"> <img class="thumb" src ="'+thumb2+'"><p class="title">'+pages[a].title+'</p> <p class="desc">'+ pages[a].extract+'</p></div></a>'
                )
                }
                else {
                      $('#data').append(
                    '<a class="nodecorate" target="_blank" href="https://en.wikipedia.org/?curid='+pages[a].pageid+'"> <div class="wikipage animated fadeInLeft hvr-grow hvr-outline-in"><p class="title">'+pages[a].title+'</p> <p class="desc">'+ pages[a].extract+'</p></div></a>'
                )
                }
            }
              
//            $('.wikipage').mouseenter(function() {
//                //$(this).addclass('animated wobble')
//                $(this).removeClass('animated fadeInLeft').addClass('hvr-grow hvr-outline-in')
//            })
              setTimeout(function(){ 
              
              $('.wikipage').removeClass('animated fadeInLeft');
              }, 800);
          }
        });
        return false;
      }
        
    });
    
    $("#searchbox").autocomplete({
    source: function(request, response) {
        $.ajax({
            url: "//en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                'action': "opensearch",
                'format': "json",
                'search': request.term
            },
            success: function(data) {
                response(data[1]);
            }
        });
    }
});

    $('#clear').on("click", function() {
        $('#data').html('');
        $('#searchbox').val('');
        $('#searchstuff').removeClass('centered topcentered').addClass('centered');
        $('#clear').hide();
    })
}