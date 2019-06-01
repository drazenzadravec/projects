"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignEntitiesRequest_AddressBook = {
    "entityType": "",
    "addressBookAssignments": [
        {
            "entityId": 0
        }
    ]
};
exports.AssignEntitiesResponse_AddressBook = {
    "assignResults": [
        {
            "success": true,
            "entityId": 0,
            "error": "",
            "entityType": ""
        }
    ]
};
exports.CreateDynamicEntitiesRequest_AddressBook = {
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
exports.CreateDynamicEntitiesResponse_AddressBook = {
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
exports.CreateRequest_AddressBook = {
    "addressBookName": "",
    "addressBookType": ""
};
exports.CreateResponse_AddressBook = {
    "resultSet": {
        "addressBookId": 0,
        "addressBookType": "",
        "addressBookName": ""
    }
};
exports.CreateStandardEntitiesRequest_AddressBook = {
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
exports.CreateStandardEntitiesResponse_AddressBook = {
    "entryResults": [
        {
            "success": true,
            "addressBookEntryId": 0,
            "error": ""
        }
    ]
};
exports.DynamicEntitiesRequest_AddressBook = {
    "fields": "",
    "top": "",
    "skip": "",
    "orderBy": "",
    "fullLoad": "",
    "updatedSince": "",
    "searchString": ""
};
exports.DynamicEntitiesResponse_AddressBook = {
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
exports.GetAgentsRequest_AddressBook = {
    "includeEntries": true,
    "updatedSince": ""
};
exports.GetAgentsResponse_AddressBook = {
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
exports.GetCampaignsRequest_AddressBook = {
    "includeEntries": true,
    "updatedSince": ""
};
exports.GetCampaignsResponse_AddressBook = {
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
exports.GetResponse_AddressBook = {
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
exports.GetSkillsRequest_AddressBook = {
    "includeEntries": true,
    "updatedSince": ""
};
exports.GetSkillsResponse_AddressBook = {
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
exports.GetTeamsRequest_AddressBook = {
    "includeEntries": true,
    "updatedSince": ""
};
exports.GetTeamsResponse_AddressBook = {
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
exports.StandardEntitiesRequest_AddressBook = {
    "searchString": "",
    "fields": "",
    "skip": "",
    "top": "",
    "orderBy": "",
    "updatedSince": ""
};
exports.StandardEntitiesResponse_AddressBook = {
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
exports.UpdateStandardEntitiesRequest_AddressBook = {
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
exports.UpdateStandardEntitiesResponse_AddressBook = {
    "entryResults": [
        {
            "success": true,
            "addressBookEntryId": 0,
            "error": ""
        }
    ]
};
exports.DialAgentPhoneRequest_AgentPhone = {};
exports.DialAgentPhoneResponse_AgentPhone = {};
exports.EndAgentPhoneCallRequest_AgentPhone = {};
exports.EndAgentPhoneCallResponse_AgentPhone = {};
exports.MuteAgentPhoneRequest_AgentPhone = {};
exports.MuteAgentPhoneResponse_AgentPhone = {};
exports.UnMuteAgentPhoneRequest_AgentPhone = {};
exports.UnMuteAgentPhoneResponse_AgentPhone = {};
exports.ChangeSkillForAgentRequest_Agents = {
    "skills": [
        {
            "skillId": 0,
            "proficiency": 0,
            "isActive": true
        }
    ]
};
exports.ChangeSkillForAgentResponse_Agents = {
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
exports.CreateAccessKeyRequest_Agents = {
    "agentId": 0
};
exports.CreateAccessKeyResponse_Agents = {
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
exports.CreateAgentMessageRequest_Agents = {
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
exports.CreateAgentMessageResponse_Agents = {
    "errorCount": 0,
    "agentMessageResults": [
        {
            "agentMessageId": 0,
            "success": true,
            "error": ""
        }
    ]
};
exports.CreateAgentRequest_Agents = {
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
exports.CreateAgentResponse_Agents = {
    "errorCount": 0,
    "results": [
        {
            "success": true,
            "teamId": 0,
            "error": ""
        }
    ]
};
exports.CreateCustomAgentEventRequest_Agents = {
    "eventName": "",
    "persistInMemory": false,
    "data": ""
};
exports.CreateCustomAgentEventResponse_Agents = {};
exports.CreateTeamRequest_Agents = {
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
exports.CreateTeamResponse_Agents = {
    "errorCount": 0,
    "results": [
        {
            "success": true,
            "teamId": 0,
            "error": ""
        }
    ]
};
exports.DeleteAccessKeyRequest_Agents = {};
exports.DeleteAccessKeyResponse_Agents = {};
exports.DeleteAgentMessageRequest_Agents = {};
exports.DeleteAgentMessageResponse_Agents = {};
exports.EndAgentSessionRequest_Agents = {};
exports.EndAgentSessionResponse_Agents = {};
exports.GetAccessKeyRequest_Agents = {};
exports.GetAccessKeyResponse_Agents = {
    "accessKey": {
        "accessKeyId": "",
        "agentId": 0,
        "billingId": 0,
        "isActive": true,
        "lastUsedDate": ""
    }
};
exports.GetAccessKeysRequest_Agents = {
    "fields": "",
    "agentId": "",
    "orderBy": "",
    "skip": "",
    "top": ""
};
exports.GetAccessKeysResponse_Agents = {
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
exports.GetAgentContactsBySkillRequest_Agents = {
    "startDate": "",
    "endDate": ""
};
exports.GetAgentContactsBySkillResponse_Agents = {
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
exports.GetAgentDialingPatternsRequest_Agents = {};
exports.GetAgentDialingPatternsResponse_Agents = {
    "dialingPatterns": [
        {
            "patternId": 0,
            "patternName": "",
            "input": "",
            "output": ""
        }
    ]
};
exports.GetAgentIndicatorRequest_Agents = {};
exports.GetAgentIndicatorResponse_Agents = {
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
exports.GetAgentMessageRequest_Agents = {};
exports.GetAgentMessageResponse_Agents = {
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
exports.GetAgentQuickRepliesRequest_Agents = {};
exports.GetAgentQuickRepliesResponse_Agents = {
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
exports.GetAgentRequest_Agents = {
    "fields": ""
};
exports.GetAgentResponse_Agents = {
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
exports.GetAgentsContactsBySkillRequest_Agents = {
    "startDate": "",
    "endDate": ""
};
exports.GetAgentsContactsBySkillResponse_Agents = {
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
exports.GetAgentsRequest_Agents = {
    "updatedSince": "",
    "isActive": "",
    "searchString": "",
    "fields": "",
    "skip": "",
    "top": "",
    "orderBy": ""
};
exports.GetAgentsResponse_Agents = {
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
exports.GetAgentStatesRequest_Agents = {};
exports.GetAgentStatesResponse_Agents = {
    "agentStates": [
        {
            "agentStateId": 0,
            "agentStateName": ""
        }
    ]
};
exports.GetGroupsAgentAssignedRequest_Agents = {
    "fields": ""
};
exports.GetGroupsAgentAssignedResponse_Agents = {
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
exports.GetOutstatesValidForTeamRequest_Agents = {
    "activeOnly": ""
};
exports.GetOutstatesValidForTeamResponse_Agents = {
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
exports.GetQuickRepliesRequest_Agents = {};
exports.GetQuickRepliesResponse_Agents = {
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
exports.GetSkillsAssignedToAgentRequest_Agents = {
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
exports.GetSkillsAssignedToAgentResponse_Agents = {
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
exports.GetSkillsAssignedToAgentsRequest_Agents = {
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
exports.GetSkillsAssignedToAgentsResponse_Agents = {
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
exports.GetSkillsNotAssignedToAgentRequest_Agents = {
    "fields": "",
    "searchString": "",
    "mediaTypeId": "",
    "outboundStrategy": "",
    "isSkillActive": "",
    "skip": "",
    "top": "",
    "orderBy": ""
};
exports.GetSkillsNotAssignedToAgentResponse_Agents = {
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
exports.GetTeamAgentsRequest_Agents = {
    "fields": "",
    "searchString": "",
    "skip": "",
    "top": "",
    "orderBy": "",
    "updatedSince": ""
};
exports.GetTeamAgentsResponse_Agents = {
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
exports.GetTeamRequest_Agents = {
    "fields": ""
};
exports.GetTeamResponse_Agents = {
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
exports.GetTeamsAgentsRequest_Agents = {
    "fields": "",
    "updatedSince": ""
};
exports.GetTeamsAgentsResponse_Agents = {
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
exports.GetTeamsRequest_Agents = {
    "fields": "",
    "updatedSince": "",
    "isActive": "",
    "searchString": "",
    "skip": "",
    "top": "",
    "orderBy": ""
};
exports.GetTeamsResponse_Agents = {
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
exports.RemoveAgentsFromTeamRequest_Agents = {
    "transferTeamId": 0,
    "agents": [
        {
            "agentId": 0
        }
    ]
};
exports.RemoveAgentsFromTeamResponse_Agents = {
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
exports.RemoveSkillAssignedToAgentRequest_Agents = {
    "skills": [
        {
            "skillId": 0
        }
    ]
};
exports.RemoveSkillAssignedToAgentResponse_Agents = {
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
exports.RemoveUnavailableCodesFromTeamRequest_Agents = {
    "codes": [
        {
            "outstateId": 0
        }
    ]
};
exports.RemoveUnavailableCodesFromTeamResponse_Agents = {
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
exports.SetAgentStateRequest_Agents = {
    "state": "",
    "outStateId": 0
};
exports.SetAgentStateResponse_Agents = {};
exports.SetSkillsToAgentRequest_Agents = {
    "skills": [
        {
            "skillId": 0,
            "proficiency": 0,
            "isActive": true
        }
    ]
};
exports.SetSkillsToAgentResponse_Agents = {
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
exports.SetTeamAgentsRequest_Agents = {
    "agents": [
        {
            "agentId": 0
        }
    ]
};
exports.SetTeamAgentsResponse_Agents = {
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
exports.SetUnavailableCodesToTeamRequest_Agents = {
    "codes": [
        {
            "outstateId": 0
        }
    ]
};
exports.SetUnavailableCodesToTeamResponse_Agents = {
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
exports.SetUnavailableCodeToTeamsRequest_Agents = {
    "SecurityUser": "",
    "teams": [
        {
            "teamId": 0
        }
    ]
};
exports.SetUnavailableCodeToTeamsResponse_Agents = {
    "error": "",
    "error_Description": ""
};
exports.UpdateAccessKeyRequest_Agents = {
    "isActive": false
};
exports.UpdateAccessKeyResponse_Agents = {};
exports.UpdateAgentRequest_Agents = {
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
exports.UpdateAgentResponse_Agents = {};
exports.UpdateTeamRequest_Agents = {
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
exports.UpdateTeamResponse_Agents = {};
exports.UpdateUnavailableCodeRequest_Agents = {
    "unavailableCodeName": "",
    "postContact": true,
    "agentTimeout": 0,
    "isActive": true
};
exports.UpdateUnavailableCodeResponse_Agents = {};
exports.UpdateUnavailableCodesForTeamRequest_Agents = {
    "unavailableCodes": [
        {
            "outStateId": 0
        }
    ]
};
exports.UpdateUnavailableCodesForTeamResponse_Agents = {};
exports.RefreshTokenRequest_Auth = {
    "grant_type": "",
    "refresh_token": "",
    "refresh_token_server_uri": ""
};
exports.RefreshTokenResponse_Auth = {
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
exports.TokenClientRequest_Auth = {
    "grant_type": "",
    "scope": ""
};
exports.TokenClientResponse_Auth = {
    "access_token": "",
    "token_type": "",
    "expires_in": 3600,
    "resource_server_base_uri": "",
    "scope": "",
    "agent_id": 645328,
    "team_id": 103748
};
exports.TokenImplicitRequest_Auth = {
    "state": "",
    "response_type": "",
    "client_id": "",
    "redirect_uri": "",
    "scope": ""
};
exports.TokenImplicitResponse_Auth = {
    "state": "",
    "scope": "",
    "access_token": "",
    "token_type": "",
    "expires_in": 5184000,
    "resource_server_base_uri": ""
};
exports.TokenPasswordRequest_Auth = {
    "grant_type": "",
    "username": "",
    "password": "",
    "scope": ""
};
exports.TokenPasswordResponse_Auth = {
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
exports.UserCreateAccessKeyRequest_Auth = {
    "userId": "",
    "tenantId": ""
};
exports.UserCreateAccessKeyResponse_Auth = {
    "accessKey": {
        "accessKeyId": "",
        "accessKeySecret": "",
        "userId": "",
        "tenantId": "",
        "isActive": true
    }
};
exports.UserGenerateTokenRequest_Auth = {
    "accessKeyId": "",
    "accessKeySecret": ""
};
exports.UserGenerateTokenResponse_Auth = {
    "access_token": "",
    "token_type": "",
    "expires_in": 3600,
    "refresh_token": "",
    "refresh_token_expires_in": 3600,
    "id_token": ""
};
exports.UserRefreshTokenRequest_Auth = {
    "token": ""
};
exports.UserRefreshTokenResponse_Auth = {
    "token": "",
    "tokenExpirationTimeSec": 3600,
    "refreshToken": "",
    "refreshTokenExpirationTimeSec": 0,
    "sessionId": ""
};
exports.ChangeAgentPasswordRequest_Authenticate = {
    "currentPassword": "",
    "newPassword": ""
};
exports.ChangeAgentPasswordResponse_Authenticate = {
    "noResponse": ""
};
exports.ResetAgentPasswordRequest_Authenticate = {
    "requestedPassword": "",
    "forceChangeOnLogon": false
};
exports.ResetAgentPasswordResponse_Authenticate = {
    "noResponse": ""
};
exports.RequestImmediateCallbackRequest_Callback = {
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
exports.RequestImmediateCallbackResponse_Callback = {};
exports.ScheduleCallbackRequest_Callback = {
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
exports.ScheduleCallbackResponse_Callback = {};
exports.ChatProfileConfigRequest_ChatRequests = {};
exports.ChatProfileConfigResponse_ChatRequests = {
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
exports.EndsActiveChatSessionRequest_ChatRequests = {};
exports.EndsActiveChatSessionResponse_ChatRequests = {
    "errorDescription": ""
};
exports.GetsInboundChatActiveChatSessionRequest_ChatRequests = {
    "timeout": ""
};
exports.GetsInboundChatActiveChatSessionResponse_ChatRequests = {
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
exports.NotifyAgentPatronTypingRequest_ChatRequests = {
    "isTyping": false,
    "isTextEntered": false,
    "label": ""
};
exports.NotifyAgentPatronTypingResponse_ChatRequests = {};
exports.SendsAgentChatPreviewRequest_ChatRequests = {
    "previewText": "",
    "label": ""
};
exports.SendsAgentChatPreviewResponse_ChatRequests = {};
exports.SendsChatTranscriptEmailRequest_ChatRequests = {
    "fromAddress": "",
    "toAddress": "",
    "emailBody": ""
};
exports.SendsChatTranscriptEmailResponse_ChatRequests = {};
exports.SendsTextMembersChatSessionRequest_ChatRequests = {
    "label": "",
    "message": "",
    "chatTarget": ""
};
exports.SendsTextMembersChatSessionResponse_ChatRequests = {};
exports.StartsChatSessionRequest_ChatRequests = {
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
exports.StartsChatSessionResponse_ChatRequests = {
    "chatSessionId": "",
    "contactId": 0
};
exports.AcceptChatContactRequest_ChatRequests1 = {};
exports.AcceptChatContactResponse_ChatRequests1 = {};
exports.AddChatContactRequest_ChatRequests1 = {};
exports.AddChatContactResponse_ChatRequests1 = {};
exports.AddSMSChatContactRequest_ChatRequests1 = {
    "mediaType": 0
};
exports.AddSMSChatContactResponse_ChatRequests1 = {};
exports.EndChatContactRequest_ChatRequests1 = {};
exports.EndChatContactResponse_ChatRequests1 = {};
exports.NotifyPatronAgentTypingRequest_ChatRequests1 = {
    "isTyping": false,
    "isTextEntered": false
};
exports.NotifyPatronAgentTypingResponse_ChatRequests1 = {};
exports.RejectChatContactRequest_ChatRequests1 = {};
exports.RejectChatContactResponse_ChatRequests1 = {};
exports.RestoreChatActiveStateRequest_ChatRequests1 = {};
exports.RestoreChatActiveStateResponse_ChatRequests1 = {};
exports.SendChatTextPatronRequest_ChatRequests1 = {
    "chatText": "",
    "chatTarget": ""
};
exports.SendChatTextPatronResponse_ChatRequests1 = {};
exports.TransferToAgentRequest_ChatRequests1 = {
    "targetAgentId": 0
};
exports.TransferToAgentResponse_ChatRequests1 = {};
exports.TransferToSkillRequest_ChatRequests1 = {
    "targetSkillId": 0
};
exports.TransferToSkillResponse_ChatRequests1 = {};
exports.AssignTagsRequest_Contacts = {
    "tags": [
        {
            "tagId": 0
        }
    ]
};
exports.AssignTagsResponse_Contacts = {
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
exports.CreateSignalRequest_Contacts = {
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
exports.CreateSignalResponse_Contacts = {};
exports.ForceDisconnectRequest_Contacts = {};
exports.ForceDisconnectResponse_Contacts = {};
exports.GetChatTranscriptRequest_Contacts = {};
exports.GetChatTranscriptResponse_Contacts = {
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
exports.GetEmailTranscriptRequest_Contacts = {
    "includeAttachments": ""
};
exports.GetEmailTranscriptResponse_Contacts = {
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
exports.GetFilesRequest_Contacts = {
    "fields": ""
};
exports.GetFilesResponse_Contacts = {
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
exports.GetPastSMSContactsRequest_Contacts = {
    "ani": "",
    "skillId": "",
    "businessUnitId": ""
};
exports.GetPastSMSContactsResponse_Contacts = {};
exports.GetSMSTranscriptRequest_Contacts = {
    "businessUnitId": ""
};
exports.GetSMSTranscriptResponse_Contacts = {};
exports.GetStateRequest_Contacts = {};
exports.GetStateResponse_Contacts = {
    "contactStateDescriptions": [
        {
            "ContactStateCategory": "",
            "ContactStateDescription": "",
            "ContactStateId": 0
        }
    ]
};
exports.GetStatesRequest_Contacts = {};
exports.GetStatesResponse_Contacts = {
    "contactStateDescriptions": [
        {
            "ContactStateCategory": "",
            "ContactStateDescription": "",
            "ContactStateId": 0
        }
    ]
};
exports.StartMonitoringPhoneCallRequest_Contacts = {
    "phoneNumber": 0
};
exports.StartMonitoringPhoneCallResponse_Contacts = {};
exports.StartRecordingPhoneCallRequest_Contacts = {};
exports.StartRecordingPhoneCallResponse_Contacts = {};
exports.AddEmailContactRequest_Emails = {};
exports.AddEmailContactResponse_Emails = {};
exports.CreatesOutboundEmailContactRequest_Emails = {
    "skillId": 0,
    "toAddress": "",
    "parentContactId": 0
};
exports.CreatesOutboundEmailContactResponse_Emails = {};
exports.EndEmailContactRequest_Emails = {};
exports.EndEmailContactResponse_Emails = {};
exports.ForwardsEmailRequest_Emails = {
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
exports.ForwardsEmailResponse_Emails = {};
exports.ParksEmailRequest_Emails = {
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
exports.ParksEmailResponse_Emails = {};
exports.PreviewEmailRequest_Emails = {};
exports.PreviewEmailResponse_Emails = {};
exports.ReplyToEmailRequest_Emails = {
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
exports.ReplyToEmailResponse_Emails = {};
exports.RestoreEmailRequest_Emails = {};
exports.RestoreEmailResponse_Emails = {};
exports.SaveDraftRequest_Emails = {
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
exports.SaveDraftResponse_Emails = {};
exports.SendsEmailRequest_Emails = {
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
exports.SendsEmailResponse_Emails = {};
exports.TransferEmailToAgentRequest_Emails = {
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
exports.TransferEmailToAgentResponse_Emails = {};
exports.TransferEmailToSkillRequest_Emails = {
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
exports.TransferEmailToSkillResponse_Emails = {};
exports.UnParksEmailRequest_Emails = {
    "isImmediate": false
};
exports.UnParksEmailResponse_Emails = {};
exports.CreateHiringSourceRequest_General = {
    "sourceName": ""
};
exports.CreateHiringSourceResponse_General = {
    "sourceId": 0
};
exports.CreateHoursOperationProfileRequest_General = {
    "profileName": ""
};
exports.CreateHoursOperationProfileResponse_General = {
    "profileId": 0,
    "profileName": ""
};
exports.CreateMessageTemplateRequest_General = {
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
exports.CreateMessageTemplateResponse_General = {
    "templateId": 0
};
exports.CreatePointOfContactRequest_General = {
    "pointOfContact": "",
    "pointOfContactName": "",
    "skillId": 0,
    "isActive": true,
    "mediaTypeId": 0,
    "scriptName": "",
    "ivrReportingEnabled": true
};
exports.CreatePointOfContactResponse_General = {
    "error": "",
    "error_Description": ""
};
exports.CreateTagRequest_General = {
    "tagName": "",
    "notes": ""
};
exports.CreateTagResponse_General = {
    "tagId": 0
};
exports.CreateUnavailableCodeRequest_General = {
    "unavailableCodeName": "",
    "postContact": true,
    "isActive": true
};
exports.CreateUnavailableCodeResponse_General = {
    "error": "",
    "error_Description": ""
};
exports.DeleteFolderRequest_General = {
    "folderName": ""
};
exports.DeleteFolderResponse_General = {};
exports.GetAgentPermissionsRequest_General = {};
exports.GetAgentPermissionsResponse_General = {
    "permissions": [
        {
            "BusinessUnitId": 0,
            "Key": "",
            "Value": ""
        }
    ]
};
exports.GetBrandingProfileRequest_General = {
    "businessUnitId": "",
    "fields": ""
};
exports.GetBrandingProfileResponse_General = {
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
exports.GetBusinessUnitConfigRequest_General = {
    "includeTrustedBusinessUnits": "",
    "fields": ""
};
exports.GetBusinessUnitConfigResponse_General = {
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
exports.GetConfigurablePhoneNumbersRequest_General = {
    "searchString": "",
    "skip": "",
    "top": ""
};
exports.GetConfigurablePhoneNumbersResponse_General = {
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
exports.GetCountriesRequest_General = {};
exports.GetCountriesResponse_General = {
    "countries": [
        {
            "countryId": 0,
            "countryCode": "",
            "countryName": ""
        }
    ]
};
exports.GetDataTypesRequest_General = {};
exports.GetDataTypesResponse_General = {
    "dataTypes": [
        {
            "dataTypeId": 0,
            "dataTypeName": ""
        }
    ]
};
exports.GetDirectoriesRequest_General = {
    "folderName": ""
};
exports.GetDirectoriesResponse_General = {};
exports.GetDispositionsRequest_General = {
    "fields": "",
    "skip": "",
    "top": "",
    "searchString": "",
    "orderBy": "",
    "isPreviewDispositions": "",
    "updatedSince": ""
};
exports.GetDispositionsResponse_General = {
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
exports.GetFeedbackCategoriesPrioritiesRequest_General = {};
exports.GetFeedbackCategoriesPrioritiesResponse_General = {
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
exports.GetFileRequest_General = {
    "fileName": ""
};
exports.GetFileResponse_General = {
    "files": {
        "file": "",
        "fileName": ""
    }
};
exports.GetHiringSourcesRequest_General = {};
exports.GetHiringSourcesResponse_General = {
    "sources": [
        {
            "sourceId": 0,
            "sourceName": ""
        }
    ]
};
exports.GetHourOperationProfileRequest_General = {
    "fields": ""
};
exports.GetHourOperationProfileResponse_General = {
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
exports.GetHoursOperationProfilesRequest_General = {
    "fields": "",
    "updatedSince": "",
    "skip": "",
    "top": "",
    "orderBy": ""
};
exports.GetHoursOperationProfilesResponse_General = {
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
exports.GetLocationsRequest_General = {
    "includeAgents": ""
};
exports.GetLocationsResponse_General = {
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
exports.GetMediaTypeRequest_General = {};
exports.GetMediaTypeResponse_General = {
    "mediaTypes": [
        {
            "MediaTypeId": 0,
            "MediaTypeName": ""
        }
    ]
};
exports.GetMediaTypesRequest_General = {};
exports.GetMediaTypesResponse_General = {
    "mediaTypes": [
        {
            "MediaTypeId": 0,
            "MediaTypeName": ""
        }
    ]
};
exports.GetMessageTemplateRequest_General = {};
exports.GetMessageTemplateResponse_General = {
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
exports.GetMessageTemplatesRequest_General = {};
exports.GetMessageTemplatesResponse_General = {
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
exports.GetOutStatesForBusinessUnitRequest_General = {
    "activeOnly": ""
};
exports.GetOutStatesForBusinessUnitResponse_General = {
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
exports.GetPermissionsRequest_General = {};
exports.GetPermissionsResponse_General = {
    "permissions": [
        {
            "BusinessUnitId": 0,
            "Key": "",
            "Value": ""
        }
    ]
};
exports.GetPointOfContactRequest_General = {};
exports.GetPointOfContactResponse_General = {
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
exports.GetPointsOfContactRequest_General = {};
exports.GetPointsOfContactResponse_General = {
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
exports.GetScriptsRequest_General = {
    "mediaTypeId": "",
    "isActive": "",
    "searchString": "",
    "fields": "",
    "skip": "",
    "top": "",
    "orderBy": ""
};
exports.GetScriptsResponse_General = {
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
exports.GetSecurityProfileRequest_General = {};
exports.GetSecurityProfileResponse_General = {
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
exports.GetSecurityProfilesRequest_General = {
    "isExternal": "",
    "isActive": ""
};
exports.GetSecurityProfilesResponse_General = {
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
exports.GetServerTimeRequest_General = {};
exports.GetServerTimeResponse_General = {
    "ServerTime": "2020-07-26T23:59:59.678Z"
};
exports.GetSMSPhoneCodesRequest_General = {};
exports.GetSMSPhoneCodesResponse_General = {
    "phoneCodes": [
        {
            "transportCode": 0,
            "transportTypeId": 0,
            "transportTypeDesc": "",
            "note": ""
        }
    ]
};
exports.GetStatesProvincesRequest_General = {};
exports.GetStatesProvincesResponse_General = {
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
exports.GetTagRequest_General = {};
exports.GetTagResponse_General = {
    "tags": [
        {
            "tagId": 0,
            "tagName": "",
            "isActive": true,
            "notes": ""
        }
    ]
};
exports.GetTagsRequest_General = {
    "searchString": "",
    "isActive": ""
};
exports.GetTagsResponse_General = {
    "tags": [
        {
            "tagId": 0,
            "tagName": "",
            "isActive": true,
            "notes": ""
        }
    ]
};
exports.GetTimeZonesRequest_General = {};
exports.GetTimeZonesResponse_General = {
    "timeZones": [
        {
            "displayName": "",
            "standardName": "",
            "offset": ""
        }
    ]
};
exports.GetUnprocessedFilesRequest_General = {
    "folderPath": ""
};
exports.GetUnprocessedFilesResponse_General = {
    "files": [
        {
            "fileName": "",
            "fileNameWithPath": "",
            "needsProcessing": true
        }
    ]
};
exports.MarkFileAsProcessedRequest_General = {
    "fileName": "",
    "needsProcessing": false
};
exports.MarkFileAsProcessedResponse_General = {};
exports.MarkFileForProcessingRequest_General = {
    "fileName": "",
    "file": "",
    "overwrite": false,
    "needsProcessing": false
};
exports.MarkFileForProcessingResponse_General = {};
exports.MoveRenameFileRequest_General = {
    "oldPath": "",
    "newPath": "",
    "overwrite": true
};
exports.MoveRenameFileResponse_General = {};
exports.RemoveFileRequest_General = {
    "fileName": ""
};
exports.RemoveFileResponse_General = {};
exports.StartScriptRequest_General = {
    "skillId": 0,
    "startDate": "",
    "parameters": ""
};
exports.StartScriptResponse_General = {
    "contactId": 0
};
exports.UpdateHoursOperationProfileRequest_General = {};
exports.UpdateHoursOperationProfileResponse_General = {};
exports.UpdateMessageTemplateRequest_General = {
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
exports.UpdateMessageTemplateResponse_General = {};
exports.UpdatePointOfContactRequest_General = {
    "pointOfContactName": "",
    "skillId": 0,
    "isActive": true,
    "scriptName": "",
    "ivrReportingEnabled": true
};
exports.UpdatePointOfContactResponse_General = {
    "error": "",
    "error_Description": ""
};
exports.UpdateTagRequest_General = {
    "tagName": "",
    "notes": "",
    "isActive": false
};
exports.UpdateTagResponse_General = {};
exports.UploadFileRequest_General = {
    "fileName": "",
    "file": "",
    "overwrite": false
};
exports.UploadFileResponse_General = {};
exports.AssignAgentsRequest_Groups = {
    "agents": [
        {
            "agentId": 0
        }
    ]
};
exports.AssignAgentsResponse_Groups = {
    "agents": [
        {
            "agentId": 0
        }
    ]
};
exports.CreateRequest_Groups = {
    "groups": [
        {
            "groupName": "",
            "isActive": "",
            "notes": ""
        }
    ]
};
exports.CreateResponse_Groups = {
    "errorCount": 0,
    "groupResults": [
        {
            "success": true,
            "groupId": 0,
            "error": ""
        }
    ]
};
exports.GetAgentsAssignedRequest_Groups = {
    "assigned": "",
    "top": "",
    "skip": "",
    "orderBy": "",
    "fields": "",
    "searchString": ""
};
exports.GetAgentsAssignedResponse_Groups = {
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
exports.GetConfigurationRequest_Groups = {
    "fields": ""
};
exports.GetConfigurationResponse_Groups = {
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
exports.GetRequest_Groups = {
    "top": "",
    "skip": "",
    "orderBy": "",
    "searchString": "",
    "isActive": "",
    "fields": ""
};
exports.GetResponse_Groups = {
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
exports.ModifyRequest_Groups = {
    "groupName": "",
    "isActive": "",
    "notes": ""
};
exports.ModifyResponse_Groups = {};
exports.RemoveAgentsRequest_Groups = {
    "agents": [
        {
            "agentId": 0
        }
    ]
};
exports.RemoveAgentsResponse_Groups = {
    "errorCount": 0,
    "agentResults": [
        {
            "agentId": 0,
            "success": true,
            "error": ""
        }
    ]
};
exports.AddRecordsDoNotCallGroupRequest_Lists = {
    "dncGroupRecords": [
        {
            "phoneNumber": ""
        }
    ]
};
exports.AddRecordsDoNotCallGroupResponse_Lists = {
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
exports.AssignContributingSkillRequest_Lists = {};
exports.AssignContributingSkillResponse_Lists = {};
exports.AssignScrubbedSkillRequest_Lists = {};
exports.AssignScrubbedSkillResponse_Lists = {};
exports.CancelListProcessRequest_Lists = {};
exports.CancelListProcessResponse_Lists = {};
exports.CreateCallingListMappingRequest_Lists = {
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
exports.CreateCallingListMappingResponse_Lists = {
    "listId": 0
};
exports.CreateDoNotCallGroupRequest_Lists = {
    "dncGroupName": "",
    "dncGroupDescription": ""
};
exports.CreateDoNotCallGroupResponse_Lists = {
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
exports.DownloadCallingListAttemptsRequest_Lists = {
    "updatedSince": "",
    "finalized": "",
    "fields": "",
    "skip": "",
    "top": "",
    "orderBy": ""
};
exports.DownloadCallingListAttemptsResponse_Lists = {
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
exports.DownloadCallingListRequest_Lists = {
    "updatedSince": "",
    "finalized": "",
    "includeRecords": "",
    "fields": "",
    "skip": "",
    "top": "",
    "orderBy": ""
};
exports.DownloadCallingListResponse_Lists = {
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
exports.ExpireRecordsDoNotCallGroupRequest_Lists = {
    "dncGroupRecords": [
        {
            "phoneNumber": ""
        }
    ]
};
exports.ExpireRecordsDoNotCallGroupResponse_Lists = {
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
exports.GetCallingListsRequest_Lists = {};
exports.GetCallingListsResponse_Lists = {
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
exports.GetContributingSkillsDoNotCallGroupRequest_Lists = {};
exports.GetContributingSkillsDoNotCallGroupResponse_Lists = {
    "contributingSkills": [
        {
            "skillId": 0,
            "skillName": ""
        }
    ]
};
exports.GetDoNotCallGroupRequest_Lists = {
    "fields": ""
};
exports.GetDoNotCallGroupResponse_Lists = {
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
exports.GetDoNotCallGroupsRequest_Lists = {
    "fields": "",
    "updatedSince": ""
};
exports.GetDoNotCallGroupsResponse_Lists = {
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
exports.GetRecordsDoNotCallGroupRequest_Lists = {
    "fields": "",
    "skip": "",
    "top": "",
    "orderBy": ""
};
exports.GetRecordsDoNotCallGroupResponse_Lists = {
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
exports.GetScrubbedSkillsDoNotCallGroupRequest_Lists = {};
exports.GetScrubbedSkillsDoNotCallGroupResponse_Lists = {
    "scrubbedSkills": [
        {
            "skillId": 0,
            "skillName": ""
        }
    ]
};
exports.GetStatusCallingListUploadJobRequest_Lists = {
    "fields": ""
};
exports.GetStatusCallingListUploadJobResponse_Lists = {
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
exports.GetStatusCallingListUploadJobsRequest_Lists = {
    "fields": "",
    "skip": "",
    "top": "",
    "orderBy": "",
    "startDate": "",
    "endDate": ""
};
exports.GetStatusCallingListUploadJobsResponse_Lists = {
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
exports.RemoveCallingListRequest_Lists = {
    "forceInactive": "",
    "forceDelete": ""
};
exports.RemoveCallingListResponse_Lists = {};
exports.RemoveContributingSkillRequest_Lists = {};
exports.RemoveContributingSkillResponse_Lists = {};
exports.RemoveScrubbedSkillRequest_Lists = {};
exports.RemoveScrubbedSkillResponse_Lists = {};
exports.SearchPhoneNumberRequest_Lists = {
    "phoneNumber": ""
};
exports.SearchPhoneNumberResponse_Lists = {
    "searchResults": [
        {
            "dncGroupId": 0,
            "dncGroupName": "",
            "dncGroupDescription": 0,
            "formattedPhone": ""
        }
    ]
};
exports.UpdateDoNotCallGroupRequest_Lists = {
    "dncGroupName": "",
    "dncGroupDescription": "",
    "isActive": false
};
exports.UpdateDoNotCallGroupResponse_Lists = {
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
exports.UploadRecordsCallListRequest_Lists = {
    "skillId": 0,
    "fileName": "",
    "forceOverwrite": false,
    "defaultTimeZone": "",
    "expirationDate": "",
    "listFile": "",
    "startSkill": false
};
exports.UploadRecordsCallListResponse_Lists = {
    "resultSet": {
        "sourceId": 0,
        "importStatus": true,
        "procRecords": 0,
        "validRecords": 0,
        "invalidRecords": 0,
        "errorResults": ""
    }
};
exports.LogIntoDialerCampaignRequest_PersonalCon = {
    "skillName": ""
};
exports.LogIntoDialerCampaignResponse_PersonalCon = {};
exports.LogOutDialerCampaignRequest_PersonalCon = {};
exports.LogOutDialerCampaignResponse_PersonalCon = {};
exports.SnoozePreviewContactRequest_PersonalCon = {};
exports.SnoozePreviewContactResponse_PersonalCon = {};
exports.AcceptConsultRequest_PhoneCalls = {};
exports.AcceptConsultResponse_PhoneCalls = {};
exports.ConferenceCallRequest_PhoneCalls = {};
exports.ConferenceCallResponse_PhoneCalls = {};
exports.DialAgentConsultRequest_PhoneCalls = {
    "targetAgentId": 0,
    "parentContactId": 0
};
exports.DialAgentConsultResponse_PhoneCalls = {};
exports.DialAgentPersonalQueueRequest_PhoneCalls = {
    "targetAgentId": 0,
    "parentContactId": 0
};
exports.DialAgentPersonalQueueResponse_PhoneCalls = {};
exports.DialIndependentCallRequest_PhoneCalls = {};
exports.DialIndependentCallResponse_PhoneCalls = {};
exports.DialOutboundCallRequest_PhoneCalls = {
    "phoneNumber": "",
    "skillId": 0,
    "parentContactId": 0
};
exports.DialOutboundCallResponse_PhoneCalls = {};
exports.DialSkillRequest_PhoneCalls = {
    "skillId": 0,
    "parentContactId": 0
};
exports.DialSkillResponse_PhoneCalls = {};
exports.DispositionIndependentCallRequest_PhoneCalls = {
    "outcome": ""
};
exports.DispositionIndependentCallResponse_PhoneCalls = {};
exports.EndCallRequest_PhoneCalls = {};
exports.EndCallResponse_PhoneCalls = {};
exports.MaskRecordingRequest_PhoneCalls = {};
exports.MaskRecordingResponse_PhoneCalls = {};
exports.OverrideAmdCallRequest_PhoneCalls = {
    "type": ""
};
exports.OverrideAmdCallResponse_PhoneCalls = {};
exports.PlaceContactOnHoldRequest_PhoneCalls = {};
exports.PlaceContactOnHoldResponse_PhoneCalls = {};
exports.RecordCallRequest_PhoneCalls = {};
exports.RecordCallResponse_PhoneCalls = {};
exports.ResumeCallRequest_PhoneCalls = {};
exports.ResumeCallResponse_PhoneCalls = {};
exports.SendDtmfTonesRequest_PhoneCalls = {
    "dtmfSequence": "",
    "toneDurationMs": 0,
    "toneSpacingMs": 0
};
exports.SendDtmfTonesResponse_PhoneCalls = {};
exports.StopMaskingRecordingRequest_PhoneCalls = {};
exports.StopMaskingRecordingResponse_PhoneCalls = {};
exports.TransferCallRequest_PhoneCalls = {};
exports.TransferCallResponse_PhoneCalls = {};
exports.ActiveContactsRequest_RealTime = {
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
exports.ActiveContactsResponse_RealTime = {
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
exports.ActiveContactStatesRequest_RealTime = {
    "agentId": "",
    "updatedSince": ""
};
exports.ActiveContactStatesResponse_RealTime = {
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
exports.ActivityAllSkillsRequest_RealTime = {
    "updatedSince": "",
    "fields": ""
};
exports.ActivityAllSkillsResponse_RealTime = {
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
exports.ActivitySkillRequest_RealTime = {
    "updatedSince": "",
    "fields": ""
};
exports.ActivitySkillResponse_RealTime = {
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
exports.ParkedContactsRequest_RealTime = {
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
exports.ParkedContactsResponse_RealTime = {
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
exports.StateAgentRequest_RealTime = {
    "updatedSince": "",
    "fields": ""
};
exports.StateAgentResponse_RealTime = {
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
exports.StateAllAgentsRequest_RealTime = {
    "updatedSince": "",
    "fields": ""
};
exports.StateAllAgentsResponse_RealTime = {
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
exports.AgentLoginHistoryRequest_Reporting = {
    "startDate": "",
    "endDate": "",
    "searchString": "",
    "fields": "",
    "skip": "",
    "top": "",
    "orderBy": ""
};
exports.AgentLoginHistoryResponse_Reporting = {
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
exports.ASIMetadataRequest_Reporting = {
    "startDate": "",
    "endDate": "",
    "fields": ""
};
exports.ASIMetadataResponse_Reporting = {
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
exports.CompletedContactsRequest_Reporting = {
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
exports.CompletedContactsResponse_Reporting = {
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
exports.ContactCallQualityResponse_Reporting = {
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
exports.ContactCustomDataResponse_Reporting = {
    "contactCustomData": [
        {
            "name": "",
            "value": ""
        }
    ]
};
exports.ContactDetailsRequest_Reporting = {
    "fields": ""
};
exports.ContactDetailsResponse_Reporting = {
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
exports.ContactHistoryRequest_Reporting = {
    "startDate": "",
    "endDate": "",
    "updatedSince": "",
    "mediaTypeId": "",
    "fields": "",
    "skip": "",
    "top": "",
    "orderBy": ""
};
exports.ContactHistoryResponse_Reporting = {
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
exports.ContactStateHistoryResponse_Reporting = {
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
exports.CSIStatisticsRequest_Reporting = {
    "startDate": "",
    "endDate": "",
    "fields": ""
};
exports.CSIStatisticsResponse_Reporting = {
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
exports.FTCIAdherenceStatisticsRequest_Reporting = {
    "startDate": "",
    "endDate": "",
    "fields": ""
};
exports.FTCIAdherenceStatisticsResponse_Reporting = {
    "wfoAgentStats": [
        {}
    ]
};
exports.GeneratesLinkToDatadownloadReportRequest_Reporting = {
    "fileName": "",
    "saveAsFile": true,
    "startDate": "",
    "endDate": ""
};
exports.GeneratesLinkToDatadownloadReportResponse_Reporting = {};
exports.ListCustomReportsResponse_Reporting = {
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
exports.ListReportingJobsRequest_Reporting = {
    "fields": "",
    "reportId": "",
    "jobStatus": "",
    "jobSpan": ""
};
exports.ListReportingJobsResponse_Reporting = {
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
exports.OSIStatisticsRequest_Reporting = {
    "startDate": "",
    "endDate": "",
    "fields": ""
};
exports.OSIStatisticsResponse_Reporting = {
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
exports.PerformanceSummaryOfAllTeamsRequest_Reporting = {
    "startDate": "",
    "endDate": "",
    "fields": ""
};
exports.PerformanceSummaryOfAllTeamsResponse_Reporting = {
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
exports.PerformanceSummaryOfATeamRequest_Reporting = {
    "startDate": "",
    "endDate": "",
    "fields": ""
};
exports.PerformanceSummaryOfATeamResponse_Reporting = {
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
exports.PerformanceSummaryRequest_Reporting = {
    "startDate": "",
    "endDate": "",
    "fields": ""
};
exports.PerformanceSummaryResponse_Reporting = {
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
exports.QualityManagementStatisticsRequest_Reporting = {
    "startDate": "",
    "endDate": "",
    "fields": ""
};
exports.QualityManagementStatisticsResponse_Reporting = {
    "wfoQmContactEvaluationStats": [
        {}
    ]
};
exports.RecentContactsRequest_Reporting = {
    "top": "",
    "fields": "",
    "startDate": "",
    "endDate": ""
};
exports.RecentContactsResponse_Reporting = {
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
exports.ReportingJobRequest_Reporting = {
    "fields": ""
};
exports.ReportingJobResponse_Reporting = {
    "jobId": 0,
    "reportId": 0,
    "reportName": "",
    "jobStart": "2020-07-26T23:59:59.678Z",
    "jobEnd": "2020-07-26T23:59:59.678Z",
    "fileName": "",
    "resultFileURL": "",
    "deleteTime": "2020-07-26T23:59:59.678Z"
};
exports.ScorecardStatisticsRequest_Reporting = {
    "startDate": "",
    "endDate": "",
    "fields": ""
};
exports.ScorecardStatisticsResponse_Reporting = {
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
exports.SLASummaryForAllSkillsRequest_Reporting = {
    "startDate": "",
    "endDate": ""
};
exports.SLASummaryForAllSkillsResponse_Reporting = {
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
exports.SLASummaryForASkillRequest_Reporting = {
    "startDate": "",
    "endDate": "",
    "listVar": ""
};
exports.SLASummaryForASkillResponse_Reporting = {
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
exports.SMSContactTranscriptsRequest_Reporting = {
    "startDate": "",
    "endDate": "",
    "transportCode": "",
    "skip": "",
    "top": ""
};
exports.SMSContactTranscriptsResponse_Reporting = {
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
exports.SMSTranscriptsRequest_Reporting = {
    "agentId": "",
    "startDate": "",
    "endDate": "",
    "transportCode": "",
    "skip": "",
    "top": "",
    "orderBy": ""
};
exports.SMSTranscriptsResponse_Reporting = {
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
exports.StartCustomReportingJobRequest_Reporting = {
    "fileType": "",
    "includeHeaders": false,
    "appendDate": false,
    "deleteAfter": 0,
    "overwrite": false,
    "startDate": "",
    "endDate": ""
};
exports.StartCustomReportingJobResponse_Reporting = {
    "jobId": 0
};
exports.StateDurationRequest_Reporting = {
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
exports.StateDurationResponse_Reporting = {
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
exports.StatisticsForAllSkillsRequest_Reporting = {
    "startDate": "",
    "endDate": ""
};
exports.StatisticsForAllSkillsResponse_Reporting = {
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
exports.StatisticsForASkillRequest_Reporting = {
    "startDate": "",
    "endDate": "",
    "listVar": ""
};
exports.StatisticsForASkillResponse_Reporting = {
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
exports.CancelRequest_ScheduledCallbacks = {
    "notes": ""
};
exports.CancelResponse_ScheduledCallbacks = {};
exports.DialRequest_ScheduledCallbacks = {};
exports.DialResponse_ScheduledCallbacks = {};
exports.RescheduleRequest_ScheduledCallbacks = {
    "rescheduleDate": ""
};
exports.RescheduleResponse_ScheduledCallbacks = {};
exports.CreateRequest_ScheduledCallbacks1 = {
    "phoneNumber": "",
    "skillId": 0,
    "scheduleDate": "",
    "firstName": "",
    "lastName": "",
    "targetAgentId": 0,
    "notes": ""
};
exports.CreateResponse_ScheduledCallbacks1 = {
    "callbackId": 0
};
exports.DeleteRequest_ScheduledCallbacks1 = {};
exports.DeleteResponse_ScheduledCallbacks1 = {};
exports.GetRequest_ScheduledCallbacks1 = {};
exports.GetResponse_ScheduledCallbacks1 = {
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
exports.GetSkillCallbackRequest_ScheduledCallbacks1 = {};
exports.GetSkillCallbackResponse_ScheduledCallbacks1 = {
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
exports.UpdateRequest_ScheduledCallbacks1 = {
    "phoneNumber": "",
    "skillId": 0,
    "scheduleDate": "",
    "firstName": "",
    "lastName": "",
    "targetAgentId": 0,
    "notes": ""
};
exports.UpdateResponse_ScheduledCallbacks1 = {};
exports.AcceptRequest_Sessions = {};
exports.AcceptResponse_Sessions = {};
exports.AddMediaTypeRouteRequest_Sessions = {
    "chat": false,
    "email": false,
    "workitem": false
};
exports.AddMediaTypeRouteResponse_Sessions = {};
exports.ContinueReskillRequest_Sessions = {
    "continueReskill": false
};
exports.ContinueReskillResponse_Sessions = {};
exports.DispositionContactRequest_Sessions = {
    "primaryDispositionId": 0,
    "primaryDispositionNotes": "",
    "primaryCommitmentAmount": 0.0,
    "primaryCallbackTime": "",
    "primaryCallbackNumber": "",
    "secondaryDispositionId": 0,
    "previewDispositionId": 0
};
exports.DispositionContactResponse_Sessions = {};
exports.EndRequest_Sessions = {};
exports.EndResponse_Sessions = {};
exports.EndSessionRequest_Sessions = {
    "forceLogOff": false,
    "endContacts": false,
    "ignorePersonalQueue": false
};
exports.EndSessionResponse_Sessions = {};
exports.GetEventDescriptionRequest_Sessions = {
    "timeout": ""
};
exports.GetEventDescriptionResponse_Sessions = {
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
exports.HoldRequest_Sessions = {};
exports.HoldResponse_Sessions = {};
exports.JoinExistingSessionRequest_Sessions = {
    "asAgentId": 0
};
exports.JoinExistingSessionResponse_Sessions = {
    "sessionId": ""
};
exports.MoveEmailIntoFocusRequest_Sessions = {};
exports.MoveEmailIntoFocusResponse_Sessions = {};
exports.PostCustomDataToContactRequest_Sessions = {
    "indicatorName": "",
    "data": ""
};
exports.PostCustomDataToContactResponse_Sessions = {};
exports.PostFeedbackRequest_Sessions = {
    "categoryId": 0,
    "priority": "",
    "comment": "",
    "customData": ""
};
exports.PostFeedbackResponse_Sessions = {};
exports.RejectRequest_Sessions = {};
exports.RejectResponse_Sessions = {};
exports.ResumeRequest_Sessions = {};
exports.ResumeResponse_Sessions = {};
exports.SetAgentStateRequest_Sessions = {
    "state": "",
    "reason": ""
};
exports.SetAgentStateResponse_Sessions = {};
exports.StartsSessionRequest_Sessions = {
    "stationId": "",
    "stationPhoneNumber": "",
    "inactivityTimeout": 0,
    "inactivityForceLogout": false,
    "asAgentId": 0
};
exports.StartsSessionResponse_Sessions = {
    "sessionId": ""
};
exports.AssignAgentsToSkillRequest_Skills = {
    "agents": [
        {
            "agentId": 0,
            "isActive": true,
            "proficency": 1
        }
    ]
};
exports.AssignAgentsToSkillResponse_Skills = {
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
exports.AssignTagRequest_Skills = {
    "tags": [
        {
            "tagId": 0
        }
    ]
};
exports.AssignTagResponse_Skills = {
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
exports.ChangeDispositionRequest_Skills = {
    "dispositionName": "",
    "isPreviewDisposition": false,
    "classificationId": 0,
    "isActive": false
};
exports.ChangeDispositionResponse_Skills = {};
exports.CreateCampaignRequest_Skills = {
    "campaigns": [
        {
            "campaignName": "",
            "isActive": true,
            "description": "",
            "notes": ""
        }
    ]
};
exports.CreateCampaignResponse_Skills = {
    "errorCount": 0,
    "campaignResults": [
        {
            "campaignId": 0,
            "success": true,
            "error": ""
        }
    ]
};
exports.CreateDispositionRequest_Skills = {
    "dispositions": [
        {
            "dispositionName": "",
            "isPreviewDisposition": true
        }
    ]
};
exports.CreateDispositionResponse_Skills = {
    "errorCount": 0,
    "dispositionResults": [
        {
            "dispositionId": 0,
            "success": true,
            "error": ""
        }
    ]
};
exports.CreateSkillRequest_Skills = {
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
exports.CreateSkillResponse_Skills = {
    "errorCount": 0,
    "skillsResults": [
        {
            "success": true,
            "error": ""
        }
    ]
};
exports.DeleteCampaignSkillRequest_Skills = {
    "skills": [
        {
            "skillId": 0,
            "transferCampaignId": 0
        }
    ]
};
exports.DeleteCampaignSkillResponse_Skills = {
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
exports.GetAgentsAssignedToSkillRequest_Skills = {
    "updatedSince": "",
    "searchString": "",
    "fields": "",
    "skip": "",
    "top": "",
    "orderBy": ""
};
exports.GetAgentsAssignedToSkillResponse_Skills = {
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
exports.GetAgentsNotAssignedSkillRequest_Skills = {
    "searchString": "",
    "fields": "",
    "skip": "",
    "top": "",
    "orderBy": ""
};
exports.GetAgentsNotAssignedSkillResponse_Skills = {
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
exports.GetCampaignRequest_Skills = {};
exports.GetCampaignResponse_Skills = {
    "campaign": {
        "campaignId": 0,
        "campaignName": "",
        "isActive": true,
        "description": "",
        "notes": "",
        "lastUpdateTime": "2020-07-26T23:59:59.678Z"
    }
};
exports.GetCampaignsRequest_Skills = {
    "isActive": "",
    "fields": "",
    "searchString": "",
    "skip": "",
    "top": "",
    "orderby": ""
};
exports.GetCampaignsResponse_Skills = {
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
exports.GetConfigurationThankYouPageRequest_Skills = {};
exports.GetConfigurationThankYouPageResponse_Skills = {
    "canDownloadChatTranscript": true,
    "chatThankPopURL": "",
    "displayChatThankPage": true,
    "thankMessage": "",
    "useChatThankPopURL": true,
    "fromAddress": ""
};
exports.GetCPAManagementConfigurationSkillRequest_Skills = {
    "fields": ""
};
exports.GetCPAManagementConfigurationSkillResponse_Skills = {};
exports.GetDeliveryPreferencesConfigurationSkillRequest_Skills = {
    "fields": ""
};
exports.GetDeliveryPreferencesConfigurationSkillResponse_Skills = {};
exports.GetDispositionClassificationsRequest_Skills = {
    "fields": ""
};
exports.GetDispositionClassificationsResponse_Skills = {
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
exports.GetDispositionRequest_Skills = {
    "fields": ""
};
exports.GetDispositionResponse_Skills = {
    "dispositionId": 0,
    "dispositionName": "",
    "notes": "",
    "lastUpdated": "",
    "classificationId": 0,
    "systemOutcome": "",
    "isPreviewDisposition": true
};
exports.GetDispositionsSkillAssignmentRequest_Skills = {
    "fields": "",
    "updatedSince": "",
    "isActive": "",
    "searchString": "",
    "orderBy": "",
    "skip": "",
    "top": ""
};
exports.GetDispositionsSkillAssignmentResponse_Skills = {
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
exports.GetOutboundSkillGeneralSettingsRequest_Skills = {
    "fields": ""
};
exports.GetOutboundSkillGeneralSettingsResponse_Skills = {
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
exports.GetRetrySettingsSkillRequest_Skills = {
    "fields": ""
};
exports.GetRetrySettingsSkillResponse_Skills = {};
exports.GetScheduleSettingsSkillRequest_Skills = {};
exports.GetScheduleSettingsSkillResponse_Skills = {
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
exports.GetSkillAssignmentsRequest_Skills = {
    "updatedSince": "",
    "fields": ""
};
exports.GetSkillAssignmentsResponse_Skills = {
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
exports.GetSkillDispositionsRequest_Skills = {
    "fields": "",
    "searchString": "",
    "orderBy": "",
    "skip": "",
    "top": ""
};
exports.GetSkillDispositionsResponse_Skills = {
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
exports.GetSkillRequest_Skills = {
    "fields": ""
};
exports.GetSkillResponse_Skills = {
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
exports.GetSkillsRequest_Skills = {
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
exports.GetSkillsResponse_Skills = {
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
exports.GetSummaryContactsAllSkillRequest_Skills = {
    "startDate": "",
    "endDate": ""
};
exports.GetSummaryContactsAllSkillResponse_Skills = {
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
exports.GetSummaryContactsAllSkillsRequest_Skills = {
    "startDate": "",
    "endDate": ""
};
exports.GetSummaryContactsAllSkillsResponse_Skills = {
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
exports.GetTagsRequest_Skills = {};
exports.GetTagsResponse_Skills = {
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
exports.GetUnassignedDispositionsRequest_Skills = {
    "fields": "",
    "searchString": "",
    "orderBy": "",
    "skip": "",
    "top": ""
};
exports.GetUnassignedDispositionsResponse_Skills = {
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
exports.GetXSConfigurationSkillRequest_Skills = {
    "fields": ""
};
exports.GetXSConfigurationSkillResponse_Skills = {};
exports.RemoveSkillAssignmentRequest_Skills = {
    "agents": [
        {
            "agentId": 0
        }
    ]
};
exports.RemoveSkillAssignmentResponse_Skills = {
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
exports.RemoveTagsRequest_Skills = {
    "tags": [
        {
            "tagId": 0
        }
    ]
};
exports.RemoveTagsResponse_Skills = {
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
exports.SetCampaignSkillsRequest_Skills = {
    "skills": [
        {
            "skillId": 0
        }
    ]
};
exports.SetCampaignSkillsResponse_Skills = {
    "errorCount": 0,
    "results": [
        {
            "success": true,
            "skillId": 0,
            "error": ""
        }
    ]
};
exports.StartPersonalConnectionSkillRequest_Skills = {};
exports.StartPersonalConnectionSkillResponse_Skills = {};
exports.StopPersonalConnectionSkillRequest_Skills = {
    "force": false
};
exports.StopPersonalConnectionSkillResponse_Skills = {};
exports.UpdateAgentAssignedSkillRequest_Skills = {
    "agents": [
        {
            "agentId": 0,
            "isActive": true,
            "proficency": 1
        }
    ]
};
exports.UpdateAgentAssignedSkillResponse_Skills = {
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
exports.UpdateCampaignRequest_Skills = {
    "campaign": {
        "campaignName": "",
        "isActive": true,
        "description": "",
        "notes": ""
    }
};
exports.UpdateCampaignResponse_Skills = {};
exports.UpdateCPAManagementConfigurationSkillRequest_Skills = {
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
exports.UpdateCPAManagementConfigurationSkillResponse_Skills = {};
exports.UpdateDeliveryPreferencesConfigurationSkillRequest_Skills = {
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
exports.UpdateDeliveryPreferencesConfigurationSkillResponse_Skills = {};
exports.UpdateOutboundSkillGeneralSettingsRequest_Skills = {
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
exports.UpdateOutboundSkillGeneralSettingsResponse_Skills = {};
exports.UpdateRetrySettingsSkillRequest_Skills = {
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
exports.UpdateRetrySettingsSkillResponse_Skills = {};
exports.UpdateScheduleSettingsSkillRequest_Skills = {
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
exports.UpdateScheduleSettingsSkillResponse_Skills = {};
exports.UpdateSkillRequest_Skills = {
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
exports.UpdateSkillResponse_Skills = {};
exports.UpdateXSConfigurationSkillRequest_Skills = {
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
exports.UpdateXSConfigurationSkillResponse_Skills = {};
exports.BargeOnAgentRequest_Supervisor = {};
exports.BargeOnAgentResponse_Supervisor = {};
exports.CoachAgentRequest_Supervisor = {};
exports.CoachAgentResponse_Supervisor = {};
exports.MonitorAgentRequest_Supervisor = {
    "targetAgentId": 0
};
exports.MonitorAgentResponse_Supervisor = {};
exports.TakeOverAgentRequest_Supervisor = {};
exports.TakeOverAgentResponse_Supervisor = {};
exports.EndVoicemailContactRequest_Voicemails = {};
exports.EndVoicemailContactResponse_Voicemails = {};
exports.PauseVoicemailRequest_Voicemails = {};
exports.PauseVoicemailResponse_Voicemails = {};
exports.PlayVoicemailRequest_Voicemails = {
    "playTimestamp": false,
    "position": 0
};
exports.PlayVoicemailResponse_Voicemails = {};
exports.TransferVoicemailToAgentRequest_Voicemails = {
    "targetAgentId": 0
};
exports.TransferVoicemailToAgentResponse_Voicemails = {};
exports.TransferVoicemailToSkillRequest_Voicemails = {
    "targetSkillId": 0
};
exports.TransferVoicemailToSkillResponse_Voicemails = {};
exports.AdherenceStatisticsRequest_WFMData = {
    "fields": "",
    "startDate": "",
    "endDate": ""
};
exports.AdherenceStatisticsResponse_WFMData = {
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
exports.AgentMetadataRequest_WFMData = {
    "fields": "",
    "startDate": "",
    "endDate": ""
};
exports.AgentMetadataResponse_WFMData = {
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
exports.AgentPerformanceRequest_WFMData = {
    "fields": "",
    "startDate": "",
    "endDate": ""
};
exports.AgentPerformanceResponse_WFMData = {
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
exports.ContactStatisticsRequest_WFMData = {
    "fields": "",
    "startDate": "",
    "endDate": "",
    "mediaTypeId": ""
};
exports.ContactStatisticsResponse_WFMData = {
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
exports.DailerContactStatisticsRequest_WFMData = {
    "fields": "",
    "startDate": "",
    "endDate": "",
    "mediaTypeId": ""
};
exports.DailerContactStatisticsResponse_WFMData = {
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
exports.ScorecardStatisticsRequest_WFMData = {
    "fields": "",
    "startDate": "",
    "endDate": ""
};
exports.ScorecardStatisticsResponse_WFMData = {
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
exports.CreateWorkItemRequest_WorkItem = {
    "pointOfContact": "",
    "workItemId": "",
    "workItemPayload": "",
    "workItemType": "",
    "from": ""
};
exports.CreateWorkItemResponse_WorkItem = {};
exports.AcceptRequest_WorkItems = {};
exports.AcceptResponse_WorkItems = {};
exports.EndRequest_WorkItems = {};
exports.EndResponse_WorkItems = {};
exports.HoldRequest_WorkItems = {};
exports.HoldResponse_WorkItems = {};
exports.RejectRequest_WorkItems = {};
exports.RejectResponse_WorkItems = {};
exports.ResumeRequest_WorkItems = {};
exports.ResumeResponse_WorkItems = {};
exports.AgentError_Event = {
    "IISHost": "",
    "VCHost": "",
    "Type": "",
    "Command": "",
    "ResultCode": "",
    "ContactID": 2200339882,
    "Target": "",
    "ErrorLevel": ""
};
exports.AgentLeg_Event = {
    "IISHost": "",
    "VCHost": "",
    "Type": "",
    "AgentLegId": 2200339882,
    "Status": "",
    "FinalState": true
};
exports.AgentSessionEnd_Event = {
    "IISHost": "",
    "VCHost": "",
    "Type": "",
    "Success": true,
    "Message": ""
};
exports.AgentSessionStart_Event = {
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
exports.AgentState_Event = {
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
exports.CallContactEvent_Event = {
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
exports.ChatContactEvent_Event = {
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
exports.ChatText_Event = {
    "IISHost": "",
    "VCHost": "",
    "Type": "",
    "RoomId": 2,
    "Label": "",
    "Message": "",
    "PartyType": "",
    "TimeStamp": "2020-07-26T23:59:59.678Z"
};
exports.HoursOfOperation_Event = {
    "IISHost": "",
    "VCHost": "",
    "Type": "",
    "ShowContinueReskill": true
};
exports.Indicator_Event = {
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
exports.NaturalCallingSkillList_Event = {
    "IISHost": "",
    "VCHost": "",
    "Type": "",
    "Empty": true
};
exports.PageOpen_Event = {
    "IISHost": "",
    "VCHost": "",
    "Type": "",
    "ContactID": 156981945454545,
    "Action": "",
    "PageUri": ""
};
exports.RemoteAgentSessionEnd_Event = {
    "IISHost": "",
    "VCHost": "",
    "Type": "",
    "Message": ""
};
exports.SupervisorContact_Event = {
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
exports.SupervisorMonitor_Event = {
    "IISHost": "",
    "VCHost": "",
    "Type": "",
    "MonitorStartTime": "2020-07-26T23:59:59.678Z",
    "TargetAgentId": 9011,
    "FinalState": true
};
exports.TakeOver_Event = {
    "IISHost": "",
    "VCHost": "",
    "Type": "",
    "ContactID": 15698224565454645,
    "TakeOverDate": "2020-07-26T23:59:59.678Z"
};
exports.WorkItemContactEvent_Event = {
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
