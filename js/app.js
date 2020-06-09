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
		lightGallery(document.getElementById('lightgallery'));
		//app.introPreload();
		//app.initEvents();
		
		if (
			siteCopy.isDesktopLink == false &&
			siteCopy.isFacebookLink == false &&
			siteCopy.isTwitterLink == false &&
			siteCopy.isInstagramLink == false
		) {
			document.getElementById("js-visitText").style.display = "none";
			document.getElementById("js-visitText2").style.display = "none";
		}


		app.preIntroPreload(); //THIS IS CORRECT CALL
	},

	preIntroPreload: function() {
		app.initEvents(); //This Calls Scolling function that makes horizontal scroll happen
		console.log("this is the Browser name: "+ browserName);
		console.log("START");
		app.introPreload();
	},

	

	introPreload: function() {
		//$("#js-snapchatIntro-screen").addClass("hidden");
		var preloaderTimeline = new TimelineMax({onComplete: app.initPreload});

		console.log("preloader timeline");

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
	},

	showGameOverScreen: function() {
		var gameOverScreen_Intro = new TimelineMax({
			onComplete: function() {
				//app.showGameOverScreen();
				$("#js-endScreen").removeClass("not-active");
			}
		});
		document.getElementById("js-coins-gameOver").innerHTML =
			app.collectedCoins;

		var ftSize = "7vh";
		if ($(window).width() < 480) {
			ftSize = "5vh";
		}

		//THIS IS A SEPARATE TIMELINE FOR THE ANIMATED TEXT
		var tlsplitText = new TimelineLite({
		});


		if (siteCopy.isThai == false){ 

			(mySplitText = new SplitText(".gameOver_IntroScreen_text", {
				type: "words,chars"
			})),
				(chars = mySplitText.chars); //an array of all the divs that wrap each character


			(mySplitText = new SplitText(".gameOver_IntroScreen_text", {
				type: "words,chars"
			})),
			(chars = mySplitText.chars); //an array of all the divs that wrap each character
			//TweenLite.set(".gameOver_IntroScreen_text");
			tlsplitText.staggerFrom(chars,0.5,{ y: 20, opacity: 0, ease: Elastic.easeOut },0.07,);
		}

		else{
			tlsplitText.fromTo(".gameOver_IntroScreen_text", .4, {scale:.5, opacity:0, ease: Back.easeOut}, {scale:1, opacity:1, ease: Back.easeOut});
		}




		gameOverScreen_Intro
			.fromTo(".gameOverScreen", 0.25, { opacity: 0 }, { opacity: 1 })
			.fromTo(
				".gameOver_yetiLeft",
				0.5,
				{ x: "-100%" },
				{ x: "0%", ease: Sine.easeOut },
				"start"
			)
			.fromTo(
				".gameOver_yetiRight",
				0.55,
				{ x: "100%" },
				{ x: "0%", ease: Sine.easeOut },
				"start+=.1"
			)
			.fromTo(
				".gameOver_yetiLeft",
				0.45,
				{ backgroundPosition: "0% 90%" },
				{ backgroundPosition: "-100% 90%", ease: Sine.easeIn },
				"start+=1.4"
			)
			.fromTo(
				".gameOver_yetiRight",
				0.35,
				{ backgroundPosition: "100% 90%" },
				{ backgroundPosition: "200% 90%", ease: Sine.easeIn },
				"start+=1.55"
			)
			.fromTo(
				".gameOver_IntroScreen_text",
				0.4,
				{ y: "-40%" },
				{ y: "0%", ease: Sine.easeOut },
				"start+=1.5"
			)
			.fromTo(
				".gameOver_IntroScreen",
				0.5,
				{ opacity: 1 },
				{ opacity: 0 },
				"start+=1.5"
			)

			.fromTo(
				".gameOver_TT",
				0.5,
				{ opacity: 0, y: "-200%", backgroundPosition: "50% 100%" },
				{
					opacity: 1,
					y: "0%",
					backgroundPosition: "50% 100%",
					ease: Back.easeOut
				},
				"start+=2.05"
			)
			.fromTo(
				".gameOver_TTtext",
				0.7,
				{ opacity: 0, y: "-200%" },
				{ opacity: 1, y: "0%", ease: Back.easeOut },
				"start+=2"
			)
			.fromTo(
				".gameOver_text",
				0.55,
				{ opacity: 0, scale: 2 },
				{ opacity: 1, scale: 1, ease: Back.easeOut },
				"start+=2"
			)

			.fromTo(
				".playAgain",
				0.6,
				{ opacity: 0, scale: 0, backgroundSize: "0% 0%" },
				{
					opacity: 1,
					scale: 1,
					backgroundSize: "90% 90%",
					ease: Back.easeOut
				},
				"start+=2.6"
			)
			.fromTo(
				".win_btn",
				0.6,
				{ opacity: 0, scale: 0, backgroundSize: "0% 0%" },
				{
					opacity: 1,
					scale: 1,
					backgroundSize: "90% 90%",
					ease: Back.easeOut
				},
				"start+=2.7"
			)

			.fromTo(
				".gameOver_Percy",
				0.6,
				{ opacity: 0, x: -200 },
				{ opacity: 1, x: 0, ease: Sine.easeOut },
				"start+=2.3"
			)
			.fromTo(
				".gameOver_textSocial",
				0.5,
				{ opacity: 0, y: "50%" },
				{ opacity: 1, y: "0%", ease: Back.easeOut },
				"start+=2.4"
			)
			.fromTo(
				".gameOver_FB",
				0.6,
				{ opacity: 0, y: "200%" },
				{ opacity: 1, y: "0%", ease: Back.easeOut },
				"start+=2.4"
			)
			.fromTo(
				".gameOver_TW",
				0.6,
				{ opacity: 0, y: "200%" },
				{ opacity: 1, y: "0%", ease: Back.easeOut },
				"start+=2.5"
			)
			.fromTo(
				".gameOver_IG",
				0.6,
				{ opacity: 0, y: "200%" },
				{ opacity: 1, y: "0%", ease: Back.easeOut },
				"start+=2.6"
			)
			.fromTo(
				".gameOver_DT",
				0.6,
				{ opacity: 0, y: "200%" },
				{ opacity: 1, y: "0%", ease: Back.easeOut },
				"start+=2.7"
			)

			.fromTo(
				".gameOver_TextContainer",
				0.45,
				{ x: "-0%", ease: Back.easeOut },
				{ x: "-50%", ease: Back.easeOut },
				"start+=4.1"
			)
			;
	},

	showSuccessScreen: function() {
		// app.hideTTAndSoundToggle();
		app.hideTT();
		var gameSuccessScreen_Intro = new TimelineMax({
			onComplete: function() {
				//app.showGameOverScreen();
				$("#js-endScreen").removeClass("not-active");
			}
		});

		document.getElementById("js-coins-success").innerHTML =
			app.collectedCoins;

		gameSuccessScreen_Intro
			.fromTo(".winScreen", 0.25, { opacity: 0 }, { opacity: 1 })
			.fromTo(
				".gameOver_TTtext",
				0.4,
				{ opacity: 0, y: "-30%" },
				{ opacity: 1, y: "0%", ease: Back.easeOut },
				"beginning"
			)
			.fromTo(
				".win_TT",
				0.4,
				{ opacity: 0, backgroundPosition: "50% -100%" },
				{
					opacity: 1,
					backgroundPosition: "50% 90%",
					ease: Back.easeOut
				},
				"beginning-=.1"
			)
			.fromTo(
				".gameOver_text",
				0.5,
				{ opacity: 0, scale: 2 },
				{ opacity: 1, scale: 1, ease: Back.easeOut },
				"beginning"
			)
			.fromTo(
				"#js-win-btn",
				0.5,
				{ opacity: 0, scale: 0 },
				{ opacity: 1, scale: 1, ease: Back.easeOut },
				"-=.35"
			)
			.fromTo(
				"#js-moreGames-btn-win",
				0.5,
				{ opacity: 0, scale: 0 },
				{ opacity: 1, scale: 1, ease: Back.easeOut },
				"-=.35"
			)

			.fromTo(
				".successScreen_migo",
				0.4,
				{ opacity: 0, x: 200 },
				{ opacity: 1, x: 0, ease: Sine.easeOut },
				"beginning -= 1"
			)
			.fromTo(
				".successScreen_dorgle",
				0.45,
				{ opacity: 0, x: -200 },
				{ opacity: 1, x: 0, ease: Sine.easeOut },
				"beginning -= .9"
			)

			.fromTo(
				".gameOver_textSocial",
				0.5,
				{ opacity: 0, y: "30%" },
				{ opacity: 1, y: "0%", ease: Back.easeOut },
				"beginning+=.5"
			)
			.fromTo(
				".gameOver_FB",
				0.5,
				{ opacity: 0, y: "30%" },
				{ opacity: 1, y: "0%", ease: Back.easeOut },
				"beginning -=.5"
			)
			.fromTo(
				".gameOver_TW",
				0.5,
				{ opacity: 0, y: "30%" },
				{ opacity: 1, y: "0%", ease: Back.easeOut },
				"beginning -=.35"
			)
			.fromTo(
				".gameOver_IG",
				0.5,
				{ opacity: 0, y: "30%" },
				{ opacity: 1, y: "0%", ease: Back.easeOut },
				"beginning -=.25"
			)
			.fromTo(
				".gameOver_DT",
				0.5,
				{ opacity: 0, y: "30%" },
				{ opacity: 1, y: "0%", ease: Back.easeOut },
				"beginning -=.15"
			)

			.fromTo(
				".gameOver_TextContainer",
				0.45,
				{ x: "-0%", ease: Back.easeOut },
				{ x: "-50%", ease: Back.easeOut },
				"beginning+=1.9"
			);
	},

	showInstructions: function() {
		$("#js-preloader-screen").addClass("hidden");
		$("#js-instruction-screen").removeClass("not-active");
		$("#js-preloader-screen").addClass("not-active");
	},

	hideInstructions: function() {
		$("#js-preloader-screen").addClass("hidden");
		$("#js-instruction-screen").addClass("hidden");
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

				console.log("font panel is closed");


				if (e.deltaY > 0) {
					document.documentElement.scrollLeft += 100;
					//document.documentElement.scrollTop=0;
					console.log("the scroll top is " + document.documentElement.scrollTop);
				}
				else {
					document.documentElement.scrollLeft -= 100;
					//document.documentElement.scrollTop=0;
					console.log("the scroll top is " + document.documentElement.scrollTop);
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

		if(browserName=="Safari"){
			app.showFrontPortfolioPanel_gbWorld();
			console.log("Showing Safari-safe version of FrontPanel")

		}


		else{

			frontPanel.src= "https://www.behance.net/gallery/83482289/SONY-GhostbustersWorld-Digital-Campaign?iframe=1";
			app.showFrontPortfolioPanel();
			// $("#js-frontPortfolioPanel1").removeClass("hidden");

		}

	

	},

	openGalleryItem2: function(){

		frontPanel.src= "https://www.behance.net/gallery/80820957/NETFLIX-The-Toys-That-Made-Us-Animations?iframe=1";
		app.showFrontPortfolioPanel();
		// $("#js-frontPortfolioPanel1").removeClass("hidden");

	},

	openGalleryItem3: function(){

		frontPanel.src= "https://www.behance.net/gallery/86665201/CBS-FILMS-Scary-Stories-EPK-Website-UI-Design?iframe=1";
		app.showFrontPortfolioPanel();
		// $("#js-frontPortfolioPanel1").removeClass("hidden");

	},

	openGalleryItem4: function(){

		frontPanel.src= "https://www.behance.net/gallery/97724189/SONY-Ghostbusters-Social-Campaign?iframe=1";
		app.showFrontPortfolioPanel();
		// $("#js-frontPortfolioPanel1").removeClass("hidden");

	},

	openGalleryItem5: function(){

		frontPanel.src= "https://www.behance.net/gallery/97733623/HULU-Dollface-Launch-Campaign?iframe=1";
		app.showFrontPortfolioPanel();
		// $("#js-frontPortfolioPanel1").removeClass("hidden");

	},

	openGalleryItem6: function(){

		frontPanel.src= "https://www.behance.net/gallery/83482289/SONY-GhostbustersWorld-Digital-Campaign?iframe=1";
		app.showFrontPortfolioPanel();
		// $("#js-frontPortfolioPanel1").removeClass("hidden");

	},

	openGalleryItem7: function(){

		frontPanel.src= "https://www.behance.net/gallery/79195581/CARTOON-NETWORK-PPG-2016-Launch-Campaign?iframe=1";
		app.showFrontPortfolioPanel();
		// $("#js-frontPortfolioPanel1").removeClass("hidden");

	},

	openGalleryItem8: function(){

		frontPanel.src= "https://www.behance.net/gallery/80930803/NETFLIX-Christmas-Chronicles-Elf-Intros?iframe=1";
		app.showFrontPortfolioPanel();
		// $("#js-frontPortfolioPanel1").removeClass("hidden");

	},

	showFrontPortfolioPanel(){
		$("#js-frontPortfolioPanelExit").removeClass("hidden");
		$("#js-frontPortfolioPanel1").removeClass("hidden");
		document.getElementById("js-darkenPage").style.opacity = "0.9";
		document.getElementById("js-darkenPage").style.pointerEvents = "all";
		console.log("Showing Front Portfolio Panel");
		app.frontPanelOn = true;
	},

	showFrontPortfolioPanel_gbWorld(){
		$("#js-frontPortfolioPanelExit").removeClass("hidden");
		$("#js-frontPortfolioPanel_gbWorld").removeClass("hidden");
		document.getElementById("js-darkenPage").style.opacity = "0.9";
		document.getElementById("js-darkenPage").style.pointerEvents = "all";
		console.log("Showing Front GB World Panel");
		app.frontPanelOn = true;
	},

	hideFrontPortfolioPanel(){

		if ( app.frontPanelOn == false ){
			console.log ("Front not on");
		}
		else{
			$("#js-frontPortfolioPanelExit").addClass("hidden");

			$("#js-frontPortfolioPanel_gbWorld").addClass("hidden");

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

		TweenLite.to(app, 1, {
			loader: itemsLoaded / itemsTotal * 100,
			roundProps: "loader",
			onUpdate: function() {
				var loader2 = itemsLoaded / itemsTotal * 100;
				document.getElementById("js-preloader-percent").innerText =
					loader2 + "%";

				document.getElementById(
					"js-circleLoader"
				).style.strokeDashoffset =
					4000 - loader2 * 6;
				var deg = loader2 * 3.6;
			},
			onComplete: function() {
				//app.init();
				//app.outroPreload();
			},
			ease: Linear.easeNone,
			z: 0.01
		});
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
