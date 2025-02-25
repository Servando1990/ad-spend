import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { width: string; height: string } }
) {
  const { width, height } = params;
  
  // Create SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#27272a" />
      <text 
        x="50%" 
        y="50%" 
        dominant-baseline="middle" 
        text-anchor="middle" 
        font-family="system-ui, sans-serif" 
        font-size="16" 
        fill="#71717a"
      >
        ${width}x${height}
      </text>
    </svg>
  `;

  // Convert SVG to base64 and return as image
  const svgBase64 = Buffer.from(svg).toString('base64');
  
  return new Response(Buffer.from(svgBase64, 'base64'), {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
} 