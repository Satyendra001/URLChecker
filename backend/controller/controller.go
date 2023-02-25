package controller

import (
	"context"
	"fmt"
	"log"
)

const connectionString = "mongodb+srv://<username>:<password>@<dbname>.8ttjeig.mongodb.net/?retryWrites=true&w=majority"
const dbName = "FirstDB"
const colName = "AllUrls"

// Imp I want a reference of the Mongo DB collection to use it anywhere
var collection *mongo.Collection

// Connect with mongo DB
// Init runs only once
func init() {
	//client options
	clientOption := options.Client().ApplyURI(connectionString)

	// Connect to DB
	client, err := mongo.Connect(context.TODO(), clientOption)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Mongo Connection is Successful!!!")

	// err = client.Ping(context.TODO(), readpref.Primary())

	myDB := client.Database(dbName)
	myCol := myDB.Collection(colName)

	collection = myCol

	dbs, err := client.ListDatabaseNames(context.TODO(), bson.M{})
	fmt.Println("All databases: ", dbs)
	fmt.Println("Collection instance is ready!!!", myCol)
}

func Print() {
	fmt.Println("Called the controller!!!!!")
}

func Insert(url model.Data) {
	isInserted, err := collection.InsertOne(context.Background(), url)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Inserted one data, id: ", isInserted.InsertedID)
}

func SearchUrl(url string) []bson.M {
	// Apply a filter query to the Find function
	filterCursor, err := collection.Find(context.TODO(), bson.M{"url": url})
	if err != nil {
		log.Fatal(err)
	}

	var dbResponse []bson.M

	err = filterCursor.All(context.TODO(), &dbResponse)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("DB Response for the search has length: ", len(dbResponse))
	return dbResponse
}
