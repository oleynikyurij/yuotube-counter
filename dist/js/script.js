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
var idChanel = 'UC_x5XG1OV2P6uZZ5FSM9Ttw';
var part = 'statistics,brandingSettings';
var nameChannel = document.querySelector('#nameChannel');
var descriptionChannel = document.querySelector('#descriptionChannel');
var imageChannel = document.querySelector('#imageChannel');
var countChannel = document.querySelector('#count');

var showStat = function showStat() {
  client.get("https://www.googleapis.com/youtube/v3/channels?part=".concat(part, "&id=").concat(idChanel, "&key=AIzaSyAT6jSrSXneZIpYACljCNlF65ym37kZqIg"), function (response) {
    console.log(JSON.parse(response).items[0]);
    var info = JSON.parse(response).items[0];
    nameChannel.innerText = info.brandingSettings.channel.title;
    descriptionChannel.innerText = info.brandingSettings.channel.description;
    countChannel.innerText = info.statistics.subscriberCount;
    imageChannel.src = info.brandingSettings.image.bannerImageUrl;
  });
};

showStat();