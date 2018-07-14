// Init local video.
$( function() {
	$("#resizableLocal").resizable({
		alsoResize: "#localVideo"
	});
	$("#localVideo").resizable();

	$("#dialogVideoLocal").dialog({
		title: "Local Video",
		autoOpen: false,
		draggable: true,
		resizable: true,
		modal: false,
		width: 400,
		height: 400,
		show: { effect: "explode", duration: 300 },
		hide: { effect: "explode", duration: 300 },
		position: {
			my: "right top",
			at: "right top"
		}
	  });

	$("#videoLocalShow").on("click", 
		  function() {

			// If contact details set.
			if (uniqueIDElement.value && applicationIDElement.value) {

				// Change local video title.
				var title = uniqueIDElement.value + " from " + applicationIDElement.value;
				$('#dialogVideoLocal').dialog({title: "Local Video - " + title})
			}
			$("#dialogVideoLocal").dialog("open");
	});
	
	$('#dialogVideoLocal').bind("dialogresize", function(event, ui) {
		$('#dialogVideoLocal #resizableLocal').css('height',  ($('#dialogVideoLocal').height() - 15) + 'px');
		$('#dialogVideoLocal #resizableLocal').css('width',  ($('#dialogVideoLocal').width() - 15) + 'px');

		$('#resizableLocal #localVideo').css('height',  ($('#resizableLocal').height()) + 'px');
		$('#resizableLocal #localVideo').css('width',  ($('#resizableLocal').width()) + 'px');
	});

	$("#dialogRemoteVideoShow").dialog({
		title: "Remote Videos",
		autoOpen: false,
		draggable: true,
		resizable: true,
		modal: false,
		width: 500,
		height: 500,
		show: { effect: "explode", duration: 300 },
		hide: { effect: "explode", duration: 300 },
		position: {
			my: "left top",
			at: "left top"
		}
	  });

	  $("#videoRemoteShow").on("click", 
		  function() {
			$("#dialogRemoteVideoShow").dialog("open");
	});

	$("#dialogAddNewContact").dialog({
		title: "Add New Contact",
		autoOpen: false,
		draggable: true,
		resizable: false,
		modal: true,
		width: 500,
		height: 200,
		show: { effect: "explode", duration: 300 },
		hide: { effect: "explode", duration: 300 },
		position: {
			my: "center top",
			at: "center top"
		},
		buttons: {
			Add: function ()
			{
				// Get the inputs.
				var uID = contactUniqueIDAddNew.value;
				var aIP = contactApplicationIDAddNew.value;

				// If contact details set.
				if (uID && aIP) {
					// Add to list.
					conferenceContactList.push(uID);

					// Create the conference contacts.
					createConferenceContact(uID, aIP);

					// Create the conference contacts.
					createNewContact(uID, aIP);
				}
				$(this).dialog("close");
			},
			Cancel: function ()
			{
				$(this).dialog("close");
			}
		}
	  });

	  $("#addNewContact").on("click", 
		  function() {
			contactUniqueIDAddNew.value = "";
			contactApplicationIDAddNew.value = conferenceApplicationID;
			$("#dialogAddNewContact").dialog("open");
	});
});

// Init remote video.
function InitRemoteVideo(resizableRemote, remoteVideo, dialogVideoRemote, videoRemoteShow, uniqueID, applicationID) {
	$("#" + resizableRemote).resizable({
		alsoResize: "#" + remoteVideo
	});
	$("#" + remoteVideo).resizable();
	 
	$("#" + dialogVideoRemote).dialog({
		title: "Remote Video",
		autoOpen: false,
		draggable: true,
		resizable: true,
		modal: false,
		width: 400,
		height: 400,
		show: { effect: "explode", duration: 300 },
		hide: { effect: "explode", duration: 300 },
		position: {
			my: "left bottom",
			at: "left bottom"
		}
	});

	$("#" + videoRemoteShow).on("click", 
		  function() {

			// Change remote video title.
			var title = uniqueID + " from " + applicationID;
			contactUniqueIDElement.value = uniqueID;
			contactApplicationIDElement.value = applicationID;
			$('#' + dialogVideoRemote).dialog({title: "Remote Video - " + title});
			$("#" + dialogVideoRemote).dialog("open");
	});
	
	$("#" + dialogVideoRemote).bind("dialogresize", function(event, ui) {
		$('#' + dialogVideoRemote + ' #' + resizableRemote).css('height',  ($('#' + dialogVideoRemote).height() - 15) + 'px');
		$('#' + dialogVideoRemote + ' #' + resizableRemote).css('width',  ($('#' + dialogVideoRemote).width() - 15) + 'px');

		$('#' + resizableRemote + ' #' + remoteVideo).css('height',  ($('#' + resizableRemote).height()) + 'px');
		$('#' + resizableRemote + ' #' + remoteVideo).css('width',  ($('#' + resizableRemote).width()) + 'px');
	});
};