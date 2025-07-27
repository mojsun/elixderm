import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import clientConfig from '@/sanity/config/client-config';

// Create Sanity client for writing data
const sanityClient = createClient({
  ...clientConfig,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

export async function POST(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: id and status' },
        { status: 400 }
      );
    }

    // Validate status value
    const validStatuses = ['new', 'in_progress', 'completed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be: new, in_progress, or completed' },
        { status: 400 }
      );
    }

    // Update the document in Sanity
    const updatedDoc = await sanityClient
      .patch(id)
      .set({ status: status })
      .commit();

    return NextResponse.json(
      { 
        message: 'Status updated successfully',
        document: updatedDoc 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating home contact status:', error);
    return NextResponse.json(
      { error: 'Failed to update status. Please try again.' },
      { status: 500 }
    );
  }
} 