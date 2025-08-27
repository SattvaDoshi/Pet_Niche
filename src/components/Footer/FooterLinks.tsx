import { Link } from "react-router-dom";

export const FooterLinks = () => {
  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "All Products", href: "/products" },
        { name: "New Arrivals", href: "/new" },
        { name: "Sale", href: "/sale" },
        { name: "Gift Cards", href: "/gift-cards" },
      ],
    },
    {
      title: "Customer Care",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "Size Guide", href: "/size-guide" },
        { name: "Shipping & Returns", href: "/shipping" },
        { name: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Sustainability", href: "/sustainability" },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {footerSections.map((section) => (
        <div key={section.title}>
          <h3 className="font-semibold mb-4 text-white">
            {section.title}
          </h3>
          <ul className="space-y-3">
            {section.links.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="text-white/70 hover:text-white transition-smooth text-sm"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};