export var AssignEntitiesRequest_AddressBook = {
  "entityType": "",
  "addressBookAssignments": [
    {
      "entityId": 0
    }
  ]
};
export var AssignEntitiesResponse_AddressBook = {
  "assignResults": [
    {
      "success": true,
      "entityId": 0,
      "error": "",
      "entityType": ""
    }
  ]
};
export var CreateDynamicEntitiesRequest_AddressBook = {
    "fullLoad": false,
    "addressBookEntries": [
    {
      "externalId": "",
      "stateId": 0,
      "externalState": "",
      "firstName": "",
      "middleName": "",
      "lastName": "",
      "company": "",
      "phone": "",
      "mobile": "",
      "email": ""
    }
  ]
};
export var CreateDynamicEntitiesResponse_AddressBook = {
  "entryResults": [
    {
      "success": true,
      "created": true,
      "addressBookEntryId": 0,
      "externalId": 0,
      "error": ""
    }
  ]
};
export var CreateRequest_AddressBook = {
  "addressBookName": "",
  "addressBookType": ""
};
export var CreateResponse_AddressBook = {
  "resultSet": {
    "addressBookId": 0,
    "addressBookType": "",
    "addressBookName": ""
  }
};
export var CreateStandardEntitiesRequest_AddressBook = {
  "addressBookEntries": [
    {
      "firstName": "",
      "middleName": "",
      "lastName": "",
      "company": "",
      "phone": "",
      "mobile": "",
      "email": ""
    }
  ]
};
export var CreateStandardEntitiesResponse_AddressBook = {
  "entryResults": [
    {
      "success": true,
      "addressBookEntryId": 0,
      "error": ""
    }
  ]
};
export var DynamicEntitiesRequest_AddressBook = {
	"fields": "",
	"top": "",
	"skip": "",
	"orderBy": "",
	"fullLoad": "",
	"updatedSince": "",
	"searchString": ""
};
export var DynamicEntitiesResponse_AddressBook = {
  "totalRecords": 0,
  "_links": {
    "self": "",
    "next": "",
    "previous": ""
  },
  "addressBook": {
    "addressBookName": "",
    "addressBookId": 0,
    "addressBookType": "",
    "fullLoad": true,
    "serverTime": "2020-07-26T23:59:59.678Z",
    "addressBookEntries": [
		{
			"addressBookEntryId": 0,
			"externalId": 0,
			"stateId": 0,
			"externalState": "",
			"firstName": "",
			"middleName": "",
			"lastName": "",
			"company": "",
			"phone": "",
			"mobile": "",
			"email": "",
			"isDeleted": true,
			"lastUpdateTime": "2020-07-26T23:59:59.678Z"
		}
    ]
  }
};
export var GetAgentsRequest_AddressBook = {
  "includeEntries": true,
  "updatedSince": ""
};
export var GetAgentsResponse_AddressBook = {
	"lastPollTime": "2020-07-26T23:59:59.678Z",
	"addressBooks": [
		{
			"addressBookName": "",
			"addressBookId": 0,
			"addressBookType": "",
			"appId": ""
		}
	]
};
export var GetCampaignsRequest_AddressBook = {
  "includeEntries": true,
  "updatedSince": ""
};
export var GetCampaignsResponse_AddressBook = {
	"lastPollTime": "2020-07-26T23:59:59.678Z",
	"addressBooks": [
		{
			"addressBookName": "",
			"addressBookId": 0,
			"addressBookType": "",
			"appId": ""
		}
	]
};
export var GetResponse_AddressBook = {
  "addressBooks": [
    {
      "addressBookName": "",
      "addressBookId": 0,
      "addressBookType": "",
      "appId": "",
      "agents": [
        {
          "agentId": 0,
          "userName": ""
        }
      ],
      "teams": [
        {
          "teamId": 0,
          "teamName": ""
        }
      ],
      "skills": [
        {
          "skillId": 0,
          "skillName": ""
        }
      ],
      "campaigns": [
        {
          "campaignId": 0,
          "campaignName": ""
        }
      ]
    }
  ]
};
export var GetSkillsRequest_AddressBook = {
  "includeEntries": true,
  "updatedSince": ""
};
export var GetSkillsResponse_AddressBook = {
	"lastPollTime": "2020-07-26T23:59:59.678Z",
	"addressBooks": [
		{
			"addressBookName": "",
			"addressBookId": 0,
			"addressBookType": "",
			"appId": ""
		}
	]
};
export var GetTeamsRequest_AddressBook = {
  "includeEntries": true,
  "updatedSince": ""
};
export var GetTeamsResponse_AddressBook = {
	"lastPollTime": "2020-07-26T23:59:59.678Z",
	"addressBooks": [
		{
			"addressBookName": "",
			"addressBookId": 0,
			"addressBookType": "",
			"appId": ""
		}
	]
}
;
export var StandardEntitiesRequest_AddressBook = {
	"searchString": "",
	"fields": "",
	"skip": "",
	"top": "",
	"orderBy": "",
	"updatedSince": ""
};
export var StandardEntitiesResponse_AddressBook = {
	"_links": {
		"self": "",
		"next": "",
		"previous": ""
	},
	"businessUnitId": 0,
	"lastPollTime": "2020-07-26T23:59:59.678Z",
	"totalRecords": 0,
	"addressBook": {
		"addressBookName": "",
		"addressBookId": 0,
		"addressBookType": "",
		"addressBookEntries": [
			{
				"addressBookEntryId": 0,
				"firstName": "",
				"middleName": "",
				"lastName": "",
				"company": "",
				"phone": "",
				"mobile": "",
				"email": ""
			}
		]
	}
};
export var UpdateStandardEntitiesRequest_AddressBook = {
  "addressBookEntries": [
    {
      "addressBookEntryId": 0,
      "firstName": "",
      "middleName": "",
      "lastName": "",
      "company": "",
      "phone": "",
      "mobile": "",
      "email": ""
    }
  ]
};
export var UpdateStandardEntitiesResponse_AddressBook = {
  "entryResults": [
    {
      "success": true,
      "addressBookEntryId": 0,
      "error": ""
    }
  ]
};
export var DialAgentPhoneRequest_AgentPhone = {

};
export var DialAgentPhoneResponse_AgentPhone = {

};
export var EndAgentPhoneCallRequest_AgentPhone = {

};
export var EndAgentPhoneCallResponse_AgentPhone = {

};
export var MuteAgentPhoneRequest_AgentPhone = {

};
export var MuteAgentPhoneResponse_AgentPhone = {

};
export var UnMuteAgentPhoneRequest_AgentPhone = {

};
export var UnMuteAgentPhoneResponse_AgentPhone = {

};
export var ChangeSkillForAgentRequest_Agents = {
	"skills": [
		{
			"skillId": 0,
			"proficiency": 0,
			"isActive": true
		}
	]
};
export var ChangeSkillForAgentResponse_Agents = {
	"resultSet": {
		"errorCount": 0,
		"skillResults": [
			{
				"success": true,
				"skillId": 0,
				"error": ""
			}
		]
	}
};
export var CreateAccessKeyRequest_Agents = {
	"agentId":  0
};
export var CreateAccessKeyResponse_Agents = {
	"accesskeys": [
		{
			"accessKeyId": "",
			"accessKeySecret": "",
			"agentId": 0,
			"billingId": 0,
			"isActive": true
		}
	]
};
export var CreateAgentMessageRequest_Agents = {
	"agentMessages": [
		{
			"expireMinutes": 0,
			"message": "",
			"messageType": 0,
			"startDate": "",
			"subject": "",
			"targetId": 0,
			"targetType": 1,
			"validUntil": ""
		}
	]
};
export var CreateAgentMessageResponse_Agents = {
	"errorCount": 0,
	"agentMessageResults": [
		{
			"agentMessageId": 0,
			"success": true,
			"error": ""
		}
	]
}

