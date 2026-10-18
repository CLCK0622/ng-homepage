#import "@preview/basic-resume:0.2.8": *

// Put your personal information here, replacing mine
#let name = "Kevin Y. Zhong"
#let location = "Champaign, IL"
#let email = "yiz29@illinois.edu"
#let linkedin = "linkedin.com/in/clckkkkk"
#let phone = "+1 (267) 918-6232"
#let personal-site = "www.clckkkkk.site"

#show: resume.with(
  author: name,
  // All the lines below are optional.
  // For example, if you want to to hide your phone number:
  // feel free to comment those lines out and they will not show.
  location: location,
  email: email,
  linkedin: linkedin,
  phone: phone,
  personal-site: personal-site,
  accent-color: "#26428b",
  font: "Georgia",
  paper: "us-letter",
  author-position: left,
  personal-info-position: left,
)

// Preserve the original heading hierarchy and project-entry layout.
#set par(leading: 0.50em, spacing: 0.75em)
#set text(hyphenate: false)
#show heading.where(level: 2): it => block(
  above: 0.95em,
  below: 0.5em,
  width: 100%,
  inset: (bottom: 3pt),
  stroke: (bottom: 0.6pt),
)[#text(size: 1.2em, weight: "bold", fill: rgb("#26428b"))[#it.body]]
#show heading.where(level: 3): set block(above: 1.05em, below: 0.55em)

// Match the template while keeping full URLs visible and link targets valid.
#let project(name: "", role: "", url: "", dates: "") = generic-one-by-two(
  left: [#if role == "" { strong(name) } else { [*#role*, #name] } (#link(url)[#url])],
  right: dates,
)

/*
* Lines that start with == are formatted into section headings
* You can use the specific formatting functions if needed
* The following formatting functions are listed below
* #edu(dates: "", degree: "", gpa: "", institution: "", location: "", consistent: false)
* #work(company: "", dates: "", location: "", title: "")
* #project(dates: "", name: "", role: "", url: "")
* certificates(name: "", issuer: "", url: "", date: "")
* #extracurriculars(activity: "", dates: "")
* There are also the following generic functions that don't apply any formatting
* #generic-two-by-two(top-left: "", top-right: "", bottom-left: "", bottom-right: "")
* #generic-one-by-two(left: "", right: "")
*/
== Education

#edu(
  institution: "University of Illinois Urbana-Champaign",
  location: "Champaign, IL",
  dates: dates-helper(start-date: "Aug 2025", end-date: "May 2029"),
  degree: "Bachelor of Science in Electrical Engineering",

  // Uncomment the line below if you want edu formatting to be consistent with everything else
  consistent: true
)
// - Cumulative GPA: /

== Skills

- *Languages:* C/C++, Rust, Python, TypeScript/JavaScript, Swift, Java, HTML/CSS
- *Technologies:* React, Next.js, Node.js, PostgreSQL, AWS (S3, SQS, IoT Core), Docker, Git, Linux, NixOS, PyTorch


== Past Experience

=== Work

