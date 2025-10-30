import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Send, 
  Phone, 
  Video, 
  MoreVertical, 
  Paperclip,
  Smile,
  CheckCheck,
  Check,
  Clock
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'caregiver' | 'family';
  message: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file';
}

const MessageFamily = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'family',
      message: 'Hello! Thank you for your interest in our caregiving position. We would like to know more about your experience with elderly care.',
      timestamp: '10:30 AM',
      status: 'read',
      type: 'text'
    },
    {
      id: '2',
      sender: 'caregiver',
      message: 'Hello! Thank you for considering my application. I have over 3 years of experience in elderly care, specializing in mobility assistance and companionship.',
      timestamp: '10:35 AM',
      status: 'read',
      type: 'text'
    },
    {
      id: '3',
      sender: 'family',
      message: 'That sounds great! Our father needs help with daily activities and medication reminders. Are you available for a brief interview this week?',
      timestamp: '10:40 AM',
      status: 'read',
      type: 'text'
    },
    {
      id: '4',
      sender: 'caregiver',
      message: 'Absolutely! I am available for an interview. I have experience with medication management and am very patient with daily care routines. When would be convenient for you?',
      timestamp: '10:42 AM',
      status: 'delivered',
      type: 'text'
    }
  ]);
  
  const [familyInfo] = useState({
    name: 'Patel Family',
    contact: 'Mrs. Priya Patel',
    avatar: 'PP',
    isOnline: true,
    lastSeen: 'online'
  });

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate AI chatbot responses
  const generateBotResponse = (userMessage: string): string => {
    const responses = [
      "Thank you for your message! We appreciate your interest and will get back to you shortly.",
      "That's wonderful to hear about your experience! We'd love to schedule an interview soon.",
      "We're impressed with your background. Would you be available for a video call this week?",
      "Your qualifications look great! Can you tell us more about your availability?",
      "Perfect! We think you might be a good fit. Let's discuss the next steps.",
      "Thank you for the detailed response. We'll review and contact you within 24 hours.",
    ];
    
    // Simple keyword-based responses
    if (userMessage.toLowerCase().includes('available') || userMessage.toLowerCase().includes('schedule')) {
      return "Great! We're flexible with timing. How does tomorrow at 2 PM work for a brief interview call?";
    }
    if (userMessage.toLowerCase().includes('experience') || userMessage.toLowerCase().includes('care')) {
      return "Your experience sounds perfect for what we need. We're looking for someone compassionate and reliable.";
    }
    if (userMessage.toLowerCase().includes('interview') || userMessage.toLowerCase().includes('meet')) {
      return "Excellent! We can arrange either a video call or in-person meeting. What would you prefer?";
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'caregiver',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate family response after 1-3 seconds
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'family',
        message: generateBotResponse(newMessage),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read',
        type: 'text'
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Update user message status to delivered then read
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === userMessage.id ? { ...msg, status: 'delivered' } : msg
        ));
      }, 500);
      
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === userMessage.id ? { ...msg, status: 'read' } : msg
        ));
      }, 1000);
      
    }, Math.random() * 2000 + 1000); // 1-3 seconds delay
  };

  const getMessageStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return <Clock className="w-3 h-3 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-blue-500 text-white text-sm">
                  {familyInfo.avatar}
                </AvatarFallback>
              </Avatar>
              {familyInfo.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-sm">{familyInfo.name}</h3>
              <p className="text-xs text-muted-foreground">
                {familyInfo.isOnline ? 'online' : familyInfo.lastSeen}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Video className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Job Info Banner */}
      <div className="bg-blue-50 border-b px-4 py-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-blue-700">💼</span>
          <span className="text-blue-800">Discussing: Medical Caregiver Position</span>
          <Badge variant="secondary" className="text-xs">Job #{jobId}</Badge>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'caregiver' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${
              message.sender === 'caregiver' ? 'order-2' : 'order-1'
            }`}>
              <div className={`rounded-lg px-4 py-2 ${
                message.sender === 'caregiver'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-900 shadow-sm'
              }`}>
                <p className="text-sm">{message.message}</p>
              </div>
              <div className={`flex items-center gap-1 mt-1 px-1 ${
                message.sender === 'caregiver' ? 'justify-end' : 'justify-start'
              }`}>
                <span className="text-xs text-gray-500">{message.timestamp}</span>
                {message.sender === 'caregiver' && (
                  <div className="ml-1">
                    {getMessageStatusIcon(message.status)}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Responses */}
      <div className="px-4 py-2 bg-white border-t">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            'Available for interview',
            'Can we schedule a call?',
            'What are your requirements?',
            'When can I start?'
          ].map((quickResponse) => (
            <Button
              key={quickResponse}
              variant="outline"
              size="sm"
              className="whitespace-nowrap text-xs"
              onClick={() => setNewMessage(quickResponse)}
            >
              {quickResponse}
            </Button>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="sm">
            <Paperclip className="w-4 h-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="pr-10"
            />
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              className="absolute right-1 top-1/2 -translate-y-1/2"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
          <Button type="submit" disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MessageFamily;
