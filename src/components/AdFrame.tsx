"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type AdFrameProps = {
  /** 广告代码（HTML/JS 片段，支持 document.write 型广告脚本） */
  code?: string;
  /** 广告尺寸（决定 iframe 尺寸与保留高度） */
  width?: number;
  height?: number;
  /** 无障碍标签 */
  label?: string;
  className?: string;
};

/**
 * iframe 式广告位（骨架预制）。
 *
 * 解决的问题：dangerouslySetInnerHTML 注入的 <script> 在 Next.js 客户端
 * 导航（<Link> 跳转、浏览器返回）时不会重新执行，document.write 型广告
 * 脚本（如 Adsterra 固定 Banner）只在初始 HTML 解析期有效，导致 SPA 跳转
 * 后广告消失。
 *
 * 方案：每次路由变化（usePathname）重建 iframe，并通过 srcdoc 把广告代码
 * 写入 iframe 文档——srcdoc 文档解析期写入的脚本一定会执行（无竞态），
 * 等价于广告代码写在初始 HTML 中的语义。
 */
export function AdFrame({ code, width, height, label, className }: AdFrameProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !code) return;
    host.innerHTML = "";
    const iframe = document.createElement("iframe");
    if (width) iframe.width = String(width);
    if (height) iframe.height = String(height);
    iframe.title = label ?? "Advertisement";
    iframe.style.border = "0";
    iframe.style.display = "block";
    host.appendChild(iframe);
    // srcdoc：无竞态写入（about:blank 异步加载会重置 doc.write 的内容）
    iframe.srcdoc = code;
  }, [code, pathname]);

  if (!code) return null;
  return (
    <div
      ref={hostRef}
      role="complementary"
      aria-label={label ?? "Advertisement"}
      className={className}
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: height ?? undefined,
      }}
    />
  );
}
