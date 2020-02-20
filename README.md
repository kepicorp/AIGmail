# AI Gmail

## Description

This adds an NLP capability to your gmail account to send payment to GPP.

ADD IMAGE

## Install

### Back-end server

Make sure you have [docker](https://docker.io) installed.

Pull the repository

```bash
git clone git@github.com:kepicorp/AIGmail.git
```

Run the docker compose

```bash
docker-compose up
```

The back-end is now running on ```http://localhost:5001```

### Chrome plugin

Go in the extension menu in chrome

![extension](assets/chrome_extension.png)

And then load unpacked app.  

> Make sure you ticked the developer toggle top right

![plugin](assets/chrome_plugin.png)

## Usage

Open your gmail account.
Create a new email.
Type in the *body* of the email:
```I want to send 500 USD from AccountA to AccountB```

![payment](assets/payment.png)

It should automatically flag everything required.
