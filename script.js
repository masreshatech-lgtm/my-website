// 1. Initialize AOS (Animate On Scroll Framework)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 120
});

// 2. Mobile Drawer Navigation Slide-In Animations
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');
});

const closeMobileDrawer = () => {
    mobileMenu.classList.remove('translate-x-0');
    mobileMenu.classList.add('translate-x-full');
};

mobileMenuClose.addEventListener('click', closeMobileDrawer);

// Bind interior navigation link triggers to safely hide menu pane post-interaction
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileDrawer);
});

// 3. Header Navigation Shrink and Accent Scroll Event Configurations
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('bg-navy-dark', 'py-2');
        header.classList.remove('bg-navy-dark/80');
    } else {
        header.classList.remove('bg-navy-dark', 'py-2');
        header.classList.add('bg-navy-dark/80');
    }
});

// 4. Smart Interactive Keyword Chatbot Engine Logic
const chatFabBtn = document.getElementById('chat-fab-btn');
const chatWindow = document.getElementById('masre-chat-window');
const closeChatBtn = document.getElementById('close-chat-btn');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send-btn');

// Prevention lock flag ensuring welcoming assets inject strictly once per instance lifecycle
let hasWelcomed = false;

// Generates and Appends Document Text Nodes Contextually to History Output Panels
function appendChatMessage(text, isBot) {
    const msgDiv = document.createElement('div');
    if (isBot) {
        msgDiv.className = "bg-navy-light border border-gray-800 text-gray-200 p-3 rounded-tr-xl rounded-bl-xl rounded-br-xl text-xs w-[85%] shadow-sm leading-relaxed self-start";
    } else {
        msgDiv.className = "bg-cyan/10 border border-cyan/30 text-cyan p-3 rounded-tl-xl rounded-bl-xl rounded-br-xl text-xs w-[85%] shadow-sm leading-relaxed self-end ml-auto text-left";
    }
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    
    // Auto Scroll Focus Alignment Adjustments 
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Launches Automated Initial Conversational Welcome Sequence Track
function triggerWelcomeMessage() {
    if (!hasWelcomed) {
        appendChatMessage("Hi there! 👋 I'm the MasreTech AI Assistant.", true);
        setTimeout(() => {
            appendChatMessage("How can Masresha help you level up your digital presence today?", true);
        }, 400);
        hasWelcomed = true;
    }
}

// Window Display Toggle Handlers
chatFabBtn.addEventListener('click', () => {
    if(chatWindow.classList.contains('hidden')) {
        chatWindow.classList.remove('hidden');
        chatWindow.classList.add('chat-open');
        triggerWelcomeMessage();
    } else {
        chatWindow.classList.add('hidden');
        chatWindow.classList.remove('chat-open');
    }
});

closeChatBtn.addEventListener('click', () => {
    chatWindow.classList.add('hidden');
    chatWindow.classList.remove('chat-open');
});

// Primary Input Validation and String Pattern Processor
function processUserChatInput() {
    const query = chatInput.value.trim();
    if (!query) return;

    // Immediately map and append user messages to conversational board
    appendChatMessage(query, false);
    chatInput.value = '';

    // Advanced execution matching routes for incoming structural strings
    setTimeout(() => {
        const normalizedText = query.toLowerCase();
        let botReply = "Interesting! For detailed inquiries, click the Telegram button below to chat with Masresha directly.";

        if (normalizedText.includes('hi') || normalizedText.includes('hello') || normalizedText.includes('ሰላም')) {
            botReply = "Hi! I am the MasreTech AI. How can I help you today?";
        } else if (normalizedText.includes('project') || normalizedText.includes('work')) {
            botReply = "Masresha has worked on amazing tech & marketing projects! Check out the 'Projects' section above.";
        } else if (normalizedText.includes('skill') || normalizedText.includes('what do you do')) {
            botReply = "He specializes in Content Creation, Video Editing, Graphic Design, and Digital Marketing.";
        } else if (normalizedText.includes('cv') || normalizedText.includes('resume')) {
            botReply = "You can download his CV from the button in the Hero section at the top of the page!";
        }

        appendChatMessage(botReply, true);
    }, 500);
}

// Primary Click & Keyboard Event Target Interceptors
chatSendBtn.addEventListener('click', processUserChatInput);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') processUserChatInput();
});