---
title: "Go Templates for Containers"
date: 2021-05-17T22:53:58+05:30
draft: false
github_link: "https://github.com/vsrecio/vsrecio.github.io"
author: "Victor S. Recio"
tags:
  - Containers
  - Golang
  - Docker
  - Kubernetes
image: /images/gotemplate.png
description: ""
toc: 
---

Golang allows us to manage our containers more effectively. :zap:

Golang, also known simply as Go, is a modern programming language known for its simplicity, efficiency, and ease in handling concurrency. A powerful feature of Go that is often overlooked is Go Templates, which allow developers to generate dynamic content from static or dynamic data.

Go Templates are incredibly useful when it comes to managing and administering Docker containers and Kubernetes pods. In this article, we will explore how to use Go Templates to do just that.

## What are Go Templates?

Go Templates provide a simple and flexible way to generate dynamic content in Go. They are particularly useful for building dynamic configuration files, reports, HTML, and more.

A Go Template is a string or file that can interpret and substitute variables and can even execute simple functions. For example, the following is a simple Go Template:

```go
{{.Count}} items are made of {{.Material}}
```

In this template, `.Count` and `.Material` are variables that can be substituted with real values.

## Actions ##

Before we learn how to implement it, let’s take a look at template’s syntax. Templates are provided to the appropriate functions either as string or as “raw string”. Actions represents the data evaluations, functions or control loops. They’re delimited by **`{{ }}`**. Other, non delimited parts are left untouched.

## Go Templates in Docker

Currently it is not a secret that in the world of containers, the [top 10](https://www.tldevtech.com/best-projects-made-with-go-lang/) of the tools are created in Golang, (the programming language created by Google), which allows us to make use of the characteristics of this language for the administration of our containers. Docker uses a variant of Go Templates in several places, but one of the most useful is in the `docker inspect` command, which allows you to view the details of a container or image.

For example, if we want to get the IP address of a running container, we can use a Go Template with the `docker inspect` command as follows:

```bash
docker inspect -f '{{.NetworkSettings.IPAddress}}' my_container
```

In this case, the Go Template `{{.NetworkSettings.IPAddress}}` extracts the IP address of the `my_container` container.

One of the most important steps in the administration of our containers is the visualization of the content of these or the inspection of the information of the same. For this we have the command docker inspect [container] with which we can view all the information of a container/pod in a Go template "Go template" with JSON format:

* Container/pod name
* Volumes
* IP
* ID
* Execution Time
* Labels
* First command executed when the container/pod starts
* DNS information
* User inside the container/pod
* PATH variables
* Port
* MacAddress


![alt text](/images/terminal_1.png "Optional Title")


## Go Templates in Kubernetes

Kubernetes also makes extensive use of Go Templates, especially in combination with the `kubectl` command-line tool.

For example, if we want to get the status of all pods in a specific namespace, we can use a Go Template with the `kubectl get pods` command as follows:

```bash
kubectl get pods --sort-by='.status.containerStatuses[0].restartCount'
```
In this case, the Go Template `.status.containerStatuses[0].restartCount` generates a list of the statuses of all pods in the `my_namespace` namespace.

![alt text](/images/terminal_2.png "Optional Title")

## Using Go Templates

In Golang, the `text/template` and `html/template` packages provide a number of operators that you can use within templates. Here are a few examples:

**Print fields of a struct:**

If you have a struct with fields, you can print the value of those fields using the `.` operator.

```go
    type Item struct {
        Name  string
        Price float64
    }

    item := Item{Name: "Apple", Price: 0.99}
    t := template.Must(template.New("item").Parse("Item Name: {{.Name}}, Item Price: {{.Price}}\n"))
    t.Execute(os.Stdout, item)  // Output: Item Name: Apple, Item Price: 0.99
```

**Pipe operator (`|`):**

You can use the pipe operator (`|`) to chain actions together. For example, you can use it with the `printf` function to format a string:

```go
    t := template.Must(template.New("item").Parse("{{.Name | printf \"Item Name: %s\"}}\n"))
    t.Execute(os.Stdout, item)  // Output: Item Name: Apple
```

**Conditional (`if-else`) operator:**

You can use `if-else` statements in your templates to include optional content.

```go
    t := template.Must(template.New("item").Parse("{{if .Price}}Price: ${{.Price}}{{else}}Price not available{{end}}\n"))
    t.Execute(os.Stdout, item)  // Output: Price: $0.99
```

**Range operator:**

The `range` operator can be used to iterate over arrays, slices, maps, or channels.

```go
    type Inventory struct {
        Items []Item
    }

    inventory := Inventory{
        Items: []Item{
            {Name: "Apple", Price: 0.99},
            {Name: "Banana", Price: 0.59},
        },
    }

    t := template.Must(template.New("inventory").Parse("{{range .Items}}Item: {{.Name}}, Price: ${{.Price}}\n{{end}}"))
    t.Execute(os.Stdout, inventory)  
    // Output: Item: Apple, Price: $0.99
    //         Item: Banana, Price: $0.59
```

**Comparison operators:**

Go templates also support comparison operators such as `eq` (equal), `ne` (not equal), `lt` (less than), `le` (less than or equal to), `gt` (greater than), and `ge` (greater than or equal to).

```go
    t := template.Must(template.New("item").Parse("{{if .Price | lt .5}}This item is cheap.{{else}}This item is expensive.{{end}}\n"))
    t.Execute(os.Stdout, item)  // Output: This item is expensive.
```

Remember, you need to import the `text/template` or `html/template` package and use `template.Must` along with `template.New` and `Parse` to create a new template. The `Execute` method is then used to substitute the variables and write the output.


## Automating task in Kubernetes with Go Templates

Go templates can be incredibly useful for automating tasks in Kubernetes, as Kubernetes uses a declarative architecture based on desired state defined in YAML files. This guide will show you how you can use Go templates to dynamically generate these YAML files.

Suppose you have a basic Kubernetes deployment. An example template could look like this:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{.Name}}
  labels:
    app: {{.Name}}
spec:
  replicas: {{.Replicas}}
  selector:
    matchLabels:
      app: {{.Name}}
  template:
    metadata:
      labels:
        app: {{.Name}}
    spec:
      containers:
      - name: {{.Name}}
        image: {{.Image}}
```

Here, `.Name`, `.Replicas`, and `.Image` are variables that will be substituted with real values.

Next, you can use Go to generate this Kubernetes deployment file dynamically. Here's an example of how you can do this:

```go
package main

import (
    "os"
    "text/template"
)

type Deployment struct {
    Name     string
    Replicas int
    Image    string
}

func main() {
    t, err := template.ParseFiles("deployment.yaml")
    if err != nil {
        panic(err)
    }

    d := Deployment{
        Name:     "my-app",
        Replicas: 3,
        Image:    "my-app:1.0.0",
    }

    err = t.Execute(os.Stdout, d)
    if err != nil {
        panic(err)
    }
}
```

This Go script will read the `deployment.yaml` file, substitute the variables with the values from the `Deployment` struct, and then print out the result. You can redirect this output to a file or directly to `kubectl` to create the deployment.

This is useful if you need to create many deployments that are similar but have slight differences, like the application name or Docker image to use. Instead of creating and maintaining many different YAML files, you can maintain a single template and generate the YAML files dynamically as you need them.

You can also take this a step further and integrate it into an automation script or a CI/CD tool to automate the entire deployment process, a good example about it is the package manager that kubernetes currently is using. 

[Helm](https://helm.sh/) is this example that we mentioned above, which is a package manager for Kubernetes that streamlines the process of installing and managing Kubernetes applications. Helm uses a packaging format known as "charts". A chart is a collection of files that describe a related set of Kubernetes resources. 

One key feature of Helm is that it leverages Go templates to generate the Kubernetes configuration files for each deployment. These templates allow you to parameterize your configurations, which leads to more reusability and flexibility. With Helm's templating system, you can have one chart that deploys to different environments (like staging and production) simply by using different values files.

Therefore, using Helm with Go templates makes managing Kubernetes applications more maintainable, scalable, and customizable.


## Conclusion

Go Templates are a powerful and flexible feature of Go that can greatly facilitate the management and administration of Docker containers and Kubernetes pods. By allowing the generation of dynamic content, Go Templates give us the ability to extract and manipulate information in a way that would be much more difficult to do manually.

Therefore, if you're working with Docker or Kubernetes, I encourage you to dive deeper into Go Templates. Not only will they help you get the most out of these tools, but they will also give you a new way of thinking about programming in Go.
