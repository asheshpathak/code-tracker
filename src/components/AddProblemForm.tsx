import React, { useState } from 'react';
import { Save, Loader2, CheckCircle, FileText } from 'lucide-react';
import type { NewProblemForm } from '../types';

interface AddProblemFormProps {
  onSubmit: (data: NewProblemForm) => void;
}

const AddProblemForm: React.FC<AddProblemFormProps> = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<NewProblemForm>({
    title: '',
    platform: '',
    difficulty: '',
    topic: '',
    subtopic: '',
    outcome: '',
    timeSpent: 0,
    link: '',
    tags: '',
    approachNotes: '',
    isRevision: false,
    codeLink: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSubmit(formData);
    
    // Reset form
    setFormData({
      title: '',
      platform: '',
      difficulty: '',
      topic: '',
      subtopic: '',
      outcome: '',
      timeSpent: 0,
      link: '',
      tags: '',
      approachNotes: '',
      isRevision: false,
      codeLink: '',
    });
    
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      isRevision: e.target.checked
    }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-200 px-5 py-4">
        <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <FileText size={20} className="text-gray-600" />
          Log New Problem
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-5">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-xs font-medium text-gray-700 mb-1">
              Problem Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Two Sum"
              required
              className="w-full px-2.5 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="platform" className="block text-xs font-medium text-gray-700 mb-1">
                Platform
              </label>
              <select
                id="platform"
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                required
                className="w-full px-2.5 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select platform</option>
                <option value="leetcode">LeetCode</option>
                <option value="hackerrank">HackerRank</option>
                <option value="codechef">CodeChef</option>
                <option value="codeforces">Codeforces</option>
                <option value="atcoder">AtCoder</option>
              </select>
            </div>
            <div>
              <label htmlFor="difficulty" className="block text-xs font-medium text-gray-700 mb-1">
                Difficulty
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
                className="w-full px-2.5 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="topic" className="block text-xs font-medium text-gray-700 mb-1">
                Topic
              </label>
              <select
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                required
                className="w-full px-2.5 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select topic</option>
                <option value="arrays">Arrays</option>
                <option value="strings">Strings</option>
                <option value="hash-table">Hash Table</option>
                <option value="dynamic-programming">Dynamic Programming</option>
                <option value="tree">Tree</option>
                <option value="graph">Graph</option>
                <option value="binary-search">Binary Search</option>
              </select>
            </div>
            <div>
              <label htmlFor="subtopic" className="block text-xs font-medium text-gray-700 mb-1">
                Sub-topic
              </label>
              <input
                type="text"
                id="subtopic"
                name="subtopic"
                value={formData.subtopic}
                onChange={handleChange}
                placeholder="e.g., Sliding Window"
                className="w-full px-2.5 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="outcome" className="block text-xs font-medium text-gray-700 mb-1">
                Outcome
              </label>
              <select
                id="outcome"
                name="outcome"
                value={formData.outcome}
                onChange={handleChange}
                required
                className="w-full px-2.5 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select outcome</option>
                <option value="solved">Solved on own</option>
                <option value="hints">Needed hints</option>
                <option value="failed">Couldn't solve</option>
              </select>
            </div>
            <div>
              <label htmlFor="timeSpent" className="block text-xs font-medium text-gray-700 mb-1">
                Time Taken (minutes)
              </label>
              <input
                type="number"
                id="timeSpent"
                name="timeSpent"
                value={formData.timeSpent || ''}
                onChange={handleChange}
                placeholder="30"
                min="1"
                className="w-full px-2.5 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="link" className="block text-xs font-medium text-gray-700 mb-1">
              Problem Link
            </label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://leetcode.com/problems/..."
              className="w-full px-2.5 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-xs font-medium text-gray-700 mb-1">
              Tags/Keywords
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="two pointers, binary search, recursion"
              className="w-full px-2.5 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="approachNotes" className="block text-xs font-medium text-gray-700 mb-1">
              Approach Notes
            </label>
            <textarea
              id="approachNotes"
              name="approachNotes"
              value={formData.approachNotes}
              onChange={handleChange}
              placeholder="Describe your approach, edge cases, time/space complexity..."
              rows={3}
              className="w-full px-2.5 py-2 border border-gray-300 rounded text-xs font-mono resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Type
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isRevision"
                  checked={formData.isRevision}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="isRevision" className="text-xs text-gray-700">
                  This is a revision
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="codeLink" className="block text-xs font-medium text-gray-700 mb-1">
                Code/Gist Link
              </label>
              <input
                type="url"
                id="codeLink"
                name="codeLink"
                value={formData.codeLink}
                onChange={handleChange}
                placeholder="GitHub Gist URL (optional)"
                className="w-full px-2.5 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={14} />
                Save Problem
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProblemForm;