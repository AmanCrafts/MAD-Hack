import { supabase } from '../config/supabase.js';
import { prisma } from '../config/db.js';

/**
 * Sign up a new user
 */
export const signup = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Validate input
        if (!email || !password || !name) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email, password, and name.'
            });
        }

        // Create user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name
                }
            }
        });

        if (authError) {
            return res.status(400).json({
                success: false,
                message: 'Failed to create user.',
                error: authError.message
            });
        }

        // Create or update user in our database (using upsert)
        const user = await prisma.user.upsert({
            where: { id: authData.user.id },
            update: {
                email,
                name,
            },
            create: {
                id: authData.user.id, // Use Supabase user ID
                email,
                name,
            }
        });

        return res.status(201).json({
            success: true,
            message: 'User created successfully. Please check your email for verification.',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                },
                session: authData.session
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create user.',
            error: error.message
        });
    }
};

/**
 * Sign in an existing user
 */
export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password.'
            });
        }

        // Sign in with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials.',
                error: error.message
            });
        }

        // Get or create user in database
        let user = await prisma.user.findUnique({
            where: { id: data.user.id },
            select: {
                id: true,
                email: true,
                name: true,
                currentStreak: true,
                totalTopicsCompleted: true,
                lastCompletedDate: true
            }
        });

        // If user doesn't exist in our database, create them
        if (!user) {
            user = await prisma.user.create({
                data: {
                    id: data.user.id,
                    email: data.user.email,
                    name: data.user.user_metadata?.name || data.user.email.split('@')[0],
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    currentStreak: true,
                    totalTopicsCompleted: true,
                    lastCompletedDate: true
                }
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Login successful.',
            data: {
                user,
                session: data.session
            }
        });
    } catch (error) {
        console.error('Signin error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to sign in.',
            error: error.message
        });
    }
};

/**
 * Sign out user
 */
export const signout = async (req, res) => {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Failed to sign out.',
                error: error.message
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Signed out successfully.'
        });
    } catch (error) {
        console.error('Signout error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to sign out.',
            error: error.message
        });
    }
};

/**
 * Get current user profile
 */
export const getProfile = async (req, res) => {
    try {
        // User is attached by auth middleware
        const userId = req.user.id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                progress: {
                    include: {
                        topic: true
                    },
                    orderBy: {
                        lastAccessed: 'desc'
                    },
                    take: 5
                }
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        return res.status(200).json({
            success: true,
            data: { user }
        });
    } catch (error) {
        console.error('Get profile error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to get profile.',
            error: error.message
        });
    }
};

/**
 * Update user profile
 */
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name to update.'
            });
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: { name },
            select: {
                id: true,
                email: true,
                name: true,
                currentStreak: true,
                totalTopicsCompleted: true
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully.',
            data: { user }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to update profile.',
            error: error.message
        });
    }
};

/**
 * Refresh access token
 */
export const refreshToken = async (req, res) => {
    try {
        const { refresh_token } = req.body;

        if (!refresh_token) {
            return res.status(400).json({
                success: false,
                message: 'Please provide refresh token.'
            });
        }

        const { data, error } = await supabase.auth.refreshSession({
            refresh_token
        });

        if (error) {
            return res.status(401).json({
                success: false,
                message: 'Failed to refresh token.',
                error: error.message
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Token refreshed successfully.',
            data: {
                session: data.session
            }
        });
    } catch (error) {
        console.error('Refresh token error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to refresh token.',
            error: error.message
        });
    }
};
