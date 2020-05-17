
var fallbackfont = false; //Please turn to 'on' for any language font is not compatible with //this will change all the font in the site to a universal font.

var thai = false; 

var removeTextShadow = false; //Please turn 'on' for any language using fallback font that is not very legible/appealing with shadow. 

var flags = {
	showWin : false,
	showFail: false
};


var siteCopy = {

	//ON/OFF variables for each link in footer
	isPrivacyPolicy: true,
	isTermsOfUse: true,
	isCopyRight: true,
	isCredits:true,
	isMPAA: true,
	isFilmRatings: true,
	isParentalGuide: true,

	//ON/OFF variables for each link in ending screens
	isMoreGamesBtn: true,
	isFacebookLink: true,
	isTwitterLink: true,
	isInstagramLink: true,
	isDesktopLink: true,

	isThai:thai,



	trailerId: '',

	// Browser Check
	browserCheckMsg : {
		copy:'<p>We have detected you are using an outdated browser.<br>To view this site please upgrade to a newer version<br>of one of the following:</p>',
		fontSize: "3vh"
	},
	gameCompleteReleaseDate_browserCheck: {
		copy:'<small>IN THEATERS<br>SEPTEMBER 28</small>',
		fontSize: "3vh",
	},

	// Rotate Screen message
	rotateDeviceMsg: {
		copy:'<img src = "assets/img/instructions/gameTT.png" alt = "Yeti, Aim, Gong!">',
		fontSize: "5vh",
	},

	rotateDeviceMsgText: {
		copy:"PLEASE ROTATE YOUR DEVICE",
		fontSize: "5vh",
	},

	//SNAPCHAT START SCREEN
	snapchatStartBtn: {
		copy:"PLAY NOW",
		fontSize: "3.5vh",
	},


	preloaderCallOut: {
		copy:"IN THEATERS<br>SEPTEMBER 28",
		fontSize: "2vh",
	},

	//PRELOADER OUTRO
	preloaderOutro_Presents: {
		copy:"PRESENTS...",
		fontSize: "3.3vh",
	},

	// <!-- INSTRUCTIONS START -->
	//instructionsTitle: 'YETI, AIM,<br><big>GONG!</big>',


	instructionsText:{
		copy: "CATAPULT TO MAKE THE SUN RISE. DODGE OBSTACLES AND COLLECT POINTS ALONG THE WAY!",
		fontSize: "2.55vh",
		lineHeight: "110%",
	},

	// <!-- GAME-COMPLETE -->

	gameCompleteReleaseDate_lose: {
		copy:'<small>IN THEATERS<br>SEPTEMBER 28</small>',
		fontSize: "2.75vh",
	},

	yourScoreEndScreen:{
		copy:"YOUR<br>SCORE",
		fontSize: "3.5vh",
	},

	yourScoreGameScreen:{
		copy:"YOUR<br>SCORE",
		fontSize: "2.5vh",
	},

	gameCompleteMoreGames_lose: {
		copy:"MORE GAMES",
		fontSize: "3vh",
	},


	// GAME WIN
	gameCompleteReleaseDate_win: {
		copy:'<small>IN THEATERS<br>SEPTEMBER 28</small>',
		fontSize: "2.75vh",
	},

	gameCompletePlayAgain: {
		copy:'PLAY AGAIN',
		fontSize: "3vh",
	},

	gameCompleteSocial:{
		copy:' VISIT:',
		fontSize: "2.5vh",
	},


	gameCompleteSuccess: {
		copy:"WELL DONE!",
		fontSize: "5vh",
	},

	gameCompleteMoreGames_win: {
		copy:"MORE GAMES",
		fontSize: "3vh",
	},


	gameCompleteMoreGamesLink:{
		href:"http://smallfootmovie.com/games"
	},


	//GAME UI

	gameInstructionPress: {
		copy:"PRESS",
		fontSize: "2vh",
	},

	gameInstructionTap: {
		copy:"TAP",
		fontSize: "2vh",
	},

	// GAME LOSS
	gameCompleteLoss: {
		copy:'SO CLOSE,<br>YETI SO FAR!',
		fontSize: "5vh",
	},

	gameLoss_crowdReaction: {
		copy:"OOOOOOOOOOOH!",
		fontSize: "7vh",
	},


	// SOCIAL LINKS
	socialFacebooklink:{
		href:'https://www.facebook.com/SMALLFOOTMovie/'
	},

	socialTwitterlink:{
		href:'https://twitter.com/smallfootmovie?lang=en'
	},

	socialInstagramlink:{
		href:'https://www.instagram.com/smallfootmovie/?hl=en'
	},

	socialDesktoplink:{
		href:'http://www.smallfootmovie.com/'
	},

	// FOOTER
	privacyPolicy:{
		href: 'https://www.warnerbros.com/us-childrens-privacy-policy',
		copy:'PRIVACY POLICY',
		fontSize: "1.2vh",
	},

	termsOfUse:{
		href: 'https://www.warnerbros.com/terms',
		copy: 'TERMS OF USE',
		fontSize: "1.2vh",
	},

	copyRight: {
		copy:'© 2018 WBEI',
		fontSize: "1.2vh",
	},

	credits: {
		copy:'CREDITS & RATINGS',
		fontSize: "1.2vh",
	},

	mpaa: {
		copy:'MPAA',
		fontSize: "1.2vh",
	},

	filmRatings: {
		copy:'FILM RATINGS',
		fontSize: "1.2vh",
	},

	parentalGuide: {
		copy:'PARENTAL GUIDE',
		fontSize: "1.2vh",
	},

	
};

