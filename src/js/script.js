
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

 let form = document.querySelector('#form');


 let showStat = (id) => {
	 client.get(`https://www.googleapis.com/youtube/v3/channels?part=${part}&id=${id}&key=AIzaSyAT6jSrSXneZIpYACljCNlF65ym37kZqIg`, (response) => {
		console.log( JSON.parse( response).items[0]);

		let info = JSON.parse( response).items[0];
		
		nameChannel.innerText = info.brandingSettings.channel.title;
		descriptionChannel.innerText = info.brandingSettings.channel.description;
		countChannel.innerText = info.statistics.subscriberCount;
		imageChannel.src = info.brandingSettings.image.bannerImageUrl;
	 });
 };

 let searchChannel = (name) => {
		client.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q=${name}&key=AIzaSyAT6jSrSXneZIpYACljCNlF65ym37kZqIg`, (response) => {
			let info = JSON.parse( response).items[0].snippet.channelId;
			console.log(info);
			showStat(info);
		});
 };

 form.addEventListener('submit', (e)=> {
	e.preventDefault();
	let search = document.querySelector('#searchChannel').value;
	console.log(search);
	searchChannel(search);
 });

 showStat(idChanel);


