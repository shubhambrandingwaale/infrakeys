import { NextResponse } from 'next/server'
import React from 'react'
export function middleware(request) {
    if (request.nextUrl.pathname !== "/login")
    {
        // return NextResponse.redirect(new URL("/login", request.url))
    }

}
export const config = {
    matcher: [ "/admin:path*" ]
}