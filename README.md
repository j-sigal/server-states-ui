# Server status display App

App for displaying grid of states from the server.

This project was build with Angular and Go.

## How to run

From the root folder navigate to server folder "server" and run 

```bash
go run main.go
```
The server is now listening on port 3000.

Now, from client side terminal access "angular-client" and run 

```bash
ng serve --proxy-config proxy.conf.json --open
```
The client will run on `http://localhost:4200`, and proxy will connect it to API port.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
