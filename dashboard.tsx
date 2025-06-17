import React, { useState } from 'react';
import { User, CreditCard, FileText, Settings, Bell, Shield, HelpCircle, LogOut, ChevronDown, Plus, Eye, Download, Calendar, Activity } from 'lucide-react';

const BitnovaDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Mock data
  const user = {
    name: 'Kovács János',
    email: 'kovacs.janos@email.com',
    company: 'Példa Kft.',
    plan: 'Professional'
  };

  const bills = [
    { id: 1, date: '2025-06-01', amount: 45000, status: 'Fizetve', service: 'Rendszerüzemeltetés' },
    { id: 2, date: '2025-05-01', amount: 32000, status: 'Fizetve', service: 'Webfejlesztés' },
    { id: 3, date: '2025-04-01', amount: 28000, status: 'Folyamatban', service: 'IT Támogatás' },
  ];

  const services = [
    { name: 'Rendszerüzemeltetés', status: 'Aktív', nextBilling: '2025-07-01' },
    { name: 'Webfejlesztés', status: 'Aktív', nextBilling: '2025-07-15' },
    { name: 'IT Támogatás', status: 'Aktív', nextBilling: '2025-06-25' },
  ];

  const tickets = [
    { id: 1, title: 'Szerver karbantartás', status: 'Nyitott', priority: 'Magas', date: '2025-06-18' },
    { id: 2, title: 'Email konfiguráció', status: 'Folyamatban', priority: 'Közepes', date: '2025-06-17' },
    { id: 3, title: 'Weboldal frissítés', status: 'Lezárva', priority: 'Alacsony', date: '2025-06-15' },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Aktív szolgáltatások</p>
                    <p className="text-2xl font-bold text-white">{services.length}</p>
                  </div>
                  <Activity className="h-8 w-8 text-cyan-400" />
                </div>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Nyitott jegyek</p>
                    <p className="text-2xl font-bold text-white">{tickets.filter(t => t.status === 'Nyitott').length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Következő számla</p>
                    <p className="text-2xl font-bold text-white">2025-06-25</p>
                  </div>
                  <Calendar className="h-8 w-8 text-green-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Aktív szolgáltatások</h3>
                <div className="space-y-3">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded">
                      <div>
                        <p className="text-white font-medium">{service.name}</p>
                        <p className="text-gray-400 text-sm">Következő számlázás: {service.nextBilling}</p>
                      </div>
                      <span className="px-2 py-1 bg-green-600 text-green-100 text-xs rounded-full">
                        {service.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Legutóbbi jegyek</h3>
                <div className="space-y-3">
                  {tickets.slice(0, 3).map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-3 bg-gray-700 rounded">
                      <div>
                        <p className="text-white font-medium">{ticket.title}</p>
                        <p className="text-gray-400 text-sm">{ticket.date}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          ticket.status === 'Nyitott' ? 'bg-red-600 text-red-100' :
                          ticket.status === 'Folyamatban' ? 'bg-yellow-600 text-yellow-100' :
                          'bg-green-600 text-green-100'
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'bills':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Számláim</h2>
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
            
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Dátum</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Szolgáltatás</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Összeg</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Státusz</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Művelet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {bills.map((bill) => (
                      <tr key={bill.id} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{bill.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{bill.service}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{bill.amount.toLocaleString()} Ft</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            bill.status === 'Fizetve' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {bill.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <button className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            Megtekint
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'support':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Támogatás</h2>
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Új jegy
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
                <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Jegy létrehozása</h3>
                <p className="text-gray-400 text-sm mb-4">Hozzon létre új támogatási jegyet problémájához</p>
                <button className="text-cyan-400 hover:text-cyan-300">Új jegy</button>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">GYIK</h3>
                <p className="text-gray-400 text-sm mb-4">Tekintse meg a gyakran ismételt kérdéseket</p>
                <button className="text-cyan-400 hover:text-cyan-300">GYIK megnyitása</button>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">0-24 támogatás</h3>
                <p className="text-gray-400 text-sm mb-4">Sürgős esetekben hívjon minket</p>
                <button className="text-cyan-400 hover:text-cyan-300">+36 30 123 4567</button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Jegyeim</h3>
                <div className="space-y-3">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-4 bg-gray-700 rounded">
                      <div>
                        <p className="text-white font-medium">{ticket.title}</p>
                        <p className="text-gray-400 text-sm">#{ticket.id} • {ticket.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          ticket.priority === 'Magas' ? 'bg-red-600 text-red-100' :
                          ticket.priority === 'Közepes' ? 'bg-yellow-600 text-yellow-100' :
                          'bg-green-600 text-green-100'
                        }`}>
                          {ticket.priority}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          ticket.status === 'Nyitott' ? 'bg-red-600 text-red-100' :
                          ticket.status === 'Folyamatban' ? 'bg-yellow-600 text-yellow-100' :
                          'bg-green-600 text-green-100'
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Beállítások</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Profil adatok</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Név</label>
                    <input 
                      type="text" 
                      value={user.name}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input 
                      type="email" 
                      value={user.email}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Cég</label>
                    <input 
                      type="text" 
                      value={user.company}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded">
                    Mentés
                  </button>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Értesítési beállítások</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Email értesítések</span>
                    <div className="relative">
                      <input type="checkbox" className="sr-only" defaultChecked />
                      <div className="w-10 h-6 bg-cyan-600 rounded-full shadow-inner"></div>
                      <div className="absolute w-4 h-4 bg-white rounded-full shadow top-1 right-1 transition"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">SMS értesítések</span>
                    <div className="relative">
                      <input type="checkbox" className="sr-only" />
                      <div className="w-10 h-6 bg-gray-600 rounded-full shadow-inner"></div>
                      <div className="absolute w-4 h-4 bg-white rounded-full shadow top-1 left-1 transition"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Számlázási értesítések</span>
                    <div className="relative">
                      <input type="checkbox" className="sr-only" defaultChecked />
                      <div className="w-10 h-6 bg-cyan-600 rounded-full shadow-inner"></div>
                      <div className="absolute w-4 h-4 bg-white rounded-full shadow top-1 right-1 transition"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Biztonság</h3>
              <div className="space-y-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                  Jelszó megváltoztatása
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded ml-4">
                  Kétfaktoros hitelesítés
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-cyan-400">BitNova</div>
              <span className="text-gray-400">|</span>
              <span className="text-white">Ügyfélportál</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-white">
                <Bell className="h-5 w-5" />
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 text-white hover:bg-gray-700 rounded"
                >
                  <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <span>{user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                    <div className="p-3 border-b border-gray-700">
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                      <p className="text-cyan-400 text-xs">{user.plan} csomag</p>
                    </div>
                    <div className="p-2">
                      <button className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Beállítások
                      </button>
                      <button className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        Kijelentkezés
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left ${
                  activeTab === 'dashboard' ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Activity className="h-5 w-5" />
                Dashboard
              </button>
              
              <button
                onClick={() => setActiveTab('bills')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left ${
                  activeTab === 'bills' ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <CreditCard className="h-5 w-5" />
                Számláim
              </button>
              
              <button
                onClick={() => setActiveTab('support')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left ${
                  activeTab === 'support' ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <HelpCircle className="h-5 w-5" />
                Támogatás
              </button>
              
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left ${
                  activeTab === 'settings' ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Settings className="h-5 w-5" />
                Beállítások
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default BitnovaDashboard;