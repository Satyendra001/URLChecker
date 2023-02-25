# A Simple web App to validate any URL ✔✔

URL checker is an App that can validate any URL and can provide information that it is Safe or Malicious!!

## Installation
- The App has a frontend and a backend (all required to be running on Local server).
- Clone the repo using `git clone`
    ### Frontend
    - Frontend is built in React.
    - Navigate to the folder of `frontend` and do `npm install`. It will install all of the required dependencies.
    - Then do `npm start` to run the React server. For more info visit [react_official_website](https://reactjs.org/docs/getting-started.html)
    - Frontend will be up and will be running on port `3000` by default.
    ### Backend
    - Backend is Build in Go and Uses a Mongo DB database
    - You need to have Go installed on your machine [link-to-install-go](https://go.dev/doc/install)
    - After Go installation, navigate to `backend` folder and download few dependencies

        ```go
        go get -u github.com/gorilla/mux
        go get go.mongodb.org/mongo-driver/mongo
        ```
    - Then Create a new Mongo DB Atlas server and create a new Project.
    - On the Connect tab you will get a connection string which will look something like this
        ```mongodb
        "mongodb+srv://<username>:<password>@<dbname>.8ttjeig.mongodb.net/?retryWrites=true&w=majority"
        ```

    - Get your Credentials and place in the above string. Provide that string in the code `backend/controller/controller.go/connectionString`
    - Run the main.go file by following the below commands
        ```go
        go mod init github.com/<UserName>/<RepoName>
        go mod tidy
        go run main.go
        ```
    - The backend will be up and will be listening on port `4000`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)