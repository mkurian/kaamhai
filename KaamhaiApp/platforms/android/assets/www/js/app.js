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
   
       openFB.init({appId: '518182581658668', tokenStore: window.localStorage});

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
       menu.setMainPage('page1.html', {closeMenu: true})
    }
  });

  module.controller('DetailController', function($scope, $data) {
    $scope.item = $data.selectedItem;
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
      
      data.items = [
          { 
              title: 'Arun P',
              label: '4h',
              desc: 'very good',
              rating: '4',
              category:'Maid'
          },
          { 
              title: 'Jaya',
              label: '6h',
              desc: 'cool',
              rating: '5',
              category:'Driver'
          },
          { 
              title: 'Komal',
              label: '1day ago',
              desc: '',
              rating:'3',
              category:'Helper'
          },
          { 
              title: 'Vidya',
              label: '1day ago',
              desc: '',
              rating: '2',
              category:'Maid'

          }
      ]; 

      for (var d in data.items){
        data.items[d].cat= data.items[d].category.substring(0,2).toUpperCase();
      }
     
      return data;
  });
})();

