import Link from "next/link";
import { LogoWordmarkLarge, ZypsyLogo } from "@/components/icons/logos";
import { Spacer } from "@/components/ui/Spacer";
import { footerColumns, legalLinks, type SiteLink } from "@/lib/site";
import { FooterParticles } from "./FooterParticles";

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

function DesignCredit({ id, mobile = false }: { id?: string; mobile?: boolean }) {
  return (
    <div id={id} className={mobile ? "footer_zypsy is-mobile" : "footer_zypsy"}>
      <div className="footer_link-small is-grey no-hover">Designed with</div>
      <a
        aria-label="Click here to open Zypsy website"
        href="https://www.zypsy.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="footer_zypsy-logo w-inline-block"
      >
        <div className="embed-icon icon-current-color icon-full w-embed">
          <ZypsyLogo />
        </div>
      </a>
    </div>
  );
}

export function Footer() {
  const copyright = `© ${new Date().getFullYear()} ZettaJoule. All rights reserved.`;

  return (
    <div className="footer_wrap">
      <footer className="section_footer">
        <Spacer d={80} m={48} />
        <div className="padding-global z-index-2">
          <div className="container-large">
            <div className="u-grid is-footer-custom">
              <h2 id="w-node-_78e76d15-8bbc-8e48-95ae-2dee7a4d3959-7a4d3953" className="heading-style-h4">
                Proven Advanced <br />
                Nuclear Technology
              </h2>
              {footerColumns.map((column) => (
                <div key={column.id} id={column.id} className="footer_links-col">
                  {column.links.map((link) => (
                    <FooterLink key={link.href} link={link} />
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
                <div className="max-width-full w-embed icon-current-color icon-full">
                  <LogoWordmarkLarge />
                </div>
              </Link>
              <DesignCredit id="w-node-_15830f18-164e-a8f5-9950-72f9422d34ac-7a4d3953" mobile />
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
                <DesignCredit />
              </div>
              <div id="w-node-ff52d41c-acec-858e-7a62-3c1e81021db9-7a4d3953" className="show-mobile-landscape">
                <div className="footer_link-small is-grey no-hover">{copyright}</div>
              </div>
            </div>
          </div>
        </div>
        <FooterParticles />
        <Spacer d={64} m={48} />
      </footer>
    </div>
  );
}
