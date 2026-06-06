import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { EngMateProvider } from "@/context/EngMateContext";
import { Toaster } from "@/components/ui/toaster";

// Pages
import Welcome from "@/pages/Welcome";
import Dashboard from "@/pages/Dashboard";
import LiveConversation from "@/pages/LiveConversation";
import GuidedLesson from "@/pages/GuidedLesson";
import PronunciationCoach from "@/pages/PronunciationCoach";
import Profile from "@/pages/Profile";

function App() {
  return (
    <EngMateProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/live-conversation" element={<LiveConversation />} />
          <Route path="/guided-lesson" element={<GuidedLesson />} />
          <Route path="/pronunciation-coach" element={<PronunciationCoach />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </EngMateProvider>
  );
}

export default App;
