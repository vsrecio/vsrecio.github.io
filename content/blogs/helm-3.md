---
title: "Create a Helm Chart Repository using Github"
date: 2023-07-04T11:57:48-04:00
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
image: /images/helm-3.png
description: ""
toc: 
---
# Create a Helm Chart Repository using Github

Helm, the package manager for Kubernetes, allows developers to package, version, and share applications. Helm charts streamline the process of defining, installing, and upgrading complex Kubernetes applications. In this article, we'll guide you on how to create a Helm chart and host it using GitHub Pages.

## Creating a Helm Chart

Let's start with creating a Helm chart:

**1. Installation**: First, you need to have Helm installed. If you haven't done so yet, you can find the instructions [here](https://helm.sh/docs/intro/install/).

**2. Chart Creation**: Now, let's create a basic chart with the following command:

```
helm create mychart
```
   
This will generate a directory with the necessary files to create a Helm chart.

**3. Customization**: Inside the `mychart` directory, you'll find several YAML files that you can modify according to your application requirements. For instance, the `values.yaml` file is where you specify the default configuration values, while `Chart.yaml` contains metadata about the chart itself.

## Creating GitHub Pages

Now, let's create the GitHub Pages:

You can use GitHub Pages to showcase some open source projects, host a blog, or even share your résumé. This guide will help get you started on creating your next website. [Link text Here](https://docs.github.com/en/pages/quickstart)

## Creating the Helm Package

After setting up GitHub Pages, it's time to create the Helm package:

**1. Chart Packaging**: Go to your chart directory and use the following command to create a packaged chart:

```
helm package mychart
```
   
This command will create a .tgz file which includes all the necessary files to deploy your application.

**2. Index Creation**: We need to create an index file that will contain information about chart packages, and where to locate them. Use this command to generate it:

```
helm repo index --url https://<username>.github.io/<repository>/ .
```
   
Replace `<username>` with your GitHub username and `<repository>` with your GitHub repository name.

![alt text](/images/repo.png "Repository")

## Uploading the Chart to the Repository

The final step is to upload your Helm chart to your repository:

**1. Add Files to the Repository**: Add the .tgz file and `index.yaml` file to your GitHub repository.

**2. Commit and Push**: Commit these changes and push them to the `master` or `main` branch. 

**3. Verify**: To verify that your Helm chart is accessible, you can add your new repo to Helm with this command:

```
helm repo add myrepo https://<username>.github.io/<repository>/
```

Congratulations! You've successfully created a Helm chart and hosted it on GitHub Pages. Now, other users can easily access and use your Helm chart by adding your Helm repository.