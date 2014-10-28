/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function submit(){
    $("#main-pop-up").hide();

/*
    $.get( "http://pppdc9prd48r.corp.intuit.net:8080/kaamhai/jobAds?city=Bangalore&location=whitefield&category=maid", function( data ) {
        alert(data);
});*/
  $.get( "http://ec2-54-166-99-211.compute-1.amazonaws.com/kaamhai/jobAds?category=maid", function( data ) {
         var i = 1; 
           alert(data);

    $.each( data, function( key, value ) {
 
      $("<div class='EmpList' id='Empid"+i+"'></div>").appendTo("div#search-result");
      console.log("Emplist first"+i);

      $.each(value, function(key,value){

       var divId="div#Empid"+i;
        $("<div></div>").html(key+' : '+value).appendTo(divId);


      });
      console.log(value);
       var divId="div#Empid"+i;
       $("<div></div>").raty({ readOnly: true, score: value.rate }).appendTo(divId);
   
 
    i=i+1;
    console.log("sec"+i);
});
  
});
}

function displayForm(){
    console.log("display");
    $("#main-pop-up").hide();
    $("#search-result").hide();
    $("#form").show();
}



function yesToRefer(){
    $("#pop-up-box").hide();
}
function noToRefer(){
    $("#form").hide();
    $("#pop-up-box").hide();
    $("#search-result").show();

}

function referralSubmission(){

    var data ={"name":"Kamalappa","age":"45.0","location":"Whitefield","city":"Bangalore","language":"Kannada","contactInfo":"9000012345","experience":"10.0","description":"He is very dedicated, comes on time and finishes fast. Very neat and clean. He is available for 1 hour everyday from 10-11 am and needs extra income. So I thought I'll post this to help him find a slot. He has got his profile verification done at Whitefield Police Station. So you can ask for that document as well.","availability":"10 -11 am, daily","category":"maid"};

 /*   $.post("http://ec2-54-166-99-211.compute-1.amazonaws.com/kaamhai/jobAds",data,function(){
      alert("Your submission has been recorded");
    });
   
    $("#pop-up-box").show();
*/
$.ajax({
      url:"http://ec2-54-166-99-211.compute-1.amazonaws.com/kaamhai/jobAds",
      type:"POST",
      data:data,
      contentType:"application/json",
      success: function(){
         alert("Your submission has been recorded");
  }
  });
}
