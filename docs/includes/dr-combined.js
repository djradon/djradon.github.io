window.onerror = function() { return false; }


function browserCheck() {
	this.NS = document.layers ? 1:0;
	this.IE = document.all ? 1:0;
	this.gecko = document.getElementById ? 1:0;
	this.mac = (navigator.appVersion.indexOf("Mac") > -1) ? 1:0;
	this.opera = (navigator.appName.indexOf("Opera") > -1) ? 1:0;
	}

browser = new browserCheck();

if (browser.NS) {
	layerstart = "document.";
	layerstyle = "";  }
if (browser.gecko){
	layerstart = "document.getElementById('";
	layerstyle = "').style"; }
if (browser.IE){
	layerstart = "document.all.";
	layerstyle = ".style"; }
	
function makedrBrowse() { this.id = "drBrowse";}

makedrBrowse.prototype.width = function() {return browser.IE?document.body.clientWidth:window.innerWidth;}
makedrBrowse.prototype.height = function() {return browser.IE?document.body.clientHeight:window.innerHeight;}
makedrBrowse.prototype.scrollY = function() {return browser.IE?document.body.scrollTop:pageYOffset;}
makedrBrowse.prototype.scrollX = function() {return browser.IE?document.body.scrollLeft:pageXOffset;}

drBrowse = new makedrBrowse();

// based on makeZObjects.js from ZNIPPets.com, by DocOzone... 

function makedrObject(ID,wrapper,top,left,height,width,zindex,visibility) {
	this.ID = ID ? ID : "drObject"+(drObject.length);
	this.DHTML = (wrapper && browser.NS) ? eval(layerstart + wrapper + "." 
		+ layerstart + this.ID + layerstyle) : eval(layerstart + this.ID + layerstyle);
	this.top = top ? top:0;
	this.left = left ? left:0;
	if(height != 0) this.height = height ? height:0;
	if(width != 0) this.width = width ? width:0;
	this.zindex = zindex ? zindex:(drObject.length+1)*1000;
	this.visibility = visibility ? visibility:"visible";
	}

makedrObject.prototype.setdrAll = function() {
	this.DHTML.top = this.top; 
	this.DHTML.left = this.left;
	this.DHTML.zIndex = this.zindex;
	this.DHTML.height = this.height;
	this.DHTML.width = this.width;
	this.DHTML.visibility = this.visibility;
	}

	onload=drSetup;

	drObjects = new Array(); 

	drRefresh = 30;
	
	loaded = 0; 
	centered = 0;
	prevDelta = 0;

function drSetup() {
	ddrWalking = new makedrObject("drWalking",null,0,0,263,drBrowse.width(),1);
	//ddr = new makedrObject("dr",null,1,522,108,388,5);
	//dEmail = new makedrObject("drEmail",null,312,drBrowse.width()-130,17,119,10);
	//dPortfolio = new makedrObject("drPortfolio",null,280,10,120,480,500);
	//dLinks = new makedrObject("drLinks",null,280,drBrowse.width()/2 + 10,120,480,500);
	//drContent = new makedrObject("drContent",null,0, 263,0,0,1000);
	drObjects[0] = new makedrObject("tie_inserter","drWalking",30,drBrowse.width() - 100,158,"100%",400);
	drObjects[1] = new makedrObject("brushFore","drWalking",215,0,158,drBrowse.width(),500);
	drObjects[2] = new makedrObject("brushBack","drWalking",185,0,158,drBrowse.width(),200);
	drObjects[3] = new makedrObject("desertBack","drWalking",0,0,214,drBrowse.width(),100);
	fixObjects();
	
	if (browser.NS) {
		window.captureEvents(Event.MOUSEMOVE);
		window.onMouseMove = moveHandler;}
	else if (browser.IE) {
		document.onmousemove=moveHandler;}
	else if (browser.gecko && !browser.opera) {
		document.addEventListener("mousemove", moveHandler, true);
	}
	
drRefreshID = setInterval ("drWalking()",drRefresh);

loaded=1;
}

//Important! This next line is needed for the handling of browser re-sizing events.

	onresize=fixObjects;

function fixObjects() {
	//ddr.left = 5;
	//dPortfolio.width = (drBrowse.width())/2 - 40;
	//dLinks.width = (drBrowse.width())/2 - 40;
	//dLinks.left = (drBrowse.width())/2 + 10;
	//dEmail.left = drBrowse.width()-130;
	ddrWalking.width = drBrowse.width();
	for (m=0;m<drObjects.length;m++) drObjects[m].setdrAll();
	//ddr.setdrAll();

	// portfolio should either appear above the bottom, or scrollbars needed
	//dPortfolio.setdrAll();	
	//dLinks.setdrAll();	
	//dEmail.setdrAll();
	ddrWalking.setdrAll();
}

function drWalking() {
	randomDelta = (Math.random() * 6) - 3;
		

	if (centered) {
		drObjects[0].left = drObjects[0].left - ((randomDelta + prevDelta) / 2); 
	} else {
		drObjects[0].left = drObjects[0].left - (1 + randomDelta/5); 	
		if(drObjects[0].left < (drBrowse.width() / 2) - 360) centered = 1;
	}

	if (drObjects[0].left < -200) drObjects[0].left = -200;
	if (drObjects[0].left > drBrowse.width()) drObjects[0].left = 0;
	drObjects[0].setdrAll();

	drObjects[1].left = drObjects[1].left - (-3.5); 
	if (drObjects[1].left < -797) drObjects[1].left = drObjects[1].left + 797;
	if (drObjects[1].left > 0) drObjects[1].left = drObjects[1].left - 797;
	drObjects[1].setdrAll();

	drObjects[2].left = drObjects[2].left - (-2.0); 
	if (drObjects[2].left < -797) drObjects[2].left = drObjects[2].left + 797;
	if (drObjects[2].left > 0) drObjects[2].left = drObjects[2].left - 797;
	drObjects[2].setdrAll();

	drObjects[3].left = drObjects[3].left - (-.5); 
	if (drObjects[3].left < -1442) drObjects[3].left = drObjects[3].left + 1442;
	if (drObjects[3].left > 0) drObjects[3].left = drObjects[3].left - 1442;
	drObjects[3].setdrAll();

	prevDelta = (randomDelta + prevDelta * 9) / 10;
}

function moveHandler(e) {
	if (!loaded) return false;
	Xpos = (browser.IE)?event.x:e.pageX;
	Ypos = (browser.IE)?event.y:e.pageY;
	}
