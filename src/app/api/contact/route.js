import { buildContactSummary, submitToSplitForms } from '@/lib/splitforms';

const SUBJECTS = {
  consultation: 'New free consultation request',
  lead: 'New homepage lead form submission',
  contact: 'New contact form submission',
};

const REQUIRED_BY_TYPE = {
  consultation: ['name', 'email', 'needs'],
  lead: ['firstName', 'email', 'message'],
  contact: ['name', 'email', 'productService'],
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

    if (!process.env.SPLITFORMS_ACCESS_KEY) {
      console.error('[contact] SPLITFORMS_ACCESS_KEY is not configured.');
      return Response.json(
        { success: false, message: 'Unable to send your message right now.' },
        { status: 503 }
      );
    }

    const result = await submitToSplitForms({
      subject: SUBJECTS[formType] || SUBJECTS.contact,
      fields,
    });

    if (!result.success && !result.ok) {
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
