"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { HoverStaggerText } from "@/components/ui/HoverStaggerText";
import { SiteLogo } from "@/components/ui/SiteLogo";
import { Spacer } from "@/components/ui/Spacer";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { contactLink, mainNav } from "@/lib/site";
import { startScroll, stopScroll } from "@/lib/smooth-scroll";
import "./navbar.css";

const SCROLL_THRESHOLD = 16;

/** Sections with a light top: the navbar keeps its white, dark-text "scrolled" look even at the top (subpages included). */
const LIGHT_SECTIONS = ["/contact", "/blog", "/services"];

function cx(...classes: (string | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpenRef = useRef(menuOpen);

  // Hide on scroll down, reveal on scroll up; solid background once past the top.
  useEffect(() => {
    const navbar = navRef.current;
    if (!navbar) return;

    const trigger = ScrollTrigger.create({
      start: "top top",
      end: "max",
      // Covers loading (or reloading) the page part-way down.
      onRefresh: (self) => {
        if (self.scroll() > SCROLL_THRESHOLD) setScrolled(true);
      },
      onUpdate: (self) => {
        const loader = document.querySelector(".page-loader");
        const loaderActive = loader && getComputedStyle(loader).display !== "none";
        if (menuOpenRef.current || loaderActive) return;

        if (self.scroll() <= SCROLL_THRESHOLD) {
          setScrolled(false);
          gsap.to(navbar, { yPercent: 0, duration: 0.6, ease: "power4.out", overwrite: true });
        } else if (self.direction === 1) {
          gsap.to(navbar, {
            yPercent: -102,
            duration: 0.6,
            ease: "power4.out",
            overwrite: true,
            onComplete: () => setScrolled(true),
          });
        } else if (self.direction === -1) {
          setScrolled(true);
          gsap.to(navbar, { yPercent: 0, duration: 0.6, ease: "power4.out", overwrite: true });
        }
      },
    });

    return () => trigger.kill();
  }, []);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    menuOpenRef.current = menuOpen;
    if (menuOpen) {
      stopScroll();
      document.body.style.overflow = "hidden";
    } else {
      startScroll();
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const pathname = usePathname();
  const solid = scrolled || LIGHT_SECTIONS.some((section) => pathname === section || pathname.startsWith(`${section}/`));
  const scrolledClass = solid && "is-navbar-scrolled";
  const menuClass = menuOpen && "is-menu-opened";

  return (
    <div ref={navRef} data-wf--navbar--variant="light" role="banner" className="navbar w-nav">
      <div>
        <Spacer d={24} />
      </div>
      <div className="padding-global z-index-2">
        <div className="container-large">
          <div className="navbar_component">
            <Link
              href="/"
              aria-label="Click here to navigate to the homepage"
              className={cx("navbar_brand-wrapper w-nav-brand", scrolledClass, menuClass)}
              onClick={closeMenu}
            >
              <SiteLogo sizes="100px" eager className="navbar_brand navbar_brand-image" />
            </Link>

            <div className={cx("navbar_link-wrapper", scrolledClass, menuClass)}>
              <ul className="navbar_list">
                {mainNav.map((link) => (
                  <li key={link.href} className="navbar_list-item">
                    <Link href={link.href} className="navbar_link w-inline-block" onClick={closeMenu}>
                      <HoverStaggerText text={link.label} className="navbar_link-text" />
                    </Link>
                  </li>
                ))}
                <li className="navbar_menu-button">
                  <Button
                    variant="light-blue"
                    label={contactLink.label}
                    href={contactLink.href}
                    desktopFullWidth
                    mobileFullWidth
                  />
                  <Spacer d={16} t={32} />
                </li>
              </ul>
            </div>

            <div className="hide-tablet">
              <Button variant="nav" label={contactLink.label} href={contactLink.href} />
            </div>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className={cx("navbar_hamburguer", scrolledClass, menuClass)}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <div className={cx("navbar_hamburguer-line is-first", scrolledClass, menuClass)} />
              <div className={cx("navbar_hamburguer-line is-second", scrolledClass, menuClass)} />
              <div className={cx("navbar_hamburguer-line is-third", scrolledClass, menuClass)} />
            </button>
          </div>
        </div>
      </div>
      <div>
        <Spacer d={24} />
      </div>
      <div className={cx("navbar_background", scrolledClass)} />
    </div>
  );
}