var injector = function(copy){

	var numItems = document.querySelectorAll('[localization-id]').length;
	var node = document.querySelectorAll('[localization-id]');
	// let use get all the keys in the copy object
	for (var key in copy) {
		// console.log(key +' = inject =>' +copy[key]);
		for (var i = 0; i < numItems; i++) {

			if(node[i].localName == 'div'){
				// console.log(typeof copy[node[i].attributes["localization-id"].nodeValue]=='object');
				if(typeof copy[node[i].attributes["localization-id"].nodeValue]=='object'){
					node[i].innerHTML = copy[node[i].attributes["localization-id"].nodeValue].copy;
					node[i].style.fontSize = copy[node[i].attributes["localization-id"].nodeValue].fontSize;
					if(copy[node[i].attributes["localization-id"].nodeValue].lineHeight){
						node[i].style.lineHeight = copy[node[i].attributes["localization-id"].nodeValue].lineHeight;
					}
				} else {
					node[i].innerHTML = copy[node[i].attributes["localization-id"].nodeValue];
				}
			}

			if(node[i].localName == 'span'){
				// console.log(typeof copy[node[i].attributes["localization-id"].nodeValue]=='object');
				if(typeof copy[node[i].attributes["localization-id"].nodeValue]=='object'){
					node[i].innerHTML = copy[node[i].attributes["localization-id"].nodeValue].copy;
					node[i].style.fontSize = copy[node[i].attributes["localization-id"].nodeValue].fontSize;
				} else {
					node[i].innerHTML = copy[node[i].attributes["localization-id"].nodeValue];
				}
			}

			if(node[i].localName == 'meta'){
				// console.log(typeof copy[node[i].attributes["localization-id"].nodeValue]=='object');
				if(typeof copy[node[i].attributes["localization-id"].nodeValue]=='object'){
					node[i].content = copy[node[i].attributes["localization-id"].nodeValue].copy;
					node[i].style.fontSize = copy[node[i].attributes["localization-id"].nodeValue].fontSize;


				} else {
					node[i].content = copy[node[i].attributes["localization-id"].nodeValue];
				}
			}
			if(node[i].localName == 'title'){
				// console.log(typeof copy[node[i].attributes["localization-id"].nodeValue]=='object');
				if(typeof copy[node[i].attributes["localization-id"].nodeValue]=='object'){
					node[i].innerHTML = copy[node[i].attributes["localization-id"].nodeValue].copy;
					node[i].style.fontSize = copy[node[i].attributes["localization-id"].nodeValue].fontSize;
				} else {
					node[i].innerHTML = copy[node[i].attributes["localization-id"].nodeValue];
				}
			}

			if(node[i].localName == 'a'){
				if(typeof copy[node[i].attributes["localization-id"].nodeValue]=='object'){
					if (copy[node[i].attributes["localization-id"].nodeValue].copy){
						node[i].innerHTML = copy[node[i].attributes["localization-id"].nodeValue].copy;
					}

					if(copy[node[i].attributes["localization-id"].nodeValue].fontSize){
						node[i].style.fontSize = copy[node[i].attributes["localization-id"].nodeValue].fontSize;
					}

					if(copy[node[i].attributes["localization-id"].nodeValue].href){
						node[i].href = copy[node[i].attributes["localization-id"].nodeValue].href;
					}

				}
			} 

			else {
					node[i].href = copy[node[i].attributes["localization-id"].nodeValue].href;
			}

			if(node[i].localName == 'h1'){
				if(typeof copy[node[i].attributes["localization-id"].nodeValue]=='object'){
					node[i].innerHTML = copy[node[i].attributes["localization-id"].nodeValue].copy;
					node[i].style.fontSize = copy[node[i].attributes["localization-id"].nodeValue].fontSize;
				} else {
					node[i].innerHTML = copy[node[i].attributes["localization-id"].nodeValue];
				}
			}
			if(node[i].localName == 'h3'){
				if(typeof copy[node[i].attributes["localization-id"].nodeValue]=='object'){
					node[i].innerHTML = copy[node[i].attributes["localization-id"].nodeValue].copy;
					node[i].style.fontSize = copy[node[i].attributes["localization-id"].nodeValue].fontSize;
				} else {
					node[i].innerHTML = copy[node[i].attributes["localization-id"].nodeValue];
				}
			}

			if(node[i].localName == 'p'){
				if(typeof copy[node[i].attributes["localization-id"].nodeValue]=='object'){
					node[i].innerHTML = copy[node[i].attributes["localization-id"].nodeValue].copy;
					node[i].style.fontSize = copy[node[i].attributes["localization-id"].nodeValue].fontSize;
				} else {
					node[i].innerHTML = copy[node[i].attributes["localization-id"].nodeValue];
				}
			}
			if(node[i].localName == 'iframe'){
				node[i].src = copy[node[i].attributes["localization-id"].nodeValue].href;
			}


		}
	}
};


