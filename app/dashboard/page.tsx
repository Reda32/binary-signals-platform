"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Navbar } from "../../components/Navbar";
import { SignalCard } from "../../components/SignalCard";
import { Modal } from "../../components/ui/Modal";
import { Card } from "../../components/ui/Card";
import { Filter, TrendingUp, Target, Award } from "lucide-react";
import { CURRENCY_PAIRS, ALGORITHMS } from "../../lib/constants";
import "./page.css";

export default function DashboardPage() {
    const signals = useQuery(api.signals.getActiveSignals);
    const stats = useQuery(api.signals.getSignalsStats);

    const [selectedSignal, setSelectedSignal] = useState<any>(null);
    const [filterPair, setFilterPair] = useState<string>("");
    const [filterAlgorithm, setFilterAlgorithm] = useState<string>("");
    const [filterMinPower, setFilterMinPower] = useState<number>(0);
    const [showFilters, setShowFilters] = useState(false);

    // Filter signals
    const filteredSignals = signals?.filter(signal => {
        if (filterPair && signal.pair !== filterPair) return false;
        if (filterAlgorithm && signal.algorithm !== filterAlgorithm) return false;
        if (filterMinPower && signal.power < filterMinPower) return false;
        return true;
    });

    return (
        <>
            <Navbar />
            <main className="dashboard-page">
                <div className="container">
                    <div className="dashboard-header">
                        <div>
                            <h1>Live Trading Signals</h1>
                            <p className="dashboard-subtitle">Real-time binary options signals powered by AI</p>
                        </div>
                        <button
                            className="filter-toggle"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <Filter size={20} />
                            Filters
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div className="stats-grid">
                        <Card variant="gradient">
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <TrendingUp size={24} />
                                </div>
                                <div className="stat-content">
                                    <span className="stat-label">Active Signals</span>
                                    <span className="stat-value">{stats?.active || 0}</span>
                                </div>
                            </div>
                        </Card>

                        <Card variant="gradient">
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <Award size={24} />
                                </div>
                                <div className="stat-content">
                                    <span className="stat-label">Win Rate</span>
                                    <span className="stat-value">{stats?.winRate || 0}%</span>
                                </div>
                            </div>
                        </Card>

                        <Card variant="gradient">
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <Target size={24} />
                                </div>
                                <div className="stat-content">
                                    <span className="stat-label">Total Signals</span>
                                    <span className="stat-value">{stats?.total || 0}</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Filters */}
                    {showFilters && (
                        <Card className="filters-card">
                            <div className="filters-grid">
                                <div className="filter-group">
                                    <label>Currency Pair</label>
                                    <select
                                        value={filterPair}
                                        onChange={(e) => setFilterPair(e.target.value)}
                                    >
                                        <option value="">All Pairs</option>
                                        {CURRENCY_PAIRS.map(pair => (
                                            <option key={pair} value={pair}>{pair}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <label>Algorithm</label>
                                    <select
                                        value={filterAlgorithm}
                                        onChange={(e) => setFilterAlgorithm(e.target.value)}
                                    >
                                        <option value="">All Algorithms</option>
                                        {ALGORITHMS.map(algo => (
                                            <option key={algo} value={algo}>{algo}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <label>Minimum Power</label>
                                    <select
                                        value={filterMinPower}
                                        onChange={(e) => setFilterMinPower(Number(e.target.value))}
                                    >
                                        <option value="0">All Powers</option>
                                        <option value="70">70%+</option>
                                        <option value="75">75%+</option>
                                        <option value="80">80%+</option>
                                        <option value="85">85%+</option>
                                        <option value="90">90%+</option>
                                    </select>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Signals Grid */}
                    <div className="signals-grid">
                        {!filteredSignals && (
                            <div className="loading-state">
                                <div className="spinner"></div>
                                <p>Loading signals...</p>
                            </div>
                        )}

                        {filteredSignals && filteredSignals.length === 0 && (
                            <div className="empty-state">
                                <p>No active signals found</p>
                            </div>
                        )}

                        {filteredSignals?.map((signal: any) => (
                            <SignalCard
                                key={signal._id}
                                signal={signal}
                                onClick={() => setSelectedSignal(signal)}
                            />
                        ))}
                    </div>
                </div>
            </main>

            {/* Signal Details Modal */}
            {selectedSignal && (
                <Modal
                    isOpen={!!selectedSignal}
                    onClose={() => setSelectedSignal(null)}
                    title="Signal Details"
                    size="md"
                >
                    <div className="signal-details-modal">
                        <div className="modal-header-info">
                            <h2>{selectedSignal.pair}</h2>
                            <span className={`badge ${selectedSignal.type.toLowerCase()}`}>
                                {selectedSignal.type}
                            </span>
                        </div>

                        <div className="modal-stats">
                            <div className="modal-stat">
                                <span className="modal-stat-label">Power</span>
                                <span className="modal-stat-value">{selectedSignal.power}%</span>
                            </div>
                            <div className="modal-stat">
                                <span className="modal-stat-label">Algorithm</span>
                                <span className="modal-stat-value">{selectedSignal.algorithm}</span>
                            </div>
                        </div>

                        <div className="modal-prices">
                            <div className="price-item">
                                <span className="price-label">Entry Price</span>
                                <span className="price-value">{selectedSignal.entryPrice.toFixed(4)}</span>
                            </div>
                            {selectedSignal.targetPrice && (
                                <div className="price-item">
                                    <span className="price-label">Target Price</span>
                                    <span className="price-value success">{selectedSignal.targetPrice.toFixed(4)}</span>
                                </div>
                            )}
                            {selectedSignal.stopLoss && (
                                <div className="price-item">
                                    <span className="price-label">Stop Loss</span>
                                    <span className="price-value error">{selectedSignal.stopLoss.toFixed(4)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}
