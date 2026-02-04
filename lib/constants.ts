export const CURRENCY_PAIRS = [
    "EUR/USD",
    "GBP/USD",
    "USD/JPY",
    "USD/CHF",
    "AUD/USD",
    "USD/CAD",
    "NZD/USD",
    "EUR/GBP",
    "EUR/JPY",
    "GBP/JPY",
] as const;

export const ALGORITHMS = ["Adaptive", "Neural", "Trend"] as const;

export const SIGNAL_TYPES = ["CALL", "PUT"] as const;

export const SUBSCRIPTION_TIERS = {
    free: {
        name: "Free",
        price: 0,
        signalsPerDay: 5,
        features: ["5 Signals per day", "Basic algorithms", "Email notifications"],
    },
    basic: {
        name: "Basic",
        price: 29,
        signalsPerDay: 20,
        features: [
            "20 Signals per day",
            "All algorithms",
            "Email & Push notifications",
            "Signal history",
        ],
    },
    premium: {
        name: "Premium",
        price: 79,
        signalsPerDay: -1, // Unlimited
        features: [
            "Unlimited signals",
            "All algorithms",
            "Priority signals",
            "Advanced analytics",
            "24/7 Support",
        ],
    },
    vip: {
        name: "VIP",
        price: 199,
        signalsPerDay: -1,
        features: [
            "Everything in Premium",
            "Exclusive VIP signals",
            "Personal account manager",
            "Custom strategy development",
            "API access",
        ],
    },
} as const;

export const POWER_THRESHOLD = {
    MIN: 65,
    MAX: 95,
    HIGH: 85,
    MEDIUM: 75,
} as const;
