package model

type Data struct {
	URL         string `json:"url,omitempty"`
	IsMalicious bool   `json:"isMalicious"`
}
