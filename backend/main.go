package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

var malURLS = []string{
	"xyz.com",
	"free.com",
	"hack.com",
	"pish.com",
}

type Urls struct {
	URL string `json:"url,omitempty"`
}

func main() {
	fmt.Println("Hello World!")
	r := mux.NewRouter()
	r.HandleFunc("/", CheckURL)

	controller.Print()
	// u := model.Data{URL: "abc.com", IsMalicious: true}
	// controller.Insert(u)

	// Create a http Listener and handle any error in the log
	log.Fatal(http.ListenAndServe(":4000", r))

}

func CheckURL(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	var u Urls

	fmt.Println("Checking the URL...")

	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("URL is: ", u.URL)
	var isMalicious bool

	// Check for the URL in the Database
	dbResponse := controller.SearchUrl(u.URL)

	if len(dbResponse) == 1 {
		// Iterate over a slice of maps
		for _, val := range dbResponse {
			for key, val2 := range val {
				if key == "ismalicious" {
					isMalicious = val2.(bool)
				}
			}
		}
	} else {
		// If Absent in DB Call the API
		fmt.Println("Url not found in DB, calling the API...")
		isMalicious = getURLReport(u)
	}

	if isMalicious {
		json.NewEncoder(w).Encode("The Entered Url is Malicious")
	} else {
		json.NewEncoder(w).Encode("The Entered Url is Not Malicious")
	}
	// fmt.Println(isMalicious)

	fmt.Println("Response Sent!!!!")
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
}

func getURLReport(u Urls) bool {
	var temp = base64.RawURLEncoding.EncodeToString([]byte(u.URL))
	var baseUrl = "https://www.virustotal.com/api/v3/urls/" + temp
	req, err := http.NewRequest("GET", baseUrl, nil)

	var flag bool
	if err != nil {
		log.Fatal(err)
	}
	req.Header.Add("accept", "application/json")
	req.Header.Add("x-apikey", "1e64d81ed24d73eb005e373c36fd87de906a961f06ea5bde9d28568109d33d3e")

	res, err := http.DefaultClient.Do(req)

	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()

	body, _ := io.ReadAll(res.Body)

	fmt.Println("Received Response from Virus Total")
	// fmt.Println(string(body))

	var result map[string]interface{}

	err = json.Unmarshal([]byte(string(body)), &result)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Starting the Analysis of Report...")
	// var mp map[string]string
	for _, val1 := range result {
		// fmt.Println("Key1 : ", key1)
		for key2, val2 := range val1.(map[string]interface{}) {
			if key2 == "attributes" {
				for key3, val3 := range val2.(map[string]interface{}) {
					if key3 == "last_analysis_stats" {
						analysis := val3.(map[string]interface{})
						safeCount := analysis["harmless"].(float64)
						malCount := analysis["malicious"].(float64)
						undetected := analysis["undetected"].(float64)
						totalSuspicious := safeCount - malCount - undetected

						fmt.Println("Final Analysis Result: ", val3)
						if malCount >= 5 && safeCount-totalSuspicious >= 10 {
							data := model.Data{URL: u.URL, IsMalicious: true}
							controller.Insert(data)
							flag = true
						} else {
							data := model.Data{URL: u.URL, IsMalicious: false}
							controller.Insert(data)
							flag = false
						}
					}
				}
			}
		}
	}

	return flag
}
