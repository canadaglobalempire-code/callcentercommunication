export async function POST(request) {
  try {
    const data = await request.json();

    // Validate required fields based on form type
    const requiredByType = {
      consultation: ['name', 'email', 'company', 'phone', 'needs'],
      lead: ['firstName', 'lastName', 'email', 'company', 'serviceType', 'callVolume'],
      newsletter: ['email'],
    };
    const required = requiredByType[data.formType] || [
      'companyName',
      'name',
      'title',
      'phone',
      'email',
      'callLength',
      'productService',
      'programHours',
      'monthlyCallVolume',
      'programStart',
    ];
    const missing = required.filter((field) => !data[field]?.trim());
    if (missing.length > 0) {
      return Response.json(
        { success: false, message: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate email format
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      return Response.json(
        { success: false, message: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // Log submission (replace with email service in production)
    console.log('Contact form submission:', data);

    // TODO: Add email forwarding via SendGrid/SMTP
    // TODO: Store submission in database

    return Response.json({
      success: true,
      message: 'Thank you! We will contact you shortly.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return Response.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