;
export var CreateAgentRequest_Agents = {
  "agents": [
	{
		"firstName": "",
		"middleName": "",
		"lastName": "",
		"teamId": "",
		"teamUuid": "",
		"reportToId": 0,
		"internalId": "",
		"profileId": 0,
		"roleId": "",
		"password": "",
		"forceChangeOnLogon": true,
		"emailAddress": "",
		"userName": "",
		"userId": "",
		"timeZone": "",
		"country": "",
		"state": "",
		"city": "",
		"chatRefusalTimeout": 0,
		"phoneRefusalTimeout": 0,
		"workItemRefusalTimeout": 0,
		"defaultDialingPattern": 0,
		"useTeamMaxConcurrentChats": true,
		"maxConcurrentChats": 0,
		"isActive": true,
		"locationId": 0,
		"notes": "",
		"hireDate": "",
		"terminationDate": "",
		"hourlyCost": 0,
		"rehireStatus": true,
		"employmentType": "1",
		"referral": "",
		"atHome": true,
		"hiringSource": 0,
		"ntLoginName": "",
		"custom1": "",
		"custom2": "",
		"custom3": "",
		"custom4": "",
		"custom5": "",
		"scheduleNotification": "",
		"federatedId": "",
		"useTeamEmailAutoParkingLimit": true,
		"maxEmailAutoParkingLimit": 0,
		"sipUser": "",
		"systemUser": "",
		"systemDomain": "",
		"crmUserName": "",
		"useAgentTimeZone": true,
		"timeDisplayFormat": 0,
		"sendEmailNotifications": true,
		"apiKey": "",
		"telephone1": "",
		"telephone2": "",
		"userType": "",
		"isWhatIfAgent": true,
		"requestContact": true,
		"chatThreshold": 0,
		"useTeamChatThreshold": true,
		"emailThreshold": 0,
		"useTeamEmailThreshold": true,
		"workItemThreshold": 0,
		"useTeamWorkItemThreshold": true,
		"contactAutoFocus": true,
		"useTeamContactAutoFocus": true,
		"useTeamRequestContact": true,
		"recordingNumbers": true,
		"subject": "",
		"issuer": "",
		"isOpenIdProfileComplete": true,
		"maxPreview": true,
		"deliveryMode": "",
		"totalContactCount": "",
		"useTeamDeliveryModeSettings": true,
		"emailRefusalTimeOut": 0,
		"voicemailRefusalTimeOut": 0,
		"smsRefusalTimeout": 0
	}
  ]
};
export var CreateAgentResponse_Agents = {
	"errorCount": 0,
	"results": [
		{
			"success": true,
			"teamId": 0,
			"error": ""
		}
	]
};
export var CreateCustomAgentEventRequest_Agents = {
	"eventName": "",
	"persistInMemory": false,
	"data": ""
};
export var CreateCustomAgentEventResponse_Agents = {
};
export var CreateTeamRequest_Agents = {
  "teams": [
	{
		"teamName": "",
		"isActive": true,
		"maxConcurrentChats": 0,
		"wfoEnabled": true,
		"wfm2Enabled": true,
		"qm2Enabled": true,
		"inViewEnabled": true,
		"inViewGamificationEnabled": true,
		"inViewChatEnabled": true,
		"inViewLMSEnabled": true,
		"notes": "",
		"maxEmailAutoParkingLimit": 0,
		"analyticsEnabled": true,
		"requestContact": true,
		"contactAutoFocus": true,
		"chatThreshold": 0,
		"emailThreshold": 0,
		"workItemThreshold": 0,
		"voiceThreshold": 0,
		"teamLeadId": "",
		"totalContactCount": 0,
		"niceAudioRecordingEnabled": true,
		"niceCoachingEnabled": true,
		"niceDesktopAnalyticsEnabled": true,
		"niceLessonManagementEnabled": true,
		"nicePerformanceManagementEnabled": true,
		"niceQmEnabled": true,
		"niceQualityOptimizationEnabled": true,
		"niceScreenRecordingEnabled": true,
		"niceShiftBiddingEnabled": true,
		"niceSpeechAnalyticsEnabled": true,
		"niceStrategicPlannerEnabled": true,
		"niceSurvey_CustomerEnabled": true,
		"niceWfmEnabled": true,
		"niceWfoAdvancedEnabled": true,
		"niceWfoEssentialsEnabled": true
	}
  ]
};
export var CreateTeamResponse_Agents = {
  "errorCount": 0,
  "results": [
	{
		"success": true,
		"teamId": 0,
		"error": ""
	}
  ]
};
export var DeleteAccessKeyRequest_Agents = {

};
export var DeleteAccessKeyResponse_Agents = {

};
export var DeleteAgentMessageRequest_Agents = {
};
export var DeleteAgentMessageResponse_Agents = {
};
export var EndAgentSessionRequest_Agents = {
};
export var EndAgentSessionResponse_Agents = {
};
export var GetAccessKeyRequest_Agents = {
};
export var GetAccessKeyResponse_Agents = {
	"accessKey": {
		"accessKeyId": "",
		"agentId": 0,
		"billingId": 0,
		"isActive": true,
		"lastUsedDate": ""
	}
};
export var GetAccessKeysRequest_Agents = {
	"fields": "",
	"agentId": "",
	"orderBy": "",
	"skip": "",
	"top": ""
};
export var GetAccessKeysResponse_Agents = {
	"totalRecords": 0,
	"accesskeys": [
		{
			"accessKeyId": "",
			"agentId": 0,
			"billingId": 0,
			"isActive": true,
			"lastUsedDate": ""
		}
	]
};
export var GetAgentContactsBySkillRequest_Agents = {
	"startDate": "",
	"endDate": ""
};
export var GetAgentContactsBySkillResponse_Agents = {
	"agentSkillData": {
		"agents": [
			{
				"agent": 0,
				"skills": [
					{
						"SkillNo": 0,
						"OfferedContacts": 0,
						"AnsweredContacts": 0,
						"HoldCalls": 0,
						"TalkTime": 0,
						"HeldTime": 0,
						"ACWTime": 0
					}
				]
			}
		]
	}
};
export var GetAgentDialingPatternsRequest_Agents = {
};
export var GetAgentDialingPatternsResponse_Agents = {
	"dialingPatterns": [
		{
			"patternId": 0,
			"patternName": "",
			"input": "",
			"output": ""
		}
	]
};
export var GetAgentIndicatorRequest_Agents = {
};
export var GetAgentIndicatorResponse_Agents = {
	"indicators": [
		{
			"indicatorName": "",
			"senderContactId": 0,
			"imageFile": "",
			"actionType": "",
			"action": "",
			"toolTip": "",
			"enable": true
		}
	]
};
export var GetAgentMessageRequest_Agents = {
};
export var GetAgentMessageResponse_Agents = {
	"messages": [
		{
			"messageId": 0,
			"messageText": "",
			"expireTimer": 0,
			"messageHint": "",
			"indicatorId": 0,
			"subject": "",
			"validUntil": "2020-07-26T23:59:59.678Z",
			"startDate": "2020-07-26T23:59:59.678Z"
		}
	]
};
export var GetAgentQuickRepliesRequest_Agents = {

};
export var GetAgentQuickRepliesResponse_Agents = {
	"quickReplies": [
		{
			"quickReplyId": 0,
			"title": "",
			"keyWords": "",
			"content": "",
			"isFavorite": 0,
			"skills": [
				{
					"skillId": 0,
					"skillName": ""
				}
			]
		}
	]
};
export var GetAgentRequest_Agents = {
	"fields": ""
};
export var GetAgentResponse_Agents = {
  "agents": [
	{
		"agentId": 0,
		"userName": "",
		"firstName": "",
		"middleName": "",
		"lastName": "",
		"userID": "",
		"emailAddress": "",
		"isActive": true,
		"teamId": 0,
		"teamName": "",
		"reportToId": 0,
		"reportToName": "",
		"isSupervisor": true,
		"lastLogin": "2019-04-14T22:53:25.761Z",
		"lastUpdated": "2019-04-14T22:53:25.761Z",
		"location": "",
		"custom1": "",
		"custom2": "",
		"custom3": "",
		"custom4": "",
		"custom5": "",
		"internalId": "",
		"profileId": 0,
		"profileName": "",
		"timeZone": "",
		"country": "",
		"countryName": "",
		"state": "",
		"city": "",
		"chatRefusalTimeout": 0,
		"phoneRefusalTimeout": 0,
		"workItemRefusalTimeout": 0,
		"defaultDialingPattern": 0,
		"defaultDialingPatternName": "",
		"useTeamMaxConcurrentChats": true,
		"maxConcurrentChats": 0,
		"notes": "",
		"createDate": "2020-07-26T23:59:59.678Z",
		"inactiveDate": "2020-07-26T23:59:59.678Z",
		"hireDate": "2020-07-26T23:59:59.678Z",
		"terminationDate": "2020-07-26T23:59:59.678Z",
		"hourlyCost": 0,
		"rehireStatus": true,
		"employmentType": 0,
		"employmentTypeName": "",
		"referral": "",
		"atHome": true,
		"hiringSource": 0,
		"ntLoginName": "",
		"scheduleNotification": "",
		"federatedId": "",
		"useTeamEmailAutoParkingLimit": true,
		"maxEmailAutoParkingLimit": 0,
		"sipUser": "",
		"systemUser": "",
		"systemDomain": "",
		"crmUserName": "",
		"useAgentTimeZone": true,
		"timeDisplayFormat": "",
		"sendEmailNotifications": true,
		"apiKey": "",
		"telephone1": "",
		"telephone2": "",
		"userType": "",
		"isWhatIfAgent": true,
		"timeZoneOffset": "",
		"requestContact": true,
		"chatThreshold": 0,
		"useTeamChatThreshold": true,
		"emailThreshold": 0,
		"useTeamEmailThreshold": true,
		"workItemThreshold": 0,
		"useTeamWorkItemThreshold": true,
		"contactAutoFocus": true,
		"useTeamContactAutoFocus": true,
		"useTeamRequestContact": true,
		"subject": "",
		"issuer": "",
		"recordingNumbers": [
			{
				"number": ""
			}
		],
		"isOpenIdProfileComplete": true,
		"teamUuId": "",
		"maxPreview": true,
		"deliveryMode": "",
		"totalContactCount": 0,
		"useTeamDeliveryModeSettings": true,
		"emailRefusalTimeout": 0,
		"voicemailRefusalTimeout": 0,
		"smsRefusalTimeout": 0
	}
  ]
};
export var GetAgentsContactsBySkillRequest_Agents = {
	"startDate": "",
	"endDate": ""
};
export var GetAgentsContactsBySkillResponse_Agents = {
	"agentSkillData": {
		"agents": [
			{
				"agent": 0,
				"skills": [
					{
						"SkillNo": 0,
						"OfferedContacts": 0,
						"AnsweredContacts": 0,
						"HoldCalls": 0,
						"TalkTime": 0,
						"HeldTime": 0,
						"ACWTime": 0
					}
				]
			}
		]
	}
};
export var GetAgentsRequest_Agents = {
	"updatedSince": "",
	"isActive": "",
	"searchString": "",
	"fields": "",
	"skip": "",
	"top": "",
	"orderBy": ""
};
export var GetAgentsResponse_Agents = {
	"businessUnitId": 0,
	"lastPollTime": "2020-07-26T23:59:59.678Z",
	"totalRecords": 0,
	"agents": [
		{
			"agentId": 0,
			"userName": "",
			"firstName": "",
			"middleName": "",
			"lastName": "",
			"userID": "",
			"emailAddress": "",
			"isActive": true,
			"teamId": 0,
			"teamName": "",
			"reportToId": 0,
			"reportToName": "",
			"isSupervisor": true,
			"lastLogin": "2020-07-26T23:59:59.678Z",
			"lastUpdated": "2020-07-26T23:59:59.678Z",
			"location": "",
			"custom1": "",
			"custom2": "",
			"custom3": "",
			"custom4": "",
			"custom5": "",
			"internalId": "",
			"profileId": 0,
			"profileName": "",
			"timeZone": "",
			"country": "",
			"countryName": "",
			"state": "",
			"city": "",
			"chatRefusalTimeout": 0,
			"phoneRefusalTimeout": 0,
			"workItemRefusalTimeout": 0,
			"defaultDialingPattern": 0,
			"defaultDialingPatternName": "",
			"useTeamMaxConcurrentChats": true,
			"maxConcurrentChats": 0,
			"notes": "",
			"createDate": "2020-07-26T23:59:59.678Z",
			"inactiveDate": "2020-07-26T23:59:59.678Z",
			"hireDate": "2020-07-26T23:59:59.678Z",
			"terminationDate": "2020-07-26T23:59:59.678Z",
			"hourlyCost": 0,
			"rehireStatus": true,
			"employmentType": 0,
			"employmentTypeName": "",
			"referral": "",
			"atHome": true,
			"hiringSource": "",
			"ntLoginName": "",
			"scheduleNotification": 0,
			"federatedId": "",
			"useTeamEmailAutoParkingLimit": true,
			"maxEmailAutoParkingLimit": 0,
			"sipUser": "",
			"systemUser": "",
			"systemDomain": "",
			"crmUserName": "",
			"useAgentTimeZone": true,
			"timeDisplayFormat": "",
			"sendEmailNotifications": true,
			"apiKey": "",
			"telephone1": "",
			"telephone2": "",
			"userType": "",
			"isWhatIfAgent": true,
			"timeZoneOffset": "",
			"requestContact": true,
			"chatThreshold": 0,
			"useTeamChatThreshold": true,
			"emailThreshold": 0,
			"useTeamEmailThreshold": true,
			"workItemThreshold": 0,
			"useTeamWorkItemThreshold": true,
			"contactAutoFocus": true,
			"useTeamContactAutoFocus": true,
			"useTeamRequestContact": true,
			"subject": "",
			"issuer": "",
			"recordingNumbers": [
				{
					"number": ""
				}
			],
			"isOpenIdProfileComplete": true,
			"teamUuId": "",
			"maxPreview": true,
			"deliveryMode": "",
			"totalContactCount": 0,
			"useTeamDeliveryModeSettings": true,
			"emailRefusalTimeout": 0,
			"voicemailRefusalTimeout": 0,
			"smsRefusalTimeout": 0
		}
	]
};
export var GetAgentStatesRequest_Agents = {
};
export var GetAgentStatesResponse_Agents = {
	"agentStates": [
		{
			"agentStateId": 0,
			"agentStateName": ""
		}
	]
};
export var GetGroupsAgentAssignedRequest_Agents = {
	"fields": ""
};
export var GetGroupsAgentAssignedResponse_Agents = {
	"agentGroups": [
		{
			"groupId": 0,
			"groupName": "",
			"isActive": true,
			"notes": "",
			"lastUpdated": "2020-07-26T23:59:59.678Z"
		}
	]
};
export var GetOutstatesValidForTeamRequest_Agents = {
	"activeOnly": ""
};
export var GetOutstatesValidForTeamResponse_Agents = {
	"resultSet": {
		"teamId": 0,
		"teamName": "",
		"teamUuid": "",
		"unavailableCodes": [
			{
				"outStateId": 0,
				"outStateName": "",
				"isActive": true,
				"isAcw": true,
				"agentTimeoutMins": 0
			}
		]
	}
};
export var GetQuickRepliesRequest_Agents = {
};
export var GetQuickRepliesResponse_Agents = {
	"quickReplies": [
		{
			"quickReplyId": 0,
			"title": "",
			"keyWords": "",
			"content": "",
			"skills": [
				{
					"skillId": 0,
					"skillName": ""
				}
			]
		}
	]
};
export var GetSkillsAssignedToAgentRequest_Agents = {
	"fields": "",
	"updatedSince": "",
	"searchString": "",
	"mediaTypeId": "",
	"outboundStrategy": "",
	"isSkillActive": "",
	"skip": "",
	"top": "",
	"orderBy": ""
};
export var GetSkillsAssignedToAgentResponse_Agents = {
	"_links": {
		"self": "",
		"next": "",
		"previous": ""
	},
	"lastPollTime": "2020-07-26T23:59:59.678Z",
	"businessUnitId": 0,
	"totalRecords": 0,
	"agentSkillAssignments": [
		{
			"agentId": 0,
			"firstName": "",
			"middleName": "",
			"lastName": "",
			"agentProficencyValue": 0,
			"agentProficencyName": "",
			"campaignId": 0,
			"campaignName": "",
			"emailFromAddress": "",
			"internalId": "",
			"isActive": true,
			"isSkillActive": true,
			"isDialer": true,
			"isNaturalCalling": true,
			"isNaturalCallingRunning": true,
			"isOutbound": true,
			"lastUpdateTime": "2020-07-26T23:59:59.678Z",
			"mediaTypeId": 0,
			"mediaTypeName": "",
			"notes": "",
			"outboundStrategy": "",
			"priorityBlending": true,
			"requireDisposition": true,
			"scriptDisposition": true,
			"skillId": 0,
			"skillName": "",
			"teamId": 0,
			"teamName": "",
			"useACW": true,
			"useDisposition": true,
			"useSecondaryDispositions": true,
			"screenPopTriggerEvent": ""
		}
	]
};
export var GetSkillsAssignedToAgentsRequest_Agents = {
	"fields": "",
	"updatedSince": "",
	"searchString": "",
	"mediaTypeId": "",
	"outboundStrategy": "",
	"isSkillActive": "",
	"skip": "",
	"top": "",
	"orderBy": ""
};
export var GetSkillsAssignedToAgentsResponse_Agents = {
	"resultSet": {
		"_links": {
			"self": "",
			"next": "",
			"previous": ""
		},
		"lastPollTime": "2020-07-26T23:59:59.678Z",
		"businessUnitId": 0,
		"totalRecords": 0,
		"agentSkillAssignments": [
			{
				"isActive": true,
				"agentProficencyValue": 0,
				"agentProficencyName": "",
				"internalId": "",
				"agentId": 0,
				"teamId": 0,
				"agentName": "",
				"campaignId": 0,
				"emailFromAddress": "",
				"isSkillActive": true,
				"isDialer": true,
				"isNaturalCalling": true,
				"isOutbound": true,
				"lastUpdateTime": "2020-07-26T23:59:59.678Z",
				"mediaType": 0,
				"notes": "",
				"requireDisposition": true,
				"scriptDisposition": true,
				"skillId": 0,
				"skillName": "",
				"useACW": true,
				"useDisposition": true,
				"useSecondaryDispositions": true,
				"outboundStrategy": "",
				"campaignName": "",
				"priorityBlending": true,
				"isNaturalCallingRunning": true,
				"mediaTypeName": "",
				"screenPopTriggerEvent": "",
				"lastPollTime": "2020-07-26T23:59:59.678Z"
			}
		]
	}
};
export var GetSkillsNotAssignedToAgentRequest_Agents = {
	"fields": "",
	"searchString": "",
	"mediaTypeId": "",
	"outboundStrategy": "",
	"isSkillActive": "",
	"skip": "",
	"top": "",
	"orderBy": ""
};
export var GetSkillsNotAssignedToAgentResponse_Agents = {
	"resultSet": {
		"_links": {
			"self": "",
			"next": "",
			"previous": ""
		},
		"businessUnitId": 0,
		"totalRecords": 0,
		"skills": [
			{
				"skillId": 0,
				"skillName": "",
				"isSkillActive": true,
				"mediaTypeId": 0,
				"mediaTypeName": "",
				"campaignId": 0,
				"campaignName": ""
			}
		]
	}
};
export var GetTeamAgentsRequest_Agents = {
	"fields": "",
	"searchString": "",
	"skip": "",
	"top": "",
	"orderBy": "",
	"updatedSince": ""
};
export var GetTeamAgentsResponse_Agents = {
	"teamId": 0,
	"teamName": "",
	"isActive": true,
	"description": "",
	"notes": "",
	"lastUpdateTime": "2020-07-26T23:59:59.678Z",
	"inViewEnabled": true,
	"wfoEnabled": true,
	"wfm2Enabled": true,
	"qm2Enabled": true,
	"maxConcurrentChats": 0,
	"agentCount": 0,
	"maxEmailAutoParkingLimit": 0,
	"inViewGamificationEnabled": true,
	"inViewChatEnabled": true,
	"inViewLMSEnabled": true,
	"analyticsEnabled": true,
	"requestContact": true,
	"contactAutoFocus": true,
	"chatThreshold": 0,
	"emailThreshold": 0,
	"workItemThreshold": 0,
	"voiceThreshold": 0,
	"socialThreshold": 0,
	"agents": [
		{
			"agentId": 0,
			"userName": "",
			"firstName": "",
			"middleName": "",
			"lastName": "",
			"userID": "",
			"emailAddress": "",
			"isActive": true,
			"teamId": 0,
			"teamName": "",
			"reportToId": 0,
			"reportToName": "",
			"isSupervisor": true,
			"lastLogin": "2020-07-26T23:59:59.678Z",
			"lastUpdated": "2020-07-26T23:59:59.678Z",
			"location": "",
			"custom1": "",
			"custom2": "",
			"custom3": "",
			"custom4": "",
			"custom5": "",
			"internalId": "",
			"profileId": 0,
			"profileName": "",
			"timeZone": "",
			"country": "",
			"countryName": "",
			"state": "",
			"city": "",
			"chatRefusalTimeout": 0,
			"phoneRefusalTimeout": 0,
			"workItemRefusalTimeout": 0,
			"defaultDialingPattern": 0,
			"defaultDialingPatternName": "",
			"useTeamMaxConcurrentChats": true,
			"maxConcurrentChats": 0,
			"notes": "",
			"createDate": "2020-07-26T23:59:59.678Z",
			"inactiveDate": "2020-07-26T23:59:59.678Z",
			"hireDate": "2020-07-26T23:59:59.678Z",
			"terminationDate": "2020-07-26T23:59:59.678Z",
			"hourlyCost": 0,
			"rehireStatus": true,
			"employmentType": 0,
			"employmentTypeName": "",
			"referral": "",
			"atHome": true,
			"hiringSource": 0,
			"ntLoginName": "",
			"scheduleNotification": 0,
			"federatedId": "",
			"useTeamEmailAutoParkingLimit": true,
			"maxEmailAutoParkingLimit": 0,
			"sipUser": "",
			"systemUser": "",
			"systemDomain": "",
			"crmUserName": "",
			"useAgentTimeZone": true,
			"timeDisplayFormat": "",
			"sendEmailNotifications": true,
			"apiKey": "",
			"telephone1": "",
			"telephone2": "",
			"userType": "",
			"isWhatIfAgent": true,
			"timeZoneOffset": "",
			"requestContact": true,
			"chatThreshold": 0,
			"useTeamChatThreshold": true,
			"emailThreshold": 0,
			"useTeamEmailThreshold": true,
			"workItemThreshold": 0,
			"useTeamWorkItemThreshold": true,
			"contactAutoFocus": true,
			"useTeamContactAutoFocus": true,
			"useTeamRequestContact": true,
			"subject": "",
			"issuer": "",
			"recordingNumbers": [
				{
					"number": ""
				}
			],
			"isOpenIdProfileComplete": true,
			"teamUuId": "",
			"maxPreview": true,
			"deliveryMode": "",
			"totalContactCount": 0,
			"useTeamDeliveryModeSettings": true,
			"emailRefusalTimeout": 0,
			"voicemailRefusalTimeout": 0,
			"smsRefusalTimeout": 0
		}
	]
};
export var GetTeamRequest_Agents = {
	"fields": ""
};
export var GetTeamResponse_Agents = {
	"businessUnitId": 0,
	"lastPollTime": "2020-07-26T23:59:59.678Z",
	"teams": [
		{
			"teamId": 0,
			"teamName": "",
			"isActive": true,
			"description": "",
			"notes": "",
			"lastUpdateTime": "2020-07-26T23:59:59.678Z",
			"inViewEnabled": true,
			"wfoEnabled": true,
			"wfm2Enabled": true,
			"qm2Enabled": true,
			"maxConcurrentChats": 0,
			"agentCount": 0,
			"maxEmailAutoParkingLimit": 0,
			"inViewGamificationEnabled": true,
			"inViewChatEnabled": true,
			"inViewLMSEnabled": true,
			"analyticsEnabled": true,
			"requestContact": true,
			"contactAutoFocus": true,
			"chatThreshold": 0,
			"emailThreshold": 0,
			"workItemThreshold": 0,
			"voiceThreshold": 0,
			"evolveTeamId": "",
			"teamLeadUuid": "",
			"deliveryMode": "",
			"totalContactCount": 0,
			"niceAudioRecordingEnabled": true,
			"niceDesktopAnalyticsEnabled": true,
			"niceQmEnabled": true,
			"niceScreenRecordingEnabled": true,
			"niceSpeechAnalyticsEnabled": true,
			"niceWfmEnabled": true,
			"niceQualityOptimizationEnabled": true,
			"niceSurvey_CustomerEnabled": true,
			"nicePerformanceManagementEnabled": true,
			"niceAnalyticsEnabled": true,
			"niceLessonManagementEnabled": true,
			"niceCoachingEnabled": true,
			"niceStrategicPlannerEnabled": true,
			"niceShiftBiddingEnabled": true,
			"niceWfoAdvancedEnabled": true,
			"niceWfoEssentialsEnabled": true,
			"agents": [
				{
					"agentId": 0,
					"firstName": "",
					"lastName": ""
				}
			]
		}
	]
};
export var GetTeamsAgentsRequest_Agents = {
	"fields": "",
	"updatedSince": ""
};
export var GetTeamsAgentsResponse_Agents = {
	"lastPollTime": "",
	"teams": [
		{
			"teamId": 0,
			"teamName": "",
			"isActive": true,
			"description": "",
			"notes": "",
			"lastUpdateTime": "",
			"inViewEnabled": true,
			"wfoEnabled": true,
			"wfm2Enabled": true,
			"qm2Enabled": true,
			"maxConcurrentChats": 0,
			"agentCount": 0,
			"maxEmailAutoParkingLimit": 0,
			"inViewGamificationEnabled": true,
			"inViewChatEnabled": true,
			"inViewLMSEnabled": true,
			"analyticsEnabled": true,
			"agents": [
				{
					"agentId": 0,
					"userName": "",
					"firstName": "",
					"middleName": "",
					"lastName": "",
					"emailAddress": "",
					"isActive": true,
					"teamId": 0,
					"teamName": "",
					"reportToId": 0,
					"reportToName": "",
					"isSupervisor": true,
					"lastLogin": "2020-07-26T23:59:59.678Z",
					"lastUpdated": "2020-07-26T23:59:59.678Z",
					"location": "",
					"custom1": "",
					"custom2": "",
					"custom3": "",
					"custom4": "",
					"custom5": "",
					"internalId": "",
					"profileId": 0,
					"profileName": "",
					"timeZone": "",
					"country": "",
					"countryName": "",
					"state": "",
					"city": "",
					"chatRefusalTimeout": 0,
					"phoneRefusalTimeout": 0,
					"workItemRefusalTimeout": 0,
					"defaultDialingPattern": 0,
					"defaultDialingPatternName": "",
					"useTeamMaxConcurrentChats": true,
					"maxConcurrentChats": 0,
					"notes": "",
					"createDate": "",
					"inactiveDate": "",
					"hireDate": "2020-07-26T23:59:59.678Z",
					"terminationDate": "2020-07-26T23:59:59.678Z",
					"hourlyCost": 0,
					"rehireStatus": true,
					"employmentType": 0,
					"employmentTypeName": "",
					"referral": "",
					"atHome": true,
					"hiringSource": 0,
					"ntLoginName": "",
					"scheduleNotification": 0,
					"federatedId": "",
					"useTeamEmailAutoParkingLimit": true,
					"maxEmailAutoParkingLimit": 0,
					"sipUser": "",
					"systemUser": "",
					"systemDomain": "",
					"crmUserName": "",
					"useAgentTimeZone": true,
					"timeDisplayFormat": "",
					"sendEmailNotifications": true,
					"apiKey": "",
					"telephone1": "",
					"telephone2": "",
					"userType": "",
					"isWhatIfAgent": true,
					"timeZoneOffset": "",
					"requestContact": true,
					"chatThreshold": 0,
					"useTeamChatThreshold": true,
					"emailThreshold": 0,
					"useTeamEmailThreshold": true,
					"workItemThreshold": 0,
					"useTeamWorkItemThreshold": true,
					"contactAutoFocus": true,
					"useTeamContactAutoFocus": true,
					"useTeamRequestContact": true,
					"subject": "",
					"issuer": "",
					"recordingNumbers": [
						{
							"number": ""
						}
					],
					"isOpenIdProfileComplete": true
				}
			]
		}
	]
};
export var GetTeamsRequest_Agents = {
	"fields": "",
	"updatedSince": "",
	"isActive": "",
	"searchString": "",
	"skip": "",
	"top": "",
	"orderBy": ""
};
export var GetTeamsResponse_Agents = {
	"_links": {
		"self": "",
		"next": "",
		"previous": ""
	},
	"businessUnitId": 0,
	"lastPollTime": "2020-07-26T23:59:59.678Z",
	"totalRecords": 0,
	"teams": [
		{
			"teamId": 0,
			"teamName": "",
			"isActive": true,
			"description": "",
			"notes": "",
			"lastUpdateTime": "2020-07-26T23:59:59.678Z",
			"inViewEnabled": true,
			"wfoEnabled": true,
			"wfm2Enabled": true,
			"qm2Enabled": true,
			"maxConcurrentChats": 0,
			"agentCount": 0,
			"maxEmailAutoParkingLimit": 0,
			"inViewGamificationEnabled": true,
			"inViewChatEnabled": true,
			"inViewLMSEnabled": true,
			"analyticsEnabled": true,
			"requestContact": true,
			"contactAutoFocus": true,
			"chatThreshold": 0,
			"emailThreshold": 0,
			"workItemThreshold": 0,
			"voiceThreshold": 0,
			"evolveTeamId": "",
			"teamLeadUuid": "",
			"niceAudioRecordingEnabled": true,
			"niceDesktopAnalyticsEnabled": true,
			"niceQmEnabled": true,
			"niceScreenRecordingEnabled": true,
			"niceSpeechAnalyticsEnabled": true,
			"niceWfmEnabled": true,
			"niceQualityOptimizationEnabled": true,
			"niceSurvey_CustomerEnabled": true,
			"nicePerformanceManagementEnabled": true,
			"niceAnalyticsEnabled": true,
			"niceLessonManagementEnabled": true,
			"niceCoachingEnabled": true,
			"niceStrategicPlannerEnabled": true,
			"niceShiftBiddingEnabled": true,
			"niceWfoAdvancedEnabled": true,
			"niceWfoEssentialsEnabled": true
		}
	]
};
export var RemoveAgentsFromTeamRequest_Agents = {
	"transferTeamId": 0,
	"agents": [
		{
			"agentId": 0
		}
	]
};
export var RemoveAgentsFromTeamResponse_Agents = {
	"resultSet": {
		"errorCount": 0,
		"agentResults": [
			{
				"success": true,
				"agentId": 0,
				"error": true
			}
		]
	}
};
export var RemoveSkillAssignedToAgentRequest_Agents = {
	"skills": [
		{
			"skillId": 0
		}
	]
};
export var RemoveSkillAssignedToAgentResponse_Agents = {
	"resultSet": {
		"errorCount": 0,
		"skillResults": [
			{
				"success": true,
				"skillId": 0,
				"error": ""
			}
		]
	}
};
export var RemoveUnavailableCodesFromTeamRequest_Agents = {
	"codes": [
		{
			"outstateId": 0
		}
	]
};
export var RemoveUnavailableCodesFromTeamResponse_Agents = {
	"resultSet": {
		"errorCount": 0,
		"codeResults": [
			{
				"success": true,
				"outstateId": 0,
				"error": true
			}
		]
	}
};
export var SetAgentStateRequest_Agents = {
	"state": "",
	"outStateId": 0
};
export var SetAgentStateResponse_Agents = {
};
export var SetSkillsToAgentRequest_Agents = {
	"skills": [
		{
			"skillId": 0,
			"proficiency": 0,
			"isActive": true
		}
	]
};
export var SetSkillsToAgentResponse_Agents = {
	"resultSet": {
		"errorCount": 0,
		"skillResults": [
			{
				"success": true,
				"skillId": 0,
				"error": ""
			}
		]
	}
};
export var SetTeamAgentsRequest_Agents = {
	"agents": [
		{
			"agentId": 0
		}
	]
};
export var SetTeamAgentsResponse_Agents = {
	"resultSet": {
		"errorCount": 0,
		"agentResults": [
			{
				"success": true,
				"agentId": 0,
				"error": true
			}
		]
	}
}

