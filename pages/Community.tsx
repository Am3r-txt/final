import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChatMessage } from '../types';
import { Search, Filter, MessageSquare, Heart, Share2 } from 'lucide-react';

const MOCK_MESSAGES: ChatMessage[] = [
  { id: '1', user: 'EcoWarrior99', avatar: 'https://picsum.photos/40/40?random=1', text: 'Does anyone have tips for composting in an apartment?', topic: 'tips', timestamp: '2h ago' },
  { id: '2', user: 'GreenAlice', avatar: 'https://picsum.photos/40/40?random=2', text: 'Just joined the local beach cleanup! It was amazing to see so many people.', topic: 'events', timestamp: '5h ago' },
  { id: '3', user: 'SolarSam', avatar: 'https://picsum.photos/40/40?random=3', text: 'Good morning everyone! Happy Earth Day!', topic: 'general', timestamp: '10m ago' },
  { id: '4', user: 'BioBob', avatar: 'https://picsum.photos/40/40?random=4', text: 'I switched to LED bulbs finally. The difference in my bill is noticeable.', topic: 'tips', timestamp: '1d ago' },
  { id: '5', user: 'NatureNancy', avatar: 'https://picsum.photos/40/40?random=5', text: 'Who is going to the Farmers Market this weekend?', topic: 'events', timestamp: '3h ago' },
];

const Community: React.FC = () => {
  // Requirement: Use URL search params
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTopic = searchParams.get('topic') || 'all';
  
  const [newMessage, setNewMessage] = useState('');

  // Filter logic based on Search Params
  const filteredMessages = currentTopic === 'all' 
    ? MOCK_MESSAGES 
    : MOCK_MESSAGES.filter(msg => msg.topic === currentTopic);

  const handleTopicChange = (topic: string) => {
    setSearchParams(topic === 'all' ? {} : { topic });
  };

  return (
    <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] flex flex-col">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Community Hub</h1>
        <p className="text-slate-500 mt-1">Connect with like-minded eco-enthusiasts.</p>
      </header>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'general', 'tips', 'events'].map((topic) => (
          <button
            key={topic}
            onClick={() => handleTopicChange(topic)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              currentTopic === topic
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-emerald-50 border border-slate-200'
            }`}
          >
            {topic.charAt(0).toUpperCase() + topic.slice(1)}
          </button>
        ))}
      </div>

      {/* Main Chat Layout */}
      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Chat Feed */}
        <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {filteredMessages.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <Filter size={48} className="mb-4 opacity-50"/>
                  <p>No messages found in this topic.</p>
               </div>
            ) : (
              filteredMessages.map((msg) => (
                <div key={msg.id} className="group flex gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                  <img src={msg.avatar} alt={msg.user} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{msg.user}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider ${
                          msg.topic === 'tips' ? 'bg-blue-100 text-blue-700' :
                          msg.topic === 'events' ? 'bg-purple-100 text-purple-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {msg.topic}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">{msg.timestamp}</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{msg.text}</p>
                    
                    {/* Interaction Buttons (Visual Only) */}
                    <div className="flex gap-4 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 text-xs">
                        <Heart size={14} /> Like
                      </button>
                      <button className="text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-1 text-xs">
                        <MessageSquare size={14} /> Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={`Message #${currentTopic === 'all' ? 'general' : currentTopic}...`}
                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
              <button 
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
                onClick={() => { setNewMessage(''); alert('Message sent (demo)!'); }}
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar (Desktop only) for Trending */}
        <div className="hidden lg:block w-72 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-fit">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Share2 size={18} className="text-emerald-500"/> Trending
          </h3>
          <ul className="space-y-4">
            <li className="text-sm">
              <span className="block font-medium text-slate-700">#PlasticFreeJuly</span>
              <span className="text-xs text-slate-400">2.4k posts</span>
            </li>
            <li className="text-sm">
              <span className="block font-medium text-slate-700">#VeganRecipes</span>
              <span className="text-xs text-slate-400">1.2k posts</span>
            </li>
            <li className="text-sm">
              <span className="block font-medium text-slate-700">#BikeToWork</span>
              <span className="text-xs text-slate-400">850 posts</span>
            </li>
          </ul>
          
          <div className="mt-8 pt-6 border-t border-slate-100">
             <div className="bg-emerald-50 p-4 rounded-xl">
                <p className="text-xs text-emerald-800 font-medium">Daily Tip:</p>
                <p className="text-xs text-emerald-700 mt-1">Unplug electronics when not in use to stop "vampire power" drain.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;