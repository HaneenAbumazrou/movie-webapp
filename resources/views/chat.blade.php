<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Chatbot</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <style>
        body {
            background-color: #f4f6f9;
            font-family: 'Arial', sans-serif;
        }
        .chat-container {
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .chat-header {
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            color: white;
            padding: 15px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        .chat-box {
            height: 500px;
            background-color: white;
            overflow-y: auto;
            padding: 20px;
            border-left: 1px solid #e0e0e0;
            border-right: 1px solid #e0e0e0;
        }
        .message {
            margin-bottom: 15px;
            max-width: 80%;
            clear: both;
        }
        .user-message {
            background-color: #e6f2ff;
            border-radius: 10px 10px 0 10px;
            padding: 10px;
            float: right;
            color: #333;
        }
        .bot-message {
            background-color: #f1f0f0;
            border-radius: 10px 10px 10px 0;
            padding: 10px;
            float: left;
            color: #333;
        }
        .input-group {
            border-top: 1px solid #e0e0e0;
            padding: 15px;
            background-color: white;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }
        .btn-send {
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            border: none;
            color: white;
        }
        .btn-send:hover {
            opacity: 0.9;
        }
        #messages {
            display: flex;
            flex-direction: column;
        }
    </style>
</head>
<body>
    <div class="container mt-5">
        <div class="chat-container">
            <div class="chat-header text-center">
                <h2>AI Chatbot</h2>
            </div>
            <div class="chat-box" id="chatBox">
                <div id="messages"></div>
            </div>
            <form id="chatForm" class="input-group">
                <input type="text" id="messageInput" class="form-control" placeholder="Type your message...">
                <button type="submit" class="btn btn-send">
                    <i class="bi bi-send"></i> Send
                </button>
            </form>
        </div>
    </div>

    <script>
        const chatForm = document.getElementById('chatForm');
        const messageInput = document.getElementById('messageInput');
        const messages = document.getElementById('messages');
        const chatBox = document.getElementById('chatBox');

        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const userMessage = messageInput.value;

            if (!userMessage) return;

            // Create and append user message
            const userMsgDiv = document.createElement('div');
            userMsgDiv.classList.add('message', 'user-message', 'text-end');
            userMsgDiv.textContent = userMessage;
            messages.appendChild(userMsgDiv);

            // Clear input
            messageInput.value = '';

            // Send message to the backend
            try {
                const response = await axios.post('/chat/ask', { message: userMessage });
                const botMessage = response.data.response;

                const botMsgDiv = document.createElement('div');
                botMsgDiv.classList.add('message', 'bot-message', 'text-start');
                botMsgDiv.textContent = botMessage;
                messages.appendChild(botMsgDiv);

                // Scroll to bottom
                chatBox.scrollTop = chatBox.scrollHeight;
            } catch (error) {
                console.error('Error communicating with the chatbot:', error);
            }
        });
    </script>
</body>
</html>
