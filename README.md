# Blog Application

A blog application built with Next.js and Supabase. This application allows users to create and view blog posts, post comments in each post including images or just text. It utilizes Supabase for backend services including authentication with Github and database management. The app is designed to be user-friendly and responsive, leveraging modern technologies for both front-end and back-end services.
At the beginning I tried to use the `@supabase/ssr` library to manage Supabase in the project but after some tries I decided to use the `@supabse/auth-helpers-nextjs` because it was better documented.

## Table of Contents

- [Architecture](#architecture)
- [Approach](#approach)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Live Deployment](#live-deployment)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#running-the-application)
- [License](#license)

## Architecture

The architecture of this application is built around a modern stack to ensure scalability, security, and performance:

- **Front-End**: Built with **Next.js**, a React framework that provides server-side rendering and static site generation capabilities.
- **Back-End**: Managed by **Supabase**, which provides authentication, database, and storage solutions.
- **Database**: Utilizes **PostgreSQL** for structured data storage.
- **Styling**: **Tailwind CSS** is used for utility-first styling.

The application follows a modular architecture for clear separation of concerns and easier maintenance.

## Approach

1. **Planning**: Defined the core features and the requirements for the blog application.
2. **Development**:
   - **Front-End**: Implemented using Next.js with server-side rendering. Integrated Tailwind CSS for responsive design.
   - **Back-End**: Configured Supabase to handle user authentication, database operations, and file storage.
3. **Testing**: Conducted manual testing to verify functionality and usability. Ensured all features work as expected before deployment.
5. **Deployment**: Deployed the application on Vercel and provided instructions for running it locally.

## Features

- User authentication with GitHub using Supabase
- Add new blog posts
- Image upload for posts
- Comments on posts
- Image upload for comments
- Responsive design

## Technologies Used

- **Next.js**: React framework for server-side rendering
- **Supabase**: Backend as a Service (BaaS) for authentication, database, and storage
- **Tailwind CSS**: Utility-first CSS framework
- **PostgreSQL**: Database used by Supabase

## Live Deployment

Visit this [Link](https://blog-test-ivory-one.vercel.app/) to see the deployed project 🚀. PS: You will need a Github account for registering!

## Installation

To get started with this project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/taldr27/blog_test
   cd blog_test
   ```
2. **Install dependencies:**
  
   Make sure you have Node.js installed. Then, run:

   ```bash
   pnpm install
   ```
   Alternatively, you can use npm or yarn:
   ```bash
   npm install
   # or
   yarn install
   ```
## Configuration

1. **Create a Supabase Project:**

   - Go to Supabase and create a new project.
   - Note your Supabase URL and Anon Key from the project settings.
2. **Create env.local in the root of the project and add:**

   ```.env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL="http://localhost:3000/auth/callback"
   ```
   You can get these values from Supabase dashboard `Project Settings -> API`
3. **Create tables, policies, functions and triggers:**
   
   - Go to supabase/schema.sql.
   - Copy all and paste it in a query in your SQL Editor in your supabase dashboard.
   - Run the query and you will have everything created automatically.🫡

     Just in case: The schema.sql dump file was generated by using:

     ```bash
     npx supabase init
     npx supabase link (select your database)
     npx supabase db dump -f supabase/schema.sql Important: you need to have docker running for this command.
     ```

4. **To be able to post images in your posts or comments you need to:**

   - Go to you Supabase dasboard and create a new bucket `Storage -> New bucket`.
   - Name the new bucket as `blog_images`, if you prefer you can create a new env variable for this.

## Running the Application

1. **Start the development server:**

   ```bash
   pnpm dev
   ```
   This will start the server at http://localhost:3000.
2. Access the application locally.

   Navigate to http://localhost:3000.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.