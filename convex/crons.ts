import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Generate new signals every 5 minutes
crons.interval(
    "generate-signals",
    { minutes: 5 },
    internal.signalGenerator.generateSignals
);

// Expire old signals every minute
crons.interval(
    "expire-signals",
    { minutes: 1 },
    internal.signalGenerator.expireOldSignals
);

export default crons;
