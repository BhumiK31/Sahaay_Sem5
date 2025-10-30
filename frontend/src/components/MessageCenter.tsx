import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Send, Search } from 'lucide-react';
import { useState } from 'react';

export function MessageCenter() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      family: 'Smith Family',
      lastMessage: 'Great! Looking forward to meeting you on Monday.',
      timestamp: '2 hours ago',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b372?w=40&h=40&fit=crop&crop=face',
      job: 'Live-in Elderly Care Assistant',
    },
    {
      id: 2,
      family: 'Johnson Family',
      lastMessage: 'Could you start this weekend?',
      timestamp: '1 day ago',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      job: 'Part-time Babysitter',
    },
    {
      id: 3,
      family: 'Martinez Family',
      lastMessage: 'Thank you for your application. We will review and get back to you soon.',
      timestamp: '3 days ago',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      job: 'Weekend Childcare',
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'Smith Family',
      content: 'Hi Sarah, thank you for applying to our elderly care position. We were impressed with your experience.',
      timestamp: '2 days ago',
      isMe: false,
    },
    {
      id: 2,
      sender: 'Me',
      content: 'Thank you for considering my application! I would love to learn more about your father\'s specific needs and how I can best support him.',
      timestamp: '2 days ago',
      isMe: true,
    },
    {
      id: 3,
      sender: 'Smith Family',
      content: 'Would you be available for an in-person interview this Monday at 2 PM? We can discuss the details and you can meet our father.',
      timestamp: '1 day ago',
      isMe: false,
    },
    {
      id: 4,
      sender: 'Me',
      content: 'Yes, I would be happy to meet on Monday at 2 PM. Should I bring any specific documents or references?',
      timestamp: '1 day ago',
      isMe: true,
    },
    {
      id: 5,
      sender: 'Smith Family',
      content: 'Just bring a copy of your resume and any certifications you have. Great! Looking forward to meeting you on Monday.',
      timestamp: '2 hours ago',
      isMe: false,
    },
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Conversations List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Messages</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input placeholder="Search conversations..." className="pl-10" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 cursor-pointer hover:bg-gray-50 border-b ${
                  selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback>{conversation.family.split(' ')[0][0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm truncate">{conversation.family}</p>
                      {conversation.unread > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{conversation.job}</p>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    <p className="text-xs text-gray-400 mt-1">{conversation.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Message Thread */}
      <Card className="lg:col-span-2 flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={conversations.find(c => c.id === selectedConversation)?.avatar} />
              <AvatarFallback>SF</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">
                {conversations.find(c => c.id === selectedConversation)?.family}
              </CardTitle>
              <p className="text-sm text-gray-500">
                {conversations.find(c => c.id === selectedConversation)?.job}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.isMe
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.isMe ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </CardContent>

        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}