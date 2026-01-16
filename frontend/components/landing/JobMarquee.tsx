"use client";

import { motion } from "framer-motion";
import { SiGoogle, SiGoldmansachs, SiApple, SiNetflix, SiAmazon, SiMeta, SiDatabricks, SiOpenai, SiAirbnb, SiUber, SiSpotify, SiStripe, SiCoinbase, SiSlack, SiZoom, SiAnthropic, SiTata, SiWalmart } from "react-icons/si";

const COMPANIES = [
    { name: "Google", icon: SiGoogle, color: "hover:text-red-500" },
    { name: "Goldman Sachs", icon: SiGoldmansachs, color: "hover:text-blue-500" },
    { name: "Apple", icon: SiApple, color: "hover:text-gray-200" },
    { name: "Netflix", icon: SiNetflix, color: "hover:text-red-600" },
    { name: "Amazon", icon: SiAmazon, color: "hover:text-orange-500" },
    { name: "Meta", icon: SiMeta, color: "hover:text-blue-400" },
    { name: "Databricks", icon: SiDatabricks, color: "hover:text-red-400" },
    { name: "OpenAI", icon: SiOpenai, color: "hover:text-green-500" },
    { name: "Airbnb", icon: SiAirbnb, color: "hover:text-pink-500" },
    { name: "Uber", icon: SiUber, color: "hover:text-black" },
    { name: "Spotify", icon: SiSpotify, color: "hover:text-green-500" },
    { name: "Stripe", icon: SiStripe, color: "hover:text-indigo-500" },
    { name: "Coinbase", icon: SiCoinbase, color: "hover:text-blue-500" },
    { name: "Slack", icon: SiSlack, color: "hover:text-purple-500" },
    { name: "Zoom", icon: SiZoom, color: "hover:text-blue-500" },
    { name: "Tata", icon: SiTata, color: "hover:text-blue-500" },
    { name: "Walmart", icon: SiWalmart, color: "hover:text-blue-500" },
    { name: "Anthropic", icon: SiAnthropic, color: "hover:text-blue-500" },


];

export function JobMarquee() {
    return (
        <div className="relative w-full overflow-hidden py-10 fade-mask bg-background/50 backdrop-blur-sm">
            <div className="flex w-full">
                <motion.div
                    className="flex gap-12 sm:gap-16 md:gap-24 whitespace-nowrap items-center w-max"
                    animate={{ x: [0, -2000] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 40,
                    }}
                >
                    {[...COMPANIES, ...COMPANIES, ...COMPANIES, ...COMPANIES].map((company, idx) => (
                        <div
                            key={idx}
                            className={`flex items-center gap-3 text-2xl sm:text-3xl font-bold text-muted-foreground/40 transition-colors cursor-default select-none group ${company.color}`}
                        >
                            <company.icon className="w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:scale-110" />
                            <span className="hidden md:inline">{company.name}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
