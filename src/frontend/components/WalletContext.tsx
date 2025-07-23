import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthClient } from '@dfinity/auth-client';
// Ensure ActorSubclass is imported along with others
import { Actor, ActorMethod, HttpAgent, Identity, ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

// --- MODIFIED IMPORT PATH AND TYPING ---
// Import the generated createActor function and canisterId
import { createActor as createBackendActor, canisterId as backendCanisterId } from '../../declarations/backend';
// Import the generated _SERVICE type and HoneyBatch interface directly from backend.did.d.ts
import type { _SERVICE as BackendService, HoneyBatch } from '../../declarations/backend/backend.did';

// --- REMOVED MANUAL INTERFACES HERE - NOW IMPORTED FROM .did.d.ts ---
// The manual interface _SERVICE and HoneyBatch definitions are removed as they are now imported.


interface WalletContextType {
    isAuthenticated: boolean;
    authClient: AuthClient | null;
    identity: Identity | null;
    principal: Principal | null;
    // --- MODIFIED TYPE FOR backendActor ---
    backendActor: ActorSubclass<BackendService> | null; // Use the imported BackendService type
    login: () => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authClient, setAuthClient] = useState<AuthClient | null>(null);
    const [identity, setIdentity] = useState<Identity | null>(null);
    const [principal, setPrincipal] = useState<Principal | null>(null);
    // --- MODIFIED TYPE FOR backendActor STATE ---
    const [backendActor, setBackendActor] = useState<ActorSubclass<BackendService> | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const initAuthClient = async () => {
        const client = await AuthClient.create();
        setAuthClient(client);
        const authenticated = await client.isAuthenticated();
        setIsAuthenticated(authenticated);
        if (authenticated) {
            const id = client.getIdentity();
            setIdentity(id);
            setPrincipal(id.getPrincipal());
            const agent = new HttpAgent({ identity: id });

            // If running locally, fetch root key for local replica
            if (process.env.NEXT_PUBLIC_DFX_NETWORK === 'local') {
                await agent.fetchRootKey();
            }

            // Create actor for your backend canister
            const actor = createBackendActor(backendCanisterId, { agent });
            // --- NO MORE TYPE ASSERTION NEEDED HERE! ---
            // createBackendActor now returns ActorSubclass<BackendService> due to generated types
            setBackendActor(actor);
        }
        setLoading(false);
    };

    useEffect(() => {
        initAuthClient();
    }, []);

    const login = async () => {
        if (!authClient) return;
        setLoading(true);
        await authClient.login({
            identityProvider: process.env.NEXT_PUBLIC_DFX_NETWORK === 'local'
                ? `http://localhost:8000/?canisterId=${process.env.NEXT_PUBLIC_INTERNET_IDENTITY_CANISTER_ID}`
                : 'https://identity.ic0.app',
            onSuccess: () => {
                initAuthClient(); // Re-initialize state on successful login
            },
            onError: (error) => {
                console.error("Login failed:", error);
                setLoading(false);
            }
        });
    };

    const logout = async () => {
        if (!authClient) return;
        setLoading(true);
        await authClient.logout();
        setIsAuthenticated(false);
        setIdentity(null);
        setPrincipal(null);
        setBackendActor(null);
        setLoading(false);
    };

    return (
        <WalletContext.Provider value={{
            isAuthenticated,
            authClient,
            identity,
            principal,
            backendActor,
            login,
            logout,
            loading
        }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};