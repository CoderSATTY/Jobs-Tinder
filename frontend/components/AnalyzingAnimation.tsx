"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, FileSearch, Sparkles, Target, Zap, CheckCircle, Search, Star, TrendingUp, Users } from "lucide-react";

const ANALYSIS_MESSAGES = [
    { text: "Reading your resume...", icon: FileSearch },
    { text: "Extracting your skills...", icon: Sparkles },
    { text: "Understanding your experience...", icon: Briefcase },
    { text: "Analyzing career trajectory...", icon: TrendingUp },
    { text: "Identifying strengths...", icon: Star },
    { text: "Matching with opportunities...", icon: Target },
    { text: "Finding perfect roles...", icon: Search },
    { text: "Ranking job matches...", icon: Zap },
    { text: "Connecting you with employers...", icon: Users },
    { text: "Almost there...", icon: CheckCircle },
];

const FLOATING_ICONS = [Briefcase, Star, Target, Zap, Sparkles, Search];

export function AnalyzingAnimation() {
    const [progress, setProgress] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const duration = 8000;
        const intervalTime = 50;
        const steps = duration / intervalTime;
        const increment = 100 / steps;

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 98) return 98;
                const randomVariation = Math.random() * 0.5;
                return Math.min(prev + increment + randomVariation, 99);
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);

    // Rotate through messages
    useEffect(() => {
        const messageTimer = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % ANALYSIS_MESSAGES.length);
        }, 2000);
        return () => clearInterval(messageTimer);
    }, []);

    const currentMessage = ANALYSIS_MESSAGES[messageIndex];
    const CurrentIcon = currentMessage.icon;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Floating Icons */}
            {FLOATING_ICONS.map((Icon, i) => (
                <motion.div
                    key={i}
                    className="absolute text-indigo-500/20"
                    initial={{
                        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                    }}
                    animate={{
                        x: [null, Math.random() * 400 - 200 + (i * 150)],
                        y: [null, Math.random() * 400 - 200 + (i * 100)],
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                >
                    <Icon className="w-16 h-16 sm:w-24 sm:h-24" />
                </motion.div>
            ))}

            {/* Pulsing Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full border border-indigo-500/20"
                        initial={{ width: 100, height: 100, opacity: 0.5 }}
                        animate={{
                            width: [100, 600],
                            height: [100, 600],
                            opacity: [0.5, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 1,
                            ease: "easeOut",
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
                {/* Central Animation */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", duration: 1 }}
                    className="relative mb-12"
                >
                    {/* Outer Ring */}
                    <div className="relative w-40 h-40 sm:w-48 sm:h-48">
                        <motion.div
                            className="absolute inset-0 rounded-full border-4 border-indigo-500/30"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Inner Circle with Icon */}
                        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-xl flex items-center justify-center border border-indigo-500/30">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={messageIndex}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <CurrentIcon className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-400" />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Progress Ring */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle
                                cx="50%"
                                cy="50%"
                                r="45%"
                                fill="none"
                                stroke="url(#progressGradient)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray={`${progress * 2.83} 283`}
                                className="transition-all duration-300"
                            />
                            <defs>
                                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="100%" stopColor="#a855f7" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Percentage Badge */}
                    <motion.div
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1.5 rounded-full shadow-lg"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        <span className="text-white font-bold text-lg">{Math.round(progress)}%</span>
                    </motion.div>
                </motion.div>

                {/* Dynamic Message */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={messageIndex}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                            {currentMessage.text}
                        </h2>
                    </motion.div>
                </AnimatePresence>

                {/* Progress Steps */}
                <div className="flex gap-3 sm:gap-6 mb-8">
                    {["Skills", "Experience", "Matching", "Results"].map((step, i) => {
                        const stepProgress = (i + 1) * 25;
                        const isComplete = progress >= stepProgress;
                        const isActive = progress >= stepProgress - 25 && progress < stepProgress;

                        return (
                            <motion.div
                                key={step}
                                className="flex flex-col items-center gap-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <motion.div
                                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isComplete
                                            ? "bg-green-500 border-green-500 text-white"
                                            : isActive
                                                ? "bg-indigo-500/20 border-indigo-500 text-indigo-400"
                                                : "bg-slate-800 border-slate-700 text-slate-500"
                                        }`}
                                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                                    transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
                                >
                                    {isComplete ? (
                                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                                    ) : (
                                        <span className="font-bold text-sm">{i + 1}</span>
                                    )}
                                </motion.div>
                                <span className={`text-xs sm:text-sm font-medium transition-colors ${isComplete ? "text-green-400" : isActive ? "text-indigo-400" : "text-slate-500"
                                    }`}>
                                    {step}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom Bar */}
                <div className="w-full max-w-md">
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                            style={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                    <p className="text-center text-slate-500 text-sm mt-4">
                        Finding your perfect career opportunities...
                    </p>
                </div>
            </div>
        </div>
    );
}
