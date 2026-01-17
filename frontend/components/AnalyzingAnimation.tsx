"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, FileSearch, Sparkles, Target, Zap, CheckCircle, Search, Star, TrendingUp, Users, Award, Layers, Code, Globe, Heart, Lightbulb } from "lucide-react";

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

const FLOATING_ICONS = [Briefcase, Star, Target, Zap, Sparkles, Search, Award, Layers, Code, Globe, Heart, Lightbulb];

// Generate non-intersecting positions for floating icons
function generateNonIntersectingPositions(count: number, width: number, height: number, iconSize: number = 100) {
    const positions: { x: number; y: number }[] = [];
    const minDistance = iconSize * 1.8; // Minimum distance between icons
    const maxAttempts = 100;

    // Define zones to ensure icons are spread across the screen
    const zones = [
        { x: 0, y: 0, w: width / 3, h: height / 3 },           // top-left
        { x: width / 3, y: 0, w: width / 3, h: height / 3 },    // top-center
        { x: (2 * width) / 3, y: 0, w: width / 3, h: height / 3 }, // top-right
        { x: 0, y: height / 3, w: width / 4, h: height / 3 },   // middle-left
        { x: (3 * width) / 4, y: height / 3, w: width / 4, h: height / 3 }, // middle-right
        { x: 0, y: (2 * height) / 3, w: width / 3, h: height / 3 }, // bottom-left
        { x: width / 3, y: (2 * height) / 3, w: width / 3, h: height / 3 }, // bottom-center
        { x: (2 * width) / 3, y: (2 * height) / 3, w: width / 3, h: height / 3 }, // bottom-right
        { x: width / 6, y: height / 6, w: width / 4, h: height / 4 }, // inner top-left
        { x: (2 * width) / 3, y: height / 6, w: width / 4, h: height / 4 }, // inner top-right
        { x: width / 6, y: (2 * height) / 3, w: width / 4, h: height / 4 }, // inner bottom-left
        { x: (2 * width) / 3, y: (2 * height) / 3, w: width / 4, h: height / 4 }, // inner bottom-right
    ];

    for (let i = 0; i < count; i++) {
        let attempts = 0;
        let validPosition = false;
        let newX = 0, newY = 0;

        // Use zones to spread icons across the screen
        const zone = zones[i % zones.length];

        while (!validPosition && attempts < maxAttempts) {
            // Generate position within the assigned zone
            newX = zone.x + Math.random() * (zone.w - iconSize);
            newY = zone.y + Math.random() * (zone.h - iconSize);

            // Check distance from center (avoid the main content area)
            const centerX = width / 2;
            const centerY = height / 2;
            const distFromCenter = Math.sqrt(Math.pow(newX - centerX, 2) + Math.pow(newY - centerY, 2));

            if (distFromCenter < 200) {
                attempts++;
                continue;
            }

            // Check distance from all existing positions
            validPosition = positions.every(pos => {
                const dist = Math.sqrt(Math.pow(newX - pos.x, 2) + Math.pow(newY - pos.y, 2));
                return dist >= minDistance;
            });

            attempts++;
        }

        positions.push({ x: newX, y: newY });
    }

    return positions;
}

export function AnalyzingAnimation() {
    const [progress, setProgress] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);
    const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

    // Generate positions only once on mount
    const iconPositions = useMemo(() => {
        return generateNonIntersectingPositions(FLOATING_ICONS.length, dimensions.width, dimensions.height);
    }, [dimensions]);

    useEffect(() => {
        // Set dimensions on client side
        if (typeof window !== 'undefined') {
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        }
    }, []);

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
        <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(251,113,133,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,113,133,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Floating Icons - More icons with non-intersecting positions */}
            {FLOATING_ICONS.map((Icon, i) => (
                <motion.div
                    key={i}
                    className="absolute text-primary/20"
                    initial={{
                        x: iconPositions[i]?.x || 0,
                        y: iconPositions[i]?.y || 0,
                    }}
                    animate={{
                        x: [null, (iconPositions[i]?.x || 0) + Math.sin(i) * 30],
                        y: [null, (iconPositions[i]?.y || 0) + Math.cos(i) * 30],
                        rotate: [0, 360],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        duration: 10 + i * 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                >
                    <Icon className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
                </motion.div>
            ))}

            {/* Pulsing Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full border border-primary/20"
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
                            className="absolute inset-0 rounded-full border-4 border-primary/30"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Inner Circle with Icon */}
                        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-xl flex items-center justify-center border border-primary/30">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={messageIndex}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <CurrentIcon className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
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
                                    <stop offset="0%" stopColor="hsl(0, 72%, 65%)" />
                                    <stop offset="100%" stopColor="hsl(0, 72%, 75%)" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Percentage Badge */}
                    <motion.div
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary px-4 py-1.5 rounded-full shadow-lg"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        <span className="text-primary-foreground font-bold text-lg">{Math.round(progress)}%</span>
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
                                            ? "bg-primary/20 border-primary text-primary"
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
                                <span className={`text-xs sm:text-sm font-medium transition-colors ${isComplete ? "text-green-400" : isActive ? "text-primary" : "text-slate-500"
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
                            className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary"
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
