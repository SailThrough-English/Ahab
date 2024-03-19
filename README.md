
# 🌧️ Monsoon - GitHub Webhook Handler ☔

Welcome to Monsoon, a straightforward and efficient GitHub webhook handler. This project, written in TypeScript, uses Express, simple-git, and crypto to securely pull updates from your GitHub repository when a push event occurs.

## 📚 How It Works

Monsoon listens for POST requests sent by GitHub when a push event happens in your repository. It verifies the payload using a secret, and if the signatures match, it pulls the latest changes from your repository. If they don't, it sends a 401 response.

## ⚙️ Environment Variables

Monsoon requires two variables:

- `SECRET`: The secret set in your GitHub webhook settings. Monsoon uses this to verify the payload.
- `MONITORED_DIR`: The directory of your git repository.

Set these in a `.env` file:

```env
SECRET=yourgithubwebhooksecret
MONITORED_DIR=./yourrepository/
```

**Note:** Never commit your `.env` file as it contains sensitive information!

## 🚀 Running in Docker

To run Monsoon in a Docker container, build the image and run it:

1. Build the Docker image:

```sh
docker build -t monsoon .
```

2. Run the Docker container:

```sh
docker run -p 3000:3000 -v /path/to/your/repository:/app/yourrepository -e SECRET=yourgithubwebhooksecret -e MONITORED_DIR=./yourrepository monsoon
```

Replace `/path/to/your/repository` with the absolute path to your repository on your host machine, and `yourgithubwebhooksecret` with your actual GitHub webhook secret.

Now, Monsoon is ready to handle your GitHub webhooks!

## 🌧️ Stay Dry

Thanks for checking out Monsoon. It's a simple solution for a simple task. Happy coding! ☔
