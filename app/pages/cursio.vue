<script setup lang="ts">
import { LpBadge, LpButton, LpCard, LpCodeBlock, LpDisclosure, LpIcon, LpSection } from "@leavepulse/ui"

const siteUrl = "https://cursio.theroer.dev/"
const repoUrl = "https://github.com/THEROER/cursio"

useSeoMeta({
  title: "Cursio — one workspace across your devices",
  description:
    "Cursio is an encrypted, LAN-only mesh for Linux, Windows, macOS and Android. Share a keyboard, clipboard, app windows, per-app audio, files and USB, or use MCP and DevTools to work with apps on another machine.",
  ogTitle: "Cursio — one workspace across your devices",
  ogDescription:
    "A LAN-only mesh for trusted personal devices, with shared input, windows, audio, files, USB and developer tools. Your apps stay where they run.",
  ogUrl: siteUrl,
  ogType: "website",
  twitterCard: "summary_large_image",
})

useHead({
  htmlAttrs: { lang: "en" },
  link: [{ rel: "canonical", href: siteUrl }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Cursio",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Linux, Windows 11, macOS 13+, Android",
        description:
          "A LAN-only mesh of trusted personal devices sharing encrypted, resumable sessions for input, audio, clipboard, window transfer and files.",
        url: siteUrl,
        codeRepository: repoUrl,
        license: "https://github.com/THEROER/cursio/blob/main/LICENSE",
        author: { "@type": "Person", name: "THEROER", url: "https://theroer.dev/" },
      }),
    },
  ],
})

const scenarios = [
  {
    icon: "lucide:mouse-pointer-2",
    number: "01",
    title: "Move between computers",
    body: "Push your pointer across a screen edge to use the next machine. Keyboard, shortcuts and clipboard follow you.",
    details: "Cursio arranges machines as neighbours on one desk. You can also set a hotkey to take control back.",
  },
  {
    icon: "lucide:panels-top-left",
    number: "02",
    title: "Bring an app closer",
    body: "Show an individual app window on another computer while the app keeps running on its original host.",
    details: "Offer windows or monitors to screen sharing apps such as OBS, Discord and browser calls. The app itself never migrates.",
  },
  {
    icon: "lucide:radio-tower",
    number: "03",
    title: "Share the rest of your setup",
    body: "Route audio per app, open a peer's files locally, or use its USB devices as if they were plugged in here.",
    details: "Clipboard content keeps rich formats and images. Disk mounts are on demand and can be offered read-only.",
  },
  {
    icon: "lucide:smartphone",
    number: "04",
    title: "Make your phone a peer",
    body: "Bring an Android phone's screen, sound, storage and notifications into your computer workflow.",
    details: "See and control its screen, send and read SMS, and keep a link over Bluetooth when Wi-Fi drops. Calls can ring on your computer; call audio through Cursio is currently supported on Linux. iPhone and iPad can mirror to Cursio through AirPlay.",
  },
]

const platforms = [
  {
    icon: "lucide:monitor",
    name: "Linux",
    status: "Desktop peer",
    summary: "Broad support on Wayland and X11, including input, windows, audio, files, USB and AirPlay.",
    detail: "Window capture depends on the compositor. On GNOME, dragging windows between machines needs the Cursio Shell extension. Audio uses PipeWire; mounting disks needs FUSE.",
  },
  {
    icon: "lucide:monitor",
    name: "Windows 11",
    status: "Desktop peer",
    summary: "Use shared input, windows, clipboard, per-app audio, files, USB and AirPlay.",
    detail: "Cursio requests administrator permission for input into elevated apps. File mounts need WinFsp, USB needs usbipd-win, and audio endpoints need the bundled driver.",
  },
  {
    icon: "lucide:apple",
    name: "macOS 13+",
    status: "Peer with limits",
    summary: "Join the mesh, share input and clipboard, host windows, serve files and receive AirPlay.",
    detail: "macOS cannot yet display a peer's window or remote screen, share audio, or mount a peer's disks. Input and window capture require Accessibility and Screen Recording permissions.",
  },
  {
    icon: "lucide:smartphone",
    name: "Android",
    status: "Phone peer · arm64",
    summary: "Share the phone's screen, microphone, sound, storage, gallery, notifications, SMS and call alerts.",
    detail: "Android can be controlled from a computer after enabling Cursio's accessibility service. It does not display desktop windows, mount peer disks or share USB devices.",
  },
]

