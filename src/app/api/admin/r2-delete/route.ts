import { NextRequest, NextResponse } from 'next/server';
import { deleteFromR2 } from '@/lib/r2';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
    }
    await deleteFromR2(url);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('R2 delete error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
