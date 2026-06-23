import { buildContactSummary, submitToSplitForms } from '@/lib/splitforms';

const SUBJECTS = {
  consultation: 'New free consultation request',
  lead: 'New homepage lead form submission',
  contact: 'New contact form submission',
};

const REQUIRED_BY_TYPE = {
  consultation: ['name', 'email', 'company', 'website', 'phone', 'needs'],
  lead: ['firstName', 'lastName', 'email', 'company', 'website', 'serviceType', 'callVolume'],
  contact: [
    'companyName',
    'name',
    'title',
    'phone',
    'email',
    'website',
    'callLength',
    'productService',
    'monthlyCallVolume',
  ],
};

export async function POST(request) {
  try {
    const data = await request.json();
    const formType = data.formType || 'contact';
    const required = REQUIRED_BY_TYPE[formType] || REQUIRED_BY_TYPE.contact;

    const missing = required.filter((field) => !data[field]?.trim());
    if (missing.length > 0) {
      return Response.json(
        { success: false, message: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      return Response.json(
        { success: false, message: 'Invalid email address.' },
        { status: 400 }
      );
    }

    const fields = {
      form_type: formType,
      ...data,
      message: data.message || data.needs || data.productService || buildContactSummary(data),
    };

    delete fields.formType;

    const result = await submitToSplitForms({
      subject: SUBJECTS[formType] || SUBJECTS.contact,
      fields,
    });

    if (!result.success) {
      return Response.json(
        { success: false, message: result.message || 'Unable to send your message. Please try again.' },
        { status: 502 }
      );
    }

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
