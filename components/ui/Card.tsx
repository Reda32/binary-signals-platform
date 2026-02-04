import { ReactNode } from "react";
import "./Card.css";

interface CardProps {
    children: ReactNode;
    className?: string;
    variant?: "default" | "glass" | "gradient";
    hoverable?: boolean;
}

export function Card({
    children,
    className = "",
    variant = "default",
    hoverable = false
}: CardProps) {
    return (
        <div className={`card card-${variant} ${hoverable ? 'card-hoverable' : ''} ${className}`}>
            {children}
        </div>
    );
}
