"use client";

import { Header } from "@/components/marketing/header-navigation/components/header";
import { Button } from "@/components/base/buttons/button";
import { ArrowRight, Check, Zap } from "@untitledui/icons";
import { useState } from "react";

export default function IntegrationsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const integrations = [
        {
            name: "Slack",
            description: "Get notifications and updates directly in your Slack workspace",
            category: "Communication",
            status: "Available",
            icon: "/integration-logos/slack.svg"
        },
        {
            name: "Microsoft Teams",
            description: "Integrate with Teams for seamless collaboration",
            category: "Communication",
            status: "Available",
            icon: "/integration-logos/teams.svg"
        },
        {
            name: "Google Calendar",
            description: "Sync appointments and schedule management",
            category: "Productivity",
            status: "Available",
            icon: "/integration-logos/g-calendar.svg"
        },
        {
            name: "Outlook",
            description: "Connect with Outlook for email and calendar integration",
            category: "Productivity",
            status: "Available",
            icon: "/integration-logos/outlook.svg"
        },
        {
            name: "Twilio",
            description: "Powerful telephony integration for voice calls",
            category: "Telephony",
            status: "Available",
            icon: "/integration-logos/twilio.svg"
        },
        {
            name: "Salesforce",
            description: "Sync customer data and interactions with your CRM",
            category: "CRM",
            status: "Coming Soon",
            icon: "/images/mockup-placeholder.svg"
        },
        {
            name: "HubSpot",
            description: "Connect with HubSpot for lead management and tracking",
            category: "CRM",
            status: "Coming Soon",
            icon: "/images/mockup-placeholder.svg"
        },
        {
            name: "Zendesk",
            description: "Integrate with Zendesk for customer support workflows",
            category: "Support",
            status: "Coming Soon",
            icon: "/images/mockup-placeholder.svg"
        }
    ];

    const categories = ["All", "Communication", "Productivity", "Telephony", "CRM", "Support"];

    // Filter integrations based on selected category
    const filteredIntegrations = selectedCategory === "All" 
        ? integrations 
        : integrations.filter(integration => integration.category === selectedCategory);

    return (
        <div className="flex min-h-screen flex-col bg-primary">
            <Header />

            {/* Hero Section */}
            <section className="relative px-0 py-24">
                <div className="absolute inset-0 bg-gradient-to-b from-[#fef6ee] to-white -mb-24"></div>
                <div className="relative z-10">
                    <div className="mx-auto max-w-[1280px] px-8">
                        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                            <h1 className="text-[48px] font-semibold text-[#772917] tracking-[-0.96px] leading-[56px] mb-6">
                                Connect with your favorite tools
                            </h1>
                            <p className="text-[20px] text-[#ba3a14] leading-[30px] mb-8">
                                Seamlessly integrate Kai with over 100+ apps and platforms. Connect your existing tools and workflows to supercharge your voice automation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="bg-primary px-0 py-6">
                <div className="mx-auto max-w-[1280px] px-8">
                    <div className="flex flex-wrap gap-4 justify-center">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                color={category === selectedCategory ? "primary" : "secondary"}
                                size="md"
                                className="min-w-[120px]"
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Integrations Grid */}
            <section className="bg-primary px-0 py-6">
                <div className="mx-auto max-w-[1280px] px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredIntegrations.map((integration, index) => (
                            <div
                                key={integration.name}
                                className="bg-secondary border border-secondary rounded-xl p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="size-12 rounded-lg bg-white p-2 flex items-center justify-center">
                                        <img 
                                            src={integration.icon} 
                                            alt={integration.name}
                                            className="size-8 object-contain"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-primary mb-1">
                                            {integration.name}
                                        </h3>
                                    </div>
                                </div>
                                
                                <p className="text-md text-tertiary mb-4">
                                    {integration.description}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-quaternary">
                                        {integration.category}
                                    </span>
                                    <Button
                                        color="link-color"
                                        size="sm"
                                        iconTrailing={ArrowRight}
                                    >
                                        Connect
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* CTA Section */}
            <section className="bg-primary px-0 py-24">
                <div className="mx-auto max-w-[1280px] px-8">
                    <div className="text-center">
                        <h2 className="text-[36px] font-semibold text-primary tracking-[-0.72px] leading-[44px] mb-4">
                            Don't see your tool?
                        </h2>
                        <p className="text-xl text-tertiary mb-8">
                            We're constantly adding new integrations. Request one or build your own with our API.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                color="primary"
                                size="lg"
                                iconTrailing={ArrowRight}
                            >
                                Request Integration
                            </Button>
                            <Button
                                color="secondary"
                                size="lg"
                                iconTrailing={ArrowRight}
                            >
                                View API Docs
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-secondary px-8 py-16">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col gap-12">
                        <div className="flex flex-wrap items-start justify-between gap-12">
                            <div className="flex flex-col gap-8 min-w-[560px]">
                                <div className="flex items-center gap-2">
                                    <a href="/" className="hover:opacity-80 transition-opacity">
                                        <span className="text-lg font-semibold text-primary">Guided Bot</span>
                                    </a>
                                </div>
                                <div className="flex items-center gap-8">
                                    <Button color="link-gray" size="lg" href="/features">Features</Button>
                                    <Button color="link-gray" size="lg" href="/blog">Blog</Button>
                                    <Button color="link-gray" size="lg" href="/about">About</Button>
                                    <Button color="link-gray" size="lg" href="/help">Help</Button>
                                    <Button color="link-gray" size="lg" href="/privacy">Privacy</Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 w-[360px]">
                                <div className="text-sm font-semibold text-primary">Stay up to date</div>
                                <div className="flex gap-4">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="flex-1 px-3.5 py-2.5 rounded-lg border border-primary bg-primary text-md text-tertiary placeholder:text-placeholder"
                                    />
                                    <Button color="primary" size="lg">Subscribe</Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-8 border-t border-secondary">
                            <div className="text-md text-quaternary">© 2025 Guided Reach. All rights reserved.</div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