if(removeTextShadow){
	document.body.style.textShadow = "none";
	document.getElementsByClassName('intructions-gameTT')[0].style.textShadow = "none";
	document.getElementsByClassName('game-ui-instructions')[0].style.textShadow = "none";
	document.getElementsByClassName('score')[0].style.textShadow = "none";
	document.getElementsByClassName('gameOver_score')[0].style.textShadow = "none";
	document.getElementsByClassName('scoreText')[0].style.textShadow = "none";
	document.getElementsByClassName('game-ui-instructions')[0].style.textShadow = "none";
	document.getElementsByClassName('game-ui-btn')[0].style.textShadow = "none";
	document.getElementsByClassName('gameInstructionHolder')[0].style.textShadow = "none";
	document.getElementsByClassName('gameInstructionHolder')[1].style.textShadow = "none";
	document.getElementsByClassName('gameInstructionHolder')[2].style.textShadow = "none";
	document.getElementsByClassName('gameInstructionHolder')[3].style.textShadow = "none";
	document.getElementsByClassName('gameOver_IntroScreen_text')[0].style.textShadow = "none";
	document.getElementsByClassName('gameOver_text')[0].style.textShadow = "none";
	document.getElementsByClassName('gameOver_text')[1].style.textShadow = "none";
	document.getElementsByClassName('gameOver_score')[0].style.textShadow = "none";
	document.getElementsByClassName('gameOver_score')[1].style.textShadow = "none";
	document.getElementsByClassName('gameOver_scoreText')[0].style.textShadow = "none";
	document.getElementsByClassName('gameOver_scoreText')[1].style.textShadow = "none";
	document.getElementsByClassName('gameOver_TextContainer')[0].style.textShadow = "none";
	document.getElementsByClassName('gameOver_textSocial')[0].style.textShadow = "none";
	document.getElementsByClassName('gameOver_textSocial')[1].style.textShadow = "none";
}

if(fallbackfont){
	var font;
	var weight = "900"; 

	if(thai){
		font = "sans-serif";
		console.log ("THAI");
	} else {
		font =  "Arial Unicode MS";
	}


	document.body.style.fontFamily = font;
	document.body.style.fontWeight = weight;
	document.getElementsByClassName('snapchatIntroBtn')[0].style.fontFamily = font;
	document.getElementsByClassName('snapchatIntroBtn')[0].style.fontWeight = weight;

	document.getElementsByClassName('snapchatIntro-titleText')[0].style.fontFamily = font;
	document.getElementsByClassName('snapchatIntro-titleText')[0].style.fontWeight = weight;

	document.getElementsByClassName('coins')[0].style.fontFamily = font;
	document.getElementsByClassName('coins')[0].style.fontWeight = weight;

	document.getElementsByClassName('gameOver_btn')[0].style.fontFamily = font;
	document.getElementsByClassName('gameOver_btn')[0].style.fontWeight = weight;

	document.getElementsByClassName('gameOver_socialIcons')[0].style.fontFamily = font;
	document.getElementsByClassName('gameOver_socialIcons')[0].style.fontWeight = weight;

	document.getElementsByClassName('gameOver_socialIcons-fail')[0].style.fontFamily = font;
	document.getElementsByClassName('gameOver_socialIcons-fail')[0].fontWeight = weight;

	document.getElementsByClassName('footer_text')[0].style.fontFamily = font;
	document.getElementsByClassName('footer_text')[0].fontWeight = weight;
}


injector(siteCopy);