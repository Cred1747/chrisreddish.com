module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(200).json({
      content: [{ type: 'text', text: 'API key not configured.' }]
    });
  }

  try {
    const { system, messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(200).json({
        content: [{ type: 'text', text: 'No messages provided.' }]
      });
    }

    const body = {
      model: 'claude-sonnet-5',
      max_tokens: 1000,
      messages: messages,
    };

    if (system) {
      body.system = system;
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(200).json({
        content: [{ type: 'text', text: 'API error: ' + (data.error && data.error.message ? data.error.message : JSON.stringify(data)) }]
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      content: [{ type: 'text', text: 'Server error: ' + error.message }]
    });
  }
};
