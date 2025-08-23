'use client'
import { ReactNode } from 'react'
import Link from 'next/link'
import styles from './Button.module.css'

interface ButtonProps {
    children: ReactNode
    href?: string
    variant?: 'primary' | 'secondary'
    className?: string
    onClick?: () => void
}

const Button = ({
    children,
    href,
    variant = 'primary',
    className = '',
    onClick
}: ButtonProps) => {
    const classes = `${styles.button} ${styles[variant]} ${className}`

    if (href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        )
    }

    return (
        <button className={classes} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button