(function(){
  'use strict';
  var module = angular.module('app', ['onsen']);

  module.controller('AppController', function($scope, $data) {
    $scope.doSomething = function() {
      setTimeout(function() {
        alert('Marked as watched');
      }, 100);
    };


    $scope.login = function(){
   
       openFB.init({appId: '518182581658668'});

        openFB.login(
                function(response) {
                    if(response.status === 'connected') {

                        openFB.api({path: '/me', 
                          success: function(resp){

                            $("#userName").html(resp.name);
                            $("#userPic").attr('src','http://graph.facebook.com/' + resp.id + '/picture?type=small');
                           // document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
                            $("#login-profile").show();
                          },
                          error: function(error){alert("error"+error);}});

                       // $.get('https://graph.facebook.com/me?access_token=CAAHXSMi1ZACwBAD6x2HeQqvAMYy1zOJaqilTCSj74zTvE6N0dqTe0u8VvgDLZBoMfMs1HjZAN86osIjGUD4UhbZBkNdcmiXSrWPbHWI0hDKFZCkGtSFmcspoLFaz0GgG1endb5qPAHDG4tKRV8s9UHDZCtNQY6UJ3kc9YchqyqSjEMrVoOMQvkObsiB2ocwyUo5OxrLUTBzE0qyNZBU3FjFx7u9gLtEbO4ZD',function(resp){alert(resp);});
  
                    
                    } else {
                        console.log('Facebook login failed: ' + response.error);
                    }
                }, {scope: 'email,read_stream,publish_stream'});
    $scope.menuPage1();

    }

    $scope.menuPage1 =function(){
         menu.setMainPage('page1.html', {closeMenu: true})

    }
    $scope.searchForEmp = function(){
      console.log("searchEmp");
                  var searchString = $("#searchStr").val();
             $.ajax({
                      type:"GET",
                      url:'http://ec2-54-166-99-211.compute-1.amazonaws.com/kaamhai/jobAds/search?q='+searchString,
                      async:false,
                      success:function(responseText)
                      {
                        $data.items = responseText;
                        $scope.items =responseText;

                     
                      }});
            for (var d in $data.items){
              $data.items[d].cat= $data.items[d].category.substring(0,2).toUpperCase();}
              $scope.menuPage1();
            }
    $scope.submitForm =function(){
      console.log("Submitting Form");
      var data = {}; 

      data.name = $("#name").val();
      data.age = $("#age").val(); 
      data.location = $("#location").val();
      data.city = $("#city").val();
      data.language = $("#language").val(); 
      data.contactInfo = $("#contact").val();
      data.experience = $("#experience").val();
      data.description = $("#description").val();
      data.availability = $("#availability").val();
      data.category = $("#category").val();
      data.expectedPay = $("#pay").val();
      data.rating = $("#rating").val();
       console.log(JSON.stringify(data));


       $.ajax({
                      type:"POST",
                      url:'http://ec2-54-166-99-211.compute-1.amazonaws.com/kaamhai/jobAds',
                      async:true,
                      data: JSON.stringify(data),
                      contentType: "application/json",
                      
                      success:function(responseText)
                      {
                         alert('success');

                     
                      },
                    error:function(resp){
                        alert("Sorry we couldn't record your response");
       }
       }
                    
                    
             );

    }

$scope.changeColor= function(){
    $('#flag').css('color','#4282CC');
}


  });

  module.controller('DetailController', function($scope, $data) {
    $scope.item = $data.selectedItem;
  });

  module.controller('FormController',function($scope){
    

  });

  module.controller('MasterController', function($scope, $data) {
    $scope.items = $data.items;  
    
    $scope.showDetail = function(index) {
      var selectedItem = $data.items[index];
      $data.selectedItem = selectedItem;
      $scope.ons.navigator.pushPage('detail.html', {title : selectedItem.title});
    };
  });

  module.factory('$data', function() {
      var data = {};
      var city;
      navigator.geolocation.getCurrentPosition(function (position) {
              console.log(position.coords.latitude + "-" + position.coords.longitude);
              var urlText="http://maps.googleapis.com/maps/api/geocode/json?latlng="+
                position.coords.latitude +","+position.coords.longitude+"&sensor=true";


              $.ajax({

                type:"POST",
                url: urlText,
                async:true,
                success:function(responseText){

               
               
                if(responseText.results.length>0)
                {
               
                var locationDetails=responseText.results[0].formatted_address;
                var  value=locationDetails.split(",");
               
                var count=value.length;
               
                var country=value[count-1];
                var state=value[count-2];
                city=value[count-3];
              }
            }
          });},function (error) {  
              alert('code: '    + error.code +'message: ' + error.message + '\n'); 
                  });

     
      if(city==undefined)
      {
        city="Bangalore";
      }
      console.log(city);
       $.ajax({
                      type:"GET",
                      url:'http://ec2-54-166-99-211.compute-1.amazonaws.com/kaamhai/jobAds?city='+city,
                      async:false,
                      success:function(responseText)
                      {

                        console.log(responseText[0].name);
                        data.items =responseText;
     
                      }});


      for (var d in data.items){
        data.items[d].cat= data.items[d].category.substring(0,2).toUpperCase();
      }
     return data;
  });
})();

