import { CURRENCY_PAIRS, ALGORITHMS, POWER_THRESHOLD } from "../lib/constants";

type SignalType = "CALL" | "PUT";
type Algorithm = "Adaptive" | "Neural" | "Trend";

interface GeneratedSignal {
    pair: string;
    type: SignalType;
    power: number;
    algorithm: Algorithm;
    entryPrice: number;
    targetPrice?: number;
    stopLoss?: number;
    expiryMinutes: number;
}

// Simulated price data (in production, this would come from a real API)
const BASE_PRICES: Record<string, number> = {
    "EUR/USD": 1.0875,
    "GBP/USD": 1.2654,
    "USD/JPY": 148.32,
    "USD/CHF": 0.8945,
    "AUD/USD": 0.6543,
    "USD/CAD": 1.3587,
    "NZD/USD": 0.6121,
    "EUR/GBP": 0.8598,
    "EUR/JPY": 161.25,
    "GBP/JPY": 187.54,
};

// Adaptive Algorithm - Adapts to market volatility
export function adaptiveAlgorithm(pair: string): GeneratedSignal | null {
    const basePrice = BASE_PRICES[pair];
    if (!basePrice) return null;

    // Simulate market analysis
    const volatility = Math.random() * 0.5 + 0.5; // 0.5 to 1.0
    const trend = Math.random() - 0.5; // -0.5 to 0.5

    // Calculate power based on volatility and trend strength
    const trendStrength = Math.abs(trend);
    const basePower = 70 + (trendStrength * 25);
    const power = Math.min(POWER_THRESHOLD.MAX, Math.max(POWER_THRESHOLD.MIN, basePower));

    // Determine signal type
    const type: SignalType = trend > 0 ? "CALL" : "PUT";

    // Calculate entry, target, and stop loss
    const priceVariation = basePrice * volatility * 0.001;
    const entryPrice = basePrice + (Math.random() - 0.5) * priceVariation;
    const targetPrice = type === "CALL"
        ? entryPrice * 1.002
        : entryPrice * 0.998;
    const stopLoss = type === "CALL"
        ? entryPrice * 0.999
        : entryPrice * 1.001;

    return {
        pair,
        type,
        power: Math.round(power * 10) / 10,
        algorithm: "Adaptive",
        entryPrice: Math.round(entryPrice * 10000) / 10000,
        targetPrice: Math.round(targetPrice * 10000) / 10000,
        stopLoss: Math.round(stopLoss * 10000) / 10000,
        expiryMinutes: 15 + Math.floor(Math.random() * 30), // 15-45 minutes
    };
}

// Neural Algorithm - Simulates neural network pattern recognition
export function neuralAlgorithm(pair: string): GeneratedSignal | null {
    const basePrice = BASE_PRICES[pair];
    if (!basePrice) return null;

    //  Simulate neural network confidence
    const confidence = Math.random();

    // Only generate signals with high confidence (> 0.6)
    if (confidence < 0.6) return null;

    // Power based on neural network confidence
    const power = POWER_THRESHOLD.MIN + (confidence * (POWER_THRESHOLD.MAX - POWER_THRESHOLD.MIN));

    // Pattern recognition (simulated)
    const pattern = Math.random();
    const type: SignalType = pattern > 0.5 ? "CALL" : "PUT";

    const priceVariation = basePrice * 0.0015;
    const entryPrice = basePrice + (Math.random() - 0.5) * priceVariation;
    const targetPrice = type === "CALL"
        ? entryPrice * 1.0025
        : entryPrice * 0.9975;
    const stopLoss = type === "CALL"
        ? entryPrice * 0.9985
        : entryPrice * 1.0015;

    return {
        pair,
        type,
        power: Math.round(power * 10) / 10,
        algorithm: "Neural",
        entryPrice: Math.round(entryPrice * 10000) / 10000,
        targetPrice: Math.round(targetPrice * 10000) / 10000,
        stopLoss: Math.round(stopLoss * 10000) / 10000,
        expiryMinutes: 20 + Math.floor(Math.random() * 25),
    };
}

// Trend Algorithm - Follows market trends
export function trendAlgorithm(pair: string): GeneratedSignal | null {
    const basePrice = BASE_PRICES[pair];
    if (!basePrice) return null;

    // Simulate trend analysis
    const shortTerm = Math.random() - 0.5;
    const longTerm = Math.random() - 0.5;

    // Trend alignment gives higher power
    const alignment = Math.abs(shortTerm - longTerm);
    const isAligned = alignment < 0.3 && Math.sign(shortTerm) === Math.sign(longTerm);

    if (!isAligned) return null;

    const trendStrength = (Math.abs(shortTerm) + Math.abs(longTerm)) / 2;
    const power = POWER_THRESHOLD.MIN + (trendStrength * 2 * (POWER_THRESHOLD.MAX - POWER_THRESHOLD.MIN));

    const type: SignalType = shortTerm > 0 ? "CALL" : "PUT";

    const priceVariation = basePrice * 0.002;
    const entryPrice = basePrice + (Math.random() - 0.5) * priceVariation;
    const targetPrice = type === "CALL"
        ? entryPrice * 1.003
        : entryPrice * 0.997;
    const stopLoss = type === "CALL"
        ? entryPrice * 0.998
        : entryPrice * 1.002;

    return {
        pair,
        type,
        power: Math.min(POWER_THRESHOLD.MAX, Math.max(POWER_THRESHOLD.MIN, Math.round(power * 10) / 10)),
        algorithm: "Trend",
        entryPrice: Math.round(entryPrice * 10000) / 10000,
        targetPrice: Math.round(targetPrice * 10000) / 10000,
        stopLoss: Math.round(stopLoss * 10000) / 10000,
        expiryMinutes: 30 + Math.floor(Math.random() * 30),
    };
}

// Generate signals for all pairs using all algorithms
export function generateAllSignals(): GeneratedSignal[] {
    const signals: GeneratedSignal[] = [];
    const algorithms = [adaptiveAlgorithm, neuralAlgorithm, trendAlgorithm];

    for (const pair of CURRENCY_PAIRS) {
        // Randomly select 1-2 algorithms per pair
        const numAlgorithms = Math.floor(Math.random() * 2) + 1;
        const selectedAlgorithms = algorithms
            .sort(() => Math.random() - 0.5)
            .slice(0, numAlgorithms);

        for (const algorithm of selectedAlgorithms) {
            const signal = algorithm(pair);
            if (signal) {
                signals.push(signal);
            }
        }
    }

    return signals;
}
