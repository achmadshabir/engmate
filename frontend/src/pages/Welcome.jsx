import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, BookOpen, Mic2, Target, Sparkles, TrendingUp } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageCircle,
      title: 'Live Conversation',
      description: 'Chat naturally with your AI English buddy',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BookOpen,
      title: 'Guided Lessons',
      description: 'Step-by-step learning tailored to you',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: Mic2,
      title: 'Pronunciation Coach',
      description: 'Speak clearly with instant feedback',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Smart Progress',
      description: 'Track your journey and celebrate wins',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Hero Section - Modern Bento Style */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200 mb-6">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium text-slate-700">Your Friendly AI English Tutor</span>
          </div>
          
          <h1 className="font-heading text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-500 to-amber-500 bg-clip-text text-transparent leading-tight">
            EngMate
          </h1>
          
          <p className="font-body text-2xl text-slate-600 mb-4 max-w-2xl mx-auto">
            Learn English naturally with AI-powered conversations
          </p>
          <p className="font-body text-lg text-slate-500 mb-10">
            Untuk pelajar Indonesia | Designed for Indonesian learners
          </p>
          
          <div className="flex gap-4 justify-center items-center">
            <Button
              onClick={() => navigate('/dashboard')}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-10 py-7 text-lg rounded-2xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Start Learning Free
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              size="lg"
              className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-7 text-lg rounded-2xl"
            >
              See How It Works
            </Button>
          </div>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 hover:border-blue-300 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
              >
                <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-slate-800 mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Stats Section - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="p-8 bg-gradient-to-br from-blue-500 to-blue-600 border-0 rounded-2xl text-white text-center">
            <TrendingUp className="h-10 w-10 mx-auto mb-4 opacity-90" />
            <div className="font-heading text-4xl font-bold mb-2">10,000+</div>
            <div className="font-body text-blue-100">Active Learners</div>
          </Card>
          
          <Card className="p-8 bg-gradient-to-br from-amber-500 to-amber-600 border-0 rounded-2xl text-white text-center">
            <MessageCircle className="h-10 w-10 mx-auto mb-4 opacity-90" />
            <div className="font-heading text-4xl font-bold mb-2">500K+</div>
            <div className="font-body text-amber-100">Conversations</div>
          </Card>
          
          <Card className="p-8 bg-gradient-to-br from-green-500 to-green-600 border-0 rounded-2xl text-white text-center">
            <Sparkles className="h-10 w-10 mx-auto mb-4 opacity-90" />
            <div className="font-heading text-4xl font-bold mb-2">24/7</div>
            <div className="font-body text-green-100">AI Available</div>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 shadow-2xl">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Ready to speak English confidently?
          </h2>
          <p className="font-body text-slate-300 mb-8 text-lg">
            Join thousands of Indonesian learners improving their English every day
          </p>
          <Button
            onClick={() => navigate('/dashboard')}
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-7 text-lg rounded-2xl shadow-lg shadow-amber-500/30"
          >
            Start Your Journey Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;