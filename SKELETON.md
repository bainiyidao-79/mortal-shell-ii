# SKELETON: topic-carousel-wiki

> 归档日期：2026-09-16
> 来源：按 `docs/结构测绘-20260916.md`（参考页 ali213.net 专题页 + 攻略正文页）自写实现，未复制原站代码与中文内容。
> 定位：**专题轮播型**游戏站骨架——Hero 大图直顶 + 横向轮播/游戏信息卡 + 视频列/攻略按钮网格（九宫格）；内页左正文 + 右黏性导航树。
> 配套风格包：`游侠style`（`/home/admin/Documents/style/游侠style/`，一对一绑定）

## ⭐ 一句话定位
这是一个**无顶栏、Hero 直顶**的专题页骨架：首屏用 keyart 大图压场，下面接「轮播 3 篇 + 游戏信息卡」与「视频列 + 攻略按钮网格」两大块，全站导航靠**右侧黏性导航树**和**小方按钮网格**承载，适合攻略条目多、需要一屏铺开入口的游戏。

## 结构特征（索引必填 · 五维度）

| 特征维度 | 识别结果 |
|---------|---------|
| **媒体能力** | YouTube 视频嵌入（左视频列 2–4 个）+ 图文混排（MDX，分段插图浮动环绕）+ 轮播图 3 篇；无地图标注 |
| **页面结构** | 专题页式（Hero 直顶 + 轮播/信息卡 + 视频/攻略网格）+ 栏目页 L2（按钮列表）+ 内容页 L3（左正文 + 右黏性栏）；**无顶栏** |
| **语言** | 单语言（en；界面文案与内容都在 `src/content/en/`） |
| **功能模块** | Hero 大图区 / 横向轮播（5s 自动+悬停暂停+分页点） / 游戏信息卡（5 字段 + Steam 入口） / 视频列 / 攻略按钮网格（分组+展开） / 面包屑 / 右黏性导航树（分组可折叠+两列按钮+展开） / 广告位（内容 banner·底部 banner·左右竖幅） / GA / sitemap·robots / favicon |
| **适合游戏类型** | 单机大型游戏攻略站（流程/地标/收集/成就类条目多）；多栏目需要一屏铺开入口的游戏；需要视频留人 + 图文攻略的游戏 |

> 本骨架**已剔除**（相对参考页）：主站顶栏、搜索框、资讯聚合、玩家评论、下载、补丁/MOD、硬件/帧数模块。

## 页面三型（实现口径）

| 页面 | 路由 | 结构 |
|------|------|------|
| 首页 | `/` | Hero（keyart，高 440px，无顶栏）→ Main1：轮播 790×292 + 信息卡 395×292（15px 间距）→ Main3：视频列 350 + 攻略区（约 820，最小高 920，25px 间距） |
| 栏目页 L2 | `/[section]` | 面包屑 → 栏目名 → 橙色 1px 分隔线 → 该栏目攻略 179×28 小方按钮列表（每行 4 个） |
| 内容页 L3 | `/[section]/[slug]` | 面包屑 → 左正文（行距 1.85 + 分段插图浮动混排） + 右黏性栏（keyart banner + 分组可折叠全站导航树，组内两列按钮 + More 展开） |

## 布局度量（对齐测绘文档，桌面端）

- 内容净宽 **1200px**（`.wrap-1200` = max-width 1232 + 左右 16px 安全边距）
- 轮播 790 / 间隙 15 / 信息卡 395；视频列 350 / 间隙 25 / 攻略区约 820
- Hero 高 440（sm 360 / 窄屏 240）；信息卡与轮播同高 292
- 攻略按钮 **179×28**，横纵间距 15，每行 4 个，`hover` 白描边（.3s）
- 分页点 8×8 小方块，当前项拉长 14×8
- 全屏断点：`lg`（1024px）以下全部堆叠为单列，按钮变整行宽

## 三层分离（换游戏只动后两层）

| 层 | 位置 | 换游戏时 |
|----|------|---------|
| 框架层 | `src/app/`（路由/sitemap/robots/layout）、`src/components/`、`src/lib/content.ts` | 不动 |
| 配置层 | `src/config/site.ts` | 改字段（游戏名 / SEO 三件套 / 官方链接 / Hero / 轮播 3 篇 / 信息卡 5 字段 / 视频 id / 导航分组 / 广告位） |
| 内容层 | `src/content/en/<section>/<slug>.mdx` | 整站替换 |

**配置层字段一览**（`src/config/site.ts`）：

