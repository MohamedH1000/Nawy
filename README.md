This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, clone the repo using git clone {url of the repo}

then move to the directory of this project and type:

```
npm install
```

create .env file in the main directory of the project and paste the environment variables:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dkfvlgdd3"
DATABASE_URL="mongodb+srv://mohammedhisham115:lI5h9GfSwrQE0BdX@cluster0.ucb7r5y.mongodb.net/Nawy"
```

I used cloudinary for the image uploads and mongodb database for storing the data

then make sure you install docker in your pc and running it and type this command to containerize the nextjs application
and run it using single command for frontend, backend and DB:

```
docker build -t nawy .
```

after the successfull of building you can run the project using this single command from docker:

```
docker run -p 3000:3000 nawy
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy on Vercel

This assignment is deployed too in vercel and this is the link of the project:

https://nawy.vercel.app/

## API endpoints

This project fetches endpoints from server actions in NextJS that create
functions in NextJS server and you can import it directly in the client and use it and thats more secure.

so I have create three functions in lib folder that represents 3 API endpoints in the main directory:

1. for adding the apartment to the listing page, the Images and location values are not required in
   the apartment details but the remaining fields are required.
2. a function for get all the listings from the database.
3. a function for get a specific listing by its ID and display its details in the detail page.

Prisma ORM is used to interact with the database for post and get functions.

MongoDB is used as Database for this assignement.
