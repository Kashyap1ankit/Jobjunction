import { Mail } from "lucide-react";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="mt-12 w-full flex  gap-6 justify-center flex-wrap  p-4  border-t-2 border-primaryBorder">
      <Link
        href={"https://x.com/kashyap_tweetts"}
        target="_blank"
        aria-label="twitter"
      >
        <FaTwitter className="text-gray-500 size-6 cursor-pointer hover:text-gray-200" />
      </Link>

      <Link
        href={"https://www.linkedin.com/in/ankit-kashyap-coder/"}
        target="_blank"
        aria-label="linkedin"
      >
        <FaLinkedin className="text-gray-500 size-6 cursor-pointer hover:text-gray-200" />
      </Link>

      <Link
        href={"https://www.instagram.com/ankit_kash_yap/"}
        target="_blank"
        aria-label="instagram"
      >
        <FaInstagram className="text-gray-500 size-6 cursor-pointer hover:text-gray-200" />
      </Link>
      <Link
        href={"mailto:kashyap25ankit@gmail.com"}
        target="_blank"
        aria-label="mail"
      >
        <Mail className="text-gray-500 size-6 cursor-pointer hover:text-gray-200" />
      </Link>
    </div>
  );
}
