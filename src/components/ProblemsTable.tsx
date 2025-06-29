import React from 'react';
import type { Problem } from '../types';
import { getDifficultyColor, getOutcomeColor, getStatusDotColor } from '../utils/helpers';
import { ExternalLink, Search, Download, Plus, FileText, Monitor } from 'lucide-react';

interface ProblemsTableProps {
  problems: Problem[];
  onAddProblem: () => void;
}

const ProblemsTable: React.FC<ProblemsTableProps> = ({ problems, onAddProblem }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-200 px-5 py-4 flex justify-between items-center">
        <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <Monitor size={20} className="text-gray-600" />
          Recent Problems
        </h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
            <Search size={14} />
            Filter
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
            <Download size={14} />
            Export
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-3 py-2.5 text-left font-semibold text-gray-700 uppercase tracking-wide text-[11px]">Problem</th>
              <th className="px-3 py-2.5 text-left font-semibold text-gray-700 uppercase tracking-wide text-[11px]">Platform</th>
              <th className="px-3 py-2.5 text-left font-semibold text-gray-700 uppercase tracking-wide text-[11px]">Difficulty</th>
              <th className="px-3 py-2.5 text-left font-semibold text-gray-700 uppercase tracking-wide text-[11px]">Topic</th>
              <th className="px-3 py-2.5 text-left font-semibold text-gray-700 uppercase tracking-wide text-[11px]">Time</th>
              <th className="px-3 py-2.5 text-left font-semibold text-gray-700 uppercase tracking-wide text-[11px]">Outcome</th>
              <th className="px-3 py-2.5 text-left font-semibold text-gray-700 uppercase tracking-wide text-[11px]">Date</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <tr 
                key={problem.id} 
                className={`hover:bg-gray-50 cursor-pointer ${index !== problems.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <td className="px-3 py-3">
                  <div className="max-w-xs">
                    <div className="font-medium text-gray-900 mb-1">
                      {problem.link ? (
                        <a 
                          href={problem.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline inline-flex items-center gap-1"
                        >
                          {problem.title}
                          <ExternalLink size={10} />
                        </a>
                      ) : (
                        problem.title
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {problem.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[9px] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 font-medium text-gray-600">{problem.platform}</td>
                <td className="px-3 py-3">
                  <span className={`px-1.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wide ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="px-3 py-3 text-gray-700">{problem.topic}</td>
                <td className="px-3 py-3 font-mono font-medium text-gray-700">{problem.timeSpent}m</td>
                <td className="px-3 py-3">
                  <div className={`flex items-center gap-1.5 text-xs font-medium ${getOutcomeColor(problem.outcome)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(problem.outcome)}`}></span>
                    {problem.outcome.charAt(0).toUpperCase() + problem.outcome.slice(1)}
                  </div>
                </td>
                <td className="px-3 py-3 text-gray-500 text-[11px]">{problem.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bg-gray-50 border-t border-gray-200 px-5 py-3 flex gap-2">
        <button 
          onClick={onAddProblem}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
        >
          <Plus size={14} />
          Add Problem
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
          <FileText size={14} />
          View All
        </button>
      </div>
    </div>
  );
};

export default ProblemsTable;