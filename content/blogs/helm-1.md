---
title: "Demystify Helm: The GPS for Navigating the World of Kubernetes."
date: 2023-05-22T14:24:59-04:00
draft: true
github_link: "https://github.com/vsrecio/vsrecio.github.io"
author: "Victor S. Recio"
tags:
  - Containers
  - Golang Template
  - Helm
  - Kubernetes
  - DevOps
  - CI/CD
  - Deployment
image: /images/helm.png
description: ""
toc: 
---

If you've worked with Kubernetes, you'll know that managing it and deploying applications can be complex. With so many components to configure and manage, such as services, pods, and persistent volumes, it's easy to get lost in the sea of options available and If we add that we must also deploy these components to different environments, all this increases the degree of difficulty of managing Kubernetes. . This is where Helm comes into play.

Helm, often referred to as the package manager for Kubernetes **(in Linux world is like APT, YUM...)**, acts like a GPS, guiding you through the complexity of Kubernetes. With Helm, managing Kubernetes applications is simplified, allowing you to define, install, and upgrade even the most complex Kubernetes applications.

In this article, we will demystify Helm and break it down into simple, understandable terms. Whether you're new to Kubernetes or a seasoned veteran looking for ways to optimize your workflows, this post aims to give you a greater understanding of how Helm can make navigating the vast ocean of Kubernetes easier. 

## What is Helm Chart?
A Helm Chart is a package of pre-configured Kubernetes resources. In other words, it is a collection of files that describe a related set of Kubernetes resources. These charts are used to deploy applications or services on a Kubernetes cluster. 

Helm Charts make extensive use of **[Go templates](https://vsrecio.com/blogs/go-templates/)** to define the Kubernetes resources they manage. Go templates are a powerful way to inject configuration into Kubernetes resources at deploy time.

**YAML**, which stands for **"YAML Ain't Markup Language"**, is another essential component in the world of Kubernetes and Helm. Kubernetes uses YAML as the format for its resource definitions. These definitions describe the desired state of your Kubernetes resources such as Deployments, Services, and PersistentVolumes among others.

A single chart can describe something simple, like a standalone web server or something complex like a full-stack web application with backend services, databases, caches, etc. 

The **chart** is a bundle of information necessary to create an instance of a Kubernetes application. This includes the following:

- A description of the package **(Chart.yaml)**
- One or more **templates**, which contain Kubernetes manifest files
- Default values for the templates **(values.yaml)**

The charts are convenient because they allow you to deploy, version, share, and publish applications in a standard format. They encapsulate and build an artifact of your application, making the complexity of deploying sophisticated applications into Kubernetes easier, and enabling more straightforward application management, updates, and configuration.

## What is Helm Chart?

A Helm chart is essentially a packaged application for Kubernetes and has a specific directory structure. Here's the basic structure of a Helm chart:

```bash
vsrchart/
  Chart.yaml          # A YAML file containing information about the chart
  LICENSE             # OPTIONAL: A plain text file containing the license for the chart
  README.md           # OPTIONAL: A human-readable README file
  values.yaml         # The default configuration values for this chart
  values.schema.json  # OPTIONAL: A JSON Schema for imposing a structure on the values.yaml file
  charts/             # A directory containing any charts upon which this chart depends.
  crds/               # OPTIONAL: Custom Resource Definitions
  templates/          # A directory of templates that, when combined with values, will generate valid Kubernetes manifest files.
  templates/NOTES.txt # OPTIONAL: A plain text file containing short usage notes
```

*1. **Chart.yaml:*** This is a mandatory file that contains the metadata of the chart like the version, description, and maintainer information.

*2. **values.yaml***: This file contains the default configuration values for the chart. Values from this file can be overridden during `helm install` or `helm upgrade`.

*3. **templates:*** This directory holds all of the templated Kubernetes manifest files. The templates generate Kubernetes manifest files when combined with the `values.yaml` file. These files are written in the Go templating language.

*4. **charts:*** If a chart has dependencies, those dependent charts are stored in this directory.

*5. **crds:*** This directory is used to hold Custom Resource Definitions (CRDs). CRDs are Kubernetes extensions that are used to deploy certain applications.

*6. **.helmignore:*** Like a `.gitignore` file, this file can be used to specify files or directories to be ignored when packaging a chart.

*7. **LICENSE and README.md:*** The license of the chart and a README providing high-level information about the chart, respectively. These are optional but generally recommended.
</ul>
This structure makes Helm charts organized and easier to manage, even when they start to get complex.

The `templates/` directory within a Helm Chart is where the Kubernetes manifest files are stored. The files in this directory are templated using the Go templating language. Here's a basic example of what you might find inside the `templates/` directory:

```bash
|-- templates
|   |-- NOTES.txt
|   |-- _helpers.tpl
|   |-- deployment.yaml
|   |-- configmap.yaml
|   |-- ingress.yaml
|   |-- service.yaml
|   `-- tests
|       `-- test-connection.yaml
```

*1. **NOTES.txt***: This is a plain text file that contains usage notes for your chart. After helm install, these notes can be printed to the console.

*2. **_helpers.tpl***: This is a place to put template helpers that you can re-use throughout the chart. This helps avoid repetitive code and makes maintenance easier.

*3. **deployment.yaml***: This defines a Kubernetes Deployment. It specifies which Docker image to use for the Docker containers in the pods, the number of replicas, and various other necessary pieces of information.

*4. **service.yaml***: This defines a Kubernetes Service. It helps expose your application (as running in the pods created by the deployment) to the outside world or internally within the cluster.

*5. **ingress.yaml***: This defines a Kubernetes Ingress. Ingresses manage external access to the services in a cluster, typically through HTTP.

*6. **hpa.yaml***: This defines a Kubernetes Horizontal Pod Autoscaler. It automatically scales the number of pods in a deployment or replica set based on observed CPU utilization.

Note that you can include other Kubernetes resources such as ConfigMaps, Secrets, Jobs, etc., depending on the needs of your application. The actual files will depend on the complexity and requirements of your specific application.

## Conclusion

In conclusion, we have taken our first steps into the world of Helm and Kubernetes, beginning our journey to truly harness the power of these groundbreaking tools. We've explored what Helm is, why it's an essential tool in Kubernetes management, and have started to understand its components, such as Helm Charts and their structure.

But this is just the beginning. As we've seen, Helm Charts play a pivotal role in managing Kubernetes applications. They encapsulate all the Kubernetes resources and dependencies necessary for running an application in a Kubernetes cluster, effectively serving as a roadmap for application deployment.

In this first part of our series, we've laid the groundwork, providing you with the necessary understanding and context about Helm. As you've seen, Helm truly is the GPS for navigating the complex world of Kubernetes, and its charts provide a reliable and reusable methodology for defining, installing, and upgrading even the most complex Kubernetes applications.

Thank you for reading, and we hope you'll join us in our next exciting exploration of Helm. Until then, happy charting!