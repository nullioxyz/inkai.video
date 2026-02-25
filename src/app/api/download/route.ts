import { NextRequest } from 'next/server';

const isHttpUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

export async function GET(request: NextRequest) {
  const sourceUrl = request.nextUrl.searchParams.get('url') ?? '';
  const filenameParam = request.nextUrl.searchParams.get('filename') ?? 'video.mp4';

  if (!isHttpUrl(sourceUrl)) {
    return new Response('Invalid download URL', { status: 400 });
  }

  const safeFilename = filenameParam.replace(/[^\w.\- ]/g, '').trim() || 'video.mp4';

  try {
    const upstream = await fetch(sourceUrl);
    if (!upstream.ok || !upstream.body) {
      return new Response('Upstream download failed', { status: 502 });
    }

    const headers = new Headers();
    headers.set('Content-Disposition', `attachment; filename="${safeFilename}"`);
    headers.set('Content-Type', upstream.headers.get('Content-Type') ?? 'application/octet-stream');

    const contentLength = upstream.headers.get('Content-Length');
    if (contentLength) {
      headers.set('Content-Length', contentLength);
    }

    return new Response(upstream.body, {
      status: 200,
      headers,
    });
  } catch {
    return new Response('Download error', { status: 502 });
  }
}
