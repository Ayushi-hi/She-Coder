import React, { useState, useEffect } from 'react';
import { Code, Sparkles, Rocket, BookOpen, Users, Award, Menu, X, ChevronRight, CheckCircle, Circle, Lock, Flame, Calendar, Upload, Play, Trophy, Star, TrendingUp, Target, Zap } from 'lucide-react';
import { authAPI, progressAPI, userAPI } from './services/api';
// Test commit
export default function SheCoderWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [streak, setStreak] = useState(7);
  const [completedLessons, setCompletedLessons] = useState({});
  const [lastActivity, setLastActivity] = useState(new Date().toDateString());
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const learningPaths = {
    year1: {
      title: "Year 1: Foundation",
      subtitle: "Master the basics of web development",
      color: "purple",
      courses: [
        {
          id: 'html',
          name: 'HTML Basics',
          icon: '📄',
          duration: '4 weeks',
          description: 'Learn the building blocks of web pages',
          lessons: [
            { id: 1, title: 'Introduction to HTML', duration: '30 min', type: 'video' },
            { id: 2, title: 'HTML Elements & Tags', duration: '45 min', type: 'interactive' },
            { id: 3, title: 'Forms and Input', duration: '40 min', type: 'practice' },
            { id: 4, title: 'Semantic HTML', duration: '35 min', type: 'video' },
            { id: 5, title: 'HTML Best Practices', duration: '30 min', type: 'quiz' }
          ],
          project: {
            title: 'Build a Personal Portfolio Page',
            description: 'Create a beautiful portfolio showcasing your skills',
            duration: '2-3 hours'
          }
        },
        {
          id: 'css',
          name: 'CSS Styling',
          icon: '🎨',
          duration: '5 weeks',
          description: 'Make your websites beautiful and responsive',
          lessons: [
            { id: 1, title: 'CSS Basics & Selectors', duration: '40 min', type: 'video' },
            { id: 2, title: 'Box Model & Layout', duration: '50 min', type: 'interactive' },
            { id: 3, title: 'Flexbox', duration: '45 min', type: 'practice' },
            { id: 4, title: 'CSS Grid', duration: '45 min', type: 'practice' },
            { id: 5, title: 'Responsive Design', duration: '50 min', type: 'interactive' },
            { id: 6, title: 'Animations & Transitions', duration: '40 min', type: 'video' }
          ],
          project: {
            title: 'Create a Responsive Landing Page',
            description: 'Design a modern landing page that works on all devices',
            duration: '3-4 hours'
          }
        },
        {
          id: 'javascript',
          name: 'JavaScript Fundamentals',
          icon: '⚡',
          duration: '8 weeks',
          description: 'Add interactivity and logic to your websites',
          lessons: [
            { id: 1, title: 'Variables & Data Types', duration: '45 min', type: 'video' },
            { id: 2, title: 'Functions & Scope', duration: '50 min', type: 'interactive' },
            { id: 3, title: 'Arrays & Objects', duration: '55 min', type: 'practice' },
            { id: 4, title: 'Loops & Conditionals', duration: '45 min', type: 'quiz' },
            { id: 5, title: 'DOM Manipulation', duration: '60 min', type: 'interactive' },
            { id: 6, title: 'Events & Event Handling', duration: '50 min', type: 'practice' },
            { id: 7, title: 'Async JavaScript', duration: '60 min', type: 'video' },
            { id: 8, title: 'ES6+ Features', duration: '55 min', type: 'interactive' }
          ],
          project: {
            title: 'Build an Interactive To-Do App',
            description: 'Create a fully functional task management application',
            duration: '4-5 hours'
          }
        }
      ]
    },
    year2: {
      title: "Year 2: Advanced Development",
      subtitle: "Build real-world applications",
      color: "pink",
      courses: [
        {
          id: 'react',
          name: 'React.js',
          icon: '⚛️',
          duration: '8 weeks',
          description: 'Master modern frontend development with React',
          lessons: [
            { id: 1, title: 'React Basics & JSX', duration: '45 min', type: 'video' },
            { id: 2, title: 'Components & Props', duration: '50 min', type: 'interactive' },
            { id: 3, title: 'State & useState Hook', duration: '55 min', type: 'practice' },
            { id: 4, title: 'useEffect & Lifecycle', duration: '60 min', type: 'video' },
            { id: 5, title: 'React Router', duration: '50 min', type: 'interactive' },
            { id: 6, title: 'Context API', duration: '55 min', type: 'practice' },
            { id: 7, title: 'Custom Hooks', duration: '50 min', type: 'video' },
            { id: 8, title: 'React Best Practices', duration: '45 min', type: 'quiz' }
          ],
          project: {
            title: 'Build a Social Media Dashboard',
            description: 'Create an analytics dashboard with charts and real-time data',
            duration: '5-6 hours'
          }
        },
        {
          id: 'nodejs',
          name: 'Node.js & Express',
          icon: '🟢',
          duration: '7 weeks',
          description: 'Build powerful backend servers and APIs',
          lessons: [
            { id: 1, title: 'Node.js Introduction', duration: '40 min', type: 'video' },
            { id: 2, title: 'Express Framework', duration: '50 min', type: 'interactive' },
            { id: 3, title: 'RESTful APIs', duration: '60 min', type: 'practice' },
            { id: 4, title: 'Middleware', duration: '45 min', type: 'video' },
            { id: 5, title: 'Authentication & Security', duration: '65 min', type: 'interactive' },
            { id: 6, title: 'Database Integration', duration: '60 min', type: 'practice' },
            { id: 7, title: 'Deployment', duration: '50 min', type: 'video' }
          ],
          project: {
            title: 'Create a Blog API with Authentication',
            description: 'Build a complete REST API with user authentication',
            duration: '6-7 hours'
          }
        },
        {
          id: 'database',
          name: 'Databases',
          icon: '🗄️',
          duration: '6 weeks',
          description: 'Store and manage data effectively',
          lessons: [
            { id: 1, title: 'Database Fundamentals', duration: '45 min', type: 'video' },
            { id: 2, title: 'SQL Basics', duration: '50 min', type: 'interactive' },
            { id: 3, title: 'MongoDB & NoSQL', duration: '55 min', type: 'practice' },
            { id: 4, title: 'Database Design', duration: '50 min', type: 'video' },
            { id: 5, title: 'CRUD Operations', duration: '55 min', type: 'interactive' },
            { id: 6, title: 'Database Optimization', duration: '50 min', type: 'quiz' }
          ],
          project: {
            title: 'Design an E-commerce Database',
            description: 'Create a complete database schema for an online store',
            duration: '4-5 hours'
          }
        }
      ]
    }
  };

  // Load user data on mount
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    loadUserData();
  }
}, []);

