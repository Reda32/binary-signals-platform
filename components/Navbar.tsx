"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/Button";
import { TrendingUp, Menu, X } from "lucide-react";
import { useState } from "react";
import "./Navbar.css";

export function Navbar() {
    const pathname = usePathname();
    const { isSignedIn } = useUser();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/dashboard", label: "Signals" },
        { href: "/brokers", label: "Brokers" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    {/* Logo */}
                    <Link href="/" className="navbar-logo">
                        <TrendingUp size={28} className="logo-icon" />
                        <span className="logo-text">Binary<span className="gradient-text">Signals</span></span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="navbar-links">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="navbar-actions">
                        <ThemeToggle />
                        {isSignedIn ? (
                            <UserButton afterSignOutUrl="/" />
                        ) : (
                            <SignInButton mode="modal">
                                <Button variant="primary" size="sm">
                                    Sign In
                                </Button>
                            </SignInButton>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="mobile-menu">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`mobile-nav-link ${pathname === link.href ? 'active' : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
