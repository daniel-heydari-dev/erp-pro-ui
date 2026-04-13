import { TruncatedText } from "erp-pro-ui";

import CodeBlock from "@/docs/components/CodeBlock";
import DocsButtonBar from "@/docs/components/DocsButtonBar";

const TruncatedTextDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Truncated Text</h1>
      <p className="docs-paragraph">
        TruncatedText is a reusable text utility for clamping long content with
        an ellipsis. Use it when file names, record titles, card summaries, or
        dense metadata rows need a predictable visual limit.
      </p>

      <h2 className="docs-category-subtitle">Single-Line File Names</h2>
      <p className="docs-paragraph mb-4">
        The default behavior clamps to one line, making it a good fit for table
        cells, attachments, and inline labels.
      </p>

      <div className="docs-showcase-card">
        <div className="grid w-full gap-4 md:grid-cols-3">
          {[
            "Q4-enterprise-expansion-forecast-final-approved-v12.pdf",
            "receiving-audit-followup-supplier-notes-march-2026.docx",
            "warehouse-transfer-exception-log-priority.csv",
          ].map((label) => (
            <div
              key={label}
              className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Attachment
              </p>
              <TruncatedText
                maxWidth="18rem"
                showTitleOnHover
                className="text-sm font-medium text-neutral-900 dark:text-white"
              >
                {label}
              </TruncatedText>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock
        code={`import { TruncatedText } from 'erp-pro-ui';

export function SingleLineFileNameExample() {
  return (
    <TruncatedText maxWidth="18rem" showTitleOnHover>
      Q4-enterprise-expansion-forecast-final-approved-v12.pdf
    </TruncatedText>
  );
}`}
      />

      <h2 className="docs-category-subtitle">Multi-Line Summaries</h2>
      <p className="docs-paragraph mb-4">
        Increase the visible line count for card descriptions and activity
        summaries while preserving a clean grid.
      </p>

      <div className="docs-showcase-card">
        <div className="grid w-full gap-4 md:grid-cols-3">
          {[
            "This quarter's rollout note includes transfer visibility updates, approval routing refinements, and a new fallback sync path for delayed warehouse reconciliations.",
            "Regional warehouse staffing changed mid-cycle, so throughput forecasts should be interpreted alongside the revised dock allocation model.",
            "Supplier scorecards now include a blocked-delivery flag so operations teams can distinguish inventory issues from carrier-side delays.",
          ].map((copy) => (
            <div
              key={copy}
              className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <p className="mb-3 text-sm font-semibold text-neutral-900 dark:text-white">
                Release summary
              </p>
              <TruncatedText
                as="p"
                lines={2}
                maxWidth="22rem"
                showTitleOnHover
                className="text-sm leading-6 text-neutral-600 dark:text-neutral-300"
              >
                {copy}
              </TruncatedText>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock
        code={`import { TruncatedText } from 'erp-pro-ui';

export function MultiLineSummaryExample() {
  return (
    <TruncatedText as="p" lines={2} maxWidth="22rem" showTitleOnHover>
      This quarter's rollout note includes transfer visibility updates, approval routing refinements, and a new fallback sync path for delayed warehouse reconciliations.
    </TruncatedText>
  );
}`}
      />

      <h2 className="docs-category-subtitle">Width-Controlled Blocks</h2>
      <p className="docs-paragraph mb-4">
        Use a fixed width when cards or side panels need consistent text blocks
        regardless of content length.
      </p>

      <div className="docs-showcase-card">
        <div className="flex w-full justify-center">
          <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
              Audit note
            </p>
            <TruncatedText
              as="p"
              lines={3}
              width="16rem"
              showTitleOnHover
              className="text-sm leading-6 text-neutral-600 dark:text-neutral-300"
            >
              Long-form operational notes can be clamped to a predictable block
              width so dense dashboards stay aligned even when individual
              records contain far more copy than the layout can comfortably
              hold.
            </TruncatedText>
          </div>
        </div>
      </div>

      <CodeBlock
        code={`import { TruncatedText } from 'erp-pro-ui';

export function WidthControlledNoteExample() {
  return (
    <TruncatedText as="p" lines={3} width="16rem" showTitleOnHover>
      Long-form operational notes can be clamped to a predictable block width so dense dashboards stay aligned even when individual records contain far more copy than the layout can comfortably hold.
    </TruncatedText>
  );
}`}
      />

      <h2 className="docs-category-subtitle">Inline Metadata</h2>
      <p className="docs-paragraph mb-4">
        You can also render TruncatedText as a custom element when the layout is
        part of a richer inline row.
      </p>

      <div className="docs-showcase-card">
        <div className="flex w-full max-w-xl items-center gap-3 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Owner
          </span>
          <TruncatedText
            as="span"
            maxWidth="12rem"
            showTitleOnHover
            style={{ display: "inline-block" }}
            className="text-sm font-medium text-neutral-900 dark:text-white"
          >
            North American Distribution Enablement Team
          </TruncatedText>
        </div>
      </div>

      <CodeBlock
        code={`import { TruncatedText } from 'erp-pro-ui';

export function InlineMetaExample() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ds-2">
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
}`}
      />

      <h2 className="docs-category-subtitle">Core Props</h2>
      <div className="overflow-x-auto">
        <table className="docs-props-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="docs-prop-name">children</td>
              <td>
                <span className="docs-prop-type">ReactNode</span>
              </td>
              <td>-</td>
              <td>The text or inline content to clamp.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">lines</td>
              <td>
                <span className="docs-prop-type">number</span>
              </td>
              <td>1</td>
              <td>
                Controls how many visible lines render before the ellipsis
                appears.
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">width / maxWidth</td>
              <td>
                <span className="docs-prop-type">string | number</span>
              </td>
              <td>-</td>
              <td>
                Sets a fixed or maximum width for the truncation container.
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">as</td>
              <td>
                <span className="docs-prop-type">ElementType</span>
              </td>
              <td>'span'</td>
              <td>
                Lets you render the component as a different HTML element.
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">showTitleOnHover</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>false</td>
              <td>
                Adds the full text as a native title attribute when possible.
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">...HTMLAttributes</td>
              <td>
                <span className="docs-prop-type">HTMLElement props</span>
              </td>
              <td>-</td>
              <td>
                Supports standard DOM props such as <code>className</code>,{" "}
                <code>style</code>, and <code>title</code>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Typography", route: "/ui-basics/typography" }}
        next={{ label: "Search", route: "/ui-basics/search" }}
      />
    </section>
  );
};

export default TruncatedTextDoc;
