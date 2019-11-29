// Amazon Connect Embedded Chat
var minimizedChat = false;

/**
 * Minimise or maximise the chat window. 
*/
function minimizeChat() {
	if (minimizedChat) {

		minimizedChat = false;
		document.getElementById("chatWindow").style.display = "inline";
		document.getElementById("minimizeChatButton").value = "Minimize Chat";
	}
	else {

		minimizedChat = true;
		document.getElementById("chatWindow").style.display = "none";
		document.getElementById("minimizeChatButton").value = "Maximize Chat";
	}
}

/**
 * Close the chat window.
*/
function closeChat() {

	document.getElementById("chatWindow").style = "display: none";
	document.getElementById("chatWindowControls").style = "display: none";
}

/**
 * Create the embedded chat window.
 * @param {object}	config   the config.
*/
function createEmbeddedChat(config) {

	// create the controls
	var chatWindowDiv = document.createElement('div');
	chatWindowDiv.id = "chatWindow";
	chatWindowDiv.style = "position: absolute; bottom: 30px; right:10px; width:500px; height:680px";

	// create the iframe.
	var chatFrame = document.createElement("iframe");
	chatFrame.src = config.instanceURL;
	chatFrame.style = "width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;";

	// add the frame.
	chatWindowDiv.appendChild(chatFrame);

	// create the controls
	var controlsDiv = document.createElement('div');
	controlsDiv.id = "chatWindowControls";
	controlsDiv.style = "position: absolute; bottom: 0px; right:20px; width:500px; height:30px";

	// create minimise button.
	var minButton = document.createElement('input');
	minButton.id = "minimizeChatButton";
	minButton.type = "button";
	minButton.value = "Minimize Chat";
	minButton.style = "float:right; width:110px; height:30px; border-radius: 5px 5px 5px 5px; background-color: rgb(245, 245, 245); cursor:pointer;";
	minButton.addEventListener("click", minimizeChat, false);

	// create close button.
	var closeButton = document.createElement('input');
	closeButton.id = "closeChatButton";
	closeButton.type = "button";
	closeButton.value = "Close Chat";
	closeButton.style = "float:right; width:110px; height:30px; border-radius: 5px 5px 5px 5px; background-color: rgb(245, 245, 245); cursor:pointer;";
	closeButton.addEventListener("click", closeChat, false);

	// add elements.
	controlsDiv.appendChild(minButton);
	controlsDiv.appendChild(closeButton);

	// add the controls
	document.body.append(chatWindowDiv);
	document.body.append(controlsDiv);
}