import { NextResponse } from 'next/server';
import webpush from 'web-push';

const publicKey = process.env.NEXT_PUBLIC_PUSH_PUBLIC_KEY!;
const privateKey = process.env.PUSH_PRIVATE_KEY!;
const email = process.env.PUSH_EMAIL!;

webpush.setVapidDetails(
  `mailto:${email}`,
  publicKey,
  privateKey
);

export async function POST(request: Request) {
  try {
    const subscription = await request.json();
    
    // Store the subscription in your database
    // For now, we'll just return success
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to subscribe to notifications' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    publicKey: process.env.NEXT_PUBLIC_PUSH_PUBLIC_KEY
  });
} 