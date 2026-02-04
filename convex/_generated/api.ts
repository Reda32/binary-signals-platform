/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
    ApiFromModules,
    FilterApi,
    FunctionReference,
} from "convex/server";
import type * as algorithms_signals from "../algorithms/signals.js";
import type * as crons from "../crons.js";
import type * as signalGenerator from "../signalGenerator.js";
import type * as signals from "../signals.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export const api: ApiFromModules<{
    "algorithms/signals": typeof algorithms_signals;
    crons: typeof crons;
    signalGenerator: typeof signalGenerator;
    signals: typeof signals;
    users: typeof users;
}> = {
    "algorithms/signals": {
        generateAllSignals: {
            _name: "algorithms/signals:generateAllSignals",
        } as FunctionReference<"action">,
    },
    crons: {},
    signalGenerator: {
        generateAllSignals: {
            _name: "signalGenerator:generateAllSignals",
        } as FunctionReference<"mutation">,
        expireOldSignals: {
            _name: "signalGenerator:expireOldSignals",
        } as FunctionReference<"mutation">,
    },
    signals: {
        getActiveSignals: {
            _name: "signals:getActiveSignals",
        } as FunctionReference<"query">,
        getSignalsWithFilters: {
            _name: "signals:getSignalsWithFilters",
        } as FunctionReference<"query">,
        getSignalById: {
            _name: "signals:getSignalById",
        } as FunctionReference<"query">,
        getSignalStats: {
            _name: "signals:getSignalStats",
        } as FunctionReference<"query">,
        createSignal: {
            _name: "signals:createSignal",
        } as FunctionReference<"mutation">,
        updateSignalStatus: {
            _name: "signals:updateSignalStatus",
        } as FunctionReference<"mutation">,
    },
    users: {
        getCurrentUser: {
            _name: "users:getCurrentUser",
        } as FunctionReference<"query">,
        getAllUsers: {
            _name: "users:getAllUsers",
        } as FunctionReference<"query">,
        updateUserProfile: {
            _name: "users:updateUserProfile",
        } as FunctionReference<"mutation">,
        updateUserSubscription: {
            _name: "users:updateUserSubscription",
        } as FunctionReference<"mutation">,
    },
};
