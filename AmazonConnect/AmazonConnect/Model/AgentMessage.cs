//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Lake.AmazonConnect.Model.Ex1
{
    using System;
    using System.Threading;
    using System.Collections;
    using System.Collections.Generic;
    
    
    #region content Data Type
    /// <summary>
    /// The content data object class.
    /// </summary>
    public partial class content
    {
        
        private System.Nullable<System.DateTime> _AbsoluteTime;
        
        private string _Content;
        
        private string _ContentType;
        
        private string _Id;
        
        private string _Type;
        
        private string _ParticipantId;
        
        private string _DisplayName;
        
        private string _ParticipantRole;
        
        private string _InitialContactId;
        
        private string _ContactId;
        
        #region Extensibility Method Definitions
        /// <summary>
        /// On create data entity.
        /// </summary>
		partial void OnCreated();

        /// <summary>
        /// On load data entity.
        /// </summary>
		partial void OnLoaded();

		#endregion
        
        /// <summary>
        /// Default constructor.
        /// </summary>
        public content()
        {
            OnCreated();
        }
        
        /// <summary>
        /// Gets or sets, the absolutetime property for the object.
        /// </summary>
        public System.Nullable<System.DateTime> AbsoluteTime
        {
            get
            {
                return this._AbsoluteTime;
            }
            set
            {
                this._AbsoluteTime = value;
            }
        }
        
        /// <summary>
        /// Gets or sets, the content property for the object.
        /// </summary>
        public string Content
        {
            get
            {
                return this._Content;
            }
            set
            {
                this._Content = value;
            }
        }
        
        /// <summary>
        /// Gets or sets, the contenttype property for the object.
        /// </summary>
        public string ContentType
        {
            get
            {
                return this._ContentType;
            }
            set
            {
                this._ContentType = value;
            }
        }
        
        /// <summary>
        /// Gets or sets, the id property for the object.
        /// </summary>
        public string Id
        {
            get
            {
                return this._Id;
            }
            set
            {
                this._Id = value;
            }
        }
        
        /// <summary>
        /// Gets or sets, the type property for the object.
        /// </summary>
        public string Type
        {
            get
            {
                return this._Type;
            }
            set
            {
                this._Type = value;
            }
        }
        
        /// <summary>
        /// Gets or sets, the participantid property for the object.
        /// </summary>
        public string ParticipantId
        {
            get
            {
                return this._ParticipantId;
            }
            set
            {
                this._ParticipantId = value;
            }
        }
        
        /// <summary>
        /// Gets or sets, the displayname property for the object.
        /// </summary>
        public string DisplayName
        {
            get
            {
                return this._DisplayName;
            }
            set
            {
                this._DisplayName = value;
            }
        }
        
        /// <summary>
        /// Gets or sets, the participantrole property for the object.
        /// </summary>
        public string ParticipantRole
        {
            get
            {
                return this._ParticipantRole;
            }
            set
            {
                this._ParticipantRole = value;
            }
        }
        
        /// <summary>
        /// Gets or sets, the initialcontactid property for the object.
        /// </summary>
        public string InitialContactId
        {
            get
            {
                return this._InitialContactId;
            }
            set
            {
                this._InitialContactId = value;
            }
        }
        
        /// <summary>
        /// Gets or sets, the contactid property for the object.
        /// </summary>
        public string ContactId
        {
            get
            {
                return this._ContactId;
            }
            set
            {
                this._ContactId = value;
            }
        }
    }
    #endregion
    
    #region AgentMessageResponse Data Type
    /// <summary>
    /// The agentmessageresponse data object class.
    /// </summary>
    public partial class AgentMessageResponse
    {
        
        private content _content;
        
        private string _contentType;
        
        private string _topic;
        
        #region Extensibility Method Definitions
        /// <summary>
        /// On create data entity.
        /// </summary>
		partial void OnCreated();

        /// <summary>
        /// On load data entity.
        /// </summary>
		partial void OnLoaded();

		#endregion
        
        /// <summary>
        /// Default constructor.
        /// </summary>
        public AgentMessageResponse()
        {
            OnCreated();
        }
        
        /// <summary>
        /// Gets or sets, the content property for the object.
        /// </summary>
        public content content
        {
            get
            {
                return this._content;
            }
            set
            {
                this._content = value;
            }
        }
        
        /// <summary>
        /// Gets or sets, the contenttype property for the object.
        /// </summary>
        public string contentType
        {
            get
            {
                return this._contentType;
            }
            set
            {
                this._contentType = value;
            }
        }
        
        /// <summary>
        /// Gets or sets, the topic property for the object.
        /// </summary>
        public string topic
        {
            get
            {
                return this._topic;
            }
            set
            {
                this._topic = value;
            }
        }
    }
    #endregion
}
