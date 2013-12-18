var app = {
    pagelist : [],
    pageidlist : [],
    pagetextcontent : [],
    staticlist : []

}

$(function(){

   
   
///////////////////Ajax jsonp function to get data from json file////////////////
		
    
function jsonTitles(holdData){

    $.ajax({
        url: 'http://www.stuartbyrne.com/pfai/content.json',
        /*url: 'content.json',*/
        jsonpCallback: 'jsonCallback',
        dataType: 'jsonp',
        timeout: 5000,
        success: function(data) {
            console.log(data);
            holdData(data);
            initiateList();
            
        },
        error: function() {
            alert('Unable to connect to database. Services will be limited.');
            
            $.ajax({
       
                url: 'content.json',
                jsonpCallback: 'jsonCallback',
                dataType: 'jsonp',
                timeout: 5000,
                success: function(data) {
                    console.log(data);
                    holdData(data);
                    initiateList();
                    
                },
                error: function() {
                    alert('Error loading. Please re-open the app.');
                }
                
            });
        }   
        
    });
}
    
///////////////////Calls the ajax jsonp function which retreives the data////////////////

    
jsonTitles(function(content){
    
        var	appTitle = $(content.app).attr('appTitle'),
            subTitle = $(content.app).attr('subTitle'),
            newsTitle = $('#newsTitle'),
            /*newsList = $('#newsList'),*/
            collapseList = $('#collapseList'),
            homeList = $('#homeList'),
            transList = $('#transList'),
            logLeft = $('#loglistLeft'),
            $body = $('body'),
            section = $(content.app.section);
    
    
    
    
///////////////////Assigning Titles from json array//////////////////////
    
    
        $('#home div h1').html(appTitle);
        $('#home div h2').html(subTitle);
            
    
///////////////////Parsing through the json file and applying variables to the different titles////////////////
            
        section.each(function(i){
                    var num = i + 1,
                        pageid = $(this).attr('id'),
                        pagetitle = $(this).attr('title'),
                        pagecontent = $(this).attr('content');
            
                        app.pagelist.push(pagetitle);
                        /*testArray.push(pagetitle);*/
                        app.pageidlist.push(pageid);
                        app.pagetextcontent.push(pagecontent);
                        app.staticlist.push(pageid);
            
////////////////////Create List navigation in left panel on home page///////////////////////
            
        homeList.append(
            $('<li />', {
                'data-theme': 'c'
            }).html('<a href="#' + pageid + '"><span class="icon-' + pageid + '">' + pagetitle + '</span></a>')).listview('refresh');
            
            
///////////////////Creates the individual pages for each section////////////////
                        $body.append($('<div />', {
                            id: pageid,
                            'data-role': 'page'
                        }).append($('<div />', {
                            'data-role': 'header',
                            'data-position': 'fixed',
                            id: pageid + 'header',
                            'data-theme': 'c'
                        }).html('<a href="#left-panel" id="menuNav" class="ui-nodisc-icon" data-role="none"><img src="images/nav_g.png"/>Menu</a><h1 id="sectionTitle">'+ pagetitle +'</h1><a href="#home" id="homeNav" class="ui-icon-nodisc" data-role="none">Home</a>')).each(function(){
                        
                            $(this).append($('<div />', {
                                'data-role': 'content',
                                'id': pageid + 'Content'
                            })).append($('<div />', {
                                    'data-role': 'panel',
                                    'class': 'ui-icon-alt',
                                    id: 'left-panel'
                                    }).each(function(){
                                
                                            $(this).append($('<div />', {
                                            'data-role': 'controlgroup'
                                            }).html('<p>Menu</p>')).append($('<div />', {
                                                                        'data-role': 'content' 
                                                                        }).append($('<ul />', {
                                                                        'data-role': 'listview',
                                                                        'data-icon': 'false',
                                                                        'class': 'ui-nodisc-icon ui-alt-icon',
                                                                        'id': 'listLeft'
                                                                        })))
                                                    }))
                                        }));
            
        });//////End of Section Loop//////
    
    
////////////////////Re-arranging the arrays for static text content i.e removing 'transfer list' and 'news' sections/////////////////////
    
    app.staticlist.splice(0, 2);
    app.staticlist.pop();
    
    app.pagetextcontent.splice(0, 2);
    app.pagetextcontent.pop();
    
////////////////////Add static text content to static pages/////////////////////
    
    $(app.staticlist).each(function(i){
        var pagename = app.staticlist[i],
            pagetext = app.pagetextcontent[i];
           
           $('#' + pagename + 'Content').html('<img class="static-image" src="images/content/' + pagename + '.png"/><p>' + pagetext + '</p>');
               
    });
    
////////////////////Add loader to Maps page/////////////////////
    
    $('#mapsContent').append($('<div/>', {
        'id': 'loader'
    }).html('<h2>Loading Map</h2><img src="images/load.gif"/>'));
                   
           
    });///End jsonTitles Function///
    
    
});///End jQuery Function///




