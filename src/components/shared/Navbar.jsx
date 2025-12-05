import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import useLogout from '../../hooks/useLogout';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const { isAuthenticated } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const { logout, isLoading } = useLogout();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-lg fixed  top-0 right-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14">
                    <Link to="/Acceuil" className="shrink-0 flex items-center gap-2">
                        <img src="https://iscae.mr/sites/default/files/logo-iscae.png" alt="Logo" className="w-10 h-10" />
                        <img src="https://www.nuitdelinfo.com/img/logo_n2i_color_moon.svg" alt="Logo" className="w-10 h-10" />
                        <span className="text-blue-600 text-lg font-bold">MyProducts</span>
                    </Link>
                    {/* --- Fin Partie Gauche --- */}

                    {/* --- Menu Desktop --- */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/" className="text-gray-600 hover:text-blue-600 font-semibold transition">
                            Acceuil
                        </Link>
                        <Link to="/statics" className="text-gray-600 hover:text-blue-600 font-semibold transition">
                            Statistique
                        </Link>
                        <Link to="/leaderboard" className="text-gray-600 hover:text-blue-600 font-semibold transition">
                            leaderboard
                        </Link>
                        <Link to="/learn" className="text-gray-600 hover:text-blue-600 font-semibold transition">
                            Apprendre
                        </Link>
                         <Link to="/quiz" className="text-gray-600 hover:text-blue-600 font-semibold transition">
                            Quiz
                        </Link>
                        {isAuthenticated ? (
                            <button onClick={logout} disabled={isLoading} className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 px-5 py-2 rounded-full font-medium transition">
                                {isLoading ? "..." : "Logout"}
                            </button>
                        ) : (
                            <div className="flex items-center gap-3">
                                {/* Bouton Login (Contour) */}
                                <Link to="/auth/login" className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-1.5 rounded text-sm font-medium transition">
                            Login
                            </Link> 
                                {/* Bouton Register (Plein) - NOUVEAU */}
                                
                            </div>
                        )}
                    </div>

                    {/* --- Bouton Menu Mobile --- */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition focus:outline-none"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Menu Mobile Dropdown --- */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-inner">
                    <div className="px-4 py-4 space-y-3">
                        <Link to="/Acceuil" className="block text-gray-700 hover:text-blue-600 font-medium text-lg px-2 py-1">
                            Acceuil
                        </Link>
                        <Link to="/statistique" className="block text-gray-700 hover:text-blue-600 font-medium text-lg px-2 py-1">
                            Statistique
                        </Link>
                              <Link to="/leaderBord" className="block text-gray-700 hover:text-blue-600 font-medium text-lg px-2 py-1">
                            LeaderBord
                        </Link> 
                        <Link to="/learn" className="block text-gray-700 hover:text-blue-600 font-medium text-lg px-2 py-1">
                            Apprendre
                        </Link>
                        {isAuthenticated ? (
                            <button onClick={logout} disabled={isLoading} className="w-full text-left text-red-600 font-medium text-lg px-2 py-1">
                                Logout
                            </button>
                        ) : (
                           <div className="flex flex-col gap-3 mt-4">
                               <Link to="/auth/login" className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-1.5 rounded text-sm font-medium transition">
                            Login
                            </Link> 
                           </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}