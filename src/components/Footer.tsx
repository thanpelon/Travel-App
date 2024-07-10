// components/Footer.tsx
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
      <div>&copy; 2024 Travel. All rights reserved.</div>
      <nav className="hidden md:flex gap-4">
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Terms of Service
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Privacy Policy
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Contact Us
        </Link>
      </nav>
    </footer>
  )
}
