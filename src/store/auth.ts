import { deleteSession } from '@/action';
import api from '@/lib/api';
import { Account } from '@prisma/client';
import { atom, useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';

// Helper functions for localStorage
const key = process.env.PUBLIC_STORAGE_KEY || 'auth_account';

const getStoredAccount = (): Account | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : null;
};

const storeAccount = (account: Account | null) => {
  if (typeof window === 'undefined') return;
  if (account) {
    localStorage.setItem(key, JSON.stringify(account));
  } else {
    localStorage.removeItem(key);
  }
};

// Initialize atom with stored value
const accountAtom = atom<Account | null>(null);
const isAuthenticatedAtom = atom((get) => get(accountAtom) !== null);
const loadingAtom = atom(true);

export const useAuth = () => {
  const [account, setAccount] = useAtom(accountAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  // Load initial state from localStorage
  useEffect(() => {
    const storedAccount = getStoredAccount();
    if (storedAccount) {
      setAccount(storedAccount);
    }
    setLoading(false);
  }, [setAccount, setLoading]);

  const login = async (account: Account) => {
    try {
      setAccount(account);
      storeAccount(account);
    } catch (error) {
      console.error(error);
      setAccount(null);
      storeAccount(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setAccount(null);
    storeAccount(null);
    await deleteSession();

    return true;
  };

  const changePassword = async (username: string, oldPassword: string, newPassword: string) => {
    const res = await api.post('auth/change-password', { username, oldPassword, newPassword });
    console.log(res.data);

    return res.data;
  };

  return { account, loading, login, logout, isAuthenticated, changePassword };
};
