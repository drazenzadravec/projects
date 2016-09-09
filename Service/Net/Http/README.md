The application is a Windows Service, it contains 3 services

1. Is a static content Http/1.1 server running on a single polled thread.
2. Is a static content Http/1.1 server client blocking thread.
3. Is a dynamic Http/1.1 server client blocking thread. Dynamic ASPX pages as well as ASP.Net websites.

Use the InstallUtil.exe tool to install the application (e.g. InstallUtil.exe /i Nequeo.Net.Http.Service.exe).

Open the Nequeo.Net.Http.Service.exe.config:
Configure the application to use a certificate if Https is to be used. The application can load a certificate from file or from the certificate store.
Configure the port numbers the application should listen on for IPv4 and IPv6.
Configure the root path where static content is located.
Configure the maximum cache size (if the file has not changed it is stored in the cache for faster responses).
