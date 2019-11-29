cd ..
cd base
node build.js
cd ..
cd build
node minify.js
cd ..
cd base
copy "AmazonConnect.bundle.js" "..\..\publish-web\AmazonConnect.bundle.js"
copy "AmazonConnect.bundle.min.o.js" "..\..\publish-web\AmazonConnect.bundle.min.o.js"
copy "amazonconnectapi.js" "..\..\publish-web\amazonconnectapi.js"
copy "amazonconnectapi.min.o.js" "..\..\publish-web\amazonconnectapi.min.o.js"
copy "AmazonConnect.d.ts" "..\..\publish-ts\AmazonConnect.d.ts"
copy "AmazonConnect.js" "..\..\publish-ts\AmazonConnect.js"
copy "AmazonConnect.js.map" "..\..\publish-ts\AmazonConnect.js.map"
copy "AmazonConnect.ts" "..\..\publish-ts\AmazonConnect.ts"
copy "AmazonConnectInterface.d.ts" "..\..\publish-ts\AmazonConnectInterface.d.ts"
copy "AmazonConnectInterface.js" "..\..\publish-ts\AmazonConnectInterface.js"
copy "AmazonConnectInterface.js.map" "..\..\publish-ts\AmazonConnectInterface.js.map"
copy "AmazonConnectInterface.ts" "..\..\publish-ts\AmazonConnectInterface.ts"
cd ..
cd css
copy "lake-css-ui.bundle.css" "..\..\publish-web\lake-css-ui.bundle.css"
copy "lake-css-ui.bundle.min.o.css" "..\..\publish-web\lake-css-ui.bundle.min.o.css"
copy "lake-css-ui.bundle.css" "..\..\publish-ts\lake-css-ui.bundle.css"
copy "lake-css-ui.bundle.min.o.css" "..\..\publish-ts\lake-css-ui.bundle.min.o.css"
cd ..
cd js
copy "lake-js-ui.bundle.js" "..\..\publish-web\lake-js-ui.bundle.js"
copy "lake-js-ui.bundle.min.o.js" "..\..\publish-web\lake-js-ui.bundle.min.o.js"
copy "lake-js-ui.bundle.js" "..\..\publish-ts\lake-js-ui.bundle.js"
copy "lake-js-ui.bundle.min.o.js" "..\..\publish-ts\lake-js-ui.bundle.min.o.js"
copy "app.js" "..\..\publish-web\app.js"
copy "app.min.o.js" "..\..\publish-web\app.min.o.js"
cd ..
cd lib
copy "amazon-connect.js" "..\..\publish-web\amazon-connect.js"
copy "amazon-connect.min.js" "..\..\publish-web\amazon-connect.min.js"
copy "amazon-connect.js" "..\..\publish-ts\amazon-connect.js"
copy "amazon-connect.min.js" "..\..\publish-ts\amazon-connect.min.js"
copy "connect-streams.js" "..\..\publish-web\connect-streams.js"
copy "connect-streams-min.js" "..\..\publish-web\connect-streams-min.js"
copy "connect-streams.js" "..\..\publish-ts\connect-streams.js"
copy "connect-streams-min.js" "..\..\publish-ts\connect-streams-min.js"
copy "amazon-connect-chat.js" "..\..\publish-web\amazon-connect-chat.js"
copy "amazon-connect-chat.js" "..\..\publish-ts\amazon-connect-chat.js"
copy "amazon-connect-chat-interface.js" "..\..\publish-web\amazon-connect-chat-interface.js"
copy "amazon-connect-chat-interface.js" "..\..\publish-ts\amazon-connect-chat-interface.js"
cd ..