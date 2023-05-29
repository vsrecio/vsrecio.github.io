---
title: "Demystify Helm: Managing"
date: 2023-05-29T14:27:35-04:00
draft: false
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
image: /images/helm-2.png
description: ""
toc: 
---
# Installing Helm
In order to continue with our series of articles about Helm package manager, you need to first install it on your system. If you're running Linux, the process is straightforward. Here's a step-by-step guide:

**Step 1: Prerequisites**
Ensure that you have the following installed and correctly configured:
- **Kubernetes**: Helm is a package manager for Kubernetes, so you must have a Kubernetes cluster running.
    - [**minikube**](https://minikube.sigs.k8s.io/docs/): minikube is local Kubernetes, focusing on making it easy to learn and develop for Kubernetes.
- [**kubectl**](https://kubernetes.io/docs/tasks/tools/): This is the command-line tool for Kubernetes. It must be correctly configured to communicate with your Kubernetes cluster.

**Step 2: Download and Install Helm**
The easiest way to install Helm on Linux is by downloading the pre-compiled binary from the Helm GitHub page. Alternatively, you can use the package manager for your specific Linux distribution (like apt for Ubuntu or yum for Fedora).

**Option 1: Install Helm from Binary Release**
Go to the [Helm GitHub release page](https://github.com/helm/helm/releases) and download the latest release. After downloading, unpack it with `tar`:

```
$ tar -zxvf helm-v3.0.0-linux-amd64.tar.gz
```

This will create a directory named `linux-amd64`. Inside it, you will find the Helm binary. You can move it to `/usr/local/bin` or any other directory in your `PATH`:

```
$ sudo mv linux-amd64/helm /usr/local/bin/helm
```

**Option 2: Install Helm using Package Manager From dnf/yum (fedora)**
Since Fedora 35, helm is available on the official repository. You can install helm with invoking:

```$ sudo dnf install helm
```

For Fedora, you can use `dnf`:

```
$ sudo dnf install helm
```

**Step 3: Verify Installation**
To confirm that Helm was successfully installed, run:

```
$ helm version
```

This command should print the version of Helm that is installed.

With Helm installed, you're ready to start deploying applications on your Kubernetes cluster!

> (Note: This guide assumes Helm 3.x. The process for Helm 2.x is slightly different due to the presence of Tiller, the server-side component of Helm 2.)

## Helm Basic Commands

* **helm completion** - generate autocompletion scripts for the specified shell
* **helm create** - create a new chart with the given name
* **helm dependency** - manage a chart's dependencies
* **helm env** - helm client environment information
* **helm get** - download extended information of a named release
* **helm history** - fetch release history
* **helm install** - install a chart
* **helm lint** - examine a chart for possible issues
* **helm list** - list releases
* **helm package** - package a chart directory into a chart archive
* **helm plugin** - install, list, or uninstall Helm plugins
* **helm pull** - download a chart from a repository and (optionally) unpack it in local directory
* **helm push** - push a chart to remote
* **helm registry** - login to or logout from a registry
* **helm repo** - add, list, remove, update, and index chart repositories
* **helm rollback** - roll back a release to a previous revision
* **helm search** - search for a keyword in charts
* **helm show** - show information of a chart
* **helm status** - display the status of the named release
* **helm template** - locally render templates
* **helm test** - run tests for a release
* **helm uninstall** - uninstall a release
* **helm upgrade** - upgrade a release
* **helm verify** - verify that a chart at the given path has been signed and is valid
* **helm version** - print the client version information

These are just the basic commands. Helm has many more features you can explore using the **helm help** command or **helm [command] --help**.

## Install Helm Chart from the repository

To install a Helm chart from a repository, you need to follow these steps:

First, add the repository that contains the chart. For example, let's use the Bitnami repository:

```
helm repo add bitnami https://charts.bitnami.com/bitnami
```

After adding the repository, update your Helm repositories to fetch the latest charts:

```
helm repo update
```

Now, you can search for available charts in the Bitnami repository:

```
helm search repo bitnami
```

To install a chart, use the `helm install` command followed by a release name of your choice, and the chart you wish to install. For instance, to install the `bitnami/nginx` chart:
```
helm install my-release bitnami/nginx
```
In this example, `my-release` is the release name for your deployment.

Remember, Helm charts can have variables which are used to customize the deployment. These variables can be set using the `--set key=value` flag in the install command.

For instance, if the `bitnami/nginx` chart had a variable named `service.port`, and you wanted to set it to 8080, you would append `--set service.port=8080` to the install command.

If you want to install a Helm chart in a specific namespace, you need to add the `-n` or `--namespace` flag to your `helm install` command. Here is how you can do it:

First, let's assume you have added the repository and updated it, as explained in the previous example. Now, you want to install the `bitnami/nginx` chart in a namespace called `my-namespace`.

```bash
helm install my-release bitnami/nginx -n my-namespace
```

If the namespace `my-namespace` does not exist, Helm will throw an error. To avoid this, you can create the namespace first:

```bash
kubectl create namespace my-namespace
```

Or, you can tell Helm to create the namespace if it does not exist by adding the `--create-namespace` flag:

```bash
helm install my-release bitnami/nginx -n my-namespace --create-namespace
```

This command will install the `bitnami/nginx` chart in the `my-namespace` namespace, and if `my-namespace` doesn't exist, Helm will create it.

## Install Helm Chart from local source

Helm allows you to install a chart directly from the source code on your local machine. You simply need to navigate to the directory containing the chart and run the `helm install` command.

Assuming you have a Helm chart in a directory called `my-chart` in your current working directory, you can install it using Helm like this:

```bash
helm install my-release ./my-chart
```

In this command:

- `my-release` is the name you want to give to this release.
- `./my-chart` is the path to the directory containing the chart.

Remember, the directory should contain a valid `Chart.yaml` and the templates for your application. The `helm install` command will read these files to deploy your application to your Kubernetes cluster. If you want to know the structure of the Chart, in the first post we talked about e.

It's important to note that the command should be executed from the directory that contains the `my-chart` directory, not from inside the `my-chart` directory itself. If you are currently inside the `my-chart` directory, you would need to move one level up (using `cd ..`) before running the `helm install` command.

As with any other `helm install` command, you can customize the installation by passing parameters with `--set` or by using a values file with `-f` or `--values`.

Finally, make sure your Kubernetes context (i.e., `kubectl config current-context`) is set to the cluster where you want to install the chart.

## Conclusion

Helm is an essential tool in the Kubernetes ecosystem, and managing it effectively can significantly streamline your deployment processes. By understanding how to create Helm charts manually, you're not just rolling out applications; you're crafting detailed instructions that Kubernetes can follow. These specifications ensure your applications are consistently deployed, scalable, and maintainable. Moreover, they allow you to leverage the power of Kubernetes without having to write hundreds of lines of Kubernetes configuration files.

Having a good grasp of basic Helm commands empowers you to interact with charts and releases efficiently. With these commands at your fingertips, you can install, upgrade, rollback, and uninstall your applications in a Kubernetes cluster with ease and confidence. Additionally, Helm's packaging structure makes it easier to share your applications across different teams or communities. In summary, mastering Helm enhances your Kubernetes journey, simplifying the complexities of application deployment and management in a cloud-native world.