// Load user data from backend
const loadUserData = async () => {
  try {
    const [userResponse, streakResponse, progressResponse] = await Promise.all([
      authAPI.getMe(),
      userAPI.getStreak(),
      progressAPI.getAllProgress()
    ]);

    setUser(userResponse.data.data);
    setStreak(streakResponse.data.data.streak);
    setLastActivity(new Date(streakResponse.data.data.lastActivity).toDateString());
    setIsAuthenticated(true);

    // Load completed lessons
    const lessonsMap = {};
    progressResponse.data.data.forEach(progress => {
      progress.completedLessons.forEach(lesson => {
        lessonsMap[`${progress.courseId}-${lesson.lessonId}`] = true;
      });
    });
    setCompletedLessons(lessonsMap);
  } catch (error) {
    console.error('Error loading user data:', error);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  }
};

// Handle login/register
const handleAuth = async (formData) => {
  try {
    let response;
    if (authMode === 'login') {
      response = await authAPI.login(formData);
    } else {
      response = await authAPI.register(formData);
    }

    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    setStreak(response.data.user.streak);
    setIsAuthenticated(true);
    setShowAuthModal(false);
    await loadUserData();
  } catch (error) {
    alert(error.response?.data?.message || 'Authentication failed');
  }
};

// Handle logout
const handleLogout = async () => {
  try {
    await authAPI.logout();
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setStreak(0);
    setCompletedLessons({});
    setCurrentView('home');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

 const toggleLesson = async (courseId, lessonId) => {
  if (!isAuthenticated) {
    alert('Please login to track your progress');
    setShowAuthModal(true);
    return;
  }

  const key = `${courseId}-${lessonId}`;
  const isAlreadyCompleted = completedLessons[key];

  if (!isAlreadyCompleted) {
    try {
      const response = await progressAPI.completeLesson(courseId, lessonId);
      setCompletedLessons(prev => ({
        ...prev,
        [key]: true
      }));
      setStreak(response.data.streak);
      setLastActivity(new Date().toDateString());
    } catch (error) {
      console.error('Error completing lesson:', error);
      alert('Failed to save progress');
    }
  }
};
  const getCourseProgress = (course) => {
    const completed = course.lessons.filter(lesson => 
      completedLessons[`${course.id}-${lesson.id}`]
    ).length;
    return Math.round((completed / course.lessons.length) * 100);
  };

  const isCourseLocked = (yearPath, courseIndex) => {
    if (courseIndex === 0) return false;
    const prevCourse = yearPath.courses[courseIndex - 1];
    return getCourseProgress(prevCourse) < 100;
  };

  const getLessonTypeColor = (type) => {
    const colors = {
      video: 'bg-blue-100 text-blue-700',
      interactive: 'bg-purple-100 text-purple-700',
      practice: 'bg-green-100 text-green-700',
      quiz: 'bg-orange-100 text-orange-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  // Home View
  // Auth Modal Component
const AuthModal = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-3xl p-8 max-w-md w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">{authMode === 'login' ? 'Login' : 'Register'}</h2>
        <button onClick={() => setShowAuthModal(false)} className="text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = {
          email: e.target.email.value,
          password: e.target.password.value
        };
        if (authMode === 'register') {
          formData.name = e.target.name.value;
        }
        handleAuth(formData);
      }}>
        {authMode === 'register' && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full p-4 border-2 border-gray-200 rounded-xl mb-4 focus:border-purple-500 outline-none"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-4 border-2 border-gray-200 rounded-xl mb-4 focus:border-purple-500 outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          minLength="6"
          className="w-full p-4 border-2 border-gray-200 rounded-xl mb-6 focus:border-purple-500 outline-none"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition"
        >
          {authMode === 'login' ? 'Login' : 'Create Account'}
        </button>
      </form>
      <p className="text-center mt-6 text-gray-600">
        {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
          className="text-purple-600 font-bold hover:underline"
        >
          {authMode === 'login' ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  </div>
);
  const HomeView = () => (
    <>
      {/* Hero Section */}
      <section id="home" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-block mb-6 animate-bounce">
            <Sparkles className="w-16 h-16 text-purple-600" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Empower Your <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Coding Journey
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of girls learning to code. Build your streak, complete structured courses, 
            and create amazing projects with our interactive platform!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl transition transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 h-5 group-hover:translate-x-1 transition" />
              Start Learning Free
            </button>
            <button className="bg-white text-purple-600 px-10 py-4 rounded-full text-lg font-bold border-2 border-purple-600 hover:bg-purple-50 transition transform hover:scale-105">
              Explore Curriculum
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600">10,000+</p>
              <p className="text-gray-600 mt-2">Active Learners</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-pink-600">50+</p>
              <p className="text-gray-600 mt-2">Courses</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">500+</p>
              <p className="text-gray-600 mt-2">Mentors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose She-Coder?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to become a confident developer
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Flame className="w-10 h-10" />, title: 'Daily Streak', desc: 'Build coding habits like Snapchat streaks', color: 'orange' },
              { icon: <Target className="w-10 h-10" />, title: 'Structured Path', desc: 'Follow a clear roadmap from basics to advanced', color: 'purple' },
              { icon: <Trophy className="w-10 h-10" />, title: 'Real Projects', desc: 'Submit projects and earn certificates', color: 'yellow' },
              { icon: <Users className="w-10 h-10" />, title: 'Community', desc: 'Connect with mentors and fellow coders', color: 'pink' }
            ].map((feature, i) => (
              <div key={i} className="group text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300 hover:shadow-xl">
                <div className={`inline-block p-5 bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                  <div className={`text-${feature.color}-600`}>{feature.icon}</div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Tracks Preview */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Learning Journey</h2>
            <p className="text-xl text-gray-600">Two years of comprehensive training</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(learningPaths).map(([key, path]) => (
              <div 
                key={key}
                onClick={() => setCurrentView('dashboard')}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              >
                <div className={`p-10 text-white bg-gradient-to-br ${key === 'year1' ? 'from-purple-500 to-purple-700' : 'from-pink-500 to-pink-700'}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-white bg-opacity-20 rounded-full p-3">
                      {key === 'year1' ? <BookOpen className="w-8 h-8" /> : <Rocket className="w-8 h-8" />}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold">{path.title}</h3>
                      <p className="text-purple-100">{path.subtitle}</p>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="space-y-4">
                    {path.courses.map((course, idx) => (
                      <div key={course.id} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                        <span className="text-3xl">{course.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg">{course.name}</h4>
                          <p className="text-sm text-gray-600">{course.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentView('dashboard');
                    }}
                    className={`w-full mt-8 py-4 rounded-xl font-bold text-white text-lg ${
                      key === 'year1' ? 'bg-gradient-to-r from-purple-600 to-purple-700' : 'bg-gradient-to-r from-pink-600 to-pink-700'
                    } hover:shadow-xl transition`}
                  >
                    Start {path.title} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="bg-gradient-to-r from-purple-600 to-pink-600 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="w-20 h-20 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Community</h2>
          <p className="text-2xl text-purple-100 mb-12 max-w-3xl mx-auto">
            Connect with thousands of girl coders worldwide. Share projects, get help, and grow together.
          </p>
          <button className="bg-white text-purple-600 px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl transition transform hover:scale-105">
            Join Community →
          </button>
        </div>
      </section>
    </>
  );

  // Dashboard View
  const DashboardView = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Streak Banner */}
      <div className="relative bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 rounded-3xl p-10 mb-12 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6">
              <Flame className="w-16 h-16" />
            </div>
            <div>
              <h2 className="text-5xl font-bold mb-2">{streak} Day Streak! 🔥</h2>
              <p className="text-xl text-orange-100">Amazing! Keep coding every day to maintain your streak.</p>
            </div>
          </div>
          <div className="text-center md:text-right bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6">
            <p className="text-sm text-orange-100 mb-1">Last activity</p>
            <p className="text-2xl font-bold">{lastActivity}</p>
          </div>
        </div>
      </div>

      {/* Learning Paths */}
      <h2 className="text-4xl font-bold mb-8">Choose Your Learning Path</h2>
      
      <div className="grid md:grid-cols-2 gap-10">
        {Object.entries(learningPaths).map(([key, path]) => (
          <div 
            key={key}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300"
          >
            <div className={`p-10 text-white bg-gradient-to-br ${key === 'year1' ? 'from-purple-500 via-purple-600 to-purple-700' : 'from-pink-500 via-pink-600 to-pink-700'}`}>
              <div className="flex items-center gap-4 mb-2">
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  {key === 'year1' ? <BookOpen className="w-8 h-8" /> : <Rocket className="w-8 h-8" />}
                </div>
                <h3 className="text-4xl font-bold">{path.title}</h3>
              </div>
              <p className="text-xl text-purple-100">{path.subtitle}</p>
            </div>
            
            <div className="p-8">
              <div className="space-y-5">
                {path.courses.map((course, idx) => {
                  const progress = getCourseProgress(course);
                  const locked = isCourseLocked(path, idx);
                  
                  return (
                    <div 
                      key={course.id}
                      className={`border-2 rounded-2xl p-6 transition-all ${
                        locked 
                          ? 'opacity-50 cursor-not-allowed border-gray-200' 
                          : 'hover:border-purple-400 hover:shadow-lg cursor-pointer border-gray-200'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!locked) {
                          setSelectedCourse(course);
                          setCurrentView('course');
                        }
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <span className="text-4xl">{course.icon}</span>
                          <div>
                            <h4 className="font-bold text-xl flex items-center gap-2">
                              {course.name}
                              {locked && <Lock className="w-5 h-5 text-gray-400" />}
                            </h4>
                            <p className="text-sm text-gray-600">{course.duration} • {course.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-purple-600">{progress}%</p>
                          <p className="text-xs text-gray-500">Complete</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Course View
  const CourseView = () => {
    if (!selectedCourse) return null;
    
    const progress = getCourseProgress(selectedCourse);
    const allCompleted = progress === 100;
    const completedCount = selectedCourse.lessons.filter(l => completedLessons[`${selectedCourse.id}-${l.id}`]).length;

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button 
          onClick={() => setCurrentView('dashboard')}
          className="mb-8 flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold text-lg transition"
        >
          ← Back to Dashboard
        </button>

        {/* Course Header */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-10 mb-10 text-white">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="flex items-start gap-6">
              <span className="text-7xl">{selectedCourse.icon}</span>
              <div>
                <h1 className="text-5xl font-bold mb-3">{selectedCourse.name}</h1>
                <p className="text-xl text-purple-100 mb-4">{selectedCourse.description}</p>
                <div className="flex items-center gap-6 text-lg">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    {selectedCourse.duration}
                  </span>
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    {selectedCourse.lessons.length} Lessons
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 text-center min-w-[160px]">
              <p className="text-sm text-purple-100 mb-2">Your Progress</p>
              <p className="text-5xl font-bold mb-1">{progress}%</p>
              <p className="text-sm text-purple-100">{completedCount}/{selectedCourse.lessons.length} completed</p>
            </div>
          </div>

          <div className="w-full bg-white bg-opacity-20 rounded-full h-4 mt-8">
            <div 
              className="bg-white h-4 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Lessons */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Play className="w-8 h-8 text-purple-600" />
            Course Lessons
          </h2>
          <div className="space-y-4">
            {selectedCourse.lessons.map((lesson, idx) => {
              const isCompleted = completedLessons[`${selectedCourse.id}-${lesson.id}`];
              
              return (
                <div 
                  key={lesson.id}
                  className={`group border-2 rounded-2xl p-6 transition-all cursor-pointer ${
                    isCompleted 
                      ? 'border-green-400 bg-green-50 hover:bg-green-100' 
                      : 'border-gray-200 hover:border-purple-400 hover:shadow-lg'
                  }`}
                  onClick={() => toggleLesson(selectedCourse.id, lesson.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5 flex-1">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200 group-hover:bg-purple-100'
                      }`}>
                        {isCompleted ? 
                          <CheckCircle className="w-7 h-7 text-white" /> : 
                          <span className="text-lg font-bold text-gray-600">{idx + 1}</span>
                        }
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-xl">{lesson.title}</h3>
                          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getLessonTypeColor(lesson.type)}`}>
                            {lesson.type}
                          </span>
                        </div>
                        <p className="text-gray-600">{lesson.duration}</p>
                      </div>
                    </div>
                    <button className={`px-6 py-3 rounded-xl font-bold transition flex items-center gap-2 ${
                      isCompleted 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}>
                      {isCompleted ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" />
                          Start Lesson
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final Project */}
        <div className={`border-4 rounded-3xl p-10 transition-all ${
          allCompleted 
            ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-2xl' 
            : 'border-gray-300 bg-gray-50 opacity-60'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-4 rounded-2xl ${allCompleted ? 'bg-purple-500' : 'bg-gray-400'}`}>
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-3xl font-bold">Final Project</h3>
                    {!allCompleted && <Lock className="w-7 h-7 text-gray-400" />}
                  </div>
                  <p className="text-xl font-semibold text-purple-600">{selectedCourse.project.title}</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg mb-3">{selectedCourse.project.description}</p>
              <p className="text-gray-600 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Estimated time: {selectedCourse.project.duration}
              </p>
              <p className="text-gray-600 mt-4 text-lg">
                {allCompleted ? 
                  '🎉 Congratulations! Complete this project to earn your certificate!' : 
                  '🔒 Complete all lessons above to unlock the final project'
                }
              </p>
            </div>
            <button 
              disabled={!allCompleted}
              className={`px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all ${
                allCompleted ? 
                'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-2xl hover:scale-105' : 
                'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Upload className="w-6 h-6" />
              Submit Project
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
    {showAuthModal && <AuthModal />}
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => setCurrentView('home')}
            >
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-xl group-hover:scale-110 transition">
                <Code className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                She-Coder
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setCurrentView('home')} 
                className="text-gray-700 hover:text-purple-600 transition font-semibold text-lg"
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentView('dashboard')} 
                className="text-gray-700 hover:text-purple-600 transition font-semibold text-lg"
              >
                My Courses
              </button>
              <button className="text-gray-700 hover:text-purple-600 transition font-semibold text-lg">
                Community
              </button>
            </div>

           <div className="hidden md:flex items-center gap-4">
  {isAuthenticated ? (
    <>
      <div className="flex items-center gap-3 bg-gradient-to-r from-orange-400 to-pink-500 px-5 py-3 rounded-full shadow-lg">
        <Flame className="w-6 h-6 text-white" />
        <span className="font-bold text-white text-lg">{streak} Day Streak</span>
      </div>
     <button 
  onClick={() => {
    if (isAuthenticated) {
      setCurrentView('dashboard');
    } else {
      setShowAuthModal(true);
    }
  }}
  className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl transition transform hover:scale-105 flex items-center justify-center gap-2"
>
        Dashboard
      </button>
      <button 
        onClick={handleLogout}
        className="text-gray-600 hover:text-purple-600 font-semibold"
      >
        Logout
      </button>
    </>
  ) : (
    <button 
      onClick={() => setShowAuthModal(true)}
      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full hover:shadow-xl transition transform hover:scale-105 font-bold"
    >
      Login / Register
    </button>
  )}
</div>

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
              {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden pb-6 pt-2">
              <div className="flex items-center gap-3 bg-gradient-to-r from-orange-400 to-pink-500 px-4 py-3 rounded-xl shadow-lg mb-4">
                <Flame className="w-5 h-5 text-white" />
                <span className="font-bold text-white">{streak} Day Streak</span>
              </div>
              <button onClick={() => { setCurrentView('home'); setMenuOpen(false); }} className="block py-3 text-gray-700 font-semibold">Home</button>
              <button onClick={() => { setCurrentView('dashboard'); setMenuOpen(false); }} className="block py-3 text-gray-700 font-semibold">My Courses</button>
              <button className="block py-3 text-gray-700 font-semibold">Community</button>
            </div>
          )}
        </div>
      </nav>

      {/* Content */}
      {currentView === 'home' && <HomeView />}
      {currentView === 'dashboard' && <DashboardView />}
      {currentView === 'course' && <CourseView />}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">She-Coder</span>
              </div>
              <p className="text-gray-400 leading-relaxed">Empowering girls to code and create the future of technology.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Learn</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition">Frontend</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Backend</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Full Stack</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Community</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition">Forum</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Mentorship</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Events</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Connect</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition">About Us</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Contact</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Blog</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-lg">© 2026 She-Coder. Empowering girls through code. 💜</p>
          </div>
        </div>
      </footer>
    </div>
  );
}