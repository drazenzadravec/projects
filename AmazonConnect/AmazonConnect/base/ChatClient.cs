using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;

namespace Lake.AmazonConnect
{
	/// <summary>
	/// Start chat contact handler.
	/// </summary>
	/// <param name="sender">The current sender.</param>
	/// <param name="success">True if a successful response; else false.</param>
	/// <param name="statusCode">The status code.</param>
	/// <param name="metadata">The response metadata.</param>
	public delegate void StartChatContactHandler(object sender, bool success, int statusCode, Lake.AmazonConnect.Model.ResponseMetadata metadata);

	/// <summary>
	/// End chat contact handler.
	/// </summary>
	/// <param name="sender">The current sender.</param>
	/// <param name="statusCode">The status code.</param>
	public delegate void EndChatContactHandler(object sender, int statusCode);

	/// <summary>
	/// Sent chat contact handler.
	/// </summary>
	/// <param name="sender">The current sender.</param>
	/// <param name="success">True if a successful response; else false.</param>
	/// <param name="statusCode">The status code.</param>
	/// <param name="messageId">The message id.</param>
	public delegate void SentChatContactHandler(object sender, bool success, int statusCode, string messageId);

	/// <summary>
	/// Receive chat contact data handler.
	/// </summary>
	/// <param name="sender">The current sender.</param>
	/// <param name="data">The received chat data.</param>
	public delegate void ReceiveChatContactDataHandler(object sender, string data);

	/// <summary>
	/// Amazon connect chat client.
	/// </summary>
	public class ChatClient : IDisposable
	{
		/// <summary>
		/// Amazon connect chat client.
		/// </summary>
		public ChatClient()
		{
			_sentAsync = new AutoResetEvent(false);
		}

		private Client _client = null;
		private string _accessKey = null;
		private string _secretKey = null;
		private string _region = "ap-southeast-2";

		private string _instanceId = null;
		private string _contactFlowId = null;
		private string _clientToken = null;
		private string _displayName = null;
		private string _initialMessage = "";
		private readonly Dictionary<string, string> _attributes = new Dictionary<string, string>();

		private string _contactId = null;
		private string _participantId = null;
		private string _participantToken = null;

		private string _websocketConnectionExpiry = null;
		private string _websocketUrl = null;
		private string _connectionExpiry = null;
		private string _connectionToken = null;

		private bool _success = false;
		private Model.ResponseMetadata _metadata = new Model.ResponseMetadata();
		private int _statusCode = 0;

		private bool _isActiveChat = false;
		private AutoResetEvent _sentAsync = null;

		/// <summary>
		/// Start chat event.
		/// </summary>
		public event StartChatContactHandler StartChat;

		/// <summary>
		/// Receive chat event.
		/// </summary>
		public event ReceiveChatContactDataHandler ReceiveChat;

		/// <summary>
		/// End chat event.
		/// </summary>
		public event EndChatContactHandler EndChat;

		/// <summary>
		/// Sent chat event.
		/// </summary>
		public event SentChatContactHandler SentChat;

		/// <summary>
		/// Gets or sets the access key.
		/// </summary>
		public string AccessKey
		{
			get => _accessKey;
			set => _accessKey = value;
		}

		/// <summary>
		/// Gets or sets the secret key.
		/// </summary>
		public string SecretKey
		{
			get => _secretKey;
			set => _secretKey = value;
		}

		/// <summary>
		/// Gets or sets the region.
		/// </summary>
		public string Region
		{
			get => _region;
			set => _region = value;
		}

		/// <summary>
		/// Gets or sets the attributes are standard Amazon Connect attributes, 
		/// and can be accessed in contact flows just like any other contact attributes.
		/// </summary>
		public Dictionary<string, string> Attributes
		{
			get => _attributes;
		}

		/// <summary>
		/// Gets or sets the initial message to be sent to the newly created chat.
		/// </summary>
		public string InitialMessage
		{
			get => _initialMessage;
			set => _initialMessage = value;
		}

		/// <summary>
		/// Gets or sets the Amazon Connect chat display name.
		/// </summary>
		public string DisplayName
		{
			get => _displayName;
			set => _displayName = value;
		}

		/// <summary>
		/// Gets or sets the Amazon Connect Instance Id.
		/// </summary>
		public string InstanceId
		{
			get => _instanceId;
			set => _instanceId = value;
		}

		/// <summary>
		/// Gets or sets the Amazon Connect Contact Flow Id.
		/// </summary>
		public string ContactFlowId
		{
			get => _contactFlowId;
			set => _contactFlowId = value;
		}

		/// <summary>
		/// Gets the Amazon Connect client token.
		/// </summary>
		public string ClientToken
		{
			get => _clientToken;
		}

		/// <summary>
		/// Gets the identifier of this contact within the Amazon Connect instance.
		/// </summary>
		public string ContactId
		{
			get => _contactId;
		}

