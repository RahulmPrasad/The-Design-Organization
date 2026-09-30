"use client";

import type { AnimationItem } from "lottie-web";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LogoWordmark } from "@/components/icons/logos";
import { Button } from "@/components/ui/Button";
import { HoverStaggerText } from "@/components/ui/HoverStaggerText";
import { Lottie } from "@/components/ui/Lottie";
import { Spacer } from "@/components/ui/Spacer";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { contactLink, mainNav } from "@/lib/site";
import { startScroll, stopScroll } from "@/lib/smooth-scroll";
import "./navbar.css";

const SCROLL_THRESHOLD = 16;

function cx(...classes: (string | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const logoAnimation = useRef<AnimationItem | null>(null);
  const logoFrame = useRef({ frame: 0 });
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

  // Logo animation scrubs forward over 2s on hover and back over 1s on leave.
  const playLogo = (toEnd: boolean) => {
    const animation = logoAnimation.current;
    if (!animation) return;
    gsap.to(logoFrame.current, {
      frame: toEnd ? animation.totalFrames - 1 : 0,
      duration: toEnd ? 2 : 1,
      ease: "none",
      overwrite: true,
      onUpdate: () => animation.goToAndStop(logoFrame.current.frame, true),
    });
  };

  const closeMenu = () => setMenuOpen(false);
  const scrolledClass = scrolled && "is-navbar-scrolled";
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
              onMouseEnter={() => playLogo(true)}
              onMouseLeave={() => playLogo(false)}
            >
              <Lottie
                src="/lottie/logo-white.json"
                className="navbar_brand hide-tablet"
                onReady={(animation) => {
                  logoAnimation.current = animation;
                  animation.goToAndStop(0, true);
                }}
              />
              <div className="navbar_brand show-tablet w-embed icon-current-color icon-full">
                <LogoWordmark />
              </div>
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
