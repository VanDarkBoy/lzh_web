import { NextResponse } from 'next/server';
import { productCenterContent } from '@/app/products/types';

export async function GET() {
  return NextResponse.json(productCenterContent);
}
