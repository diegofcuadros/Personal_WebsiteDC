import Link from "next/link"
import Image from "next/image"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center group">
      <Image
        src="/LOGO-DFClab-Icon.png"
        alt="Digital Epidemiology and Population Health Laboratory Logo"
        width={150} // Adjusted width for a single prominent logo
        height={50} // Keeping height consistent, width will adjust with object-contain
        className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
        priority
      />
    </Link>
  )
}
