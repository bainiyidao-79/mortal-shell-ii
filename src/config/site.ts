export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export type NavLink = { label: string; href: string };
export type NavGroup = { title: string; children: NavLink[] };

export type SiteConfig = {
  name: string;
  shortName: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  /** Hero 区顶部小徽章文字（如 "WIKI GUIDE"），空串则不显示 */
  eyebrow?: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;

  // 官方链接
  platformUrl?: string;
  discordUrl?: string;
  youtubeChannelUrl?: string;

  // 顶部导航（Header 用的平铺链接；不填则取 nav 第一组前 4 项）
  topNav?: NavLink[];

  // 侧边栏目录树（按实际内容增减，不做死链接）
  nav: NavGroup[];

  // 首页 YouTube 视频（Workflow 建站时填入：官方频道代表作 > 播放量最高热门视频）
  heroVideo?: {
    youtubeId: string;
    title?: string;
    description?: string;
  };

  // 首页「Trending Now」：精选文章（不填则整块隐藏）
  trending?: { label: string; href: string; description?: string }[];

  // 首页「What is <Game>?」介绍区（不填则整块隐藏）
  gameIntro?: {
    title?: string;
    paragraphs: string[];
    facts?: { label: string; value: string }[];
  };

  // 底部 CTA 大横幅（光晕容器，不填则整块隐藏）
  ctaBanner?: {
    title: string;
    description?: string;
    buttonLabel: string;
    buttonHref: string;
  };

  // 广告位（骨架预制）：填入广告代码（HTML/JS）即生效；留空则完全不渲染不保留位置
  ads?: {
    /** 侧边栏底部广告位（菜单栏下方） */
    sidebar?: string;
    /** 页面底部 banner 广告位（页脚上方，每页都有） */
    footerBanner?: string;
  };

  // 可选：FAQ
  faq?: { question: string; answer: string }[];

  // SEO 关键词（整站级）
  keywords?: string[];
};

