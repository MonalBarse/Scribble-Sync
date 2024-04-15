"use client"

import { ConvexProviderWithClerk } from "convex/react-clerk"
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/nextjs"
import {
    AuthLoading,
    Authenticated,
    ConvexReactClient,
} from "convex/react";
import Loader from "@/components/Loader";
import { dark } from '@clerk/themes';


interface ConvexClientProviderProps {
    children: React.ReactNode;
};

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({ children }: ConvexClientProviderProps) => {
    return (
        <ClerkProvider
        appearance={
            {
                baseTheme: dark,
            }
        }
        >
            <ConvexProviderWithClerk
                useAuth={useAuth}
                client={convex}
            >
                <Authenticated>
                    {children}
                </Authenticated>
                <AuthLoading>
                    <Loader />
                </AuthLoading>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};