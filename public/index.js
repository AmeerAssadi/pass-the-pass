async function generateLink() {
    const sensitiveData = document.getElementById('sensitiveData').value;
    const errorMessage = document.getElementById('error-message');
    const textarea = document.getElementById('sensitiveData');
    
    // Clear any previous error message and styles
    errorMessage.textContent = '';
    textarea.classList.remove('error');

    if (!sensitiveData || sensitiveData.trim() === '') {
        // Show error if the sensitive data is empty
        errorMessage.textContent = 'Sensitive data cannot be empty';
        textarea.classList.add('error');
        return;
    }

    const expirationTime = document.getElementById('expirationTime').value;

    try {
        const response = await fetch('/api/links', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sensitiveData, expirationTime })
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('result').style.display = 'block';
            document.getElementById('secure-link').innerText = data.link;
        } else {
            errorMessage.textContent = 'Failed to generate link.';
        }
    } catch (error) {
        errorMessage.textContent = 'An error occurred. Please try again.';
    }
}
