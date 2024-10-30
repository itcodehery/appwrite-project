import React, { useState } from 'react';
import { Layout, Users, Settings, BarChart } from 'lucide-react';
import './AdminLayout.css'; // Import the CSS file
import Gyminfo from '../components/ts/admininfo';
import Gymmebership from '../components/ts/gymmembership';
import TRAINER from '../components/ts/gymtrianer';
import { account } from '../helpers/appwrite.ts'; // Import account from Appwrite
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

// Example content components
const Dashboard = () => <div className="content"><Gyminfo /></div>;
const UsersComponent = () => <div className="content"><Gymmebership /></div>;
const Analytics = () => <div className="content"><TRAINER /></div>;
const SettingsComponent = () => <div className="content"><h2 className="title">Settings</h2><p className="text">System settings</p></div>;

const AdminLayout = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const navigate = useNavigate(); // Initialize navigate

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Layout, component: Dashboard },
    { id: 'users', label: 'Membership', icon: Users, component: UsersComponent },
    { id: 'analytics', label: 'Analytics', icon: BarChart, component: Analytics },
    { id: 'settings', label: 'Settings', icon: Settings, component: SettingsComponent }
  ];

  const ActiveComponent = navigation.find(nav => nav.id === activeComponent)?.component || Dashboard;

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      const session = Cookies.get('session');
      if (session) {
        await account.deleteSession(session); // Delete the session from Appwrite
      }
      Cookies.remove('session'); // Remove session cookie
      Cookies.remove('userId'); // Remove userId cookie
      navigate('/', { replace: true }); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">Admin Panel</h1>
        </div>
        <nav className="sidebar-nav">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveComponent(item.id)}
                className={`nav-button ${activeComponent === item.id ? 'active' : ''}`}
              >
                <Icon className="icon" />
                {item.label}
              </button>
            );
          })}
        </nav>
        <button onClick={handleLogout} className="logout-button">Log Out</button> {/* Logout button */}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default AdminLayout;
