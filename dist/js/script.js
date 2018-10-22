"use strict";

var httpClient = function httpClient() {
  this.get = function (aUrl, aCallback) {
    var anHTTPRequest = new XMLHttpRequest();

    anHTTPRequest.onreadystatechange = function () {
      if (anHTTPRequest.readyState == 4 && anHTTPRequest.status == 200) {
        aCallback(anHTTPRequest.responseText);
      }
    };

    anHTTPRequest.open('GET', aUrl, true);
    anHTTPRequest.send(null);
  };
};

var client = new httpClient();

var showStat = function showStat() {
  client.get('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=AIzaSyAT6jSrSXneZIpYACljCNlF65ym37kZqIg', function (response) {
    console.log(JSON.parse(response).items[0].statistics.subscriberCount);
    document.querySelector('#count').innerText = JSON.parse(response).items[0].statistics.subscriberCount;
  });
};

showStat();