var homeSlide1 = document.getElementById("js-homeSlideOne");
var homeSlide2 = document.getElementById("js-homeSlideTwo");
var homeSlide3 = document.getElementById("js-homeSlideThree");
var prevScrollLeft = 0;
var frontPanel = document.getElementById("js-frontPaneliFrame");
var navUserAgent = navigator.userAgent;
var browserName  = navigator.appName;
var majorVersion = parseInt(navigator.appVersion,10);
var tempNameOffset,tempVersionOffset,tempVersion;

if ((tempVersionOffset=navUserAgent.indexOf("Opera"))!=-1) {
	browserName = "Opera";
} 

else if ((tempVersionOffset=navUserAgent.indexOf("MSIE"))!=-1) {
	browserName = "Microsoft Internet Explorer";
} 
else if ((tempVersionOffset=navUserAgent.indexOf("Chrome"))!=-1) {
	browserName = "Chrome";
} 
else if ((tempVersionOffset=navUserAgent.indexOf("Safari"))!=-1) {
	browserName = "Safari";
} 
else if ((tempVersionOffset=navUserAgent.indexOf("Firefox"))!=-1) {
	browserName = "Firefox";
} 



var app = {
	playGame: false,
	skipVideos: false,
	skipGame: false,
	winGame: false,
	isMute: false,
	userMutedSound: false,
	hasIntroAndOutroAudio: true,
	isSnapchat: false,
	isFooterUp: false,
	collectedCoins: 0,
	homeSliderNumber:1,
	frontPanelOn: false,
	isMobile:false,
	


	prePreload: function() {
		if (!window.canLoad) return; //DONT LOAD ANYTHING IF BROWSER IS NOT SUPPORTED
		//app.initEvents();
		console.log('PRE PRELOAD');

		// window.onload = (event) => {
		// 	console.log('page is fully loaded');
		// 	app.outroLoader();
		// };

		setTimeout(function () {app.outroLoader();}, 100);
		app.introPreload();


		//app.preIntroPreload(); //THIS IS CORRECT CALL
	},

	preIntroPreload: function() {
		app.initEvents(); //This Calls Scolling function that makes horizontal scroll happen
		console.log("this is the Browser name: "+ browserName);
		console.log("START");
		
	},

	outroLoader:function(){

		var loaderTimeline = new TimelineMax({onComplete: app.preIntroPreload});
			console.log("playing loader outro anim");
			loaderTimeline

				.fromTo(
					".loadingImage",
					0.1,
					{ scale: 1, opacity: 1 },
					{ scale: 10, opacity: 0, ease: Back.easeOut },
					"init"
				)

				.fromTo(
					".loadingBarBG",
					0.1,
					{ scale:1, opacity: 1 },
					{ scale:0, opacity: 0 ,  ease: Back.easeOut },
					"init"
				)
				
				.fromTo(
					".loadingPage",
					0.1,
					{ opacity: 1 },
					{ opacity: 0, ease: Back.easeOut },
					"init+=.1"
				);


	},
	

	introPreload: function() {
	

		if (app.isMobile != true){
			var preloaderTimeline = new TimelineMax({onComplete: app.initPreload});
			console.log("playing desktop intro anim");

			preloaderTimeline

				.fromTo(
					".meImage",
					1,
					{ x: -400, opacity:0},
					{ x: 0, opacity: 1, ease: Back.easeOut },
					"init"
				)
				.fromTo(
					".helloText",
					0.5,
					{ x: -30, opacity: 0 },
					{ x: 0, opacity: 1, ease: Back.easeOut },
					"init+=.2"
				)
				
				.fromTo(
					".meDescription",
					0.5,
					{ x: -30, opacity: 0 },
					{ x: 0, opacity: 1, ease: Back.easeOut },
					"init+=.4"
				)
				.fromTo(
					".nameText",
					0.5,
					{ x:-100, opacity: 0 },
					{ x:0, opacity: 1 ,  ease: Back.easeOut },
					"init"
				);

		}

		// //THIS IS A SEPARATE TIMELINE FOR THE ANIMATED TEXT
		// var tl = new TimelineLite({
		// 	onComplete: app.initPreload
		// });

		// if (siteCopy.isThai == false){
		// 	(mySplitText = new SplitText(".meDescription", {
		// 		type: "words,chars"
		// 	})),
		// 		(words = mySplitText.words); //an array of all the divs that wrap each character
		// 	TweenLite.set(".meDescription");
		// 	tl.staggerFrom(
		// 		words,
		// 		0.8,
		// 		{ y: 30, opacity: 0, ease: Elastic.easeOut },
		// 		0.07
		// 	);
		// }
		// else {
		// 	tl.fromTo(".meDescription",0.8,{ opacity: 0},{opacity: 1});
		// }
	},

	introEndScreenAnim: function() {

		if (app.isMobile != true){

			var introEndArea = new TimelineMax({
				onComplete: function() {
					//app.showInstructions();
				}
			});
	
			
			introEndArea
				.fromTo(
					".endThankYouText",
					0.5,
					{ scale: 0, opacity: 0 },
					{ scale: 1, opacity: 1, ease: Back.easeOut },
					"init"
				)
				.fromTo(
					".endAreaAvatar",
					1,
					{ rotation:100, scale: 0, opacity: 0 },
					{ rotation:1, scale: 1, opacity: 1, ease: Back.easeOut },
					"init+=.25"
				)
				.fromTo(
					".endAreaEmail",
					0.35,
					{ y:20, opacity: 0 },
					{ y:0, opacity: 1, ease: Back.easeOut },
					"init+=.35"
				)
				.fromTo(
					".endAreaResume",
					0.25,
					{ y:20, opacity: 0 },
					{ y:0, opacity: 1, ease: Back.easeOut },
					"init+=.55"
				)
				.fromTo(
					".endLI",
					0.2,
					{ y:10, opacity: 0 },
					{  y:0, opacity: 1, ease: Back.easeOut },
					"init+=.55"
				)
				.fromTo(
					".endIG",
					0.3,
					{ y:10,opacity: 0 },
					{ y:0,opacity: 1, ease: Back.easeIn },
					"init+=.60"
				)
	
				.fromTo(
					".endTW",
					0.3,
					{ y:10,opacity: 0 },
					{ y:0,opacity: 1, ease: Back.easeIn },
					"init+=.65"
				)
	
				.fromTo(
					".endTUM",
					0.3,
					{ y:10,opacity: 0 },
					{ y:0,opacity: 1, ease: Back.easeIn },
					"init+=.70"
				)
	
				.fromTo(
					".endGIT",
					0.3,
					{ y:10,opacity: 0 },
					{ y:0,opacity: 1, ease: Back.easeIn },
					"init+=.75"
				)
	
				.fromTo(
					".endMAIL",
					0.3,
					{ y:10,opacity: 0 },
					{ y:0,opacity: 1, ease: Back.easeIn },
					"init+=.80"
				)
				.fromTo(
					".endBE",
					0.3,
					{ y:10,opacity: 0 },
					{ y:0,opacity: 1, ease: Back.easeIn },
					"init+=.85"
				)
				
				;


		}
		
	},



	showTTAndSoundToggle_intro: function() {
		var TTAndSoundToggle_intro = new TimelineMax({
			onComplete: function() {}
		});
		TTAndSoundToggle_intro.fromTo(
			".TTAndSoundToggle",
			1,
			{ opacity: 0 },
			{ opacity: 1 }
		);
	},

	showTTAndSoundToggle_outro: function() {
		var TTAndSoundToggle_outro = new TimelineMax({
			onComplete: function() {}
		});
		TTAndSoundToggle_outro.fromTo(
			".TTAndSoundToggle",
			1,
			{ opacity: 1 },
			{ opacity: 0 }
		);
	},

	hideScreens: function() {
		$(".screen").addClass("hidden");
	},

	init: function() {
		FastClick.attach(document.body);
		app.initEvents();
		

	},

	initEvents: function() {

		if (Detectizr.device.type == "mobile"  || Detectizr.device.type == "tablet") {
			isMobile=true;
			console.log ("this is a mobile device");
		}

		//CHANGE THE SITE'S SCROLL DIRECTION

		var item = document.getElementsByClassName('screens')[0];
	

		window.addEventListener('wheel', function(e) {
			if ($("#js-frontPortfolioPanelExit").hasClass("hidden")){

				//console.log("font panel is closed");


				if (e.deltaY > 0) {
					document.documentElement.scrollLeft += 100;
					//document.documentElement.scrollTop=0;
					//console.log("the scroll top is " + document.documentElement.scrollTop);
				}
				else {
					document.documentElement.scrollLeft -= 100;
					//document.documentElement.scrollTop=0;
					//console.log("the scroll top is " + document.documentElement.scrollTop);
				}
				if ((document.documentElement.scrollLeft >= 1300) && (prevScrollLeft < 1300)){
					app.introEndScreenAnim();
				}

				if ((document.documentElement.scrollLeft <= 400) && (prevScrollLeft > 400)){
					app.introPreload();
				}

				// console.log(document.documentElement.scrollLeft);

				
				prevScrollLeft = document.documentElement.scrollLeft;

			}

			else{
				console.log("font panel is opened");
			}
		}

		
		);

		//END OF CHANGING THE SITE'S SCROLL DIRECTION

		//ADD HOVER EFFECTS
		document.querySelectorAll('screens > .hoverEffectThis');

		const animateIt = function (e){
			const span = this.querySelector('hoverEffectThis');
			const {offsetX:x, offsetY:y} = e,
			{offsetWidth:width, offsetHeight: height} = this,
			
			move = 25,
			xMove = x /width * (move*2)-move,
			yMove=y/height*(move*2)-move;	

			span.style.transform='translate(${xMove}px, ${yMove]px)';
			
			if (e.type === 'mouseleave') span.style.transform='';
	
		};

	

		$("#js-mainHome-screen").removeClass("hidden");
		$("#js-portfolio-screen").addClass("hidden");
		$("#js-about-screen").addClass("hidden");

		app.bindWindowFocusEvent();

		$("#js-frontPortfolioPanelExit").on("click", app.hideFrontPortfolioPanel);
		$("#js-darkenPage").on("click", app.hideFrontPortfolioPanel);
		
		$("#js-homePrevButton").on("click", app.homeSliderPrev);
		$("#js-nextNivethaInfo").on("click", app.nextNivethaInfo);
		$("#js-prevNivethaInfo").on("click", app.prevNivethaInfo);
		$("#js-homeButton").on("click", app.showHomePage);
		$("#js-portfolioButton").on("click", app.showPortfolioPage);
		$("#js-portfolioButton2").on("click", app.showPortfolioPage);
		$("js-galleryImgLabelText").on("click", app.consoleLogStuff);
		$("js-mobileNav").on("click", app.toggleMobileNav); 
		
		
		//Projects
		$("#js-galleryItem1").on("click", app.openGalleryItem1);
		$("#js-galleryItem2").on("click", app.openGalleryItem2);
		$("#js-galleryItem3").on("click", app.openGalleryItem3);
		$("#js-galleryItem4").on("click", app.openGalleryItem4);
		$("#js-galleryItem5").on("click", app.openGalleryItem5);
		$("#js-galleryItem6").on("click", app.openGalleryItem6);
		$("#js-galleryItem7").on("click", app.openGalleryItem7);
		$("#js-galleryItem8").on("click", app.openGalleryItem8);



		///ORIENTATION EVENT TO PAUSE GAME
		// window.addEventListener("orientationchange", function() {
		// 	if (Detectizr.device.type == "mobile") {
		// 		isMobile=true;
		// 		console.log ("this is a mobile device");

		// 		if (window.orientation == 90 || window.orientation == 275) {
			
		// 		}
		// 		if (window.orientation == 0 || window.orientation == 180) {
					
		// 		}
		// 	}

		// 	if (Detectizr.device.type == "tablet") {
		// 		isMobile=true; 
		// 		console.log ("this is a mobile device");

		// 		if (window.orientation == 90 || window.orientation == 275) {
				
		// 		}
		// 		if (window.orientation == 0 || window.orientation == 180) {
					
		// 		}
		// 	}
		// });
	},

	consoleLogStuff: function() {
		console.log("Delta Y is "+ e.deltaY);
	},
	
	bindWindowFocusEvent: function() {
		window.onblur = function() {
		};

		window.onfocus = function() {

		};
	},
	toggleMobileNav: function(){
		console.log("Toggled mobile nav!");
	},

////////////////////////////////////////////////////////////////  OPEN GALLERY ITEM //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	openGalleryItem1: function(){

		//if(browserName=="Safari"){
			app.showFrontPortfolioPanel_first();
			console.log("Showing Safari-safe version of FrontPanel")

		// }


		// else{
		// 	frontPanel.src= "https://www.behance.net/gallery/83482289/SONY-GhostbustersWorld-Digital-Campaign?iframe=1";
		// 	app.showFrontPortfolioPanel();
		// 	// $("#js-frontPortfolioPanel1").removeClass("hidden");

		// }

	

	},

	openGalleryItem2: function(){

			app.showFrontPortfolioPanel_second();
			console.log("Showing Safari-safe version of FrontPanel")

	
	},

	openGalleryItem3: function(){

			app.showFrontPortfolioPanel_third();
			console.log("Showing Safari-safe version of FrontPanel")

	},

	openGalleryItem4: function(){

			app.showFrontPortfolioPanel_fourth();
			console.log("Showing Safari-safe version of FrontPanel")

	},

	openGalleryItem5: function(){
			app.showFrontPortfolioPanel_fifth();
			console.log("Showing Safari-safe version of FrontPanel")


	},

	openGalleryItem6: function(){

			app.showFrontPortfolioPanel_sixth();
			console.log("Showing Safari-safe version of FrontPanel")


	},

	openGalleryItem7: function(){

			app.showFrontPortfolioPanel_seventh();
			console.log("Showing Safari-safe version of FrontPanel")

	},

	openGalleryItem8: function(){
			app.showFrontPortfolioPanel_eighth();
			console.log("Showing Safari-safe version of FrontPanel")

	},

	showFrontPortfolioPanel(){
		$("#js-frontPortfolioPanelExit").removeClass("hidden");
		$("#js-frontPortfolioPanel1").removeClass("hidden");
		document.getElementById("js-darkenPage").style.opacity = "0.9";
		document.getElementById("js-darkenPage").style.pointerEvents = "all";
		console.log("Showing Front Portfolio Panel");
		app.frontPanelOn = true;
	},

	showFrontPortfolioPanel_first(){
		$("#js-frontPortfolioPanelExit").removeClass("hidden");
		$("#js-frontPortfolioPanel_first").removeClass("hidden");
		document.getElementById("js-darkenPage").style.opacity = "0.9";
		document.getElementById("js-darkenPage").style.pointerEvents = "all";
		console.log("Showing Front First Panel");
		app.frontPanelOn = true;
	},

	showFrontPortfolioPanel_second(){
		$("#js-frontPortfolioPanelExit").removeClass("hidden");
		$("#js-frontPortfolioPanel_second").removeClass("hidden");
		document.getElementById("js-darkenPage").style.opacity = "0.9";
		document.getElementById("js-darkenPage").style.pointerEvents = "all";
		console.log("Showing Front Second Panel");
		app.frontPanelOn = true;
	},

	showFrontPortfolioPanel_third(){
		$("#js-frontPortfolioPanelExit").removeClass("hidden");
		$("#js-frontPortfolioPanel_third").removeClass("hidden");
		document.getElementById("js-darkenPage").style.opacity = "0.9";
		document.getElementById("js-darkenPage").style.pointerEvents = "all";
		console.log("Showing Front Third Panel");
		app.frontPanelOn = true;
	},

	showFrontPortfolioPanel_fourth(){
		$("#js-frontPortfolioPanelExit").removeClass("hidden");
		$("#js-frontPortfolioPanel_fourth").removeClass("hidden");
		document.getElementById("js-darkenPage").style.opacity = "0.9";
		document.getElementById("js-darkenPage").style.pointerEvents = "all";
		console.log("Showing Front Fourth Panel");
		app.frontPanelOn = true;
	},

	showFrontPortfolioPanel_fifth(){
		$("#js-frontPortfolioPanelExit").removeClass("hidden");
		$("#js-frontPortfolioPanel_fifth").removeClass("hidden");
		document.getElementById("js-darkenPage").style.opacity = "0.9";
		document.getElementById("js-darkenPage").style.pointerEvents = "all";
		console.log("Showing Front Fifth Panel");
		app.frontPanelOn = true;
	},

	showFrontPortfolioPanel_sixth(){
		$("#js-frontPortfolioPanelExit").removeClass("hidden");
		$("#js-frontPortfolioPanel_sixth").removeClass("hidden");
		document.getElementById("js-darkenPage").style.opacity = "0.9";
		document.getElementById("js-darkenPage").style.pointerEvents = "all";
		console.log("Showing Front Sixth Panel");
		app.frontPanelOn = true;
	},

	showFrontPortfolioPanel_seventh(){
		$("#js-frontPortfolioPanelExit").removeClass("hidden");
		$("#js-frontPortfolioPanel_seventh").removeClass("hidden");
		document.getElementById("js-darkenPage").style.opacity = "0.9";
		document.getElementById("js-darkenPage").style.pointerEvents = "all";
		console.log("Showing Front Sixth Panel");
		app.frontPanelOn = true;
	},

	showFrontPortfolioPanel_eighth(){
		$("#js-frontPortfolioPanelExit").removeClass("hidden");
		$("#js-frontPortfolioPanel_eighth").removeClass("hidden");
		document.getElementById("js-darkenPage").style.opacity = "0.9";
		document.getElementById("js-darkenPage").style.pointerEvents = "all";
		console.log("Showing Front Sixth Panel");
		app.frontPanelOn = true;
	},



	hideFrontPortfolioPanel(){

		if ( app.frontPanelOn == false ){
			console.log ("Front not on");
		}
		else{
			$("#js-frontPortfolioPanelExit").addClass("hidden");

			$("#js-frontPortfolioPanel_first").addClass("hidden");
			$("#js-frontPortfolioPanel_second").addClass("hidden");
			$("#js-frontPortfolioPanel_third").addClass("hidden");
			$("#js-frontPortfolioPanel_fourth").addClass("hidden");
			$("#js-frontPortfolioPanel_fifth").addClass("hidden");
			$("#js-frontPortfolioPanel_sixth").addClass("hidden");
			$("#js-frontPortfolioPanel_seventh").addClass("hidden");
			$("#js-frontPortfolioPanel_eighth").addClass("hidden");

			$("#js-frontPortfolioPanel1").addClass("hidden");
			$("#js-frontPortfolioPanel2").addClass("hidden");
			$("#js-frontPortfolioPanel3").addClass("hidden");
			$("#js-frontPortfolioPanel4").addClass("hidden");
			$("#js-frontPortfolioPanel5").addClass("hidden");
			$("#js-frontPortfolioPanel6").addClass("hidden");
			$("#js-frontPortfolioPanel7").addClass("hidden");
			$("#js-frontPortfolioPanel8").addClass("hidden");


			document.getElementById("js-darkenPage").style.opacity = "0";
			document.getElementById("js-darkenPage").style.pointerEvents = "none";
			console.log("Hiding Front Portfolio Panel");
			app.frontPanelOn = false;

		}
		


	},









	onLoadStart: function(url, itemsLoaded, itemsTotal) {


	},

	onLoadProgress: function(url, itemsLoaded, itemsTotal) {

		
	},

	onLoadEnd: function() {
		app.init();
	},

	onLoadError: function(url) {
		alert("There was an error loading " + url);
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};


window.onload = app.prePreload;

/////////////////////////////////////////////////////////////////////////////////////
//FORCE FIRE EVENT
/////////////////////////////////////////////////////////////////////////////////////

function eventFire(el, etype) {
	if (el.fireEvent) {
		el.fireEvent("on" + etype);
	} else {
		var evObj = document.createEvent("Events");

		evObj.initEvent(etype, true, false);

		el.dispatchEvent(evObj);
	}
}

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}
