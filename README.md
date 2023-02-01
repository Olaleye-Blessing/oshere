# OSHERE

<p>Home of Tv-Series, movies, people and communities!</p>
<p>Created with nextjs, firebase, nextauth, and tailwindcss.</p>

## How I Worked On This Project

<p>My goal was to simulate a professional environment</p>

- I got my inspiration from this [dribble design](https://dribbble.com/shots/15558638-Movie-Dashboard-Design-Dark-Mode)
- I used feature branches and [pull requests](https://github.com/Olaleye-Blessing/oshere/pulls?q=is%3Apr+is%3Aclosed)

## Why I Built This Project

- This is a project I built to learn about testing, and I'm glad I did. I learned a lot about testing and how to write tests. I also learned about how to setup Github actions and how to use them to run tests.
- I also learned more about Nextjs, Tailwindcss, and Firebase.

## How To Navigate This Project

- The project is divided into different folders
- lib folder contains all the helper functions
- pages folder contains all the pages
- config folder contains all the configuration files
- modules folder contains all the modules, i.e combination of components

<!-- ### Short application

![Gif showing muvus little application](https://raw.githubusercontent.com/Olaleye-Blessing/muvus/master/assests/gif/muvus.gif) -->

## Installation steps

1. Fork the project

2. Clone the project by running
   ```sh
   git clone https://github.com/<your-github-username>/oshere.git
   ```
3. Go into the project directory
   ```sh
   cd oshere
   ```
4. Create an `.env` file from the `.env.example` file (copy everything in the `.env.template` file and put it in the `.env` file with appropriate values).

   - `NEXTAUTH_SECRET` Just pass any `random string` or you can quickly create a good value on the command line via this `openssl command`.

   ```sh
   openssl rand -base64 32
   ```

   - `NEXTAUTH_URL` This is the url of your application. If you are running the application locally, it will be `http://localhost:3000`. If you are running the application on a server, it will be the url of your server.

5. Go to the [firebase console](https://console.firebase.google.com/) and create a new project. Then, go to the project settings and copy the firebase config object and paste it in the `.env` file.

   ```ts
   const config = {
     apiKey: process.env.YOUR_API_KEY,
     authDomain: process.env.YOUR_AUTH_DOMAIN,
     projectId: process.env.YOUR_PROJECT_ID,
     storageBucket: process.env.YOUR_STORAGE_BUCKET,
     messagingSenderId: process.env.YOUR_MESSAGING_SENDER_ID,
     appId: process.env.YOUR_APP_ID,
   };
   ```

6. Install all the dependencies
   ```sh
   yarn
   ```

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
