import { NextRequest, NextResponse } from 'next/server';
import { getLinkByShortCode } from '@/data/links';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortcode: string }> }
) {
  const { shortcode } = await params;

  if (!shortcode) {
    return NextResponse.json(
      { error: 'Shortcode is required' },
      { status: 400 }
    );
  }

  const link = await getLinkByShortCode(shortcode);

  if (!link) {
    return NextResponse.json(
      { error: 'Link not found' },
      { status: 404 }
    );  
  }

  return NextResponse.redirect(link.originalUrl, 301);
}
