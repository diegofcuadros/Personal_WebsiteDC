import Link from "next/link"
import Image from "next/image"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/digital-epidemiology-lab-logo.png"
        alt="Digital Epidemiology Laboratory Logo"
        width={128}
        height={50}
        className="object-contain"
        priority
      />
    </Link>
  )
}
