import { Mail } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Link } from "react-router-dom";
import { useId, type JSX } from "react";
import Icon from "@/components/common/Icon";
import { github, instagram, linkedin, twitter, whatsapp } from "@/assets";
import { CONSTANTS } from "@/utils/constants";

const Footer = (): JSX.Element => {

  const socialLinks = [
    { name: "Twitter", icon: <Icon src={twitter} />, url: "#" },
    { name: "GitHub", icon: <Icon src={github} className="invert" />, url: "#" },
    { name: "LinkedIn", icon: <Icon src={linkedin} />, url: "#" },
    { name: "Instagram", icon: <Icon src={instagram} />, url: "#" },
    { name: "WhatsApp", icon: <Icon src={whatsapp} />, url: "#" }
  ];

  const legalLinks = [
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy"
  ];

  return (
    <footer className="bg-linear-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <figure>
                <img
                  src={CONSTANTS.app_logo}
                  alt={CONSTANTS.app_name}
                  className="w-12 h-12 rounded-lg"
                />
                <figcaption hidden>{CONSTANTS.app_name}</figcaption>
              </figure>
              <div>
                <h1 className="text-2xl font-bold bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  {CONSTANTS.app_name}
                </h1>
                <p className="text-slate-400 text-sm">Learn Without Limits</p>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed text-sm max-w-sm">
              Empowering learners worldwide with quality education. Join {CONSTANTS.app_name} to unlock your potential.
            </p>
          </div>

          <div className="space-y-4 md:flex justify-center">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <Link to="/courses" state={{ from: ["/"] }} className="w-fit text-slate-400 hover:text-white transition-colors text-sm">
                Browse Courses
              </Link>
              <Link to="#" className="w-fit text-slate-400 hover:text-white transition-colors text-sm">
                Teach on {CONSTANTS.app_name}
              </Link>
              <Link to="/about" className="w-fit text-slate-400 hover:text-white transition-colors text-sm">
                About Us
              </Link>
              <Link to="/contact" className="w-fit text-slate-400 hover:text-white transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          <div className="mt-4 space-y-3 flex justify-center">
            <div className="flex flex-col gap-2 w-full">
              <h4 className="text-lg font-semibold text-white">Stay Updated</h4>
              <Input
                type="email"
                autoComplete="email"
                id={useId()}
                placeholder="Enter your email"
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 focus:ring-blue-500 text-sm"
              />
              <Button variant="primary">
                <Mail className="w-4 h-4" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-slate-700" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="text-slate-400 text-sm text-center lg:text-left">
            &copy; {new Date().getFullYear()} {CONSTANTS.app_name}. All rights reserved.
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {legalLinks.map((link) => (
              <Link key={link} to="#" className="text-slate-400 hover:text-white transition-colors">
                {link}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                to={social.url}
                aria-label={social.name}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
