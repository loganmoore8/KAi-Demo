"use client";

import { ThemeProvider } from "next-themes";

function ThemeContent({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

export function Theme({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider 
            attribute="class" 
            value={{ light: "light-mode" }} 
            enableSystem={false}
            defaultTheme="light"
            disableTransitionOnChange={false}
            forcedTheme="light"
        >
            <ThemeContent>{children}</ThemeContent>
        </ThemeProvider>
    );
}
