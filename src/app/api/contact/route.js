import { submitToSplitForms } from '@/lib/splitforms';
import { isValidPhone } from '@/lib/phone';
import { INQUIRY_SUBJECT } from '@/lib/formFeedback';

// Every lead form emails with the same subject (SplitForms uses `subject` verbatim).
// The server sets it, so whatever the client sends is overridden.
const SUBJECTS = {
  consultation: INQUIRY_SUBJECT,
  lead: INQUIRY_SUBJECT,
  contact: INQUIRY_SUBJECT,
  newsletter: 'New newsletter signup',
};

// Every field on each lead form is required. Newsletter signups only carry an
// email; without their own entry they fell through to the contact list below
// and were rejected for missing name and productService.
const REQUIRED_BY_TYPE = {
  consultation: ['name', 'email', 'company', 'website', 'phone', 'needs'],
  lead: ['firstName', 'lastName', 'email', 'phone', 'company', 'website', 'serviceType', 'callVolume', 'message'],
  contact: [
    'companyName', 'name', 'title', 'phone', 'email', 'website', 'callDirection',
    'callLength', 'productService', 'monthlyCallVolume', 'callPurpose', 'agentCount',
  ],
  newsletter: ['email'],
};

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json(
      { success: false, message: 'Invalid form submission.' },
      { status: 400 }
    );
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return Response.json(
      { success: false, message: 'Invalid form submission.' },
      { status: 400 }
    );
  }
  try {
    const formType = data.formType || 'contact';
    if (typeof formType !== 'string' || !Object.hasOwn(REQUIRED_BY_TYPE, formType)) {
      return Response.json(
        { success: false, message: 'Invalid form type.' },
        { status: 400 }
      );
    }
    const required = REQUIRED_BY_TYPE[formType] || REQUIRED_BY_TYPE.contact;

    const missing = required.filter((field) => typeof data[field] !== 'string' || !data[field].trim());
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

    // Phone arrives as "+<dial code><digits>" from the shared PhoneField.
    if (required.includes('phone') && !isValidPhone(data.phone)) {
      return Response.json(
        { success: false, message: 'Invalid phone number.' },
        { status: 400 }
      );
    }

    // splitforms embed.js session id: forwarded so the partial lead is closed.
    const sfSid = typeof data.sf_sid === 'string' && /^[A-Za-z0-9_-]{1,128}$/.test(data.sf_sid) ? data.sf_sid : '';
    delete data.sf_sid;

    const fields = {
      form_type: formType,
      ...data,
      ...(sfSid ? { sf_sid: sfSid } : {}),
    };
    // The consultation form's comment box is "needs": send it once, as Message.
    // (It used to be copied into a separate message field too, so the lead
    // email showed the same text twice as "Message" and "Needs".)
    if (!fields.message && fields.needs) fields.message = fields.needs;
    delete fields.needs;

    delete fields.formType;
    delete fields.subject;

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

    if (!result.ok || result.success !== true || result.payment_url) {
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
