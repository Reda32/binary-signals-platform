import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";
import "./Footer.css";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>About</h4>
                        <p>Real-time binary options trading signals with advanced AI algorithms.</p>
                        <div className="social-links">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <Twitter size={20} />
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                <Github size={20} />
                            </a>
                            <a href="mailto:info@binarysignals.com">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link href="/dashboard">Signals</Link></li>
                            <li><Link href="/brokers">Brokers</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                            <li><Link href="/about">About Us</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Legal</h4>
                        <ul>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/terms">Terms of Service</Link></li>
                            <li><Link href="/disclaimer">Risk Disclaimer</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Newsletter</h4>
                        <p>Get the latest signals and updates.</p>
                        <div className="newsletter-form">
                            <input type="email" placeholder="Enter your email" />
                            <button>Subscribe</button>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} BinarySignals. All rights reserved.</p>
                    <p className="disclaimer">Trading involves risk. Past performance does not guarantee future results.</p>
                </div>
            </div>
        </footer>
    );
}