;
export var SetUnavailableCodesToTeamRequest_Agents = {
	"codes": [
		{
			"outstateId": 0
		}
	]
};
export var SetUnavailableCodesToTeamResponse_Agents = {
	"resultSet": {
		"errorCount": 0,
		"codeResults": [
			{
				"success": true,
				"outstateId": 0,
				"error": true
			}
		]
	}
};
export var SetUnavailableCodeToTeamsRequest_Agents = {
	"SecurityUser": "",
	"teams": [
		{
			"teamId": 0
		}
	]
};
export var SetUnavailableCodeToTeamsResponse_Agents = {
	"error": "",
	"error_Description": ""
};
export var UpdateAccessKeyRequest_Agents = {
	"isActive":  false
};
export var UpdateAccessKeyResponse_Agents = {
};
export var UpdateAgentRequest_Agents = {
	"agent": {
		"firstName": "",
		"middleName": "",
		"lastName": "",
		"teamId": "",
		"teamUuid": "",
		"reportToId": 0,
		"internalId": "",
		"profileId": 0,
		"roleId": "",
		"emailAddress": "",
		"userName": "",
		"userId": "",
		"timeZone": "",
		"country": "",
		"state": "",
		"city": "",
		"chatRefusalTimeout": 0,
		"phoneRefusalTimeout": 0,
		"workItemRefusalTimeout": 0,
		"defaultDialingPattern": 0,
		"useTeamMaxConcurrentChats": true,
		"maxConcurrentChats": 0,
		"isActive": true,
		"locationId": 0,
		"notes": "",
		"hireDate": "",
		"terminationDate": "",
		"hourlyCost": 0,
		"rehireStatus": true,
		"employmentType": "",
		"referral": "",
		"atHome": true,
		"hiringSource": 0,
		"ntLoginName": "",
		"custom1": "",
		"custom2": "",
		"custom3": "",
		"custom4": "",
		"custom5": "",
		"scheduleNotification": "",
		"federatedId": "",
		"useTeamEmailAutoParkingLimit": true,
		"maxEmailAutoParkingLimit": 0,
		"sipUser": "",
		"systemUser": "",
		"systemDomain": "",
		"crmUserName": "",
		"useAgentTimeZone": true,
		"timeDisplayFormat": 0,
		"sendEmailNotifications": true,
		"apiKey": "",
		"telephone1": "",
		"telephone2": "",
		"userType": "",
		"isWhatIfAgent": true,
		"requestContact": true,
		"chatThreshold": 0,
		"useTeamChatThreshold": true,
		"emailThreshold": 0,
		"useTeamEmailThreshold": true,
		"workItemThreshold": 0,
		"useTeamWorkItemThreshold": true,
		"contactAutoFocus": true,
		"useTeamContactAutoFocus": true,
		"useTeamRequestContact": true,
		"recordingNumbers": [
			{
				"number": ""
			}
		],
		"subject": "",
		"issuer": "",
		"isOpenIdProfileComplete": true
	}
};
export var UpdateAgentResponse_Agents = {
};
export var UpdateTeamRequest_Agents = {
	"forceInactive": true,
	"team": {
		"isActive": true,
		"maxConcurrentChats": 0,
		"wfoEnabled": true,
		"wfm2Enabled": true,
		"qm2Enabled": true,
		"inViewEnabled": true,
		"inViewGamificationEnabled": true,
		"inViewChatEnabled": true,
		"inViewLMSEnabled": true,
		"maxEmailAutoParkingLimit": 0,
		"analyticsEnabled": true,
		"requestContact": true,
		"contactAutoFocus": true,
		"chatThreshold": 0,
		"emailThreshold": 0,
		"workItemThreshold": 0,
		"voiceThreshold": 0,
		"teamLeadId": "",
		"niceAudioRecordingEnabled": true,
		"niceDesktopAnalyticsEnabled": true,
		"niceQmEnabled": true,
		"niceScreenRecordingEnabled": true,
		"niceSpeechAnalyticsEnabled": true,
		"niceWfmEnabled": true,
		"niceQualityOptimizationEnabled": true,
		"niceSurvey_CustomerEnabled": true,
		"nicePerformanceManagementEnabled": true,
		"niceAnalyticsEnabled": true,
		"niceLessonManagementEnabled": true,
		"niceCoachingEnabled": true,
		"niceStrategicPlannerEnabled": true,
		"niceShiftBiddingEnabled": true,
		"niceWfoAdvancedEnabled": true,
		"niceWfoEssentialsEnabled": true
	}
};
export var UpdateTeamResponse_Agents = {
};
export var UpdateUnavailableCodeRequest_Agents = {
	"unavailableCodeName": "",
	"postContact": true,
	"agentTimeout": 0,
	"isActive": true
};
export var UpdateUnavailableCodeResponse_Agents = {
};
export var UpdateUnavailableCodesForTeamRequest_Agents = {
	"unavailableCodes": [
		{
			"outStateId": 0
		}
	]
};
export var UpdateUnavailableCodesForTeamResponse_Agents = {
};
export var RefreshTokenRequest_Auth = {
  "grant_type": "",
  "refresh_token": "",
  "refresh_token_server_uri": ""
};
export var RefreshTokenResponse_Auth = {
  "access_token": "",
  "token_type": "",
  "expires_in": 3600,
  "refresh_token": "",
  "refresh_token_server_uri": "",
  "resource_server_base_uri": "",
  "scope": "",
  "agent_id": 645328,
  "team_id": 103748
};
export var TokenClientRequest_Auth = {
  "grant_type": "",
  "scope": ""
};
export var TokenClientResponse_Auth = {
  "access_token": "",
  "token_type": "",
  "expires_in": 3600,
  "resource_server_base_uri": "",
  "scope": "",
  "agent_id": 645328,
  "team_id": 103748
};
export var TokenImplicitRequest_Auth = {
  "state": "",
  "response_type": "",
  "client_id": "",
  "redirect_uri": "",
  "scope": ""
};
export var TokenImplicitResponse_Auth = {
  "state": "",
  "scope": "",
  "access_token": "",
  "token_type": "",
  "expires_in": 5184000,
  "resource_server_base_uri": ""
};
export var TokenPasswordRequest_Auth = {
  "grant_type": "",
  "username": "",
  "password": "",
  "scope": ""
};
export var TokenPasswordResponse_Auth = {
  "access_token": "",
  "token_type": "",
  "expires_in": 3600,
  "refresh_token": "",
  "refresh_token_server_uri": "",
  "resource_server_base_uri": "",
  "scope": "",
  "agent_id": 645328,
  "team_id": 103748
};
export var UserCreateAccessKeyRequest_Auth = {
	"userId": "",
	"tenantId": ""
};
export var UserCreateAccessKeyResponse_Auth = {
	"accessKey": {
		"accessKeyId": "",
		"accessKeySecret": "",
		"userId": "",
		"tenantId": "",
		"isActive": true
	}
} ;
export var UserGenerateTokenRequest_Auth = {
	"accessKeyId": "",
	"accessKeySecret": ""
};
export var UserGenerateTokenResponse_Auth = {
	"access_token": "",
	"token_type": "",
	"expires_in": 3600,
	"refresh_token": "",
	"refresh_token_expires_in": 3600,
	"id_token": ""
};
export var UserRefreshTokenRequest_Auth = {
	"token": ""
};
export var UserRefreshTokenResponse_Auth = {
	"token": "",
	"tokenExpirationTimeSec": 3600,
	"refreshToken": "",
	"refreshTokenExpirationTimeSec": 0,
	"sessionId": ""
} ;
export var ChangeAgentPasswordRequest_Authenticate = {
  "currentPassword": "",
  "newPassword": ""
};
export var ChangeAgentPasswordResponse_Authenticate = {
  "noResponse": ""
};
export var ResetAgentPasswordRequest_Authenticate = {
  "requestedPassword": "",
  "forceChangeOnLogon": false
};
export var ResetAgentPasswordResponse_Authenticate = {
  "noResponse": ""
};
export var RequestImmediateCallbackRequest_Callback = {
  "phoneNumber": "",
  "callerID": "",
  "callDelaySec": 0,
  "skill": 0,
  "taretAgent": 0,
  "priorityManagement": "",
  "intialPriority": 0,
  "acceleration": 0,
  "maxPriority": 0,
  "sequence": "",
  "zipTone": "",
  "screenPopSrc": "",
  "screenPopUrl": "",
  "timeout": 0
};
export var RequestImmediateCallbackResponse_Callback = {

};
export var ScheduleCallbackRequest_Callback = {
  "firstName": "",
  "lastName": "",
  "phoneNumber": "",
  "skill": 0,
  "taretAgent": 0,
  "promiseDate": "",
  "promiseTime": "",
  "notes": "",
  "timeZone": ""
};
export var ScheduleCallbackResponse_Callback = {

};
export var ChatProfileConfigRequest_ChatRequests = {

};
export var ChatProfileConfigResponse_ChatRequests = {
  "chatProfile": {
    "chatProfileId": 0,
    "chatProfileName": "",
    "chatInterfaceTypeId": 0,
    "chatAppearance": {
      "primaryColor": "",
      "primaryTextColor": "",
      "agentColor": "",
      "agentInitialColor": "",
      "font": "",
      "chatButtonPosition": ""
    },
    "preChatFormEnabled": true,
    "preChatWelcomeMessage": "",
    "preChatFields": [
      {
        "fieldType": "",
        "fieldLabel": "",
        "fieldIsRequired": true,
        "fieldOptions": [
          {
            "label": ""
          }
        ]
      }
    ],
    "waitingEnabled": true,
    "waitingMessage": "",
    "waitingBackgroundColor": "",
    "waitingTextColor": "",
    "waitingLogo": "",
    "heroImage": ""
  }
};
export var EndsActiveChatSessionRequest_ChatRequests = {

};
export var EndsActiveChatSessionResponse_ChatRequests = {
  "errorDescription": ""
};
export var GetsInboundChatActiveChatSessionRequest_ChatRequests = {
  "timeout": ""
};
export var GetsInboundChatActiveChatSessionResponse_ChatRequests = {
  "chatSession": "",
  "messages": [
	{
		"Label": "",
		"PartyTypeId": 0,
		"PartyTypeValue": "",
		"Text": "",
		"Timestamp": "2020-07-26T23:59:59.678Z"
	}
  ]
};
export var NotifyAgentPatronTypingRequest_ChatRequests = {
  "isTyping": false,
  "isTextEntered": false,
  "label": ""
};
export var NotifyAgentPatronTypingResponse_ChatRequests = {

};
export var SendsAgentChatPreviewRequest_ChatRequests = {
  "previewText": "",
  "label": ""
};
export var SendsAgentChatPreviewResponse_ChatRequests = {

};
export var SendsChatTranscriptEmailRequest_ChatRequests = {
  "fromAddress": "",
  "toAddress": "",
  "emailBody": ""
};
export var SendsChatTranscriptEmailResponse_ChatRequests = {

};
export var SendsTextMembersChatSessionRequest_ChatRequests = {
	"label": "",
	"message": "",
	"chatTarget": ""
};
export var SendsTextMembersChatSessionResponse_ChatRequests = {

};
export var StartsChatSessionRequest_ChatRequests = {
	"pointOfContact": "",
	"fromAddress": "",
	"chatRoomID": 0,
	"parameters": [
		{
			"parameter": ""
		}
	],
	"mediaType": 0
};
export var StartsChatSessionResponse_ChatRequests = {
  "chatSessionId": "",
  "contactId": 0
};
export var AcceptChatContactRequest_ChatRequests1 = {

};
export var AcceptChatContactResponse_ChatRequests1 = {

};
export var AddChatContactRequest_ChatRequests1 = {

};
export var AddChatContactResponse_ChatRequests1 = {

};
export var AddSMSChatContactRequest_ChatRequests1 = {
	"mediaType": 0
};
export var AddSMSChatContactResponse_ChatRequests1 = {
};
export var EndChatContactRequest_ChatRequests1 = {
};
export var EndChatContactResponse_ChatRequests1 = {

};
export var NotifyPatronAgentTypingRequest_ChatRequests1 = {
  "isTyping": false,
  "isTextEntered": false
};
export var NotifyPatronAgentTypingResponse_ChatRequests1 = {

};
export var RejectChatContactRequest_ChatRequests1 = {

};
export var RejectChatContactResponse_ChatRequests1 = {

};
export var RestoreChatActiveStateRequest_ChatRequests1 = {

};
export var RestoreChatActiveStateResponse_ChatRequests1 = {

};
export var SendChatTextPatronRequest_ChatRequests1 = {
	"chatText": "",
	"chatTarget": ""
};
export var SendChatTextPatronResponse_ChatRequests1 = {

};
export var TransferToAgentRequest_ChatRequests1 = {
  "targetAgentId": 0
};
export var TransferToAgentResponse_ChatRequests1 = {

};
export var TransferToSkillRequest_ChatRequests1 = {
  "targetSkillId": 0
};
export var TransferToSkillResponse_ChatRequests1 = {

};
export var AssignTagsRequest_Contacts = {
  "tags": [
    {
      "tagId": 0
    }
  ]
};
export var AssignTagsResponse_Contacts = {
  "resultSet": {
    "errorCount": 0,
    "tagResults": [
      {
        "success": true,
        "tagId": 0,
        "error": ""
      }
    ]
  }
};
export var CreateSignalRequest_Contacts = {
  "p1": "",
  "p2": "",
  "p3": "",
  "p4": "",
  "p5": "",
  "p6": "",
  "p7": "",
  "p8": "",
  "p9": ""
};
export var CreateSignalResponse_Contacts = {

};
export var ForceDisconnectRequest_Contacts = {

};
export var ForceDisconnectResponse_Contacts = {

};
export var GetChatTranscriptRequest_Contacts = {

};
export var GetChatTranscriptResponse_Contacts = {
  "messages": {
    "Messages": [
		{
			"Text": "",
			"TimeStamp": "2020-07-26T23:59:59.678Z",
			"PartyType": "",
			"Label": "",
			"RoomId": 0
		}
    ]
  }
};
export var GetEmailTranscriptRequest_Contacts = {
  "includeAttachments": ""
};
export var GetEmailTranscriptResponse_Contacts = {
  "emails": [
	{
		"emailTypeId": 0,
		"sentDate": "2020-07-26T23:59:59.678Z",
		"fromAddress": "",
		"toAddress": "",
		"ccAddress": "",
		"bccAddress": "",
		"subject": "",
		"bodyHtml": "",
		"hasAttachments": true,
		"attachments": [
			{
				"attachmentName": "",
				"attachment": ""
			}
		]
	}
  ]
};
export var GetFilesRequest_Contacts = {
  "fields": ""
};
export var GetFilesResponse_Contacts = {
  "files": [
	{
		"isDeleted": true,
		"businessUnitId": 0,
		"fileName": "",
		"fullFileName": "",
		"weblink": true,
		"contactId": 0,
		"createDate": "2020-07-26T23:59:59.678Z",
		"modifiedDate": "2020-07-26T23:59:59.678Z",
		"accessDate": "2020-07-26T23:59:59.678Z",
		"authorId": 0,
		"modifiedId": 0,
		"size": 0,
		"physicalBytes": 0,
		"deleteDate": "2020-07-26T23:59:59.678Z",
		"purposeId": 0,
		"purposeName": 0,
		"mailStatusId": 0,
		"mailStatusName": ""
	}
  ]
};
export var GetPastSMSContactsRequest_Contacts = {
	"ani": "",
	"skillId": "",
	"businessUnitId": ""
};
export var GetPastSMSContactsResponse_Contacts = {
};
export var GetSMSTranscriptRequest_Contacts = {
	"businessUnitId": ""
};
export var GetSMSTranscriptResponse_Contacts = {
};
export var GetStateRequest_Contacts = {

};
export var GetStateResponse_Contacts = {
  "contactStateDescriptions": [
    {
      "ContactStateCategory": "",
      "ContactStateDescription": "",
      "ContactStateId": 0
    }
  ]
};
export var GetStatesRequest_Contacts = {

};
export var GetStatesResponse_Contacts = {
  "contactStateDescriptions": [
    {
      "ContactStateCategory": "",
      "ContactStateDescription": "",
      "ContactStateId": 0
    }
  ]
};
export var StartMonitoringPhoneCallRequest_Contacts = {
  "phoneNumber": 0
};
export var StartMonitoringPhoneCallResponse_Contacts = {

};
export var StartRecordingPhoneCallRequest_Contacts = {

};
export var StartRecordingPhoneCallResponse_Contacts = {

};
export var AddEmailContactRequest_Emails = {

};
export var AddEmailContactResponse_Emails = {

};
export var CreatesOutboundEmailContactRequest_Emails = {
  "skillId": 0,
  "toAddress": "",
  "parentContactId": 0
};
export var CreatesOutboundEmailContactResponse_Emails = {

};
export var EndEmailContactRequest_Emails = {
};
export var EndEmailContactResponse_Emails = {
};
export var ForwardsEmailRequest_Emails = {
  "skillId": 0,
  "toAddress": "",
  "fromAddress": "",
  "ccAddress": "",
  "bccAddress": "",
  "subject": "",
  "bodyHtml": "",
  "attachments": "",
  "attachmentNames": "",
  "originalAttachmentNames": ""
};
export var ForwardsEmailResponse_Emails = {

};
export var ParksEmailRequest_Emails = {
  "toAddress": "",
  "fromAddress": "",
  "ccAddress": "",
  "bccAddress": "",
  "subject": "",
  "bodyHtml": "",
  "attachments": "",
  "attachmentNames": "",
  "isDraft": false,
  "primaryDispositionId": "",
  "secondaryDispositionId": "",
  "tags": "",
  "notes": "",
  "originalAttachmentNames": ""
};
export var ParksEmailResponse_Emails = {

};
export var PreviewEmailRequest_Emails = {

};
export var PreviewEmailResponse_Emails = {

};
export var ReplyToEmailRequest_Emails = {
  "skillId": 0,
  "toAddress": "",
  "fromAddress": "",
  "ccAddress": "",
  "bccAddress": "",
  "subject": "",
  "bodyHtml": "",
  "attachments": "",
  "attachmentNames": ""
};
export var ReplyToEmailResponse_Emails = {

};
export var RestoreEmailRequest_Emails = {

};
export var RestoreEmailResponse_Emails = {

};
export var SaveDraftRequest_Emails = {
	"toAddress": "",
	"fromAddress": "",
	"ccAddress": "",
	"bccAddress": "",
	"subject": "",
	"bodyHtml": "",
	"attachments": "",
	"attachmentNames": "",
	"draftEmailGuidStr": "",
	"primaryDispositionId": "",
	"secondaryDispositionId": "",
	"tags": "",
	"notes": "",
	"originalAttachmentNames": ""
};
export var SaveDraftResponse_Emails = {
};
export var SendsEmailRequest_Emails = {
  "skillId": 0,
  "toAddress": "",
  "fromAddress": "",
  "ccAddress": "",
  "bccAddress": "",
  "subject": "",
  "bodyHtml": "",
  "attachments": "",
  "attachmentNames": ""
};
export var SendsEmailResponse_Emails = {

};
export var TransferEmailToAgentRequest_Emails = {
	"targetAgentId": 0,
	"toAddress": "",
	"fromAddress": "",
	"ccAddress": "",
	"bccAddress": "",
	"subject": "",
	"bodyHtml": "",
	"attachments": "",
	"attachmentNames": "",
	"isDraft": false,
	"draftEmailGuidStr": "",
	"primaryDispositionId": "",
	"secondaryDispositionId": "",
	"tags": "",
	"notes": "",
	"originalAttachmentNames": ""
};
export var TransferEmailToAgentResponse_Emails = {

};
export var TransferEmailToSkillRequest_Emails = {
	"targetSkillId": 0,
	"toAddress": "",
	"fromAddress": "",
	"ccAddress": "",
	"bccAddress": "",
	"subject": "",
	"bodyHtml": "",
	"attachments": "",
	"attachmentNames": "",
	"isDraft": false,
	"draftEmailGuidStr": "",
	"primaryDispositionId": "",
	"secondaryDispositionId": "",
	"tags": "",
	"notes": "",
	"originalAttachmentNames": ""
};
export var TransferEmailToSkillResponse_Emails = {

};
export var UnParksEmailRequest_Emails = {
  "isImmediate": false 
};
export var UnParksEmailResponse_Emails = {

};
export var CreateHiringSourceRequest_General = {
	"sourceName": ""
};
export var CreateHiringSourceResponse_General = {
	"sourceId": 0
};
export var CreateHoursOperationProfileRequest_General = {
	"profileName": ""
};
export var CreateHoursOperationProfileResponse_General = {
	"profileId": 0,
	"profileName": ""
};
export var CreateMessageTemplateRequest_General = {
	"templateName": "",
	"templateTypeId": 0,
	"subject": "",
	"body": "",
	"isHTML": false,
	"ccAddress": "",
	"bccAddress": "",
	"replyToAddress": "",
	"fromName": "",
	"fromAddress": "",
	"smsContent": ""
};
export var CreateMessageTemplateResponse_General = {
	"templateId": 0
};
export var CreatePointOfContactRequest_General = {
	"pointOfContact": "",
	"pointOfContactName": "",
	"skillId": 0,
	"isActive": true,
	"mediaTypeId": 0,
	"scriptName": "",
	"ivrReportingEnabled": true
};
export var CreatePointOfContactResponse_General = {
	"error": "",
	"error_Description": ""
};
export var CreateTagRequest_General = {
	"tagName": "",
	"notes": ""
};
export var CreateTagResponse_General = {
	"tagId": 0
};
export var CreateUnavailableCodeRequest_General = {
	"unavailableCodeName": "",
	"postContact": true,
	"isActive": true
};
export var CreateUnavailableCodeResponse_General = {
	"error": "",
	"error_Description": ""
};
export var DeleteFolderRequest_General = {
	"folderName": "" 
};
export var DeleteFolderResponse_General = {
};
export var GetAgentPermissionsRequest_General = {
};
export var GetAgentPermissionsResponse_General = {
	"permissions": [
		{
			"BusinessUnitId": 0,
			"Key": "",
			"Value": ""
		}
	]
};
export var GetBrandingProfileRequest_General = {
	"businessUnitId": "",
	"fields": ""
};
export var GetBrandingProfileResponse_General = {
	"resultSet": {
		"profileId": 0,
		"profileName": "",
		"brandName": "",
		"adminEmail": "",
		"active": true,
		"subdomain": "",
		"stylePackName": "",
		"coBrand": true
	}
};
export var GetBusinessUnitConfigRequest_General = {
	"includeTrustedBusinessUnits": "",
	"fields": ""
};
export var GetBusinessUnitConfigResponse_General = {
	"businessUnits": [
		{
			"businessUnitId": 0,
			"businessUnitName": "",
			"globalCallerId": "",
			"phoneTimeout": 0,
			"userSessionTimeout": 0,
			"startDayOfWeek": 0,
			"defaultTimeZone": "",
			"agentsUseDefaultTimeZone": true,
			"maxScriptHistory": 0,
			"authGUID": "",
			"coBrand": true,
			"coBrandProfileId": 0,
			"coBrandProfileName": "",
			"connectivityType": "",
			"clientConnectorPort": 0,
			"callSuppression": true,
			"priorityBasedBlending": true,
			"enableFiltering": true,
			"allowPredictiveDialing": true,
			"enableTrueBlending": true,
			"enableSkillAbandonRate": true,
			"abandonRateScope": 0,
			"defaultConfirmationDeliveryModeId": 0,
			"defaultConfirmationDeliveryMode": "",
			"defaultComplianceRecordTypeId": 0,
			"defaultComplianceRecordType": "",
			"defaultContactExpirationMinutes": 0,
			"daysUntilListSourceIsFlaggedForDeletion": 0,
			"scriptNamespace": "",
			"apiPublishedLimit": 0,
			"concurrentPortLimit": 0,
			"ivrSurveyCallbackLimit": 0,
			"stationLimit": 0,
			"userLimit": 0,
			"concurrentAgentLimit": 0,
			"outboundPortLimit": 0,
			"agentlessPortLimit": 0,
			"maxConferenceParties": 0,
			"custom1": "",
			"custom2": "",
			"custom3": "",
			"custom4": "",
			"custom5": "",
			"isActive": true,
			"presenceMasterId": 0,
			"tenantId": "",
			"parentTenantId": "",
			"features": [
				{
					"productId": 0,
					"productDescription": "",
					"isEnabled": true
				}
			],
			"fileExtensions": [
				{
					"extension": ""
				}
			],
			"timeZones": [
				{
					"displayName": "",
					"standardName": ""
				}
			],
			"parentBusinessUnitID": 0,
			"isIntegratedTenant": true,
			"niceEngageConfigId": 0,
			"niceWFMConfigID": 0,
			"niceQMTenantID": 0,
			"niceWFMTenantId": 0,
			"ieX_CustomerName": "",
			"isMultiContactHandling": true
		}
	]
};
export var GetConfigurablePhoneNumbersRequest_General = {
	"searchString": "",
	"skip": "",
	"top":  ""
};
export var GetConfigurablePhoneNumbersResponse_General = {
	"_links": {
		"self": "",
		"next": "",
		"previous": ""
	},
	"totalRecords": 0,
	"phoneCollection": [
		{
			"phonenumber": ""
		}
	]
};
export var GetCountriesRequest_General = {

};
export var GetCountriesResponse_General = {
	"countries": [
		{
			"countryId": 0,
			"countryCode": "",
			"countryName": ""
		}
	]
};
export var GetDataTypesRequest_General = {
};
export var GetDataTypesResponse_General = {
	"dataTypes": [
		{
			"dataTypeId": 0,
			"dataTypeName": ""
		}
	]
};
export var GetDirectoriesRequest_General = {
	"folderName": ""
};
export var GetDirectoriesResponse_General = {
};
export var GetDispositionsRequest_General = {
	"fields": "",
	"skip": "",
	"top": "",
	"searchString": "",
	"orderBy": "",
	"isPreviewDispositions": "",
	"updatedSince": ""
};
export var GetDispositionsResponse_General = {
	"businessUnitId": 0,
	"totalRecords": 0,
	"dispositions": [
		{
			"dispositionId": 0,
			"dispositionName": "",
			"notes": "",
			"lastUpdated": "",
			"classificationId": "",
			"systemOutcome": "",
			"isPreviewDisposition": true
		}
	]
};
export var GetFeedbackCategoriesPrioritiesRequest_General = {
};
export var GetFeedbackCategoriesPrioritiesResponse_General = {
	"categoriesAndPriorities": {
		"feedbackCategories": [
			{
				"title": 0,
				"name": ""
			}
		],
		"feedbackPriorities": [
			{
				"name": ""
			}
		]
	}
};
export var GetFileRequest_General = {
	"fileName": ""
};
export var GetFileResponse_General = {
	"files": {
		"file": "",
		"fileName": ""
	}
};
export var GetHiringSourcesRequest_General = {
};
export var GetHiringSourcesResponse_General = {
	"sources": [
		{
			"sourceId": 0,
			"sourceName": ""
		}
	]
};
export var GetHourOperationProfileRequest_General = {
	"fields": ""
};
export var GetHourOperationProfileResponse_General = {
	"resultSet": {
		"hoursOfOperationProfiles": [
			{
				"profileId": 0,
				"profileName": "",
				"description": "",
				"notes": "",
				"overrideBranch": "",
				"overrideExpirationDate": "2020-07-26T23:59:59.678Z",
				"lastUpdateTime": "2020-07-26T23:59:59.678Z",
				"days": [
					{
						"day": "",
						"openTime": "",
						"closeTime": "",
						"hasAdditionalHours": true,
						"additionalOpenTime": "",
						"additionalCloseTime": "",
						"isClosedAllDay": true
					}
				],
				"holidays": [
					{
						"day": "",
						"openTime": "",
						"closeTime": "",
						"hasAdditionalHours": true,
						"additionalOpenTime": "",
						"additionalCloseTime": "",
						"isClosedAllDay": true
					}
				],
				"scripts": [
					{
						"scriptId": 0,
						"scriptName": ""
					}
				]
			}
		]
	}
};
export var GetHoursOperationProfilesRequest_General = {
	"fields": "",
	"updatedSince": "",
	"skip": "",
	"top": "",
	"orderBy": ""
};
export var GetHoursOperationProfilesResponse_General = {
	"resultSet": {
		"_links": {
			"self": "",
			"next": "",
			"previous": ""
		},
		"businessUnitId": 0,
		"totalRecords": 0,
		"lastPollTime": "2020-07-26T23:59:59.678Z",
		"hoursOfOperationProfiles": [
			{
				"profileId": 0,
				"profileName": "",
				"description": "",
				"notes": "",
				"overrideBranch": "",
				"overrideExpirationDate": "2020-07-26T23:59:59.678Z",
				"lastUpdateTime": "2020-07-26T23:59:59.678Z",
				"days": [
					{
						"day": "",
						"openTime": "",
						"closeTime": "",
						"hasAdditionalHours": true,
						"additionalOpenTime": "",
						"additionalCloseTime": "",
						"isClosedAllDay": true
					}
				],
				"holidays": [
					{
						"day": "",
						"openTime": "",
						"closeTime": "",
						"hasAdditionalHours": true,
						"additionalOpenTime": "",
						"additionalCloseTime": "",
						"isClosedAllDay": true
					}
				],
				"scripts": [
					{
						"scriptId": 0,
						"scriptName": ""
					}
				]
			}
		]
	}
};
export var GetLocationsRequest_General = {
	"includeAgents": ""
};
export var GetLocationsResponse_General = {
	"locations": [
		{
			"locationId": 0,
			"locationName": "",
			"agents": [
				{
					"agentId": 0,
					"firstName": "",
					"lastName": ""
				}
			]
		}
	]
};
export var GetMediaTypeRequest_General = {
};
export var GetMediaTypeResponse_General = {
	"mediaTypes": [
		{
			"MediaTypeId": 0,
			"MediaTypeName": ""
		}
	]
};
export var GetMediaTypesRequest_General = {
};
export var GetMediaTypesResponse_General = {
	"mediaTypes": [
		{
			"MediaTypeId": 0,
			"MediaTypeName": ""
		}
	]
};
export var GetMessageTemplateRequest_General = {
};
export var GetMessageTemplateResponse_General = {
	"messageTemplate": {
		"templateId": 0,
		"templateName": "",
		"templateTypeId": 0,
		"templateTypeDesc": "",
		"isActive": true,
		"isHTML": true,
		"ccAddress": "",
		"bccAddress": "",
		"replyToAddress": "",
		"fromName": "",
		"fromAddress": "",
		"body": "",
		"subject": "",
		"smsContent": ""
	}
};
export var GetMessageTemplatesRequest_General = {
};
export var GetMessageTemplatesResponse_General = {
	"messageTemplates": [
		{
			"templateId": 0,
			"templateName": "",
			"templateTypeId": 0,
			"templateTypeDesc": "",
			"isActive": true,
			"isHTML": true,
			"ccAddress": "",
			"bccAddress": "",
			"replyToAddress": "",
			"fromName": "",
			"fromAddress": "",
			"body": "",
			"subject": ""
		}
	]
};
export var GetOutStatesForBusinessUnitRequest_General = {
	"activeOnly": ""
};
export var GetOutStatesForBusinessUnitResponse_General = {
	"teamId": 0,
	"teamName": "",
	"teamUuid": "",
	"unavailableCodes": [
		{
			"OutStateId": 0,
			"OutStateName": "",
			"IsAcw": true,
			"AgentTimeoutMins": "",
			"IsActive": true
		}
	]
};
export var GetPermissionsRequest_General = {
};
export var GetPermissionsResponse_General = {
	"permissions": [
		{
			"BusinessUnitId": 0,
			"Key": "",
			"Value": ""
		}
	]
};
export var GetPointOfContactRequest_General = {
};
export var GetPointOfContactResponse_General = {
	"pointsOfContact": [
		{
			"BusinessUnitId": 0,
			"ContactAddress": "",
			"ContactCode": 0,
			"ContactDescription": "",
			"DefaultSkillId": 0,
			"IsActive": true,
			"MediaTypeId": 0,
			"MediaTypeName": "",
			"Notes": "",
			"OutboundSkill": true,
			"ScriptName": ""
		}
	]
};
export var GetPointsOfContactRequest_General = {
};
export var GetPointsOfContactResponse_General = {
	"pointsOfContact": [
		{
			"BusinessUnitId": 0,
			"ContactAddress": "",
			"ContactCode": 0,
			"ContactDescription": "",
			"DefaultSkillId": 0,
			"IsActive": true,
			"MediaTypeId": 0,
			"MediaTypeName": "",
			"Notes": "",
			"OutboundSkill": true,
			"ScriptName": ""
		}
	]
};
export var GetScriptsRequest_General = {
	"mediaTypeId": "",
	"isActive": "",
	"searchString": "",
	"fields": "",
	"skip": "",
	"top": "",
	"orderBy": ""
};
export var GetScriptsResponse_General = {
	"resultSet": {
		"_links": {
			"self": "",
			"next": "",
			"previous": ""
		},
		"businessUnitId": 0,
		"totalRecords": 0,
		"scripts": [
			{
				"scriptId": 0,
				"scriptName": "",
				"isActive": true,
				"hidden": true,
				"readOnly": true,
				"isLocked": true,
				"lockedBy": 0,
				"mediaTypeId": 0,
				"mediaTypeName": ""
			}
		]
	}
};
export var GetSecurityProfileRequest_General = {
};
export var GetSecurityProfileResponse_General = {
	"profile": {
		"profileId": 0,
		"profileName": "",
		"description": "",
		"isActive": true,
		"isExternal": true,
		"pwUseRandom": true,
		"pwMinLength": 0,
		"pwMinLower": 0,
		"pwMinUpper": 0,
		"pwMinNumeric": 0,
		"pwMinNonAlpha": 0,
		"assignedAgents": [
			{
				"agentId": 0,
				"firstName": "",
				"lastName": ""
			}
		]
	}
};
export var GetSecurityProfilesRequest_General = {
	"isExternal": "",
	"isActive": ""
};
export var GetSecurityProfilesResponse_General = {
	"profiles": [
		{
			"profileId": 0,
			"profileName": "",
			"description": "",
			"isActive": true,
			"isExternal": true,
			"pwUseRandom": true,
			"pwMinLength": 0,
			"pwMinLower": 0,
			"pwMinUpper": 0,
			"pwMinNumeric": 0,
			"pwMinNonAlpha": 0
		}
	]
};
export var GetServerTimeRequest_General = {
};
export var GetServerTimeResponse_General = {
	"ServerTime": "2020-07-26T23:59:59.678Z"
};
export var GetSMSPhoneCodesRequest_General = {
};
export var GetSMSPhoneCodesResponse_General = {
	"phoneCodes": [
		{
			"transportCode": 0,
			"transportTypeId": 0,
			"transportTypeDesc": "",
			"note": ""
		}
	]
}

