import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEngMate } from '@/context/EngMateContext';
import { User, Target, Languages, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { userProfile, updateUserProfile } = useEngMate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile.name,
    level: userProfile.level,
    goal: userProfile.goal,
    explanation_language: userProfile.explanation_language
  });

  const handleSave = async () => {
    try {
      await updateUserProfile(formData);
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your settings have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const goalOptions = [
    'Job interview',
    'Business meetings',
    'Travel',
    'Daily conversation',
    'Academic study',
    'IELTS/TOEFL prep'
  ];

  return (
    <Layout>
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Profile & Progress</h1>
          <p className="text-slate-600">Manage your learning settings and track your progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Settings */}
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <User className="h-5 w-5 text-blue-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-slate-700">Name</Label>
                <Input
                  id="name"
                  value={isEditing ? formData.name : userProfile.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  className="bg-slate-50 border-slate-300 text-slate-900"
                />
              </div>

              <div>
                <Label htmlFor="level" className="text-slate-700">Current Level</Label>
                <Select
                  value={isEditing ? formData.level : userProfile.level}
                  onValueChange={(value) => setFormData({ ...formData, level: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="bg-slate-50 border-slate-300 text-slate-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="goal" className="text-slate-700">Learning Goal</Label>
                <Select
                  value={isEditing ? formData.goal : userProfile.goal}
                  onValueChange={(value) => setFormData({ ...formData, goal: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="bg-slate-50 border-slate-300 text-slate-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {goalOptions.map((goal) => (
                      <SelectItem key={goal} value={goal}>{goal}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                {isEditing ? (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Save Changes
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: userProfile.name,
                          level: userProfile.level,
                          goal: userProfile.goal,
                          explanation_language: userProfile.explanation_language
                        });
                      }}
                      variant="outline"
                      className="flex-1 border-slate-300 text-slate-700"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => setIsEditing(true)} className="w-full bg-blue-600 hover:bg-blue-700">
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Language Settings */}
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Languages className="h-5 w-5 text-blue-600" />
                Language Settings
              </CardTitle>
              <CardDescription className="text-slate-600">
                Choose your preferred language for explanations and feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label className="text-slate-700 mb-3 block">Explanation Language</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      updateUserProfile({ explanation_language: 'id' });
                      toast({
                        title: "Language updated",
                        description: "Explanations will now be in Bahasa Indonesia",
                      });
                    }}
                    className={`p-4 rounded-lg border transition-all ${
                      userProfile.explanation_language === 'id'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'bg-slate-50 border-slate-300 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div className="text-2xl mb-2">🇮🇩</div>
                    <div className="font-semibold">Bahasa Indonesia</div>
                  </button>
                  <button
                    onClick={() => {
                      updateUserProfile({ explanation_language: 'en' });
                      toast({
                        title: "Language updated",
                        description: "Explanations will now be in English",
                      });
                    }}
                    className={`p-4 rounded-lg border transition-all ${
                      userProfile.explanation_language === 'en'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'bg-slate-50 border-slate-300 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div className="text-2xl mb-2">🇬🇧</div>
                    <div className="font-semibold">English</div>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Stats */}
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Award className="h-5 w-5 text-blue-600" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-700">Sessions completed</span>
                  <span className="text-2xl font-bold text-blue-600">12</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-700">Words practiced</span>
                  <span className="text-2xl font-bold text-blue-600">48</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-700">Lessons completed</span>
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Goal */}
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Target className="h-5 w-5 text-blue-600" />
                Current Focus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                  <div className="text-sm text-slate-600 mb-1">Active Goal</div>
                  <div className="text-xl font-semibold text-slate-800">{userProfile.goal}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-sm text-slate-600 mb-1">Current Level</div>
                  <div className="text-xl font-semibold text-blue-600">{userProfile.level}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;