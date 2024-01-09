import { NextResponse } from "next/server";

export async function GET(request) {
    const res = await fetch('https://netzwelt-devtest.azurewebsites.net/Territories/All');

    const data = await res.json();

    return NextResponse.json(data);
}