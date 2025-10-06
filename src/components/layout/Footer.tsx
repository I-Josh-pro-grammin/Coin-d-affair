import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Newsletter Section */}
      <section className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Our New Stuff?</h2>
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Your Email" 
                  className="rounded-r-none"
                />
                <Button className="bg-gray-700 hover:bg-gray-600 rounded-l-none">
                  Send
                </Button>
              </div>
            </div>
            
            <div className="lg:w-1/2 text-right">
              <h3 className="text-xl font-bold mb-2">Stuffus for Homes and Needs</h3>
              <p className="text-gray-300">
                We'll listen to your needs, identify the best approach, and then create a bespoke smart EV charging solution that's right for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start">
            {/* Left Side */}
            <div className="flex space-x-12 mb-8 md:mb-0">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
                <ul className="space-y-2">
                  <li><Link to="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</Link></li>
                  <li><Link to="/team" className="text-gray-600 hover:text-gray-900 transition-colors">Meet The Team</Link></li>
                  <li><Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact Us</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact Us</Link></li>
                  <li><Link to="/shipping" className="text-gray-600 hover:text-gray-900 transition-colors">Shipping</Link></li>
                  <li><Link to="/returns" className="text-gray-600 hover:text-gray-900 transition-colors">Return</Link></li>
                  <li><Link to="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">FAQ</Link></li>
                </ul>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col items-end">
              <div className="flex space-x-4 mb-4">
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Twitter className="h-4 w-4 text-white" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Facebook className="h-4 w-4 text-white" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Linkedin className="h-4 w-4 text-white" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Instagram className="h-4 w-4 text-white" />
                </a>
              </div>
              
              <div className="text-sm text-gray-500 text-right">
                <p className="mb-2">Copyright © 2023 Uangku. All Rights Reserved.</p>
                <div className="flex space-x-4">
                  <Link to="/terms" className="hover:text-gray-700 transition-colors">Terms of Service</Link>
                  <Link to="/privacy" className="hover:text-gray-700 transition-colors">Privacy Policy</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}