using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lake.AmazonConnect
{
	/// <summary>
	/// Amazon connect client.
	/// </summary>
	public class Client : IDisposable
	{
		/// <summary>
		/// Amazon connect client.
		/// </summary>
		/// <param name="accessKey">The client access key.</param>
		/// <param name="secretKey">The client secret key.</param>
		/// <param name="region">The instance region.</param>
		/// <exception cref="ArgumentNullException">Null objects or empty values are not allowed.</exception>
		public Client(string accessKey, string secretKey, string region = "ap-southeast-2")
		{
			// Throw if null or empty.
			if (String.IsNullOrEmpty(accessKey)) throw new ArgumentNullException(nameof(accessKey));
			if (String.IsNullOrEmpty(secretKey)) throw new ArgumentNullException(nameof(secretKey));
			if (String.IsNullOrEmpty(region)) throw new ArgumentNullException(nameof(region));

			// Create the base client.
			_credentials = new Amazon.Runtime.BasicAWSCredentials(accessKey, secretKey);

			// create the connect client.
			_config = new Amazon.Connect.AmazonConnectConfig
			{
				RegionEndpoint = Amazon.RegionEndpoint.GetBySystemName(region)
			};
			_client = new Amazon.Connect.AmazonConnectClient(_credentials, _config);

			// create the participant.
			_cpConfig = new Amazon.ConnectParticipant.AmazonConnectParticipantConfig
			{
				RegionEndpoint = Amazon.RegionEndpoint.GetBySystemName(region)
			};
			_cpClient = new Amazon.ConnectParticipant.AmazonConnectParticipantClient(_credentials, _cpConfig);

			// create the web socket client.
			_webSocketClient = new Net.WebSockets.WebSocketClient();
		}

		private readonly Amazon.Runtime.AWSCredentials _credentials = null;
		private readonly Amazon.ConnectParticipant.AmazonConnectParticipantConfig _cpConfig = null;
		private Amazon.ConnectParticipant.AmazonConnectParticipantClient _cpClient = null;
		private readonly Amazon.Connect.AmazonConnectConfig _config = null;
		private Amazon.Connect.AmazonConnectClient _client = null;

		private Lake.Net.WebSockets.WebSocketClient _webSocketClient = null;

		private string _instanceId = null;

		/// <summary>
		/// Gets or sets the Amazon Connect Instance Id.
		/// </summary>
		public string InstanceId
		{
			get => _instanceId;
			set => _instanceId = value;
		}

		/// <summary>
		/// Gets the web socket client.
		/// </summary>
		public Lake.Net.WebSockets.WebSocketClient WebSocketClient
		{
			get => _webSocketClient;
		}

		/// <summary>
		/// Gets the Amazon Connect client,
		/// </summary>
		public Amazon.Connect.AmazonConnectClient ConnectClient
		{
			get => _client;
		}

		/// <summary>
		/// Gets the Amazon Connect participant client,
		/// </summary>
		public Amazon.ConnectParticipant.AmazonConnectParticipantClient ParticipantClient
		{
			get => _cpClient;
		}

		/// <summary>
		/// Gets the endpoint for a service in a region.
		/// </summary>
		/// <param name="region">Get the static constants representing the regions can be used while constructing
		/// the AWS client instead of looking up the exact endpoint URL.</param>
		/// <returns>This class defines an endpoints hostname and which protocols it supports.</returns>
		public Amazon.RegionEndpoint.Endpoint GetEndpoint(Amazon.RegionEndpoint region)
		{
			return region.GetEndpointForService(_config.RegionEndpointServiceName);
		}

		/// <summary>
		/// The list of users.
		/// </summary>
		/// <param name="instanceId">The Amazon Connect instance id; if null then property InstanceId is used.</param>
		/// <param name="maxResults">The maximum number of results to return in the response.</param>
		/// <param name="nextToken">The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results.</param>
		/// <returns>The response from the ListUsers service method, as returned by Connect.</returns>
		public virtual Amazon.Connect.Model.ListUsersResponse ListUsers(string instanceId = null, int maxResults = 10, string nextToken = null)
		{
			// create the request.
			var usersRequest = new Amazon.Connect.Model.ListUsersRequest()
			{
				InstanceId = (!String.IsNullOrEmpty(instanceId) ? instanceId : _instanceId),
				MaxResults = maxResults,
				NextToken = nextToken
			};

			// make the request.
			return _client.ListUsers(usersRequest);
		}

		/// <summary>
		/// The list of users.
		/// </summary>
		/// <param name="instanceId">The Amazon Connect instance id; if null then property InstanceId is used.</param>
		/// <param name="maxResults">The maximum number of results to return in the response.</param>
		/// <param name="nextToken">The token for the next set of results. Use the value returned in the previous response in the next request to retrieve the next set of results.</param>
		/// <returns>The response from the ListUsers service method, as returned by Connect.</returns>
		public virtual Task<Amazon.Connect.Model.ListUsersResponse> ListUsersAsync(string instanceId = null, int maxResults = 10, string nextToken = null)
		{
			// create the request.
			var usersRequest = new Amazon.Connect.Model.ListUsersRequest()
			{
				InstanceId = (!String.IsNullOrEmpty(instanceId) ? instanceId : _instanceId),
				MaxResults = maxResults,
				NextToken = nextToken
			};

			// make the request.
			return _client.ListUsersAsync(usersRequest);
		}

		/// <summary>
		/// Get information about the user account specified by the UserId.
		/// </summary>
		/// <param name="userId">Unique identifier for the user account to return.</param>
		/// <param name="instanceId">The Amazon Connect instance id; if null then property InstanceId is used.</param>
		/// <returns>The response from the DescribeUser service method, as returned by Connect.</returns>
		public virtual Amazon.Connect.Model.DescribeUserResponse DescribeUser(string userId, string instanceId = null)
		{
			// create the request.
			var usersRequest = new Amazon.Connect.Model.DescribeUserRequest()
			{
				InstanceId = (!String.IsNullOrEmpty(instanceId) ? instanceId : _instanceId),
				UserId = userId
			};

			// make the request.
			return _client.DescribeUser(usersRequest);
		}

		/// <summary>
		/// Get information about the user account specified by the UserId.
		/// </summary>
		/// <param name="userId">Unique identifier for the user account to return.</param>
		/// <param name="instanceId">The Amazon Connect instance id; if null then property InstanceId is used.</param>
		/// <returns>The response from the DescribeUser service method, as returned by Connect.</returns>
		public virtual Task<Amazon.Connect.Model.DescribeUserResponse> DescribeUserAsync(string userId, string instanceId = null)
		{
			// create the request.
			var usersRequest = new Amazon.Connect.Model.DescribeUserRequest()
			{
				InstanceId = (!String.IsNullOrEmpty(instanceId) ? instanceId : _instanceId),
				UserId = userId
			};

			// make the request.
			return _client.DescribeUserAsync(usersRequest);
		}

		/// <summary>
		/// Gets a token for federation.
		/// </summary>
		/// <param name="instanceId">The Amazon Connect instance id; if null then property InstanceId is used.</param>
		/// <returns>The response from the GetFederationToken service method, as returned by Connect.</returns>
		public virtual Amazon.Connect.Model.GetFederationTokenResponse GetFederationToken(string instanceId = null)
		{
			// create the request.
			var usersRequest = new Amazon.Connect.Model.GetFederationTokenRequest()
			{
				InstanceId = (!String.IsNullOrEmpty(instanceId) ? instanceId : _instanceId)
			};

			// make the request.
			return _client.GetFederationToken(usersRequest);
		}

		/// <summary>
		/// Gets a token for federation.
		/// </summary>
		/// <param name="instanceId">The Amazon Connect instance id; if null then property InstanceId is used.</param>
		/// <returns>The response from the GetFederationToken service method, as returned by Connect.</returns>
		public virtual Task<Amazon.Connect.Model.GetFederationTokenResponse> GetFederationTokenAsync(string instanceId = null)
		{
			// create the request.
			var usersRequest = new Amazon.Connect.Model.GetFederationTokenRequest()
			{
				InstanceId = (!String.IsNullOrEmpty(instanceId) ? instanceId : _instanceId)
			};

			// make the request.
			return _client.GetFederationTokenAsync(usersRequest);
		}

		/// <summary>
		/// Start a contact flow to place an outbound call to a customer. If you are using an IAM account, it must have permission to the connect:StartOutboundVoiceContact action.
		/// There is a 60 second dialing timeout for this operation. If the call is not connected after 60 seconds, the call fails.
		/// </summary>
		/// <param name="contactFlowId">The identifier for the contact flow to connect the outbound call to.</param>
		/// <param name="destinationPhoneNumber">The phone number of the customer in E.164 format.</param>
		/// <param name="instanceId">The Amazon Connect instance id; if null then property InstanceId is used.</param>
		/// <returns>The response from the StartOutboundVoiceContact service method, as returned by Connect.</returns>
		public virtual Amazon.Connect.Model.StartOutboundVoiceContactResponse StartOutboundVoiceContact(
			string contactFlowId, string destinationPhoneNumber, string instanceId = null)
		{
			// create the request.
			var usersRequest = new Amazon.Connect.Model.StartOutboundVoiceContactRequest()
			{
				InstanceId = (!String.IsNullOrEmpty(instanceId) ? instanceId : _instanceId),
				ContactFlowId = contactFlowId,
				DestinationPhoneNumber = destinationPhoneNumber
			};

			// make the request.
			return _client.StartOutboundVoiceContact(usersRequest);
		}

		/// <summary>
		/// Start a contact flow to place an outbound call to a customer. If you are using an IAM account, it must have permission to the connect:StartOutboundVoiceContact action.
		/// There is a 60 second dialing timeout for this operation. If the call is not connected after 60 seconds, the call fails.
		/// </summary>
		/// <param name="contactFlowId">The identifier for the contact flow to connect the outbound call to.</param>
		/// <param name="destinationPhoneNumber">The phone number of the customer in E.164 format.</param>
		/// <param name="instanceId">The Amazon Connect instance id; if null then property InstanceId is used.</param>
		/// <returns>The response from the StartOutboundVoiceContact service method, as returned by Connect.</returns>
		public virtual Task<Amazon.Connect.Model.StartOutboundVoiceContactResponse> StartOutboundVoiceContactAsync(
			string contactFlowId, string destinationPhoneNumber, string instanceId = null)
		{
			// create the request.
			var usersRequest = new Amazon.Connect.Model.StartOutboundVoiceContactRequest()
			{
				InstanceId = (!String.IsNullOrEmpty(instanceId) ? instanceId : _instanceId),
				ContactFlowId = contactFlowId,
				DestinationPhoneNumber = destinationPhoneNumber
			};

			// make the request.
			return _client.StartOutboundVoiceContactAsync(usersRequest);
		}

		/// <summary>
		/// Stop the contact initiated by the StartOutboundVoiceContact operation.
		/// If you are using an IAM account, it must have permission to the connect:StopContact action.
		/// </summary>
		/// <param name="contactId">The unique identifier of the contact to end.</param>
		/// <param name="instanceId">The Amazon Connect instance id; if null then property InstanceId is used.</param>
		/// <returns>The response from the StopContact service method, as returned by Connect.</returns>
		public virtual Amazon.Connect.Model.StopContactResponse StopContact(string contactId, string instanceId = null)
		{
			// create the request.
			var usersRequest = new Amazon.Connect.Model.StopContactRequest()
			{
				InstanceId = (!String.IsNullOrEmpty(instanceId) ? instanceId : _instanceId),
				ContactId = contactId
			};

			// make the request.
			return _client.StopContact(usersRequest);
		}

		/// <summary>
		/// Stop the contact initiated by the StartOutboundVoiceContact operation.
		/// If you are using an IAM account, it must have permission to the connect:StopContact action.
		/// </summary>
		/// <param name="contactId">The unique identifier of the contact to end.</param>
		/// <param name="instanceId">The Amazon Connect instance id; if null then property InstanceId is used.</param>
		/// <returns>The response from the StopContact service method, as returned by Connect.</returns>
		public virtual Task<Amazon.Connect.Model.StopContactResponse> StopContactAsync(string contactId, string instanceId = null)
		{
			// create the request.
			var usersRequest = new Amazon.Connect.Model.StopContactRequest()
			{
				InstanceId = (!String.IsNullOrEmpty(instanceId) ? instanceId : _instanceId),
				ContactId = contactId
			};

			// make the request.
			return _client.StopContactAsync(usersRequest);
		}

		/// <summary>
		/// Initiates a contact flow to start a new chat for the customer. Response of this
		/// API provides a token required to obtain credentials from the CreateParticipantConnection
		/// API in the Amazon Connect Participant Service.
		/// When a new chat contact is successfully created, clients need to subscribe to
		/// the participant’s connection for the created chat within 5 minutes. This is achieved
		/// by invoking CreateParticipantConnection with WEBSOCKET and CONNECTION_CREDENTIALS.
		/// </summary>
		/// <param name="participantDetails">Information identifying the participant.</param>
		/// <param name="contactFlowId">The identifier of the contact flow for the chat.</param>
		/// <param name="clientToken">A unique, case-sensitive identifier that you provide to ensure the idempotency of the request.</param>
		/// <param name="initialMessage">The initial message to be sent to the newly created chat.</param>
		/// <param name="attributes">A custom key-value pair using an attribute map. The attributes are standard Amazon Connect attributes, and can be accessed in contact flows just like any other contact attributes.</param>
		/// <param name="instanceId">The Amazon Connect instance id; if null then property InstanceId is used.</param>
		/// <returns>The response from the StartChatContact service method, as returned by Connect.</returns>
		public virtual Amazon.Connect.Model.StartChatContactResponse StartChatContact(
			Amazon.Connect.Model.ParticipantDetails participantDetails,
			string contactFlowId, string clientToken, Amazon.Connect.Model.ChatMessage 
			initialMessage, Dictionary<string, string> attributes = null, string instanceId = null)
		{
			// create the request.
			var usersRequest = new Amazon.Connect.Model.StartChatContactRequest()
			{
				InstanceId = (!String.IsNullOrEmpty(instanceId) ? instanceId : _instanceId),
				ContactFlowId = contactFlowId,
				ClientToken = clientToken,
				InitialMessage = initialMessage,
				Attributes = attributes,
				ParticipantDetails = participantDetails,
			};

			// make the request.
			return _client.StartChatContact(usersRequest);
		}

		/// <summary>
		/// Initiates a contact flow to start a new chat for the customer. Response of this
		/// API provides a token required to obtain credentials from the CreateParticipantConnection
		/// API in the Amazon Connect Participant Service.
		/// When a new chat contact is successfully created, clients need to subscribe to
		/// the participant’s connection for the created chat within 5 minutes. This is achieved
		/// by invoking CreateParticipantConnection with WEBSOCKET and CONNECTION_CREDENTIALS.
		/// </summary>
		/// <param name="participantDetails">Information identifying the participant.</param>
		/// <param name="contactFlowId">The identifier of the contact flow for the chat.</param>
		/// <param name="clientToken">A unique, case-sensitive identifier that you provide to ensure the idempotency of the request.</param>
		/// <param name="attributes">A custom key-value pair using an attribute map. The attributes are standard Amazon Connect attributes, and can be accessed in contact flows just like any other contact attributes.</param>
		/// <param name="instanceId">The Amazon Connect instance id; if null then property InstanceId is used.</param>
		/// <returns>The response from the StartChatContact service method, as returned by Connect.</returns>
		public virtual Amazon.Connect.Model.StartChatContactResponse StartChatContact(
			Amazon.Connect.Model.ParticipantDetails participantDetails,
			string contactFlowId, string clientToken, 
			Dictionary<string, string> attributes = null, string instanceId = null)
		{
			// create the request.
			var usersRequest = new Amazon.Connect.Model.StartChatContactRequest()
			{
				InstanceId = (!String.IsNullOrEmpty(instanceId) ? instanceId : _instanceId),
				ContactFlowId = contactFlowId,
				ClientToken = clientToken,
				Attributes = attributes,
				ParticipantDetails = participantDetails,
			};

			// make the request.
			return _client.StartChatContact(usersRequest);
		}

		/// <summary>
		/// Initiates a contact flow to start a new chat for the customer. Response of this
		/// API provides a token required to obtain credentials from the CreateParticipantConnection
		/// API in the Amazon Connect Participant Service.
		/// When a new chat contact is successfully created, clients need to subscribe to
		/// the participant’s connection for the created chat within 5 minutes. This is achieved
		/// by invoking CreateParticipantConnection with WEBSOCKET and CONNECTION_CREDENTIALS.
		/// </summary>
		/// <param name="participantDetails">Information identifying the participant.</param>
		/// <param name="contactFlowId">The identifier of the contact flow for the chat.</param>
		/// <param name="clientToken">A unique, case-sensitive identifier that you provide to ensure the idempotency of the request.</param>
		/// <param name="initialMessage">The initial message to be sent to the newly created chat.</param>
		/// <param name="attributes">A custom key-value pair using an attribute map. The attributes are standard Amazon Connect attributes, and can be accessed in contact flows just like any other contact attributes.</param>
		/// <param name="instanceId">The Amazon Connect instance id; if null then property InstanceId is used.</param>
		/// <returns>The response from the StartChatContact service method, as returned by Connect.</returns>
		public virtual Task<Amazon.Connect.Model.StartChatContactResponse> StartChatContactAsync(
			Amazon.Connect.Model.ParticipantDetails participantDetails,
			string contactFlowId, string clientToken, Amazon.Connect.Model.ChatMessage initialMessage, 
			Dictionary<string, string> attributes = null, string instanceId = null)
		{
			// create the request.
			var usersRequest = new Amazon.Connect.Model.StartChatContactRequest()
			{
				InstanceId = (!String.IsNullOrEmpty(instanceId) ? instanceId : _instanceId),
				ContactFlowId = contactFlowId,
				ClientToken = clientToken,
				InitialMessage = initialMessage,
				Attributes = attributes,
				ParticipantDetails = participantDetails,
			};

			// make the request.
			return _client.StartChatContactAsync(usersRequest);
		}

		/// <summary>
		/// Initiates a contact flow to start a new chat for the customer. Response of this
		/// API provides a token required to obtain credentials from the CreateParticipantConnection
		/// API in the Amazon Connect Participant Service.
		/// When a new chat contact is successfully created, clients need to subscribe to
		/// the participant’s connection for the created chat within 5 minutes. This is achieved
		/// by invoking CreateParticipantConnection with WEBSOCKET and CONNECTION_CREDENTIALS.
		/// </summary>
		/// <param name="participantDetails">Information identifying the participant.</param>
		/// <param name="contactFlowId">The identifier of the contact flow for the chat.</param>
		/// <param name="clientToken">A unique, case-sensitive identifier that you provide to ensure the idempotency of the request.</param>
		/// <param name="attributes">A custom key-value pair using an attribute map. The attributes are standard Amazon Connect attributes, and can be accessed in contact flows just like any other contact attributes.</param>
		/// <param name="instanceId">The Amazon Connect instance id; if null then property InstanceId is used.</param>
		/// <returns>The response from the StartChatContact service method, as returned by Connect.</returns>
		public virtual Task<Amazon.Connect.Model.StartChatContactResponse> StartChatContactAsync(
			Amazon.Connect.Model.ParticipantDetails participantDetails,
			string contactFlowId, string clientToken,
			Dictionary<string, string> attributes = null, string instanceId = null)
		{
			// create the request.
			var usersRequest = new Amazon.Connect.Model.StartChatContactRequest()
			{
				InstanceId = (!String.IsNullOrEmpty(instanceId) ? instanceId : _instanceId),
				ContactFlowId = contactFlowId,
				ClientToken = clientToken,
				Attributes = attributes,
				ParticipantDetails = participantDetails,
			};

			// make the request.
			return _client.StartChatContactAsync(usersRequest);
		}

		/// <summary>
		/// Creates the participant's connection. Note that ParticipantToken is used for
		/// invoking this API instead of ConnectionToken.
		/// The participant token is valid for the lifetime of the participant – until the
		/// they are part of a contact.
		/// The response URL for WEBSOCKET Type has a connect expiry timeout of 100s. Clients
		/// must manually connect to the returned websocket URL and subscribe to the desired topic.
		/// For chat, you need to publish the following on the established websocket connection:
		/// {"topic":"aws/subscribe","content":{"topics":["aws/chat"]}}
		/// Upon websocket URL expiry, as specified in the response ConnectionExpiry parameter,
		/// clients need to call this API again to obtain a new websocket URL and perform
		/// the same steps as before.
		/// </summary>
		/// <param name="participantToken">Participant Token as obtained from StartChatContact API response.</param>
		/// <returns>The response from the CreateParticipantConnection service method, as returned by ConnectParticipant.</returns>
		public virtual Amazon.ConnectParticipant.Model.CreateParticipantConnectionResponse CreateParticipantConnection(string participantToken)
		{
			// Add the connection types.
			List<string> connectionType = new List<string>
			{
				"WEBSOCKET",
				"CONNECTION_CREDENTIALS"
			};

			// create the request.
			var usersRequest = new Amazon.ConnectParticipant.Model.CreateParticipantConnectionRequest()
			{
				Type = connectionType,
				ParticipantToken = participantToken
			};

			// make the request.
			return _cpClient.CreateParticipantConnection(usersRequest);
		}

		/// <summary>
		/// Creates the participant's connection. Note that ParticipantToken is used for
		/// invoking this API instead of ConnectionToken.
		/// The participant token is valid for the lifetime of the participant – until the
		/// they are part of a contact.
		/// The response URL for WEBSOCKET Type has a connect expiry timeout of 100s. Clients
		/// must manually connect to the returned websocket URL and subscribe to the desired topic.
		/// For chat, you need to publish the following on the established websocket connection:
		/// {"topic":"aws/subscribe","content":{"topics":["aws/chat"]}}
		/// Upon websocket URL expiry, as specified in the response ConnectionExpiry parameter,
		/// clients need to call this API again to obtain a new websocket URL and perform
		/// the same steps as before.
		/// </summary>
		/// <param name="participantToken">Participant Token as obtained from StartChatContact API response.</param>
		/// <returns>The response from the CreateParticipantConnection service method, as returned by ConnectParticipant.</returns>
		public virtual Task<Amazon.ConnectParticipant.Model.CreateParticipantConnectionResponse> CreateParticipantConnectionAsync(string participantToken)
		{
			// Add the connection types.
			List<string> connectionType = new List<string>
			{
				"WEBSOCKET",
				"CONNECTION_CREDENTIALS"
			};

			// create the request.
			var usersRequest = new Amazon.ConnectParticipant.Model.CreateParticipantConnectionRequest()
			{
				Type = connectionType,
				ParticipantToken = participantToken
			};

			// make the request.
			return _cpClient.CreateParticipantConnectionAsync(usersRequest);
		}

		/// <summary>
		/// Disconnects a participant. Note that ConnectionToken is used for invoking this API instead of ParticipantToken.
		/// </summary>
		/// <param name="clientToken">A unique, case-sensitive identifier that you provide to ensure the idempotency of the request.</param>
		/// <param name="connectionToken">The authentication token associated with the participant's connection.</param>
		/// <returns>The response from the DisconnectParticipant service method, as returned by ConnectParticipant.</returns>
		public virtual Amazon.ConnectParticipant.Model.DisconnectParticipantResponse DisconnectParticipant(string clientToken, string connectionToken)
		{
			// create the request.
			var usersRequest = new Amazon.ConnectParticipant.Model.DisconnectParticipantRequest()
			{
				ClientToken = clientToken,
				ConnectionToken = connectionToken
			};

			// make the request.
			return _cpClient.DisconnectParticipant(usersRequest);
		}

		/// <summary>
		/// Disconnects a participant. Note that ConnectionToken is used for invoking this API instead of ParticipantToken.
		/// </summary>
		/// <param name="clientToken">A unique, case-sensitive identifier that you provide to ensure the idempotency of the request.</param>
		/// <param name="connectionToken">The authentication token associated with the participant's connection.</param>
		/// <returns>The response from the DisconnectParticipant service method, as returned by ConnectParticipant.</returns>
		public virtual Task<Amazon.ConnectParticipant.Model.DisconnectParticipantResponse> DisconnectParticipantAsync(string clientToken, string connectionToken)
		{
			// create the request.
			var usersRequest = new Amazon.ConnectParticipant.Model.DisconnectParticipantRequest()
			{
				ClientToken = clientToken,
				ConnectionToken = connectionToken
			};

			// make the request.
			return _cpClient.DisconnectParticipantAsync(usersRequest);
		}

		/// <summary>
		/// Retrieves a transcript of the session. Note that ConnectionToken is used for invoking this API instead of ParticipantToken.
		/// </summary>
		/// <param name="contactId">The unique identifier of the contact to end.</param>
		/// <param name="connectionToken">The authentication token associated with the participant's connection.</param>
		/// <param name="maxResults">The maximum number of results to return in the page. Default: 10.</param>
		/// <param name="nextToken">The pagination token. Use the value returned previously in the next subsequent request to retrieve the next set of results.</param>
		/// <param name="scanDirection">The direction from StartPosition from which to retrieve message. Default: BACKWARD when no StartPosition is provided, FORWARD with StartPosition.</param>
		/// <param name="sortOrder">The sort order for the records. Default: DESCENDING.</param>
		/// <param name="startPosition">A filtering option for where to start.</param>
		/// <returns>The response from the GetTranscript service method, as returned by ConnectParticipant.</returns>
		public virtual Amazon.ConnectParticipant.Model.GetTranscriptResponse GetTranscript(string contactId, string connectionToken,
			int maxResults = 10, string nextToken = null, Amazon.ConnectParticipant.ScanDirection scanDirection = null,
			Amazon.ConnectParticipant.SortKey sortOrder = null, Amazon.ConnectParticipant.Model.StartPosition startPosition = null)
		{
			// create the request.
			var usersRequest = new Amazon.ConnectParticipant.Model.GetTranscriptRequest()
			{
				ContactId = contactId,
				ConnectionToken = connectionToken,
				MaxResults = maxResults,
				NextToken = nextToken,
				ScanDirection = scanDirection,
				SortOrder = sortOrder,
				StartPosition = startPosition
			};

			// make the request.
			return _cpClient.GetTranscript(usersRequest);
		}

		/// <summary>
		/// Retrieves a transcript of the session. Note that ConnectionToken is used for invoking this API instead of ParticipantToken.
		/// </summary>
		/// <param name="contactId">The unique identifier of the contact to end.</param>
		/// <param name="connectionToken">The authentication token associated with the participant's connection.</param>
		/// <param name="maxResults">The maximum number of results to return in the page. Default: 10.</param>
		/// <param name="nextToken">The pagination token. Use the value returned previously in the next subsequent request to retrieve the next set of results.</param>
		/// <param name="scanDirection">The direction from StartPosition from which to retrieve message. Default: BACKWARD when no StartPosition is provided, FORWARD with StartPosition.</param>
		/// <param name="sortOrder">The sort order for the records. Default: DESCENDING.</param>
		/// <param name="startPosition">A filtering option for where to start.</param>
		/// <returns>The response from the GetTranscript service method, as returned by ConnectParticipant.</returns>
		public virtual Task<Amazon.ConnectParticipant.Model.GetTranscriptResponse> GetTranscriptAsync(string contactId, string connectionToken,
			int maxResults = 10, string nextToken = null, Amazon.ConnectParticipant.ScanDirection scanDirection = null,
			Amazon.ConnectParticipant.SortKey sortOrder = null, Amazon.ConnectParticipant.Model.StartPosition startPosition = null)
		{
			// create the request.
			var usersRequest = new Amazon.ConnectParticipant.Model.GetTranscriptRequest()
			{
				ContactId = contactId,
				ConnectionToken = connectionToken,
				MaxResults = maxResults,
				NextToken = nextToken,
				ScanDirection = scanDirection,
				SortOrder = sortOrder,
				StartPosition = startPosition
			};

			// make the request.
			return _cpClient.GetTranscriptAsync(usersRequest);
		}

		/// <summary>
		/// Sends an event. Note that ConnectionToken is used for invoking this API instead of ParticipantToken.
		/// </summary>
		/// <param name="clientToken">A unique, case-sensitive identifier that you provide to ensure the idempotency of the request.</param>
		/// <param name="connectionToken">The authentication token associated with the participant's connection.</param>
		/// <param name="content">The content of the event to be sent (for example, message text). This is not yet supported.</param>
		/// <param name="contentType">
		/// The content type of the request. Supported types are:
		///     application/vnd.amazonaws.connect.event.typing
		///     application/vnd.amazonaws.connect.event.connection.acknowledged
		/// </param>
		/// <returns>The response from the SendEvent service method, as returned by ConnectParticipant.</returns>
		public virtual Amazon.ConnectParticipant.Model.SendEventResponse SendEvent(
			string clientToken, string connectionToken, string content, string contentType = "application/vnd.amazonaws.connect.event.typing")
		{
			// create the request.
			var usersRequest = new Amazon.ConnectParticipant.Model.SendEventRequest()
			{
				ClientToken = clientToken,
				ConnectionToken = connectionToken,
				Content = content,
				ContentType = contentType
			};

			// make the request.
			return _cpClient.SendEvent(usersRequest);
		}

		/// <summary>
		/// Sends an event. Note that ConnectionToken is used for invoking this API instead of ParticipantToken.
		/// </summary>
		/// <param name="clientToken">A unique, case-sensitive identifier that you provide to ensure the idempotency of the request.</param>
		/// <param name="connectionToken">The authentication token associated with the participant's connection.</param>
		/// <param name="content">The content of the event to be sent (for example, message text). This is not yet supported.</param>
		/// <param name="contentType">
		/// The content type of the request. Supported types are:
		///     application/vnd.amazonaws.connect.event.typing
		///     application/vnd.amazonaws.connect.event.connection.acknowledged
		/// </param>
		/// <returns>The response from the SendEvent service method, as returned by ConnectParticipant.</returns>
		public virtual Task<Amazon.ConnectParticipant.Model.SendEventResponse> SendEventAsync(
			string clientToken, string connectionToken, string content, string contentType = "application/vnd.amazonaws.connect.event.typing")
		{
			// create the request.
			var usersRequest = new Amazon.ConnectParticipant.Model.SendEventRequest()
			{
				ClientToken = clientToken,
				ConnectionToken = connectionToken,
				Content = content,
				ContentType = contentType
			};

			// make the request.
			return _cpClient.SendEventAsync(usersRequest);
		}

		/// <summary>
		/// Sends a message. Note that ConnectionToken is used for invoking this API instead of ParticipantToken.
		/// </summary>
		/// <param name="clientToken">A unique, case-sensitive identifier that you provide to ensure the idempotency of the request.</param>
		/// <param name="connectionToken">The authentication token associated with the participant's connection.</param>
		/// <param name="content">The content of the message.</param>
		/// <param name="contentType">The type of the content. Supported types are text/plain.</param>
		/// <returns>The response from the SendMessage service method, as returned by ConnectParticipant.</returns>
		public virtual Amazon.ConnectParticipant.Model.SendMessageResponse SendMessage(
			string clientToken, string connectionToken, string content, string contentType = "text/plain")
		{
			// create the request.
			var usersRequest = new Amazon.ConnectParticipant.Model.SendMessageRequest()
			{
				ClientToken = clientToken,
				ConnectionToken = connectionToken,
				Content = content,
				ContentType = contentType
			};

			// make the request.
			return _cpClient.SendMessage(usersRequest);
		}

		/// <summary>
		/// Sends a message. Note that ConnectionToken is used for invoking this API instead of ParticipantToken.
		/// </summary>
		/// <param name="clientToken">A unique, case-sensitive identifier that you provide to ensure the idempotency of the request.</param>
		/// <param name="connectionToken">The authentication token associated with the participant's connection.</param>
		/// <param name="content">The content of the message.</param>
		/// <param name="contentType">The type of the content. Supported types are text/plain.</param>
		/// <returns>The response from the SendMessage service method, as returned by ConnectParticipant.</returns>
		public virtual Task<Amazon.ConnectParticipant.Model.SendMessageResponse> SendMessageAsync(
			string clientToken, string connectionToken, string content, string contentType = "text/plain")
		{
			// create the request.
			var usersRequest = new Amazon.ConnectParticipant.Model.SendMessageRequest()
			{
				ClientToken = clientToken,
				ConnectionToken = connectionToken,
				Content = content,
				ContentType = contentType
			};

			// make the request.
			return _cpClient.SendMessageAsync(usersRequest);
		}

		#region Dispose Object Methods
		/// <summary>
		/// Track whether Dispose has been called.
		/// </summary>
		private bool _disposed = false;

		/// <summary>
		/// Implement IDisposable.
		/// Do not make this method virtual.
		/// A derived class should not be able to override this method.
		/// </summary>
		public void Dispose()
		{
			Dispose(true);
			// This object will be cleaned up by the Dispose method.
			// Therefore, you should call GC.SuppressFinalize to
			// take this object off the finalization queue
			// and prevent finalization code for this object
			// from executing a second time.
			GC.SuppressFinalize(this);
		}

		/// <summary>
		/// Dispose(bool disposing) executes in two distinct scenarios.
		/// If disposing equals true, the method has been called directly
		/// or indirectly by a user's code. Managed and unmanaged resources
		/// can be disposed.
		/// If disposing equals false, the method has been called by the
		/// runtime from inside the finalizer and you should not reference
		/// other objects. Only unmanaged resources can be disposed.
		/// </summary>
		protected virtual void Dispose(bool disposing)
		{
			// Check to see if Dispose has already been called.
			if (!this._disposed)
			{
				// Note disposing has been done.
				_disposed = true;

				// If disposing equals true, dispose all managed
				// and unmanaged resources.
				if (disposing)
				{
					// Dispose managed resources.
					if (_webSocketClient != null)
						_webSocketClient.Dispose();
				}

				// Call the appropriate methods to clean up
				// unmanaged resources here.
				_webSocketClient = null;
			}
		}

		/// <summary>
		/// Use C# destructor syntax for finalization code.
		/// This destructor will run only if the Dispose method
		/// does not get called.
		/// It gives your base class the opportunity to finalize.
		/// Do not provide destructors in types derived from this class.
		/// </summary>
		~Client()
		{
			// Do not re-create Dispose clean-up code here.
			// Calling Dispose(false) is optimal in terms of
			// readability and maintainability.
			Dispose(false);
		}
		#endregion
	}
}
