async function generateLink() {
    const sensitiveData = document.getElementById('sensitiveData').value;

    const response = await fetch('/api/links/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sensitiveData })
    });

    const data = await response.json();

    if (response.ok) {
        document.getElementById('result').style.display = 'block';
        document.getElementById('secure-link').innerText = data.link;
    } else {
        alert('Failed to generate link.');
    }
}

async function sendViaSlack() {
    const email = document.getElementById('email').value;
    const link = document.getElementById('secure-link').innerText;

    const response = await fetch('/api/slack/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, link })
    });

    if (response.ok) {
        alert('Link sent via Slack.');
    } else {
        alert('Failed to send link.');
    }
}
