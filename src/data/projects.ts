export interface Hook {
  moment: string;
  decision: string;
  truth: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  cardDescriptor: string;
  year: string;
  status: 'Completed' | 'In Progress' | 'Concept';
  category: string[];
  tech: string[];
  platform: string;
  coverGradient: string;
  coverImage?: string;
  featured: boolean;
  hook: Hook;
  tabs: {
    story: {
      content: string;
    };
    craft: {
      notes: string;
    };
    visuals: {
      images: string[];
    };
  };
}

export const PROJECTS: Project[] = [
  {
    id: 'pixels',
    title: 'Pixels',
    tagline: '48 slots. One truth.',
    cardDescriptor: 'Rebuilt V1 because the interactions felt purposeless to me — not to users. That\'s a harder reason to admit.',
    year: '2024',
    status: 'Completed',
    category: ['Productivity', 'Solo'],
    tech: ['SwiftUI', 'SwiftData'],
    platform: 'iOS 17+',
    coverGradient: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 60%, #1a0a2e 100%)',
    featured: true,
    hook: {
      moment: 'I shipped V1 and felt nothing. Not pride. Not relief. Just the hollow recognition that I\'d built something to finish, not something to mean.',
      decision: 'Tear it down. Rebuild around a single question: what does it actually feel like to account for a day honestly?',
      truth: 'Purposelessness is a design flaw. If the person who built it doesn\'t believe it, no one else will either.',
    },
    tabs: {
      story: {
        content: `The first version of Pixels worked. It logged activities, it stored data, it had a UI that didn't embarrass me. By every surface measure, it was done.

But I kept not opening it.

That was the signal. Not a user complaint. Not a mentor's note. Just the quiet fact that I — the person this app was supposed to be for — didn't reach for it. When I asked myself why, the honest answer was uncomfortable: I'd built it to fill a brief, not to solve something I actually felt. The concept was neat. The execution was competent. But the soul of it was missing.

So I went back to the original feeling. The one that started the whole thing. Days passing without a trace. The specific anxiety of a Sunday night where you can't account for where the week went — not because you were lazy, but because nothing captured it. Planning apps show what you intend. I wanted something that showed what you did. The truth of a day, not the aspiration of one.

That reframe changed every decision in V2. The date strip only scrolls backward — because this app is about reflection, not planning. The 24-hour grid uses 30-minute blocks — granular enough to be honest, forgiving enough to be human. Conflict detection on save — because a messy log defeats the purpose. The Insight view doesn't project forward. It just shows you the pattern you already made.

V2 wasn't a redesign. It was a recommitment to the question underneath the app.`,
      },
      craft: {
        notes: `Every technical decision in Pixels came from one constraint I imposed on myself: the app had to feel like it was telling the truth.

**SwiftUI + SwiftData** — not because it was the path of least resistance, but because native-first meant no dependencies to maintain and no performance compromises. Logging should feel instant. Anything less breaks the illusion that the app is simply capturing what's already real.

**Offline-first architecture** — the journal lives on the device entirely. No sync delay, no loading state, no moment where the app reminds you it needs a server to function. Your day is yours. It doesn't live in a cloud somewhere.

**Apple HIG as a design constraint** — familiar patterns lower friction to near zero. The interaction model for adding an activity should never make you think. If you're thinking about the app, you're not thinking about your day.

The **30-minute block structure** was a deliberate opinion. It's granular enough that you can't lie to yourself about how you spent four hours. It's coarse enough that you don't spiral trying to log every 10 minutes. That tension — between honest and human — is where the whole product lives.

**Conflict detection on save** was the decision that cost the most time and mattered the most. An overlapping log isn't just a UX bug. It undermines the whole premise. If the record is inaccurate, the insight is worthless. So the app simply doesn't allow it.`,
      },
      visuals: {
        images: [],
      },
    },
  },

  {
    id: 'edufund',
    title: 'EduFund',
    tagline: 'AHP-TOPSIS for policy planners who can\'t afford to be wrong.',
    cardDescriptor: 'Data that earns trust.',
    year: '2024',
    status: 'Completed',
    category: ['Web', 'EdTech'],
    tech: ['React', 'TypeScript', 'TailwindCSS', 'Vercel'],
    platform: 'Web · Live',
    coverGradient: 'linear-gradient(135deg, #0a1628 0%, #0d1f3c 60%, #0f2547 100%)',
    featured: true,
    hook: {
      moment: 'The algorithm worked. Then I looked at who would actually use it — a policy planner with no technical background, making decisions that affect real schools — and realized working wasn\'t enough.',
      decision: 'Design the output for the person reading it, not the person who built it. Every number needed a reason. Every result needed to feel earned.',
      truth: 'The hardest part of building tools for real decisions isn\'t the math. It\'s making the answer trustworthy to someone who didn\'t do the math.',
    },
    tabs: {
      story: {
        content: `Papua Pegunungan Province has some of the most severe educational infrastructure gaps in Indonesia. Limited classrooms, no electricity in some districts, almost no computers. And a budget that can't fix everything at once.

The problem we were given was a prioritization problem: given multiple districts with multiple deficiencies, where does the money go first? The academic framing pointed us toward multi-criteria decision analysis. We chose AHP-TOPSIS — Analytic Hierarchy Process to weight the criteria, TOPSIS to rank the districts against an ideal solution.

The math came together faster than I expected. What stopped me was a different question.

I started thinking about who would actually sit in front of this tool. Not a data scientist. A policy planner. Someone who has spent their career in government, who cares about these communities, and who is now being asked to trust a ranked list produced by an algorithm they didn't write. If the output felt like a black box — here's your answer, district four is first — there was no reason for them to believe it. And if they didn't believe it, it didn't matter how accurate the model was.

So the design became the problem. The 4-step wizard wasn't a UX flourish — it was an argument. Step one: you set the criteria. Step two: you weight them against each other, pairwise. Step three: you enter the data yourself. Step four: here's the ranking, and here's exactly why. Every decision the algorithm makes is visible. The planner didn't just receive an output — they participated in producing it.

That's the thing I remember most about building EduFund. Not the implementation. The moment I understood that trustworthy and accurate are not the same thing.`,
      },
      craft: {
        notes: `The core technical challenge was implementing AHP-TOPSIS from scratch in a React frontend with no backend. This was a course constraint, but it shaped every architectural decision.

**AHP (Analytic Hierarchy Process)** handles the subjectivity problem — different stakeholders weight criteria differently. By having the planner do pairwise comparisons (is classroom condition more important than electricity access, and by how much?), the model encodes their judgment rather than ours. **TOPSIS** then ranks each district by its distance from the ideal solution and its distance from the worst case. The district that ranks first is simultaneously closest to the best possible outcome and furthest from the worst.

All of this runs **client-side in React 18**. No server calls during the calculation. The model is stateful across four steps, holding user inputs in component state and computing the final matrix only when all data is present. This meant the app is fully usable offline after the initial load — which matters in contexts where connectivity isn't guaranteed.

**Tailwind CSS** was chosen for the speed of building a responsive layout that would work on whatever screen a government planner might be using. **Vercel** for deployment — one command, instant public URL, no infrastructure management. The goal was to make the tool as accessible to share as possible.

The decision to show intermediate calculations — the pairwise comparison matrix, the normalized weights, the TOPSIS scores — was deliberate. It made the UI more complex. It also made the output defensible.`,
      },
      visuals: {
        images: [],
      },
    },
  },

  {
    id: 'suara-tangan',
    title: 'Suara Tangan',
    tagline: 'Who\'s missing from the room?',
    cardDescriptor: 'The community changed the product more than the technology did.',
    year: '2024',
    status: 'Concept',
    category: ['AI', 'Accessibility'],
    tech: ['Azure Cognitive Services', 'Azure Functions', 'React Native', 'Figma'],
    platform: 'Concept · Winner',
    coverGradient: 'linear-gradient(135deg, #0d1a0d 0%, #1a2e1a 60%, #0d1a0d 100%)',
    featured: true,
    hook: {
      moment: 'We had a solid concept. Good architecture. A compelling pitch. Then we sat down with someone from the deaf community and realized we\'d been designing a solution without fully knowing the problem.',
      decision: 'Let the interview change the product, not just validate it. Actually listen.',
      truth: 'The most important technical decision we made was a human one.',
    },
    tabs: {
      story: {
        content: `We entered the Microsoft AI for Accessibility Hackathon with what felt like a strong idea. Indonesia has over 255,000 deaf and hard-of-hearing individuals whose primary language is BISINDO — Indonesian Sign Language — but almost no technology that bridges it to spoken Indonesian in real time. The gap was obvious. The technical path was clear: computer vision, gesture detection, Azure Cognitive Services, two-way translation. We were confident.

Then we got the chance to talk to someone who actually lived inside the problem.

She was an alumni from our university, deaf, and when we asked about the pain points, she didn't give us a feature list. She talked about the exhaustion of navigating a world that assumes you can hear. The specific frustration of speech-to-text tools that don't work for people who don't speak in the expected patterns. The fact that in Indonesia, very few hearing people know any BISINDO at all — so the communication gap isn't just technical, it's cultural. And then she said something that stayed with me: there's a lack of people using technology to address this in the Indonesian context specifically.

That last part reframed everything. We weren't building a novelty. We were filling a gap that the community had been waiting on. That felt different. The competition entry stopped being a competition entry.

It changed how we designed the interface. We'd been thinking about the hearing user as the primary actor — the person learning to communicate across the gap. After the conversation, we centered the deaf user instead. The camera translator, the voice translator, the video translator — each mode exists because different situations demand different tools, and we wanted the person navigating those situations to have options, not a single workaround.

It also changed what I thought leadership meant on a project like this. My job wasn't to drive the vision. It was to make sure we were building toward something real.`,
      },
      craft: {
        notes: `Suara Tangan is a product concept, not a shipped app. The craft here is in the architecture of the proposal and the design of the prototype — the decisions about what to build, how it would work, and why those choices served the community we were designing for.

**The translation pipeline** is built around Azure Cognitive Services. The flow: a user opens the camera, the app captures a live feed of someone signing, hand gestures and body motion are detected and annotated frame by frame, frames are sent via an Azure Functions API to a deep learning model trained on BISINDO datasets, the model outputs text, Azure Speech converts that text to audio. Two-way: the reverse path handles spoken Indonesian and converts it to text for the deaf user.

The choice of **Azure** was partly pragmatic — the hackathon had a Microsoft infrastructure requirement — but the Azure Functions architecture was a deliberate decision. Keeping the translation model server-side means the mobile app stays lightweight and the model can be updated without a new app release. For a product that depends on an improving dataset, that matters.

The **interface design** was built in Figma with three primary translation modes — camera, voice, video — because the use case changes dramatically by context. A one-on-one conversation has different needs than a lecture or a customer service counter. Rather than designing one mode and calling it universal, we designed three and let the user decide.

The **business model** was designed to keep the app permanently free for end users. Revenue from grants, government partnerships, and non-disruptive advertising keeps the access barrier at zero — because a paid accessibility tool is a contradiction in terms.

The hardest design challenge wasn't technical. It was deciding what to cut. Every feature we added was a feature a non-technical user had to trust. We kept the core tight: translate, communicate, manage your account. Everything else is future scope.`,
      },
      visuals: {
        images: [],
      },
    },
  },

  {
    id: 'share-eat',
    title: 'Share-Eat',
    tagline: 'A community food-sharing platform that turns surplus into connection.',
    cardDescriptor: 'Reducing waste while building community — one neighbour at a time.',
    year: '2024',
    status: 'Completed',
    category: ['Mobile', 'Community'],
    tech: ['SwiftUI', 'Supabase', 'MapKit', 'CoreLocation', 'Swift'],
    platform: 'iOS 17+',
    coverGradient: 'linear-gradient(135deg, #1a2a1a 0%, #0d2310 60%, #142814 100%)',
    coverImage: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&q=80&auto=format&fit=crop',
    featured: true,
    hook: {
      moment: '',
      decision: '',
      truth: '',
    },
    tabs: {
      story: {
        content: 'Share-Eat connects neighbours with surplus food to those who need it — reducing waste while building community. The app features real-time listings, in-app messaging, and a map-first discovery experience.',
      },
      craft: {
        notes: 'Built on a Supabase backend with Row Level Security policies. Real-time subscriptions power the live feed. MapKit clusters overlapping pins for performance at scale.',
      },
      visuals: {
        images: [
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
          'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&q=80',
        ],
      },
    },
  },

  {
    id: 'cv-attendance',
    title: 'CV Attendance',
    tagline: 'Facial-recognition attendance tracking for classrooms — no sign-in sheets.',
    cardDescriptor: 'Automated presence. Real-time dashboard. No friction.',
    year: '2024',
    status: 'Completed',
    category: ['Computer Vision', 'EdTech'],
    tech: ['Python', 'OpenCV', 'FastAPI', 'React', 'PostgreSQL'],
    platform: 'Web + Desktop',
    coverGradient: 'linear-gradient(135deg, #0a1628 0%, #0d1f3c 60%, #0f2547 100%)',
    featured: true,
    hook: {
      moment: '',
      decision: '',
      truth: '',
    },
    tabs: {
      story: {
        content: 'Automated attendance system using live camera feeds and face recognition. Reduces admin overhead and gives lecturers a real-time presence dashboard.',
      },
      craft: {
        notes: 'Face embeddings generated with a fine-tuned FaceNet model. FastAPI serves the inference endpoint. React dashboard polls via SSE for live updates.',
      },
      visuals: {
        images: [
          'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&q=80',
        ],
      },
    },
  },

  {
    id: 'portfolio-v2',
    title: 'Portfolio v2',
    tagline: 'The very site you\'re looking at — designed and built from scratch.',
    cardDescriptor: 'Obsessive attention to spacing, motion, and type.',
    year: '2025',
    status: 'In Progress',
    category: ['Web', 'Design'],
    tech: ['Next.js', 'TypeScript', 'Framer Motion', 'TailwindCSS', 'Lenis'],
    platform: 'Web',
    coverGradient: 'linear-gradient(135deg, #050810 0%, #0a0f1e 60%, #0d1117 100%)',
    featured: true,
    hook: {
      moment: '',
      decision: '',
      truth: '',
    },
    tabs: {
      story: {
        content: 'A personal portfolio that doubles as a design system exercise — obsessive attention to spacing, motion, and type. Every interaction is intentional.',
      },
      craft: {
        notes: 'Lenis + Framer Motion architecture with strict scroll-sync rules. CSS-only parallax in BeyondCode. Flip cards use CSS 3D transforms, no JS on idle.',
      },
      visuals: {
        images: [],
      },
    },
  },

  {
    id: 'bali-connect',
    title: 'Bali Connect',
    tagline: 'Hyper-local event discovery for the digital-nomad community in Bali.',
    cardDescriptor: 'Verified organisers. No algorithm.',
    year: '2025',
    status: 'Concept',
    category: ['Mobile', 'Community'],
    tech: ['SwiftUI', 'Supabase', 'MapKit'],
    platform: 'iOS',
    coverGradient: 'linear-gradient(135deg, #1a1000 0%, #2a1a00 60%, #1f1400 100%)',
    coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80&auto=format&fit=crop',
    featured: false,
    hook: {
      moment: '',
      decision: '',
      truth: '',
    },
    tabs: {
      story: {
        content: 'A curated events board for co-working, surf, and community meetups across Seminyak, Canggu, and Ubud. Verified organisers, no algorithm.',
      },
      craft: {
        notes: 'Early concept stage — mapping UX and data model.',
      },
      visuals: {
        images: [],
      },
    },
  },

  {
    id: 'design-system',
    title: 'Dark DS',
    tagline: 'A personal design system — tokens, components, and interaction patterns.',
    cardDescriptor: 'A living system used across every personal project.',
    year: '2024',
    status: 'In Progress',
    category: ['Design', 'Tooling'],
    tech: ['Figma', 'TailwindCSS', 'TypeScript', 'Storybook'],
    platform: 'Figma + Web',
    coverGradient: 'linear-gradient(135deg, #100a1a 0%, #1a0f2a 60%, #0d0a1f 100%)',
    featured: false,
    hook: {
      moment: '',
      decision: '',
      truth: '',
    },
    tabs: {
      story: {
        content: 'A living design system used across personal projects — standardised spacing, a dark token palette, and reusable Framer Motion variants.',
      },
      craft: {
        notes: 'CSS custom properties synced to Figma variables. Storybook for interactive component docs.',
      },
      visuals: {
        images: [],
      },
    },
  },
];
