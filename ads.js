

var adsManager;
var adsLoader;
var adDisplayContainer;
var intervalTimer;
var videoContent;
var TagGoogle = 'https://ima3vpaid.appspot.com/?adTagUrl=https%3A%2F%2Fgoogleads.g.doubleclick.net%2Fpagead%2Fads%3Fclient%3Dca-video-pub-8544626876536809%26slotname%3D5766810366%26ad_type%3Dvideo%26description_url%3Dhttp%253A%252F%252Fsyriaalyom.com%252Findex%252F%26max_ad_duration%3D30000%26videoad_start_delay%3D0&type=js&adTest=on';
var adContainer;
var TimeOfAddsNumber = [3];
var progressTimeAdsAllShowFor ;
var remainingTimeAdsOut;
var AdsSkipButtnShow ;

// showallAdsing
function HiddinAllAdsing() {
    adContainer.style = "visibility: hidden;"
//    progressTimeAdsAllShowFor.style = "visibility: hidden;"
}


function ShowAllAdsing() {
    adContainer.style = "visibility: visible;"
 //   progressTimeAdsAllShowFor.style = "visibility: visible;"
}

function adskipsedFull() {
    AdsIsCompiltes();
}

function StartAds ( time ) {

    if ( TimeOfAddsNumber.length > 0)
    if ( time >= TimeOfAddsNumber[0])
    {

        videoContent.pause();


        adDisplayContainer.initialize();

        try {
            // Initialize the ads manager. Ad rules playlist will start at this time.
            ///// here editi if normal mode or not

////////////
            adsManager.init(window.getComputedStyle(videoContent,null).getPropertyValue("width"), window.getComputedStyle(videoContent,null).getPropertyValue("height"), google.ima.ViewMode.FULLSCREEN);

////////////
            // Call play to start showing the ad. Single video and overlay ads will
            // start at this time; the call will be ignored for ad rules.
            adsManager.start();
            ShowAllAdsing();
            console.log('start Ads'+ TimeOfAddsNumber[0].toString());

            TimeOfAddsNumber.splice(0,1);
        } catch (adError) {
            console.log(adError.toString());
            // An error may be thrown if there was a problem with the VAST response.
            videoContent.play();

        }

        //     adContainer.style = "position: absolute; left: 0; top: 0; z-index: 1"
        //   videoContent.style = "position: absolute; left: 0; top: 0; z-index: 0"

    }



}


function updateTime () {

  //  console.log(videoContent.currentTime ); // dele
    // Here timeStartOftime
    StartAds(videoContent.currentTime);
}

function FullScreenChan () {
console.log("FullScreenChan");
    console.log(videoContent.webkitDisplayingFullscreen);

}

window.onload = function () {

    adContainer = document.getElementById('WEBplayer-adContainer');
    videoContent = document.getElementById('videoContent-WEBplayer');
    progressTimeAdsAllShowFor = document.getElementById('progressTimeAdsAllShowFor');
    AdsSkipButtnShow = document.getElementById('ButtonSkapads');
  videoContent.addEventListener("timeupdate",updateTime , false);



    var fullScreenEvents = [
        'fullscreenchange',
        'mozfullscreenchange',
        'webkitfullscreenchange'];

    for (key in fullScreenEvents) {
        videoContent.addEventListener(
            fullScreenEvents[key],
            FullScreenChan,
            false);
    }

  //  videoContent.addEventListener("fullscreenchange",FullScreenChan , false);




    setUpIMA();


}

function setUpIMA() {
  // Create the ad display container.
  createAdDisplayContainer();
  // Create ads loader.
  adsLoader = new google.ima.AdsLoader(adDisplayContainer);
  // Listen and respond to ads loaded and error events.
  adsLoader.addEventListener(
      google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
      onAdsManagerLoaded,
      false);
  adsLoader.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      onAdError,
      false);

  // An event listener to tell the SDK that our content video
  // is completed so the SDK can play any post-roll ads.
  var contentEndedListener = function() {adsLoader.contentComplete();};
  videoContent.onended = contentEndedListener;

  // Request video ads.
  var adsRequest = new google.ima.AdsRequest();
 /* adsRequest.adTagUrl = 'https://pubads.g.doubleclick.net/gampad/ads?' +
      'sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&' +
      'impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&' +
      'cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=';
*/

    adsRequest.adTagUrl = TagGoogle;
  // Specify the linear and nonlinear slot sizes. This helps the SDK to
  // select the correct creative if multiple are returned.
  adsRequest.linearAdSlotWidth = 640;
  adsRequest.linearAdSlotHeight = 400;

  adsRequest.nonLinearAdSlotWidth = 640;
  adsRequest.nonLinearAdSlotHeight = 150;

  adsLoader.requestAds(adsRequest);

}


