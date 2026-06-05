import { useState } from 'react';

const STORAGE_KEY = 'admin_auth';
// Lưu ý: đây là bảo vệ phía client, phù hợp cho trang cá nhân
const ADMIN_PASS = 'Minhtri281096';

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY) === '1';
  });

  function login(password: string): boolean {
    if (password === ADMIN_PASS) {
      localStorage.setItem(STORAGE_KEY, '1');
      setIsAdmin(true);
      return true;
    }
    return false;
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setIsAdmin(false);
  }

  return { isAdmin, login, logout };
}

// Singleton event để sync giữa các component
export const adminAuthEvent = new EventTarget();

export function checkAdminAuth(): boolean {
  return localStorage.getItem(STORAGE_KEY) === '1';
}
