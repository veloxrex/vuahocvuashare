import { useState } from 'react';
import { ExternalLink, PlusCircle, CheckCircle, Lock, Eye, EyeOff } from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSe9_npPsB5aKXUmp9mO96pPHtsaOOdmLGg6Jxq9MhaO5AcQhQ/viewform';

function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAdminAuth();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (login(password)) {
      onSuccess();
    } else {
      setError('Mật khẩu không đúng');
      setPassword('');
    }
  }

  return (
    <div className="min-h-[calc(100vh-48px)] bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-sm w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7 text-indigo-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">Khu vực quản trị</h1>
          <p className="text-sm text-gray-500">Nhập mật khẩu để tiếp tục</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Mật khẩu"
              autoFocus
              className="w-full px-4 pr-11 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-gray-800 transition"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { isAdmin, logout } = useAdminAuth();
  const [authed, setAuthed] = useState(isAdmin);

  if (!authed) {
    return <PasswordGate onSuccess={() => setAuthed(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto">
          <PlusCircle className="w-8 h-8 text-indigo-600" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">Thêm sản phẩm mới</h1>
          <p className="text-sm text-gray-500">
            Điền form để thêm sản phẩm vào Google Sheet. Dữ liệu sẽ tự động cập nhật trên trang.
          </p>
        </div>

        <ul className="text-left text-sm text-gray-600 space-y-2">
          {['Tên sản phẩm & mô tả', 'Ảnh, giá, danh mục', 'Link sàn thương mại điện tử'].map(
            (item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                {item}
              </li>
            ),
          )}
        </ul>

        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition"
        >
          <PlusCircle className="w-5 h-5" />
          Mở form thêm sản phẩm
          <ExternalLink className="w-4 h-4 opacity-70" />
        </a>

        <button
          onClick={() => { logout(); setAuthed(false); }}
          className="text-xs text-gray-400 hover:text-gray-600 transition"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}