| 字段 | 用途 |
|------|------|
| `name` / `shortName` | 游戏名（全站唯一来源，组件不硬编码） |
| `seo.title` / `seo.description` / `seo.keywords` | SEO 三件套（metadata + 标题/描述） |
| `hero.image` / `hero.eyebrow` / `hero.title` / `hero.subtitle` | Hero 大图区；`hero.image` 同时用作内容页右栏 banner |
| `carousel.autoPlayMs` / `carousel.slides[]` | 轮播自动换页间隔与 3 篇（image/title/href） |
| `gameInfo.title` / `cover` / `fields[]` / `ctaLabel` / `ctaHref` | 游戏信息卡（制作/发行/发售日期/平台/类型）+ Steam 入口 |
| `videos[]` | 左视频列 YouTube id（2–4 个） |
| `officialLinks[]` | 页脚官方链接 |
| `nav[]` | 全站攻略导航分组（首页攻略区 + 内容页右栏导航树共用；**有真实内容才留按钮**） |
| `footer.copyright` / `contactLabel` | 页脚版权与联系位 |
| `ads.*` | 广告位代码（留空则不渲染不占位） |

**主题色 token**：色值唯一来源 = `src/app/globals.css` 的 `@theme` 块。只需改三个主槽位
（`--color-primary` / `--color-accent` / `--color-auxiliary`），背景/卡片/边框/正文等派生槽位由
`color-mix()` 自动派生，组件里没有任何写死色值。每站正式配色由 `g-art-design` 从游戏官方素材提取后覆盖。

## 广告位（骨架预制，配置驱动）

| 广告位 | 配置字段 | 位置 | 出现范围 |
|-------|---------|------|---------|
| 内容 banner | `ads.contentBanner` | 首页攻略区下方（内容区宽度） | 首页 |
| 底部 banner | `ads.footerBanner` | 页脚上方（每页） | 所有页 |
| 左/右竖幅 | `ads.sideRailLeft` / `ads.sideRailRight` | 大屏两侧 fixed（160×300 / 160×600） | 所有页（窄屏隐藏） |

- 渲染方式：`AdFrame`（iframe + srcdoc，每次路由变化重建）——`document.write` 型广告脚本在 SPA 跳转后仍会重新执行；`AdSlot`（dangerouslySetInnerHTML）留给自管理型脚本。
- 全部字段留空 = 完全不出现在 DOM（无空框，用户零感知）。

## 接线清单（保留项）

- `src/app/sitemap.ts`：构建时按 content 目录自动生成 `/sitemap.xml`（首页 1 / 栏目 0.8 / 内容页 0.7）
- `src/app/robots.ts`：生成 `/robots.txt`，自动带 `Sitemap: {siteUrl}/sitemap.xml`
- `src/components/Analytics.tsx`：读 `NEXT_PUBLIC_GA_ID`，未配置返回 null
- `public/favicon.ico` + `layout.tsx` 的 `icons.icon`
- `src/components/Breadcrumb.tsx`：首页 / L2 / L3 全接线
- 域名来源：`NEXT_PUBLIC_SITE_URL`（**未配置时 sitemap 会落到 localhost**，部署前必须配）

## 铁律：按实际内容增减栏目/按钮

- 骨架是**参考模板**，不是成品脚手架；**有多少素材做多少页面**。
- `siteConfig.nav` 的每个按钮、内容页右栏导航树的每个条目都必须指向真实存在的页面。**严禁空链接/重复链接**。
- `videos` 未填 `youtubeId` 的条目在构建产物中自动跳过（`next dev` 下显示占位框，便于核对列高）。
- 左视频列与右攻略区等高：建议放 **3–4 个视频**（攻略区最小高 920 / 视频卡含 25px 间距约 198 高），放 2 个时单卡会被拉高。

## 本地验证

```bash
npm install
npm run verify                     # tsc --noEmit
NEXT_PUBLIC_SITE_URL="https://example.com" npm run build   # 静态导出到 out/
bash scripts/verify.sh             # 一键：类型检查 + 构建 + out/ 产物检查
```

实测（2026-09-16）：`tsc --noEmit` 通过；`next build` 通过，12 个静态页导出成功；
`out/index.html`、`out/guide/overview.html` 等正常生成；`out/sitemap.xml` 无 localhost。

## 已知适配点（换游戏时必改）

1. `src/config/site.ts`：全部字段（游戏名 / SEO / Hero / 轮播 / 信息卡 / 视频 id / 导航 / 广告）
2. `public/images/`：换掉 6 个占位 SVG（keyart 1920×600 / 轮播 790×292 ×3 / 封面 125×166）
3. `src/content/en/**/*.mdx`：替换为真实攻略（`src/lib/content.ts` 的 `sectionLabels` 同步补栏目显示名）
4. `src/app/globals.css`：覆盖三个主色槽位（正式配色由 `g-art-design` 产出）

## 文件/路径

- 骨架位置：`/home/admin/Documents/skeletons/topic-carousel-wiki/`
- 骨架索引：`/home/admin/Documents/skeletons/skeleton-index.json`
- 测绘文档：`/home/admin/Documents/skeletons/topic-carousel-wiki/docs/结构测绘-20260916.md`
- 配套风格包：`/home/admin/Documents/style/游侠style/`
- 静态预览（不依赖构建）：浏览器直接打开 `preview.html`
- 游戏参数：`/home/admin/Documents/game-sites/<游戏文件夹>/setting.md`