;
export var GetStatesProvincesRequest_General = {
};
export var GetStatesProvincesResponse_General = {
	"resultSet": {
		"countryId": 0,
		"countryName": "",
		"states": [
			{
				"stateId": 0,
				"stateName": "",
				"stateCode": ""
			}
		]
	}
};
export var GetTagRequest_General = {
};
export var GetTagResponse_General = {
	"tags": [
		{
			"tagId": 0,
			"tagName": "",
			"isActive": true,
			"notes": ""
		}
	]
};
export var GetTagsRequest_General = {
	"searchString": "",
	"isActive": ""
};
export var GetTagsResponse_General = {
	"tags": [
		{
			"tagId": 0,
			"tagName": "",
			"isActive": true,
			"notes": ""
		}
	]
}

;
export var GetTimeZonesRequest_General = {
};
export var GetTimeZonesResponse_General = {
	"timeZones": [
		{
			"displayName": "",
			"standardName": "",
			"offset": ""
		}
	]
};
export var GetUnprocessedFilesRequest_General = {
	"folderPath": ""
};
export var GetUnprocessedFilesResponse_General = {
	"files": [
		{
			"fileName": "",
			"fileNameWithPath": "",
			"needsProcessing": true
		}
	]
};
export var MarkFileAsProcessedRequest_General = {
	"fileName": "",
	"needsProcessing": false
};
export var MarkFileAsProcessedResponse_General = {
};
export var MarkFileForProcessingRequest_General = {
	"fileName": "",
	"file": "",
	"overwrite": false,
	"needsProcessing": false
};
export var MarkFileForProcessingResponse_General = {
};
export var MoveRenameFileRequest_General = {
	"oldPath": "",
	"newPath": "",
	"overwrite": true
};
export var MoveRenameFileResponse_General = {
};
export var RemoveFileRequest_General = {
	"fileName": ""
};
export var RemoveFileResponse_General = {
};
export var StartScriptRequest_General = {
	"skillId": 0,
	"startDate": "",
	"parameters": ""
};
export var StartScriptResponse_General = {
	"contactId": 0
};
export var UpdateHoursOperationProfileRequest_General = {

};
export var UpdateHoursOperationProfileResponse_General = {
};
export var UpdateMessageTemplateRequest_General = {
	"templateName": "",
	"isActive": false,
	"subject": "",
	"body": "",
	"isHTML": false,
	"ccAddress": "",
	"bccAddress": "",
	"replyToAddress": "",
	"fromName": "",
	"fromAddress": "",
	"smsContent": ""
};
export var UpdateMessageTemplateResponse_General = {
};
export var UpdatePointOfContactRequest_General = {
	"pointOfContactName": "",
	"skillId": 0,
	"isActive": true,
	"scriptName": "",
	"ivrReportingEnabled": true
};
export var UpdatePointOfContactResponse_General = {
	"error": "",
	"error_Description": ""
};
export var UpdateTagRequest_General = {
	"tagName": "",
	"notes": "",
	"isActive": false
};
export var UpdateTagResponse_General = {
};
export var UploadFileRequest_General = {
	"fileName": "",
	"file": "",
	"overwrite": false
};
export var UploadFileResponse_General = {
};
export var AssignAgentsRequest_Groups = {
  "agents": [
    {
      "agentId": 0
    }
  ]
};
export var AssignAgentsResponse_Groups = {
  "agents": [
    {
      "agentId": 0
    }
  ]
};
export var CreateRequest_Groups = {
  "groups": [
    {
      "groupName": "",
      "isActive": "",
      "notes": ""
    }
  ]
};
export var CreateResponse_Groups = {
  "errorCount": 0,
  "groupResults": [
    {
      "success": true,
      "groupId": 0,
      "error": ""
    }
  ]
};
export var GetAgentsAssignedRequest_Groups = {
  "assigned": "",
  "top": "",
  "skip": "",
  "orderBy": "",
  "fields": "",
  "searchString": ""
};
export var GetAgentsAssignedResponse_Groups = {
  "_links": {
    "self": "",
    "next": "",
    "previous": ""
  },
  "totalRecords": 0,
  "agents": [
    {
      "agentId": 0,
      "userName": "",
      "firstName": "",
      "middleName": "",
      "lastName": "",
      "emailAddress": "",
      "isActive": true,
      "teamId": 0,
      "teamName": "",
      "reportToId": 0,
      "reportToName": "",
      "isSupervisor": true,
      "lastLogin": "",
      "lastUpdated": "",
      "location": "",
      "custom1": "",
      "custom2": "",
      "custom3": "",
      "custom4": "",
      "custom5": "",
      "internalId": "",
      "profileId": 0,
      "profileName": "",
      "timeZone": "",
      "country": "",
      "countryName": "",
      "state": "",
      "city": "",
      "chatRefusalTimeout": 0,
      "phoneRefusalTimeout": 0,
      "workItemRefusalTimeout": 0,
      "defaultDialingPattern": 0,
      "defaultDialingPatternName": "",
      "useTeamMaxConcurrentChats": true,
      "maxConcurrentChats": 0,
      "notes": "",
      "createDate": "",
      "inactiveDate": "",
      "hireDate": "",
      "terminationDate": "",
      "hourlyCost": 0,
      "rehireStatus": true,
      "employmentType": 0,
      "employmentTypeName": "",
      "referral": "",
      "atHome": true,
      "hiringSource": 0,
      "ntLoginName": "",
      "scheduleNotification": 0,
      "federatedId": "",
      "useTeamEmailAutoParkingLimit": true,
      "maxEmailAutoParkingLimit": 0,
      "sipUser": "",
      "systemUser": "",
      "systemDomain": "",
      "crmUserName": "",
      "useAgentTimeZone": true,
      "timeDisplayFormat": "",
      "sendEmailNotifications": true,
      "apiKey": "",
      "telephone1": "",
      "telephone2": "",
      "userType": "",
      "isWhatIfAgent": true,
      "timeZoneOffset": "",
      "requestContact": true,
      "chatThreshold": 0,
      "useTeamChatThreshold": true,
      "emailThreshold": 0,
      "useTeamEmailThreshold": true,
      "workItemThreshold": 0,
      "useTeamWorkItemThreshold": true,
      "contactAutoFocus": true,
      "useTeamContactAutoFocus": true,
      "useTeamRequestContact": true,
      "subject": "",
      "issuer": "",
      "recordingNumbers": [
        {
          "number": ""
        }
      ],
      "isOpenIdProfileComplete": true
    }
  ]
};
export var GetConfigurationRequest_Groups = {
  "fields": ""
};
export var GetConfigurationResponse_Groups = {
  "totalRecords": 0,
  "groups": [
    {
      "groupId": 0,
      "groupName": "",
      "notes": "",
      "isActive": true,
      "lastUpdated": ""
    }
  ]
}

;
export var GetRequest_Groups = {
  "top": "",
  "skip": "",
  "orderBy": "",
  "searchString": "",
  "isActive": "",
  "fields": ""
};
export var GetResponse_Groups = {
  "_links": {
    "self": "",
    "next": "",
    "previous": ""
  },
  "totalRecords": 0,
  "groups": [
    {
      "groupId": 0,
      "groupName": "",
      "notes": "",
      "isActive": true,
      "lastUpdated": ""
    }
  ]
};
export var ModifyRequest_Groups = {
  "groupName": "",
  "isActive": "",
  "notes": ""
};
export var ModifyResponse_Groups = {

};
export var RemoveAgentsRequest_Groups = {
  "agents": [
    {
      "agentId": 0
    }
  ]
};
export var RemoveAgentsResponse_Groups = {
  "errorCount": 0,
  "agentResults": [
    {
      "agentId": 0,
      "success": true,
      "error": ""
    }
  ]
}

