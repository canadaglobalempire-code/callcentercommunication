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

    // If no form backend is configured, log the submission and succeed gracefully
    // so the site works in development/preview. Configure SPLITFORMS_ACCESS_KEY to
    // actually deliver submissions.
    if (!process.env.SPLITFORMS_ACCESS_KEY) {
      console.warn(
        '[contact] SPLITFORMS_ACCESS_KEY not set — logging submission instead of sending.'
      );
      console.log('[contact] Submission received:', fields);
      return Response.json({
        success: true,
        message: 'Thank you! We will contact you shortly.',
      });
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
