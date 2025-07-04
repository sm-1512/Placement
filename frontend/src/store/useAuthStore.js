import {create} from 'zustand';
import {axiosInstance} from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({authUser: res.data});
        } catch (error) {
            set({authUser: null});
            console.error('Error in checkAuth:', error);
        }
        finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({isSigningUp: true});
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            toast.success("Signup successful! Please log in.");
            set({authUser: res.data, isSigningUp: false});
        } catch (error) {
            toast.error(error.response.data.message);
            console.error('Error in signup:', error);
            set({isSigningUp: false});
        } finally {
            set({isSigningUp: false});
        }
    },


    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({authUser: null});
            toast.success("Logged out successfully.");
        } catch (error) {
            console.error('Error in logout:', error);
            toast.error("Failed to log out.");
        }
    },

}));