const developerTools = [
  {
    icon: "lucide:network",
    title: "Ask an AI agent about the mesh",
    body: "Cursio includes an MCP server for machine status, logs, reports, network paths, app releases and phone screenshots or touch actions.",
  },
  {
    icon: "lucide:accessibility",
    title: "Inspect and operate app windows",
    body: "For apps registered with cursio-sdk, read logs and declared actions, capture a window, inspect its accessibility tree, and invoke controls by role and name.",
  },
  {
    icon: "lucide:code-xml",
    title: "Debug a remote web view",
    body: "With DevTools enabled and approved on the host, inspect console output, network requests and page state, take screenshots, or connect Playwright over CDP.",
  },
]

const pairCommand = "cursio mesh --pair"
const runCommand = "cursio mesh --at 0,0 --send-input --clipboard"
</script>

<template>
  <div class="cursio-page">
    <header class="cursio-nav">
      <a class="cursio-wordmark" href="#top" aria-label="Cursio home">
        <svg class="cursio-mark" viewBox="0 0 24 24" aria-hidden="true"><polygon points="3.80,6.06 20.20,6.06 20.20,3.59 3.80,3.59" /><polygon points="2.73,5.44 10.93,19.79 13.07,18.56 4.87,4.21" /><polygon points="19.13,4.21 10.93,18.56 13.07,19.79 21.27,5.44" /><circle cx="3.80" cy="4.82" r="3.80" /><circle cx="20.20" cy="4.82" r="3.80" /><circle cx="12.00" cy="19.18" r="3.80" /></svg>
        cursio<span class="cursio-dot">.</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#workflows">What you can do</a>
        <a href="#developers">For developers</a>
        <a href="#platforms">Platforms</a>
        <a :href="repoUrl" target="_blank" rel="noopener noreferrer" class="cursio-nav-github">GitHub <span aria-hidden="true">↗</span></a>
      </nav>
    </header>

    <main id="top">
      <section class="cursio-hero">
        <div class="cursio-hero-copy">
          <p class="cursio-kicker"><span /> YOUR DEVICES, IN SYNC</p>
          <h1>One desk.<br /><span>All your devices.</span></h1>
          <p class="cursio-lead">Use your computers and phone like parts of one workspace. Cursio connects trusted devices on your local network; your apps stay where they run.</p>
          <div class="cursio-hero-actions">
            <LpButton as="a" href="#workflows" variant="light" size="lg" class="cursio-button">See what it can do <LpIcon name="lucide:arrow-down" :size="16" /></LpButton>
            <a class="cursio-source-link" :href="repoUrl" target="_blank" rel="noopener noreferrer">Open source · Rust <LpIcon name="lucide:arrow-up-right" :size="14" /></a>
          </div>
          <div class="cursio-platform-strip" id="platforms">
            <span>DESKTOP PEERS + PHONE</span>
            <strong>Linux</strong><strong>Windows 11</strong><strong>macOS</strong><strong>Android</strong>
          </div>
        </div>

        <div class="cursio-orbit" aria-label="A connected network of personal devices">
          <div class="cursio-orbit__ring cursio-orbit__ring--outer" />
          <div class="cursio-orbit__ring cursio-orbit__ring--inner" />
          <div class="cursio-orbit__line cursio-orbit__line--one" />
          <div class="cursio-orbit__line cursio-orbit__line--two" />
          <div class="cursio-orbit__node cursio-orbit__node--laptop"><LpIcon name="lucide:laptop" :size="20" /><small>LAPTOP</small></div>
          <div class="cursio-orbit__node cursio-orbit__node--desktop"><LpIcon name="lucide:monitor" :size="20" /><small>DESKTOP</small></div>
          <div class="cursio-orbit__node cursio-orbit__node--phone"><LpIcon name="lucide:smartphone" :size="20" /><small>PHONE</small></div>
          <div class="cursio-orbit__core"><svg class="cursio-mark cursio-mark--large" viewBox="0 0 24 24" aria-hidden="true"><polygon points="3.80,6.06 20.20,6.06 20.20,3.59 3.80,3.59" /><polygon points="2.73,5.44 10.93,19.79 13.07,18.56 4.87,4.21" /><polygon points="19.13,4.21 10.93,18.56 13.07,19.79 21.27,5.44" /><circle cx="3.80" cy="4.82" r="3.80" /><circle cx="20.20" cy="4.82" r="3.80" /><circle cx="12.00" cy="19.18" r="3.80" /></svg><b>cursio</b><small>PRIVATE MESH</small></div>
          <span class="cursio-orbit__signal cursio-orbit__signal--one" />
          <span class="cursio-orbit__signal cursio-orbit__signal--two" />
        </div>
        <div class="cursio-hero-index"><span>01</span> / A PERSONAL DEVICE MESH</div>
      </section>

      <section id="workflows" class="cursio-section">
        <LpSection as="h2" title="One mesh. A few ways to use it." description="Start with the part of your setup you want to bring together. Turn on the modules that fit." class="cursio-section__heading" />
        <div class="cursio-scenario-grid">
          <LpCard v-for="item in scenarios" :key="item.number" variant="raised" class="cursio-scenario">
            <div class="cursio-scenario__top">
              <span class="cursio-scenario__icon"><LpIcon :name="item.icon" :size="20" /></span>
              <span class="cursio-scenario__number">{{ item.number }}</span>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.body }}</p>
            <LpDisclosure :label="`More about ${item.title.toLowerCase()}`" class="cursio-scenario__details">
              <p>{{ item.details }}</p>
            </LpDisclosure>
          </LpCard>
        </div>
      </section>

      <section class="cursio-network-story">
        <div class="cursio-network-story__mark"><LpIcon name="lucide:shield-check" :size="32" /></div>
        <div class="cursio-network-story__copy">
          <p class="cursio-kicker">CONNECTED BY TRUST</p>
          <h2>No hub. No internet relay.<br /><span>Your devices stay in control.</span></h2>
          <p>Peers find and reconnect to each other on your LAN. SPAKE2 pairing establishes trust without sending the password; Noise encrypts the sessions. When a device goes offline, the others keep working.</p>
        </div>
        <div class="cursio-network-badges">
          <LpBadge tone="brand" dot>Local network</LpBadge>
          <LpBadge tone="brand" dot>Encrypted links</LpBadge>
          <LpBadge tone="brand" dot>Peer to peer</LpBadge>
          <LpBadge tone="brand" dot>Resumable sessions</LpBadge>
        </div>
      </section>

      <section id="developers" class="cursio-section cursio-developer-section">
        <div class="cursio-developer-intro">
          <div>
            <p class="cursio-kicker">FOR DEVELOPERS & AUTOMATION</p>
            <h2>Your tools can reach<br /><span>the machine across the desk.</span></h2>
            <p>Use Cursio to observe and work with registered applications on another device — from your terminal, an AI agent or your test runner.</p>
          </div>
          <LpBadge tone="action" size="lg">Built in · MCP</LpBadge>
        </div>
        <div class="cursio-dev-grid">
          <LpCard v-for="tool in developerTools" :key="tool.title" variant="raised" class="cursio-dev-card">
            <LpIcon :name="tool.icon" :size="20" class="cursio-dev-card__icon" />
            <h3>{{ tool.title }}</h3>
            <p>{{ tool.body }}</p>
          </LpCard>
        </div>
        <div class="cursio-dev-command">
          <div>
            <p class="cursio-kicker">CONNECT AN MCP CLIENT</p>
            <p>Start the Cursio MCP server as a local process. Consent for app actions and DevTools stays on the machine being accessed.</p>
          </div>
          <LpCodeBlock :model-value="'claude mcp add cursio -- cursio mcp'" lang="bash" title="Terminal" />
        </div>
        <LpDisclosure label="What can an agent access?" icon="lucide:lock-keyhole" class="cursio-dev-consent">
          <p>Agents can inspect machines, logs and registered app interfaces. Changing app state, interacting with a phone, or opening DevTools requires consent or permission on the target device. DevTools access is separate, time-limited and can expose app data such as cookies or tokens.</p>
        </LpDisclosure>
      </section>

      <section id="platforms" class="cursio-section cursio-platform-section">
        <LpSection as="h2" title="Works across your devices." description="The feature set depends on the operating system. These are peers with different strengths, not identical clients." class="cursio-section__heading" />
        <div class="cursio-platform-grid">
          <LpCard v-for="platform in platforms" :key="platform.name" variant="flat" class="cursio-platform-card">
            <div class="cursio-platform-card__title">
              <LpIcon :name="platform.icon" :size="19" />
              <h3>{{ platform.name }}</h3>
            </div>
            <LpBadge :tone="platform.status === 'Peer with limits' ? 'warning' : 'brand'" size="sm">{{ platform.status }}</LpBadge>
            <p>{{ platform.summary }}</p>
            <LpDisclosure :label="`Requirements and limits for ${platform.name}`" class="cursio-platform-card__details">
              <p>{{ platform.detail }}</p>
            </LpDisclosure>
          </LpCard>
        </div>
        <LpDisclosure label="Known project limits" icon="lucide:triangle-alert" class="cursio-limitations">
          <ul>
            <li>Cursio v0.x is designed for a local network; it does not provide internet relay or NAT traversal.</li>
            <li>Protected DRM surfaces may not be capturable; fullscreen apps and games are experimental.</li>
            <li>On Wayland, capture and window control depend on compositor support.</li>
          </ul>
        </LpDisclosure>
      </section>

      <section id="start" class="cursio-start">
        <div class="cursio-start__copy">
          <p class="cursio-kicker">START WITH TWO DEVICES</p>
          <h2>Pair once.<br /><span>Then make it yours.</span></h2>
          <p>Build Cursio from source, pair both machines with the same command, then enable the modules you want in your config.</p>
          <LpButton as="a" :href="repoUrl" target="_blank" rel="noopener noreferrer" variant="light" size="lg" class="cursio-button">Build and explore on GitHub <LpIcon name="lucide:arrow-up-right" :size="16" /></LpButton>
        </div>
        <div class="cursio-start__commands">
          <p>Run on both devices to pair</p>
          <LpCodeBlock :model-value="pairCommand" lang="bash" title="First run" />
          <p>Then start your mesh with input and clipboard</p>
          <LpCodeBlock :model-value="runCommand" lang="bash" title="Example" />
        </div>
      </section>
    </main>

    <footer class="cursio-footer"><a class="cursio-wordmark" href="#top">cursio<span class="cursio-dot">.</span></a><span>A personal device mesh by <a href="https://theroer.dev/">THEROER</a></span><span>Runs on your LAN. Built with Rust.</span></footer>
  </div>
