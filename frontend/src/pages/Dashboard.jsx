import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, BookOpen, Mic2, TrendingUp, Target, Zap, Sparkles } from 'lucide-react';
import { useEngMate } from '@/context/EngMateContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { userProfile } = useEngMate();

  const modes = [
    {
      id: 'live',
      title: 'Live Conversation',
      description: 'Chat naturally and practice real-world English',
      icon: MessageCircle,
      gradient: 'from-blue-500 to-cyan-500',
      path: '/live-conversation'
    },
    {
      id: 'guided',
      title: 'Guided Lessons',
      description: 'Step-by-step learning tailored to your goals',
      icon: BookOpen,
      gradient: 'from-amber-500 to-orange-500',
      path: '/guided-lesson'
    },
    {
      id: 'pronunciation',
      title: 'Pronunciation Coach',
      description: 'Master English sounds with instant feedback',
      icon: Mic2,
      gradient: 'from-purple-500 to-pink-500',
      path: '/pronunciation-coach'
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl">
        {/* Welcome Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="font-heading text-5xl font-bold text-slate-800">
              Welcome back, {userProfile.name}! 
            </h1>
            <span className="text-4xl">👋</span>
          </div>
          <p className="font-body text-lg text-slate-600">
            Ready to level up your English today? Choose your learning mode below
          </p>
        </div>

        {/* Stats Cards - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-cyan-500 border-0 rounded-2xl text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-sm text-blue-100 mb-1">Current Level</p>
                <p className="font-heading text-4xl font-bold">{userProfile.level}</p>
              </div>
              <div className="h-14 w-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <TrendingUp className="h-7 w-7" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-sm text-slate-500 mb-1">Learning Goal</p>
                <p className="font-heading text-xl font-semibold text-slate-800">{userProfile.goal}</p>
              </div>
              <div className="h-14 w-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Target className="h-7 w-7 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-sm text-slate-500 mb-1">Language</p>
                <p className="font-heading text-xl font-semibold text-slate-800">
                  {userProfile.explanation_language === 'id' ? '🇮🇩 Indonesia' : '🇬🇧 English'}
                </p>
              </div>
              <div className="h-14 w-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Zap className="h-7 w-7 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Tip Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-amber-50 border-2 border-blue-200 rounded-2xl p-6 mb-10">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold text-slate-800 mb-1">
                💡 Pro Tip for Today
              </h3>
              <p className="font-body text-sm text-slate-600 leading-relaxed">
                Practice makes perfect! Try to complete at least one conversation session daily for the best results. 
                Your consistency is the key to fluency.
              </p>
            </div>
          </div>
        </div>

        {/* Mode Cards - Enhanced Bento Grid */}
        <div className="mb-6">
          <h2 className="font-heading text-2xl font-bold text-slate-800 mb-6">
            Choose Your Learning Mode
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modes.map((mode) => {
              const Icon = mode.icon;
              return (
                <Card
                  key={mode.id}
                  className="group p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 hover:border-blue-300 rounded-2xl transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl"
                  onClick={() => navigate(mode.path)}
                >
                  <CardHeader className="p-0 mb-6">
                    <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${mode.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="font-heading text-2xl font-bold text-slate-800 mb-3">
                      {mode.title}
                    </CardTitle>
                    <CardDescription className="font-body text-sm text-slate-600 leading-relaxed">
                      {mode.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Button
                      className={`w-full bg-gradient-to-r ${mode.gradient} hover:shadow-lg text-white font-medium py-6 rounded-xl transition-all duration-200`}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(mode.path);
                      }}
                    >
                      Start Session →
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;