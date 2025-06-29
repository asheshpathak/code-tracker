import { useEffect, useState } from 'react';
import { FileText, Plus } from 'lucide-react';
import Header from './components/Header';
import AnalyticsGrid from './components/AnalyticsGrid';
import ProblemsTable from './components/ProblemsTable';
import AddProblemForm from './components/AddProblemForm';
import { mockProblems, mockAnalytics } from './utils/mockData';
import type { Problem, NewProblemForm } from './types';
import { apiClient } from './utils/apis';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [problems, setProblems] = useState<Problem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddProblem = (formData: NewProblemForm) => {
    const newProblem: Problem = {
      id: Date.now().toString(),
      title: formData.title,
      platform: formData.platform,
      difficulty: formData.difficulty as 'easy' | 'medium' | 'hard',
      topic: formData.topic,
      subtopic: formData.subtopic,
      timeSpent: formData.timeSpent,
      outcome: formData.outcome as 'solved' | 'hints' | 'failed',
      date: 'Today',
      link: formData.link,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      approachNotes: formData.approachNotes,
      codeLink: formData.codeLink,
      isRevision: formData.isRevision,
    };

    setProblems(prev => [newProblem, ...prev]);
    setShowAddForm(false);
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  const loadProblems = async () => {
    try {
      const fetchedProblems = await apiClient.getProblems() as { data: Problem[] };
      if (fetchedProblems && fetchedProblems.data) {
        setProblems(fetchedProblems.data);
        console.log('Fetched problems:', fetchedProblems);
      }
    } catch (error) {
      console.error('Error fetching problems:', error);
    }
  }

  useEffect(() => {
    loadProblems();
  },[]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-5">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        
        {activeTab === 'dashboard' && (
          <>
            <AnalyticsGrid data={mockAnalytics} />
            
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
              <div className="xl:col-span-3">
                <ProblemsTable 
                  problems={problems} 
                  onAddProblem={handleShowAddForm}
                />
              </div>
              
              <div className="xl:col-span-2">
                {showAddForm ? (
                  <div className="space-y-4">
                    <AddProblemForm onSubmit={handleAddProblem} />
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="w-full px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-md shadow-sm p-8 text-center">
                    <div className="text-gray-400 mb-4">
                      <FileText size={48} className="mx-auto" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Log a New Problem</h3>
                    <p className="text-xs text-gray-600 mb-4">Track your coding progress by adding problems you've solved</p>
                    <button
                      onClick={handleShowAddForm}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                    >
                      <Plus size={14} />
                      Add Problem
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'problems' && (
          <div className="text-center py-12">
            <p className="text-gray-600">Problems page coming soon...</p>
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div className="text-center py-12">
            <p className="text-gray-600">Analytics page coming soon...</p>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="text-center py-12">
            <p className="text-gray-600">Settings page coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;