export interface Link {
  label: string;
  url: string;
}

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
  role: string;
  links: Link[];
  hook: Hook;
  tabs: {
    story: { content: string };
    craft: { notes: string };
    visuals: { images: string[] };
  };
}

export const PROJECTS: Project[] = [
  {
    id: 'pixels',
    title: `Pixels`,
    tagline: `Your day. In truth.`,
    cardDescriptor: `A text journal that logs what you actually did, hour by hour. Not how you felt. What happened.`,
    year: '2026',
    status: 'In Progress' as const,
    category: ["iOS","Journaling"],
    tech: ["Swift","SwiftUI","Core Data","iOS 17+"],
    platform: `iOS 17+`,
    coverGradient: `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`,
    featured: true,
    role: `Solo Developer`,
    links: [{ label: 'GitHub', url: 'https://github.com/teresakae' }],
    hook: {
      moment:   `I shipped V1 and felt nothing. Not pride, not relief, just the hollow recognition that I'd built something to finish, not something to mean.`,
      decision: `Tear it down and rebuild around one question: what does it actually feel like to account for a day honestly?`,
      truth:    `Purposelessness is a design flaw. If the person who built it doesn't believe in it, no one else will either.`,
    },
    tabs: {
      story:   { content: `The first challenge at the Apple Developer Academy had a deceptively simple brief: build a 2-page, fully offline app that solves a personal problem. The goal wasn't a polished product. It was learning to connect the dots between Miro, Sketch, and Xcode.

My personal problem: I constantly felt like I was losing track of time. Days slipped away without me knowing what I'd actually done. Most journaling apps I tried asked me to rate my mood or write a reflection. I didn't want reflection. I wanted a record.

Coming from a technical background, my instinct was to speed-run the code. I got something working quickly. But looking at it honestly, it felt lackluster. It had the logic. It didn't have soul. It solved the mechanics of the brief without solving the human side of the problem.

So I scrapped it. I gave myself a strict 3-day constraint for the redo.

Day 1, design and ego-checking: lo-fi to hi-fi in Sketch. More importantly, I sat with my mentor Wais Ibrahim to absorb feedback on visual hierarchy and layout rules, absorbing things I'd been too fast to learn the first time around.

Day 2, architecture and code: translating those designs into SwiftUI and setting up SwiftData so the app runs flawlessly in airplane mode. No accounts, no cloud, no external dependencies, a private record is a design decision, not an oversight.

Day 3, the polish: finalising details like pinch-to-zoom gestures on the 24-hour grid and adaptive text colors, plus documenting the journey.

What I shipped was Pixels, an offline daily activity journal where instead of logging what I plan to do, I log what I actually did in 30-minute blocks. Over time, it generates a year-in-pixels visual recap.

There is something incredibly rewarding about throwing away 'good enough' to build something real. The rebuild wasn't prompted by external feedback. It came from sitting with the app and realising it didn't feel true to its own purpose. That experience taught me something I now apply to every project: if the thing you built doesn't make you want to use it, the problem isn't the features. It's the intention.` },
      craft:   { notes:   `## The Rebuild Decision

The original version used a different interaction model for entry creation. I rebuilt around a single insight: the friction of logging should be as close to zero as possible. The interface should get out of the way. This shaped every SwiftUI decision. No onboarding, no prompts, no mood pickers.

## Architecture

SwiftData handles local persistence with a straightforward entry model: timestamp, text content, and hour slot. No sync, no cloud, intentional. Privacy is a design decision here, not an oversight.

## Performance Issues (Identified on Real Device)

Two known issues flagged during testing:

**Pinch zoom lag**, \`MagnificationGesture\` updates \`rowHeight\` on every tick, triggering a full re-render of all 48 \`SlotRowView\`s. Fix: use \`@GestureState\` for the in-flight scale value, only commit \`rowHeight\` on \`onEnded\`.

**Drag resize not smooth**, \`dragOffset\` is \`@State\` on \`ActivityBlockView\` but positioned inside a \`ZStack\` in \`TimeGridView\`, meaning state changes invalidate the parent layout. Fix: wrap each \`ActivityBlockView\` in an \`equatable\` container so drag offset changes don't bubble up.

## What I'd Do Differently

The hour-slot model is rigid. Real days don't divide neatly into hours. A future version would let entries float within a day rather than snap to a grid, preserving the honesty principle while fitting how people actually live.` },
      visuals: { images:  [] },
    },
  },

  {
    id: 'brew',
    title: `Brew`,
    tagline: `Every brew, timed perfectly.`,
    cardDescriptor: `A SwiftUI coffee timer app with a 60fps countdown ring, phase-by-phase guidance, SwiftData persistence, and full recipe creation and editing.`,
    year: '2026',
    status: 'Completed' as const,
    category: ["iOS","Productivity","Food"],
    tech: ["Swift","SwiftUI","SwiftData","iOS 17+"],
    platform: `iOS 17+`,
    coverGradient: `linear-gradient(135deg, #1c0a00 0%, #3d1f00 50%, #6b3a00 100%)`,
    featured: false,
    role: `Solo Developer`,
    links: [{ label: 'GitHub', url: 'https://github.com/teresakae' }],
    hook: {
      moment:   `I'd been brewing coffee by feel for years, eyeballing timings that are supposed to be precise, and wondering why the results were inconsistent.`,
      decision: `Build the app I actually wanted: pick a recipe, start the timer, follow the phases, don't think, and make the engineering underneath it good enough to disappear.`,
      truth:    `A naive timer drifts. The interesting problem was wall-clock diffing, a 5-state machine, and a render loop that updates at 60fps without ever mutating the ViewModel.`,
    },
    tabs: {
      story:   { content: `Brew is a coffee timer app built during Challenge 3 at the Apple Developer Academy Bali. The brief was open-ended, build something useful. I drink coffee every morning and I've always followed recipes loosely, eyeballing timings that are supposed to be precise.

The app I wanted was simple: pick a recipe, start the timer, follow the phase instructions, don't think. What I built is exactly that, but the engineering underneath it took more thought than the surface suggests.

The central challenge was the timer. A naive timer that fires every second drifts over a 4-minute brew. I built a wall-clock diffing system: the ViewModel banks elapsed time on pause, uses a start timestamp on resume, and the render loop (TimelineView at 60fps) calculates display values from the difference. No state mutations per frame. The result is a timer that stays accurate across pause/resume cycles and background/foreground transitions.

SwiftData handles persistence. Recipes survive app restarts. The phase ordering problem, SwiftData fetch order isn't guaranteed, is solved with an explicit sortOrder property on each BrewPhase, set at save time and used to restore sequence on load.

Brew is still in progress (audio and push notifications are next), but the core is complete: create recipes, brew them, edit them, delete them. It works.` },
      craft:   { notes:   `## Timer Architecture

The timer uses a 5-state machine: \`.idle → .running → .paused → .transitioning → .finished\`. The \`.transitioning\` state adds a 1.5s handoff window between phases, giving the UI time to animate before the next phase starts.

Elapsed time is calculated as:
\`\`\`
elapsed = priorElapsed + (now - segmentStartDate)
\`\`\`
This eliminates drift across pause/resume cycles. \`segmentStartDate\` is reset on each resume; \`priorElapsed\` banks the total before the pause.

## Render Loop

\`TimelineView(.animation)\` drives the countdown ring at 60fps. Critically, it never mutates ViewModel state, all ring progress is computed at render time from the ViewModel's elapsed time. This keeps the main thread clean.

## SwiftData Decisions

- \`RecipeItem\` and \`BrewPhase\` are both \`@Model\` classes with a cascade delete relationship
- \`sortOrder: Int\` on \`BrewPhase\` solves the fetch-order problem
- Editor uses a separate \`RecipeData\` struct (not a \`@Model\`) as a scratchpad, converted to \`BrewPhase\` on save
- Phase deletion on edit: \`context.delete\` each old phase before reassigning, preventing orphaned records

## Known Gaps
- Audio not yet wired (AVAudioPlayer placeholder exists)
- Push notifications not connected (UNUserNotificationCenter stub in place)
- Bloom duration in French Press sample should be 30s, not 3s` },
      visuals: { images:  [] },
    },
  },

  {
    id: 'edufund',
    title: `EduFund`,
    tagline: `Data-driven decisions for education.`,
    cardDescriptor: `Interactive DSS web app using AHP-TOPSIS algorithms to rank Papua Pegunungan districts by educational funding urgency. Built in a team of 2, live on Vercel.`,
    year: '2025',
    status: 'Completed' as const,
    category: ["AI/ML","Web/Desktop App","EdTech","Decision Systems"],
    tech: ["React 18","Tailwind CSS","Vite","Vercel","AHP-TOPSIS"],
    platform: `Web · Live`,
    coverGradient: `linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #415a77 100%)`,
    featured: true,
    role: `Full-Stack Developer`,
    links: [{ label: 'GitHub', url: 'https://github.com/teresakae/EduFund-Decision' }, { label: 'Live', url: 'https://edufund.vercel.app' }],
    hook: {
      moment:   `The algorithm worked, then I looked at who would actually use it and realised working wasn't enough.`,
      decision: `Design the output for the person reading it, not the person who built it. Every number needed a reason. Every result needed to feel earned.`,
      truth:    `The hardest part of building tools for real decisions isn't the math, it's making the answer trustworthy to someone who didn't do the math.`,
    },
    tabs: {
      story:   { content: `EduFund was built for a Decision Support Systems course assignment with a genuine real-world brief: help policymakers in Papua Pegunungan Province decide which districts to prioritise for educational infrastructure funding.

The context: Papua Pegunungan, formed by Law No. 16 of 2022, faces the most complex educational infrastructure challenges in Indonesia. Entirely high-altitude terrain (1,500–4,000m), accessible only by air, with around 72% of 10-year-olds unable to read at grade level. Four districts in the province showed the highest urgency based on 2022/23 data: Nduga (lowest HDI nationally at 37.68), Puncak (only 47% of schools with electricity), Yahukimo (154 severely damaged classrooms), and Pegunungan Bintang (no computer access at all).

The technical approach: AHP (Analytic Hierarchy Process) for criteria weighting, how much does classroom condition matter relative to library access, electricity, or computer access?, and TOPSIS (Technique for Order Preference by Similarity to Ideal Solution) for district ranking. Both algorithms implemented from scratch in JavaScript.

The AHP weighting we derived: classroom condition and electricity access tied at 35.1% each (both primary infrastructure), computer access at 18.9%, library access at 10.9%. Consistency Ratio: 0.37%, well within the acceptable 10% threshold.

Building in a team of 2, I focused on making the 4-step wizard UX work for a non-technical user: criteria setup → AHP pairwise comparison → data input → ranked results. Each step has validation and explanatory copy. The output page shows not just rankings but the reasoning, which criteria drove the score, what each district's actual condition is.

The app is live on Vercel. Shipping a real URL you can hand to someone is different from a local demo.` },
      craft:   { notes:   `## AHP-TOPSIS Implementation

AHP generates criteria weights through pairwise comparison matrices. The user compares each pair of criteria (e.g. 'classroom condition vs library access') on a 1–9 scale. The algorithm derives consistent weights from the comparison matrix.

TOPSIS ranks alternatives by distance from the ideal solution: the alternative closest to the best possible score on all criteria and furthest from the worst.

**Key implementation detail:** Both algorithms require careful normalisation. TOPSIS normalises the decision matrix before calculating ideal solutions, getting this order wrong produces incorrect rankings.

## UX Decisions

The 4-step wizard was designed so a district education officer. Not a data analyst, could use it without training. Each step has: a plain-language explanation of what they're doing, validation that prevents invalid inputs, and a back button.

The output page was redesigned twice. Version 1 showed only a ranked table. Version 2 added district condition summaries and the criteria that drove each score. The second version is what got deployed.

## Live Deployment

Hosted on Vercel. Mobile responsive, designed for tablet use in the field.` },
      visuals: { images:  [] },
    },
  },

  {
    id: 'path-predict',
    title: `PathPredict`,
    tagline: `Your smarter commute starts here.`,
    cardDescriptor: `Logistic regression model predicting KRL vs TransJakarta congestion from Satu Data Jakarta, achieving 82% accuracy. Built as the backend developer in a team of 3.`,
    year: '2025',
    status: 'Completed' as const,
    category: ["AI/ML","Web","Transport"],
    tech: ["Python","Flask","scikit-learn","Pandas","Joblib","JavaScript"],
    platform: `Web`,
    coverGradient: `linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #3730a3 100%)`,
    featured: false,
    role: `Backend Developer`,
    links: [{ label: 'GitHub', url: 'https://github.com/teresakae/PathsPredict' }],
    hook: {
      moment:   `Jakarta commuters face a daily dilemma, KRL or TransJakarta, and the wrong choice during peak hour costs 30–60 minutes.`,
      decision: `Own the entire backend layer solo: data ingestion, feature engineering, logistic regression, Flask API, Joblib serialisation, and make it work with a frontend I didn't build.`,
      truth:    `82% accuracy sounds good until you ask what the 18% failure rate looks like, real-world data resists neat models, and that gap between benchmark and reliability is a lesson I carry into every ML project.`,
    },
    tabs: {
      story:   { content: `PathPredict was built for a Decision Support Systems course assignment. The problem: Jakarta's two main public transit systems, KRL commuter rail and TransJakarta BRT, have wildly different congestion patterns. A commuter choosing wrong during peak hour loses significant time.

We built a web tool: input your travel window, get a congestion forecast and a route recommendation. The dataset came from Satu Data Jakarta (2024–2025 passenger records).

As the backend developer, I designed and implemented the full prediction pipeline: data loading and cleaning with Pandas, feature engineering (date/time decomposition, route encoding), logistic regression model with scikit-learn, serialisation with Joblib, and a Flask API that the frontend could query.

We hit 82% accuracy on the test set. In absolute terms, that's reasonable for a binary classification problem on real-world transit data. In practical terms, it means the model fails on roughly 1 in 5 predictions, usually on days with unscheduled disruptions that aren't in the training data.

The most useful thing I took from this project: learning to be the 'backend person' in a small team. Translating abstract model logic into a clean API that a frontend developer can use without understanding the ML is a different skill than training the model itself.` },
      craft:   { notes:   `## Model

Logistic regression on binary target: High congestion (1) vs Low congestion (0).

Features: date, day of week, time window, route (KRL/TransJakarta), historical passenger volume.

Train/test split: 80/20 stratified by congestion label.

Final accuracy: 82%. Precision/Recall not optimised, this was a course project, not a production model.

## API Design

Flask REST endpoint: POST \`/predict\` with date and route parameters → returns congestion level and recommendation string.

Joblib serialises both the trained model and the preprocessing scaler as separate files, this is important for ensuring the test-time feature distribution matches training.

## What I'd Do Differently

The model has no mechanism for handling distribution shift. A production version would need: rolling retraining on recent data, anomaly detection for unscheduled events, and confidence intervals on the output (rather than a single prediction).` },
      visuals: { images:  [] },
    },
  },

  {
    id: 'suara-tangan',
    title: `Suara Tangan`,
    tagline: `Giving a voice to every hand.`,
    cardDescriptor: `1st place at the Microsoft AI for Accessibility Hackathon. Real-time two-way translation between BISINDO sign language and spoken Indonesian, built for Indonesia's 19,000+ deaf and hard-of-hearing community.`,
    year: '2025',
    status: 'Concept' as const,
    category: ["AI/ML","Accessibility","Mobile"],
    tech: ["Figma","Azure Cognitive Services","Flutter"],
    platform: `Mobile Concept`,
    coverGradient: `linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)`,
    featured: true,
    role: `Team Lead`,
    links: [{ label: 'GitHub', url: 'https://github.com/teresakae' }],
    hook: {
      moment:   `We had a solid concept, good architecture, a compelling pitch, then we sat with someone from the deaf community and realised we'd been designing a solution without fully knowing the problem.`,
      decision: `Let the interview change the product, not just validate it. Actually listen.`,
      truth:    `The most important technical decision we made that week was a human one.`,
    },
    tabs: {
      story:   { content: `Suara Tangan was built for the Microsoft AI for Accessibility Hackathon 2024, and won 1st place.

The premise: Indonesia has over 19,000 deaf and hard-of-hearing individuals who rely on BISINDO (Indonesian Sign Language) to communicate. There's no real-time digital translation layer between BISINDO and spoken Indonesian. That gap creates daily friction in healthcare, education, and employment.

Our solution was a mobile app using Azure Computer Vision and NLP to provide two-way, real-time translation: sign to speech, and speech to on-screen text. A person using BISINDO points their camera at the screen; a hearing person speaks naturally. The app bridges both directions.

The original concept was also extended in a university course project (SIP 118: Mobile Application Programming), where we built a functional Android prototype with three input modes, camera-based gesture recognition, speech-to-text, and video upload, along with a full user support system and CRUD-based notification architecture.

Leading a team through a one-week sprint taught me things no coursework had. The hardest moments weren't technical, they were decisions about scope. What does a working demo need to prove, and what can stay in the pitch deck?

The feedback we received from a community member mid-week. That our original UI assumed the user was comfortable with Latin script, which not all BISINDO users are, reshaped the final design. That conversation was worth more than any Azure documentation.

The Android rebuild started with data layer and account configuration architecture. It's a concept with a working foundation, not a shipped product. But the problem it's trying to solve is real, and the community feedback that shaped it is something I want to honour in whatever comes next.` },
      craft:   { notes:   `## Technical Approach

Azure Cognitive Services provided the computer vision layer for gesture recognition. The NLP pipeline handled text-to-speech output for the hearing-to-deaf direction. Flutter was chosen for cross-platform reach and its strong camera/overlay capabilities.

## What We Built vs. What We Pitched

The working demo covered: camera-based gesture capture → recognized sign → spoken output. The pitch covered: full two-way translation with notification-style overlays, onboarding flow, and community-moderated sign dictionary.

Being honest about the gap between demo and vision, and making that honesty part of the pitch, was a deliberate choice that the judges responded to.

## What I'd Build Differently

If Suara Tangan were a real product, the first thing I'd change is the sign dictionary architecture. Azure's off-the-shelf models aren't trained on BISINDO specifically, they require significant fine-tuning. A community-contribution layer for building that dataset would be the actual technical moat.` },
      visuals: { images:  [] },
    },
  },

  {
    id: 'fruit-detector',
    title: `Fruit Detector`,
    tagline: `Seeing fruit, learning to see.`,
    cardDescriptor: `YOLOv8n object detection model trained to identify apples, bananas, and oranges. Built with Ultralytics, Roboflow, and Google Colab as a team course project for SIP 107.`,
    year: '2025',
    status: 'Completed' as const,
    category: ["AI/ML","Computer Vision"],
    tech: ["Python","YOLOv8","Ultralytics","Google Colab","Roboflow"],
    platform: `Jupyter / Colab`,
    coverGradient: `linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)`,
    featured: false,
    role: `ML Engineer`,
    links: [{ label: 'GitHub', url: 'https://github.com/teresakae/TugasFruitDetector' }],
    hook: {
      moment:   `Before you can build AI products, you need to understand how models actually learn, and a course project on object detection was the first time I trained one from scratch.`,
      decision: `Choose a dataset, configure the training run, validate the output, and, more importantly, understand why the model got things wrong.`,
      truth:    `The model is only as honest as your dataset: distribution shift, not architecture, is usually what breaks things in the real world.`,
    },
    tabs: {
      story:   { content: `Fruit Detector was our final project for SIP 107: Rancang Bangun Sistem Berbasis AI (AI-Based System Design). The brief: train an object detection model and validate it on a real dataset.

We chose fruit detection, apples, bananas, oranges, using the Kaggle Fruit Images dataset hosted via Roboflow. The model was YOLOv8n (nano), the smallest and fastest variant, trained on Google Colab.

My contribution covered the training pipeline setup and validation analysis. We ran the training run, evaluated the weights on our test set, and produced the detection visualisations in the predict/ folder.

The result worked. The model detected fruit reliably in controlled conditions. What it struggled with: overlapping objects, partial occlusion, and non-standard lighting, all expected failure modes for a small model trained on a clean dataset.

This was my first end-to-end experience with a computer vision pipeline. The conceptual gap it closed: understanding that a model's performance is bounded by its training distribution, not just its architecture. That insight carries forward into every ML project I've worked on since.` },
      craft:   { notes:   `## Pipeline

1. Dataset: Kaggle Fruit Images → Roboflow for annotation and train/val/test split
2. Model: YOLOv8n (Ultralytics), transfer learning from pretrained COCO weights
3. Training: Google Colab (GPU runtime), default hyperparameters, 50 epochs
4. Output: \`best.pt\` weights file, prediction visualisations in \`predict/\`

## What YOLOv8n Gets Right

Speed. The nano model runs inference in <10ms on a GPU. For a course project, this was ideal, fast iteration, readable results.

## What It Gets Wrong

Occlusion and lighting variation. The training set was predominantly clean, well-lit, isolated fruit. Real-world performance degrades on cluttered scenes.

## Connection to iOS

YOLOv8 models can be exported to Core ML format for on-device inference on iOS. The pipeline I learned here, dataset → training → export → inference, is the same pipeline I'd use to bring a custom vision model into a Swift app via the Vision framework.` },
      visuals: { images:  [] },
    },
  },

  {
    id: 'nusa-score',
    title: `NUSA Score`,
    tagline: `From weeks to minutes.`,
    cardDescriptor: `Solo-built AI credit scoring engine that automates SANF's manual 1–2 week underwriting process into a risk decision in minutes. XGBoost + logistic regression, FastAPI backend, Streamlit UI.`,
    year: '2025',
    status: 'Completed' as const,
    category: ["AI/ML","FinTech","Web"],
    tech: ["Python","FastAPI","XGBoost","scikit-learn","Streamlit","Joblib"],
    platform: `Web · GitHub`,
    coverGradient: `linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #2d1b69 100%)`,
    featured: true,
    role: `Solo ML Engineer`,
    links: [{ label: 'GitHub', url: 'https://github.com/teresakae/NUSA-Score' }],
    hook: {
      moment:   `SANF's credit process took 1–2 weeks per application, entirely manual, paper-based, and bottlenecking a lending portfolio that had the capital to grow.`,
      decision: `Build the whole system solo, data pipeline, model, API, dashboard, and make the output readable to a loan officer who has never seen a probability score.`,
      truth:    `An 80% accurate model that outputs a confusing score is less useful than a 75% model with a clear Approve / Flag / Decline.`,
    },
    tabs: {
      story:   { content: `NUSA Score was built solo for the Astranauts competition brief: SANF, a member of Astra Financial, needed to accelerate their credit underwriting process. Applications were taking 1–2 weeks each, a timeline throttling growth.

The problem, confirmed by SANF and flagged by Fitch Ratings, was structural: corporate credit underwriting, debtor monitoring, and document checks were all manual and paper-based. Delays in detecting payment risks were a known exposure.

I built an AI-powered predictive scoring engine that automates the risk evaluation. The model, a combination of logistic regression and XGBoost, analyses borrower profile data and historical repayment behaviour to output a risk probability and a recommended decision: Approve, Flag for Review, or Decline. Trained on real Indonesian lending data (Home Credit dataset). Final accuracy: >80%.

Building solo is a different discipline than building in a team. There's no one to course-correct you, but also no coordination cost. I made decisions faster, owned the full architecture, and had to think in layers, data cleaning, model design, API exposure, and UI, in sequence, with no handoffs.

The part that took longest wasn't training the model. It was the output design. A raw risk probability (e.g. 0.81) is meaningless to a loan officer. I added the Approve/Flag/Decline layer with threshold reasoning, a summary dashboard, and Excel export because the point of the tool is the decision it enables, not the number it generates.

The business case: NUSA Score projects 50%+ faster loan evaluation turnaround, up to 20% improvement in credit default prediction accuracy, and the ability to scale operations by ~25% without adding headcount. Built to complete SANF's process, not compete with it.` },
      craft:   { notes:   `## Model Design

Two-model ensemble:
- Logistic regression as the interpretable baseline
- XGBoost for nonlinear pattern capture

Training data: Indonesian borrower profiles with repayment history. Features: credit amount, duration, checking status, employment, housing, purpose, installment rate.

Final metrics on test set:
- Accuracy: ~80%
- Precision: 72%
- Recall: 70%
- F1: 71%

## Output Layer Design

The most important design decision: don't expose raw probabilities. Output a structured decision:
- **Approve** (p < 0.33)
- **Flag for Review** (0.33 ≤ p < 0.66)
- **Decline** (p ≥ 0.66)

This mirrors how loan officers actually think, and makes the tool's recommendations actionable without statistical literacy.

## Stack
- FastAPI for the prediction API endpoint
- Streamlit for the UI (Excel upload → preview → summary → export)
- Joblib for model and preprocessing metadata serialization
- Pandas for data cleaning and feature alignment

## What I'd Do Differently

The model is trained on a fixed dataset. In production, you need retraining pipelines, drift detection, and human-in-the-loop logging. The architecture I built doesn't have those, it's a prototype, and I'd be honest about that with any stakeholder.` },
      visuals: { images:  [] },
    },
  },

  {
    id: 'litera-tulip',
    title: `LiteraTulip`,
    tagline: `Books, ordered simply.`,
    cardDescriptor: `Full-stack book ordering web app with real-time chat (Socket.io), Gemini AI customer service, admin dashboard, and payment simulation. Built with Node.js, Express, and MongoDB.`,
    year: '2025',
    status: 'Completed' as const,
    category: ["Web/Desktop App","Full-Stack","E-Commerce"],
    tech: ["Node.js","Express.js","Socket.io","MongoDB","Mongoose","Gemini API"],
    platform: `Web`,
    coverGradient: `linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #6d28d9 100%)`,
    featured: false,
    role: `Backend Developer`,
    links: [{ label: 'GitHub', url: 'https://github.com/teresakae/LiteraTulip' }],
    hook: {
      moment:   `A course final project needed to be more than a CRUD app. We wanted real architectural complexity: real-time chat, an admin layer, and an AI integration, built by four people across a full semester.`,
      decision: `Coordinate a real shared codebase across four contributors: feature branches, pull requests, merge conflicts, and own both the backend routes and the AI chat integration.`,
      truth:    `Deciding what the AI should and shouldn't do turned out to be a product decision, not a technical one.`,
    },
    tabs: {
      story:   { content: `LiteraTulip was our Midterm and Final Project for SFT 208 Web-based Programming, built by the ARKA team (Andrew, Runi, Kae, Alexa) over one semester.

The app: a book ordering platform where users can browse, cart, order, and pay for books, with discounts for registered users and an AI-powered chat interface. Admins get a dashboard for product management, order tracking, bestseller analytics, and transaction oversight.

The technical scope was deliberately ambitious for a course project: Session-based authentication (Express-session), real-time bidirectional chat with Socket.io, Gemini API integration for the customer service AI, and a full admin/user role split across the same database.

My contributions spanned both backend (route and controller logic, MongoDB schema design) and frontend (UI components, chat interface). The most interesting challenge was the Gemini integration, deciding what the AI should handle (product questions, order status) vs what it should escalate to the human admin (refunds, complaints).

This was also the first project where I worked in a real shared codebase: feature branches, pull requests, merge conflicts, and the discipline of writing code that other people can read and extend.` },
      craft:   { notes:   `## Architecture

MVC pattern: \`models/\` (Mongoose schemas), \`routes/\` (Express route definitions), \`controllers/\` (business logic), \`public/\` (static frontend).

**Models:** User, Admin, Produk (Product), Transaksi (Transaction).

## Real-time Chat

Socket.io handles three chat actors: User ↔ AI (Gemini) and User ↔ Admin. The AI responds first; if it can't resolve the query, it flags for admin handoff. Rooms are scoped per user session.

## Gemini Integration

Gemini API key stored in \`.env\`. The integration is a system-prompted chat completion: the AI is given context about the store's inventory and policy. Prompt design was iterative. The first version was too verbose, the second too terse. The deployed version uses a constrained system prompt that limits the AI to product and order scope.

## Authentication

Express-session with MongoDB session store. Role-based access: \`isUser\` and \`isAdmin\` middleware guard route groups.

## What I'd Do Differently

The \`.env\` file with the Gemini API key was committed to the repo at one point (since fixed). That mistake taught me about secrets management in a team context, something you learn faster when it actually happens.` },
      visuals: { images:  [] },
    },
  },

  {
    id: 'money-tracker',
    title: `MoneyTracker`,
    tagline: `Where the money went.`,
    cardDescriptor: `A Java + SQL income and expense tracker with category sorting and visualised summary graphs. Final project for SFT 118 Algorithms and Programming.`,
    year: '2024',
    status: 'Completed' as const,
    category: ["Web/Desktop App","Java","Finance"],
    tech: ["Java","MySQL","NetBeans","XAMPP"],
    platform: `Desktop (Java)`,
    coverGradient: `linear-gradient(135deg, #1c1917 0%, #292524 50%, #44403c 100%)`,
    featured: false,
    role: `Solo Developer`,
    links: [{ label: 'GitHub', url: 'https://github.com/teresakae/MoneyTracker-Java' }],
    hook: {
      moment:   `The first real software I ever shipped, before APIs, before frameworks, just Java, SQL, and the problem of making data persist across sessions.`,
      decision: `The brief was open: build something. We built a finance tracker, every line of code new, every concept learned the hard way.`,
      truth:    `A program that forgets everything when you close it isn't useful, understanding databases started here.`,
    },
    tabs: {
      story:   { content: `MoneyTracker was the final project for SFT 118: Algorithms and Programming, my first serious programming course. The brief was open-ended: demonstrate the concepts covered in the course by building something.

We built a desktop income-expense tracker. Users can log transactions with a date, description, and category. The data persists in a MySQL database via XAMPP. A summary screen visualises income vs expense trends with graphs.

This is a beginner project and I present it as one. The architecture isn't MVC, it's a sprawl of Java classes that works. The UI is functional, not designed. But it does three things that matter: it accepts input, it stores it in a database, and it displays it back in a useful form.

More than any technical skill, MoneyTracker taught me that persistence is what makes software real. A program that forgets everything when you close it isn't useful. Understanding how to read and write to a database, even a simple one, even with XAMPP, changed how I thought about what software is for.` },
      craft:   { notes:   `## Stack

- Java (Swing UI)
- MySQL via XAMPP
- NetBeans IDE

## Data Model

Single table: transactions (id, date, name, category, amount, type [income/expense]).

Queries: filtered by date range, grouped by category for graph generation.

## What 'Beginner' Means Here

No ORM. Raw SQL strings in Java code. No prepared statements (a security issue we didn't know to worry about). Connection opened and closed on every query. These are things I'd never do now, but learning why required doing it wrong first.` },
      visuals: { images:  [] },
    },
  },

  {
    id: 'aura-box',
    title: `AuraBox - Immersive Museum`,
    tagline: `Preserving culture through immersive experience.`,
    cardDescriptor: `3rd Place Overall + Best Poster at UTM TechVenture Challenge 2025, Malaysia. A business innovation concept for immersive digital museum experiences to preserve and revitalise Indonesia's cultural heritage.`,
    year: '2025',
    status: 'Concept' as const,
    category: ["Misc.","Product","Business Innovation","Cultural Tech"],
    tech: ["Figma","Business Model Canvas","Market Research"],
    platform: `Concept · International Competition`,
    coverGradient: `linear-gradient(135deg, #1a0533 0%, #3d1278 50%, #6b21a8 100%)`,
    featured: false,
    role: `Team Lead`,
    links: [{ label: 'LinkedIn', url: 'https://linkedin.com/in/teresakae' }],
    hook: {
      moment:   `Indonesia's cultural heritage is disappearing faster than it can be documented, and traditional museums aren't reaching the generation that needs to care.`,
      decision: `Lead a cross-border team through UTM's TechVenture Challenge with one week, an international judging panel, and a concept that had to earn trust without a working prototype.`,
      truth:    `Winning Best Poster taught me that visual communication of an idea can be as powerful as the idea itself.`,
    },
    tabs: {
      story:   { content: `Museum Immersive was our entry for the TechVenture Challenge 2025 at Universiti Teknologi Malaysia, an international competition held during the Atma Jaya Immersion Program (December 1–5, 2025). We placed 3rd Overall and won Best Poster.

The problem: Indonesia's cultural heritage institutions struggle to engage younger audiences. Traditional museum formats are static; the stories behind artefacts get lost. Our solution, a business innovation concept, proposed immersive digital museum experiences combining spatial design, interactive layers, and accessible storytelling to make heritage feel alive and personal.

I led the ARK Team through the week: framing the problem, developing the business model, conducting competitive analysis against existing immersive experience companies in Southeast Asia (TeamLab, Frameless, Musée d'Orsay digital initiatives), and designing the poster presentation.

The key differentiator in our concept was localisation depth. Global immersive experience companies use generic visual languages. Our concept was built around Indonesian visual and narrative traditions, batik geometry, wayang storytelling structure, regional oral history formats.

Industrial visits during the program, to The GEAR by Kajima in Singapore (sustainable building solutions) and Azhar Manufacturing in Johor, informed our thinking about how technology integrates with physical experience design in ways that last.

Competing internationally for the first time was clarifying. Judging criteria rewarded clarity of vision, market understanding, and communicating an idea to a non-specialist audience. Those are skills I'd been building across hackathons, but this was the first time I applied them outside Indonesia.

The Best Poster award came from a deliberate design decision: lead with one striking statistic about cultural loss, move to the solution concept, close with the business case. Legible at 3 metres, compelling at 30cm.` },
      craft:   { notes:   `## Business Model

Revenue streams: institutional licensing to museums and cultural sites, B2G contracts with Indonesian Ministry of Culture, tourism partnerships.

Competitive analysis covered: TeamLab (Japan), Frameless (UK), Musée d'Orsay digital initiatives, and local Indonesian alternatives.

Key differentiator: localisation depth. Global immersive experience companies use generic visual languages. Our concept was built around Indonesian visual and narrative traditions, batik geometry, wayang storytelling structure, regional oral history formats.

## Why It Won Best Poster

The poster was designed to be legible at 3 metres and compelling at 30cm. We used a visual hierarchy that led with the problem (a single striking statistic about cultural loss), moved to the solution concept, and closed with the business case. The judges cited clarity and visual specificity.

## What's Missing

This is a concept. The technical implementation, what the immersive layer actually is (AR? projection mapping? mixed reality?), was directional, not detailed. A real version would need a technology partnership and a pilot site.` },
      visuals: { images:  [] },
    },
  },

  {
    id: 'project-sic',
    title: `ProjectSIC`,
    tagline: `What does customer spending data actually tell you, before you model it?`,
    cardDescriptor: `A rigorous data preparation exercise: 2,240 customer records, 7 engineered features, and a regression-ready dataset built from scratch.`,
    year: '2024',
    status: 'Completed' as const,
    category: ["AI/ML","Data Analysis"],
    tech: ["Python","Pandas","scikit-learn","StandardScaler","Matplotlib","Seaborn","Jupyter"],
    platform: `Jupyter Notebook`,
    coverGradient: `linear-gradient(135deg, #0c0a1e 0%, #1e1b4b 100%)`,
    featured: false,
    role: `Data Analyst`,
    links: [{ label: 'GitHub', url: 'https://github.com/teresakae/ProjectSIC' }],
    hook: {
      moment:   `The dataset had 29 columns, a continuous target variable, and no obvious path to a clean model. The first job was not to build anything.`,
      decision: `Work through it systematically: understand the shape, remove what corrupts, engineer what is missing, and only then split for training.`,
      truth:    `Good ML starts before the model. StandardScaler fitted on test data is a data leak. Getting that order right is the whole discipline.`,
    },
    tabs: {
      story:   { content: `ProjectSIC was a course project in SFT 210: an open-ended data preparation and exploration exercise built around a real Kaggle dataset — a marketing campaign dataset of 2,240 customer records across 29 features.

The original dataset goal was to predict customer response to promotional offers. I redefined the objective: instead of a classification task on campaign response, I reframed it as a regression task predicting total customer Spending, a custom feature I engineered by aggregating six product category columns (wines, fruits, meat, fish, sweets, gold).

That reframe was the first real decision. It changed everything downstream.

The work happened in two phases.

Phase 1 was data understanding: load, inspect, describe, visualise. I found that Income had 24 missing rows, Year_Birth had extreme outliers (customers born in 1893), and Marital_Status had redundant labels that would have created noise in any model. The EDA also surfaced a meaningful pattern: higher income and wine spending correlated with campaign responsiveness, and Recency had a negative correlation with spending — recent contacts tended to be low spenders.

Phase 2 was data preparation. Seven decisions, each deliberate:

1. Dropped nulls and selected 12 relevant raw columns from 29.
2. Converted Year_Birth to Age, removed anyone outside 18-90.
3. Capped Income at the 99th percentile to reduce right-skew without losing data.
4. Created the Spending target by summing six Mnt columns, then dropped the originals.
5. Simplified Marital_Status into a binary Relationship_Status (In Couple / Alone), encoded as 1/0.
6. Merged Kidhome and Teenhome into a binary Has_Child flag.
7. Mapped Education levels to estimated years of schooling — an ordinal numeric encoding more meaningful than arbitrary labels.

The final dataset: 2,190 rows, 6 columns, all numeric, ready for regression.

Feature scaling used StandardScaler on Income, Age, and Education_Years only — fitted on the training set, then applied to the test set. That order matters. Fitting the scaler on the full dataset before splitting is a data leak: the model would have seen the test distribution during preparation. The 80/20 train-test split used random_state=42 for reproducibility.

The habits built here — normalisation order, stratified splits, feature engineering rationale — are the same ones that made NUSA Score's pipeline reliable.` },
      craft:   { notes:   `## Dataset

Kaggle Marketing Campaign dataset — 2,240 rows, 29 columns. Continuous target: \`Spending\` (engineered).

## Feature Engineering Decisions

**Spending** — aggregated from \`MntWines\`, \`MntFruits\`, \`MntMeatProducts\`, \`MntFishProducts\`, \`MntSweetProducts\`, \`MntGoldProds\`. Transforms a classification-framed dataset into a regression task with a more informative target.

**Age** — derived from \`Year_Birth\`. Rows outside 18-90 removed as outliers (3 records affected).

**Income** — capped at 99th percentile ($94,384). Reduces right-skew without discarding the distribution shape.

**Relationship_Status** — binary encoding of \`Marital_Status\`. Married/Together = 1, everything else = 0. Avoids arbitrary label encoding of a multi-value categorical with redundant categories.

**Has_Child** — binary flag from \`Kidhome + Teenhome > 0\`. Merging two sparse columns into one meaningful signal.

**Education_Years** — ordinal mapping: Basic=9, 2n Cycle=12, Graduation=16, Master=18, PhD=21. More meaningful than one-hot encoding for a feature with a natural ordering.

## Scaling and Splitting

\`StandardScaler\` applied to \`Income\`, \`Age\`, \`Education_Years\` only — not to binary features.

Critical order: \`scaler.fit_transform(X_train)\` then \`scaler.transform(X_test)\`. Fitting on the full dataset before splitting would leak test distribution statistics into training.

80/20 split, \`random_state=42\`. No \`stratify\` — target is continuous, not categorical.

## What This Project Is Not

Not a model. Not a prediction system. The notebook ends at a clean, scaled, split dataset. The point was the preparation discipline, not the downstream model. NUSA Score is where that discipline got applied to a real problem.` },
      visuals: { images:  [] },
    },
  },

  {
    id: 'share-eat',
    title: `Share-Eat`,
    tagline: `Share it to eat.`,
    cardDescriptor: `Product concept connecting surplus food providers, restaurants, hotels, with individuals and NGOs using GeoAI location intelligence. 16-month projected break-even, full business model.`,
    year: '2025',
    status: 'Concept' as const,
    category: ["Misc.","Mobile","Food Systems","AI/ML"],
    tech: ["Figma","FastAPI","PostgreSQL","React.js","GeoAI"],
    platform: `Mobile Concept`,
    coverGradient: `linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)`,
    featured: true,
    role: `Product Strategist`,
    links: [{ label: 'GitHub', url: 'https://github.com/teresakae' }],
    hook: {
      moment:   `Indonesia wastes 20 million tons of food annually while 25.9 million Indonesians face food insecurity. The supply exists, the distribution doesn't.`,
      decision: `Own the full product strategy for the first time: market sizing, competitive analysis, financial model, UX, and figure out why a restaurant would bother listing food it could just throw away.`,
      truth:    `The incentive design is the product, a marketplace only works if listing surplus is easier than discarding it.`,
    },
    tabs: {
      story:   { content: `Share-Eat was our entry for a sustainability-focused startup competition, addressing Indonesia's food redistribution gap.

The problem is well-documented: Indonesia loses $29 billion per year to food waste (World Bank, 2019). Food waste occupies 41.5% of total national waste. The sources are hotels, restaurants, and households. The same places with reliable daily surplus. The recipients are NGOs, community kitchens, and 25.9 million food-insecure Indonesians. No system connects them reliably.

Our solution: a mobile marketplace using GeoAI to match surplus food listings with nearby NGOs and individuals based on location, food type, and time to expiry. Two interfaces, a provider flow for listing surplus before it expires, and a recipient flow for browsing by location and food type.

This was the first project where I was responsible for product strategy rather than just technical execution. That meant market sizing (TAM 190.65M users in Indonesia, SAM 60.13M in urban areas, SOM 3.11M active buyers), competitive differentiation against existing food redistribution apps, a 3-year financial model projecting Rp 7.12B revenue, and a 16-month break-even on Rp 1.5B initial investment.

The business model runs on three revenue streams: listing fees (Rp 5,000 per upload), platform commission (Rp 1,500 per completed transaction), and in-app advertising for food businesses. Three-year projected operating margin: 36.6%.

The hardest design problem wasn't the UI or the algorithm. It was the provider incentive. A restaurant lists food because: it's easier than disposing of it properly, there's reputational value (CSR, sustainability positioning), and the platform removes coordination overhead. All three had to be true simultaneously. The GeoAI matching layer reduces that coordination cost, which is what makes the incentive work.` },
      craft:   { notes:   `## Business Model

**Revenue streams:**
- B2B: institutional licensing to NGOs and redistribution organisations
- B2C: listing fees and sales commission from commercial providers
- B2G: government partnerships for public food aid programmes

**Financial projections:**
- Break-even: 16 months
- 3-year revenue: Rp 7.12B
- ROI after 3 years: 101%

## GeoAI Layer

Location intelligence was the key technical differentiator. The matching algorithm considers: distance between provider and recipient, food type compatibility, time to expiry (urgency score), and recipient capacity.

## Competitive Differentiation

Existing Indonesian food redistribution platforms rely on manual listing and phone coordination. Share-Eat automates the match and provides real-time expiry tracking, reducing the coordination cost that currently makes surplus redistribution too slow to be reliable.

## What This Project Taught Me About Product

The incentive design is the product. A provider lists food because: (1) it's easier than disposing of it properly, (2) there's reputational value (CSR, sustainability badge), (3) the platform removes the coordination overhead. All three had to be true simultaneously. Feature lists don't solve incentive problems. The UX has to encode the incentive.` },
      visuals: { images:  [] },
    },
  }
];
