This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

##Build a web app in ReactJS with Nextjs using app router,
 
1. Home page: displays a table of information using this api: https://api.github.com/repositories
   - It should have owner profile picture on the first column, then owner name, repo name, repo url, and description
   - It should have a search feature and a pagination feature
2. User detail page: displays owner profile picture, owner name, then a list of the owner's followers using owner object's  `followers_url`
   - It should have breadcrumb, owner profile picture, owner name then a list of the owner's followers using owner object's followers_url
   - It should show each follower profile picture, follower name, repo ur
   - it should use infinite scrolling to show all followers_url, and show a end of data indicator
 
- It should be written using typescript
- It should be written using modern best practices and features of the ReactJS framework
- It should be styled ease-of-use in mind and attention to detail
- Ideally the main parts will be unit tested using a framework such as jest (simple tests are fine)
- **No ui libraries**  allow, eg: React Bootstrap, Core UI