;
export var AddRecordsDoNotCallGroupRequest_Lists = {
  "dncGroupRecords": [
    {
      "phoneNumber": ""
    }
  ]
};
export var AddRecordsDoNotCallGroupResponse_Lists = {
  "resultSet": {
    "errorCount": 0,
    "recordResults": [
      {
        "success": true,
        "formattedPhone": "",
        "error": "",
        "phoneNumber": ""
      }
    ]
  }
};
export var AssignContributingSkillRequest_Lists = {

};
export var AssignContributingSkillResponse_Lists = {

};
export var AssignScrubbedSkillRequest_Lists = {

};
export var AssignScrubbedSkillResponse_Lists = {

};
export var CancelListProcessRequest_Lists = {

};
export var CancelListProcessResponse_Lists = {

};
export var CreateCallingListMappingRequest_Lists = {
  "listName": "",
  "listExpirationDate": "",
  "externalIdColumn": "",
  "scoreColumn": "",
  "customer1Column": "",
  "customer2Column": "",
  "callerIdColumn": "",
  "priorityColumn": "",
  "complianceReqColumn": "",
  "firstNameColumn": "",
  "lastNameColumn": "",
  "addressColumn": "",
  "cityColumn": "",
  "stateColumn": "",
  "zipColumn": "",
  "timeZoneColumn": "",
  "confirmReqColumn": "",
  "overrideFinalizationColumn": "",
  "agentIdColumn": "",
  "callRequestTimeColumn": "",
  "callRequestStaleColumn": "",
  "notesColumn": "",
  "expirationDateColumn": "",
  "destinationMappings": [
    {
      "fieldName": "",
      "fieldValue": ""
    }
  ],
  "customFieldMappings": [
    {
      "fieldName": "",
      "fieldValue": ""
    }
  ]
};
export var CreateCallingListMappingResponse_Lists = {
  "listId": 0
};
export var CreateDoNotCallGroupRequest_Lists = {
  "dncGroupName": "",
  "dncGroupDescription": ""
};
export var CreateDoNotCallGroupResponse_Lists = {
  "dncGroups": [
	{
		"dncGroupId": 0,
		"dncGroupName": "",
		"dncGroupDescription": "",
		"validRecords": 0,
		"isActive": true,
		"isRemoved": true,
		"createDate": "2020-07-26T23:59:59.678Z",
		"lastUpdateTime": "2020-07-26T23:59:59.678Z"
	}
  ]
};
export var DownloadCallingListAttemptsRequest_Lists = {
  "updatedSince": "",
  "finalized": "",
  "fields": "",
  "skip": "",
  "top": "",
  "orderBy": ""
};
export var DownloadCallingListAttemptsResponse_Lists = {
	"resultSet": {
		"_links": {
			"self": "",
			"next": "",
			"previous": ""
		},
		"listName": "",
		"prospectiveContactCount": 0,
		"status": "",
		"totalRecords": 0,
		"validRecords": 0,
		"invalidRecords": 0,
		"finalizedRecords": 0,
		"createDate": "2020-07-26T23:59:59.678Z",
		"uploadDate": "2020-07-26T23:59:59.678Z",
		"updateDate": "2020-07-26T23:59:59.678Z",
		"removeDate": "2020-07-26T23:59:59.678Z",
		"contactAttempts": [
			{
				"contactId": 0,
				"externalId": "",
				"formattedPhone": "",
				"dateOfCall": "2020-07-26T23:59:59.678Z",
				"lastDuration": "2020-07-26T23:59:59.678Z",
				"systemClass": 0,
				"systemClassName": "",
				"agentDisp": 0,
				"agentDispDesc": "",
				"agentId": 0,
				"confirmReq": true,
				"complianceRec": true,
				"deliveryType": "",
				"callNotes": "",
				"commitAmount": "",
				"callbackDate": "2020-07-26T23:59:59.678ZZ",
				"amDefinedExperience": "",
				"amWaveFile": "",
				"callerIdUsed": "",
				"callRequestDate": "2020-07-26T23:59:59.678Z",
				"causeCode": 0,
				"deliveredAgentSpecific": true,
				"deliveredAsCallback": true,
				"deliveredPriority": true,
				"detectionType": "",
				"pcDestinationDesc": "",
				"pcDestinationValue": "",
				"targetAgent": 0,
				"timeZone": ""
			}
		]
	}
};
export var DownloadCallingListRequest_Lists = {
  "updatedSince": "",
  "finalized": "",
  "includeRecords": "",
  "fields": "",
  "skip": "",
  "top": "",
  "orderBy": ""
};
export var DownloadCallingListResponse_Lists = {
	"resultSet": {
		"_links": {
			"self": "",
			"next": "",
			"previous": ""
		},
		"listName": "",
		"lastPollTime": "2020-07-26T23:59:59.678Z",
		"prospectiveContactCount": 0,
		"status": "",
		"totalRecords": 0,
		"invalidRecords": 0,
		"validRecords": 0,
		"finalizedRecords": 0,
		"createDate": "2020-07-26T23:59:59.678Z",
		"uploadDate": "2020-07-26T23:59:59.678Z",
		"updateDate": "2020-07-26T23:59:59.678Z",
		"removeDate": "2020-07-26T23:59:59.678Z",
		"listExpirationDate": "2020-07-26T23:59:59.678Z",
		"skills": [
			{
				"skillId": 0,
				"skillName": "",
				"totalRecords": 0,
				"freshRecords": 0,
				"finalizedRecords": 0,
				"retriedRecords": 0
			}
		],
		"contactRecords": [
			{
				"externalId": "",
				"score": 0,
				"customer1": "",
				"customer2": "",
				"callerId": "",
				"priority": "",
				"complianceReq": true,
				"firstName": "",
				"lastName": "",
				"address": "",
				"city": "",
				"state": "",
				"zip": "",
				"timeZone": "",
				"confirmReq": true,
				"agentId": 0,
				"overrideFinalization": true,
				"callRequestTime": "2020-07-26T23:59:59.678Z",
				"callRequestStaleMins": 0,
				"notes": "",
				"expirationDate": "2020-07-26T23:59:59.678Z",
				"icAttempts": 0,
				"icFinalStatus": "",
				"icAssignedSkillId": 0,
				"icConfirmationReq": true,
				"icComplianceRecord": true,
				"icPriority": true,
				"icSourceActive": true,
				"icSourceRemoved": true,
				"icTimeZoneNames": "",
				"icTargetAgent": 0,
				"icTargetAgentName": "",
				"icDateOfLastCall": "2020-07-26T23:59:59.678Z",
				"icLastCallDuration": "2020-07-26T23:59:59.678Z",
				"icSystemClassification": 0,
				"icSystemClassificationName": "",
				"icAgentDisposition": 0,
				"icAgentDispositionDesc": "",
				"icAgentNo": 0,
				"icAgentName": "",
				"icCallNotes": "",
				"icCommitmentAmount": 0,
				"icCallerIdUsed": true,
				"icDeliveredComplianceRecord": true,
				"icDeliveredConfirmationRequired": true,
				"icContactDeliveryType": "",
				"icDeliveredPriority": true,
				"icDeliveredAsCallback": true,
				"icDeliveredAgentSpecific": true,
				"icCallbackDateTime": "2020-07-26T23:59:59.678Z",
				"icCallbackAgent": "2020-07-26T23:59:59.678Z",
				"icCallbackAgentName": 0,
				"icCallbackNumber": "",
				"icCallbackNotes": "",
				"icCreateDate": "2020-07-26T23:59:59.678Z",
				"icModifiedDate": "2020-07-26T23:59:59.678Z",
				"icProspectiveContactDestValue": 0,
				"icProspectiveContactDestDesc": "",
				"icProspectiveContactExpireDate": "2020-07-26T23:59:59.678Z",
				"icCallRequestTime": "2020-07-26T23:59:59.678Z",
				"icCallRequestStaleMins": 0,
				"destinations": [
					{
						"formattedDestination": "",
						"description": "",
						"compliance": true,
						"maxAttempts": 0
					}
				],
				"otherFields": [
					{
						"fieldName": "",
						"fieldMapping": "",
						"fieldValue": true
					}
				]
			}
		]
	}
};
export var ExpireRecordsDoNotCallGroupRequest_Lists = {
  "dncGroupRecords": [
    {
      "phoneNumber": ""
    }
  ]
};
export var ExpireRecordsDoNotCallGroupResponse_Lists = {
  "resultSet": {
    "errorCount": 0,
    "recordResults": [
      {
        "success": true,
        "formattedPhone": "",
        "error": "",
        "phoneNumber": ""
      }
    ]
  }
};
export var GetCallingListsRequest_Lists = {

};
export var GetCallingListsResponse_Lists = {
  "callingLists": [
	{
		"listId": 0,
		"listName": "",
		"prospectiveContactCount": 0,
		"status": "",
		"totalRecords": 0,
		"invalidRecords": 0,
		"validRecords": 0,
		"finalizedRecords": 0,
		"createDate": "2020-07-26T23:59:59.678Z",
		"uploadDate": "2020-07-26T23:59:59.678Z",
		"updateDate": "2020-07-26T23:59:59.678Z",
		"removeDate": "2020-07-26T23:59:59.678Z"
	}
  ]
};
export var GetContributingSkillsDoNotCallGroupRequest_Lists = {

};
export var GetContributingSkillsDoNotCallGroupResponse_Lists = {
  "contributingSkills": [
    {
      "skillId": 0,
      "skillName": ""
    }
  ]
};
export var GetDoNotCallGroupRequest_Lists = {
  "fields": ""
};
export var GetDoNotCallGroupResponse_Lists = {
  "resultSet": {
    "dncGroups": [
		{
			"dncGroupId": 0,
			"dncGroupName": "",
			"dncGroupDescription": "",
			"validRecords": 0,
			"isActive": true,
			"isRemoved": true,
			"createDate": "2020-07-26T23:59:59.678Z",
			"lastUpdateTime": "2020-07-26T23:59:59.678Z"
		}
    ]
  }
};
export var GetDoNotCallGroupsRequest_Lists = {
  "fields": "",
  "updatedSince": ""
};
export var GetDoNotCallGroupsResponse_Lists = {
  "resultSet": {
    "totalGroups": 0,
    "dncGroups": [
		{
			"dncGroupId": 0,
			"dncGroupName": "",
			"dncGroupDescription": "",
			"validRecords": 0,
			"isActive": true,
			"isRemoved": true,
			"createDate": "2020-07-26T23:59:59.678Z",
			"lastUpdateTime": "2020-07-26T23:59:59.678Z"
		}
    ]
  }
};
export var GetRecordsDoNotCallGroupRequest_Lists = {
  "fields": "",
  "skip": "",
  "top": "",
  "orderBy": ""
};
export var GetRecordsDoNotCallGroupResponse_Lists = {
  "resultSet": {
    "totalRecords": 0,
    "dncRecords": [
      {
        "recordId": true,
        "createdBy": 0,
        "phoneNumber": "",
        "formattedPhone": ""
      }
    ]
  }
};
export var GetScrubbedSkillsDoNotCallGroupRequest_Lists = {

};
export var GetScrubbedSkillsDoNotCallGroupResponse_Lists = {
  "scrubbedSkills": [
    {
      "skillId": 0,
      "skillName": ""
    }
  ]
};
export var GetStatusCallingListUploadJobRequest_Lists = {
  "fields": ""
};
export var GetStatusCallingListUploadJobResponse_Lists = {
  "uploadJobs": [
    {
      "jobId": 0,
      "listId": 0,
      "listName": "",
      "startDate": "",
      "submitDate": "",
      "isComplete": true,
      "isCancelled": true,
      "completedDate": ""
    }
  ]
};
export var GetStatusCallingListUploadJobsRequest_Lists = {
  "fields": "",
  "skip": "",
  "top": "",
  "orderBy": "",
  "startDate": "",
  "endDate": ""
};
export var GetStatusCallingListUploadJobsResponse_Lists = {
  "_links": {
    "self": "",
    "next": "",
    "previous": ""
  },
  "businessUnitId": 0,
  "lastPollTime": "",
  "totalRecords": 0,
  "uploadJobs": [
    {
      "jobId": 0,
      "listId": 0,
      "listName": "",
      "startDate": "",
      "submitDate": "",
      "isComplete": true,
      "isCancelled": true,
      "completedDate": ""
    }
  ]
};
export var RemoveCallingListRequest_Lists = {
  "forceInactive": "",
  "forceDelete": ""
};
export var RemoveCallingListResponse_Lists = {

};
export var RemoveContributingSkillRequest_Lists = {

};
export var RemoveContributingSkillResponse_Lists = {

};
export var RemoveScrubbedSkillRequest_Lists = {

};
export var RemoveScrubbedSkillResponse_Lists = {

};
export var SearchPhoneNumberRequest_Lists = {
  "phoneNumber": ""
};
export var SearchPhoneNumberResponse_Lists = {
  "searchResults": [
    {
      "dncGroupId": 0,
      "dncGroupName": "",
      "dncGroupDescription": 0,
      "formattedPhone": ""
    }
  ]
};
export var UpdateDoNotCallGroupRequest_Lists = {
  "dncGroupName": "",
  "dncGroupDescription": "",
  "isActive": false
};
export var UpdateDoNotCallGroupResponse_Lists = {
  "dncGroups": [
	{
		"dncGroupId": 0,
		"dncGroupName": "",
		"dncGroupDescription": "",
		"validRecords": 0,
		"isActive": true,
		"isRemoved": true,
		"createDate": "2020-07-26T23:59:59.678Z",
		"lastUpdateTime": "2020-07-26T23:59:59.678Z"
	}
  ]
};
export var UploadRecordsCallListRequest_Lists = {
  "skillId": 0,
  "fileName": "",
  "forceOverwrite": false,
  "defaultTimeZone": "",
  "expirationDate": "",
  "listFile": "",
  "startSkill": false
};
export var UploadRecordsCallListResponse_Lists = {
  "resultSet": {
    "sourceId": 0,
    "importStatus": true,
    "procRecords": 0,
    "validRecords": 0,
    "invalidRecords": 0,
    "errorResults": ""
  }
};
export var LogIntoDialerCampaignRequest_PersonalCon = {
  "skillName": ""
};
export var LogIntoDialerCampaignResponse_PersonalCon = {

};
export var LogOutDialerCampaignRequest_PersonalCon = {

};
export var LogOutDialerCampaignResponse_PersonalCon = {

};
export var SnoozePreviewContactRequest_PersonalCon = {

};
export var SnoozePreviewContactResponse_PersonalCon = {

};
export var AcceptConsultRequest_PhoneCalls = {

};
export var AcceptConsultResponse_PhoneCalls = {

};
export var ConferenceCallRequest_PhoneCalls = {

};
export var ConferenceCallResponse_PhoneCalls = {

};
export var DialAgentConsultRequest_PhoneCalls = {
  "targetAgentId": 0,
  "parentContactId": 0
};
export var DialAgentConsultResponse_PhoneCalls = {

};
export var DialAgentPersonalQueueRequest_PhoneCalls = {
  "targetAgentId": 0,
  "parentContactId": 0
};
export var DialAgentPersonalQueueResponse_PhoneCalls = {

};
export var DialIndependentCallRequest_PhoneCalls = {

};
export var DialIndependentCallResponse_PhoneCalls = {

};
export var DialOutboundCallRequest_PhoneCalls = {
  "phoneNumber": "",
  "skillId": 0,
  "parentContactId": 0
};
export var DialOutboundCallResponse_PhoneCalls = {

};
export var DialSkillRequest_PhoneCalls = {
  "skillId": 0,
  "parentContactId": 0
};
export var DialSkillResponse_PhoneCalls = {

};
export var DispositionIndependentCallRequest_PhoneCalls = {
  "outcome": ""
};
export var DispositionIndependentCallResponse_PhoneCalls = {

};
export var EndCallRequest_PhoneCalls = {
};
export var EndCallResponse_PhoneCalls = {
};
export var MaskRecordingRequest_PhoneCalls = {

};
export var MaskRecordingResponse_PhoneCalls = {

};
export var OverrideAmdCallRequest_PhoneCalls = {
  "type": ""
};
export var OverrideAmdCallResponse_PhoneCalls = {

};
export var PlaceContactOnHoldRequest_PhoneCalls = {
};
export var PlaceContactOnHoldResponse_PhoneCalls = {
};
export var RecordCallRequest_PhoneCalls = {

};
export var RecordCallResponse_PhoneCalls = {

};
export var ResumeCallRequest_PhoneCalls = {
};
export var ResumeCallResponse_PhoneCalls = {
};
export var SendDtmfTonesRequest_PhoneCalls = {
  "dtmfSequence": "",
  "toneDurationMs": 0,
  "toneSpacingMs": 0
};
export var SendDtmfTonesResponse_PhoneCalls = {

};
export var StopMaskingRecordingRequest_PhoneCalls = {

};
export var StopMaskingRecordingResponse_PhoneCalls = {

};
export var TransferCallRequest_PhoneCalls = {

};
export var TransferCallResponse_PhoneCalls = {

};
export var ActiveContactsRequest_RealTime = {
  "updatedSince": "",
  "fields": "",
  "mediaTypeId": "",
  "skillId": "",
  "campaignId": "",
  "agentId": "",
  "teamId": "",
  "toAddr": "",
  "fromAddr": "",
  "stateId": ""
};
export var ActiveContactsResponse_RealTime = {
	"resultSet": {
		"businessUnitId": 0,
		"lastPollTime": "2020-07-26T23:59:59.678Z",
		"activeContacts": [
			{
				"agentId": 0,
				"campaignId": 0,
				"campaignName": "",
				"contactId": 0,
				"contactStart": "2020-07-26T23:59:59.678Z",
				"fileName": "",
				"firstName": "",
				"fromAddr": "",
				"isLogged": true,
				"isOutbound": true,
				"isTakeover": true,
				"lastName": "",
				"lastUpdateTime": "2020-07-26T23:59:59.678Z",
				"masterContactId": 0,
				"mediaType": 0,
				"mediaTypeName": "",
				"pointOfContactId": 0,
				"pointOfContactName": "",
				"skillId": 0,
				"skillName": "",
				"state": "",
				"stateId": 0,
				"targetAgentId": 0,
				"teamId": 0,
				"teamName": "",
				"toAddr": "",
				"transferIndicatorId": "",
				"transferIndicatorName": ""
			}
		]
	}
};
export var ActiveContactStatesRequest_RealTime = {
  "agentId": "",
  "updatedSince": ""
};
export var ActiveContactStatesResponse_RealTime = {
  "contactStates": [
	{
		"AgentId": 0,
		"BusinessUnitId": 0,
		"CampaignName": "",
		"CampaignId": 0,
		"ContactId": 0,
		"ContactStateCode": 0,
		"CurrentContactState": "",
		"FirstName": "",
		"FromAddr": "",
		"LastName": "",
		"LastPollTime": "2020-07-26T23:59:59.678Z",
		"LastUpdateTime": "2020-07-26T23:59:59.678Z",
		"MasterContactId": 0,
		"MediaName": "",
		"MediaType": 0,
		"SkillName": "",
		"SkillId": 0,
		"TeamName": "",
		"TeamId": 0,
		"Toaddr": ""
	}
  ]
};
export var ActivityAllSkillsRequest_RealTime = {
  "updatedSince": "",
  "fields": ""
};
export var ActivityAllSkillsResponse_RealTime = {
	"resultSet": {
		"lastPollTime": "2020-07-26T23:59:59.678Z",
		"skillActivity": [
			{
				"serverTime": "2020-07-26T23:59:59.678Z",
				"businessUnitId": 0,
				"agentsACW": 0,
				"agentsAvailable": 0,
				"agentsIdle": 0,
				"agentsLoggedIn": 0,
				"agentsUnavailable": 0,
				"agentsWorking": 0,
				"campaignId": 0,
				"campaignName": "",
				"contactsActive": 0,
				"isOutbound": true,
				"mediaTypeId": 0,
				"mediaTypeName": "",
				"queueCount": 0,
				"serviceLevel": 0,
				"serviceLevelGoal": 0,
				"serviceLevelThreshold": 0,
				"skillName": "",
				"skillId": 0,
				"skillQueueCount": 0,
				"personalQueueCount": 0,
				"parkedCount": 0
			}
		]
	}
};
export var ActivitySkillRequest_RealTime = {
  "updatedSince": "",
  "fields": ""
};
export var ActivitySkillResponse_RealTime = {
	"resultSet": {
		"lastPollTime": "2020-07-26T23:59:59.678Z",
		"skillActivity": [
			{
				"serverTime": "2020-07-26T23:59:59.678Z",
				"businessUnitId": 0,
				"agentsACW": 0,
				"agentsAvailable": 0,
				"agentsIdle": 0,
				"agentsLoggedIn": 0,
				"agentsUnavailable": 0,
				"agentsWorking": 0,
				"campaignId": 0,
				"campaignName": "",
				"contactsActive": 0,
				"isOutbound": true,
				"mediaTypeId": 0,
				"mediaTypeName": "",
				"queueCount": 0,
				"serviceLevel": 0,
				"serviceLevelGoal": 0,
				"serviceLevelThreshold": 0,
				"skillName": "",
				"skillId": 0,
				"skillQueueCount": 0,
				"personalQueueCount": 0,
				"parkedCount": 0
			}
		]
	}
};
export var ParkedContactsRequest_RealTime = {
  "updatedSince": "",
  "fields": "",
  "mediaTypeId": "",
  "skillId": "",
  "campaignId": "",
  "agentId": "",
  "teamId": "",
  "toAddr": "",
  "fromAddr": ""
};
export var ParkedContactsResponse_RealTime = {
	"resultSet": {
		"businessUnitId": 0,
		"lastPollTime": "2020-07-26T23:59:59.678Z",
		"parkedContacts": [
			{
				"agentId": 0,
				"campaignId": 0,
				"campaignName": "",
				"contactId": 0,
				"contactStart": "2020-07-26T23:59:59.678Z",
				"fileName": "",
				"firstName": "",
				"fromAddr": "",
				"isLogged": true,
				"isOutbound": true,
				"isTakeover": true,
				"lastName": "",
				"lastUpdateTime": "2020-07-26T23:59:59.678Z",
				"masterContactId": 0,
				"mediaType": 0,
				"mediaTypeName": "",
				"pointOfContactId": 0,
				"pointOfContactName": "",
				"primaryDispositionId": 0,
				"secondaryDispositionId": 0,
				"skillId": 0,
				"skillName": "",
				"state": "",
				"stateId": 0,
				"targetAgentId": 0,
				"teamId": 0,
				"teamName": "",
				"toAddr": "",
				"transferIndicatorId": "",
				"transferIndicatorName": ""
			}
		]
	}
};
export var StateAgentRequest_RealTime = {
  "updatedSince": "",
  "fields": ""
};
export var StateAgentResponse_RealTime = {
  "agentStates": [
    {
      "agentId": 0,
      "agentStateId": 0,
      "agentStateName": "",
      "businessUnitId": 0,
      "contactId": 0,
      "isACW": true,
      "isOutbound": true,
      "firstName": "",
      "fromAddress": "",
      "lastName": "",
      "mediaName": "",
      "mediaType": 0,
      "openContacts": 0,
      "outStateDescription": "",
      "outStateId": 0,
      "skillId": 0,
      "skillName": "",
      "stationId": 0,
      "stationPhoneNumber": "",
      "teamId": 0,
      "teamName": "",
      "toAddress": ""
    }
  ]
};
export var StateAllAgentsRequest_RealTime = {
  "updatedSince": "",
  "fields": ""
};
export var StateAllAgentsResponse_RealTime = {
  "agentStates": [
	{
		"agentId": 0,
		"agentStateId": 0,
		"agentStateName": "",
		"businessUnitId": 0,
		"contactId": 0,
		"isActive": true,
		"isAcw": true,
		"isOutbound": true,
		"firstName": "",
		"fromAddress": "",
		"lastName": "",
		"lastPollTime": "",
		"lastUpdateTime": "",
		"mediaName": "",
		"mediaType": 0,
		"openContacts": 0,
		"outStateDescription": "",
		"outStateId": 0,
		"skillId": 0,
		"skillName": "",
		"startDate": "2020-07-26T23:59:59.678Z",
		"stationId": 0,
		"stationPhoneNumber": "",
		"teamId": 0,
		"teamName": "",
		"toAddress": "",
		"userName": ""
	}
  ]
};
export var AgentLoginHistoryRequest_Reporting = {
  "startDate": "",
  "endDate": "",
  "searchString": "",
  "fields": "",
  "skip": "",
  "top": "",
  "orderBy": ""
};
export var AgentLoginHistoryResponse_Reporting = {
  "resultSet": {
    "_links": {
      "self": "",
      "next": "",
      "previous": ""
    },
    "totalRecords": 0,
    "agentLogins": [
		{
			"phoneNumber": 0,
			"callerId": 0,
			"stationId": 0,
			"stationName": "",
			"loginDate": "2020-07-26T23:59:59.678Z"
		}
    ]
  }
};
export var ASIMetadataRequest_Reporting = {
  "startDate": "",
  "endDate": "",
  "fields": ""
};
export var ASIMetadataResponse_Reporting = {
  "wfoAgentSpecificStats": [
	{
		"agentNo": 0,
		"teamName": "",
		"teamNo": 0,
		"businessUnitId": 0,
		"businessUnitName": "",
		"firstName": "",
		"lastName": "",
		"status": "",
		"createDate": "2020-07-26T23:59:59.678Z",
		"modDateTime": "2020-07-26T23:59:59.678Z",
		"productId": 0,
		"ntLoginName": ""
	}
  ]
};
export var CompletedContactsRequest_Reporting = {
  "startDate": "",
  "endDate": "",
  "updatedSince": "",
  "fields": "",
  "skip": "",
  "top": "",
  "orderBy": "",
  "mediaTypeId": "",
  "skillId": "",
  "campaignId": "",
  "agentId": "",
  "teamId": "",
  "toAddr": "",
  "fromAddr": "",
  "isLogged": "",
  "isRefused": "",
  "isTakeover": "",
  "tags": "",
  "analyticsProcessed": ""
};
export var CompletedContactsResponse_Reporting = {
	"resultSet": {
		"_links": {
			"self": "",
			"next": "",
			"previous": ""
		},
		"businessUnitId": 0,
		"lastPollTime": "2020-07-26T23:59:59.678Z",
		"completedContacts": [
			{
				"abandoned": true,
				"abandonSeconds": 0,
				"ACWSeconds": "",
				"agentId": 0,
				"agentSeconds": 0,
				"callbackTime": "2020-07-26T23:59:59.678Z",
				"campaignId": 0,
				"campaignName": "",
				"confSeconds": 0,
				"contactId": 0,
				"contactStart": "2020-07-26T23:59:59.678Z",
				"dateACWWarehoused": "2020-07-26T23:59:59.678Z",
				"dateContactWarehoused": "2020-07-26T23:59:59.678Z",
				"dispositionNotes": "",
				"firstName": "",
				"fromAddr": "",
				"holdCount": 0,
				"holdSeconds": 0,
				"inQueueSeconds": 0,
				"isLogged": true,
				"isOutbound": true,
				"isRefused": true,
				"isShortAbandon": true,
				"isTakeover": true,
				"lastName": "",
				"lastUpdateTime": "2020-07-26T23:59:59.678Z",
				"masterContactId": 0,
				"mediaType": 0,
				"mediaTypeName": "",
				"pointOfContactId": 0,
				"pointOfContactName": "",
				"postQueueSeconds": 0,
				"preQueueSeconds": 0,
				"primaryDispositionId": 0,
				"refuseReason": "",
				"refuseTime": "2020-07-26T23:59:59.678Z",
				"releaseSeconds": 0,
				"routingTime": "2020-07-26T23:59:59.678Z",
				"secondaryDispositionId": 0,
				"serviceLevelFlag": "",
				"skillId": 0,
				"skillName": "",
				"teamId": 0,
				"teamName": "",
				"toAddr": "",
				"totalDurationSeconds": 0,
				"transferIndicatorId": "",
				"transferIndicatorName": "",
				"tags": [
					{
						"tagId": 0,
						"tagName": ""
					}
				],
				"analyticsProcessedDate": "2020-07-26T23:59:59.678Z"
			}
		]
	}
};
export var ContactCallQualityResponse_Reporting = {
  "contactId": 0,
  "endDateTime": "2018-11-20T22:32:42.972Z",
  "businessUnitId": 0,
  "dnis": "string",
  "ani": "string",
  "lineType": "string",
  "jitter": 0,
  "packetLoss": 0,
  "latency": 0
};
export var ContactCustomDataResponse_Reporting = {
  "contactCustomData": [
    {
      "name": "",
      "value": ""
    }
  ]
};
export var ContactDetailsRequest_Reporting = {
  "fields": ""
};
export var ContactDetailsResponse_Reporting = {
	"resultSet": {
		"abandoned": true,
		"abandonSeconds": 0,
		"ACWSeconds": "",
		"agentId": 0,
		"agentSeconds": 0,
		"callbackTime": "2020-07-26T23:59:59.678Z",
		"campaignId": 0,
		"campaignName": "",
		"confSeconds": 0,
		"contactId": 0,
		"contactStart": "2020-07-26T23:59:59.678Z",
		"dateACWWarehoused": "2020-07-26T23:59:59.678Z",
		"dateContactWarehoused": "2020-07-26T23:59:59.678Z",
		"dispositionNotes": "",
		"firstName": "",
		"fromAddr": "",
		"holdCount": 0,
		"holdSeconds": 0,
		"inQueueSeconds": 0,
		"isLogged": true,
		"isOutbound": true,
		"isRefused": true,
		"isShortAbandon": true,
		"isTakeover": true,
		"lastName": "",
		"lastUpdateTime": "2020-07-26T23:59:59.678Z",
		"masterContactId": 0,
		"mediaType": 0,
		"mediaTypeName": "",
		"pointOfContactId": 0,
		"pointOfContactName": "",
		"postQueueSeconds": 0,
		"preQueueSeconds": 0,
		"primaryDispositionId": 0,
		"refuseReason": "",
		"refuseTime": "2020-07-26T23:59:59.678Z",
		"releaseSeconds": 0,
		"routingTime": "2020-07-26T23:59:59.678Z",
		"secondaryDispositionId": 0,
		"serviceLevelFlag": "",
		"skillId": 0,
		"skillName": "",
		"teamId": 0,
		"teamName": "",
		"toAddr": "",
		"totalDurationSeconds": 0,
		"transferIndicatorId": "",
		"transferIndicatorName": "",
		"tags": [
			{
				"tagId": 0,
				"tagName": ""
			}
		]
	}
};
export var ContactHistoryRequest_Reporting = {
  "startDate": "",
  "endDate": "",
  "updatedSince": "",
  "mediaTypeId": "",
  "fields": "",
  "skip": "",
  "top": "",
  "orderBy": ""
};
export var ContactHistoryResponse_Reporting = {
	"resultSet": {
		"_links": {
			"self": "",
			"next": "",
			"previous": ""
		},
		"lastPollTime": "2020-07-26T23:59:59.678Z",
		"businessUnitId": 0,
		"contactStates": [
			{
				"transferIndicatorId": 0,
				"transferIndicatorName": "",
				"contactId": 0,
				"masterContactId": 0,
				"targetAgentId": 0,
				"fileName": "",
				"pointOfContact": "",
				"mediaType": 0,
				"mediaTypeName": "",
				"agentId": 0,
				"firstName": "",
				"lastName": "",
				"teamId": 0,
				"teamName": "",
				"campaignId": 0,
				"campaignName": "",
				"skillId": 0,
				"skillName": "",
				"isOutbound": true,
				"fromAddr": "",
				"toAddr": "",
				"primaryDispositionId": "",
				"secondaryDispositionId": ""
			}
		]
	}
};
export var ContactStateHistoryResponse_Reporting = {
  "contactStateHistory": [
	{
		"stateIndex": 0,
		"contactId": 0,
		"contactStateId": 0,
		"contactStateName": "",
		"startDate": "2020-07-26T23:59:59.678Z",
		"isWarehoused": true,
		"agentId": 0,
		"skillId": 0,
		"skillName": "",
		"duration": 0
	}
  ]
};
export var CSIStatisticsRequest_Reporting = {
  "startDate": "",
  "endDate": "",
  "fields": ""
};
export var CSIStatisticsResponse_Reporting = {
  "wfoContactStats": [
	{
		"businessUnitId": 0,
		"businessUnitName": "",
		"intervalStartDate": "2020-07-26T23:59:59.678Z",
		"skillId": 0,
		"skillName": "",
		"serviceLevel": 0,
		"mediaTypeId": 0,
		"mediaTypeName": "",
		"wfoTotalContacts": 0,
		"wfoTotalHandled": 0,
		"wfoAverageHandleTime": 0,
		"wfoAbandonCount": 0,
		"wfoAverageSpeedOfAnswer": 0,
		"totalContactTime": 0
	}
  ]
};
export var FTCIAdherenceStatisticsRequest_Reporting = {
  "startDate": "",
  "endDate": "",
  "fields": ""
};
export var FTCIAdherenceStatisticsResponse_Reporting = {
  "wfoAgentStats": [
    {}
  ]
};
export var GeneratesLinkToDatadownloadReportRequest_Reporting = {
  "fileName": "",
  "saveAsFile": true,
  "startDate": "",
  "endDate": ""
};
export var GeneratesLinkToDatadownloadReportResponse_Reporting = {
 
};
export var ListCustomReportsResponse_Reporting = {
  "reports": [
    {
      "businessUnitId": 0,
      "reportId": 0,
      "reportName": "",
      "reportType": "",
      "reportDataSourceTypes": ""
    }
  ]
};
export var ListReportingJobsRequest_Reporting = {
  "fields": "",
  "reportId": "",
  "jobStatus": "",
  "jobSpan": ""
};
export var ListReportingJobsResponse_Reporting = {
  "runningJobs": [
	{
		"jobId": 0,
		"reportId": 0,
		"reportName": "",
		"jobStart": "2020-07-26T23:59:59.678Z"
	}
  ],
  "completedJobs": [
	{
		"jobId": 0,
		"reportId": 0,
		"reportName": "",
		"jobStart": "2020-07-26T23:59:59.678Z",
		"jobEnd": "2020-07-26T23:59:59.678Z",
		"fileName": "",
		"resultFileURL": ""
	}
  ]
};
export var OSIStatisticsRequest_Reporting = {
  "startDate": "",
  "endDate": "",
  "fields": ""
};
export var OSIStatisticsResponse_Reporting = {
  "wfoOutboundStats": [
	{
		"businessUnitId": 0,
		"intervalStartDate": "2020-07-26T23:59:59.678Z",
		"skillId": 0,
		"skillName": "",
		"dials": 0,
		"connects": 0,
		"rightPartyConnects": 0,
		"abandons": 0
	}
  ]
};
export var PerformanceSummaryOfAllTeamsRequest_Reporting = {
  "startDate": "",
  "endDate": "",
  "fields": ""
};
export var PerformanceSummaryOfAllTeamsResponse_Reporting = {
  "teamPerformanceTotal": [
	{
		"teamId": 0,
		"inboundTalkTime": "",
		"inboundAvgTalkTime": "",
		"outboundHandled": 0,
		"outboundTalkTime": "",
		"outboundAvgTalkTime": "",
		"totalHandled": 0,
		"totalAvgHandled": 0,
		"totalTalkTime": "",
		"totalAvgTalkTime": "",
		"refused": 0,
		"percentRefused": 0,
		"loginTime": "2020-07-26T23:59:59.678Z",
		"workingRate": 0,
		"occupancy": 0
	}
  ]
};
export var PerformanceSummaryOfATeamRequest_Reporting = {
  "startDate": "",
  "endDate": "",
  "fields": ""
};
export var PerformanceSummaryOfATeamResponse_Reporting = {
  "teamPerformanceTotal": [
	{
		"teamId": 0,
		"inboundTalkTime": "",
		"inboundAvgTalkTime": "",
		"outboundHandled": 0,
		"outboundTalkTime": "",
		"outboundAvgTalkTime": "",
		"totalHandled": 0,
		"totalAvgHandled": 0,
		"totalTalkTime": "",
		"totalAvgTalkTime": "",
		"consultTime": "",
		"availableTime": "",
		"unavailableTime": "",
		"avgUnavailableTime": "",
		"acwTime": "",
		"refused": 0,
		"percentRefused": 0,
		"loginTime": "2020-07-26T23:59:59.678Z",
		"workingRate": 0,
		"occupancy": 0
	}
  ]
};
export var PerformanceSummaryRequest_Reporting = {
  "startDate": "",
  "endDate": "",
  "fields": ""
};
export var PerformanceSummaryResponse_Reporting = {
  "agentPerformance": [
	{
		"agentId": 0,
		"teamId": 0,
		"agentOffered": 0,
		"inboundHandled": 0,
		"inboundTime": "",
		"inboundTalkTime": "",
		"inboundAvgTalkTime": "",
		"outboundHandled": 0,
		"outboundTime": "",
		"outboundTalkTime": "",
		"outboundAvgTalkTime": "",
		"totalHandled": 0,
		"totalTalkTime": "",
		"totalAvgTalkTime": "",
		"totalAvgHandleTime": "",
		"consultTime": "",
		"availableTime": "",
		"unavailableTime": "",
		"acwTime": "",
		"refused": 0,
		"percentRefused": 0,
		"loginTime": "2020-07-26T23:59:59.678Z",
		"workingRate": 0,
		"occupancy": 0
	}
  ]
};
export var QualityManagementStatisticsRequest_Reporting = {
  "startDate": "",
  "endDate": "",
  "fields": ""
};
export var QualityManagementStatisticsResponse_Reporting = {
  "wfoQmContactEvaluationStats": [
    {}
  ]
};
export var RecentContactsRequest_Reporting = {
  "top": "",
  "fields": "",
  "startDate": "",
  "endDate": ""
};
export var RecentContactsResponse_Reporting = {
  "resultSet": {
    "agentId": 0,
    "firstName": "",
    "lastName": "",
    "contactData": [
      {
        "toAgentId": 0,
        "toAgentFirstName": "",
        "toAgentLastName": "",
        "toSkillId": 0,
        "toSkillName": "",
        "toAddr": ""
      }
    ]
  }
};
export var ReportingJobRequest_Reporting = {
  "fields": ""
};
export var ReportingJobResponse_Reporting = {
	"jobId": 0,
	"reportId": 0,
	"reportName": "",
	"jobStart": "2020-07-26T23:59:59.678Z",
	"jobEnd": "2020-07-26T23:59:59.678Z",
	"fileName": "",
	"resultFileURL": "",
	"deleteTime": "2020-07-26T23:59:59.678Z"
};
export var ScorecardStatisticsRequest_Reporting = {
  "startDate": "",
  "endDate": "",
  "fields": ""
};
export var ScorecardStatisticsResponse_Reporting = {
  "wfoScorecardStats": [
	{
		"businessUnitId": 0,
		"agentId": 0,
		"loginTime": "2020-07-26T23:59:59.678Z",
		"totalTime": 0,
		"talkTime": 0,
		"acwTime": 0,
		"holdTime": 0,
		"totalCalls": 0,
		"abandonedCalls": 0,
		"auxTime": 0,
		"auxInTime": 0,
		"auxOutTime": 0,
		"idleTime": 0,
		"actualCalls": 0
	}
  ]
};
export var SLASummaryForAllSkillsRequest_Reporting = {
  "startDate": "",
  "endDate": ""
};
export var SLASummaryForAllSkillsResponse_Reporting = {
  "serviceLevelSummaries": [
    {
      "BusinessUnitId": 0,
      "SkillId": 0,
      "SkillName": "",
      "ContactsWithinSLA": 0,
      "ContactsOutOfSLA": 0,
      "TotalContacts": 0,
      "ServiceLevel": 0
    }
  ]
};
export var SLASummaryForASkillRequest_Reporting = {
  "startDate": "",
  "endDate": "",
  "listVar": ""
};
export var SLASummaryForASkillResponse_Reporting = {
  "serviceLevelSummaries": [
    {
      "BusinessUnitId": 0,
      "SkillId": 0,
      "SkillName": "",
      "ContactsWithinSLA": 0,
      "ContactsOutOfSLA": 0,
      "TotalContacts": 0,
      "ServiceLevel": 0
    }
  ]
};
export var SMSContactTranscriptsRequest_Reporting = {
  "startDate": "",
  "endDate": "",
  "transportCode": "",
  "skip": "",
  "top": ""
};
export var SMSContactTranscriptsResponse_Reporting = {
  "_links": {
    "self": "",
    "next": "",
    "previous": ""
  },
  "businessUnitId": 0,
  "totalRecords": 0,
  "smsTranscripts": [
    {
      "messageStart": "",
      "messageBody": "",
      "from": ""
    }
  ]
};
export var SMSTranscriptsRequest_Reporting = {
	"agentId": "",
	"startDate": "",
	"endDate": "",
	"transportCode": "",
	"skip": "",
	"top": "",
	"orderBy": ""
};
export var SMSTranscriptsResponse_Reporting = {
  "_links": {
    "self": "",
    "next": "",
    "previous": ""
  },
  "businessUnitId": 0,
  "totalRecords": 0,
  "smsTranscripts": [
    {
      "messageStart": "",
      "messageBody": "",
      "from": "",
      "contactId": 0
    }
  ]
};
export var StartCustomReportingJobRequest_Reporting = {
  "fileType": "",
  "includeHeaders": false,
  "appendDate": false,
  "deleteAfter": 0,
  "overwrite": false,
  "startDate": "",
  "endDate": ""
};
export var StartCustomReportingJobResponse_Reporting = {
  "jobId": 0
};
export var StateDurationRequest_Reporting = {
  "startDate": "",
  "endDate": "",
  "mediaTypeId": "",
  "searchString": "",
  "outboundStrategy": "",
  "fields": "",
  "skip": "",
  "top": "",
  "orderBy": "",
  "updatedSince": ""
};
export var StateDurationResponse_Reporting = {
	"stateIndex": 0,
	"startDate": "2020-07-26T23:59:59.678Z",
	"agentStateId": 0,
	"agentStateName": "",
	"agentSessionId": 0,
	"skillId": 0,
	"skillName": "",
	"mediaTypeId": 0,
	"mediaTypeName": "",
	"fromAddress": "",
	"toAddress": "",
	"outStateId": 0,
	"outStateDescription": "",
	"duration": 0,
	"isOutbound": true,
	"isNaturualCalling": true,
	"stationId": 0
};
export var StatisticsForAllSkillsRequest_Reporting = {
  "startDate": "",
  "endDate": ""
};
export var StatisticsForAllSkillsResponse_Reporting = {
  "skillSummaries": [
    {
      "BusinessUnitId": 0,
      "AbandonCount": 0,
      "AbandonRate": 0,
      "AgentsACW": 0,
      "AgentsAvaliable": 0,
      "AgentsIdle": 0,
      "AgentsLoggedIn": 0,
      "AgentsUnavaliable": 0,
      "AgentsWorking": 0,
      "AverageHandleTime": 0,
      "AverageInqueueTime": 0,
      "AverageSpeedToAnswer": 0,
      "AverageTalkTime": 0,
      "AverageWrapTime": 0,
      "CampaignId": 0,
      "CampaignName": "",
      "ContactsActive": 0,
      "ContactsHandled": 0,
      "ContactsOffered": 0,
      "ContactsQueued": 0,
      "ContactsOutOfSLA": 0,
      "ContactsWithinSLA": 0,
      "HoldTime": 0,
      "IsOutbound": true,
      "LongestQueueDuration": 0,
      "MediaTypeId": 0,
      "MediaTypeName": "",
      "QueueCount": 0,
      "ServiceLevel": 0,
      "SkillName": "",
      "SkillId": 0,
      "ServiceLevelGoal": 0,
      "ServiceLevelThreshold": 0
    }
  ]
};
export var StatisticsForASkillRequest_Reporting = {
  "startDate": "",
  "endDate": "",
  "listVar": ""
};
export var StatisticsForASkillResponse_Reporting = {
  "skillSummaries": [
    {
      "BusinessUnitId": 0,
      "AbandonCount": 0,
      "AbandonRate": 0,
      "AgentsACW": 0,
      "AgentsAvaliable": 0,
      "AgentsIdle": 0,
      "AgentsLoggedIn": 0,
      "AgentsUnavaliable": 0,
      "AgentsWorking": 0,
      "AverageHandleTime": 0,
      "AverageInqueueTime": 0,
      "AverageSpeedToAnswer": 0,
      "AverageTalkTime": 0,
      "AverageWrapTime": 0,
      "CampaignId": 0,
      "CampaignName": "",
      "ContactsActive": 0,
      "ContactsHandled": 0,
      "ContactsOffered": 0,
      "ContactsQueued": 0,
      "ContactsOutOfSLA": 0,
      "ContactsWithinSLA": 0,
      "HoldTime": 0,
      "IsOutbound": true,
      "LongestQueueDuration": 0,
      "MediaTypeId": 0,
      "MediaTypeName": "",
      "QueueCount": 0,
      "ServiceLevel": 0,
      "SkillName": "",
      "SkillId": 0,
      "ServiceLevelGoal": 0,
      "ServiceLevelThreshold": 0
    }
  ]
};
export var CancelRequest_ScheduledCallbacks = {
  "notes": "" 
};
export var CancelResponse_ScheduledCallbacks = {

};
export var DialRequest_ScheduledCallbacks = {

};
export var DialResponse_ScheduledCallbacks = {

};
export var RescheduleRequest_ScheduledCallbacks = {
  "rescheduleDate": ""
};
export var RescheduleResponse_ScheduledCallbacks = {

};
export var CreateRequest_ScheduledCallbacks1 = {
  "phoneNumber": "",
  "skillId": 0,
  "scheduleDate": "",
  "firstName": "",
  "lastName": "",
  "targetAgentId": 0,
  "notes": ""
};
export var CreateResponse_ScheduledCallbacks1 = {
  "callbackId": 0
};
export var DeleteRequest_ScheduledCallbacks1 = {

};
export var DeleteResponse_ScheduledCallbacks1 = {

};
export var GetRequest_ScheduledCallbacks1 = {

};
export var GetResponse_ScheduledCallbacks1 = {
  "callbacks": [
	{
		"callbackId": 0,
		"target": "",
		"agentId": 0,
		"skillId": 0,
		"dialNumber": "",
		"origNumber": "",
		"firstName": "",
		"lastName": "",
		"notes": "",
		"callbackTime": "2020-07-26T23:59:59.678Z"
	}
  ]
};
export var GetSkillCallbackRequest_ScheduledCallbacks1 = {

};
export var GetSkillCallbackResponse_ScheduledCallbacks1 = {
  "callbacks": [
	{
		"callbackId": 0,
		"target": "",
		"agentId": 0,
		"skillId": 0,
		"dialNumber": "",
		"origNumber": "",
		"firstName": "",
		"lastName": "",
		"notes": "",
		"callbackTime": "2020-07-26T23:59:59.678Z"
	}
  ]
};
export var UpdateRequest_ScheduledCallbacks1 = {
  "phoneNumber": "",
  "skillId": 0,
  "scheduleDate": "",
  "firstName": "",
  "lastName": "",
  "targetAgentId": 0,
  "notes": ""
};
export var UpdateResponse_ScheduledCallbacks1 = {

};
export var AcceptRequest_Sessions = {
};
export var AcceptResponse_Sessions = {
};
export var AddMediaTypeRouteRequest_Sessions = {
  "chat": false,
  "email": false,
  "workitem": false
};
export var AddMediaTypeRouteResponse_Sessions = {

};
export var ContinueReskillRequest_Sessions = {
  "continueReskill": false
};
export var ContinueReskillResponse_Sessions = {

};
export var DispositionContactRequest_Sessions = {
  "primaryDispositionId": 0,
  "primaryDispositionNotes": "",
  "primaryCommitmentAmount": 0.0,
  "primaryCallbackTime": "",
  "primaryCallbackNumber": "",
  "secondaryDispositionId": 0,
  "previewDispositionId": 0
};
export var DispositionContactResponse_Sessions = {

};
export var EndRequest_Sessions = {
};
export var EndResponse_Sessions = {
};
export var EndSessionRequest_Sessions = {
  "forceLogOff": false,
  "endContacts": false,
  "ignorePersonalQueue": false
};
export var EndSessionResponse_Sessions = {

};
export var GetEventDescriptionRequest_Sessions = {
  "timeout": ""
};
export var GetEventDescriptionResponse_Sessions = {
	"sessionId": "",
	"events": [
		{
			"IISHost": "",
			"VCHost": "",
			"Type": "",
			"BusNo": 4500,
			"AgentId": 12214,
			"SessionId": "",
			"StationPhoneNumber": "",
			"StationCallerId": "",
			"DialerCampaign": "",
			"DialerCampaignStartTime": "2020-07-26T23:59:59.678Z",
			"SupervisorPermissionLevel": 4,
			"CanMask": true,
			"AgentSchedulePermission": true,
			"ScoreRecordingsPermission": true,
			"HideAgentStatePermission": true,
			"CanMultiPartyConference": true
		},
		{
			"IISHost": "",
			"VCHost": "",
			"Type": "",
			"Success": true,
			"Message": ""
		},
		{
			"IISHost": "",
			"VCHost": "",
			"Type": "",
			"Message": ""
		},
		{
			"IISHost": "",
			"VCHost": "",
			"Type": "",
			"CurrentState": "",
			"CurrentOutReason": "",
			"NextStates": [
				{
					"State": "",
					"OutReason": ""
				}
			],
			"StartTimeUTC": "2020-07-26T23:59:59.678Z",
			"IsAcw": true,
			"AcwTimeout": 0
		},
		{
			"IISHost": "",
			"VCHost": "",
			"Type": "",
			"AgentLegId": 2200339882,
			"Status": "",
			"FinalState": true
		},
		{
			"IISHost": "",
			"VCHost": "",
			"Type": "",
			"Command": "",
			"ResultCode": "",
			"ContactID": 2200339882,
			"Target": "",
			"ErrorLevel": ""
		},
		{
			"IISHost": "",
			"VCHost": "",
			"Type": "",
			"Empty": true
		},
		{
			"IISHost": "",
			"VCHost": "",
			"Type": "",
			"ContactID": 1569815,
			"Status": "",
			"OriginalState": true,
			"CallType": "",
			"DNIS": "",
			"ANI": "",
			"Skill": 1507,
			"IsInbound": true,
			"StartTimeUTC": "2020-07-26T23:59:59.678Z",
			"LastStateChangeTimeUTC": "2020-07-26T23:59:59.678Z",
			"ScreenPopUrl": "",
			"DisconnectCode": "",
			"IsLogging": true,
			"Timeout": 45,
			"AllowDispositions": true,
			"Label": "",
			"IsLinked": true,
			"TimeZones": "",
			"FinalState": true,
			"OtherInformation": "",
			"BlendingToSkillName": ""
		},
		{
			"IISHost": "",
			"VCHost": "",
			"Type": "",
			"ContactID": 1569819,
			"Status": "",
			"WorkItemId": 3920,
			"WorkItemPayload": "",
			"WorkItemType": "",
			"AgentId": 1218,
			"SkillId": 1528,
			"StartTimeUTC": "2020-07-26T23:59:59.678Z",
			"LastStateChangeTimeUTC": "2020-07-26T23:59:59.678Z",
			"ScreenPopUrl": "",
			"ScreenPopUrlVariables": [
				{
					"variable2": ""
				},
				{
					"variable3": ""
				}
			],
			"RefusalTimeout": 45,
			"FinalState": true
		},
		{
			"IISHost": "",
			"VCHost": "",
			"Type": "",
			"Name": "",
			"ImageUri": "",
			"ActionType": "",
			"ActionUri": "",
			"ToolTip": "",
			"IndicatorState": ""
		},
		{
			"IISHost": "",
			"VCHost": "",
			"Type": "",
			"ContactID": 1569819,
			"Action": "",
			"PageUri": ""
		},
		{
			"IISHost": "",
			"VCHost": "",
			"Type": "",
			"ContactID": 1569822,
			"RoomId": 2,
			"Status": "",
			"Skill": 1509,
			"StartTime": "2020-07-26T23:59:59.678Z",
			"LastStateChangeTime": "2020-07-26T23:59:59.678Z",
			"ScreenPopUrl": "",
			"RefusalTimeout": 45,
			"IsActive": true,
			"Messages": [
				{
					"Text": "",
					"TimeStamp": "2020-07-26T23:59:59.678Z",
					"PartyType": ""
				}
			],
			"FinalState": true
		},
		{
			"IISHost": "",
			"VCHost": "",
			"Type": "",
			"RoomId": 2,
			"Label": "",
			"Message": "",
			"PartyType": "",
			"TimeStamp": "2020-07-26T23:59:59.678Z"
		},
		{
			"IISHost": "",
			"VCHost": "",
			"Type": "",
			"ContactID": 1569822,
			"TakeOverDate": "2020-07-26T23:59:59.678Z"
		},
		{
			"IISHost": "",
			"VCHost": "",
			"Type": "",
			"ContactID": 6550071587,
			"Status": "",
			"OriginalState": true,
			"CallType": "",
			"DNIS": "",
			"ANI": "",
			"Skill": 50883,
			"IsInbound": true,
			"StartTimeUTC": "2020-07-26T23:59:59.678Z",
			"LastStateChangeTimeUTC": "2020-07-26T23:59:59.678Z",
			"ScreenPopUrl": "",
			"DisconnectCode": "",
			"IsLogging": true,
			"Timeout": 45,
			"AllowDispositions": true,
			"Label": "",
			"IsLinked": true,
			"TimeZones": "",
			"FinalState": true,
			"OtherInformation": ""
		},
		{
			"IISHost": "",
			"VCHost": "",
			"Type": "",
			"MonitorStartTime": "2020-07-26T23:59:59.678Z",
			"TargetAgentId": 9011,
			"FinalState": true
		},
		{
			"IISHost": "",
			"VCHost": "",
			"Type": "",
			"ShowContinueReskill": true
		}
	]
};
export var HoldRequest_Sessions = {
};
export var HoldResponse_Sessions = {
};
export var JoinExistingSessionRequest_Sessions = {
  "asAgentId": 0
};
export var JoinExistingSessionResponse_Sessions = {
  "sessionId": ""
};
export var MoveEmailIntoFocusRequest_Sessions = {

};
export var MoveEmailIntoFocusResponse_Sessions = {

};
export var PostCustomDataToContactRequest_Sessions = {
  "indicatorName": "",
  "data": ""
};
export var PostCustomDataToContactResponse_Sessions = {

};
export var PostFeedbackRequest_Sessions = {
  "categoryId": 0,
  "priority": "",
  "comment": "",
  "customData": ""
};
export var PostFeedbackResponse_Sessions = {

};
export var RejectRequest_Sessions = {
};
export var RejectResponse_Sessions = {
};
export var ResumeRequest_Sessions = {
};
export var ResumeResponse_Sessions = {
};
export var SetAgentStateRequest_Sessions = {
  "state": "",
  "reason": ""
};
export var SetAgentStateResponse_Sessions = {

};
export var StartsSessionRequest_Sessions = {
  "stationId": "",
  "stationPhoneNumber": "",
  "inactivityTimeout": 0,
  "inactivityForceLogout": false,
  "asAgentId": 0
};
export var StartsSessionResponse_Sessions = {
  "sessionId": ""
};
export var AssignAgentsToSkillRequest_Skills = {
  "agents": [
    {
      "agentId": 0,
      "isActive": true,
      "proficency": 1
    }
  ]
};
export var AssignAgentsToSkillResponse_Skills = {
  "resultSet": {
    "errorCount": 0,
    "agentResults": [
      {
        "success": true,
        "agentId": 0,
        "error": true
      }
    ]
  }
};
export var AssignTagRequest_Skills = {
  "tags": [
    {
      "tagId": 0
    }
  ]
};
export var AssignTagResponse_Skills = {
  "resultSet": {
    "errorCount": 0,
    "tagResults": [
      {
        "success": true,
        "tagId": 0,
        "error": ""
      }
    ]
  }
};
export var ChangeDispositionRequest_Skills = {
  "dispositionName": "",
  "isPreviewDisposition": false,
  "classificationId": 0,
  "isActive": false
};
export var ChangeDispositionResponse_Skills = {

};
export var CreateCampaignRequest_Skills = {
	"campaigns": [
		{
			"campaignName": "",
			"isActive": true,
			"description": "",
			"notes": ""
		}
	]
};
export var CreateCampaignResponse_Skills = {
	"errorCount": 0,
	"campaignResults": [
		{
			"campaignId": 0,
			"success": true,
			"error": ""
		}
	]
};
export var CreateDispositionRequest_Skills = {
  "dispositions": [
    {
      "dispositionName": "",
      "isPreviewDisposition": true
    }
  ]
};
export var CreateDispositionResponse_Skills = {
  "errorCount": 0,
  "dispositionResults": [
    {
      "dispositionId": 0,
      "success": true,
      "error": ""
    }
  ]
}

