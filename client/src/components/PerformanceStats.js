import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PerformanceStats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('https://sla-backend-otk0.onrender.com/api/tickets/stats/performance');
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching performance stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">👷 Employee Performance (SLA)</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Assignee Name</th>
              <th className="px-6 py-3 border-b text-center text-sm font-semibold text-gray-700">Total Tickets</th>
              <th className="px-6 py-3 border-b text-center text-sm font-semibold text-gray-700 text-green-600">Resolved</th>
              <th className="px-6 py-3 border-b text-center text-sm font-semibold text-gray-700 text-red-600">SLA Breached</th>
              <th className="px-6 py-3 border-b text-center text-sm font-semibold text-gray-700">Success Rate (%)</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 border-b text-sm font-medium text-gray-900">{item._id}</td>
                <td className="px-6 py-4 border-b text-center text-sm text-gray-600">{item.totalTickets}</td>
                <td className="px-6 py-4 border-b text-center text-sm font-semibold text-green-500">{item.resolved}</td>
                <td className="px-6 py-4 border-b text-center text-sm font-semibold text-red-500">{item.breached}</td>
                <td className="px-6 py-4 border-b text-center text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    ((item.resolved / item.totalTickets) * 100) > 80 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {Math.round((item.resolved / item.totalTickets) * 100)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerformanceStats;