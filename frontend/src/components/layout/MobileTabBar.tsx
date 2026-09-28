import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Compass,
  Megaphone,
  MessageSquare,
  UserPlus,
  Home,
} from 'lucide-react';

const MOBILE_NAV = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/app', label: 'Hub', icon: LayoutDashboard },
  { path: '/contacts/jane-doe', label: 'Brief', icon: Users },
  { path: '/competitors/apex-cloud', label: 'Timeline', icon: Compass },
  { path: '/campaigns', label: 'Campaigns', icon: Megaphone },
  { path: '/feedback', label: 'Feedback', icon: MessageSquare },
  { path: '/onboard', label: 'Onboard', icon: UserPlus },
];

export const MobileTabBar: React.FC = () => {
  return (
    <nav className="md:hidden fixed bottom-3 inset-x-3 z-40 bg-white/95 backdrop-blur-md rounded-2xl border border-[#E5E7EB] px-2 py-2 flex items-center justify-around shadow-lg">
      {MOBILE_NAV.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-medium transition-all ${
                isActive
                  ? 'text-[#0E7C7B] font-bold bg-[#E8F5F5]'
                  : 'text-[#5B6169] hover:text-[#111318]'
              }`
            }
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
