import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ExternalLink, Star, Shield, TrendingUp } from "lucide-react";
import "./brokers/page.css";

const BROKERS = [
    {
        name: "IQ Option",
        logo: "🎯",
        rating: 4.8,
        minDeposit: "$10",
        bonus: "Up to 100%",
        features: ["Low minimum deposit", "Mobile app", "Demo account", "24/7 Support"],
        link: "#",
    },
    {
        name: "Pocket Option",
        logo: "📱",
        rating: 4.7,
        minDeposit: "$5",
        bonus: "50% Bonus",
        features: ["Social trading", "Tournaments", "Fast withdrawals", "100+ assets"],
        link: "#",
    },
    {
        name: "Olymp Trade",
        logo: "⚡",
        rating: 4.6,
        minDeposit: "$10",
        bonus: "Welcome bonus",
        features: ["Fixed time trades", "Free education", "Demo account", "Low fees"],
        link: "#",
    },
    {
        name: "Binary.com",
        logo: "💎",
        rating: 4.5,
        minDeposit: "$5",
        bonus: "Deposit bonus",
        features: ["Regulated broker", "Multiple platforms", "24/7 trading", "Low commissions"],
        link: "#",
    },
];

export default function BrokersPage() {
    return (
        <>
            <Navbar />
            <main className="brokers-page">
                <div className="container">
                    <div className="brokers-header">
                        <h1>Recommended Brokers</h1>
                        <p>Trusted binary options brokers for your trading journey</p>
                    </div>

                    <div className="info-boxes">
                        <Card variant="glass">
                            <div className="info-box">
                                <Shield size={32} />
                                <h3>Verified & Regulated</h3>
                                <p>All brokers are verified and regulated by financial authorities</p>
                            </div>
                        </Card>
                        <Card variant="glass">
                            <div className="info-box">
                                <TrendingUp size={32} />
                                <h3>Best Rates</h3>
                                <p>Competitive spreads and high return rates for maximum profit</p>
                            </div>
                        </Card>
                    </div>

                    <div className="brokers-grid">
                        {BROKERS.map((broker) => (
                            <Card key={broker.name} className="broker-card" hoverable>
                                <div className="broker-header">
                                    <div className="broker-logo">{broker.logo}</div>
                                    <div className="broker-info">
                                        <h2>{broker.name}</h2>
                                        <div className="broker-rating">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    fill={i < Math.floor(broker.rating) ? "var(--accent-green)" : "none"}
                                                    color="var(--accent-green)"
                                                />
                                            ))}
                                            <span>{broker.rating}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="broker-details">
                                    <div className="detail-row">
                                        <span className="detail-label">Min Deposit:</span>
                                        <span className="detail-value">{broker.minDeposit}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Bonus:</span>
                                        <span className="detail-value highlight">{broker.bonus}</span>
                                    </div>
                                </div>

                                <div className="broker-features">
                                    {broker.features.map((feature) => (
                                        <div key={feature} className="feature-tag">
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <Button variant="primary" size="lg" className="broker-button">
                                    <span>Visit Broker</span>
                                    <ExternalLink size={18} />
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
