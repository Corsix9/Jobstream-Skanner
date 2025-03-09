# Jobstream-Skanner
arbetsformedlingen.se skanner för automatisk 
egen övervakning och functioner

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




# JobStream Scanner

A modern job scanning and tracking application that automatically monitors and applies to relevant job positions using the JobTech Dev's Job Stream API.

## Features

- Real-time job scanning and monitoring
- Mobile push notifications for new job matches
- Automatic job application submission
- Customizable job search criteria
- Mobile-responsive interface
- User preference management
- Integration with JobTech Dev's Job Stream API

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Web Push Notifications
- Cloudflare Workers (for background tasks)
- Prisma (for database management)
- NextAuth.js (for authentication)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=your-database-url
PUSH_PRIVATE_KEY=your-web-push-private-key
PUSH_PUBLIC_KEY=your-web-push-public-key
PUSH_EMAIL=your-email@domain.com
```

## API Integration

This application uses the JobTech Dev's Job Stream API for real-time job data. You can find more information about the API at:
https://jobstream.api.jobtechdev.se/

## License

MIT
