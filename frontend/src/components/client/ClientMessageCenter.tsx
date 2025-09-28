import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Send, Search } from 'lucide-react';
import { useState } from 'react';

export function ClientMessageCenter() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      caregiver: 'Sarah Anderson',
      lastMessage: 'Thank you for considering my application! I would love to learn more about your children.',
      timestamp: '1 hour ago',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b372?w=40&h=40&fit=crop&crop=face',
      job: 'Part-time Babysitter',
      status: 'Applicant',
    },
    {
      id: 2,
      caregiver: 'Maria Rodriguez',
      lastMessage: 'I\'m available for the interview on Friday at 2 PM. Looking forward to meeting your family!',
      timestamp: '3 hours ago',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      job: 'Part-time Babysitter',
      status: 'Interview Scheduled',
    },
    {
      id: 3,
      caregiver: 'Jennifer Kim',
      lastMessage: 'Could you tell me more about your father\'s daily routine?',
      timestamp: '1 day ago',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      job: 'Weekend Elderly Care',
      status: 'Under Review',
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'Sarah Anderson',
      content: 'Hi! Thank you for posting the babysitting position. I\'m very interested in caring for your children.',
      timestamp: '2 days ago',
      isMe: false,
    },
    {
      id: 2,
      sender: 'Me',
      content: 'Hi Sarah! Thank you for your interest. I\'d love to learn more about your experience with school-age children.',
      timestamp: '2 days ago',
      isMe: true,
    },
    {
      id: 3,
      sender: 'Sarah Anderson',
      content: 'I have over 5 years of experience working with children ages 3-12. I particularly enjoy helping with homework and organizing creative activities. I\'m also CPR certified.',
      timestamp: '1 day ago',
      isMe: false,
    },
    {
      id: 4,
      sender: 'Me',
      content: 'That sounds perfect! My kids are 5 and 7, so your experience is exactly what we need. Do you have any questions about the position?',
      timestamp: '1 day ago',
      isMe: true,
    },
    {
      id: 5,
      sender: 'Sarah Anderson',
      content: 'Thank you for considering my application! I would love to learn more about your children. What are their interests and favorite activities?',
      timestamp: '1 hour ago',
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
                  selectedConversation === conversation.id ? 'bg-purple-50 border-l-4 border-l-purple-500' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback>{conversation.caregiver.split(' ')[0][0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm truncate">{conversation.caregiver}</p>
                      {conversation.unread > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xs text-gray-500">{conversation.job}</p>
                      <Badge variant="outline" className="text-xs">
                        {conversation.status}
                      </Badge>
                    </div>
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
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">
                {conversations.find(c => c.id === selectedConversation)?.caregiver}
              </CardTitle>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">
                  {conversations.find(c => c.id === selectedConversation)?.job}
                </p>
                <Badge variant="outline" className="text-xs">
                  {conversations.find(c => c.id === selectedConversation)?.status}
                </Badge>
              </div>
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
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.isMe ? 'text-purple-100' : 'text-gray-500'}`}>
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
          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm">
              Schedule Interview
            </Button>
            <Button variant="outline" size="sm">
              View Profile
            </Button>
            <Button variant="outline" size="sm">
              Send Job Offer
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}