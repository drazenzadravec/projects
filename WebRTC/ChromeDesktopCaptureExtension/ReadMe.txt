Google Chrome desktop capture extension.
	
	manifest.json
		Change to match company domain:	
			"matches": ["https://192.168.0.200/*"]

Install extension, open Google Chrome extension.
'Load unpacked extension' and select this folder.
Get the ID of the extension:
	ID: cfbmdcbhgekjgelanjfjdmppkpjcpmng

	app\getScreenId.html
		Change the extension id of the one created:
			var extensionid = 'fcmgbbaaldepmjhnpeimpclpiphimdif';

	app\get_screenId.js
		Change the domain to company specific:
			iframe.src = 'https://192.168.0.200/[appname]' + 'getScreenId.html';

	app\screen_capturing.js
		Change the extension id of the one created:
			extensionid = 'fcmgbbaaldepmjhnpeimpclpiphimdif'
