
let httpClient = function httpClient () { 
	this.get = function (aUrl, aCallback) { 
		let anHTTPRequest = new XMLHttpRequest();
		anHTTPRequest.onreadystatechange = function () { 
			if ( anHTTPRequest.readyState == 4 && anHTTPRequest.status == 200 ) {
				aCallback(anHTTPRequest.responseText);
			}
		 };
		 anHTTPRequest.open('GET', aUrl, true);
		 anHTTPRequest.send(null);
	 };
 };

 let client = new httpClient();

 let idChanel = 'UC_x5XG1OV2P6uZZ5FSM9Ttw';
 let part = 'statistics,brandingSettings';

 let nameChannel = document.querySelector('#nameChannel');
 let descriptionChannel = document.querySelector('#descriptionChannel');
 let imageChannel = document.querySelector('#imageChannel');
 let countChannel = document.querySelector('#count');


 let showStat = () => {
	 client.get(`https://www.googleapis.com/youtube/v3/channels?part=${part}&id=${idChanel}&key=AIzaSyAT6jSrSXneZIpYACljCNlF65ym37kZqIg`, (response) => {
		console.log( JSON.parse( response).items[0]);

		let info = JSON.parse( response).items[0];
		
		nameChannel.innerText = info.brandingSettings.channel.title;
		descriptionChannel.innerText = info.brandingSettings.channel.description;
		countChannel.innerText = info.statistics.subscriberCount;
		imageChannel.src = info.brandingSettings.image.bannerImageUrl;
	 });
 };

 showStat();


