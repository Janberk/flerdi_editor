<!-- gueltig fuer Netscape ab Version 6, Mozilla, Internet Explorer ab Version 4
var jg = new jsGraphics(); // direkt in's document zeichnen
jg.setColor("#ff0000"); // rot
jg.drawLine(10, 113, 220, 55); // Koordinaten auf Zeichenfläche bezogen
jg.paint();

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

function newDiv(){
	var newDiv = document.createElement("div");
	newDiv.setAttribute('class','dragable_note',0);
	newDiv.setAttribute('onmousedown','dragstart(this)',0);
	var left = posx - 70;
	var top = posy - 5;
	newDiv.setAttribute('style','top:'+top+'px; left:'+left+'px;background-color:#'+getRandomColor()+';',0);
	
		var closeDiv = document.createElement("div");
		closeDiv.setAttribute('class','close',0);
		closeDiv.setAttribute('onClick','remove(this)',0);
	
	//newDiv.innerHTML  = 'Test';
	newDiv.appendChild(closeDiv);
	document.body.appendChild(newDiv);
	
	dragstart(newDiv);
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
	}else{
		dragobjekt = element;
		dragx = posx - dragobjekt.offsetLeft;
		dragy = posy - dragobjekt.offsetTop;
	}
}


function dragstop() {
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