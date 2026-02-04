import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Mail, MapPin, Phone } from "lucide-react";
import "./contact/page.css";

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <main className="contact-page">
                <div className="container">
                    <div className="contact-header">
                        <h1>Get in Touch</h1>
                        <p>Have questions? We'd love to hear from you.</p>
                    </div>

                    <div className="contact-content">
                        <Card className="contact-form-card">
                            <form className="contact-form">
                                <Input label="Name" placeholder="Your name" required />
                                <Input label="Email" type="email" placeholder="your@email.com" required />
                                <Input label="Subject" placeholder="What's this about?" required />

                                <div className="input-wrapper">
                                    <label className="input-label">Message</label>
                                    <textarea
                                        className="input"
                                        placeholder="Tell us more..."
                                        rows={6}
                                        required
                                    />
                                </div>

                                <Button variant="primary" size="lg" type="submit">
                                    Send Message
                                </Button>
                            </form>
                        </Card>

                        <div className="contact-info">
                            <Card className="info-card">
                                <div className="info-icon">
                                    <Mail size={24} />
                                </div>
                                <h3>Email Us</h3>
                                <p>support@binarysignals.com</p>
                            </Card>

                            <Card className="info-card">
                                <div className="info-icon">
                                    <Phone size={24} />
                                </div>
                                <h3>Call Us</h3>
                                <p>+1 (555) 123-4567</p>
                            </Card>

                            <Card className="info-card">
                                <div className="info-icon">
                                    <MapPin size={24} />
                                </div>
                                <h3>Visit Us</h3>
                                <p>123 Trading St, Finance City, FC 12345</p>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
