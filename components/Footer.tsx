import { Mail } from "lucide-react";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="mt-12 flex w-full flex-wrap justify-center gap-6 border-t-2 border-primaryBorder p-4">
      <Link
        href={"https://x.com/kashyap_tweetts"}
        target="_blank"
        aria-label="twitter"
      >
        <FaTwitter className="size-6 cursor-pointer text-gray-500 hover:text-gray-200" />
      </Link>

      <Link
        href={"https://www.linkedin.com/in/ankit-kashyap-coder/"}
        target="_blank"
        aria-label="linkedin"
      >
        <FaLinkedin className="size-6 cursor-pointer text-gray-500 hover:text-gray-200" />
      </Link>

      <Link
        href={"https://www.instagram.com/ankit_kash_yap/"}
        target="_blank"
        aria-label="instagram"
      >
        <FaInstagram className="size-6 cursor-pointer text-gray-500 hover:text-gray-200" />
      </Link>
      <Link
        href={"mailto:kashyap25ankit@gmail.com"}
        target="_blank"
        aria-label="mail"
      >
        <Mail className="size-6 cursor-pointer text-gray-500 hover:text-gray-200" />
      </Link>
    </div>
  );
}
