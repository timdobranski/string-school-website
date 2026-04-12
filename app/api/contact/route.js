const SENDGRID_API_URL = 'https://api.sendgrid.com/v3/mail/send';

function extractEmailAddress(value) {
  if (!value) return '';
  const match = value.match(/<([^>]+)>/);
  return match ? match[1].trim() : value.trim();
}

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Name, email, and message are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    const from = process.env.EMAIL_FROM;
    const replyTo = process.env.EMAIL_REPLY_TO;
    const confirmationTemplateId = process.env.SENDGRID_TEMPLATE_INTRO_CONFIRMATION_ID;
    const teacherDisplayName = process.env.TEACHER_DISPLAY_NAME || 'String School';

    if (!apiKey || !from || !replyTo) {
      return new Response(JSON.stringify({ error: 'Email service is not configured correctly.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ownerEmail = extractEmailAddress(replyTo);
    if (!ownerEmail) {
      return new Response(JSON.stringify({ error: 'Email recipient is not configured correctly.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ownerPayload = {
      personalizations: [
        {
          to: [{ email: ownerEmail }],
          subject: `Contact Form Message - ${name}`,
        },
      ],
      from: { email: extractEmailAddress(from), name: from.includes('<') ? from.split('<')[0].trim() : undefined },
      reply_to: { email },
      content: [
        {
          type: 'text/plain',
          value: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        },
      ],
    };

    const ownerResponse = await fetch(SENDGRID_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ownerPayload),
    });

    if (!ownerResponse.ok) {
      const details = await ownerResponse.text();
      console.error('SendGrid owner email failed:', details);
      return new Response(JSON.stringify({ error: 'Failed to send message.' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (confirmationTemplateId) {
      const confirmationPayload = {
        personalizations: [
          {
            to: [{ email }],
            dynamic_template_data: {
              name,
              teacher_name: teacherDisplayName,
              message,
            },
          },
        ],
        from: { email: extractEmailAddress(from), name: from.includes('<') ? from.split('<')[0].trim() : undefined },
        reply_to: { email: ownerEmail },
        template_id: confirmationTemplateId,
      };

      const confirmationResponse = await fetch(SENDGRID_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(confirmationPayload),
      });

      if (!confirmationResponse.ok) {
        const details = await confirmationResponse.text();
        console.error('SendGrid confirmation email failed:', details);
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return new Response(JSON.stringify({ error: 'Unexpected error while sending message.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