</template>

<style>
.cursio-page{min-height:100%;overflow:hidden;background:var(--color-surface);color:var(--color-ink);color-scheme:dark;font-family:var(--font-sans)}
.cursio-nav{height:4.25rem;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(1.25rem,6vw,6rem);border-bottom:1px solid color-mix(in srgb,var(--color-ink) 6%,transparent);position:relative;z-index:2}
.cursio-wordmark{display:inline-flex;align-items:center;gap:.65rem;color:var(--color-ink);text-decoration:none;font-size:1.1rem;font-weight:700;letter-spacing:-.055em}.cursio-dot{color:var(--color-brand)}
.cursio-mark{width:1.35rem;height:1.35rem;display:block;fill:var(--color-brand)}.cursio-mark--large{width:2rem;height:2rem}
.cursio-nav nav{display:flex;align-items:center;gap:clamp(1rem,3vw,2.5rem)}.cursio-nav nav a{color:var(--color-muted);text-decoration:none;font-size:.78rem;transition:color .2s}.cursio-nav nav a:hover,.cursio-nav nav .cursio-nav-github{color:var(--color-ink)}.cursio-nav-github span{color:var(--color-brand);padding-left:.2rem}
.cursio-hero{position:relative;display:grid;grid-template-columns:1fr 1fr;align-items:center;max-width:90rem;min-height:43rem;margin:auto;padding:5rem clamp(1.25rem,8vw,8rem) 6rem;isolation:isolate}
.cursio-hero::before{content:"";position:absolute;z-index:-1;inset-block:0;left:50%;width:100vw;transform:translateX(-50%);background-image:radial-gradient(ellipse at 75% 44%,color-mix(in srgb,var(--color-brand) 4%,transparent),transparent 37%),linear-gradient(90deg,color-mix(in srgb,var(--color-ink) 2.5%,transparent) 1px,transparent 1px),linear-gradient(color-mix(in srgb,var(--color-ink) 2.5%,transparent) 1px,transparent 1px);background-size:auto,72px 72px,72px 72px;background-position:center,center,center}
.cursio-hero-copy{position:relative;z-index:1;max-width:37rem}.cursio-kicker{font-family:var(--font-mono);font-size:.65rem;letter-spacing:.16em;color:var(--color-brand);margin:0 0 1.2rem}.cursio-kicker span{display:inline-block;width:.42rem;height:.42rem;margin-right:.55rem;border-radius:50%;background:var(--color-brand);box-shadow:0 0 12px color-mix(in srgb,var(--color-brand) 53%,transparent)}
.cursio-hero h1{font-size:clamp(3rem,5vw,5rem);line-height:.96;letter-spacing:-.075em;margin:0;font-weight:600}.cursio-hero h1 span{color:var(--color-brand)}.cursio-lead{max-width:29rem;margin:1.6rem 0 0;color:var(--color-muted);font-size:1.06rem;line-height:1.75}.cursio-hero-actions{display:flex;align-items:center;gap:1.4rem;margin-top:2rem}.cursio-page .cursio-button{display:inline-flex;align-items:center;gap:1.2rem;min-height:3rem;padding:0 1.15rem;background:var(--color-brand);color:var(--color-ink-inverse);text-decoration:none;font-size:.8rem;font-weight:700;border:0;border-radius:3px;transition:transform .2s,background .2s}.cursio-page .cursio-button:hover{transform:translateY(-2px);background:var(--color-brand-hover)}.cursio-open-source{display:inline-flex;align-items:center;gap:.5rem;color:var(--color-muted);font-size:.75rem}.cursio-open-source span{font-size:1.1rem;color:var(--color-brand)}
.cursio-platform-strip{display:flex;align-items:center;flex-wrap:wrap;gap:.8rem 1.3rem;margin-top:4rem;padding-top:1.2rem;border-top:1px solid color-mix(in srgb,var(--color-ink) 10%,transparent)}.cursio-platform-strip span{width:100%;font: .58rem var(--font-mono);letter-spacing:.15em;color:var(--color-muted)}.cursio-platform-strip strong{font-size:.73rem;font-weight:500;color:var(--color-muted-strong)}
.cursio-orbit{position:relative;justify-self:center;width:min(36vw,27rem);aspect-ratio:1;border-radius:50%;display:grid;place-items:center}.cursio-orbit__ring{position:absolute;border:1px solid color-mix(in srgb,var(--color-brand) 11%,transparent);border-radius:50%}.cursio-orbit__ring--outer{inset:2%}.cursio-orbit__ring--inner{inset:18%;border-color:color-mix(in srgb,var(--color-brand) 20%,transparent)}.cursio-orbit__line{position:absolute;width:55%;height:1px;left:22.5%;top:50%;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--color-brand) 47%,transparent),transparent);transform:rotate(-32deg)}.cursio-orbit__line--two{transform:rotate(38deg)}
.cursio-orbit__core{position:relative;z-index:1;width:8.3rem;height:8.3rem;border-radius:50%;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:.3rem;background:radial-gradient(circle at 50% 30%,var(--color-surface-soft),var(--color-surface) 70%);border:1px solid color-mix(in srgb,var(--color-brand) 40%,transparent);box-shadow:0 0 4rem color-mix(in srgb,var(--color-brand) 8%,transparent),inset 0 0 1.5rem color-mix(in srgb,var(--color-brand) 5%,transparent)}.cursio-orbit__core b{font-size:1rem;letter-spacing:-.06em}.cursio-orbit__core small,.cursio-orbit__node small{font: .48rem var(--font-mono);letter-spacing:.12em;color:var(--color-muted-strong)}
.cursio-orbit__node{position:absolute;z-index:1;display:grid;place-items:center;width:4.6rem;height:4.6rem;border-radius:50%;border:1px solid color-mix(in srgb,var(--color-ink) 14%,transparent);background:var(--color-surface-raised);box-shadow:0 8px 30px color-mix(in srgb,var(--color-surface) 80%,transparent)}.cursio-orbit__node svg{color:var(--color-brand);stroke-width:1.7}.cursio-orbit__node small{position:absolute;top:calc(100% + .55rem);white-space:nowrap}.cursio-orbit__node--laptop{left:7%;top:19%}.cursio-orbit__node--desktop{right:0;top:45%}.cursio-orbit__node--phone{left:24%;bottom:5%}.cursio-orbit__signal{position:absolute;width:.4rem;height:.4rem;border-radius:50%;background:var(--color-brand);box-shadow:0 0 15px var(--color-brand)}.cursio-orbit__signal--one{top:27%;right:23%}.cursio-orbit__signal--two{bottom:25%;right:27%;opacity:.6}
.cursio-hero-index{position:absolute;right:clamp(1.25rem,8vw,8rem);bottom:2rem;font: .58rem var(--font-mono);letter-spacing:.12em;color:var(--color-muted)}.cursio-hero-index span{color:var(--color-brand)}
.cursio-principle{max-width:90rem;margin:auto;padding:7rem clamp(1.25rem,13vw,12rem) 5rem;border-top:1px solid color-mix(in srgb,var(--color-ink) 7%,transparent)}.cursio-principle .cursio-kicker{margin-bottom:1rem}.cursio-principle h2,.cursio-security h2,.cursio-cta h2{font-size:clamp(2.3rem,5vw,4.5rem);letter-spacing:-.07em;line-height:1.02;font-weight:500;margin:0}.cursio-principle h2 span{color:var(--color-muted)}.cursio-principle>p:last-child{max-width:38rem;color:var(--color-muted);line-height:1.8;margin:1.4rem 0 0;font-size:.98rem}
.cursio-capabilities{max-width:90rem;margin:auto;padding:1rem clamp(1.25rem,13vw,12rem) 7rem;display:grid;grid-template-columns:1fr 1fr;column-gap:4rem}.cursio-capability{display:grid;grid-template-columns:2.3rem 1fr 1.25rem;gap:1rem;align-items:start;padding:1.7rem 0;border-top:1px solid var(--color-line)}.cursio-capability__number{font: .65rem var(--font-mono);color:var(--color-brand);padding-top:.2rem}.cursio-capability h3{font-size:1.03rem;font-weight:500;letter-spacing:-.025em;margin:0}.cursio-capability p{font-size:.82rem;color:var(--color-muted);line-height:1.7;margin:.55rem 0 0;max-width:24rem}.cursio-capability__arrow{color:var(--color-muted);transition:color .2s,transform .2s}.cursio-capability:hover .cursio-capability__arrow{color:var(--color-brand);transform:translate(2px,-2px)}
.cursio-security{max-width:90rem;margin:0 auto 7rem;padding:4rem clamp(1.25rem,8vw,8rem);display:grid;grid-template-columns:.7fr 1fr 1fr;align-items:center;gap:2rem;background:radial-gradient(ellipse at 0 50%,color-mix(in srgb,var(--color-brand) 5%,transparent),transparent 50%),var(--color-surface-raised);border-top:1px solid color-mix(in srgb,var(--color-ink) 6%,transparent);border-bottom:1px solid color-mix(in srgb,var(--color-ink) 6%,transparent)}.cursio-security__glyph{display:grid;place-items:center;color:var(--color-brand);filter:drop-shadow(0 0 2rem color-mix(in srgb,var(--color-brand) 23%,transparent))}.cursio-security__glyph svg{stroke-width:1.25}.cursio-security h2{font-size:clamp(2rem,3.2vw,3rem)}.cursio-security>p{font-size:.86rem;color:var(--color-muted);line-height:1.8;margin:0;max-width:25rem}
.cursio-cta{max-width:90rem;margin:0 auto;padding:1rem clamp(1.25rem,13vw,12rem) 7rem}.cursio-cta h2{font-size:clamp(2.5rem,5vw,4rem)}.cursio-cta>p:not(.cursio-kicker){color:var(--color-muted);font-size:.9rem;margin:1rem 0 1.5rem}.cursio-footer{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.4rem clamp(1.25rem,6vw,6rem);border-top:1px solid color-mix(in srgb,var(--color-ink) 7%,transparent);color:var(--color-muted);font-size:.72rem}.cursio-footer .cursio-wordmark{font-size:.95rem}.cursio-footer>span a{color:var(--color-muted-strong);text-decoration:none}
@media(max-width:850px){.cursio-hero{grid-template-columns:1fr;gap:4rem;padding-top:5rem}.cursio-orbit{width:min(72vw,27rem)}.cursio-hero-index{bottom:1.2rem}.cursio-security{grid-template-columns:.4fr 1fr}.cursio-security>p{grid-column:2}.cursio-security__glyph{grid-row:span 2}}
@media(max-width:600px){.cursio-nav{padding-inline:1.1rem}.cursio-nav nav{gap:.85rem}.cursio-nav nav a{font-size:.68rem}.cursio-nav nav a:first-child{display:none}.cursio-hero{padding:4rem 1.25rem 4.6rem;gap:3rem}.cursio-hero h1{font-size:clamp(3.2rem,14vw,5rem)}.cursio-lead{font-size:.95rem}.cursio-hero-actions{align-items:flex-start;flex-direction:column;gap:1rem}.cursio-platform-strip{gap:.75rem 1rem;margin-top:2.7rem}.cursio-platform-strip strong{font-size:.68rem}.cursio-orbit{width:min(82vw,23rem)}.cursio-orbit__node{width:3.8rem;height:3.8rem}.cursio-orbit__core{width:7rem;height:7rem}.cursio-principle{padding:5rem 1.25rem 3.5rem}.cursio-capabilities{grid-template-columns:1fr;padding:0 1.25rem 5rem}.cursio-security{grid-template-columns:1fr;gap:1.2rem;margin-bottom:5rem;padding:2.5rem 1.25rem}.cursio-security__glyph{justify-content:start}.cursio-security>p{grid-column:auto}.cursio-cta{padding:0 1.25rem 5rem}.cursio-footer{align-items:flex-start;flex-direction:column;padding:1.3rem 1.25rem}}
.cursio-source-link{display:inline-flex;align-items:center;gap:.45rem;color:var(--color-muted-strong);font-size:.8rem;text-decoration:none}.cursio-source-link:hover{color:var(--color-brand)}
.cursio-section{max-width:90rem;margin-inline:auto;padding:5.5rem clamp(1.25rem,8vw,8rem)}
.cursio-section__heading{margin-bottom:2rem}.cursio-section__heading h2{font-size:clamp(1.9rem,3.5vw,3rem);font-weight:550;letter-spacing:-.055em}.cursio-section__heading p{max-width:40rem;font-size:.95rem;line-height:1.7}
.cursio-scenario-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}
.cursio-scenario{padding:1.4rem;border-color:var(--color-line);background:color-mix(in srgb,var(--color-surface-raised) 88%,transparent)}
.cursio-scenario__top{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.7rem}.cursio-scenario__icon{display:grid;place-items:center;width:2.5rem;height:2.5rem;border:1px solid var(--color-line);border-radius:var(--radius-control);color:var(--color-brand)}.cursio-scenario__number{font: .66rem var(--font-mono);color:var(--color-muted)}
.cursio-scenario h3,.cursio-dev-card h3{font-size:1.12rem;font-weight:550;letter-spacing:-.025em;margin:0}.cursio-scenario>p,.cursio-dev-card>p{margin:.65rem 0 0;color:var(--color-muted);font-size:.86rem;line-height:1.7}.cursio-scenario__details,.cursio-platform-card__details{margin-top:1rem;border-color:var(--color-line);background:color-mix(in srgb,var(--color-surface) 55%,transparent)}.cursio-scenario__details p,.cursio-platform-card__details p,.cursio-dev-consent p{margin:0;color:var(--color-muted-strong);font-size:.8rem;line-height:1.7}
.cursio-network-story{max-width:90rem;margin:1rem auto 0;padding:3rem clamp(1.25rem,8vw,8rem);display:grid;grid-template-columns:3.5rem minmax(0,1.4fr) minmax(12rem,.8fr);align-items:center;gap:1.5rem;background:radial-gradient(ellipse at 0 50%,color-mix(in srgb,var(--color-brand) 6%,transparent),transparent 50%),var(--color-surface-raised);border-block:1px solid var(--color-line)}
.cursio-network-story__mark{color:var(--color-brand)}.cursio-network-story__copy h2{margin:0;font-size:clamp(1.7rem,3vw,2.6rem);font-weight:550;line-height:1.1;letter-spacing:-.05em}.cursio-network-story__copy h2 span{color:var(--color-muted)}.cursio-network-story__copy>p:last-child{max-width:43rem;margin:.85rem 0 0;color:var(--color-muted);font-size:.86rem;line-height:1.75}.cursio-network-badges{display:flex;flex-wrap:wrap;gap:.55rem}
.cursio-developer-section{padding-top:7rem}.cursio-developer-intro{display:flex;align-items:end;justify-content:space-between;gap:2rem;margin-bottom:2rem}.cursio-developer-intro h2,.cursio-start h2{margin:0;font-size:clamp(2rem,4vw,3.5rem);font-weight:550;line-height:1.02;letter-spacing:-.06em}.cursio-developer-intro h2 span,.cursio-start h2 span{color:var(--color-muted)}.cursio-developer-intro>div>p:last-child{max-width:39rem;color:var(--color-muted);font-size:.9rem;line-height:1.75;margin:.9rem 0 0}
.cursio-dev-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.cursio-dev-card{padding:1.3rem;border-color:var(--color-line)}.cursio-dev-card__icon{color:var(--color-brand);margin-bottom:1.4rem}.cursio-dev-command{display:grid;grid-template-columns:minmax(0,1fr) minmax(18rem,.9fr);align-items:center;gap:2rem;margin-top:2rem;padding:1.3rem 0;border-block:1px solid var(--color-line)}.cursio-dev-command .cursio-kicker{margin-bottom:.55rem}.cursio-dev-command p:not(.cursio-kicker){max-width:34rem;color:var(--color-muted);font-size:.82rem;line-height:1.7;margin:0}.cursio-dev-consent{margin-top:1rem}
.cursio-platform-section{padding-top:7rem}.cursio-platform-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.8rem}.cursio-platform-card{padding:1.1rem;border-color:var(--color-line);background:color-mix(in srgb,var(--color-surface-raised) 65%,transparent)}.cursio-platform-card__title{display:flex;align-items:center;gap:.55rem;color:var(--color-brand)}.cursio-platform-card__title h3{margin:0;color:var(--color-ink);font-size:1rem;font-weight:550}.cursio-platform-card>.lp-badge{margin-top:.8rem}.cursio-platform-card>p{min-height:5.5rem;color:var(--color-muted);font-size:.8rem;line-height:1.65;margin:.8rem 0 0}.cursio-platform-card__details{margin-top:.8rem}.cursio-limitations{margin-top:1rem}.cursio-limitations ul{margin:0;padding-left:1.2rem;color:var(--color-muted-strong);font-size:.8rem;line-height:1.85}
.cursio-start{max-width:90rem;margin:2rem auto 4rem;padding:4rem clamp(1.25rem,8vw,8rem);display:grid;grid-template-columns:1fr minmax(20rem,.8fr);gap:3rem;background:var(--color-surface-raised);border-block:1px solid var(--color-line)}.cursio-start__copy>p:not(.cursio-kicker){max-width:33rem;color:var(--color-muted);font-size:.88rem;line-height:1.75;margin:1rem 0 1.5rem}.cursio-start__commands{display:grid;gap:.55rem}.cursio-start__commands>p{margin:.2rem 0 0;color:var(--color-muted);font: .65rem var(--font-mono);letter-spacing:.04em}
@media(max-width:900px){.cursio-platform-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.cursio-network-story{grid-template-columns:2.5rem 1fr}.cursio-network-badges{grid-column:2}.cursio-dev-command{grid-template-columns:1fr 1fr}}
@media(max-width:640px){.cursio-nav nav a:nth-child(2){display:none}.cursio-section{padding:4rem 1.25rem}.cursio-scenario-grid,.cursio-dev-grid,.cursio-platform-grid{grid-template-columns:1fr}.cursio-scenario{padding:1.1rem}.cursio-network-story{grid-template-columns:1fr;gap:1rem;padding:2rem 1.25rem}.cursio-network-badges{grid-column:auto}.cursio-developer-intro{align-items:flex-start;flex-direction:column;gap:1rem}.cursio-dev-command,.cursio-start{grid-template-columns:1fr;gap:1.3rem}.cursio-platform-card>p{min-height:0}.cursio-start{margin-bottom:2rem;padding:2.5rem 1.25rem}.cursio-platform-strip{margin-top:2.5rem}}
@media(prefers-reduced-motion:reduce){.cursio-page *{scroll-behavior:auto;transition:none!important}}
</style>
