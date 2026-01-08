const projectsData = {
    "project-clipse-video-player": {
        title: "Clipse Video Player",
        description: "A lightweight, fully customizable, and accessible video player component designed for the modern web.",
        badges: [
            { text: "Vanilla JS", class: "bg-warning text-dark" },
            { text: "NPM Package", class: "bg-danger" },
            { text: "Accessible", class: "bg-success" },
            { text: "Zero Deps", class: "bg-info text-dark" }
        ],
        links: [
            { text: "Source Code", url: "https://github.com/bretmuchow07/clips-video-player", icon: "fab fa-github", class: "btn-primary" },
            { text: "Live Demo", url: "https://clips-video-player-wlhg.vercel.app/", icon: "fas fa-external-link-alt", class: "btn-outline-primary" }
        ],
        heroImage: "assets/clipse-video-player-preview.png",
        heroIcon: null,
        overview: {
            title: "The Modern Video Player",
            content: `
                <p class="mb-4">
                    <strong>Clipse Video Player</strong> is a modern, lightweight interpretation of what a web video player should be.
                    Designed for developers who need control without bloat, it offers a fully accessible and customizable experience
                    right out of the box.
                </p>
                <p class="mb-4">
                    With zero dependencies and a pure Vanilla JS core, it integrates seamlessly into any framework—whether you're
                    rocking React, Vue, Svelte, or plain HTML. It's built for performance, ensuring your media loads fast and plays smooth.
                </p>
            `
        },
        sections: [
            {
                type: "features-grid",
                title: "Everything You Need",
                items: [
                    { icon: "fas fa-sliders-h text-primary", title: "Smart Controls", desc: "Built-in quality selection and settings menu interfaces." },
                    { icon: "fas fa-feather-alt text-success", title: "Lightweight Core", desc: "Zero-dependency architecture optimized for speed." },
                    { icon: "fas fa-code-branch text-info", title: "Event-Driven API", desc: "Rich event emitter system for seamless integration." },
                    { icon: "fas fa-mobile-alt text-warning", title: "Mobile Responsive", desc: "Touch-optimized controls for all devices." }
                ]
            },
            {
                type: "split-card",
                left: {
                    title: "Quick Start",
                    content: [
                        { icon: "fab fa-npm text-danger", title: "Install via NPM", desc: "npm install @clipse_video-player/video-player" },
                        { icon: "fas fa-bolt text-warning", title: "Zero Config", desc: "Works instantly with default settings" },
                        { icon: "fas fa-universal-access text-info", title: "Accessible", desc: "Full keyboard and screen reader support" }
                    ]
                },
                right: {
                    title: "Simple Implementation",
                    bgClass: "bg-dark text-light",
                    content: `
                        <pre class="m-0"><code class="text-light" style="font-family: monospace;">
// HTML
// &lt;div id="player"&gt;&lt;/div&gt;

// JavaScript
import VideoPlayer from '@clipse_video-player/video-player';

const player = new VideoPlayer({
  container: '#player',
  src: 'https://example.com/video.mp4'
});
                        </code></pre>
                    `
                }
            }
        ]
    },
    "project-poster-maker": {
        title: "Poster Maker",
        description: "A modern, feature-rich album poster creator built with React and Fabric.js.",
        badges: [
            { text: "React", class: "bg-primary" },
            { text: "Next.js", class: "bg-dark" },
            { text: "Fabric.js", class: "bg-info text-dark" },
            { text: "Zustand", class: "bg-success" }
        ],
        links: [
            { text: "Source Code", url: "https://github.com/bretmuchow07/poster-maker", icon: "fab fa-github", class: "btn-primary" },
            { text: "Live Demo", url: "#", icon: "fas fa-external-link-alt", class: "btn-outline-primary disabled" }
        ],
        heroImage: "assets/poster-maker-preview.png",
        heroIcon: null, // If no image, use icon
        overview: {
            title: "About This Project",
            content: `
                <p class="mb-4">
                    <strong>Poster Maker</strong> is a specialized web application designed to help users create
                    stunning, professional-grade album posters effortlessly. Whether you're a musician looking to
                    promote your latest release or a fan creating art for your favorite albums, this tool provides a
                    powerful, intuitive interface to bring your vision to life.
                </p>
                <p class="mb-4">
                    The application features a robust canvas editor powered by Fabric.js, allowing for precise
                    manipulation of text, images, and shapes. Users can choose from a variety of pre-designed
                    templates or start from scratch. Key features include drag-and-drop functionality, real-time
                    preview, high-resolution export, and a customizable theme system.
                </p>
                <p>
                    It handles complex state management for the canvas and UI using Zustand, ensuring a smooth and
                    responsive user experience even with complex designs.
                </p>
            `
        },
        sections: [
            {
                type: "highlight-box",
                title: "The Goal",
                icon: "fas fa-lightbulb text-warning",
                content: `"To bridge the gap between complex graphic design software and simple, restrictive templates. Poster Maker aims to give users the creative freedom they need with the ease of use they want."`
            },
            {
                type: "split-card",
                left: {
                    title: "Tech Stack",
                    content: [
                        { icon: "fab fa-react text-primary", title: "React + Next.js", desc: "Modern frontend framework for performance and scalability" },
                        { icon: "fas fa-paint-brush text-warning", title: "Fabric.js", desc: "Interactive HTML5 canvas library" },
                        { icon: "fas fa-database text-success", title: "Zustand", desc: "Small, fast and scalable bearbones state-management solution" }
                    ]
                },
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
            { text: "Play Now", url: "#", icon: "fas fa-play", class: "btn-primary" },
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
        title: "Bret's Corner",
        description: "A digital playground and collection of side quests, experiments, and creative coding projects.",
        badges: [
            { text: "React", class: "bg-primary" },
            { text: "Bootstrap", class: "bg-secondary" },
            { text: "Framer Motion", class: "bg-warning text-dark" },
            { text: "Context API", class: "bg-info text-dark" }
        ],
        links: [
            { text: "Source Code", url: "#", icon: "fab fa-github", class: "btn-primary disabled" },
            { text: "Live Demo", url: "#", icon: "fas fa-external-link-alt", class: "btn-outline-primary disabled" }
        ],
        heroIcon: { icon: "fas fa-laptop-code", color: "text-muted", text: "Interactive Portfolio Preview" },
        overview: {
            title: "About This Space",
            content: `
                <p class="mb-4">
                    <strong>Bret’s Corner</strong> is my little digital playground — a cozy spot on the web where I
                    stash the cool things I’ve been working on. It’s not meant to be overly formal or polished —
                    just a collection of side quests, late-night coding sprints, and ideas I couldn’t shake.
                </p>
                <p class="mb-4">
                    Some projects are done, some are forever “in progress,” and others are just experiments I had
                    fun with. Whether it's a quick app, a weird concept, or something I'm surprisingly proud of —
                    it's all here, under one roof.
                </p>
                <p>
                    This isn’t just a portfolio — it’s a corner of the internet that feels like me.
                </p>
            `
        },
        sections: [
            {
                type: "highlight-box",
                title: "Why This Exists",
                icon: "fas fa-lightbulb text-warning",
                content: `"Because not every project needs to be production-grade. Sometimes you just want to make stuff, learn stuff, and share the journey. Bret’s Corner is exactly that."`
            },
            {
                type: "split-card",
                left: {
                    title: "Tech Stack",
                    content: [
                        { icon: "fab fa-react text-primary", title: "React + Bootstrap", desc: "Core frontend framework and styling" },
                        { icon: "fas fa-magic text-warning", title: "Framer Motion", desc: "Slick animations and transitions" },
                        { icon: "fas fa-moon text-dark", title: "Context API", desc: "State management for themes/dark mode" }
                    ],
                    footer: `<p class="mt-3 mb-0 small text-muted"><i class="fas fa-mug-hot me-2"></i>And a bunch of coffee, probably.</p>`
                },
            }
        ]
    }
};
