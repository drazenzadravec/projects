The application is a Windows Service, it contains 3 services

1. Is a static content Http/1.1 server running on a single polled thread.
2. Is a static content Http/1.1 server client blocking thread.
3. Is a dynamic Http/1.1 server client blocking thread. Dynamic ASPX pages as well as ASP.Net websites.

Use the InstallUtil.exe tool to install the application (e.g. InstallUtil.exe /i Nequeo.Net.Http.Service.exe).
