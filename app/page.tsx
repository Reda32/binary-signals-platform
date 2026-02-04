import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Button } from "../components/ui/Button";
import { TrendingUp, Zap, Shield, BarChart3 } from "lucide-react";
import "./page.css";

export default function HomePage() {
    return (
        <>
            <Navbar />
            <main>
                {/* Hero Section */}
                <section className="hero-section gradient-bg">
                    <div className="container">
                        <div className="hero-content">
                            <div className="hero-text">
                                <h1 className="hero-title">
                                    Real-Time <span className="gradient-text">Binary Options</span> Signals
                                </h1>
                                <p className="hero-description">
                                    Get high-accuracy trading signals powered by advanced AI algorithms.
                                    Adaptive, Neural, and Trend analysis for maximum profit potential.
                                </p>
                                <div className="hero-stats">
                                    <div className="stat-item">
                                        <span className="stat-value">95%</span>
                                        <span className="stat-label">Max Accuracy</span>
                                    </div>
                                    <div className="stat-divider"></div>
                                    <div className="stat-item">
                                        <span className="stat-value">24/7</span>
                                        <span className="stat-label">Live Signals</span>
                                    </div>
                                    <div className="stat-divider"></div>
                                    <div className="stat-item">
                                        <span className="stat-value">3</span>
                                        <span className="stat-label">AI Algorithms</span>
                                    </div>
                                </div>
                                <div className="hero-cta">
                                    <Link href="/dashboard">
                                        <Button variant="primary" size="lg">
                                            Start Trading Now
                                        </Button>
                                    </Link>
                                    <Link href="#features">
                                        <Button variant="secondary" size="lg">
                                            Learn More
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="hero-image">
                                <div className="signal-preview-card card glass pulse-glow">
                                    <div className="signal-header">
                                        <span className="signal-pair">EUR/USD</span>
                                        <span className="badge call">CALL</span>
                                    </div>
                                    <div className="signal-power">
                                        <span className="power-label">Power</span>
                                        <span className="power-value">89%</span>
                                    </div>
                                    <div className="signal-details">
                                        <div className="detail-item">
                                            <span className="detail-label">Algorithm</span>
                                            <span className="detail-value">Neural</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Entry</span>
                                            <span className="detail-value">1.0875</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="features-section section">
                    <div className="container">
                        <h2 className="section-title text-center">Why Choose Our Signals?</h2>
                        <p className="section-description text-center">
                            Advanced technology meets proven trading strategies
                        </p>

                        <div className="features-grid">
                            <div className="feature-card card card-hoverable">
                                <div className="feature-icon">
                                    <TrendingUp size={40} />
                                </div>
                                <h3>Real-Time Signals</h3>
                                <p>
                                    Get instant notifications for new trading opportunities. Our system generates
                                    signals 24/7 across multiple currency pairs.
                                </p>
                            </div>

                            <div className="feature-card card card-hoverable">
                                <div className="feature-icon">
                                    <Zap size={40} />
                                </div>
                                <h3>AI-Powered Algorithms</h3>
                                <p>
                                    Three advanced algorithms (Adaptive, Neural, Trend) analyze market conditions
                                    to deliver high-accuracy signals.
                                </p>
                            </div>

                            <div className="feature-card card card-hoverable">
                                <div className="feature-icon">
                                    <Shield size={40} />
                                </div>
                                <h3>65-95% Accuracy</h3>
                                <p>
                                    Our signals are rated by power percentage, giving you confidence in every trade.
                                    Filter by minimum power to match your risk tolerance.
                                </p>
                            </div>

                            <div className="feature-card card card-hoverable">
                                <div className="feature-icon">
                                    <BarChart3 size={40} />
                                </div>
                                <h3>Advanced Analytics</h3>
                                <p>
                                    Track your performance with detailed statistics, win rates, and historical data.
                                    Make informed decisions based on proven results.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section section gradient-bg">
                    <div className="container">
                        <div className="cta-content">
                            <h2>Ready to Start Trading Smarter?</h2>
                            <p>Join thousands of traders using our AI-powered signals</p>
                            <Link href="/dashboard">
                                <Button variant="primary" size="lg">
                                    Get Started for Free
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
