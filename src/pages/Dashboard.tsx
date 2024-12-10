import React from 'react';
import { Package, DollarSign, ShoppingCart, Users } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex space-x-3">
          <select className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Products"
          value="1,234"
          icon={Package}
          trend={{ value: 12, isPositive: true }}
        />
        <DashboardCard
          title="Total Revenue"
          value="$45,678"
          icon={DollarSign}
          trend={{ value: 8.2, isPositive: true }}
        />
        <DashboardCard
          title="Total Sales"
          value="567"
          icon={ShoppingCart}
          trend={{ value: 5.1, isPositive: true }}
        />
        <DashboardCard
          title="Total Customers"
          value="890"
          icon={Users}
          trend={{ value: 2.3, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Low Stock Alert</h2>
          <div className="space-y-4">
            {/* We'll implement this later with real data */}
            <p className="text-gray-500">No low stock items</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Sales</h2>
          <div className="space-y-4">
            {/* We'll implement this later with real data */}
            <p className="text-gray-500">No recent sales</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;