import { useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEventHandler } from "react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4";

const SENSITIVITY = 0.8;

const navItems = [
  ["Work", "#work"],
  ["Experience", "#experience"],
  ["About", "#about"],
  ["Contact", "#contact"],
] as const;

const projects = [
  {
    title: "Atithi",
    meta: "ROOM RENTAL × HOSTING",
    desc: "A platform concept for short-term room and flat hosting, with property listings, availability, booking workflows and location-based discovery.",
    tags: ["Web Development", "Booking", "Location Discovery"],
  },
  {
    title: "Netflix Content Recommendation System",
    meta: "DATA × RECOMMENDATION",
    desc: "A content recommendation project using movie and show information with data-processing and recommendation techniques to improve discovery.",
    tags: ["Python", "Pandas", "Recommendation"],
  },
  {
    title: "Labour Chowk",
    meta: "HIRING PLATFORM",
    desc: "A responsive platform concept connecting customers with available workers by area and type of work, including customer and worker registration.",
    tags: ["React.js", "JavaScript", "HTML/CSS"],
  },
  {
    title: "Hand Sign Reader",
    meta: "COMPUTER VISION",
    desc: "A Python webcam application that recognizes hand signs in real time using computer-vision techniques for gesture detection and interpretation.",
    tags: ["Python", "OpenCV", "Computer Vision"],
  },
  {
    title: "Law Firm Website",
    meta: "UI/UX × BRANDING",
    desc: "A professional web experience for a legal-services brand, focused on information architecture, usability and a credible visual direction.",
    tags: ["UI/UX", "Web Design", "Branding"],
  },
  {
    title: "University College Fest Website",
    meta: "ONGOING × WEB",
    desc: "An ongoing responsive fest website focused on event presentation, registration-oriented flows and engaging navigation.",
    tags: ["Responsive Web", "Events", "UI Design"],
  },
];

function useTypewriter(text: string, speed = 34, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    const timeout = window.setTimeout(() => {
      let index = 0;

      interval = window.setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));

        if (index >= text.length) {
          window.clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeout);

      if (interval !== undefined) {
        window.clearInterval(interval);
      }
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

function useMouseScrub(videoRef: React.RefObject<HTMLVideoElement | null>) {
  const prevX = useRef<number | null>(null);
  const targetTime = useRef(0);
  const seekQueued = useRef(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const video = videoRef.current;

      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
        return;
      }

      if (prevX.current === null) {
        prevX.current = event.clientX;
        return;
      }

      const delta = event.clientX - prevX.current;
      prevX.current = event.clientX;

      const offset =
        (delta / Math.max(window.innerWidth, 1)) *
        SENSITIVITY *
        video.duration;

      const base = Number.isFinite(targetTime.current)
        ? targetTime.current
        : video.currentTime;

      targetTime.current = Math.max(
        0,
        Math.min(video.duration, base + offset),
      );

      if (!seekQueued.current) {
        seekQueued.current = true;
        video.currentTime = targetTime.current;
      }
    };

    const handleSeeked = () => {
      const video = videoRef.current;

      if (!video) {
        return;
      }

      seekQueued.current = false;

      if (Math.abs(video.currentTime - targetTime.current) > 0.001) {
        seekQueued.current = true;
        video.currentTime = targetTime.current;
      }
    };

    const resetPointer = () => {
      prevX.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("blur", resetPointer);

    const video = videoRef.current;

    if (video) {
      video.addEventListener("seeked", handleSeeked);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("blur", resetPointer);

      if (video) {
        video.removeEventListener("seeked", handleSeeked);
      }
    };
  }, [videoRef]);
}

function Logo() {
  return (
    <a
      href="#top"
      className="text-white no-underline tracking-tight text-[20px] sm:text-[24px]"
      style={{ fontFamily: "var(--font-heading)" }}
    >
      AP.<span className="opacity-50"> / 26</span>
    </a>
  );
}

type HamburgerProps = {
  open: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

function Hamburger({ open, onClick }: HamburgerProps) {
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onClick}
      className={`relative z-[12] flex flex-col gap-[5px] p-1 ${
        open ? "menu-open" : ""
      }`}
    >
      <span className="menu-bar menu-top block w-6 h-[2px] bg-white" />
      <span className="menu-bar menu-mid block w-6 h-[2px] bg-white" />
      <span className="menu-bar menu-bot block w-6 h-[2px] bg-white" />
    </button>
  );
}

type NavbarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

function Navbar({ open, setOpen }: NavbarProps) {
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[10] px-5 sm:px-8 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          <Logo />

          <nav
            className="hidden md:flex gap-8 text-[16px] lg:text-[18px] text-white/85"
            aria-label="Primary"
          >
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="hover:opacity-50 transition-opacity no-underline text-white"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="mailto:pandeyanshu607@gmail.com"
              className="hidden md:block text-[17px] underline underline-offset-2 text-white hover:opacity-50 transition-opacity"
            >
              Let&apos;s talk
            </a>

            <div className="md:hidden">
              <Hamburger open={open} onClick={() => setOpen(!open)} />
            </div>
          </div>
        </div>
      </header>

      <div
        className="menu-overlay md:hidden fixed inset-0 z-[9] bg-black/92 backdrop-blur-md flex flex-col justify-center gap-8 px-8"
        style={{
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {navItems.map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="text-[34px] text-white no-underline"
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}

        <a
          href="mailto:pandeyanshu607@gmail.com"
          className="text-[34px] text-white underline underline-offset-4"
        >
          Let&apos;s talk
        </a>
      </div>
    </>
  );
}

function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useMouseScrub(videoRef);

  const typewriter = useTypewriter(
    "I turn data, code and visual ideas into digital products people remember.",
    34,
    600,
  );

  return (
    <section
      id="top"
      className="relative z-[2] min-h-screen flex items-end md:items-center px-5 sm:px-8 md:px-10 pt-28 pb-12 md:pb-0 overflow-hidden"
    >
      <video
        ref={videoRef}
        className="hero-video"
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      <div className="hero-backdrop" />
      <div className="noise" />

      <div className="relative z-[2] max-w-4xl">
        <div className="text-white/55 text-[14px] sm:text-[16px] tracking-[.12em] uppercase mb-5 reveal">
          Ashutosh Pandey / Developer · Data Science · Designer
        </div>

        <h1
          className="text-white tracking-[-0.045em] leading-[.9] text-[18vw] md:text-[12vw] lg:text-[10.5vw]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          ASHUTOSH
        </h1>

        <div className="mt-5 max-w-3xl">
          <p className="text-white text-[22px] sm:text-[28px] lg:text-[34px] leading-[1.15] min-h-[82px]">
            {typewriter.displayed}
            {!typewriter.done && (
              <span className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[3px] blink" />
            )}
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="bg-white text-black rounded-full px-5 py-2.5 text-[14px] sm:text-[15px] no-underline hover:bg-black hover:text-white hover:border-white border border-white transition-colors"
          >
            View selected work
          </a>

          <a
            href="mailto:pandeyanshu607@gmail.com"
            className="border border-white/70 text-white rounded-full px-5 py-2.5 text-[14px] sm:text-[15px] no-underline hover:bg-white hover:text-black transition-colors"
          >
            Start a conversation
          </a>

          <span className="text-white/55 text-[14px] sm:text-[15px] ml-1">
            Sohna · Gurugram · India
          </span>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-10">
      <div className="text-white/45 uppercase tracking-[.14em] text-[12px] mb-3">
        {eyebrow}
      </div>

      <h2
        className="text-[42px] sm:text-[58px] md:text-[76px] leading-[.95] tracking-[-.04em] max-w-4xl"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h2>
    </div>
  );
}

