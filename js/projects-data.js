const projectsData = {
    "project-clipse-video-player": {
        title: "Clipse Video Player",
        description: "A modular, zero-dependency HTML5 video player component (<14 kB gzipped) engineered for 60fps RAF scrubbing, WCAG AAA accessibility, YouTube hotkeys, and guaranteed zero memory leaks in SPAs.",
        badges: [
            { text: "Vanilla JS", class: "bg-warning text-dark" },
            { text: "NPM v1.1.0", class: "bg-danger" },
            { text: "TypeScript", class: "bg-primary" },
            { text: "WCAG AAA", class: "bg-success" },
            { text: "Zero Deps", class: "bg-info text-dark" },
            { text: "60 FPS Scrubbing", class: "bg-secondary" }
        ],
        links: [
            { text: "Source Code", url: "https://github.com/bretmuchow07/clips-video-player", icon: "fab fa-github", class: "btn-primary" },
            { text: "Live Demo", url: "https://clips-video-player-wlhg.vercel.app/", icon: "fas fa-external-link-alt", class: "btn-outline-primary" },
            { text: "NPM Registry", url: "https://www.npmjs.com/package/@clipse_video-player/video-player", icon: "fab fa-npm", class: "btn-outline-primary" }
        ],
        heroImage: "assets/clipse-video-player-preview.png",
        heroIcon: null,
        overview: {
            title: "Production-Grade HTML5 Video Engine (v1.1.0)",
            content: `
                <p class="mb-4">
                    <strong>Clipse Video Player (v1.1.0)</strong> delivers a major architectural overhaul designed for developers who demand
                    rock-solid playback reliability, buttery 60fps timeline scrubbing, and complete lifecycle teardown for single-page application
                    environments (React, Vue, Svelte, or Next.js).
                </p>
                <p class="mb-4">
                    The core is pure vanilla JavaScript with full TypeScript definitions, requiring zero external dependencies and compiling
                    to under <strong>14 kB gzipped</strong> (with the npm package trimmed by 99% down to 132 kB). It delivers out-of-the-box
                    <strong>WCAG AAA accessibility</strong> (slider ARIA semantics and high-contrast visible focus rings), YouTube-standard
                    hotkey bindings, dynamic multi-resolution quality switching, native WebVTT subtitle track parsing with CSS <code>::cue</code>
                    styling, and automatic iOS Safari fullscreen fallbacks.
                </p>
            `
        },
        sections: [
            {
                type: "highlight-box",
                title: "Architectural Focus: Zero Leaks & Hardware Decoder Safety",
                icon: "fas fa-shield-alt text-cyan",
                content: `"Engineered specifically for single-page applications where components mount and unmount dynamically. Calling player.destroy() systematically purges every DOM listener, active animation frame, and child component subscription. In parallel, seeking utilizes unified Pointer Capture throttled via requestAnimationFrame to guarantee smooth 60fps tracking without decoder lockups or dropped audio frames."`
            },
            {
                type: "features-grid",
                title: "Core Capabilities & Performance",
                items: [
                    { icon: "fas fa-tachometer-alt text-cyan", title: "60fps RAF Scrubbing", desc: "Pointer Capture API with RAF throttling keeps scrubbing seamless even if cursor exits the window." },
                    { icon: "fas fa-universal-access text-success", title: "WCAG AAA Accessible", desc: "Full ARIA slider semantics (valuenow, valuetext), popup menu roles, and high-contrast focus rings." },
                    { icon: "fas fa-keyboard text-warning", title: "YouTube Hotkeys", desc: "Space/K to toggle, M to mute, F for fullscreen, J/L for ±5s seek, 0–9 jumps, and Esc menu dismissal." },
                    { icon: "fas fa-recycle text-info", title: "Zero SPA Leaks", desc: "Coordinated disposer pattern systematically clears DOM listeners, timers, and emitters on player.destroy()." },
                    { icon: "fas fa-closed-captioning text-magenta", title: "Subtitles & Qualities", desc: "Dynamic multi-resolution switching with time retention plus native WebVTT subtitles with CSS ::cue styling." },
                    { icon: "fas fa-mobile-alt text-primary", title: "iOS & Safari Hardened", desc: "Automatic webkitEnterFullscreen redirection and iPhone hardware volume override protection." },
                    { icon: "fab fa-js-square text-warning", title: "TypeScript First", desc: "First-class typings in types/index.d.ts covering player options, events, methods, and track objects." },
                    { icon: "fas fa-box-open text-acid", title: "99% Smaller NPM Size", desc: "Optimized package manifest trimmed tarball distribution from 10.3 MB down to 132 kB (<14 kB gzipped)." }
                ]
            },
            {
                type: "split-card",
                left: {
                    title: "Package & Integration Specs",
                    content: [
                        { icon: "fab fa-npm text-danger", title: "NPM Registry", desc: "npm install @clipse_video-player/video-player" },
                        { icon: "fas fa-feather-alt text-success", title: "Bundle Footprint", desc: "<14 kB gzipped | Zero runtime dependencies" },
                        { icon: "fas fa-code text-info", title: "Type Definitions", desc: "Full TypeScript definitions bundled out of the box" },
                        { icon: "fas fa-globe text-cyan", title: "CDN Distribution", desc: "Unpkg & jsDelivr UMD/ESM builds ready for vanilla HTML" }
                    ]
                },
                right: {
                    title: "Modern SPA Implementation & Teardown",
                    bgClass: "bg-dark text-light",
                    content: `
                        <pre class="m-0 p-3" style="background: #111114 !important; color: #f4f2e8 !important; border: 2px solid #111114; border-radius: 4px; overflow-x: auto;"><code style="font-family: var(--font-mono); color: #f4f2e8 !important; background: transparent !important;">
import VideoPlayer from '@clipse_video-player/video-player';
import '@clipse_video-player/video-player/dist/video-player.css';

// Initialize with multi-quality & accessibility
const player = new VideoPlayer({
  container: '#player-container',
  src: 'https://example.com/video-1080p.mp4',
  keyboard: true,
  qualities: [
    { label: '1080p', src: 'https://example.com/1080p.mp4', res: 1080 },
    { label: '720p',  src: 'https://example.com/720p.mp4',  res: 720  }
  ],
  tracks: [
    { label: 'English', src: 'subs.vtt', srclang: 'en', default: true }
  ]
});

// Subscribe to events (returns unsubscribe disposer)
const unbind = player.on('play', () => console.log('Playing'));

// Coordinated Teardown (e.g. React useEffect return / Vue onUnmounted)
// unbind();
// player.destroy();
                        </code></pre>
                    `
                }
            }
        ]
    },
    "project-poster-maker": {
        title: "Poster Maker — Album Poster Studio",
        description: "A professional, privacy-first web studio for designing iconic album art posters with 4 modernist layout archetypes, color quantization, and 300 DPI print-ready export.",
        badges: [
            { text: "Next.js 16 (App Router)", class: "bg-dark" },
            { text: "React 19", class: "bg-primary" },
            { text: "TypeScript 5", class: "bg-info text-dark" },
            { text: "Fabric.js 7.1", class: "bg-warning text-dark" },
            { text: "Tailwind CSS v4", class: "bg-cyan text-dark" },
            { text: "Zustand 5", class: "bg-success" },
            { text: "300 DPI Print Export", class: "bg-danger" },
            { text: "100% In-Browser Privacy", class: "bg-secondary" }
        ],
        links: [
            { text: "Source Code", url: "https://github.com/bretmuchow07/poster-maker", icon: "fab fa-github", class: "btn-primary" },
            { text: "Live Demo", url: "https://poster-maker-iota.vercel.app/", icon: "fas fa-external-link-alt", class: "btn-outline-primary disabled" }
        ],
        heroImage: "assets/poster-maker-preview.png",
        heroIcon: null, // If no image, use icon
        overview: {
            title: "Iconic Album Art Poster Studio",
            content: `
                <p class="mb-4">
                    <strong>Poster Maker</strong> is a specialized, privacy-first web application engineered for creating
                    professional, print-ready album art posters directly in the browser. Designed for musicians, visual artists,
                    and audiophiles, it replaces complex graphic design suites with an intuitive, modernist studio workflow—featuring
                    <strong>zero accounts, zero cookies/tracking, and zero watermarks</strong>.
                </p>
                <p class="mb-4">
                    The studio provides <strong>4 iconic layout archetypes</strong>: Swiss Palette Grid, Brutalist Inset Rule,
                    Cinematic Split (with baked alpha edge blending), and Modern Studio. With a built-in <strong>smart tracklist auto-parser</strong>,
                    users can paste raw tracklists directly from Spotify, Apple Music, Bandcamp, or Wikipedia to generate balanced multi-column typography.
                    Artwork undergoes real-time client-side <strong>5-color palette quantization</strong> via ColorThief to produce movable color swatches.
                </p>
                <p>
                    Built with <strong>Next.js 16 (Turbopack)</strong>, <strong>React 19</strong>, and <strong>Fabric.js 7.1</strong>, the studio supports
                    high-precision canvas manipulation, full undo/redo state history via Zustand, and export to <strong>300 DPI ISO A-Series (A4/A3/A2)
                    and US Retail frames (12x12\", 18x24\", 24x36\")</strong> in PNG, JPG, or Vector PDF formats.
                </p>
            `
        },
        sections: [
            {
                type: "highlight-box",
                title: "Creative Manifesto: Zero Server Uploads & Print Integrity",
                icon: "fas fa-print text-magenta",
                content: `"Every canvas calculation, median-cut color quantization, and 300 DPI vector PDF generation happens strictly client-side in browser memory. Artists maintain total privacy over unreleased artwork while achieving exact millimeter print tolerances with toggleable bleed margins and safe-zone guides."`
            },
            {
                type: "features-grid",
                title: "Studio Capabilities & Modernist Tools",
                items: [
                    { icon: "fas fa-th-large text-primary", title: "4 Layout Archetypes", desc: "Swiss Palette Grid, Brutalist Inset Rule, Cinematic Split with alpha fade, and Modern Studio with QR streaming badge." },
                    { icon: "fas fa-palette text-warning", title: "5-Color Palette Extraction", desc: "Median-cut color quantization extracts 5 dominant swatches; movable swatch groups support square, rounded, or circle shapes." },
                    { icon: "fas fa-list-ol text-cyan", title: "Bulk Tracklist Auto-Parser", desc: "Paste raw text from streaming services; auto-detects timestamps and numbers to format balanced two-column typography." },
                    { icon: "fas fa-file-pdf text-danger", title: "300 DPI Print Export", desc: "True print-resolution export to Vector PDF, PNG, or JPG for ISO A4/A3/A2 and US 12x12\", 18x24\", and 24x36\" frames." },
                    { icon: "fas fa-crop-alt text-info", title: "Print Proofing Guides", desc: "Toggleable 3mm bleed margin boundaries and 10mm safe-zone overlays ensure flawless guillotine cutting." },
                    { icon: "fas fa-link text-success", title: "Deep-Link Launching", desc: "URL parameter engine pre-loads templates, artist names, and album titles directly into the studio editor." },
                    { icon: "fas fa-adjust text-magenta", title: "Darkroom & Gallery Light", desc: "Deep carbon studio (#121214) or warm archival linen finish (#f9f8f5) with FOUT-proof synchronous theme initialization." },
                    { icon: "fas fa-user-shield text-acid", title: "100% Private & In-Browser", desc: "Zero server uploads, zero analytics cookies, and local persistence with full undo/redo canvas history." }
                ]
            },
            {
                type: "split-card",
                left: {
                    title: "Studio Architectural Stack",
                    content: [
                        { icon: "fab fa-react text-primary", title: "React 19 & Next.js 16", desc: "App Router architecture powered by Turbopack compilation" },
                        { icon: "fas fa-paint-brush text-warning", title: "Fabric.js 7.1 Engine", desc: "Interactive HTML5 canvas with non-destructive alpha edge blending" },
                        { icon: "fas fa-database text-success", title: "Zustand 5 Store", desc: "Persistent local state management with comprehensive undo/redo history" },
                        { icon: "fas fa-file-export text-danger", title: "jsPDF 3.0 & Canvas API", desc: "High-resolution vector PDF generation with custom DPI scaling" }
                    ]
                },
                right: {
                    title: "Print & Sizing Matrix",
                    bgClass: "bg-dark text-light",
                    content: `
                        <div class="table-responsive">
                            <table class="table table-dark table-sm table-borderless font-mono small mb-0">
                                <thead>
                                    <tr class="text-cyan border-bottom border-secondary">
                                        <th>Format</th>
                                        <th>Dimensions</th>
                                        <th>DPI Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ISO A4</td>
                                        <td>210 × 297 mm</td>
                                        <td class="text-acid">72 / 150 / 300 DPI</td>
                                    </tr>
                                    <tr>
                                        <td>ISO A3</td>
                                        <td>297 × 420 mm</td>
                                        <td class="text-acid">72 / 150 / 300 DPI</td>
                                    </tr>
                                    <tr>
                                        <td>ISO A2</td>
                                        <td>420 × 594 mm</td>
                                        <td class="text-acid">72 / 150 / 300 DPI</td>
                                    </tr>
                                    <tr>
                                        <td>Vinyl Sleeve</td>
                                        <td>12 × 12 in (305 mm)</td>
                                        <td class="text-acid">72 / 150 / 300 DPI</td>
                                    </tr>
                                    <tr>
                                        <td>Gallery Frame</td>
                                        <td>18 × 24 in (457 mm)</td>
                                        <td class="text-acid">72 / 150 / 300 DPI</td>
                                    </tr>
                                    <tr>
                                        <td>Concert Poster</td>
                                        <td>24 × 36 in (610 mm)</td>
                                        <td class="text-acid">72 / 150 / 300 DPI</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    `
                }
            }
        ]
    },
    "project-dementia-care": {
        title: "Dementia Care Application",
        description: "A compassionate mobile tracking system designed to support individuals with dementia and preserve meaningful memories.",
        badges: [
            { text: "Flutter", class: "bg-primary" },
            { text: "Supabase", class: "bg-success" },
            { text: "Gemini AI", class: "bg-info" },
            { text: "Figma", class: "bg-warning text-dark" }
        ],
        links: [
            { text: "View Source", url: "https://github.com/bretmuchow07/dementia-care-app", icon: "fab fa-github", class: "btn-primary" }
        ],
        heroImage: "https://github.com/user-attachments/assets/f52cbd76-cb7e-4eac-925a-9731fc564a55",
        overview: {
            title: "Project Overview",
            content: `
                <p class="mb-4">
                    The <strong>Dementia Care Application</strong> is a mobile-based system designed to support
                    individuals living with dementia by helping them track emotional well-being and preserve
                    meaningful memories.
                    The application enables patients to record moods, store images in a personal gallery, and manage
                    personal profile information securely.
                </p>
                <p>
                    To enhance accessibility and cognitive support, the system integrates the <strong>Gemini
                        API</strong> to automatically generate textual descriptions for uploaded images, helping
                    users who may struggle to remember visual context.
                </p>
            `
        },
        sections: [
            {
                type: "features-grid",
                title: "Key Features",
                items: [
                    { icon: "fas fa-smile-beam text-primary", title: "Mood Tracking", desc: "Log daily moods with descriptions and timestamps." },
                    { icon: "fas fa-images text-success", title: "Memory Gallery", desc: "A secure gallery for personal images to preserve memories." },
                    { icon: "fas fa-robot text-info", title: "AI Descriptions", desc: "Gemini API integration generates context for images to aid memory recall." },
                    { icon: "fas fa-user-shield text-warning", title: "Secure Profile", desc: "Managed via Supabase Auth to ensure patient data privacy." }
                ]
            },
            {
                type: "split-list-code",
                left: {
                    title: "System Architecture",
                    items: [
                        { icon: "fas fa-layer-group text-primary", title: "Frontend", desc: "Flutter for a responsive, cross-platform mobile experience." },
                        { icon: "fas fa-database text-success", title: "Backend", desc: "Supabase for PostgreSQL database, authentication, and secure storage." },
                        { icon: "fas fa-brain text-info", title: "AI Integration", desc: "Google Gemini API for real-time image analysis." },
                        { icon: "fas fa-project-diagram text-warning", title: "Design", desc: "Prototyped in Figma with Gane–Sarson Data Flow Diagrams." }
                    ]
                },
                right: {
                    title: "Database Structure",
                    code: [
                        { label: "profile", content: "{ id, name, email, dob, country, avatar_url }", class: "text-info" },
                        { label: "mood", content: "{ id, category, icon }", class: "text-info" },
                        { label: "patient_mood", content: "{ id, user_id, mood_id, description, timestamp }", class: "text-info" },
                        { label: "gallery", content: "{ id, user_id, image_url, ai_description, created_at }", class: "text-info" }
                    ]
                }
            },
            {
                type: "features-list-cols",
                title: "Future Roadmap",
                bgClass: "bg-light p-5 rounded-4",
                cols: [
                    ["Caregiver monitoring dashboard", "Mood trend visualizations & analytics", "Text-to-speech for accessible image descriptions"],
                    ["Medication reminder notifications", "Multi-language support (Shona/English)"]
                ]
            }
        ]
    },
    "project-shona-wordle": {
        title: "Shona Wordle",
        description: "A delightful local adaptation of the viral Wordle game, designed to promote Shona language learning through engaging daily puzzles.",
        badges: [
            { text: "HTML/CSS/JS", class: "bg-primary" },
            { text: "Bootstrap", class: "bg-secondary" },
            { text: "Game Design", class: "bg-success" }
        ],
        links: [
            { text: "Play Now", url: "https://shonawordle.co.zw/", icon: "fas fa-play", class: "btn-primary" },
            { text: "View Source", url: "#", icon: "fab fa-github", class: "btn-outline-primary" }
        ],
        heroIcon: { icon: "fas fa-gamepad", color: "text-success", text: "Game Interface Preview" },
        overview: {
            title: "About The Game",
            content: `
                 <p class="mb-4">
                    <strong>Shona Wordle</strong> brings the addictive word-guessing gameplay to the Shona speaking
                    community. It challenges players to guess a 5-letter Shona word within 6 tries, providing
                    color-coded feedback to guide them towards the solution.
                </p>
                <p>
                    Beyond just a game, it serves as an educational tool, preserving language and introducing
                    players to vocabulary they might not use daily.
                </p>
            `
        },
        sections: [
            {
                type: "features-grid",
                title: "Key Features",
                items: [
                    { icon: "fas fa-calendar-check text-primary", title: "Daily Puzzles", desc: "A new word every day to keep players coming back." },
                    { icon: "fas fa-fire text-warning", title: "Streak Tracking", desc: "Local storage integration to track wins and consecutive play streaks." },
                    { icon: "fas fa-users text-success", title: "Cultural Values", desc: "Curated dictionary focusing on culturally significant words." }
                ]
            }
        ]
    },
    "project-colt-training": {
        title: "CoLT Training Platform",
        description: "A comprehensive web-based training and certification system enabling efficient training delivery for corporations.",
        badges: [
            { text: "ASP.NET", class: "bg-primary" },
            { text: "C#", class: "bg-secondary" },
            { text: "SQL Server", class: "bg-info" }
        ],
        links: [
            { text: "Internal Project", url: "#", icon: "fas fa-lock", class: "btn-secondary disabled" }
        ],
        heroIcon: { icon: "fas fa-building", color: "text-secondary", text: "Enterprise Platform Dashboard" },
        overview: {
            title: "System Overview",
            content: `
                <p class="mb-4">
                    The <strong>CoLT Training Platform</strong> solves the challenge of managing large-scale
                    corporate training programs. It allows administrators to create courses, track employee
                    progress, and issue automated certifications upon completion.
                </p>
                <p>
                    Built with robust enterprise technologies (ASP.NET), it ensures security, scalability, and
                    reliability for mission-critical training data.
                </p>
            `
        },
        sections: [
            {
                type: "grid-cards",
                title: "Technologies",
                items: [
                    { title: "ASP.NET Core", subtitle: "Robust backend framework", class: "text-primary" },
                    { title: "C#", subtitle: "Type-safe logic layer", class: "text-primary" },
                    { title: "SQL Server", subtitle: "Relational data management", class: "text-primary" }
                ]
            }
        ]
    },
    "project-personal-blog": {
        title: "Bret's Blog",
        description: "My personal digital playground and corner of the web for whatever I want — side quests, creative experiments, hot takes, late-night coding, and honest thoughts.",
        badges: [
            { text: "Side Quests", class: "bg-primary" },
            { text: "Experiments", class: "bg-warning text-dark" },
            { text: "Creative Code", class: "bg-info text-dark" },
            { text: "Live", class: "bg-success" }
        ],
        links: [
            { text: "Visit Blog (blog.bretmuchoni.dev)", url: "https://blog.bretmuchoni.dev", icon: "fas fa-external-link-alt", class: "btn-primary" },
            { text: "GitHub Profile", url: "https://github.com/bretmuchow07", icon: "fab fa-github", class: "btn-outline-primary" }
        ],
        heroIcon: { icon: "fas fa-pen-nib", color: "text-cyan", text: "blog.bretmuchoni.dev" },
        overview: {
            title: "About This Space",
            content: `
                <p class="mb-4">
                    <strong>blog.bretmuchoni.dev</strong> is my little digital playground — a cozy spot on the web
                    where I write about whatever I feel like. It's not meant to be an overly formal corporate publication —
                    just a collection of side quests, late-night coding sprints, creative experiments, and ideas I couldn't shake.
                </p>
                <p class="mb-4">
                    Some posts are about software, some are about tools and experiments, and others are just thoughts
                    on tech, life, and whatever caught my attention. If I found it interesting, it goes up here.
                </p>
                <p>
                    Check it out at <a href="https://blog.bretmuchoni.dev" target="_blank" rel="noopener" class="text-cyan fw-bold">blog.bretmuchoni.dev</a>.
                </p>
            `
        },
        sections: [
            {
                type: "features-grid",
                title: "What You'll Find There",
                items: [
                    { icon: "fas fa-gamepad text-primary", title: "Side Quests & Builds", desc: "Fun prototypes, experiments, and tools built just for the joy of making things." },
                    { icon: "fas fa-flask text-success", title: "Experiments & Hacks", desc: "Late-night coding sessions, unexpected bug discoveries, and creative code." },
                    { icon: "fas fa-lightbulb text-warning", title: "Thoughts & Takes", desc: "Honest perspectives on software, development workflows, and tech life." },
                    { icon: "fas fa-mug-hot text-info", title: "Whatever I Want", desc: "Zero corporate filters, zero rigid editorial agendas — just genuine curiosity." }
                ]
            },
            {
                type: "split-card",
                left: {
                    title: "The Vibe",
                    content: [
                        { icon: "fas fa-globe text-primary", title: "Live at blog.bretmuchoni.dev", desc: "My independent home on the web" },
                        { icon: "fas fa-bolt text-warning", title: "Unfiltered & Casual", desc: "Honest writing without corporate jargon or fluff" },
                        { icon: "fas fa-check-circle text-success", title: "Free & Open", desc: "Read, browse, and explore anytime" }
                    ]
                },
                right: {
                    title: "Visit The Blog",
                    bgClass: "bg-dark text-light",
                    content: `
                        <div class="p-3 text-center">
                            <i class="fas fa-pen-nib text-cyan display-4 mb-3"></i>
                            <h5 class="font-display text-white mb-2">blog.bretmuchoni.dev</h5>
                            <p class="font-mono text-muted-tactical small mb-4">Click below to explore the latest posts and experiments.</p>
                            <a href="https://blog.bretmuchoni.dev" target="_blank" rel="noopener" class="btn-tactical btn-tactical-primary">
                                <i class="fas fa-external-link-alt me-2"></i>GO TO BLOG
                            </a>
                        </div>
                    `
                }
            }
        ]
    }
};
