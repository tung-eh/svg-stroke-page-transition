import Link from 'next/link'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const Navbar = () => {
  return (
    <nav className="fixed w-full flex justify-between items-center z-2 p-4">
      <div />
      <div className="flex items-center gap-[clamp(1rem,4vw,2rem)]">
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-lg font-medium -tracking-[2%] p-4"
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