/////////////Apply click styling to communication buttons on homepage//////////////

/*if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){};*/

 if( /Chrome|Safari|IE/i.test(navigator.userAgent) ) {
     $('#com a').on('mousedown', function(){
         $(this).css('background', 'rgba(129, 129, 129, 0.8)');
            }).on('mouseup', function(){
                $(this).css('background', 'rgba(20, 20, 20, 0.8)');
                });
           
        }else{
            $('#com a').on('touchstart', function(){
         $(this).css('background', 'rgba(129, 129, 129, 0.8)');
            }).on('touchend', function(){
                $(this).css('background', 'rgba(20, 20, 20, 0.8)');
                });
            
        }


/////////////Apply click events to communication buttons on homepage//////////////

$('#mail a').on('click', function(){
    $(this).attr('href', 'mailto:info@pfai.ie');
    });

$('#call a').on('click', function(){
    $(this).attr('href', 'tel:0035318999350');
    });

$('#twitter a').on('click', function(){
window.open('https://twitter.com/PFAIOfficial');
    });

$('#face a').on('click', function(){
window.open('https://www.facebook.com/pages/PFAIOfficial/137333183069003');
    });

   

////////////////////Build transfer list/news pages on successful ajax request//////////////////////////

/*setTimeout(function(){*/
    
