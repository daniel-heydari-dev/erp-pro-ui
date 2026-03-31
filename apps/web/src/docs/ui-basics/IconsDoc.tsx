import React from "react";
import {
  ActivityIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  BellIcon,
  BriefcaseBusinessIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  CircleIcon,
  CloseIcon,
  DragIcon,
  EllipsisIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  EyeOffIcon,
  FullScreenIcon,
  HomeIcon,
  PackageIcon,
  SearchIcon,
  SettingsIcon,
  ShoppingCartIcon,
  TrashIcon,
  UserIcon,
} from "erp-pro-ui";
import CodeBlock from "@/docs/components/CodeBlock";
import DocsButtonBar from "@/docs/components/DocsButtonBar";

const IconsDoc = () => {
  const iconsList = [
    { name: "ActivityIcon", component: ActivityIcon },
    { name: "ArrowDownIcon", component: ArrowDownIcon },
    { name: "ArrowLeftIcon", component: ArrowLeftIcon },
    { name: "ArrowRightIcon", component: ArrowRightIcon },
    { name: "ArrowUpDownIcon", component: ArrowUpDownIcon },
    { name: "ArrowUpIcon", component: ArrowUpIcon },
    { name: "BellIcon", component: BellIcon },
    { name: "BriefcaseBusinessIcon", component: BriefcaseBusinessIcon },
    { name: "CheckIcon", component: CheckIcon },
    { name: "ChevronDownIcon", component: ChevronDownIcon },
    { name: "ChevronLeftIcon", component: ChevronLeftIcon },
    { name: "ChevronRightIcon", component: ChevronRightIcon },
    { name: "ChevronUpIcon", component: ChevronUpIcon },
    { name: "ChevronsLeftIcon", component: ChevronsLeftIcon },
    { name: "ChevronsRightIcon", component: ChevronsRightIcon },
    { name: "CircleIcon", component: CircleIcon },
    { name: "CloseIcon", component: CloseIcon },
    { name: "DragIcon", component: DragIcon },
    { name: "EllipsisIcon", component: EllipsisIcon },
    { name: "EllipsisVerticalIcon", component: EllipsisVerticalIcon },
    { name: "EyeIcon", component: EyeIcon },
    { name: "EyeOffIcon", component: EyeOffIcon },
    { name: "FullScreenIcon", component: FullScreenIcon },
    { name: "HomeIcon", component: HomeIcon },
    { name: "PackageIcon", component: PackageIcon },
    { name: "SearchIcon", component: SearchIcon },
    { name: "SettingsIcon", component: SettingsIcon },
    { name: "ShoppingCartIcon", component: ShoppingCartIcon },
    { name: "TrashIcon", component: TrashIcon },
    { name: "UserIcon", component: UserIcon },
  ];

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Icons</h1>
      <p className="docs-paragraph">
        Our curated collection of highly optimized SVG icons exported directly
        from <code>erp-pro-ui</code>.
      </p>

      {/* Grid Display */}
      <h2 className="docs-category-subtitle">Library</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {iconsList.map((item) => {
          const IconComponent = item.component;
          return (
            <div
              key={item.name}
              className="flex flex-col items-center justify-center p-4 border border-white/5 bg-zinc-900/40 rounded-xl hover:bg-zinc-800/50 transition-colors cursor-pointer group"
              onClick={() => {
                navigator.clipboard.writeText(item.name);
              }}
              title={`Click to copy: ${item.name}`}
            >
              <div className="text-zinc-400 group-hover:text-zinc-100 transition-colors mb-3">
                <IconComponent width={24} height={24} />
              </div>
              <span className="text-xs text-zinc-500 font-mono text-center break-all px-1">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Usage Example */}
      <h2 className="docs-category-subtitle mt-12">Usage</h2>
      <p className="docs-paragraph">
        All icons accept standard SVG properties (like `className`) and an
        optional `size` prop.
      </p>

      <CodeBlock
        code={`import { ActivityIcon, SettingsIcon } from 'erp-pro-ui';

export default function MyComponent() {
  return (
    <div className="flex gap-4">
      <ActivityIcon width={32} height={32} className="text-blue-500" />
      <SettingsIcon width={24} height={24} className="text-zinc-400 hover:text-white transition-colors" />
    </div>
  );
}`}
      />

      {/* Adding New Icons */}
      <h2 className="docs-category-subtitle mt-8">Adding New Icons</h2>
      <p className="docs-paragraph">
        When adding new SVGs, place them in{" "}
        <code>packages/ui/src/components/icons</code>, export them in{" "}
        <code>index.ts</code>, and ensure they accept{" "}
        <code>SVGProps&lt;SVGSVGElement&gt;</code> and <code>size</code>.
      </p>

      <DocsButtonBar
        prev={{ label: "Color Palette", route: "/ui-basics/color-palette" }}
        next={{ label: "Spotlight Card", route: "/ui-basics/spotlight-card" }}
      />
    </section>
  );
};

export default IconsDoc;