#work(
  title: "Software Engineer Intern (Client & Web)",
  location: "Hangzhou, China",
  company: [Alibaba Cloud — Qoder (#link("https://qoder.com/")[https://qoder.com/])],
  dates: dates-helper(start-date: "May 2026", end-date: "Aug 2026"),
)
- Shipped production fixes and features for Qoder IDE; owned Quest Mode's side-panel terminal lifecycle and built artifact review interactions with inline annotations and contextual follow-up questions
- Owned end-to-end integration of Qoder Cloud Agents with Harness, Alibaba's AI-native engineering orchestration platform, enabling standardized, auditable workflows; helped grow onboarded agents from 800 to 2,000 (+150%)
- Independently built Qoder's AR-glasses client, adapting agentic coding workflows to smart glasses end to end
- Prototyped an ambient-display companion end to end, from product exploration through hardware–software integration

#work(
  title: "Founder & Software Engineer",
  company: [inklet LLC (#link("https://www.iminklet.com/")[https://www.iminklet.com/])],
  dates: dates-helper(start-date: "May 2026", end-date: "Present"),
)
- Built web, macOS, Windows and iOS Portal clients for content capture, device pairing and e-ink display management
- Built and published the TypeScript SDK with typed resource APIs, idempotent content submission, direct-to-S3 uploads and upload-ticket retry; validated three delivery modes with end-to-end tests and ESM/CommonJS support
- Integrated clients and SDK with an asynchronous AI/rendering pipeline using AWS SQS, S3 and IoT Core; owned structural design for D1 displays and H1 local AI compute hubs

// #work(
//   title: "Co-Founder",
//   location: "Remote",
//   company: "PivotHire",
//   dates: dates-helper(start-date: "Jun 2025", end-date: "Present"),
// )
// - Architected and developed a full-stack MVP, leveraging LLMs and Web3 to create a streamlined project delivery platform that manages interactions between startups and developers
// - Engineered key backend functionalities with OpenAI API and designed a responsive user interface with Next.js and shadcn/ui

#work(
  title: "Team Captain & Programming Team Lead",
  location: "Shanghai, China",
  company: "FRC Zodiac 6353 (Student Club)",
  dates: dates-helper(start-date: "Aug 2022", end-date: "Mar 2025"),
)
- Led a 35-member FRC team across robot programming, CAD and fabrication, coordinating software and hardware delivery

=== Projects

// Sole ownership confirmed by the author.
// Evidence: https://slate.benchgrid.dev/ and https://github.com/BenchGrid-dev/slate
#project(
  name: "SlateOS",
  role: "Creator & Developer",
  url: "https://slate.benchgrid.dev/",
  dates: dates-helper(start-date: "Sep 2026", end-date: "Present"),
)
- Independently built an open-source, agent-native NixOS desktop with a Rust runtime and Claude Code/Codex adapters
- Implemented a dedicated Wayland input seat and background display so agents can operate compatible apps while users retain their own keyboard, pointer and focus; exposed desktop controls through MCP
- Built an approval broker, tool audit records and scoped btrfs recovery; connected runtime services over Unix sockets

// Metrics reported by https://www.oddsparse.trade/projects/ on 2026-10-18.
// Decision vs. end-to-end order latency are intentionally kept separate.
#project(
  name: "OddsParse Lab",
  role: "Quantitative Researcher",
  url: "https://www.oddsparse.trade/",
  dates: dates-helper(start-date: "Apr 2025", end-date: "Present"),
)
- Built Chronallax, a Rust arbitrage engine with 39.3 μs p50 decision latency and 3.4 ms p50 end-to-end order latency
- Explored prediction-market models, market intelligence and US-equity intraday strategies within OddsParse Lab

#project(
  name: "A3A Protocol",
  // Role is optional
  role: "Frontend Developer & Project Manager",
  // Dates is optional
  dates: dates-helper(start-date: "Oct 2025", end-date: "Nov 2025"),
  // URL is also optional
  url: "https://a3aprotocol.com/",
)
- Led a five-person team at ETHOnline 2025, coordinating project planning, task allocation and team communication
- Built a Vite/Tailwind frontend for AI-agent commerce with smart-contract escrow, integrating WalletKit authentication and a Python AI agent backend

=== Research

#generic-one-by-two(
  left: [*Co-organizer*, IEEE WACV 2027 SEAI (#link("https://wacv27seai.synoring.ai/")[https://wacv27seai.synoring.ai/])],
  right: "Jan 2027 (Upcoming)",
)
- Co-organizing the first Social Embodied AI Workshop on multimodal perception and human-robot interaction

#extracurriculars(
  activity: "Enhanced U-Net Usage for Road Network Prediction",
  dates: dates-helper(start-date: "Dec 2023", end-date: "Oct 2024"),
)
- Implemented a U-Net model using geospatial data to forecast potential road networks
- TechRxiv preprint (DOI: #link("https://doi.org/10.36227/techrxiv.172902820.02096061/v1")[10.36227/techrxiv.172902820.02096061/v1]); 1 citation in 2025

== Honors

#certificates(
  name: "National Olympiad in AI National Merit Award",
  issuer: "ITCCC",
  date: "Jun 2024",
)

#certificates(
  name: "National Top 6% in Lanqiao U18 Programming Competition (C++)",
  issuer: "MIIT",
  date: "Oct 2022",
)
