class ChatBot {
    constructor() {
        this.messages = [];
        this.isTyping = false;
        this.isMinimized = false;
        this.sessionId = this.generateSessionId();
        
        this.initializeElements();
        this.bindEvents();
        this.addInitialMessage();
        this.updateTimestamps();
        
        // Update timestamps every minute
        setInterval(() => this.updateTimestamps(), 60000);
    }

    initializeElements() {
        this.chatToggle = document.getElementById('chatToggle');
        this.chatContainer = document.getElementById('chatContainer');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatForm = document.getElementById('chatForm');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.minimizeBtn = document.getElementById('minimizeBtn');
        this.closeBtn = document.getElementById('closeBtn');
        this.typingIndicator = document.getElementById('typingIndicator');
    }

    bindEvents() {
        this.chatToggle.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.closeChat());
        this.minimizeBtn.addEventListener('click', () => this.toggleMinimize());
        this.chatForm.addEventListener('submit', (e) => this.handleSubmit(e));
        this.messageInput.addEventListener('input', () => this.handleInputResize());
        this.messageInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    generateSessionId() {
        return 'session_' + Math.random().toString(36).substr(2, 9);
    }

    addInitialMessage() {
        const message = {
            id: Date.now().toString(),
            text: '¡Hola! Soy tu asistente virtual empresarial. ¿Cómo puedo ayudarte hoy?',
            isBot: true,
            timestamp: new Date()
        };
        
        this.messages.push(message);
        this.updateMessageTime(this.chatMessages.querySelector('.message-time'));
    }

    toggleChat() {
        this.chatContainer.classList.toggle('hidden');
        if (!this.chatContainer.classList.contains('hidden')) {
            this.messageInput.focus();
        }
    }

    closeChat() {
        this.chatContainer.classList.add('hidden');
    }

    toggleMinimize() {
        this.isMinimized = !this.isMinimized;
        this.chatContainer.classList.toggle('minimized', this.isMinimized);
        
        const icon = this.minimizeBtn.querySelector('svg path');
        if (this.isMinimized) {
            icon.setAttribute('d', 'M18 15l-6-6-6 6');
        } else {
            icon.setAttribute('d', 'M6 9l6 6 6-6');
        }
    }

    handleInputResize() {
        const textarea = this.messageInput;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 96) + 'px';
        
        // Update send button state
        this.sendBtn.disabled = !textarea.value.trim() || this.isTyping;
    }

    handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.handleSubmit(e);
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const text = this.messageInput.value.trim();
        if (!text || this.isTyping) return;

        // Add user message
        this.addMessage(text, false);
        this.messageInput.value = '';
        this.handleInputResize();
        
        // Show typing indicator
        this.showTyping();
        
        try {
            // Send to webhook
            const response = await fetch('https://rag-n8n.p4qanf.easypanel.host/webhook-test/0efc73bd-0afc-44a8-9cdf-ad8b0687fa96', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: text,
                    timestamp: new Date().toISOString(),
                    sessionId: this.sessionId
                })
            });

            if (response.ok) {
                const data = await response.json();
                const botResponse = data.response || data.message || 'Gracias por tu consulta. Te ayudaré en breve.';
                
                // Add bot response
                setTimeout(() => {
                    this.hideTyping();
                    this.addMessage(botResponse, true);
                }, 1000); // Simulate thinking time
                
            } else {
                throw new Error('Error al enviar mensaje');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            
            setTimeout(() => {
                this.hideTyping();
                this.addMessage('Lo siento, ha ocurrido un error. Por favor, intenta nuevamente en unos momentos.', true);
            }, 1000);
        }
    }

    addMessage(text, isBot) {
        const message = {
            id: Date.now().toString(),
            text: text,
            isBot: isBot,
            timestamp: new Date()
        };
        
        this.messages.push(message);
        
        const messageElement = this.createMessageElement(message);
        this.chatMessages.appendChild(messageElement);
        this.scrollToBottom();
    }

    createMessageElement(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.isBot ? 'bot-message' : 'user-message'}`;
        messageDiv.setAttribute('data-message-id', message.id);
        
        const avatarSvg = message.isBot 
            ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
            : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                ${avatarSvg}
            </div>
            <div class="message-content">
                <div class="message-bubble ${message.isBot ? 'bot' : 'user'}">
                    <p>${this.escapeHtml(message.text)}</p>
                    <span class="message-time" data-timestamp="${message.timestamp.getTime()}"></span>
                </div>
            </div>
        `;
        
        this.updateMessageTime(messageDiv.querySelector('.message-time'));
        return messageDiv;
    }

    showTyping() {
        this.isTyping = true;
        this.typingIndicator.classList.remove('hidden');
        this.sendBtn.disabled = true;
        this.scrollToBottom();
    }

    hideTyping() {
        this.isTyping = false;
        this.typingIndicator.classList.add('hidden');
        this.sendBtn.disabled = !this.messageInput.value.trim();
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }

    updateTimestamps() {
        const timeElements = this.chatMessages.querySelectorAll('.message-time');
        timeElements.forEach(element => this.updateMessageTime(element));
    }

    updateMessageTime(element) {
        if (!element) return;
        
        const timestamp = element.getAttribute('data-timestamp');
        if (timestamp) {
            const date = new Date(parseInt(timestamp));
            element.textContent = this.formatTime(date);
        } else {
            // For initial message without timestamp
            element.textContent = this.formatTime(new Date());
            element.setAttribute('data-timestamp', Date.now().toString());
        }
    }

    formatTime(date) {
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        
        if (diffInMinutes < 1) {
            return 'Ahora';
        } else if (diffInMinutes < 60) {
            return `Hace ${diffInMinutes} min`;
        } else if (diffInMinutes < 1440) { // Less than 24 hours
            const hours = Math.floor(diffInMinutes / 60);
            return `Hace ${hours}h`;
        } else {
            return date.toLocaleDateString('es-ES', { 
                day: '2-digit', 
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
});

// Add some utility functions for enhanced UX
document.addEventListener('click', (e) => {
    const chatContainer = document.getElementById('chatContainer');
    const chatToggle = document.getElementById('chatToggle');
    
    // Close chat when clicking outside (optional)
    if (!chatContainer.contains(e.target) && !chatToggle.contains(e.target)) {
        // Uncomment the line below if you want to close chat when clicking outside
        // chatContainer.classList.add('hidden');
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC to close chat
    if (e.key === 'Escape') {
        const chatContainer = document.getElementById('chatContainer');
        if (!chatContainer.classList.contains('hidden')) {
            chatContainer.classList.add('hidden');
        }
    }
});

// Add focus management
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        const messageInput = document.getElementById('messageInput');
        const chatContainer = document.getElementById('chatContainer');
        
        if (!chatContainer.classList.contains('hidden') && !chatContainer.classList.contains('minimized')) {
            setTimeout(() => messageInput.focus(), 100);
        }
    }
});