		/// <summary>
		/// Gets the identifier for a chat participant. The participantId for a chat participant is the same throughout the chat lifecycle.
		/// </summary>
		public string ParticipantId
		{
			get => _participantId;
		}

		/// <summary>
		/// Gets the token used by the chat participant to call CreateParticipantConnection. The participant token is valid for the lifetime of a chat participant.
		/// </summary>
		public string ParticipantToken
		{
			get => _participantToken;
		}

		/// <summary>
		/// Gets the URL expiration timestamp in ISO date format.
		/// It's specified in ISO 8601 format: yyyy-MM-ddThh:mm:ss.SSSZ. For example, 2019-11-08T02:41:28.172Z.
		/// </summary>
		public string WebsocketExpiry
		{
			get => _websocketConnectionExpiry;
		}

		/// <summary>
		/// Gets the URL of the websocket.
		/// </summary>
		public string WebsocketUrl
		{
			get => _websocketUrl;
		}

		/// <summary>
		/// Gets the expiration of the token.
		/// It's specified in ISO 8601 format: yyyy-MM-ddThh:mm:ss.SSSZ. For example, 2019-11-08T02:41:28.172Z.
		/// </summary>
		public string ConnectionExpiry
		{
			get => _connectionExpiry;
		}

		/// <summary>
		/// Gets the connection token.
		/// </summary>
		public string ConnectionToken
		{
			get => _connectionToken;
		}

		/// <summary>
		/// Send a message.
		/// </summary>
		/// <param name="message">The message to send.</param>
		public async Task SendMessage(string message)
		{
			// chat client is registered.
			if (_isActiveChat)
			{
				// send the message.
				var response = await _client.SendMessageAsync(_clientToken, _connectionToken, message);

				// if a successful response.
				if ((int)response.HttpStatusCode >= 200 && (int)response.HttpStatusCode <= 299)
				{
					// send success.
					SentChat?.Invoke(this, true, (int)response.HttpStatusCode, response.Id);
				}
				else
				{
					// send success.
					SentChat?.Invoke(this, false, (int)response.HttpStatusCode, response.Id);
				}
			}
			else
			{
				throw new Exception("Register the chat client.");
			}
		}

		/// <summary>
		/// End the contact session.
		/// </summary>
		public async Task EndContact()
		{
			// chat client is registered.
			if (_isActiveChat)
			{
				try
				{
					// disconnect the participant.
					var response = await _client.DisconnectParticipantAsync(_clientToken, _connectionToken);
					_statusCode = (int)response.HttpStatusCode;
				}
				catch { }

				try
				{
					// stop the contact.
					var responseStop = await _client.StopContactAsync(_contactId);
					_statusCode = (int)responseStop.HttpStatusCode;
				}
				catch { }

				try
				{
					// end the web socket connection.
					await _client.WebSocketClient.Close();
				}
				catch { }
			}
			else
			{
				throw new Exception("Register the chat client.");
			}
		}

		/// <summary>
		/// Start a new chat contact, initiates a contact flow to start a new chat for the customer.
		/// </summary>
		/// <exception cref="Exception">Register the chat client.</exception>
		public async Task StartContact()
		{
			_success = false;

			// chat client is registered.
			if (_isActiveChat)
			{
				// Add the attributes.
				_attributes.Add("customerName", _displayName);
				_attributes.Add("username", _displayName);

				// start a new chat contact.
				var response = await _client.StartChatContactAsync(
					new Amazon.Connect.Model.ParticipantDetails()
					{
						DisplayName = _displayName
					},
					_contactFlowId, _clientToken, _attributes);

				// if a successful response.
				if ((int)response.HttpStatusCode >= 200 && (int)response.HttpStatusCode <= 299)
				{
					// assign the response values.
					_contactId = response.ContactId;
					_participantId = response.ParticipantId;
					_participantToken = response.ParticipantToken;

					// successful response.
					_success = true;

					// some error in the response.
					if (response.ResponseMetadata != null)
					{
						_metadata.RequestId = response.ResponseMetadata.RequestId;
						_metadata.Metadata = response.ResponseMetadata.Metadata;
					}

					// create participant connection. 
					var responseConnection = await _client.CreateParticipantConnectionAsync(_participantToken);
					_statusCode = (int)responseConnection.HttpStatusCode;

					// if a successful response.
					if ((int)responseConnection.HttpStatusCode >= 200 && (int)responseConnection.HttpStatusCode <= 299)
					{
						// assign the response values.
						_websocketConnectionExpiry = responseConnection.Websocket?.ConnectionExpiry;
						_websocketUrl = responseConnection.Websocket?.Url;
						_connectionExpiry = responseConnection.ConnectionCredentials?.Expiry;
						_connectionToken = responseConnection.ConnectionCredentials?.ConnectionToken;

						// some error in the response.
						if (responseConnection.ResponseMetadata != null)
						{
							_metadata.RequestId = responseConnection.ResponseMetadata.RequestId;
							_metadata.Metadata = responseConnection.ResponseMetadata.Metadata;
						}

						// make a connect to the websocket server.
						if (_websocketUrl != null)
						{
							// successful response.
							_success = true;

							// open a websocket connection.
							_client.WebSocketClient.Uri = new Uri(_websocketUrl);
							await _client.WebSocketClient.Connect();

							// send the message to the websocket connection.
							await _client.WebSocketClient.SendText(Encoding.UTF8.GetBytes("{\"topic\":\"aws/subscribe\",\"content\":{\"topics\":[\"aws/chat\"]}}"));

							// block until sent.
							_sentAsync.WaitOne(5000);
						}
						else
						{
							// un-successful response.
							_success = false;
						}
					}
					else
					{
						// un-successful response.
						_success = false;

						// some error in the response.
						if (responseConnection.ResponseMetadata != null)
						{
							_metadata.RequestId = responseConnection.ResponseMetadata.RequestId;
							_metadata.Metadata = responseConnection.ResponseMetadata.Metadata;
						}
					}
				}
				else
				{
					// un-successful response.
					_success = false;

					// some error in the response.
					if (response.ResponseMetadata != null)
					{
						_metadata.RequestId = response.ResponseMetadata.RequestId;
						_metadata.Metadata = response.ResponseMetadata.Metadata;
					}
				}
			}
			else
			{
				throw new Exception("Register the chat client.");
			}
		}

