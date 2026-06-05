import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import { ALLOWED_EMAILS } from '../config/auth';

interface GoogleUser {
  email: string;
  name: string;
  picture: string;
}

interface AdminGuardProps {
  children: React.ReactNode;
}

const STORAGE_KEY = 'admin_google_user';

export function AdminGuard({ children }: AdminGuardProps) {
  const [user, setUser] = useState<GoogleUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    setChecking(false);
  }, []);

  function handleSuccess(credentialResponse: { credential?: string }) {
    try {
      if (!credentialResponse.credential) throw new Error('Không nhận được credential');

      const decoded = jwtDecode<GoogleUser & { email: string }>(credentialResponse.credential);
      const gmail: GoogleUser = {
        email: decoded.email,
        name: (decoded as { name?: string }).name ?? decoded.email,
        picture: (decoded as { picture?: string }).picture ?? '',
      };

      if (ALLOWED_EMAILS.length > 0 && !ALLOWED_EMAILS.includes(gmail.email)) {
        setError(`Tài khoản ${gmail.email} không có quyền truy cập.`);
        return;
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(gmail));
      setUser(gmail);
      setError('');
    } catch {
      setError('Đăng nhập thất bại, vui lòng thử lại.');
    }
  }

  function handleLogout() {
    googleLogout();
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  if (checking) return null;

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm text-center space-y-6">
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-gray-800">Trang quản trị</h1>
            <p className="text-sm text-gray-500">Đăng nhập bằng Gmail để tiếp tục</p>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => setError('Đăng nhập thất bại, vui lòng thử lại.')}
              useOneTap
              theme="outline"
              size="large"
              text="signin_with"
              shape="rectangular"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Admin top bar */}
      <div className="bg-indigo-700 text-white text-sm px-4 py-2 flex items-center justify-between">
        <span className="font-medium">⚙️ Admin</span>
        <div className="flex items-center gap-3">
          {user.picture && (
            <img src={user.picture} alt={user.name} className="w-6 h-6 rounded-full" />
          )}
          <span className="opacity-80 hidden sm:inline">{user.email}</span>
          <button
            onClick={handleLogout}
            className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs transition"
          >
            Đăng xuất
          </button>
        </div>
      </div>
      {children}
    </>
  );
}