function createAdDisplayContainer() {
  // We assume the adContainer is the DOM id of the element that will house
  // the ads.
  adDisplayContainer = new google.ima.AdDisplayContainer(
      adContainer, videoContent);
}

function playAds() {
  // Initialize the container. Must be done via a user action on mobile devices.
  //videoContent.load();
 // adDisplayContainer.initialize();

 // try {
    // Initialize the ads manager. Ad rules playlist will start at this time.
 //   adsManager.init(640, 360, google.ima.ViewMode.NORMAL);
    // Call play to start showing the ad. Single video and overlay ads will
    // start at this time; the call will be ignored for ad rules.
 //   adsManager.start();
 // } catch (adError) {
    // An error may be thrown if there was a problem with the VAST response.
    videoContent.play();

//  }
}

function onAdsManagerLoaded(adsManagerLoadedEvent) {
  // Get the ads manager.
  var adsRenderingSettings = new google.ima.AdsRenderingSettings();
  adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
  // videoContent should be set to the content video element.
  adsManager = adsManagerLoadedEvent.getAdsManager(
      videoContent, adsRenderingSettings);

  // Add listeners to the required events.
  adsManager.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      onAdError);
  adsManager.addEventListener(
      google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
      onContentPauseRequested);
  adsManager.addEventListener(
      google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
      onContentResumeRequested);
  adsManager.addEventListener(
      google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
      onAdEvent);


  adsManager.addEventListener(
      google.ima.AdEvent.Type.LOADED,
      onAdEvent);

  adsManager.addEventListener(
      google.ima.AdEvent.Type.STARTED,
      onAdEvent);

  adsManager.addEventListener(
      google.ima.AdEvent.Type.COMPLETE,
      onAdEvent);


    adsManager.addEventListener(
        google.ima.AdEvent.Type.SKIPPED,
        adskipsedFull);


}



function onAdEvent(adEvent) {
  // Retrieve the ad from the event. Some events (e.g. ALL_ADS_COMPLETED)
  // don't have ad object associated.
  var ad = adEvent.getAd();
  switch (adEvent.type) {
    case google.ima.AdEvent.Type.LOADED:
      // This is the first event sent for an ad - it is possible to
      // determine whether the ad is a video ad or an overlay.
      if (!ad.isLinear()) {
        // Position AdDisplayContainer correctly for overlay.
        // Use ad.width and ad.height.
        videoContent.play();

      }
      break;
    case google.ima.AdEvent.Type.STARTED:
      // This event indicates the ad has started - the video player
      // can adjust the UI, for example display a pause button and
      // remaining time.
      if (ad.isLinear()) {
        // For a linear ad, a timer can be started to poll for
        // the remaining time.
           remainingTimeAdsOut = adsManager.getRemainingTime();
        intervalTimer = setInterval(
            function() {


              var out = 100-((adsManager.getRemainingTime() / remainingTimeAdsOut ) *100) ;

                ///here edit after
                console.log(out);
                progressTimeAdsAllShowFor.value = out;

            },
            300); // every 300ms
      }
      break;
    case google.ima.AdEvent.Type.COMPLETE:
      // This event indicates the ad has finished - the video player
      // can perform appropriate UI actions, such as removing the timer for
      // remaining time detection.
        AdsIsCompiltes();
        break;

  }

}
function AdsIsCompiltes() {

        progressTimeAdsAllShowFor.value =  0 ;
        clearInterval(intervalTimer);


    //  adContainer.style = "position: absolute; left: 0; top: 0; z-index:1"
    //    videoContent.style = "position: absolute; left: 0; top: 0; z-index: 0"

    setUpIMA();
    HiddinAllAdsing();

    setTimeout( function() {
        for (var i = 1; i < adContainer.childNodes.length; i++)
        {

            adContainer.childNodes[i].remove();
            console.log("Del Layer"+i.toString());
        }

    }, 500);
}


