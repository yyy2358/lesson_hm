package main

import "github.com/gin-gonic/gin"

func main() {
	r := gin.Default() //声明app

	r.GET("/hello", func(c *gin.Context) { //c是上下文对象
		c.JSON(200, gin.H{ //上下文对象响应json
			"message": "hello",
		})
	})
	r.Run()
}
