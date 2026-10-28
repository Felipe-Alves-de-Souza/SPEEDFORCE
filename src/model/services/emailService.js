import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function getMissingEnvMessage() {
  const missing = [];
  if (!SERVICE_ID) missing.push('VITE_EMAILJS_SERVICE_ID');
  if (!TEMPLATE_ID) missing.push('VITE_EMAILJS_TEMPLATE_ID');
  if (!PUBLIC_KEY) missing.push('VITE_EMAILJS_PUBLIC_KEY');
  return missing.length ? `Variáveis de ambiente ausentes: ${missing.join(', ')}` : '';
}

export async function sendWaitlistEmail({ email }) {
  const missing = getMissingEnvMessage();
  if (missing) {
    throw new Error(missing);
  }

  const templateParams = {
    to_email: email,
  };

  const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
    publicKey: PUBLIC_KEY,
    limitRate: {
      throttle: 15000,
      id: 'waitlist',
    },
  });

  return response;
}
