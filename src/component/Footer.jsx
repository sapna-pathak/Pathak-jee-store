import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-gray-200">
      <section className="bg-[var(--color-primary-dark)] text-white">
        <div className="container-page grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="text-lg font-bold text-[var(--color-primary-dark)]">Pathak Jee General Store</h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Everyday grocery items at local prices — milk, eggs, rice, pulses, flour, snacks and more.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Quick links</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li><Link href="/products" className="hover:text-[var(--color-primary)]">Products</Link></li>
              <li><Link href="/about" className="hover:text-[var(--color-primary)]">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--color-primary)]">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Contact</h3>
            <ul className="mt-2 space-y-1 text-sm text-[var(--color-text-muted)]">
              <li>
                <a href="tel:+919650500935" className="hover:text-[var(--color-primary)]">
                  +91 9650500935
                </a>
              </li>
              <li>
                <a href="mailto:pathakjee89@gmail.com" className="hover:text-[var(--color-primary)]">
                  pathakjee89@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919650500935"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--color-primary)]"
                >
                  WhatsApp us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-[var(--color-primary-dark)] text-white text-sm">
        <div className="container-page py-4">
          <p>&copy; {new Date().getFullYear()} Pathak Jee Store. All rights reserved.</p>
        </div>
      </section>
    </footer>
  );
}