export const siteConfig: SiteConfig = {
  name: "Mortal Shell II Wiki",
  shortName: "MSII Wiki",
  description:
    "Mortal Shell II wiki: weapons, gameplay guides, Devout & Revered editions, reviews and Steam info for Cold Symmetry's dark-fantasy soulslike RPG.",
  heroTitle: "Mortal Shell II Wiki",
  heroSubtitle: "Weapons, Guides, Editions & Reviews",
  eyebrow: "Wiki Guide",
  primaryCtaLabel: "Read the Weapons Guide",
  primaryCtaHref: "/guide/mortal-shell-ii-weapons",

  keywords: [
    "mortal shell ii",
    "mortal shell 2",
    "mortal shell ii wiki",
    "mortal shell ii weapons",
    "mortal shell ii devout edition",
    "mortal shell ii revered edition",
  ],

  platformUrl: "https://store.steampowered.com/app/2584270/",
  discordUrl: "https://discord.gg/mortalshell",
  youtubeChannelUrl: "https://www.youtube.com/channel/UCWxJv0Fl32fY-c1f2x8Pcew",

  topNav: [
    { label: "Weapons", href: "/guide/mortal-shell-ii-weapons" },
    { label: "Gameplay", href: "/guide/mortal-shell-ii-gameplay" },
    { label: "Editions", href: "/editions/mortal-shell-ii-release-date" },
    { label: "Reviews", href: "/review/mortal-shell-ii-review" },
  ],

  // ⚠️ 导航按实际内容增减，不做死链接
  nav: [
    {
      title: "Intro",
      children: [
        { label: "What is Mortal Shell II?", href: "/intro/mortal-shell-ii" },
        { label: "About This Wiki", href: "/intro/mortal-shell-ii-wiki" },
      ],
    },
    {
      title: "Guide",
      children: [
        { label: "Weapons Guide", href: "/guide/mortal-shell-ii-weapons" },
        { label: "Gameplay Overview", href: "/guide/mortal-shell-ii-gameplay" },
        { label: "Trainers & Cheats", href: "/guide/mortal-shell-ii-trainer" },
        { label: "Mods", href: "/guide/mortal-shell-ii-mods" },
      ],
    },
    {
      title: "Editions",
      children: [
        { label: "Devout Edition", href: "/editions/mortal-shell-ii-devout-edition" },
        { label: "Revered Edition", href: "/editions/mortal-shell-ii-revered-edition" },
        { label: "Release Date", href: "/editions/mortal-shell-ii-release-date" },
      ],
    },
    {
      title: "Reviews",
      children: [
        { label: "Review Roundup", href: "/review/mortal-shell-ii-review" },
        { label: "Metacritic", href: "/review/mortal-shell-ii-metacritic" },
        { label: "PS5 Version", href: "/review/mortal-shell-ii-ps5" },
        { label: "Steam Version", href: "/review/mortal-shell-ii-steam" },
      ],
    },
  ],

  // 官方频道播放量最高视频（Global Launch Accolades Trailer, 53K+ views）
  heroVideo: {
    youtubeId: "DQY-_fL6fek",
    title: "Mortal Shell II — Global Launch Accolades Trailer",
    description:
      "The official launch accolades trailer from Cold Symmetry's channel. Their flesh is your weapon.",
  },

  trending: [
    {
      label: "All 8 Weapons, Ranked & Explained",
      href: "/guide/mortal-shell-ii-weapons",
      description: "Tar stones, infusions and locations for every melee weapon.",
    },
    {
      label: "Out Now: Release Timeline",
      href: "/editions/mortal-shell-ii-release-date",
      description: "From announcement to the August 20, 2026 worldwide launch.",
    },
    {
      label: "Devout vs Revered Edition",
      href: "/editions/mortal-shell-ii-devout-edition",
      description: "Which tier is worth your money.",
    },
    {
      label: "What Reviewers Say",
      href: "/review/mortal-shell-ii-review",
      description: "Praise and criticism from real, sourced reviews.",
    },
  ],

  gameIntro: {
    title: "What is Mortal Shell II?",
    paragraphs: [
      "Mortal Shell II is the dark-fantasy action RPG sequel from Cold Symmetry and Playstack, released August 20, 2026 on Steam and PS5. Its tagline: \"Their flesh is your weapon.\"",
      "You play the Harbinger, possessing the shells of dead warriors across an interconnected open world. Each shell fights differently; tar stones, infusions and seals reshape your build on top of it.",
      "This wiki aggregates real community sources — full guides and reviews from established creators, plus official store and developer pages — so every answer traces back to something real.",
    ],
    facts: [
      { label: "Developer", value: "Cold Symmetry" },
      { label: "Publisher", value: "Playstack" },
      { label: "Release Date", value: "August 20, 2026" },
      { label: "Platforms", value: "Steam, PS5" },
      { label: "Genre", value: "Action RPG / Soulslike" },
      { label: "Steam App ID", value: "2584270" },
    ],
  },

  ctaBanner: {
    title: "Ready to pick your weapon?",
    description:
      "All eight melee weapons — tar stones, infusions, abilities and where to find them — in one sourced guide.",
    buttonLabel: "Read the Weapons Guide",
    buttonHref: "/guide/mortal-shell-ii-weapons",
  },

  ads: {
    sidebar: `<script async="async" data-cfasync="false" src="https://pl31112824.profitableratecpmnetwork.com/6f053d4916243be5a0f56b317d28172b/invoke.js"></script>
<div id="container-6f053d4916243be5a0f56b317d28172b"></div>`,
    footerBanner: `<script>
 atOptions = {
 'key' : '61f275d4fbf01cb213fc9c01052b5cd8',
 'format' : 'iframe',
 'height' : 90,
 'width' : 728,
 'params' : {}
 };
</script>
<script src="https://www.highrevenueformat.com/61f275d4fbf01cb213fc9c01052b5cd8/invoke.js"></script>`,
  },

  faq: [
    {
      question: "Do I need to play the first Mortal Shell?",
      answer:
        "No. Mortal Shell II feels stand-alone — you can jump in fresh as a whole new adventure in the same grim universe.",
    },
    {
      question: "When did Mortal Shell II release?",
      answer:
        "August 20, 2026, worldwide, on PC (Steam) and PlayStation 5. The official site headline is now \"Now Available Worldwide.\"",
    },
    {
      question: "How many weapons are in Mortal Shell II?",
      answer:
        "Eight melee weapons, each with unique tar stone support, infusions and ability stones — from the starter Aconclast to the Clockwork Scythe's chainsaw mode.",
    },
    {
      question: "Is there a stamina meter?",
      answer:
        "No. You can swing and dodge freely. Parry timing is also more generous than many soulslikes, though some enemies can still one-shot you.",
    },
    {
      question: "What's the difference between the Devout and Revered editions?",
      answer:
        "They're the mid (~$60) and top (~$100) tiers above the $49.99 standard edition. See our editions pages for what's known about each.",
    },
  ],
};
