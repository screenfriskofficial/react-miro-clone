"use client"

import React from "react"
import { ClerkProvider, useAuth } from "@clerk/nextjs"
import { Loading } from "~/components/auth/loading"
import { Authenticated, AuthLoading, ConvexReactClient } from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"

interface ConvexClientProviderProp {
  children: React.ReactNode
}

const convexURL = process.env.NEXT_PUBLIC_CONVEX_URL!
const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

const convexClient = new ConvexReactClient(convexURL)
export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProp) => {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ConvexProviderWithClerk client={convexClient} useAuth={useAuth}>
        <Authenticated>{children}</Authenticated>
        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}
