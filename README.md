# Pass-The-Pass

Pass-The-Pass project is a secure data transfer tool that allows employees to securely share sensitive information via a one-time-use link and optionally send the link via Slack. It is designed with security in mind, ensuring that sensitive data is only accessed by the intended recipient.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
  - [Running the Development Server](#running-the-development-server)
  - [Running Tests](#running-tests)
- [Security Considerations](#security-considerations)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Secure Data Encryption**: All sensitive data is encrypted using strong encryption methods before being stored in the database.
- **One-Time Access Links**: The tool generates a unique link that can only be used once to access the sensitive data. After the data is accessed, the link is invalidated.
- **Expiration Time**: Users can choose the expiration time for the link (10 minutes, 30 minutes, or 1 hour). The backend enforces this expiration, ensuring links are invalidated after the specified time.
- **Google Authentication**: Users must authenticate using Google OAuth before they can use the tool, ensuring that only authorized users can generate and access secure links.
- **Send via Slack**: Send the generated secure link directly to a Slack user via email.
- **Visual Interface**: A simple and user-friendly interface for interacting with the tool.



## Requirements

- Node.js (v14 or higher recommended)
- npm or yarn
- A Slack Webhook URL (for Slack integration)

## Installation

To get started with Pass-The-Pass, follow these steps:

### 1. Clone the Repository

```
git clone https://github.com/ameerassadi/pass-the-pass.git
cd pass-the-pass
```

### 2. Install Dependencies
```
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following environment variables:
```
ENCRYPTION_KEY=your-generated-32-byte-base64-key
BASE_URL='http://localhost:3000'
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your/slack/webhook
GOOGLE_CLIENT_ID=google-client-id
GOOGLE_CLIENT_SECRET=google-client-secret
SESSION_SECRET=session-secret
```

## Usage

### Running the Development Server

To start the development server:
```
npm run dev
```
The application will run on `http://localhost:3000`.

### Running Tests

To run the tests, use:
```
npm test
```
This will run the test suite using Jest, covering unit and integration tests.

## Security Considerations

- **Environment Variables**: Ensure that sensitive environment variables, such as `ENCRYPTION_KEY`, are kept secure and not exposed in version control.
- **HTTPS**: For production deployments, always use HTTPS to encrypt data in transit.
- **Access Control**: Implement additional access controls as needed, especially if deploying in a multi-user environment.
- **Key Rotation**: Regularly rotate the `ENCRYPTION_KEY` and re-encrypt sensitive data accordingly.

## Contributing

I welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.

Please ensure that your code adheres to the coding standards and is well-documented.

## Feature Requests

I'm always looking to improve and expand the functionality of this tool. If you have an idea for a new feature or enhancement, please follow these steps:

1. **Check Existing Issues**: Before submitting a new feature request, please check the [issues section](https://github.com/ameerassadi/pass-the-pass/issues) to see if a similar request already exists.
2. **Open a New Issue**: If your feature has not been requested yet, open a new issue with a detailed description of your idea. Include any examples, screenshots, or use cases that might help me understand your request.
3. **Engage with the Community**: Feel free to comment on other feature requests, provide feedback, or suggest alternatives.

I appreciate all user feedback and contributions!

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this software as long as the original license is included in all copies or substantial portions of the software. See the [LICENSE](LICENSE) file for more details.