function onAdError(adErrorEvent) {
  // Handle the error logging.
  console.log(adErrorEvent.getError());

  adsManager.destroy();
}

function onContentPauseRequested() {
  videoContent.pause();
  // This function is where you should setup UI for showing ads (e.g.
  // display ad timer countdown, disable seeking etc.)
  // setupUIForAds();
}

function onContentResumeRequested() {
  videoContent.play();
  // This function is where you should ensure that your UI is ready
  // to play content. It is the responsibility of the Publisher to
  // implement this function when necessary.
  // setupUIForContent();

}



var VpaidVideoPlayer = function() {
  this.slot_ = null;
  this.videoSlot_ = null;
  this.eventsCallbacks_ = {};
  this.attributes_ = {
    'companions' : '',
    'desiredBitrate' : 256,
    'duration' : 10,
    'expanded' : false,
    'height' : 0,
    'icons' : '',
    'linear' : true,
    'remainingTime' : 10,
    'skippableState' : false,
    'viewMode' : 'normal',
    'width' : 0,
    'volume' : 1.0
  };
  this.quartileEvents_ = [
    {event: 'AdVideoStart', value: 0},
    {event: 'AdVideoFirstQuartile', value: 25},
    {event: 'AdVideoMidpoint', value: 50},
    {event: 'AdVideoThirdQuartile', value: 75},
    {event: 'AdVideoComplete', value: 100}
  ];
  this.nextQuartileIndex_ = 0;
  this.parameters_ = {};
};

VpaidVideoPlayer.prototype.handshakeVersion = function(version) {
  return ('2.0');
};
VpaidVideoPlayer.prototype.initAd = function(
    width,
    height,
    viewMode,
    desiredBitrate,
    creativeData,
    environmentVars) {
  this.attributes_['width'] = width;
  this.attributes_['height'] = height;
  this.attributes_['viewMode'] = viewMode;
  this.attributes_['desiredBitrate'] = desiredBitrate;
  this.slot_ = environmentVars.slot;
  this.videoSlot_ = environmentVars.videoSlot;
  this.parameters_ = JSON.parse(creativeData['AdParameters']);

  this.log('initAd ' + width + 'x' + height +
      ' ' + viewMode + ' ' + desiredBitrate);
  this.updateVideoSlot_();
  this.videoSlot_.addEventListener(
      'timeupdate',
      this.timeUpdateHandler_.bind(this),
      false);
  this.videoSlot_.addEventListener(
      'loadedmetadata',
      this.loadedMetadata_.bind(this),
      false);
  this.videoSlot_.addEventListener(
      'ended',
      this.stopAd.bind(this),
      false);
  this.callEvent_('AdLoaded');
};


VpaidVideoPlayer.prototype.loadedMetadata_ = function() {
  this.attributes_['duration'] = this.videoSlot_.duration;
  this.callEvent_('AdDurationChange');
};

VpaidVideoPlayer.prototype.timeUpdateHandler_ = function() {
  if (this.nextQuartileIndex_ >= this.quartileEvents_.length) {
    return;
  }
  var percentPlayed =
      this.videoSlot_.currentTime * 100.0 / this.videoSlot_.duration;
  if (percentPlayed >= this.quartileEvents_[this.nextQuartileIndex_].value) {
    var lastQuartileEvent = this.quartileEvents_[this.nextQuartileIndex_].event;
    this.eventsCallbacks_[lastQuartileEvent]();
    this.nextQuartileIndex_ += 1;
  }
  if (this.videoSlot_.duration > 0) {
    this.attributes_['remainingTime'] =
      this.videoSlot_.duration - this.videoSlot_.currentTime;
  }
};


VpaidVideoPlayer.prototype.updateVideoSlot_ = function() {
  if (this.videoSlot_ == null) {
    this.videoSlot_ = document.createElement('video');
    this.log('Warning: No video element passed to ad, creating element.');
    this.slot_.appendChild(this.videoSlot_);
  }
  this.updateVideoPlayerSize_();
  var foundSource = false;
  var videos = this.parameters_.videos || [];
  for (var i = 0; i < videos.length; i++) {

    if (this.videoSlot_.canPlayType(videos[i].mimetype) != '') {
      this.videoSlot_.setAttribute('src', videos[i].url);
      foundSource = true;
      break;
    }
  }
  if (!foundSource) {
  
    this.callEvent_('AdError');
  }
};


