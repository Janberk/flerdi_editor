var link = null;
var creatingLink = false;

var startDrag = null;
var stopDrag = null;

var isLoad = false;

$(window).load(function () {
	
	draginit();
	isLoad = true;
	var div1 = newDiv(0, 0);
	var div2 = newDiv(500, 500);
	
	var element1 = new NetworkElement(div1);
	var element2 = new NetworkElement(div2);
	
	link = new NetworkLink(element1, element2, 'canvas');
});

//Das Objekt, das gerade bewegt wird.
var dragobjekt = null;

// Position, an der das Objekt angeklickt wurde.
var dragx = 0;
var dragy = 0;

// Mausposition
var posx = 0;
var posy = 0;


function draginit() {
	// Initialisierung der Überwachung der Events
	document.onmousemove = drag;
	document.onmouseup = dragstop;
}

function remove(element){
	document.body.removeChild(element.parentNode);
}

function newDiv(top, left){
	
	if(top === undefined)
	{
		top = posy - 60;
	}
	
	if(left === undefined)
	{
		left = posx - 60;
	}
	
	var newDiv = document.createElement("div");
	newDiv.setAttribute('class','dragable_note',0);
	newDiv.setAttribute('onmousedown','dragstart(this)',0);
	newDiv.setAttribute('style','top:'+top+'px; left:'+left+'px;background-color:#'+getRandomColor()+';',0);
	
		var closeDiv = document.createElement("div");
		closeDiv.setAttribute('class','close',0);
		closeDiv.setAttribute('onClick','remove(this)',0);
	
	//newDiv.innerHTML  = 'Test';
	newDiv.appendChild(closeDiv);
	
	return newDiv;
}

function createDiv(top, left){
	var element = new NetworkElement(newDiv(top, left));
	
	dragstart(element.getDiv());
}

function createLink(){
	creatingLink = true;
}

function getRandomColor(){
	var farbe = Math.floor(Math.random()*16777215).toString(16);
	
	if(farbe.length == 6 ){
		return farbe;
	}else{
		return getRandomColor();
	}
}

function dragstart(element) {
	//Wird aufgerufen, wenn ein Objekt bewegt werden soll.
	if( element.getAttribute('class') == 'verschiebeding'){
		dragobjekt = element.parentNode;
		dragx = posx - dragobjekt.offsetLeft;
		dragy = posy - dragobjekt.offsetTop;
	} else if(creatingLink){
		startDrag = [posx, posy];
	} else{
		dragobjekt = element;
		dragx = posx - dragobjekt.offsetLeft;
		dragy = posy - dragobjekt.offsetTop;
	}
}

function dragstop() {
	
	if(creatingLink){
		stopDrag = [posx, posy];
		alert("start : x:"+startDrag[0] +", y:" +startDrag[1] + " ende : x" + stopDrag[0] + " y:"+stopDrag[1]);
		creatingLink = false;
	} else if(dragobjekt.getAttribute('class') == 'dragable_note'){
		link.draw();
	}
	
	//Wird aufgerufen, wenn ein Objekt nicht mehr bewegt werden soll.
	dragobjekt=null;
	if (window.getSelection) {
		if (window.getSelection().empty) {  // Chrome
			window.getSelection().empty();
		} else if (window.getSelection().removeAllRanges) {  // Firefox
			window.getSelection().removeAllRanges();
		}
	} else if (document.selection) {  // IE?
		document.selection.empty();
	}

}


function drag(ereignis) {
	//Wird aufgerufen, wenn die Maus bewegt wird und bewegt bei Bedarf das Objekt.
	posx = document.all ? window.event.clientX : ereignis.pageX;
	posy = document.all ? window.event.clientY : ereignis.pageY;
	
	if(dragobjekt != null) {
		dragobjekt.style.left = (posx - dragx) + "px";
		dragobjekt.style.top = (posy - dragy) + "px";
	}
}
//-->