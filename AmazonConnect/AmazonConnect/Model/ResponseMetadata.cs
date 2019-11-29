using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lake.AmazonConnect.Model
{
	/// <summary>
	/// Response metadata.
	/// </summary>
	public class ResponseMetadata
	{
		/// <summary>
		/// Gets or sets the ID that uniquely identifies a request.
		/// Amazon keeps track of request IDs. If you have a question about a request, include
		/// the request ID in your correspondence.
		/// </summary>
		public string RequestId { get; set; }

		/// <summary>
		/// Gets or sets the metadata.
		/// </summary>
		public IDictionary<string, string> Metadata { get; set; }
	}
}
