"use client";

import { Header } from "@/components/marketing/header-navigation/components/header";
import { Button } from "@/components/base/buttons/button";
import { BadgeWithIcon } from "@/components/base/badges/badges";
import { ArrowRight, Check, Plus, Minus } from "@untitledui/icons";
import { useState } from "react";

export default function PricingPage() {
    const [expandedFAQ, setExpandedFAQ] = useState(0);

    const faqs = [
        {
            question: "Is there a free trial available?",
            answer: "Yes, you can try Kai for free for 14 days. We'll provide you with a free, personalized 30-minute onboarding call to get you up and running with voice automation as soon as possible."
        },
        {
            question: "Can I change my plan later?",
            answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences."
        },
        {
            question: "What is your cancellation policy?",
            answer: "You can cancel your subscription at any time with no cancellation fees. Your access will continue until the end of your current billing period."
        },
        {
            question: "How does billing work?",
            answer: "We bill monthly or annually based on your chosen plan. All plans include our core voice automation features, with additional costs only for usage beyond your plan limits."
        },
        {
            question: "What happens if I exceed my call limit?",
            answer: "We'll notify you when you're approaching your limit. Additional calls are charged at $0.10 per call for Starter and Professional plans. Enterprise plans include unlimited calls."
        },
        {
            question: "Do you offer custom integrations?",
            answer: "Yes, custom integrations are available for Professional and Enterprise plans. Contact our team to discuss your specific integration needs and requirements."
        }
    ];

    const plans = [
        {
            name: "Starter",
            price: "$99",
            period: "per month",
            description: "Perfect for small teams getting started with voice automation",
            features: [
                "Up to 1,000 calls per month",
                "Basic voice automation",
                "Email support",
                "Standard integrations",
                "Basic analytics"
            ],
            popular: false
        },
        {
            name: "Professional",
            price: "$299",
            period: "per month",
            description: "Ideal for growing businesses with advanced automation needs",
            features: [
                "Up to 10,000 calls per month",
                "Advanced voice automation",
                "Priority support",
                "All integrations",
                "Advanced analytics",
                "Custom workflows",
                "API access"
            ],
            popular: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "",
            description: "Tailored solutions for large organizations with complex requirements",
            features: [
                "Unlimited calls",
                "Custom voice automation",
                "Dedicated support",
                "Custom integrations",
                "Enterprise analytics",
                "Custom workflows",
                "Full API access",
                "SLA guarantee",
                "On-premise deployment"
            ],
            popular: false
        }
    ];

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
                                Simple, transparent pricing
                            </h1>
                        <p className="text-[20px] text-[#ba3a14] leading-[30px] mb-8">
                            Choose the plan that fits your business needs. All plans include our core voice automation features.
                        </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="bg-primary px-0 py-6">
                <div className="mx-auto max-w-[1280px] px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <div
                                key={plan.name}
                                className={`relative bg-secondary border rounded-2xl p-8 flex flex-col h-full ${
                                    plan.popular 
                                        ? 'border-brand shadow-lg ring-2 ring-brand/20' 
                                        : 'border-secondary'
                                }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <BadgeWithIcon
                                            type="pill-color"
                                            color="brand"
                                            size="lg"
                                            iconLeading={() => (
                                                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                </svg>
                                            )}
                                        >
                                            Most Popular
                                        </BadgeWithIcon>
                                    </div>
                                )}
                                
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-semibold text-primary mb-2">{plan.name}</h3>
                                    <div className="mb-4">
                                        <span className="text-4xl font-bold text-primary">{plan.price}</span>
                                        <span className="text-lg text-tertiary ml-2">{plan.period}</span>
                                    </div>
                                    <p className="text-md text-tertiary">{plan.description}</p>
                                </div>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start gap-3">
                                            <Check className="size-5 text-brand flex-shrink-0 mt-0.5" />
                                            <span className="text-md text-primary">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    color={plan.popular ? "primary" : "secondary"}
                                    size="lg"
                                    className="w-full mt-auto"
                                    iconTrailing={ArrowRight}
                                >
                                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white px-0 py-24">
                <div className="mx-auto max-w-[1280px] px-8">
                    {/* Header Section */}
                    <div className="flex flex-col gap-8 items-center mb-16">
                        <div className="flex flex-col gap-5 items-center max-w-[768px] text-center">
                            <h2 className="text-[36px] font-semibold text-primary tracking-[-0.72px] leading-[44px]">
                                Frequently asked questions
                            </h2>
                            <p className="text-[20px] text-tertiary leading-[30px]">
                                Everything you need to know about Kai and our pricing.
                            </p>
                        </div>
                    </div>

                    {/* FAQ Items */}
                    <div className="flex flex-col gap-8 items-center max-w-[1280px]">
                        <div className="flex flex-col gap-8 items-start max-w-[768px] w-full">
                            {faqs.map((faq, index) => (
                                <div key={index} className="w-full">
                                    {index > 0 && (
                                        <div className="border-t border-secondary mb-6" />
                                    )}
                                    <button
                                        className="w-full text-left min-w-[320px]"
                                        onClick={() => setExpandedFAQ(expandedFAQ === index ? -1 : index)}
                                    >
                                        <div className="flex gap-4 items-start">
                                            <div className="flex-1 flex flex-col gap-1">
                                                <h3 className="text-[16px] font-semibold text-primary leading-[24px]">
                                                    {faq.question}
                                                </h3>
                                                {expandedFAQ === index && (
                                                    <p className="text-[16px] text-tertiary leading-[24px]">
                                                        {faq.answer}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex-shrink-0">
                                                <div className="size-6">
                                                    {expandedFAQ === index ? (
                                                        <Minus className="size-6 text-quaternary" />
                                                    ) : (
                                                        <Plus className="size-6 text-quaternary" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>


        </div>
    );
}
