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
var form = document.querySelector('#form');

var showStat = function showStat(id) {
  client.get("https://www.googleapis.com/youtube/v3/channels?part=".concat(part, "&id=").concat(id, "&key=AIzaSyAT6jSrSXneZIpYACljCNlF65ym37kZqIg"), function (response) {
    console.log(JSON.parse(response).items[0]);
    var info = JSON.parse(response).items[0];
    nameChannel.innerText = info.brandingSettings.channel.title;
    descriptionChannel.innerText = info.brandingSettings.channel.description;
    countChannel.innerText = info.statistics.subscriberCount;
    imageChannel.src = info.brandingSettings.image.bannerImageUrl;
  });
};

var searchChannel = function searchChannel(name) {
  client.get("https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q=".concat(name, "&key=AIzaSyAT6jSrSXneZIpYACljCNlF65ym37kZqIg"), function (response) {
    var info = JSON.parse(response).items[0].snippet.channelId;
    console.log(info);
    showStat(info);
  });
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var search = document.querySelector('#searchChannel').value;
  console.log(search);
  searchChannel(search);
});
showStat(idChanel);