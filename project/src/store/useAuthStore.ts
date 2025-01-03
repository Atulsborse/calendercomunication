import { create } from 'zustand';
import { User, AuthState } from '@/types/auth';

interface AuthStore extends AuthState {
  users: User[];
  login: (user: User) => void;
  logout: () => void;
  deleteUser: (id: string) => void;
}

// Initial test users
const initialUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@example.com',
    role: 'user',
  },
];

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  users: initialUsers,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
}));