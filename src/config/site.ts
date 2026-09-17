export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export type NavLink = { label: string; href: string };
export type NavGroup = { title: string; children: NavLink[] };

/** 首页轮播页（固定 3 篇；少于 3 篇时轮播按实际条数渲染） */
export type CarouselSlide = {
  /** 轮播配图（放 public/images/，宽高比按 790:292 裁切） */
  image: string;
  title: string;
  href: string;
};

/** 右侧游戏信息卡的字段行（原站字段：制作公司/发行公司/发售日期/游戏平台/游戏类型） */
export type GameInfoField = { label: string; value: string };

/** 左视频列的 YouTube 条目（官方频道代表作优先；2–4 个） */
export type VideoItem = { youtubeId: string; title: string };

/**
 * 主题色 token 名（供组件以 var() 引用）。
 * ⚠️ 色值唯一来源 = src/app/globals.css 的 @theme 块，本文件不重复定义色值。
 * 每站正式配色由 g-art-design 从游戏官方素材提取后覆盖 globals.css 的三个主槽位。
 */
export const themeTokens = {
  primary: "--color-primary",
  accent: "--color-accent",
  auxiliary: "--color-auxiliary",
} as const;

export type SiteConfig = {
  /** 游戏名（全站唯一来源） */
  name: string;
  shortName: string;

  /** SEO 三件套 */
  seo: {
    title: string;
    description: string;
    keywords: string;
  };

  /** Hero 大图区（无顶栏，Hero 直顶） */
  hero: {
    /** keyart 大图路径；同时用作内容页右栏 banner */
    image: string;
    eyebrow?: string;
    title: string;
    subtitle?: string;
  };

  /** 首页横向轮播：3 篇，5s 自动换页 */
  carousel: {
    autoPlayMs: number;
    slides: CarouselSlide[];
  };

  /** 右侧游戏信息卡 */
  gameInfo: {
    title: string;
    /** 封面图路径（125×166 比例） */
    cover: string;
    fields: GameInfoField[];
    /** Steam 入口按钮（文案统一 View on Steam ↗） */
    ctaLabel: string;
    ctaHref: string;
  };

  /** 左视频列 YouTube id 列表（2–4 个，数量由右攻略区高度反推） */
  videos: VideoItem[];

  /** 官方链接（页脚展示；建议至少 1 条，其余留空则不渲染） */
  officialLinks: NavLink[];

  /** 全站攻略导航分组（首页攻略区 / 内容页右栏导航树共用；每站按真实内容增减） */
  nav: NavGroup[];

  /** 栏目简介（栏目页 L2 顶部一段话，key=section 目录名；缺省回退到「N guides…」） */
  sectionIntros?: Record<string, string>;

  /** 栏目兑底图池：内容页缺图时按栏目取图，避免与右栏 keyart 同图同屏（扬哥 2026-09-16） */
  sectionFallbackImages?: Record<string, string>;

  /** 页脚 */
  footer: {
    copyright: string;
    contactLabel: string;
    /** 联系方式（邮箱/表单链接文本）；不填则页脚不显示联系位 */
    contact?: string;
  };

  /** 广告位（骨架预制）：填入广告代码（HTML/JS）即生效；留空则完全不渲染不占位 */
  ads?: {
    /** 首页攻略区顶部 banner（内容区宽度） */
    contentBanner?: string;
    /** 页面底部 banner 广告位（页脚上方，每页都有） */
    footerBanner?: string;
    /** 正文中横幅广告位（728×90）：位置在第一屏之后，长文自动多插一个位（同一份代码可多处复用） */
    articleInline?: string;
    /** 正文第二坑位代码（扬哥 2026-09-16：长文双广告位时用不同代码/创意，避免同屏重复）；缺省回退 articleInline */
    articleInline2?: string;
    /** 左右浮动竖幅 160×600 旧写法：只填此字段=左右共用同一单元（同屏创意相同） */
    sideRail?: string;
    /** 左侧竖幅广告单元（独立 key=独立竞价/创意/统计；优先于 sideRail） */
    sideRailLeft?: string;
    /** 右侧竖幅广告单元（独立 key=独立竞价/创意/统计；优先于 sideRail） */
    sideRailRight?: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "Mortal Shell II",
  shortName: "MS II",

  seo: {
    title: "Mortal Shell II Wiki — Walkthrough, Shells, Weapons & Collectibles",
    description:
      "Fan-made Mortal Shell II wiki: full chapter walkthroughs, all Shell and weapon locations, beacon routes, Revered Glands, Synaptic Vessels and Tarstones — all in English.",
    keywords:
      "mortal shell 2, mortal shell ii, mortal shell 2 wiki, mortal shell 2 walkthrough, mortal shell 2 shells, mortal shell 2 weapons, mortal shell 2 collectibles",
  },

  hero: {
    image: "/images/home/keyart.webp",
    eyebrow: "Fan-Made Wiki",
    title: "Mortal Shell II",
    subtitle: "Walkthrough · Shells · Weapons · Beacons · Collectibles",
  },

  carousel: {
    autoPlayMs: 5000,
    slides: [
      {
        image: "/images/home/slide-1.webp",
        title: "Mortal Shell II — Full Walkthrough, Chapter by Chapter",
        href: "/walkthrough/forlorn-village",
      },
      {
        image: "/images/home/slide-2.webp",
        title: "All Shells — Every Location & Unlock Requirement",
        href: "/shells/how-to-unlock-all-shells",
      },
      {
        image: "/images/home/slide-3.webp",
        title: "Beginner's Guide — Parry Timing & Early Builds",
        href: "/guides/beginners-guide",
      },
    ],
  },

  gameInfo: {
    title: "Mortal Shell II",
    cover: "/images/home/cover.webp",
    fields: [
      { label: "Developer", value: "Cold Symmetry" },
      { label: "Publisher", value: "Cold Symmetry" },
      { label: "Release Date", value: "August 20, 2026" },
      { label: "Platforms", value: "PC, PlayStation, Xbox" },
      { label: "Genre", value: "Action RPG" },
    ],
    ctaLabel: "View on Steam ↗",
    ctaHref: "https://store.steampowered.com/app/2584270/",
  },

  videos: [
    {
      youtubeId: "DQY-_fL6fek",
      title: "Mortal Shell II — Launch Accolades Trailer",
    },
  ],

  officialLinks: [
    { label: "Official Site", href: "https://www.mortalshell.com/" },
    { label: "Steam Page", href: "https://store.steampowered.com/app/2584270/" },
  ],

  nav: [
    {
      title: "Guides",
      children: [
        { label: "Beginner's Guide", href: "/guides/beginners-guide" },
        { label: "Best Settings — Motion Sickness", href: "/guides/best-settings" },
        { label: "Reviews & Game Length", href: "/guides/reviews-and-length" },
      ],
    },
    {
      title: "Shells",
      children: [
        { label: "How to Unlock All Shells", href: "/shells/how-to-unlock-all-shells" },
        { label: "Tiel, the Acolyte", href: "/shells/tiel-the-acolyte" },
        { label: "Proxima, the Broodseeker", href: "/shells/proxima-the-broodseeker" },
        { label: "Eredrim, the Venerable", href: "/shells/eredrim-the-venerable" },
        { label: "Smert, the Apostate", href: "/shells/smert-the-apostate" },
        { label: "Lazlo, the Justicar", href: "/shells/lazlo-the-justicar" },
        { label: "Genessa, the Wayward", href: "/shells/genessa-the-wayward" },
        { label: "Sariel, the Endless", href: "/shells/sariel-the-endless" },
      ],
    },
    {
      title: "Weapons",
      children: [
        { label: "Axe and Dagger", href: "/weapons/axe-and-dagger" },
        { label: "Veteran's Battle Axe", href: "/weapons/veterans-battle-axe" },
        { label: "Great Martyr's Blade", href: "/weapons/great-martyrs-blade" },
        { label: "Obsidian Hammer", href: "/weapons/obsidian-hammer" },
        { label: "Axatana", href: "/weapons/axatana" },
        { label: "Clockwork Scythe", href: "/weapons/clockwork-scythe" },
        { label: "Forgotten Crossbow", href: "/weapons/forgotten-crossbow" },
        { label: "Salvaged Trebuchaxe", href: "/weapons/salvaged-trebuchaxe" },
        { label: "Bard's Lute", href: "/weapons/bards-lute" },
        { label: "Triarch Repeater", href: "/weapons/triarch-repeater" },
        { label: "Ballistazooka", href: "/weapons/ballistazooka" },
        { label: "Cursed Child", href: "/weapons/cursed-child" },
        { label: "Caged Hystrix", href: "/weapons/caged-hystrix" },
      ],
    },
    {
      title: "Beacons",
      children: [
        { label: "Widow's Overlook & Map Fragment 4", href: "/beacons/widows-overlook" },
        { label: "Blackridge Pass & Fragment 3", href: "/beacons/blackridge-pass" },
        { label: "Gloomshade Grove & the Gate", href: "/beacons/gloomshade-grove" },
        { label: "Glutted Mire: Three Beacons", href: "/beacons/glutted-mire" },
        { label: "One Legged Wolf & Fragment 5", href: "/beacons/one-legged-wolf" },
        { label: "Citadel of Penance & Fragment 2", href: "/beacons/citadel-of-penance" },
        { label: "Ruins of Nochte & Fragment 1", href: "/beacons/ruins-of-nochte" },
        { label: "Prisoner's Domain: Four Beacons", href: "/beacons/prisoners-domain" },
        { label: "Sanguine Caverns: Four-Gate Chain", href: "/beacons/sanguine-caverns" },
        { label: "Abandoned Outpost & Mammon Gate", href: "/beacons/abandoned-outpost" },
        { label: "High Lord's Keep & Fragment 6", href: "/beacons/high-lords-keep" },
        { label: "Castigator's Keep & Fragments", href: "/beacons/castigators-keep" },
        { label: "Vestige of Infinity", href: "/beacons/vestige-of-infinity" },
        { label: "Sester's Refuge (Monastery)", href: "/beacons/sesters-refuge" },
        { label: "The Silent Steps", href: "/beacons/the-silent-steps" },
        { label: "Conquered Temple Beacons", href: "/beacons/conquered-temple" },
        { label: "The Ending: First Branch", href: "/beacons/the-ending" },
        { label: "The Ending: Second Branch", href: "/beacons/the-ending-2" },
        { label: "The Ending: Third Branch", href: "/beacons/the-ending-3" },
        { label: "The Ending: Hidden Nave & Final Boss", href: "/beacons/the-ending-4" },
      ],
    },
    {
      title: "Collectibles",
      children: [
        { label: "Revered Glands — Widow's Overlook", href: "/collectibles/revered-glands-widows-overlook" },
        { label: "Revered Gland — Marrow Keep Shop", href: "/collectibles/revered-glands-marrow-keep" },
        { label: "Revered Gland — Sunken Village", href: "/collectibles/revered-glands-sunken-village" },
        { label: "Synaptic Vessels — What They Do", href: "/collectibles/synaptic-vessels-marrow-keep" },
        { label: "Synaptic Vessel — Blackridge Pass", href: "/collectibles/synaptic-vessels-blackridge-pass" },
        { label: "Synaptic Vessel — Wolf Tablet", href: "/collectibles/synaptic-vessels-one-legged-wolf-1" },
        { label: "Synaptic Vessel — Hidden Underground", href: "/collectibles/synaptic-vessels-one-legged-wolf-2" },
        { label: "Synaptic Vessel — Bloodcursed Gate", href: "/collectibles/synaptic-vessels-bloodcursed-gate" },
        { label: "Retribution Stone", href: "/collectibles/retribution-stone" },
        { label: "Arbiter's Prize", href: "/collectibles/arbiters-prize" },
        { label: "Acolyte's Stone", href: "/collectibles/acolytes-stone" },
        { label: "Unwieldly Stone", href: "/collectibles/unwieldly-stone" },
        { label: "Parasitic Stone", href: "/collectibles/parasitic-stone" },
      ],
    },
    {
      title: "Walkthrough",
      children: [
        { label: "Prologue & Forlorn Village", href: "/walkthrough/forlorn-village" },
        { label: "Disciple's Grotto (Ch. 2)", href: "/walkthrough/disciples-grotto" },
        { label: "Marrow Keep — The Hub", href: "/walkthrough/marrow-keep" },
        { label: "Widow's Overlook (Ch. 3)", href: "/walkthrough/widows-overlook" },
        { label: "Mushroom Village (Ch. 4)", href: "/walkthrough/mushroom-village" },
        { label: "Glutted Mire", href: "/walkthrough/glutted-mire" },
        { label: "Gloomshade Grove", href: "/walkthrough/gloomshade-grove" },
        { label: "Sackhead Secret Ending", href: "/walkthrough/sackhead-secret-ending" },
        { label: "Sanguine Caverns", href: "/walkthrough/sanguine-caverns" },
        { label: "Ruins of Nochte", href: "/walkthrough/ruins-of-nochte" },
        { label: "Prisoner's Domain", href: "/walkthrough/prisoners-domain" },
        { label: "Outskirts of Mammon", href: "/walkthrough/outskirts-of-mammon" },
        { label: "Abandoned Outpost", href: "/walkthrough/abandoned-outpost" },
        { label: "Withered Shoals", href: "/walkthrough/withered-shoals" },
        { label: "Sester's Refuge (Monastery)", href: "/walkthrough/sesters-refuge" },
        { label: "Valley of the Revered", href: "/walkthrough/valley-of-the-revered" },
        { label: "Castigator's Keep", href: "/walkthrough/castigators-keep" },
        { label: "Faded Citadel", href: "/walkthrough/faded-citadel" },
        { label: "Ashen Sanctum", href: "/walkthrough/ashen-sanctum" },
        { label: "The Ending — Final Area", href: "/walkthrough/the-ending" },
        { label: "One-Legged Wolf Tavern", href: "/walkthrough/one-legged-wolf-tavern" },
        { label: "Blackridge Cliffs", href: "/walkthrough/blackridge-cliffs" },
        { label: "Citadel of Penance", href: "/walkthrough/citadel-of-penance" },
      ],
    },
  ],

  sectionIntros: {
    guides:
      "Practical Mortal Shell II guides: the opening-hours plan, the settings that fix motion sickness, and how long the game really takes to beat.",
    shells:
      "Every Shell in Mortal Shell II and where it sleeps — graveyard pickups, boss trophies, blood rituals and one quest item — with the route to each.",
    weapons:
      "All thirteen weapons and sidearms of Mortal Shell II: where each is found, what it plays like, and the fights standing between you and the loot.",
    beacons:
      "Beacon-by-beacon cleansing routes for every region of Mortal Shell II, with all ten Map Fragments and the fast-travel web they unlock.",
    collectibles:
      "Revered Glands, Synaptic Vessels and the Tarstones that define builds — what each does, where it hides, and who sells it.",
    walkthrough:
      "The complete Mortal Shell II walkthrough: every chapter, dungeon, boss and secret ending, in the order the game actually allows.",
  },

  sectionFallbackImages: {
    guides: "/images/home/keyart.webp",
    shells: "/images/shells/how-to-unlock-all-shells.webp",
    weapons: "/images/weapons/axatana.webp",
    beacons: "/images/beacons/widows-overlook.webp",
    collectibles: "/images/collectibles/arbiters-prize.webp",
    walkthrough: "/images/walkthrough/the-ending.webp",
  },

  footer: {
    copyright:
      "Fan-made wiki. Not affiliated with Cold Symmetry or the game's publisher.",
    contactLabel: "Contact",
  },

  ads: {
    // 2026-09-17 广告四件套标准（单元代码存根目录 ads/*.txt；native 横版）
    sideRailLeft: `<script>
  atOptions = {
    'key' : 'd4a7bde49f3f01e0067bbb076966d94d',
    'format' : 'iframe',
    'height' : 300,
    'width' : 160,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/d4a7bde49f3f01e0067bbb076966d94d/invoke.js"></script>`,
    sideRailRight: `<script>
  atOptions = {
    'key' : 'fe451c418dc40964937308924de6c3ef',
    'format' : 'iframe',
    'height' : 600,
    'width' : 160,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/fe451c418dc40964937308924de6c3ef/invoke.js"></script>`,
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
    articleInline: `<script async="async" data-cfasync="false" src="https://pl31112824.profitableratecpmnetwork.com/6f053d4916243be5a0f56b317d28172b/invoke.js"></script>
<div id="container-6f053d4916243be5a0f56b317d28172b"></div>`,
  },
};
