import { type NextRequest, NextResponse } from "next/server"

// OAuth configuration
const OAUTH_CONFIG = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.NEXT_PUBLIC_APP_URL + "/api/auth/oauth/callback/google",
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    scope: "openid profile email",
  },
  linkedin: {
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    redirectUri: process.env.NEXT_PUBLIC_APP_URL + "/api/auth/oauth/callback/linkedin",
    authUrl: "https://www.linkedin.com/oauth/v2/authorization",
    tokenUrl: "https://www.linkedin.com/oauth/v2/accessToken",
    scope: "openid profile email",
  },
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const provider = searchParams.get("provider") as "google" | "linkedin"

  if (!provider || !OAUTH_CONFIG[provider]) {
    return NextResponse.json({ error: "Invalid provider" }, { status: 400 })
  }

  const config = OAUTH_CONFIG[provider]
  const state = Math.random().toString(36).substring(7)

  // Build OAuth URL
  const authUrl = new URL(config.authUrl)
  authUrl.searchParams.set("client_id", config.clientId || "")
  authUrl.searchParams.set("redirect_uri", config.redirectUri)
  authUrl.searchParams.set("response_type", "code")
  authUrl.searchParams.set("scope", config.scope)
  authUrl.searchParams.set("state", state)

  // In production, store state in session/cookie for CSRF protection
  console.log(`[v0] OAuth initiated for ${provider}`)

  return NextResponse.redirect(authUrl.toString())
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { provider, code } = body

    if (!provider || !code) {
      return NextResponse.json({ error: "Missing provider or code" }, { status: 400 })
    }

    const config = OAUTH_CONFIG[provider as "google" | "linkedin"]

    // Exchange code for access token
    const tokenResponse = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: config.clientId || "",
        client_secret: config.clientSecret || "",
        code,
        redirect_uri: config.redirectUri,
        grant_type: "authorization_code",
      }),
    })

    const tokenData = await tokenResponse.json()

    // In production, fetch user profile and create/update user in database
    console.log(`[v0] OAuth token received for ${provider}`)

    return NextResponse.json({
      success: true,
      accessToken: tokenData.access_token,
      provider,
    })
  } catch (error) {
    console.error("[v0] OAuth error:", error)
    return NextResponse.json({ error: "OAuth authentication failed" }, { status: 500 })
  }
}
