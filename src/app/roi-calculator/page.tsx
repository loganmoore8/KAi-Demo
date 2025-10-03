"use client";

import { Header } from "@/components/marketing/header-navigation/components/header";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { ArrowRight, Calculator, Clock, ChartBreakoutSquare, MessageChatCircle } from "@untitledui/icons";
import { useState } from "react";

export default function ROICalculatorPage() {
    const [formData, setFormData] = useState({
        monthlyCalls: 1000,
        avgCallDuration: 5,
        agentHourlyRate: 25,
        currentResolutionRate: 70,
        kaiResolutionRate: 85
    });

    const [results, setResults] = useState({
        monthlySavings: 0,
        annualSavings: 0,
        roi: 0,
        paybackPeriod: 0
    });

    const calculateROI = () => {
        const {
            monthlyCalls,
            avgCallDuration,
            agentHourlyRate,
            currentResolutionRate,
            kaiResolutionRate
        } = formData;

        // Calculate current costs
        const currentHandledCalls = monthlyCalls * (currentResolutionRate / 100);
        const currentUnhandledCalls = monthlyCalls - currentHandledCalls;
        const currentCallCost = (avgCallDuration / 60) * agentHourlyRate;
        const currentMonthlyCost = currentHandledCalls * currentCallCost;

        // Calculate Kai costs
        const kaiHandledCalls = monthlyCalls * (kaiResolutionRate / 100);
        const kaiUnhandledCalls = monthlyCalls - kaiHandledCalls;
        const kaiCallCost = (avgCallDuration / 60) * (agentHourlyRate * 0.3); // 70% cost reduction
        const kaiMonthlyCost = kaiHandledCalls * kaiCallCost;

        // Calculate savings
        const monthlySavings = currentMonthlyCost - kaiMonthlyCost;
        const annualSavings = monthlySavings * 12;
        const kaiMonthlyCost_plan = 299; // Professional plan
        const roi = ((annualSavings - (kaiMonthlyCost_plan * 12)) / (kaiMonthlyCost_plan * 12)) * 100;
        const paybackPeriod = (kaiMonthlyCost_plan * 12) / annualSavings;

        setResults({
            monthlySavings: Math.round(monthlySavings),
            annualSavings: Math.round(annualSavings),
            roi: Math.round(roi),
            paybackPeriod: Math.round(paybackPeriod * 10) / 10
        });
    };

    const handleInputChange = (field: string, value: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="flex min-h-screen flex-col bg-primary">
            <Header />

            {/* Hero Section */}
            <section className="relative px-0 pt-24 pb-6">
                <div className="absolute inset-0 bg-gradient-to-b from-[#fef6ee] to-white -mb-24"></div>
                <div className="relative z-10">
                    <div className="mx-auto max-w-[1280px] px-8">
                        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                            <h1 className="text-[48px] font-semibold text-[#772917] tracking-[-0.96px] leading-[56px] mb-6">
                                Calculate your ROI with Kai
                            </h1>
                            <p className="text-[20px] text-[#ba3a14] leading-[30px] mb-8">
                                See how much you can save by automating your voice interactions. Get instant insights into your potential return on investment.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="bg-primary px-0 pt-6 pb-16">
                <div className="mx-auto max-w-[1280px] px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Input Form */}
                        <div className="bg-secondary rounded-2xl p-8">
                            <h2 className="text-2xl font-semibold text-primary mb-8">
                                Your Current Setup
                            </h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-primary mb-2">
                                        Monthly Call Volume
                                    </label>
                                    <Input
                                        type="number"
                                        value={formData.monthlyCalls.toString()}
                                        onChange={(value) => handleInputChange('monthlyCalls', parseInt(value) || 0)}
                                        placeholder="1000"
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-primary mb-2">
                                        Average Call Duration (minutes)
                                    </label>
                                    <Input
                                        type="number"
                                        value={formData.avgCallDuration.toString()}
                                        onChange={(value) => handleInputChange('avgCallDuration', parseInt(value) || 0)}
                                        placeholder="5"
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-primary mb-2">
                                        Agent Hourly Rate ($)
                                    </label>
                                    <Input
                                        type="number"
                                        value={formData.agentHourlyRate.toString()}
                                        onChange={(value) => handleInputChange('agentHourlyRate', parseInt(value) || 0)}
                                        placeholder="25"
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-primary mb-2">
                                        Current Resolution Rate (%)
                                    </label>
                                    <Input
                                        type="number"
                                        value={formData.currentResolutionRate.toString()}
                                        onChange={(value) => handleInputChange('currentResolutionRate', parseInt(value) || 0)}
                                        placeholder="70"
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-primary mb-2">
                                        Expected Kai Resolution Rate (%)
                                    </label>
                                    <Input
                                        type="number"
                                        value={formData.kaiResolutionRate.toString()}
                                        onChange={(value) => handleInputChange('kaiResolutionRate', parseInt(value) || 0)}
                                        placeholder="85"
                                        className="w-full"
                                    />
                                </div>

                                <Button
                                    color="primary"
                                    size="lg"
                                    className="w-full"
                                    onClick={calculateROI}
                                    iconTrailing={ArrowRight}
                                >
                                    Calculate ROI
                                </Button>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="space-y-6">
                            <div className="bg-secondary rounded-2xl p-8">
                                <h2 className="text-2xl font-semibold text-primary mb-8">
                                    Your Potential Savings
                                </h2>
                                
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="flex items-center gap-4 p-4 bg-white rounded-lg">
                                        <div className="size-12 rounded-full bg-green-100 flex items-center justify-center">
                                            <svg className="size-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-primary">
                                                ${results.monthlySavings.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-tertiary">Monthly Savings</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 bg-white rounded-lg">
                                        <div className="size-12 rounded-full bg-blue-100 flex items-center justify-center">
                                            <ChartBreakoutSquare className="size-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-primary">
                                                ${results.annualSavings.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-tertiary">Annual Savings</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 bg-white rounded-lg">
                                        <div className="size-12 rounded-full bg-purple-100 flex items-center justify-center">
                                            <Calculator className="size-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-primary">
                                                {results.roi}%
                                            </div>
                                            <div className="text-sm text-tertiary">ROI</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 bg-white rounded-lg">
                                        <div className="size-12 rounded-full bg-orange-100 flex items-center justify-center">
                                            <Clock className="size-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-primary">
                                                {results.paybackPeriod} months
                                            </div>
                                            <div className="text-sm text-tertiary">Payback Period</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {results.annualSavings > 0 && (
                                <div className="bg-brand/10 border border-brand/20 rounded-2xl p-6">
                                    <h3 className="text-lg font-semibold text-primary mb-2">
                                        Ready to get started?
                                    </h3>
                                    <p className="text-md text-tertiary mb-4">
                                        Based on your calculations, you could save ${results.annualSavings.toLocaleString()} annually with Kai.
                                    </p>
                                    <Button
                                        color="primary"
                                        size="lg"
                                        className="w-full"
                                        iconTrailing={ArrowRight}
                                    >
                                        Start Free Trial
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>



        </div>
    );
}
