import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { Actor, ActorMethod, HttpAgent, Identity, Principal } from '@dfinity/agent';
import { createActor as createBackendActor, canisterId as backendCanisterId } from '../../../declarations/backend'; // Adjust path based on your dfx generate output

// Define types for your backend actor methods if you need stronger typing
// For now, we'll use a generic ActorMethod<any>
interface _SERVICE {
    greet: ActorMethod<[string], string>;
    mint_honey_batch: ActorMethod<[string, string], { Ok: bigint } | { Err: string }>;
    get_honey_batch_details: ActorMethod<[bigint], [] | [HoneyBatch]>;
    // Add other backend methods as you implement them
}

// Assuming HoneyBatch is defined in your backend.did.d.ts
// For now, we'll just define a simplified version here if needed for frontend context:
interface HoneyBatch {
    id: bigint;
    beekeeper_id: Principal;
    location: string;
    quality: string;
    timestamp: bigint;
}


interface WalletContextType {
    isAuthenticated: boolean;
    authClient: AuthClient | null;
    identity: Identity | null;
    principal: Principal | null;
    backendActor: Actor | null; // Typed backend actor
    login: () => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authClient, setAuthClient] = useState<AuthClient | null>(null);
    const [identity, setIdentity] = useState<Identity | null>(null);
    const [principal, setPrincipal] = useState<Principal | null>(null);
    const [backendActor, setBackendActor] = useState<Actor | null>(null);
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
            setBackendActor(actor as Actor<_SERVICE>); // Type assertion here
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