;
export var CreateSkillRequest_Skills = {
  "skills": [
    {
      "mediaTypeId": 0,
      "skillName": "",
      "campaignId": 0,
      "useScreenPops": true,
      "screenPopTriggerEvent": 0,
      "useCustomScreenPops": true,
      "screenPopType": "",
      "screenPopDetails": "",
      "initialPriority": 0,
      "acceleration": 0,
      "maxPriority": 0,
      "serviceLevelThreshold": 0,
      "serviceLevelGoal": 0,
      "enableShortAbandon": true,
      "shortAbandonThreshold": 0,
      "countShortAbandons": true,
      "countOtherAbandons": true,
      "chatWarningThreshold": 0,
      "agentTypingIndicator": true,
      "smsTransportCodeId": 0,
      "messageTemplateId": 0,
      "dispositions": [
        {
          "dispositionId": 0,
          "priority": 0
        }
      ]
    }
  ]
};
export var CreateSkillResponse_Skills = {
  "errorCount": 0,
  "skillsResults": [
    {
      "success": true,
      "error": ""
    }
  ]
};
export var DeleteCampaignSkillRequest_Skills = {
	"skills": [
		{
			"skillId": 0,
			"transferCampaignId": 0
		}
	]
};
export var DeleteCampaignSkillResponse_Skills = {
	"errorCount": 0,
	"results": [
		{
			"skillId": 0,
			"transferCampaignId": 0,
			"success": true,
			"error": ""
		}
	]
};
export var GetAgentsAssignedToSkillRequest_Skills = {
  "updatedSince": "",
  "searchString": "",
  "fields": "",
  "skip": "",
  "top": "",
  "orderBy": ""
};
export var GetAgentsAssignedToSkillResponse_Skills = {
	"resultSet": {
		"_links": {
			"self": "",
			"next": "",
			"previous": ""
		},
		"lastPollTime": "2020-07-26T23:59:59.678Z",
		"businessUnitId": 0,
		"totalRecords": 0,
		"agentSkillAssignments": [
			{
				"agentId": 0,
				"firstName": "",
				"middleName": "",
				"lastName": "",
				"agentProficiencyValue": 0,
				"agentProficiencyName": "",
				"campaignId": 0,
				"campaignName": "",
				"emailFromAddress": "",
				"internalId": "",
				"isActive": true,
				"isSkillActive": true,
				"isDialer": true,
				"isNaturalCalling": true,
				"isNaturalCallingRunning": true,
				"isOutbound": true,
				"mediaTypeId": 0,
				"mediaTypeName": "",
				"notes": "",
				"outboundStrategy": "",
				"priorityBlending": true,
				"requireDisposition": true,
				"scriptDisposition": true,
				"skillId": 0,
				"skillName": "",
				"teamId": 0,
				"teamName": "",
				"useACW": true,
				"useDisposition": true,
				"useSecondaryDispositions": true,
				"screenPopTriggerEvent": ""
			}
		]
	}
};
export var GetAgentsNotAssignedSkillRequest_Skills = {
  "searchString": "",
  "fields": "",
  "skip": "",
  "top": "",
  "orderBy": ""
};
export var GetAgentsNotAssignedSkillResponse_Skills = {
  "resultSet": {
    "_links": {
      "self": "",
      "next": "",
      "previous": ""
    },
    "totalRecords": 0,
    "agents": [
      {
        "agentId": 0,
        "firstName": "",
        "middleName": "",
        "lastName": "",
        "isActive": true,
        "teamId": 0,
        "teamName": ""
      }
    ]
  }
};
export var GetCampaignRequest_Skills = {

};
export var GetCampaignResponse_Skills = {
	"campaign": {
		"campaignId": 0,
		"campaignName": "",
		"isActive": true,
		"description": "",
		"notes": "",
		"lastUpdateTime": "2020-07-26T23:59:59.678Z"
	}
};
export var GetCampaignsRequest_Skills = {
  "isActive": "",
  "fields": "",
  "searchString": "",
  "skip": "",
  "top": "",
  "orderby": ""
};
export var GetCampaignsResponse_Skills = {
  "resultSet": {
    "_links": {
      "self": "",
      "next": "",
      "previous": ""
    },
    "businessUnitId": 0,
    "totalRecords": 0,
    "campaigns": [
		{
			"campaignId": 0,
			"campaignName": "",
			"isActive": true,
			"description": "",
			"notes": "",
			"lastUpdateTime": "2020-07-26T23:59:59.678Z"
		}
    ]
  }
};
export var GetConfigurationThankYouPageRequest_Skills = {

};
export var GetConfigurationThankYouPageResponse_Skills = {
  "canDownloadChatTranscript": true,
  "chatThankPopURL": "",
  "displayChatThankPage": true,
  "thankMessage": "",
  "useChatThankPopURL": true,
  "fromAddress": ""
};
export var GetCPAManagementConfigurationSkillRequest_Skills = {
  "fields": ""
};
export var GetCPAManagementConfigurationSkillResponse_Skills = {
  
};
export var GetDeliveryPreferencesConfigurationSkillRequest_Skills = {
  "fields": ""
};
export var GetDeliveryPreferencesConfigurationSkillResponse_Skills = {

};
export var GetDispositionClassificationsRequest_Skills = {
  "fields": ""
};
export var GetDispositionClassificationsResponse_Skills = {
  "classificationResults": [
    {
      "classificationId": 0,
      "businessUnitId": 0,
      "classificationName": "",
      "classificationTypeID": 0,
      "direction": 0,
      "dialingOutcomeID": 0,
      "reportingGroupID": 0,
      "description": "",
      "showCommitmentAmount": true,
      "showRescheduleDate": true,
      "isAgentSpecific": true,
      "isDestinationFinal": true,
      "isContactFinal": true,
      "excludeFromSerialDelivery": true,
      "carryoverForCallback": true
    }
  ]
};
export var GetDispositionRequest_Skills = {
  "fields": ""
};
export var GetDispositionResponse_Skills = {
  "dispositionId": 0,
  "dispositionName": "",
  "notes": "",
  "lastUpdated": "",
  "classificationId": 0,
  "systemOutcome": "",
  "isPreviewDisposition": true
};
export var GetDispositionsSkillAssignmentRequest_Skills = {
	"fields": "",
	"updatedSince": "",
	"isActive": "",
	"searchString": "",
	"orderBy": "",
	"skip": "",
	"top": ""
};
export var GetDispositionsSkillAssignmentResponse_Skills = {
	"dispositionId": 0,
	"dispositionName": "",
	"isActive": true,
	"skills": [
		{
			"skillId": 0,
			"mediaTypeId": 0,
			"mediaTypeName": 0
		}
	]
};
export var GetOutboundSkillGeneralSettingsRequest_Skills = {
  "fields": ""
};
export var GetOutboundSkillGeneralSettingsResponse_Skills = {
  "minimumRetryMinutes": 0,
  "maximumAttempts": 0,
  "defaultContactExpiration": 0,
  "getPriorityContactsOnContactInsertion": true,
  "loadCallbacks": true,
  "loadFresh": true,
  "loadNonFresh": true,
  "overrideBusinessUnitAbandonRate": true,
  "maximumRingingDuration": 0,
  "beginDampenPercentage": 0,
  "abandonRateCutoff": 0,
  "abandonRateThreshold": 0,
  "inactiveBlenderTimer": 0,
  "maximumRatio": 0,
  "aggressiveness": "",
  "endOfListNotificationsDelay": 0,
  "notifyAgentsWhenListIsEmpty": true,
  "percentageOfAgentsBeforeOverdial": 0,
  "blockMultipleCalls": true,
  "consecutiveAttemptsWithoutALiveConnect": 0,
  "enableDialingByProficiency": true,
  "proficiencyFactor": 0,
  "waitTimeFactor": 0,
  "maxConcurrentCallsPerAgent": 0,
  "maxWaitTimeSeconds": 0
};
export var GetRetrySettingsSkillRequest_Skills = {
  "fields": ""
};
export var GetRetrySettingsSkillResponse_Skills = {

};
export var GetScheduleSettingsSkillRequest_Skills = {

};
export var GetScheduleSettingsSkillResponse_Skills = {
  "isScheduled": true,
  "sundayStartTime": "",
  "sundayEndTime": "",
  "sundayIsActive": true,
  "mondayStartTime": "",
  "mondayEndTime": "",
  "mondayIsActive": true,
  "tuesdayStartTime": "",
  "tuesdayEndTime": "",
  "tuesdayIsActive": true,
  "wednesdayStartTime": "",
  "wednesdayEndTime": "",
  "wednesdayIsActive": true,
  "thursdayStartTime": "",
  "thursdayEndTime": "",
  "thursdayIsActive": true,
  "fridayStartTime": "",
  "fridayEndTime": "",
  "fridayIsActive": true,
  "saturdayStartTime": "",
  "saturdayEndTime": "",
  "saturdayIsActive": true
};
export var GetSkillAssignmentsRequest_Skills = {
  "updatedSince": "",
  "fields": ""
};
export var GetSkillAssignmentsResponse_Skills = {
  "lastPollTime": "",
  "businessUnitId": 0,
  "agentSkillAssignments": [
    {
      "agentId": 0,
      "agentName": "",
      "agentProficiencyValue": 0,
      "agentProficiencyName": "",
      "campaignId": 0,
      "campaignName": "",
      "emailFromAddress": "",
      "internalId": "",
      "isActive": true,
      "isSkillActive": true,
      "isNaturalCalling": true,
      "isNaturalCallingRunning": true,
      "isOutbound": true,
      "lastUpdateTime": "",
      "mediaType": 0,
      "mediaTypeName": "",
      "notes": "",
      "outboundStrategy": "",
      "priorityBlending": true,
      "requireDispositions": true,
      "scriptDisposition": true,
      "skillId": 0,
      "skillName": "",
      "useACW": true,
      "useDisposition": true,
      "useSecondaryDisposition": true,
      "screenPopTriggerEvent": "",
      "isAssigned": true
    }
  ],
  "invalidSkills": [
    {
      "skillId": 0
    }
  ]
};
export var GetSkillDispositionsRequest_Skills = {
  "fields": "",
  "searchString": "",
  "orderBy": "",
  "skip": "",
  "top": ""
};
export var GetSkillDispositionsResponse_Skills = {
  "skillId": 0,
  "skillName": "",
  "totalRecords": 0,
  "dispositions": [
    {
      "dispositionId": 0,
      "dispositionName": "",
      "displayOrder": 0,
      "classification": "",
      "reportingGroup": "",
      "systemOutcome": "",
      "requireCommitmentAmount": true,
      "requireRescheduleDate": true,
      "agentSpecific": true,
      "isPreviewDisposition": true
    }
  ]
};
export var GetSkillRequest_Skills = {

  "fields": ""
};
export var GetSkillResponse_Skills = {
  "skillId": 0,
  "skillName": "",
  "mediaTypeId": 0,
  "mediaTypeName": "",
  "isActive": true,
  "campaignId": 0,
  "campaignName": "",
  "notes": "",
  "acwTypeId": "1",
  "stateIdACW": 0,
  "stateNameACW": "",
  "maxSecondsACW": 0,
  "acwPostTimeoutStateId": 0,
  "acwPostTimeoutStateName": "",
  "requireDisposition": true,
  "allowSecondaryDispositions": true,
  "scriptDisposition": true,
  "agentRestTime": 0,
  "makeTranscriptAvailable": true,
  "transcriptFromAddress": "",
  "displayThankyou": true,
  "thankYouLink": "",
  "popThankYou": true,
  "popThankYouURL": "",
  "isOutbound": true,
  "outboundStrategy": "",
  "isRunning": true,
  "priorityBlending": true,
  "callerIdOverride": "",
  "scriptId": 0,
  "scriptName": "",
  "emailFromAddress": "",
  "emailFromEditable": true,
  "emailBccAddress": "",
  "emailParking": true,
  "chatWarningThreshold": 0,
  "agentTypingIndicator": true,
  "patronTypingPreview": true,
  "interruptible": true,
  "callSuppressionScriptId": 0,
  "reSkillHours": 0,
  "reSkillHoursName": "",
  "countReSkillHours": true,
  "minWFIAgents": 0,
  "minWfiAvailableAgents": 0,
  "useScreenPops": true,
  "screenPopTriggerEvent": "",
  "useCustomScreenPops": true,
  "screenPopDetail": "",
  "minWorkingTime": 0,
  "agentless": true,
  "agentlessPorts": "",
  "initialPriority": 0,
  "acceleration": 0,
  "maxPriority": 0,
  "serviceLevelThreshold": 0,
  "serviceLevelGoal": 0,
  "enableShortAbandon": true,
  "shortAbandonThreshold": 0,
  "countShortAbandons": true,
  "countOtherAbandons": true,
  "messageTempateId": 0,
  "smsTransportCodeID": 0,
  "smsTransportCode": "",
  "dispositions": [
    {
      "dispositionId": 0,
      "dispositionName": "",
      "priority": 0,
      "isPreviewDisposition": true
    }
  ],
  "deliverMultipleNumbersSerially": true,
  "cradleToGrave": true,
  "priorityInterrupt": true
};
export var GetSkillsRequest_Skills = {
  "updatedSince": "",
  "mediaTypeId": "",
  "outboundStrategy": "",
  "isActive": "",
  "searchString": "",
  "fields": "",
  "skip": "",
  "top": "",
  "orderBy": ""
};
export var GetSkillsResponse_Skills = {
  "_links": {
    "self": "",
    "next": "",
    "previous": ""
  },
  "businessUnitId": 0,
  "lastPollTime": "",
  "totalRecords": 0,
  "skills": [
    {
      "skillId": 0,
      "skillName": "",
      "mediaTypeId": 0,
      "mediaTypeName": "",
      "isActive": true,
      "campaignId": 0,
      "campaignName": "",
      "notes": "",
      "acwTypeId": 0,
      "stateIdACW": 0,
      "stateNameACW": "",
      "maxSecondsACW": 0,
      "acwPostTimeoutStateId": 0,
      "acwPostTimeoutStateName": "",
      "requireDisposition": true,
      "allowSecondaryDisposition": true,
      "scriptDisposition": true,
      "agentRestTime": 0,
      "makeTranscriptAvailable": true,
      "transcriptFromAddress": "",
      "displayThankyou": true,
      "thankYouLink": "",
      "popThankYou": true,
      "popThankYouURL": "",
      "isOutbound": true,
      "outboundStrategy": "",
      "isRunning": true,
      "priorityBlending": true,
      "callerIdOverride": "",
      "scriptId": 0,
      "scriptName": "",
      "emailFromAddress": "",
      "emailFromEditable": true,
      "emailBccAddress": "",
      "emailParking": true,
      "chatWarningThreshold": 0,
      "agentTypingIndicator": true,
      "patronTypingPreview": true,
      "interruptible": true,
      "callSuppressionScriptId": 0,
      "reskillHours": 0,
      "reskillHoursName": "",
      "countReskillHours": true,
      "minWFIAgents": 0,
      "useScreenPops": true,
      "screenPopTriggerEvent": "",
      "useCustomScreenPops": true,
      "screenPopDetail": "",
      "minWorkingTime": 0,
      "agentless": true,
      "agentlessPorts": 0,
      "initialPriority": 0,
      "acceleration": 0,
      "maxPriority": 0,
      "serviceLevelThreshold": 0,
      "serviceLevelGoal": 0,
      "enableShortAbandon": true,
      "shortAbandonThreshold": 0,
      "countShortAbandons": true,
      "countOtherAbandons": true,
      "messageTemplateId": 0,
      "smsTransportCodeId": 0,
      "smsTransportCode": "",
      "dispositions": [
        {
          "dispositionId": 0,
          "dispositionName": "",
          "priority": 0,
          "isPreviewDisposition": true
        }
      ],
      "deliverMultipleNumbersSerially": true,
      "cradleToGrave": true,
      "priorityInterrupt": true
    }
  ]
};
export var GetSummaryContactsAllSkillRequest_Skills = {
  "startDate": "",
  "endDate": ""
};
export var GetSummaryContactsAllSkillResponse_Skills = {
  "SkillCallData": {
    "SkillName": "",
    "SkillId": 0,
    "BusinessUnitId": 0,
    "EnteredQueueContacts": 0,
    "OfferedContacts": 0,
    "AnsweredContacts": 0,
    "AnsweredServiceLevelContacts": 0,
    "AbandonedContacts": 0,
    "AbandonedTime": 0,
    "AverageAbandonedTime": 0,
    "AverageACDTime": 0,
    "AverageHandleTime": 0,
    "AverageSpeedAnswerTime": 0
  }
};
export var GetSummaryContactsAllSkillsRequest_Skills = {
  "startDate": "",
  "endDate": ""
};
export var GetSummaryContactsAllSkillsResponse_Skills = {
  "SkillCallData": {
    "SkillName": "",
    "SkillId": 0,
    "BusinessUnitId": 0,
    "EnteredQueueContacts": 0,
    "OfferedContacts": 0,
    "AnsweredContacts": 0,
    "AnsweredServiceLevelContacts": 0,
    "AbandonedContacts": 0,
    "AbandonedTime": 0,
    "AverageAbandonedTime": 0,
    "AverageACDTime": 0,
    "AverageHandleTime": 0,
    "AverageSpeedAnswerTime": 0
  }
};
export var GetTagsRequest_Skills = {

};
export var GetTagsResponse_Skills = {
  "resultSet": {
    "skillId": 0,
    "skillName": "",
    "tags": [
      {
        "tagId": 0,
        "tagName": "",
        "isActive": true,
        "notes": ""
      }
    ]
  }
};
export var GetUnassignedDispositionsRequest_Skills = {
  "fields": "",
  "searchString": "",
  "orderBy": "",
  "skip": "",
  "top": ""
};
export var GetUnassignedDispositionsResponse_Skills = {
  "totalRecords": 0,
  "dispositions": [
    {
      "dispositionId": 0,
      "dispositionName": "",
      "displayOrder": 0,
      "classification": "",
      "reportingGroup": "",
      "systemOutcome": "",
      "requireCommitmentAmount": true,
      "requireRescheduleDate": true,
      "agentSpecific": true,
      "isPreviewDisposition": true
    }
  ]
};
export var GetXSConfigurationSkillRequest_Skills = {
  "fields": ""
};
export var GetXSConfigurationSkillResponse_Skills = {

};
export var RemoveSkillAssignmentRequest_Skills = {
  "agents": [
    {
      "agentId": 0
    }
  ]
};
export var RemoveSkillAssignmentResponse_Skills = {
  "resultSet": {
    "errorCount": 0,
    "agentResults": [
      {
        "success": true,
        "agentId": 0,
        "error": true
      }
    ]
  }
};
export var RemoveTagsRequest_Skills = {
  "tags": [
    {
      "tagId": 0
    }
  ]
};
export var RemoveTagsResponse_Skills = {
  "resultSet": {
    "errorCount": 0,
    "tagResults": [
      {
        "success": true,
        "tagId": 0,
        "error": ""
      }
    ]
  }
};
export var SetCampaignSkillsRequest_Skills = {
	"skills": [
		{
			"skillId": 0
		}
	]
};
export var SetCampaignSkillsResponse_Skills = {
	"errorCount": 0,
	"results": [
		{
			"success": true,
			"skillId": 0,
			"error": ""
		}
	]
};
export var StartPersonalConnectionSkillRequest_Skills = {

};
export var StartPersonalConnectionSkillResponse_Skills = {

};
export var StopPersonalConnectionSkillRequest_Skills = {
  "force": false
};
export var StopPersonalConnectionSkillResponse_Skills = {

};
export var UpdateAgentAssignedSkillRequest_Skills = {
  "agents": [
    {
      "agentId": 0,
      "isActive": true,
      "proficency": 1
    }
  ]
};
export var UpdateAgentAssignedSkillResponse_Skills = {
  "resultSet": {
    "errorCount": 0,
    "agentResults": [
      {
        "success": true,
        "agentId": 0,
        "error": true
      }
    ]
  }
};
export var UpdateCampaignRequest_Skills = {
	"campaign": {
		"campaignName": "",
		"isActive": true,
		"description": "",
		"notes": ""
	}
};
export var UpdateCampaignResponse_Skills = {
};
export var UpdateCPAManagementConfigurationSkillRequest_Skills = {
  "cpaSettings": {
    "abandonMessagePath": "",
    "abandonMsgMode": 0,
    "abandonTimeout": 0,
    "agentNoResponseSeconds": 0,
    "agentOverrideOptionAnsweringMachine": true,
    "agentOverrideOptionBadNumber": true,
    "agentOverrideOptionFax": true,
    "agentResponseUtteranceMinimumSeconds": 0,
    "agentVoiceThreshold": 0,
    "ansMachineDetMode": 0,
    "ansMachineMsg": "",
    "customerLiveSilenceSeconds": 0,
    "customerVoiceThreshold": 0,
    "enableCPALogging": true,
    "exceptions": [
      {
        "attempt_No": 0,
        "ansMachineDetMode": 0,
        "ansMachineMsg": ""
      }
    ],
    "machineEndSilenceSeconds": 0,
    "machineEndTimeoutSeconds": 0,
    "machineMinimumWithAgentSeconds": 0,
    "machineMinimumWithoutAgentSeconds": 0,
    "preConnectCPAEnabled": true,
    "preConnectCPARecording": true,
    "treatProgressAsRinging": true,
    "utteranceMinimumSeconds": 0
  }
};
export var UpdateCPAManagementConfigurationSkillResponse_Skills = {

};
export var UpdateDeliveryPreferencesConfigurationSkillRequest_Skills = {
  "deliveryPreferences": {
    "confirmationRequiredDisabled": true,
    "confirmationRequiredDeliveryType": 0,
    "confirmationRequiredTimeout": 0,
    "confirmationRequiredTimeoutSubsequent": 0,
    "confirmationRequiredDefaultAccept": true,
    "confirmationRequiredDefault": true,
    "complianceRecordsDisabled": true,
    "complianceRecordsDeliveryType": 0,
    "complianceRecordsTimeout": 0,
    "complianceRecordsTimeoutSubsequent": 0,
    "complianceRecordsDefaultAccept": true,
    "showComplianceButtonReschedule": true,
    "showComplianceButtonRequeue": true,
    "showComplianceButtonSnooze": true,
    "showComplianceButtonDisposition": true,
    "showPreviewButtonReschedule": true,
    "showPreviewButtonRequeue": true,
    "showPreviewButtonSnooze": true,
    "showPreviewButtonDisposition": true
  }
};
export var UpdateDeliveryPreferencesConfigurationSkillResponse_Skills = {

};
export var UpdateOutboundSkillGeneralSettingsRequest_Skills = {
  "generalSettings": {
    "minimumRetryMinutes": 0,
    "maximumAttempts": 0,
    "defaultContactExpiration": 0,
    "maximumRingingDuration": 0,
    "beginDampenPercentage": 0,
    "abandonRateCutoff": 0,
    "abandonRateThreshold": 0,
    "inactiveBlenderTimer": 0,
    "maximumRatio": 0,
    "aggressiveness": "",
    "endOfListNotificationsDelay": 0,
    "notifyAgentsWhenListIsEmpty": true,
    "percentageOfAgentsBeforeOverdial": 0,
    "blockMultipleCalls": true,
    "consecutiveAttemptsWithoutALiveConnect": 0,
    "enableDialingByProficiency": true,
    "proficiencyFactor": 0,
    "waitTimeFactor": 0,
    "maxConcurrentCallsPerAgent": 0,
    "maxWaitTimeSeconds": 0
  }
};
export var UpdateOutboundSkillGeneralSettingsResponse_Skills = {

};
export var UpdateRetrySettingsSkillRequest_Skills = {
  "retrySettings": {
    "loadNonFresh": true,
    "finalizeWhenExhausted": true,
    "maximumAttempts": 0,
    "minimumRetryMinutes": 0,
    "maximumNumberOfHandledCalls": 0,
    "restrictedCallingMinutes": 0,
    "restrictedCallingMaxAttempts": 0,
    "generalStaleMinutes": 0,
    "callbackRestMinutes": 0,
    "releaseAgentSpecificCalls": true,
    "maximumNumberOfCallbacks": 0,
    "callbackStaleMinutes": 0
  }
};
export var UpdateRetrySettingsSkillResponse_Skills = {

};
export var UpdateScheduleSettingsSkillRequest_Skills = {
  "scheduleSettings": {
    "isScheduled": true,
    "sundayStartTime": "",
    "sundayEndTime": "",
    "sundayIsActive": true,
    "mondayStartTime": "",
    "mondayEndTime": "",
    "mondayIsActive": true,
    "tuesdayStartTime": "",
    "tuesdayEndTime": "",
    "tuesdayIsActive": true,
    "wednesdayStartTime": "",
    "wednesdayEndTime": "",
    "wednesdayIsActive": true,
    "thursdayStartTime": "",
    "thursdayEndTime": "",
    "thursdayIsActive": true,
    "fridayStartTime": "",
    "fridayEndTime": "",
    "fridayIsActive": true,
    "saturdayStartTime": "",
    "saturdayEndTime": "",
    "saturdayIsActive": true
  }
};
export var UpdateScheduleSettingsSkillResponse_Skills = {

};
export var UpdateSkillRequest_Skills = {
  "skill": {
    "skillName": "",
    "campaignId": 0,
    "callerIdOverride": "",
    "emailFromAddress": "",
    "emailFromEditable": true,
    "emailBccAddress": "",
    "scriptId": 0,
    "reskillHours": 0,
    "minWfiAgents": 0,
    "minWfiAvailableAgents": 0,
    "interruptible": true,
    "enableParking": true,
    "minWorkingTime": 0,
    "agentless": true,
    "agentlessPorts": 0,
    "notes": "",
    "acwTypeId": 0,
    "requireDisposition": true,
    "allowSecondaryDisposition": true,
    "scriptDisposition": true,
    "stateIdAcw": 0,
    "maxSecondsAcw": 0,
    "agentRestTime": 0,
    "displayThankYou": true,
    "thankYouLink": "",
    "popThankYou": true,
    "popThankYouUrl": "",
    "makeTranscriptAvailable": true,
    "transcriptFromAddress": "",
    "priorityBlending": true,
    "callSuppressionScriptId": 0,
    "useScreenPops": true,
    "screenPopTriggerEvent": 0,
    "useCustomScreenPops": true,
    "screenPopType": "",
    "screenPopDetails": "",
    "initialPriority": 0,
    "acceleration": 0,
    "maxPriority": 0,
    "serviceLevelThreshold": 0,
    "serviceLevelGoal": 0,
    "enableShortAbandon": true,
    "shortAbandonThreshold": 0,
    "countShortAbandons": true,
    "countOtherAbandons": true,
    "chatWarningThreshold": 0,
    "agentTypingIndicator": true,
    "smsTransportCodeId": 0,
    "messageTemplateId": 0,
    "dispositions": [
      {
        "dispositionId": 0,
        "priority": 0
      }
    ]
  }
};
export var UpdateSkillResponse_Skills = {

};
export var UpdateXSConfigurationSkillRequest_Skills = {
  "xsSettings": {
    "xsScriptID": 0,
    "xsCheckinScriptID": 0,
    "externalOutboundSkill_No": "",
    "xsSkillChangedActive": true,
    "xsGetContactsActive": true,
    "xsFreshThreshold": 0,
    "xsAvailableThreshold": 0,
    "xsReadyThreshold": 0,
    "xsNumberToRetrieve": 0
  }
};
export var UpdateXSConfigurationSkillResponse_Skills = {

};
export var BargeOnAgentRequest_Supervisor = {

};
export var BargeOnAgentResponse_Supervisor = {

};
export var CoachAgentRequest_Supervisor = {

};
export var CoachAgentResponse_Supervisor = {

};
export var MonitorAgentRequest_Supervisor = {
  "targetAgentId": 0
};
export var MonitorAgentResponse_Supervisor = {

};
export var TakeOverAgentRequest_Supervisor = {

};
export var TakeOverAgentResponse_Supervisor = {

};
export var EndVoicemailContactRequest_Voicemails = {

};
export var EndVoicemailContactResponse_Voicemails = {

};
export var PauseVoicemailRequest_Voicemails = {

};
export var PauseVoicemailResponse_Voicemails = {

};
export var PlayVoicemailRequest_Voicemails = {
  "playTimestamp": false,
  "position": 0
};
export var PlayVoicemailResponse_Voicemails = {

};
export var TransferVoicemailToAgentRequest_Voicemails = {
  "targetAgentId": 0
};
export var TransferVoicemailToAgentResponse_Voicemails = {

};
export var TransferVoicemailToSkillRequest_Voicemails = {
  "targetSkillId": 0
};
export var TransferVoicemailToSkillResponse_Voicemails = {

};
export var AdherenceStatisticsRequest_WFMData = {
  "fields": "",
  "startDate": "",
  "endDate": ""
};
export var AdherenceStatisticsResponse_WFMData = {
  "agentStateHistory": [
    {
      "businessUnitId": 0,
      "businessUnitName": "",
      "agentId": 0,
      "stateIndex": 0,
      "startDate": "",
      "agentStateId": 0,
      "agentSessionId": 0,
      "skillId": 0,
      "outStateId": 0,
      "outStateDescription": "",
      "duration": 0
    }
  ]
};
export var AgentMetadataRequest_WFMData = {
  "fields": "",
  "startDate": "",
  "endDate": ""
};
export var AgentMetadataResponse_WFMData = {
  "wfM_Data_Agents": [
    {
      "agentNo": 0,
      "teamName": "",
      "teamNo": 0,
      "businessUnitId": 0,
      "businessUnitName": "",
      "firstName": "",
      "middleName": "",
      "lastName": "",
      "status": "",
      "createDate": "",
      "modDateTime": "",
      "productId": 0,
      "ntLoginName": ""
    }
  ]
};
export var AgentPerformanceRequest_WFMData = {
  "fields": "",
  "startDate": "",
  "endDate": ""
};
export var AgentPerformanceResponse_WFMData = {
  "businessUnitId": 0,
  "businessUnitName": "",
  "skillId": 0,
  "skillName": "",
  "agentId": 0,
  "firstName": "",
  "lastName": "",
  "halfHour": 0,
  "totalHandled": 0,
  "totalHandledTime": 0,
  "totalACWTime": 0
};
export var ContactStatisticsRequest_WFMData = {
  "fields": "",
  "startDate": "",
  "endDate": "",
  "mediaTypeId": ""
};
export var ContactStatisticsResponse_WFMData = {
  "businessUnitId": 0,
  "businessUnitName": "",
  "intervalStartDate": "",
  "skillId": 0,
  "skillName": "",
  "isOutbound": true,
  "serviceLevel": 0,
  "mediaTypeId": 0,
  "MediaTypeName": "",
  "totalContacts": 0,
  "totalHandled": 0,
  "averageHandleTime": 0,
  "abandonCount": 0,
  "averageSpeedOfAnswer": 0,
  "totalContactTime": 0
};
export var DailerContactStatisticsRequest_WFMData = {
  "fields": "",
  "startDate": "",
  "endDate": "",
  "mediaTypeId": ""
};
export var DailerContactStatisticsResponse_WFMData = {
  "wfM_OB_StatsV9": [
    {
      "businessUnitId": 0,
      "businessUnitName": "",
      "intervalStartDate": "",
      "skillId": 0,
      "skillName": "",
      "mediaTypeId": 0,
      "mediaTypeName": "",
      "dials": 0,
      "connects": 0,
      "connectsAHT": 0,
      "rightPartyConnects": 0,
      "rightPartyConnectsAHT": 0,
      "abandons": 0
    }
  ]
};
export var ScorecardStatisticsRequest_WFMData = {
  "fields": "",
  "startDate": "",
  "endDate": ""
};
export var ScorecardStatisticsResponse_WFMData = {
  "agentStateHistory": [
    {
      "businessUnitId": 0,
      "businessUnitName": "",
      "agentId": 0,
      "stateIndex": 0,
      "startDate": "",
      "agentStateId": 0,
      "agentSessionId": 0,
      "skillId": 0,
      "outStateId": 0,
      "outStateDescription": "",
      "duration": 0
    }
  ]
};
export var CreateWorkItemRequest_WorkItem = {
  "pointOfContact": "",
  "workItemId": "",
  "workItemPayload": "",
  "workItemType": "",
  "from": ""
};
export var CreateWorkItemResponse_WorkItem = {

};
export var AcceptRequest_WorkItems = {

};
export var AcceptResponse_WorkItems = {

};
export var EndRequest_WorkItems = {

};
export var EndResponse_WorkItems = {

};
export var HoldRequest_WorkItems = {

};
export var HoldResponse_WorkItems = {

};
export var RejectRequest_WorkItems = {

};
export var RejectResponse_WorkItems = {

};
export var ResumeRequest_WorkItems = {

};
export var ResumeResponse_WorkItems = {

};
export var AgentError_Event = {
	"IISHost": "",
	"VCHost": "",
	"Type": "",
	"Command": "",
	"ResultCode": "",
	"ContactID": 2200339882,
	"Target": "",
	"ErrorLevel": ""
};
export var AgentLeg_Event = {
	"IISHost": "",
	"VCHost": "",
	"Type": "",
	"AgentLegId": 2200339882,
	"Status": "",
	"FinalState": true
};
export var AgentSessionEnd_Event = {
	"IISHost": "",
	"VCHost": "",
	"Type": "",
	"Success": true,
	"Message": ""
};
export var AgentSessionStart_Event = {
	"IISHost": "",
	"VCHost": "",
	"Type": "",
	"BusNo": 4500,
	"AgentId": 12214,
	"SessionId": "",
	"StationPhoneNumber": "",
	"StationCallerId": "",
	"DialerCampaign": "",
	"DialerCampaignStartTime": "2020-07-26T23:59:59.678Z",
	"SupervisorPermissionLevel": 4,
	"CanMask": true,
	"AgentSchedulePermission": true,
	"ScoreRecordingsPermission": true,
	"HideAgentStatePermission": true,
	"CanMultiPartyConference": true
};
export var AgentState_Event = {
	"IISHost": "",
	"VCHost": "",
	"Type": "",
	"CurrentState": "",
	"CurrentOutReason": "",
	"NextStates": [
		{
			"State": "",
			"OutReason": ""
		}
	],
	"StartTimeUTC": "2020-07-26T23:59:59.678Z",
	"IsAcw": true,
	"AcwTimeout": 0
};
export var CallContactEvent_Event = {
	"IISHost": "",
	"VCHost": "",
	"Type": "",
	"ContactID": 15698155676564,
	"Status": "",
	"OriginalState": true,
	"CallType": "",
	"DNIS": "",
	"ANI": "",
	"Skill": 1507,
	"IsInbound": true,
	"StartTimeUTC": "2020-07-26T23:59:59.678Z",
	"LastStateChangeTimeUTC": "2020-07-26T23:59:59.678Z",
	"ScreenPopUrl": "",
	"DisconnectCode": "",
	"IsLogging": true,
	"Timeout": 45,
	"AllowDispositions": true,
	"Label": "",
	"IsLinked": true,
	"TimeZones": "",
	"FinalState": true,
	"OtherInformation": "",
	"BlendingToSkillName": ""
};
export var ChatContactEvent_Event = {
	"IISHost": "",
	"VCHost": "",
	"Type": "",
	"ContactID": 156982256565656,
	"RoomId": 2,
	"Status": "",
	"Skill": 1509,
	"StartTime": "2020-07-26T23:59:59.678Z",
	"LastStateChangeTime": "2020-07-26T23:59:59.678Z",
	"ScreenPopUrl": "",
	"RefusalTimeout": 45,
	"IsActive": true,
	"Messages": [
		{
			"Text": "",
			"TimeStamp": "2020-07-26T23:59:59.678Z",
			"PartyType": ""
		}
	],
	"FinalState": true
};
export var ChatText_Event = {
	"IISHost": "",
	"VCHost": "",
	"Type": "",
	"RoomId": 2,
	"Label": "",
	"Message": "",
	"PartyType": "",
	"TimeStamp": "2020-07-26T23:59:59.678Z"
};
export var HoursOfOperation_Event = {
	"IISHost": "",
	"VCHost": "",
	"Type": "",
	"ShowContinueReskill": true
};
export var Indicator_Event = {
	"IISHost": "",
	"VCHost": "",
	"Type": "",
	"Name": "",
	"ImageUri": "",
	"ActionType": "",
	"ActionUri": "",
	"ToolTip": "",
	"IndicatorState": ""
};
export var NaturalCallingSkillList_Event = {
	"IISHost": "",
	"VCHost": "",
	"Type": "",
	"Empty": true
};
export var PageOpen_Event = {
	"IISHost": "",
	"VCHost": "",
	"Type": "",
	"ContactID": 156981945454545,
	"Action": "",
	"PageUri": ""
};
export var RemoteAgentSessionEnd_Event = {
	"IISHost": "",
	"VCHost": "",
	"Type": "",
	"Message": ""
};
export var SupervisorContact_Event = {
	"IISHost": "",
	"VCHost": "",
	"Type": "",
	"ContactID": 6550071587,
	"Status": "",
	"OriginalState": true,
	"CallType": "",
	"DNIS": "",
	"ANI": "",
	"Skill": 50883,
	"IsInbound": true,
	"StartTimeUTC": "2020-07-26T23:59:59.678Z",
	"LastStateChangeTimeUTC": "2020-07-26T23:59:59.678Z",
	"ScreenPopUrl": "",
	"DisconnectCode": "",
	"IsLogging": true,
	"Timeout": 45,
	"AllowDispositions": true,
	"Label": "",
	"IsLinked": true,
	"TimeZones": "",
	"FinalState": true,
	"OtherInformation": ""
};
export var SupervisorMonitor_Event = {
	"IISHost": "",
	"VCHost": "",
	"Type": "",
	"MonitorStartTime": "2020-07-26T23:59:59.678Z",
	"TargetAgentId": 9011,
	"FinalState": true
};
export var TakeOver_Event = {
	"IISHost": "",
	"VCHost": "",
	"Type": "",
	"ContactID": 15698224565454645,
	"TakeOverDate": "2020-07-26T23:59:59.678Z"
};
export var WorkItemContactEvent_Event = {
	"IISHost": "",
	"VCHost": "",
	"Type": "",
	"ContactID": 156981956564545,
	"Status": "",
	"WorkItemId": 3920,
	"WorkItemPayload": "",
	"WorkItemType": "",
	"AgentId": 1218,
	"SkillId": 1528,
	"StartTimeUTC": "2020-07-26T23:59:59.678Z",
	"LastStateChangeTimeUTC": "2020-07-26T23:59:59.678Z",
	"ScreenPopUrl": "",
	"ScreenPopUrlVariables": [
		{
			"variable2": ""
		},
		{
			"variable3": ""
		}
	],
	"RefusalTimeout": 45,
	"FinalState": true
};
