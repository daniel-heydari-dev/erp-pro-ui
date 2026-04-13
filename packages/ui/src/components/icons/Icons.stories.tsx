import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { StorySurface } from "../shared/storybook";
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
} from "./index";

const iconEntries = [
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

const meta: Meta<typeof ActivityIcon> = {
  title: "Foundations/Icons",
  component: ActivityIcon,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Reference gallery for the exported SVG icon set. All icons accept standard SVG props plus color/title helpers.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    width: { control: "number" },
    height: { control: "number" },
    color: { control: "color" },
    className: { control: "text" },
    title: { control: "text" },
    titleId: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function IconsLibraryGrid() {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const copyText = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedLabel(label);
      window.setTimeout(() => setCopiedLabel(null), 1200);
    } catch {
      setCopiedLabel(null);
    }
  };

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-7xl" className="ui:block">
      <div className="ui:mb-4 ui:flex ui:items-center ui:justify-between ui:gap-3">
        <p className="ui:text-sm ui:text-ds-2">
          Click an icon card to copy its name. Use copy import to copy the
          import line.
        </p>
        <p className="ui:text-xs ui:font-medium ui:text-ds-2">
          {copiedLabel ? `${copiedLabel} copied` : "Ready"}
        </p>
      </div>

      <div className="ui:grid ui:grid-cols-2 ui:gap-4 md:ui:grid-cols-4 lg:ui:grid-cols-5">
        {iconEntries.map((item) => {
          const IconComponent = item.component;
          const importLine = `import { ${item.name} } from "erp-pro-ui/icons";`;

          return (
            <div
              key={item.name}
              onClick={() => copyText(item.name, item.name)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  void copyText(item.name, item.name);
                }
              }}
              role="button"
              tabIndex={0}
              className="ui:group ui:flex ui:w-full ui:flex-col ui:items-center ui:justify-center ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-4 ui:text-center ui:transition ui:hover:border-ds-border-3 ui:hover:bg-ds-surface-2"
            >
              <div className="ui:mb-3 ui:text-ds-2">
                <IconComponent width={24} height={24} />
              </div>
              <span className="ui:px-1 ui:text-xs ui:font-mono ui:text-ds-1">
                {item.name}
              </span>
              <span className="ui:mt-1 ui:text-[10px] ui:text-ds-3">
                click to copy name
              </span>
              <span
                role="button"
                tabIndex={0}
                onClick={(event) => {
                  event.stopPropagation();
                  void copyText(importLine, `${item.name} import`);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    event.stopPropagation();
                    void copyText(importLine, `${item.name} import`);
                  }
                }}
                className="ui:mt-2 ui:rounded ui:border ui:border-ds-border-2 ui:px-2 ui:py-1 ui:text-[10px] ui:font-mono ui:text-ds-2 ui:transition group-hover:ui:bg-ds-surface-1 hover:ui:bg-ds-surface-1"
              >
                copy import
              </span>
            </div>
          );
        })}
      </div>
    </StorySurface>
  );
}

export const Library: Story = {
  render: () => <IconsLibraryGrid />,
};

export const UsageExamples: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <div className="ui:grid ui:gap-6 md:ui:grid-cols-3">
        <div className="ui:rounded-2xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-6">
          <p className="ui:mb-4 ui:text-sm ui:font-medium">Action row</p>
          <div className="ui:flex ui:items-center ui:gap-3">
            <SettingsIcon width={20} height={20} color="#7367f0" />
            <SearchIcon width={20} height={20} color="#00cfe8" />
            <BellIcon width={20} height={20} color="#ff9f43" />
          </div>
        </div>
        <div className="ui:rounded-2xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-6">
          <p className="ui:mb-4 ui:text-sm ui:font-medium">Navigation cues</p>
          <div className="ui:flex ui:items-center ui:gap-3">
            <ChevronLeftIcon width={20} height={20} />
            <ChevronDownIcon width={20} height={20} />
            <ChevronRightIcon width={20} height={20} />
          </div>
        </div>
        <div className="ui:rounded-2xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-6">
          <p className="ui:mb-4 ui:text-sm ui:font-medium">
            Status and user context
          </p>
          <div className="ui:flex ui:items-center ui:gap-3">
            <CheckIcon width={20} height={20} color="#28c76f" />
            <UserIcon width={20} height={20} color="#7367f0" />
            <PackageIcon width={20} height={20} color="#ff4c51" />
          </div>
        </div>
      </div>
    </StorySurface>
  ),
};