function initiateList(){
    
////////////////////Create empty table for dynamic transfer listed player//////////////////////////
    
    $('#transferlistContent').html('<table><thead><tr><th>#</th><th>Name</th><th>Club</th><th>Pos</th><th>Age</th><th>dob</th><th>kg</th> <th>Exp</th> </tr></thead><tbody></tbody></table>');
    
////////////////////Get Current Transfer List from getList.php//////////////////////////
    
    function getList(holdData){
                
        $.ajax({
        
            /*url: 'getList.php',*/
            url: 'http://www.stuartbyrne.com/pfai/getList.php',
            dataType: 'json',
            success: function(data) {
                console.log(data);
                holdData(data);
            },
            error: function(){
                   $.ajax({
        
                    url: 'getList.json',
                    dataType: 'json',
                    success: function(data) {
                        holdData(data);
                    }
                });
            }
        });
}
    
    
    getList(function(list){
        
        console.log(list);
        
        var $item = list.item,
            $tbody = $('#transferlistContent tbody');
        
                        
        $($item).each(function(i){
            
            var playerNum = i + 1,
                $name = $(this)[0].task_name,
                $club = $(this)[0].task_club,
                $pos = $(this)[0].task_pos,
                $age = $(this)[0].task_age,
                $dob = $(this)[0].task_dob,
                $weight = $(this)[0].task_weight,
                $exp = $(this)[0].task_exp;
                
            console.log($name);
            $tbody.append($('<tr/>', {
                'id': 'row'
            
            }).html('<td>' + playerNum + '</td><td>' + $name + '</td><td>' + $club + '</td><td>' + $pos + '</td><td>' + $age + '</td><td>' + $dob + '</td><td>' + $weight + '</td><td style="background-color:' + $exp + '"></td>'));
                
        
        
        });
        
    });
    
////////////////////Get Current News from getNews.php//////////////////////////
    
    function getNews(holdNews){
                    
            $.ajax({
            
                /*url: 'getNews.php',*/
                url: 'http://www.stuartbyrne.com/pfai/getNews.php',
                dataType: 'json',
                success: function(data) {
                    console.log(data);
                    holdNews(data);
                },
                error: function(){
                   $.ajax({
        
                    url: 'getNews.json',
                    dataType: 'json',
                    success: function(data) {
                        holdNews(data);
                    }
                });
            }
            });
    }
    
    
    getNews(function(news){
        
        var $newsitem = news.item,
            newsContent = $('#newsContent');
        
        console.log($newsitem);
    
        newsContent.append($('<ul/>', {
                        'data-theme': 'c',
                        'data-role': 'listview',
                        'id': 'newslist',
                        'class': 'ui-nodisc-icon ui-alt-icon'
                    
        }));
        
                        
        $($newsitem).each(function(i){
            
            var articleNum = i + 1,
                $body = $('body'),
                $articleid = $(this)[0].article_id,
                $articledate = $(this)[0].article_date,
                $headline = $(this)[0].article_headline,
                $image = $(this)[0].article_image,
                $caption = $(this)[0].article_caption,
                $text = $(this)[0].article_text,
                $newslist = $('#newslist');
        
        $newslist.append(
                        $('<li />', {
                            /*'data-theme': 'c',*/
                            'data-icon': 'false',
                            'class': 'ui-icon-alt ui-icon-nodisc'
                        }).html('<a href="#' + $articleid + '"><img src="images/news/' + $image + '"><h2>' + $headline + '</h2><p>' + $text +'</p><p class="ui-li-aside">' + $articledate + '</p></a>'));
    

                console.log($articleid);
                
                $body.append($('<div />', {
                            id: $articleid,
                            'data-role': 'page'
                        }).append($('<div />', {
                            'data-role': 'header',
                            'data-position': 'fixed',
                            id: $articleid + 'header',
                            'data-theme': 'c'
                        }).html('<a href="#left-panel" id="menuNav" class="ui-nodisc-icon" data-role="none"><img src="images/nav_g.png"/>Menu</a><h1 id="sectionTitle">Latest News</h1><a href="#home" id="homeNav" class="ui-icon-nodisc" data-role="none">Home</a>')).each(function(){
                        
                            $(this).append($('<div />', {
                                'data-role': 'content',
                                'id': $articleid + 'Content',
                                'class': 'feature'
                            }).html('<h2 class="article-headline">' + $headline + '</h2><p class="article-caption">' + $caption + '</p><img src="images/news/'+ $image +'"/><span class="article-date">' + $articledate + '</span><p>'+ $text +'</p>')).append($('<div />', {
                                    'data-role': 'panel',
                                    'class': 'ui-icon-alt',
                                    id: 'left-panel'
                                    }).each(function(){
                                
                                            $(this).append($('<div />', {
                                            'data-role': 'controlgroup'
                                            }).html('<p>Menu</p>')).append($('<div />', {
                                                                        'data-role': 'content' 
                                                                        }).append($('<ul />', {
                                                                        'data-role': 'listview',
                                                                        'data-icon': 'false',
                                                                        'class': 'ui-nodisc-icon ui-alt-icon',
                                                                        'id': 'listLeft'
                                                                        })))
                                            }))
                                        }));
                
                
                
        
        });
        
//////////////////Create left panel list from gloabl page array, in individual news pages//////////////////
/*console.log($testArray);*/
        
$(app.pagelist).each(function(i){
           
            $('[data-role="panel"] ul:not(#homeList)').append(
                        $('<li />', {
                            'data-theme': 'c'
                        }).html('<a href="#' + app.pageidlist[i] +'"><span class="icon-' + app.pageidlist[i] + '">' + this + '</span></a>'));
               
    });
        
//////////////////Apply class "app" to news section for responsive css/////////////////////
    
    var newspage = $('#news');
    newspage.attr('class', 'app');
        
    });
    
}

/*},4000);*/


//////////////////////Initiate Maps///////////////////
    
        $( document ).on( "pageshow", "#maps", function() {
       
    var defaultLatLng = new google.maps.LatLng(53.3954533, -6.355980);  // Default to PFAI offices, Dublin when no geolocation support
    if ( navigator.geolocation ) {
        function success(pos) {
            // Location found, show map with these coordinates
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            $('#mapsContent').gmap('addMarker', defaultLatLng);
        }
        function fail(error) {
            drawMap(defaultLatLng);  // Failed to find location, show default map
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    } else {
        drawMap(defaultLatLng);  // No geolocation support, show default map
    }
    function drawMap(latlng) {
        var myOptions = {
            zoom: 10,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("mapsContent"), myOptions);
        // Add an overlay to the map of current lat/lng
        var marker = new google.maps.Marker({
            position: defaultLatLng,
            map: map,
            title: "We are here!"
        });
    }
});
    
//////////////////////End Maps//////////////////////////








	







