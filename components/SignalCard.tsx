"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card } from "../ui/Card";
import { formatDistanceToNow } from "date-fns";
import "./SignalCard.css";

type Signal = {
    _id: string;
    _creationTime: number;
    pair: string;
    type: "CALL" | "PUT";
    power: number;
    algorithm: "Adaptive" | "Neural" | "Trend";
    entryPrice: number;
    targetPrice?: number;
    stopLoss?: number;
    expiryTime: number;
    status: "active" | "expired" | "won" | "lost";
    createdAt: number;
};

interface SignalCardProps {
    signal: Signal;
    isNew?: boolean;
    onClick?: () => void;
}

export function SignalCard({ signal, isNew = false, onClick }: SignalCardProps) {
    const timeLeft = Math.max(0, signal.expiryTime - Date.now());
    const minutes = Math.floor(timeLeft / 60000);

    return (
        <div
            className={`signal-card ${isNew ? 'flash' : ''}`}
            onClick={onClick}
        >
            <Card variant={isNew ? "glass" : "default"} hoverable>
                <div className="signal-card-header">
                    <div className="signal-pair-container">
                        <h3 className="signal-pair-name">{signal.pair}</h3>
                        <span className={`badge ${signal.type.toLowerCase()}`}>
                            {signal.type}
                        </span>
                    </div>
                    <div className={`signal-power ${signal.power >= 85 ? 'power-high' : signal.power >= 75 ? 'power-medium' : 'power-low'}`}>
                        <span className="power-percentage">{signal.power}%</span>
                    </div>
                </div>

                <div className="signal-card-body">
                    <div className="signal-info-grid">
                        <div className="info-item">
                            <span className="info-label">Algorithm</span>
                            <span className="info-value algorithm-badge">
                                {signal.algorithm}
                            </span>
                        </div>

                        <div className="info-item">
                            <span className="info-label">Entry Price</span>
                            <span className="info-value">{signal.entryPrice.toFixed(4)}</span>
                        </div>

                        {signal.targetPrice && (
                            <div className="info-item">
                                <span className="info-label">Target</span>
                                <span className="info-value">{signal.targetPrice.toFixed(4)}</span>
                            </div>
                        )}

                        {signal.stopLoss && (
                            <div className="info-item">
                                <span className="info-label">Stop Loss</span>
                                <span className="info-value">{signal.stopLoss.toFixed(4)}</span>
                            </div>
                        )}
                    </div>

                    <div className="signal-card-footer">
                        <div className="time-info">
                            <span className="time-label">Expires in</span>
                            <span className="time-value">{minutes}m</span>
                        </div>
                        <div className="created-time">
                            {formatDistanceToNow(signal.createdAt, { addSuffix: true })}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
