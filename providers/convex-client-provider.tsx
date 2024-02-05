"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { AuthLoading, Authenticated, ConvexReactClient } from "convex/react";
import React from "react";
import { Loading } from "~/components/auth/loading";

interface ConvexClientProviderProp {
  children: React.ReactNode;
}

const convexURL = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convexClient = new ConvexReactClient(convexURL);
export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProp) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convexClient} useAuth={useAuth}>
        <Authenticated>{children}</Authenticated>
        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