		/// <summary>
		/// Register new client instance after assign all parameters.
		/// </summary>
		/// <exception cref="ArgumentNullException">Null objects or empty values are not allowed.</exception>
		public void Register()
		{
			// Throw if null or empty.
			if (String.IsNullOrEmpty(_accessKey)) throw new ArgumentNullException(nameof(_accessKey));
			if (String.IsNullOrEmpty(_secretKey)) throw new ArgumentNullException(nameof(_secretKey));
			if (String.IsNullOrEmpty(_region)) throw new ArgumentNullException(nameof(_region));

			if (String.IsNullOrEmpty(_instanceId)) throw new ArgumentNullException(nameof(_instanceId));
			if (String.IsNullOrEmpty(_displayName)) throw new ArgumentNullException(nameof(_displayName));
			if (String.IsNullOrEmpty(_contactFlowId)) throw new ArgumentNullException(nameof(_contactFlowId));

			// create the client.
			_client = new Client(_accessKey, _secretKey, _region)
			{
				InstanceId = _instanceId
			};

			// attach to the websocket events.
			_client.WebSocketClient.OnConnected += WebSocketClient_OnConnected;
			_client.WebSocketClient.OnDisconnected += WebSocketClient_OnDisconnected;
			_client.WebSocketClient.OnReceive = OnReceive;
			_client.WebSocketClient.SentAsyncSignal = _sentAsync;

			// create a new client token.
			_clientToken = Guid.NewGuid().ToString().Replace("-", "") + Guid.NewGuid().ToString().Replace("-", "");
			_isActiveChat = true;
		}

		/// <summary>
		/// Web socket On Disconnected.
		/// </summary>
		/// <param name="sender">The sender.</param>
		/// <param name="e">The event args.</param>
		private void WebSocketClient_OnDisconnected(object sender, EventArgs e)
		{
			// send the event.
			EndChat?.Invoke(this, _statusCode);
		}

		/// <summary>
		/// Web socket On Connected. 
		/// </summary>
		/// <param name="sender">The sender.</param>
		/// <param name="e">The event args.</param>
		private void WebSocketClient_OnConnected(object sender, EventArgs e)
		{
			// send the event.
			StartChat?.Invoke(this, _success, _statusCode, _metadata);
		}

		/// <summary>
		/// On receive data.
		/// </summary>
		/// <param name="data">The data.</param>
		/// <param name="result">The web socket result.</param>
		private void OnReceive(byte[] data, System.Net.WebSockets.WebSocketReceiveResult result)
		{
			// send the event.
			ReceiveChat?.Invoke(this, Encoding.UTF8.GetString(data, 0, result.Count));
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
					if (_client != null)
						_client.Dispose();

					if (_sentAsync != null)
						_sentAsync.Dispose();
				}

				// Call the appropriate methods to clean up
				// unmanaged resources here.
				_client = null;
				_sentAsync = null;
				_isActiveChat = false;
			}
		}

		/// <summary>
		/// Use C# destructor syntax for finalization code.
		/// This destructor will run only if the Dispose method
		/// does not get called.
		/// It gives your base class the opportunity to finalize.
		/// Do not provide destructors in types derived from this class.
		/// </summary>
		~ChatClient()
		{
			// Do not re-create Dispose clean-up code here.
			// Calling Dispose(false) is optimal in terms of
			// readability and maintainability.
			Dispose(false);
		}
		#endregion
	}
}