function Work() {
  return (
    <section
      id="work"
      className="relative z-[2] px-5 sm:px-8 md:px-10 py-24 md:py-32 bg-[#070707]"
    >
      <SectionHeader
        eyebrow="Selected work"
        title="Projects built across data, web and computer vision."
      />

      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <article
            key={project.title}
            className="project-card glass rounded-[26px] p-6 sm:p-8 min-h-[310px] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-8">
                <div className="text-[12px] tracking-[.14em] text-white/42 uppercase">
                  {project.meta}
                </div>

                <div className="text-white/30 text-[12px]">
                  0{index + 1}
                </div>
              </div>

              <h3
                className="text-[30px] sm:text-[38px] tracking-[-.035em] leading-[1] max-w-xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {project.title}
              </h3>

              <p className="text-white/65 text-[15px] sm:text-[16px] leading-[1.5] mt-4 max-w-xl">
                {project.desc}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-7">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-white/15 rounded-full px-3 py-1 text-[12px] text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  const items = [
    [
      "Shripada Juris & Co.",
      "Web & Brand Design",
      "Created the firm's logo and designed/developed its website, establishing a professional digital identity.",
    ],
    [
      "GriffenXcel",
      "Graphic Design Intern · Present",
      "Contributing to visual design and creative content, applying design principles to digital graphics and communication assets.",
    ],
    [
      "GD Goenka University",
      "B.Tech CSE (Data Science) · 2023–Present",
      "Computer Science student specializing in Data Science, building across software, analytics and creative technology.",
    ],
  ];

  return (
    <section
      id="experience"
      className="relative z-[2] px-5 sm:px-8 md:px-10 py-24 md:py-32 bg-[#070707] border-t border-white/10"
    >
      <SectionHeader
        eyebrow="Experience"
        title="A technical base with a visual point of view."
      />

      <div className="max-w-5xl">
        {items.map(([organization, role, description]) => (
          <div
            key={organization}
            className="grid md:grid-cols-[1.1fr_1fr_1.8fr] gap-5 py-7 border-t border-white/10"
          >
            <div
              className="text-white text-[21px] sm:text-[24px]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {organization}
            </div>

            <div className="text-white/52 text-[14px] sm:text-[15px]">
              {role}
            </div>

            <div className="text-white/70 text-[15px] sm:text-[16px] leading-[1.5]">
              {description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  const skills: Record<string, string[]> = {
    Languages: ["Python", "JavaScript", "HTML/CSS", "SQL"],
    Frameworks: ["React.js", "OpenCV", "PostgreSQL", "MySQL"],
    Tools: ["Power BI", "Excel", "Canva", "Fusion 360", "GitHub"],
  };

  return (
    <section
      id="about"
      className="relative z-[2] px-5 sm:px-8 md:px-10 py-24 md:py-32 bg-[#070707] border-t border-white/10"
    >
      <SectionHeader
        eyebrow="About"
        title="Data scientist in training. Developer by instinct. Designer by practice."
      />

      <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-12 lg:gap-20">
        <div>
          <p className="text-[20px] sm:text-[26px] leading-[1.35] text-white/78 max-w-3xl">
            Computer Science student specializing in Data Science at GD Goenka
            University with hands-on experience in web development,
            recommendation systems, computer vision and graphic design.
          </p>

          <p className="text-[16px] sm:text-[18px] leading-[1.55] text-white/52 max-w-2xl mt-6">
            I like the space where analytical thinking meets visual
            communication—whether that means building a React interface,
            working with recommendation data, experimenting with computer
            vision, or shaping a brand.
          </p>
        </div>

        <div className="space-y-8">
          {Object.entries(skills).map(([group, values]) => (
            <div key={group}>
              <div className="text-[12px] uppercase tracking-[.14em] text-white/40 mb-3">
                {group}
              </div>

              <div className="flex flex-wrap gap-2">
                {values.map((value) => (
                  <span
                    key={value}
                    className="border border-white/15 rounded-full px-3.5 py-2 text-[13px] text-white/72"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 grid sm:grid-cols-3 gap-4">
        <Achievement number="01" text="President of the Dramatics Club" />
        <Achievement number="02" text="External Head · Dance Club" />
        <Achievement number="03" text="Coding competition winner · Ambala" />
      </div>
    </section>
  );
}

function Achievement({ number, text }: { number: string; text: string }) {
  return (
    <div className="glass rounded-[22px] p-6">
      <div
        className="text-4xl mb-2"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {number}
      </div>

      <div className="text-white/50 text-sm">{text}</div>
    </div>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "pandeyanshu607@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section
      id="contact"
      className="relative z-[2] px-5 sm:px-8 md:px-10 pt-24 md:pt-32 pb-10 bg-[#070707] border-t border-white/10"
    >
      <div className="max-w-5xl">
        <SectionHeader
          eyebrow="Contact"
          title="Have a brief, a product idea, or something weird worth building?"
        />

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 pb-16">
          <div>
            <a
              href={`mailto:${email}`}
              className="contact-link block text-[30px] sm:text-[44px] tracking-[-.03em] text-white underline underline-offset-4 no-underline"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {email}
            </a>

            <div className="text-white/45 mt-3 text-[14px]">
              6388449596 · Sohna, Gurugram, Haryana
            </div>
          </div>

          <button
            type="button"
            onClick={copyEmail}
            className="rounded-full border border-white/20 px-5 py-2.5 text-[14px] text-white hover:bg-white hover:text-black transition-colors w-fit"
          >
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>

        <footer className="flex flex-col sm:flex-row justify-between gap-3 pt-6 border-t border-white/10 text-white/35 text-[12px]">
          <span>ASHUTOSH PANDEY © 2026</span>
          <span>Data Science × Web × Design</span>
        </footer>
      </div>
    </section>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenuOnResize = () => {
    if (window.innerWidth >= 768) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", closeMenuOnResize);

    return () => {
      window.removeEventListener("resize", closeMenuOnResize);
    };
  }, []);

  return (
    <>
      <Navbar open={menuOpen} setOpen={setMenuOpen} />
      <Hero />
      <Work />
      <Experience />
      <About />
      <Contact />
    </>
  );
}
