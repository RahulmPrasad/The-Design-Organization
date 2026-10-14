import Link from "next/link";
import { HomeCta } from "@/components/home/HomeCta";
import { Particles } from "@/components/ui/Particles";
import { SiteLogo } from "@/components/ui/SiteLogo";
import { Spacer } from "@/components/ui/Spacer";
import { business, city, footerColumns, legalLinks, siteName, type SiteLink } from "@/lib/site";
import "./footer.css";

function FooterLink({ link }: { link: SiteLink }) {
  if (link.external) {
    return (
      <a data-link-underline="" href={link.href} target="_blank" rel="noopener noreferrer" className="footer_link">
        {link.label}
      </a>
    );
  }
  return (
    <Link data-link-underline="" href={link.href} className="footer_link">
      {link.label}
    </Link>
  );
}

export function Footer() {
  const copyright = `© ${new Date().getFullYear()} ${siteName}, Interior Designers in ${city}, Gujarat. All rights reserved.`;
  // Name, address and phone, matching the Google Business Profile (shown once filled in lib/site.ts).
  const { address } = business;
  const street = address.street && `${address.street}, ${address.locality} ${address.postalCode}`.trim();
  const nap = [
    street && { label: street, href: business.mapUrl || undefined },
    business.phone && { label: business.phone, href: `tel:${business.phone.replace(/\s/g, "")}` },
    business.email && { label: business.email, href: `mailto:${business.email}` },
  ].filter((item): item is { label: string; href: string | undefined } => Boolean(item));

  return (
    <div className="footer_wrap">
      {/* "Connect With Us" section on every page; the footer slides up from behind it. */}
      <HomeCta />
      <footer className="section_footer">
        <Spacer d={80} m={48} />
        <div className="padding-global z-index-2">
          <div className="container-large">
            <div className="u-grid is-footer-custom">
              <h2 id="w-node-_78e76d15-8bbc-8e48-95ae-2dee7a4d3959-7a4d3953" className="heading-style-h4">
                Designing Spaces <br />
                With Purpose
              </h2>
              {footerColumns.map((column) => (
                <div key={column.id} id={column.id} className="footer_links-col">
                  {column.links.map((link) => (
                    <FooterLink key={link.label} link={link} />
                  ))}
                </div>
              ))}
            </div>

            <div className="new-footer_spacer" />

            <div className="u-grid is-mobile-gap-large">
              <Link
                href="/"
                aria-label="Click here to navigate to the homepage"
                id="w-node-_5467973a-1882-8a26-8cef-20ea06cd5874-7a4d3953"
                className="new-footer_logo w-inline-block"
              >
                <SiteLogo sizes="256px" className="footer_logo-image" />
              </Link>
              <div id="w-node-_3fb759fd-0912-61c6-b1ac-14f87d1cb0d9-7a4d3953" className="hide-mobile-landscape" />
              <div id="w-node-ebb05fb1-5dc3-f2af-49f6-3289e45af446-7a4d3953" className="footer-legal_wrapper">
                <div className="hide-mobile-landscape">
                  <div className="footer_link-small is-grey no-hover">{copyright}</div>
                </div>
                {legalLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="footer_link-small is-grey">
                    {link.label}
                  </Link>
                ))}
                {nap.length > 0 && (
                  <address style={{ fontStyle: "normal", display: "contents" }}>
                    {nap.map((item) =>
                      item.href ? (
                        <a key={item.label} href={item.href} className="footer_link-small is-grey">
                          {item.label}
                        </a>
                      ) : (
                        <span key={item.label} className="footer_link-small is-grey no-hover">
                          {item.label}
                        </span>
                      ),
                    )}
                  </address>
                )}
              </div>
              <div id="w-node-ff52d41c-acec-858e-7a62-3c1e81021db9-7a4d3953" className="show-mobile-landscape">
                <div className="footer_link-small is-grey no-hover">{copyright}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_bg">
          <Particles className="footer_bg-wrapper" style={{ zIndex: 0 }} />
        </div>
        <Spacer d={64} m={48} />
      </footer>
    </div>
  );
}
