package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"

	"github.com/gin-gonic/gin"
)

// Status struct has a code, a name and a color
type Status struct {
	Code  int    `json:"code"`
	State string `json:"state"`
	Color string `json:"color"`
}

func main() {
	r := gin.Default()

	r.GET("/status", func(c *gin.Context) {
		// read json from file and pick random state from 4 available atates
		data, err := ioutil.ReadFile("./response.json")
		if err != nil {
			fmt.Print(err)
		}

		var states []Status

		randomIndex := rand.Intn(4)

		err = json.Unmarshal(data, &states)
		if err != nil {
			fmt.Println("error:", err)
		}
		c.JSON(200, states[randomIndex]) //respond with random state
	})

	r.Run(":3000")
}
