export function clsx(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number, currency: string = "USD"): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    }).format(amount);
}

export function formatPercentage(value: number): string {
    return `${value.toFixed(1)}%`;
}

export function calculateTimeRemaining(expiryTime: number): {
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
} {
    const total = Math.max(0, expiryTime - Date.now());
    const hours = Math.floor(total / (1000 * 60 * 60));
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((total % (1000 * 60)) / 1000);

    return { hours, minutes, seconds, total };
}

export function getPowerColor(power: number): string {
    if (power >= 85) return "var(--accent-green)";
    if (power >= 75) return "var(--warning)";
    return "var(--error)";
}

export function getSignalStatus(signal: {
    expiryTime: number;
    status: string;
}): "active" | "expired" | "won" | "lost" {
    if (signal.status !== "active") {
        return signal.status as "expired" | "won" | "lost";
    }

    if (signal.expiryTime < Date.now()) {
        return "expired";
    }

    return "active";
}
