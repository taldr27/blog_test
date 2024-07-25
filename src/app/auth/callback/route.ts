import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
// import type { Database } from '@/lib/database.types'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    try {
      await supabase.auth.exchangeCodeForSession(code);

      return NextResponse.redirect(requestUrl.origin);
    } catch (error) {
      console.error("Error exchanging code:", error);

      return NextResponse.redirect("/error");
    }
  }

  return NextResponse.redirect("/");
}
