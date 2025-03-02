import React from "react";
import styles from "./Footer.module.css";
import paymentMethods from "./paymentMethods"; // Create this array with image imports

const socialLinks = [
  { icon: "fa-brands fa-facebook" },
  { icon: "fa-brands fa-twitter" },
  { icon: "fa-brands fa-linkedin" },
  { icon: "fa-brands fa-youtube" },
  { icon: "fa-brands fa-instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 p-9">
      <div className="container mx-auto text-center">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          {/* Social Section */}
          <div className="md:w-1/3">
            <h2 className="mb-4 text-lg font-semibold">FOLLOW US</h2>
            <ul className="flex justify-center gap-4">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <i className={`${link.icon} text-xl hover:text-green-500 transition-colors`} />
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="md:w-1/3 w-full max-w-md">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className={styles.newsletterInput}
                required
              />
              <button className={styles.subscribeButton}>
                Subscribe
              </button>
            </div>
          </div>

          {/* Contact Section */}
          <div className="md:w-1/3">
            <h4 className="mb-2 text-lg font-semibold">CALL US</h4>
            <a href="tel:+20104567890" className="text-green-600 hover:text-green-700 transition-colors">
              +20104567890
            </a>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8">
          <p className="mb-4">Pay with</p>
          <ul className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
            {paymentMethods.map((method, index) => (
              <li key={index} className="h-8">
                <img 
                  src={method.image} 
                  alt={method.name} 
                  className="h-full object-contain"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Copyright */}
        <p className="mt-8 text-gray-500 dark:text-gray-400">
          Copyright © 2025. All rights reserved.
        </p>
      </div>
    </footer>
  );
}