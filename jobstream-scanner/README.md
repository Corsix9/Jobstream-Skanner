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
- Advanced notification features:
  - Notification grouping
  - Sound alerts
  - Quiet hours
  - Daily/hourly digests
  - Custom notification preferences

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Web Push Notifications
- Cloudflare Pages & Workers
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
4. Generate VAPID keys for web push notifications:
   ```bash
   npx web-push generate-vapid-keys
   ```
5. Run the development server:
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
NEXT_PUBLIC_PUSH_PUBLIC_KEY=your-web-push-public-key
PUSH_EMAIL=your-email@domain.com
```

## Deploying to Cloudflare Pages

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Create a new KV namespace:
   ```bash
   wrangler kv:namespace create JOB_STORE
   ```

4. Add the KV namespace ID to your `wrangler.toml`:
   ```toml
   [[kv_namespaces]]
   binding = "JOB_STORE"
   id = "your-kv-namespace-id"
   ```

5. Set up environment variables in Cloudflare:
   ```bash
   wrangler secret put PUSH_PRIVATE_KEY
   wrangler secret put PUSH_PUBLIC_KEY
   wrangler secret put PUSH_EMAIL
   ```

6. Deploy to Cloudflare Pages:
   ```bash
   npm run pages:deploy
   ```

## Development with Cloudflare Pages

To test the application locally with Cloudflare Pages:

1. Start the development server:
   ```bash
   npm run pages:dev
   ```

2. Open [http://localhost:8788](http://localhost:8788) in your browser.

## API Integration

This application uses the JobTech Dev's Job Stream API for real-time job data. You can find more information about the API at:
https://jobstream.api.jobtechdev.se/

## Notification Features

### Customization Options
- Enable/disable different types of notifications
- Set quiet hours for notifications
- Configure notification sound
- Group similar notifications
- Set notification frequency (immediate, hourly, daily)

### Notification Groups
Notifications are automatically grouped by:
- Job type
- Company
- Location
- Time period

### Notification Actions
Each notification includes quick actions:
- Apply Now
- Save Job
- View All (for grouped notifications)

## License

MIT 