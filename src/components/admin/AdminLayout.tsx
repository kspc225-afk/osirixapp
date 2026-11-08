import React, { useState } from 'react';
import { useStore } from '../../services/store';
import { AdminDashboard } from './AdminDashboard';
import { PatientsManagement } from './PatientsManagement';
import { PatientAssignment } from './PatientAssignment';
import { AppointmentsManagement } from './AppointmentsManagement';
import { DoctorsManagement } from './DoctorsManagement';
import { SpecialtiesManagement } from './SpecialtiesManagement';
import { ExamResultsManagement } from './ExamResultsManagement';
import { StaffManagement } from './StaffManagement';
import { AdminConsultationsList } from './AdminConsultationsList';
import { AdminStats } from './AdminStats';
import { AdminSettings } from './AdminSettings';
import { AuditLogsView } from './AuditLogsView';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Stethoscope,
  Layers,
  FileText,
  Microscope,
  Shield,
  TrendingUp,
  Settings,
  History,
  Menu,
  X,
  UserCheck,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { currentUser, appointments, exams } = useStore();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pendingAppointmentsCount = appointments.filter((a) => a.status === 'en_attente').length;
  const pendingExamsCount = exams.filter(
    (e) => e.status === 'disponible' || e.status === 'en_validation'
  ).length;

  // The 10 lateral navigation items specified in Section 4
  const navItems = [
    {
      id: 'dashboard',
      label: 'Tableau de bord',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'appointments',
      label: 'Rendez-vous',
      icon: Calendar,
      badge: pendingAppointmentsCount > 0 ? `${pendingAppointmentsCount}` : null,
    },
    {
      id: 'patients',
      label: 'Patients',
      icon: Users,
      badge: null,
    },
    {
      id: 'assignment',
      label: 'Attribution patients',
      icon: UserCheck,
      badge: null,
    },
    {
      id: 'doctors',
      label: 'Médecins',
      icon: Stethoscope,
      badge: null,
    },
    {
      id: 'specialties',
      label: 'Spécialités',
      icon: Layers,
      badge: null,
    },
    {
      id: 'consultations',
      label: 'Consultations',
      icon: FileText,
      badge: null,
    },
    {
      id: 'exams',
      label: 'Résultats médicaux',
      icon: Microscope,
      badge: pendingExamsCount > 0 ? `${pendingExamsCount}` : null,
    },
    {
      id: 'staff',
      label: 'Personnel',
      icon: Shield,
      badge: null,
    },
    {
      id: 'stats',
      label: 'Statistiques',
      icon: TrendingUp,
      badge: null,
    },
    {
      id: 'settings',
      label: 'Paramètres',
      icon: Settings,
      badge: null,
    },
    {
      id: 'audit',
      label: 'Journal d’activités',
      icon: History,
      badge: null,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard onNavigate={(tab) => setActiveTab(tab)} />;
      case 'appointments':
        return <AppointmentsManagement />;
      case 'patients':
        return <PatientsManagement />;
      case 'assignment':
        return <PatientAssignment />;
      case 'doctors':
        return <DoctorsManagement />;
      case 'specialties':
        return <SpecialtiesManagement />;
      case 'consultations':
        return <AdminConsultationsList />;
      case 'exams':
        return <ExamResultsManagement />;
      case 'staff':
        return <StaffManagement />;
      case 'stats':
        return <AdminStats />;
      case 'settings':
        return <AdminSettings />;
      case 'audit':
        return <AuditLogsView />;
      default:
        return <AdminDashboard onNavigate={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] bg-[#F3F5F4]">
      {/* Mobile Top Header for Sidebar Toggle */}
      <div className="lg:hidden p-4 bg-[#073D38] text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-200">
            {navItems.find((n) => n.id === activeTab)?.label}
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 cursor-pointer"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Lateral Sidebar Styled in Vert Profond #073D38 */}
      <aside
        className={`w-full lg:w-64 bg-[#073D38] text-white shrink-0 p-4 space-y-6 flex flex-col justify-between ${
          isSidebarOpen ? 'block' : 'hidden lg:block'
        }`}
      >
        <div className="space-y-6">
          {/* Clinic Section Badge */}
          <div className="px-3 py-2.5 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300">
                Administration SaaS
              </span>
              <div className="font-extrabold text-xs text-white">
                {currentUser.role === 'admin' ? 'Direction Générale' : 'Secrétariat Médical'}
              </div>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5A900] shadow-xs" />
          </div>

          {/* Navigation list */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#00796F] text-white shadow-md'
                      : 'text-teal-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-teal-300'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                        isActive ? 'bg-[#F5A900] text-[#101513]' : 'bg-[#F5A900] text-[#101513]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Info */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-teal-200/80 space-y-1">
          <div className="font-extrabold text-white text-xs">OSIRIX Clinique Médicale</div>
          <p>Abidjan</p>
          <div className="pt-2 border-t border-white/10 text-[10px] text-teal-300/60 font-mono">
            Session : {currentUser.name}
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
        {renderContent()}
      </main>
    </div>
  );
};
