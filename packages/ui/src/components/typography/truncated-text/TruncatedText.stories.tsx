import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StoryIntro,
  StoryPanel,
  StorySection,
  StorySurface,
} from "../../shared/storybook";
import { TruncatedText } from "./TruncatedText";

const singleLineSource = `import { TruncatedText } from 'erp-pro-ui';

export function SingleLineFileNameExample() {
  return (
    <TruncatedText maxWidth="18rem" showTitleOnHover>
      Q4-enterprise-expansion-forecast-final-approved-v12.pdf
    </TruncatedText>
  );
}`;

const multiLineSource = `import { TruncatedText } from 'erp-pro-ui';

export function MultiLineSummaryExample() {
  return (
    <TruncatedText as="p" lines={2} maxWidth="22rem" showTitleOnHover>
      This quarter's rollout note includes transfer visibility updates, approval routing refinements, and a new fallback sync path for delayed warehouse reconciliations.
    </TruncatedText>
  );
}`;

const widthControlledSource = `import { TruncatedText } from 'erp-pro-ui';

export function WidthControlledNoteExample() {
  return (
    <TruncatedText as="p" lines={3} width="16rem" showTitleOnHover>
      Long-form operational notes can be clamped to a predictable block width so dense dashboards stay aligned even when individual records contain far more copy than the layout can comfortably hold.
    </TruncatedText>
  );
}`;

const inlineSource = `import { TruncatedText } from 'erp-pro-ui';

export function InlineMetaExample() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        Owner
      </span>
      <TruncatedText
        as="span"
        maxWidth="12rem"
        showTitleOnHover
        style={{ display: 'inline-block' }}
      >
        North American Distribution Enablement Team
      </TruncatedText>
    </div>
  );
}`;

const meta = {
  title: "Foundations/TruncatedText",
  component: TruncatedText,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          "Reusable text-clamping primitive for single-line and multi-line ellipsis with width constraints and optional native hover titles.",
      },
    },
  },
  argTypes: {
    lines: {
      control: { type: "number", min: 1, step: 1 },
      description: "Number of visible lines before the text is truncated.",
    },
    width: {
      control: "text",
      description: "Fixed width applied to the text container.",
    },
    maxWidth: {
      control: "text",
      description: "Maximum width applied to the text container.",
    },
    showTitleOnHover: {
      control: "boolean",
      description:
        "Adds the full text as a native title attribute when possible.",
    },
  },
} satisfies Meta<typeof TruncatedText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleLineRow: Story = {
  name: "Single Line File Name",
  args: {
    children: "Q4-enterprise-expansion-forecast-final-approved-v12.pdf",
    maxWidth: "18rem",
    showTitleOnHover: true,
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
      <StorySection>
        <StoryIntro
          title="Single-line truncation"
          description="Use one line plus a width cap for filenames, table cells, and breadcrumb-like labels."
        />
        <StoryPanel>
          <div className="ui:flex ui:items-center ui:justify-between ui:gap-4">
            <span className="ui:text-sm ui:font-medium ui:text-muted-foreground">
              Attachment
            </span>
            <TruncatedText
              {...args}
              className="ui:text-right ui:text-sm ui:font-medium"
            />
          </div>
        </StoryPanel>
      </StorySection>
    </StorySurface>
  ),
  parameters: { docs: { source: { code: singleLineSource } } },
};

export const MultiLineSummary: Story = {
  name: "Two-Line Summary",
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <div className="ui:grid ui:gap-4 md:ui:grid-cols-3">
        {[
          "This quarter's rollout note includes transfer visibility updates, approval routing refinements, and a new fallback sync path for delayed warehouse reconciliations.",
          "Regional warehouse staffing changed mid-cycle, so throughput forecasts should be interpreted alongside the revised dock allocation model.",
          "Supplier scorecards now include a blocked-delivery flag so operations teams can distinguish inventory issues from carrier-side delays.",
        ].map((copy) => (
          <StoryPanel key={copy} className="ui:space-y-3">
            <p className="ui:text-sm ui:font-semibold ui:text-foreground">
              Release summary
            </p>
            <TruncatedText
              as="p"
              lines={2}
              showTitleOnHover
              className="ui:text-sm ui:leading-6 ui:text-muted-foreground"
            >
              {copy}
            </TruncatedText>
          </StoryPanel>
        ))}
      </div>
    </StorySurface>
  ),
  parameters: { docs: { source: { code: multiLineSource } } },
};

export const WidthControlledNote: Story = {
  name: "Fixed Width Note",
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-3xl">
      <StoryPanel className="ui:flex ui:justify-center">
        <TruncatedText
          as="p"
          lines={3}
          width="16rem"
          showTitleOnHover
          className="ui:text-sm ui:leading-6 ui:text-muted-foreground"
        >
          Long-form operational notes can be clamped to a predictable block
          width so dense dashboards stay aligned even when individual records
          contain far more copy than the layout can comfortably hold.
        </TruncatedText>
      </StoryPanel>
    </StorySurface>
  ),
  parameters: { docs: { source: { code: widthControlledSource } } },
};

export const InlineMetadata: Story = {
  name: "Inline Metadata",
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-xl">
      <StoryPanel>
        <div className="ui:flex ui:items-center ui:gap-3">
          <span className="ui:text-xs ui:font-semibold ui:uppercase ui:tracking-[0.16em] ui:text-muted-foreground">
            Owner
          </span>
          <TruncatedText
            as="span"
            maxWidth="12rem"
            showTitleOnHover
            style={{ display: "inline-block" }}
            className="ui:text-sm ui:font-medium ui:text-foreground"
          >
            North American Distribution Enablement Team
          </TruncatedText>
        </div>
      </StoryPanel>
    </StorySurface>
  ),
  parameters: { docs: { source: { code: inlineSource } } },
};
