import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Verify the request (optional - you can add a secret token)
    const secret = request.nextUrl.searchParams.get('secret')
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Get the document type and slug from the webhook payload
    const { _type, slug } = body
    
    console.log('Revalidation request:', { _type, slug })

    if (_type === 'product' && slug?.current) {
      // Revalidate the specific product page
      await revalidatePath(`/products/${slug.current}`)
      console.log(`Revalidated: /products/${slug.current}`)
      
      // Also revalidate the products listing if you have one
      await revalidatePath('/products')
      
      return NextResponse.json({ 
        message: 'Product page revalidated successfully',
        path: `/products/${slug.current}`
      })
    }
    
    if (_type === 'page' && slug?.current) {
      // Revalidate the specific page
      await revalidatePath(`/${slug.current}`)
      console.log(`Revalidated: /${slug.current}`)
      
      return NextResponse.json({ 
        message: 'Page revalidated successfully',
        path: `/${slug.current}`
      })
    }
    
    if (_type === 'project' && slug?.current) {
      // Revalidate the specific project page
      await revalidatePath(`/projects/${slug.current}`)
      console.log(`Revalidated: /projects/${slug.current}`)
      
      return NextResponse.json({ 
        message: 'Project page revalidated successfully',
        path: `/projects/${slug.current}`
      })
    }

    // For other content types or if no specific slug, revalidate relevant paths
    switch (_type) {
      case 'product':
        await revalidatePath('/products')
        break
      case 'page':
        await revalidatePath('/')
        break
      case 'project':
        await revalidatePath('/projects')
        break
      default:
        // Revalidate homepage for other content types
        await revalidatePath('/')
    }

    return NextResponse.json({ 
      message: 'Revalidation completed',
      type: _type
    })

  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: error },
      { status: 500 }
    )
  }
}

// Handle GET requests for manual testing
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path')
  const secret = request.nextUrl.searchParams.get('secret')
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }
  
  if (!path) {
    return NextResponse.json({ message: 'Path parameter required' }, { status: 400 })
  }
  
  try {
    await revalidatePath(path)
    return NextResponse.json({ 
      message: 'Revalidation completed',
      path 
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Error revalidating', error: error },
      { status: 500 }
    )
  }
} 