VpaidVideoPlayer.prototype.updateVideoPlayerSize_ = function() {
  this.videoSlot_.setAttribute('width', this.attributes_['width']);
  this.videoSlot_.setAttribute('height', this.attributes_['height']);
};


VpaidVideoPlayer.prototype.startAd = function() {
  this.log('Starting ad');
  this.videoSlot_.play();

  this.callEvent_('AdStarted');
};


VpaidVideoPlayer.prototype.stopAd = function() {
  this.log('Stopping ad');
  // Calling AdStopped immediately terminates the ad. Setting a timeout allows
  // events to go through.
  var callback = this.callEvent_.bind(this);
  setTimeout(callback, 75, ['AdStopped']);
};


VpaidVideoPlayer.prototype.resizeAd = function(width, height, viewMode) {
  this.log('resizeAd ' + width + 'x' + height + ' ' + viewMode);
  this.attributes_['width'] = width;
  this.attributes_['height'] = height;
  this.attributes_['viewMode'] = viewMode;
  this.updateVideoPlayerSize_();
  this.callEvent_('AdSizeChange');
};


VpaidVideoPlayer.prototype.pauseAd = function() {
  this.log('pauseAd');
  this.videoSlot_.pause();
  this.callEvent_('AdPaused');
};


VpaidVideoPlayer.prototype.resumeAd = function() {
  this.log('resumeAd');
  this.videoSlot_.play();
  this.callEvent_('AdPlaying');
};


VpaidVideoPlayer.prototype.expandAd = function() {
  this.log('expandAd');
  this.attributes_['expanded'] = true;
  this.callEvent_('AdExpanded');
};


VpaidVideoPlayer.prototype.collapseAd = function() {
  this.log('collapseAd');
  this.attributes_['expanded'] = false;
};


VpaidVideoPlayer.prototype.skipAd = function() {
  this.log('skipAd');
  var skippableState = this.attributes_['skippableState'];
  if (skippableState) {
    this.callEvent_('AdSkipped');
  }
};

VpaidVideoPlayer.prototype.subscribe = function(
    aCallback,
    eventName,
    aContext) {
  this.log('Subscribe ' + eventName);
  var callBack = aCallback.bind(aContext);
  this.eventsCallbacks_[eventName] = callBack;
};


VpaidVideoPlayer.prototype.unsubscribe = function(eventName) {
  this.log('unsubscribe ' + eventName);
  this.eventsCallbacks_[eventName] = null;
};

VpaidVideoPlayer.prototype.getAdLinear = function() {
  return this.attributes_['linear'];
};

VpaidVideoPlayer.prototype.getAdWidth = function() {
  return this.attributes_['width'];
};



VpaidVideoPlayer.prototype.getAdHeight = function() {
  return this.attributes_['height'];
};


VpaidVideoPlayer.prototype.getAdExpanded = function() {
  this.log('getAdExpanded');
  return this.attributes_['expanded'];
};


VpaidVideoPlayer.prototype.getAdSkippableState = function() {
  this.log('getAdSkippableState');
  return this.attributes_['skippableState'];
};


VpaidVideoPlayer.prototype.getAdRemainingTime = function() {
  return this.attributes_['remainingTime'];
};

VpaidVideoPlayer.prototype.getAdDuration = function() {
  return this.attributes_['duration'];
};


VpaidVideoPlayer.prototype.getAdVolume = function() {
  this.log('getAdVolume');
  return this.attributes_['volume'];
};


VpaidVideoPlayer.prototype.setAdVolume = function(value) {
  this.attributes_['volume'] = value;
  this.log('setAdVolume ' + value);
  this.callEvent_('AdVolumeChange');
};


VpaidVideoPlayer.prototype.getAdCompanions = function() {
  return this.attributes_['companions'];
};


VpaidVideoPlayer.prototype.getAdIcons = function() {
  return this.attributes_['icons'];
};



VpaidVideoPlayer.prototype.log = function(message) {
  console.log(message);
};


VpaidVideoPlayer.prototype.callEvent_ = function(eventType) {
  if (eventType in this.eventsCallbacks_) {
    this.eventsCallbacks_[eventType]();
  }
};


var getVPAIDAd = function() {
  return new VpaidVideoPlayer();
};

