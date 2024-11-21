# JobJunction

## Contents

- [About JobJunction](#about-jobjunction)
- [Features it holds](#features-it-holds)
- [Tech Stack we use](#tech-stack-we-use)
- [Contribution Guide](#contribution-guide)

## About JobJunction

JobJuncton is the platform where you can come and see all the job postings that are there and can actually get the apply link. It is different from others in the sense that we allowing other users to even post the job if they know. To maintain the dignity of the website that only genuine jobs / internship gets posted we have actually few admins who manages all the posted jobs and users on website. They have proper full access to take any actions from deleting post to even users.

## Features It Holds

- User can come to website and can do the basic authentication using the email and password and can add their bio and social links or they can simply Login with Google and can edit their bio and social links in profile section.

- User can goto `/jobs` and can find all the listings from latest to oldest

- On the `/jobs` page itself , you have the filter options so that you can filter according to your needs like whether you want internship/job or onsite/remote and many more ...

- If you any job posting then you can goto `/jobs/create` and can easily create the new job posting . Salary range is must to be defined because we want only those job posted which has some motivation to do

- On the `/user/${userId}` we have mutli routes option

  - `/profile` has the user detail option which shows all the user details like username , role and date on which account is created. And if you visit your own profile then you can see the edit option from where you can simply change your bio and modify social links

  - `/jobs/me` has all the job listing which the user has posted

  - `/jobs/bookmarks` has all the bookmarked job posting that user has bookmarked . This route is only visible to user itself (private route)

  - `/settings/delete` is the route where user can come and can delete their account after 1 simple check (private route)

- On the `/admin` route , admins can access this route only. Here we have 2 routes

  - `/posts` has all the job posting that platform has . Admin can see and delete posts from here

  - `/users` is the route where all user of website is visible and the admin can delete their account.

- Being the author of post , user can delete their post and also the admin's of the website can do so

- User can bookmark other posts so that they can apply in future if want

## Tech Stack We Use

We are using the pretty standard tech that is mostly popular in market

- _Frontend_: Nextjs, Tailwind Css , Magicui, Shadcn, Typescript
- _Backend_ / _DATABASE_ : Nextjs , Postgresql , Prisma (orm) , Authjs
- _Hosting_ : Vercel

## Contribution Guide

Before going to contribute in this project , i will like to address that just don't spam it for testing your open source skills. You must have knowledge of any of the tech being used and you must be serious for contirbuting .

## WITH DOCKER

1. Fork this repo and clone the repo

```
git clone https://github.com/yourusername/Jobjunction
```

2. Copy over the `.env.example` & `.env.local.example` in the root folder. You can get the google client id and secret from google cloud console .

```

openssl rand -base64 32 //run this in the terminal pr browser to generate the Auth secret & paste it

```

3. Start the application with this command

```
docker compose up --build --watch
```

4. To stop and delete container , you can use this

```
docker compose down
```

## WITHOUT DOCKER

1. Fork this repo and clone the repo

```
git clone https://github.com/yourusername/Jobjunction
```

2. In you pc , move to the folder & install the dependencies

```
cd Jobjunction

npm install
```

3. Copy over the `.env.example` & `.env.local.example` in the root folder. You can get the google client id and secret from google cloud console .

```

openssl rand -base64 32 //run this in the terminal pr browser to generate the Auth secret & paste it

```

4. In the `.env` file, you can replace the `DATABASE_URL` with your's any cloud databse string or local database string

5. Push the database first and then re-generate client

```
 npx prisma db push // or npx prisma migrate dev --name init (if want)

 npx prisma generate
```

6.  Seed the database by running this command

```
npm run prisma:seed

npx prisma studio
```

7. Start the server

```
npm run dev
```

## Login With This Data

Seeded data detials

```
[
    {
    username:admin_user,
    password:Hello@1
},

{
    username:user,
    password:Hello@2
}

]
```
