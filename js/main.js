const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');

// Add at the beginning of the file
function closeWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    const chatContainer = document.querySelector('.chat-container');
    const leftReview = document.querySelector('.left-review');
    const rightReview = document.querySelector('.right-review');
    
    // First hide the modal
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        // Then trigger the chat container and reviews animation
        chatContainer.style.display = 'block';
        leftReview.style.display = 'block';
        rightReview.style.display = 'block';
        chatContainer.style.animation = 'slideUp 0.8s ease-out forwards';
    }, 500);
}

// Check if we should show the welcome modal
window.addEventListener('load', () => {
    const chatContainer = document.querySelector('.chat-container');
    const modal = document.getElementById('welcomeModal');
    const leftReview = document.querySelector('.left-review');
    const rightReview = document.querySelector('.right-review');
    
    // Always show modal and hide chat container and reviews on load
    modal.style.display = 'flex';
    chatContainer.style.display = 'none';
    leftReview.style.display = 'none';
    rightReview.style.display = 'none';
});

// Initial greeting sequence
setTimeout(() => {
    addMessage("Hi! I'm Dr. PumpBot, your friendly trading therapist. How was your trading day? 📈", 'bot');
    
    // Add casual suggestion after a short delay
    setTimeout(() => {
        addMessage("Whether you made profits, took some losses, or felt stressed - I'm here to chat about it! 💭", 'bot');
    }, 1500);
}, 1000);

function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    // Add user message
    addMessage(message, 'user');
    userInput.value = '';

    // Bot response
    setTimeout(() => {
        const response = generateResponse(message);
        addMessage(response, 'bot');
    }, 1000);
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function generateResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('loss') || lowerMessage.includes('lost')) {
        return "I understand losing trades can be tough. Remember, every trader faces losses. Let's focus on what we can learn from this experience. Want to talk about your trading strategy? 📊";
    }
    else if (lowerMessage.includes('profit') || lowerMessage.includes('gained')) {
        return "That's fantastic! 🎉 Great job managing your trades! Remember to stay grounded and stick to your strategy. Would you like to discuss your successful approach?";
    }
    else if (lowerMessage.includes('stress') || lowerMessage.includes('worried')) {
        return "Trading can be stressful. Let's talk about some stress management techniques that can help you make clearer decisions. Have you tried taking regular breaks? 🧘‍♂️";
    }
    else {
        return "Tell me more about that. How did it affect your trading decisions today? 🤔";
    }
}

// Enter key functionality
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
