import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const form = await request.json()
    
        const res = await fetch("https://netzwelt-devtest.azurewebsites.net/Account/SignIn", {
            method: "POST",
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });
    
        console.log(form)
        const data = await res.json();
        
        return NextResponse.json(data);
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({message: error.message}, {status: 500})
    }
}