import Link from 'next/link'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/collections', label: 'Collections' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const Navbar = () => {
  return (
    <nav className="fixed w-full flex justify-between items-start md:items-center z-2 p-8 md:p-4">
      <div className="uppercase font-condensed font-extrabold text-2xl md:px-4">
        Loose Frame
      </div>
      <div className="flex flex-col md:flex-row items-end md:items-center gap-0.5 md:gap-[max(2vw,2rem)]">
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-base md:text-lg font-medium -tracking-[2%] p-0 md:p-4"
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
