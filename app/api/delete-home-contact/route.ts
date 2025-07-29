import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import clientConfig from '@/sanity/config/client-config';

// Create Sanity client for writing data
const sanityClient = createClient({
  ...clientConfig,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Missing required field: id' },
        { status: 400 }
      );
    }

    // Delete the document from Sanity
    await sanityClient.delete(id);

    console.log('Successfully deleted home contact submission with ID:', id);

    return NextResponse.json(
      { 
        message: 'Home contact submission deleted successfully',
        deletedId: id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error deleting home contact submission:', error);
    return NextResponse.json(
      { error: 'Failed to delete home contact submission. Please try again.' },
      { status: 500 }
    );
  }
} 