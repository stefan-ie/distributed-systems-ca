console.log("js.js loaded.");	
$(document).ready(function() {
	console.log("document loaded.");	

	addEvents();
	
	if (userName == null && $('#playingField').html() == '<p>Welcome</p>') {
		console.log('Found no previous user');
		logInForm();
	}
	else if (userName != null) {
		console.log('Found previous user');
		initGame();
	}
	
});

localStorage.removeItem('uName');
var userName = localStorage.getItem('uName');
console.log(userName);

function addEvents() {
	$('#controllerToggle').click(controllerStatus);
	$('#clientServer1Toggle').click(clientServer1Status);
	$('#clientServer2Toggle').click(clientServer2Status);
	$('#checkStatuses').click(checkServerStatus);
	//$('#loginForm').submit(saveUser);
	
}

function logInForm() {
$('#playingField').html('<form action="http://www.worldclimatedata.org/" method="post" id="loginForm"><div></div>
<label for="uname">User Name:</label><input type="text" name="uname" id="uname"></div><div class="clearBoth">&nbsp;</div>
<div><label for="pword">Password:</label><input type="password" name="pword"></div><div class="clearBoth">&nbsp;</div>
<input type="submit" value="Login"></form>');
}


function saveUser(uname) {
	console.log('Save user');
	localStorage.setItem('uName', uname);
	var userName = localStorage.getItem('uName');
	console.log(userName);
	initGame();
}


function initGame() {
	console.log('Save user');
	var html = '<div id="drawingBoard">';
	html += '<div class="drawSection" id="section1">';
	html += '</div>';
	html += '<div class="drawSection"  id="section2">';
	html += '</div>';
	html += '<div class="drawSection"  id="section3">';
	html += '</div>';
	html += '<div class="drawSection"  id="section4">';
	html += '</div>';
	html += '<button class="drawButton" id="fromLocal" onclick="newFromLocal();">New (Local)</button>';
	html += '<button class="drawButton" id="fromRemote">New (Remote)</button>';
	html += '<button class="drawButton" id="clearButton" onclick="clearDrawing();">Start Over</button>';	
	html += '<button class="drawButton" id="saveButton" onclick="saveButton();">Save + File</button>';	
	html += '';
	html += '';
	html += '';
	html += '<div class="clearBoth">&nbsp;</div>';
	html += '</div>';

	$('#playingField').html(html);
}


function saveButton() {
    console.log('About to save canvas');
    var drawCanvas = $(drawId)[0];
    var image = drawCanvas.toDataURL('image/png');
	// save to local storage to preserve saved image for loadPreviousImage()
	localStorage.setItem('drawImage', image);
    $('#savedImage').attr('src', image)
}






function clearDrawing() {
    console.log('About to clear canvas');
    $(drawId).attr('width', drawW);
    $(drawId).attr('height', drawH);
    prepareCanvas();
}







function newFromLocal() {
	$('#section1').html('<canvas id="drawCanvas"></canvas>');
	//$('#drawClear').click(clearDrawing);
	//$('#drawSave').click(saveDrawing);
	//$('#drawDelete').click(deleteSavedDrawing);
	//$('#drawDownload').click(downloadDrawing);
	createEnvironment('section1');
}


// Set default values
var drawId = '#drawCanvas'; // {string} ID of canvas element
var drawW = 475; // {number} width of canvas element
var drawH = 135; // {number} heigth of canvas element
var drawBg = '#dddddd'; // {string} canvas colour
var drawBdrW = 2; // {number} canvas border width
var drawBdrS = 'solid'; // {string} canvas border style
var drawBdrC = 'gray'; // {string} canvas border colour
var drawCol = 'purple'; // {string} drawing colour
var drawRad = 6;  // {number} size of drawing tool



// setup canvas with a width and height - add border and background colour
function createEnvironment(section) {
    // Canvas elements always require HTML height and width attribute
	$(drawId).attr("width", drawW);
    $(drawId).attr("height", drawH); 
    $(drawId).css("backgroundColor", drawBg);
    $(drawId).css('border', drawBdrW + 'px ' + drawBdrS + ' ' + drawBdrC);
	prepareCanvas();
}


// setup 2D drawing context	for drawCanvas
function prepareCanvas() {
    // store canvas element in drawCanvas
    var drawCanvas = $(drawId)[0];
    console.log(drawCanvas);
	// store 2D drawing context	for canvas in context
    context = drawCanvas.getContext('2d');
	// clear canvas before starting
	context.clearRect(0,0,drawW,drawH);
	// set draw tool colour
    context.strokeStyle = drawCol;
	// set draw tool width
    context.lineWidth = drawRad;
	// set line ends to rounded
	context.lineCap = 'round';
    console.log(context);

    // start drawing onto canvas at current position
	$(drawId).mousedown(function (mouseEvent) {
        // store current mouse X and Y position in posXy object
        var posXy = getPosXy(mouseEvent, drawCanvas);
		// move drawing context to current mouse position
		console.log(posXy);
        context.moveTo(posXy.X, posXy.Y);
		// start drawing at current position
        context.beginPath();
        // chain mouse event handlers for move, keyup and mouseout
        $(this).mousemove(function (mouseEvent) {
            // keep drawing context when mouse moves at current mouse position
            drawLine(mouseEvent, drawCanvas, context);
            // stop drawing when mouse key is released
            }).mouseup(function (mouseEvent) {
                stopDrawing(mouseEvent, drawCanvas, context);
            // stop drawing when mouse leaves drawCanvas area
            }).mouseout(function (mouseEvent) {
                stopDrawing(mouseEvent, drawCanvas, context);
        });
    });
}


// get current mouse position
function getPosXy(mouseEvent, drawCanvas) {
    var x, y;
    if (mouseEvent.pageX != undefined && mouseEvent.pageY != undefined) {
        x = mouseEvent.pageX - 45;
        y = mouseEvent.pageY -135;
		console.log("1:", x, y);
    } 
    else {
        x = mouseEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = mouseEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		console.log("2:", x, y);
    }
    return {X: x - drawCanvas.offsetLeft, Y: y - drawCanvas.offsetTop};
}
 

// draw a line to current mouse position
function drawLine(mouseEvent, drawCanvas, context) {
	// store current mouse X and Y position in posXy object
    var posXy = getPosXy(mouseEvent, drawCanvas);
	console.log(posXy);
	// draw 2d context at current mouse position
    context.lineTo(posXy.X, posXy.Y);
    context.stroke();
}


// stop draw at current mouse mouse position
function stopDrawing(mouseEvent, drawCanvas, context) {
    // stop 2d context at current mouse position
    drawLine(mouseEvent, drawCanvas, context);
    // unbind all mouse events
    $(drawCanvas).unbind('mousemove').unbind('mouseup').unbind('mouseout');
}



function loadPreviousImage() {
    var image = localStorage.getItem('drawImage');
	console.log(image);
	if (image) {
        $('#savedImage').attr('src', image);
    }
    else {
        $('#savedImage').attr('src', imageSpaceHolder);
    }
}




function checkServerStatus() {
	clientServer1Status();
	clientServer2Status();
	controllerStatus();
}

function controllerStatus() {
	console.log('Sending for Controller Status');
	document.getElementById("controllerToggle").setAttribute('disabled', 'true');
	if (document.getElementById("controllerToggle").innerHTML == 'Shutdown') {
		document.getElementById("controllerStatus").innerHTML = 'Shutting down Controller';
	}
	else if (document.getElementById("controllerToggle").innerHTML == 'Restart') {
		document.getElementById("controllerStatus").innerHTML = 'Restarting Controller';		
	}
	// create new XMLHttp object for this data submit
	var xhttp = new XMLHttpRequest();
	// create new FormData object
	var myData = new FormData();
	// loop that's await return from server
	xhttp.onreadystatechange = function() {		
		// display a HTTP Request status message
		document.getElementById("controllerToggle").innerHTML = "Awaiting response from server.";
		if (this.readyState == 4 && this.status == 200) {
			// received data from server - display data on page
			document.getElementById("controllerStatus").innerHTML = xhttp.responseText;
			console.log(xhttp.responseText);
			if (xhttp.responseText.trim() == 'Controller Running') {
				document.getElementById("controllerToggle").innerHTML = 'Shutdown';
				document.getElementById("controllerToggle").removeAttribute('disabled');
			}
			else if (xhttp.responseText.trim() == 'Controller Shut Down') {
				document.getElementById("controllerToggle").innerHTML = 'Restart';
				document.getElementById("controllerToggle").removeAttribute('disabled');
			}
		}
	};
	// start http request for our processing file on server using POST method
	xhttp.open("POST", "http://???/process.php", true);
	// Attach data from our form to the FormData object
	if (document.getElementById("controllerStatus").innerHTML == 'Shutting down Controller') {
		myData.append('action', 'Shutdown');
	}
	else if (document.getElementById("controllerStatus").innerHTML == 'Restarting Controller') {
		myData.append('action', 'Restart');
	}
	else {
		myData.append('action', 'Check Status');
	}
    // Initiate the multipart/form-data upload
    xhttp.send(myData);
}


function clientServer1Status() {
	console.log('Sending for Client Server 1 Status');
	document.getElementById("clientServer1Toggle").setAttribute('disabled', 'true');
	if (document.getElementById("clientServer1Toggle").innerHTML == 'Shutdown') {
		document.getElementById("clientServer1Status").innerHTML = 'Shutting down Client 1';
	}
	else if (document.getElementById("clientServer1Toggle").innerHTML == 'Restart') {
		document.getElementById("clientServer1Status").innerHTML = 'Restarting Client 1';
	}
	// create new XMLHttp object for this data submit
	var xhttp = new XMLHttpRequest();
	// create new FormData object
	var myData = new FormData();
	// loop that's await return from server
	xhttp.onreadystatechange = function() {		
		// display a HTTP Request status message
		document.getElementById("clientServer1Toggle").innerHTML = "Awaiting response from server.";
		if (this.readyState == 4 && this.status == 200) {
			// received data from server - display data on page
			document.getElementById("clientServer1Status").innerHTML = xhttp.responseText;
			if (xhttp.responseText.trim() == 'Client Server 1 Running') {
				document.getElementById("clientServer1Toggle").innerHTML = 'Shutdown';
				document.getElementById("clientServer1Toggle").removeAttribute('disabled');
			}
			else if (xhttp.responseText.trim() == 'Client Server 1 Shut Down') {
				document.getElementById("clientServer1Toggle").innerHTML = 'Restart';
				document.getElementById("clientServer1Toggle").removeAttribute('disabled');
			}
		}
	};
	// start http request for our processing file on server using POST method
	xhttp.open("POST", "http://worldclimatedata.org/process.php", true);
	// Attach data from our form to the FormData object
	if (document.getElementById("clientServer1Status").innerHTML == 'Shutting down Client 1') {
		myData.append('action', 'Shutdown');
	}
	else if (document.getElementById("clientServer1Status").innerHTML == 'Restarting Client 1') {
		myData.append('action', 'Restart');
	}
	else {
		myData.append('action', 'Check Status');
	}
    // Initiate the multipart/form-data upload
    xhttp.send(myData);
}

function clientServer2Status() {
	console.log('Sending for Client Server 2 Status');
	document.getElementById("clientServer2Toggle").setAttribute('disabled', 'true');
	if (document.getElementById("clientServer2Toggle").innerHTML == 'Shutdown') {
		document.getElementById("clientServer2Status").innerHTML = 'Shutting down Client 2';
	}
	else if (document.getElementById("clientServer2Toggle").innerHTML == 'Restart') {
		document.getElementById("clientServer2Status").innerHTML = 'Restarting Client 2';
	}
	// create new XMLHttp object for this data submit
	var xhttp = new XMLHttpRequest();
	// create new FormData object
	var myData = new FormData();
	// loop that's await return from server
	xhttp.onreadystatechange = function() {		
		// display a HTTP Request status message
		document.getElementById("clientServer2Toggle").innerHTML = "Awaiting response from server.";
		if (this.readyState == 4 && this.status == 200) {
			// received data from server - display data on page
			document.getElementById("clientServer2Status").innerHTML = xhttp.responseText;
			if (xhttp.responseText.trim() == 'Client Server 2 Running') {
				document.getElementById("clientServer2Toggle").innerHTML = 'Shutdown';
				document.getElementById("clientServer2Toggle").removeAttribute('disabled');
			}
			else if (xhttp.responseText.trim() == 'Client Server 2 Shut Down') {
				document.getElementById("clientServer2Toggle").innerHTML = 'Restart';
				document.getElementById("clientServer2Toggle").removeAttribute('disabled');
			}
		}
	};
	// start http request for our processing file on server using POST method
	xhttp.open("POST", "http://mypayday.ie/process.php", true);
	// Attach data from our form to the FormData object
	if (document.getElementById("clientServer2Status").innerHTML == 'Shutting down Client 2') {
		myData.append('action', 'Shutdown');
	}
	else if (document.getElementById("clientServer2Status").innerHTML == 'Restarting Client 2') {
		myData.append('action', 'Restart');
	}
	else {
		myData.append('action', 'Check Status');
	}
    // Initiate the multipart/form-data upload
    xhttp.send(myData);
}
