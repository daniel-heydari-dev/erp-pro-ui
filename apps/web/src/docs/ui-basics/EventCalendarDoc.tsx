import { EventCalendar } from "erp-pro-ui";
import type { CalendarEvent } from "erp-pro-ui";
import CodeBlock from "@/docs/components/CodeBlock";
import DocsButtonBar from "@/docs/components/DocsButtonBar";

// ── Sample events ─────────────────────────────────────────────────────────────

const sampleEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Design Review",
    start: new Date(2026, 4, 5, 23, 35),
    end: new Date(2026, 4, 6, 23, 35),
    allDay: false,
    label: "business",
  },
  {
    id: "2",
    title: "Dart Game?",
    start: new Date(2026, 4, 18),
    end: new Date(2026, 4, 18, 23, 59, 59),
    allDay: true,
    label: "etc",
  },
  {
    id: "3",
    title: "Dinner",
    start: new Date(2026, 4, 18),
    end: new Date(2026, 4, 18, 23, 59, 59),
    allDay: true,
    label: "family",
  },
  {
    id: "4",
    title: "Meditation",
    start: new Date(2026, 4, 18),
    end: new Date(2026, 4, 18, 23, 59, 59),
    allDay: true,
    label: "personal",
  },
  {
    id: "5",
    title: "Product Review",
    start: new Date(2026, 4, 18),
    end: new Date(2026, 4, 18, 23, 59, 59),
    allDay: true,
    label: "business",
  },
  {
    id: "6",
    title: "Doctor's Appointment",
    start: new Date(2026, 4, 20),
    end: new Date(2026, 4, 20, 23, 59, 59),
    allDay: true,
    label: "personal",
  },
  {
    id: "7",
    title: "Meeting With Client",
    start: new Date(2026, 4, 20),
    end: new Date(2026, 4, 20, 23, 59, 59),
    allDay: true,
    label: "business",
  },
  {
    id: "8",
    title: "Family Trip",
    start: new Date(2026, 4, 22),
    end: new Date(2026, 4, 23, 23, 59, 59),
    allDay: true,
    label: "holiday",
  },
  {
    id: "9",
    title: "Monthly Meeting",
    start: new Date(2026, 4, 31),
    end: new Date(2026, 4, 31, 23, 59, 59),
    allDay: true,
    label: "business",
  },
];

// ── Doc page ──────────────────────────────────────────────────────────────────

const EventCalendarDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Event Calendar</h1>
      <p className="docs-paragraph">
        A full-featured calendar for managing daily work and personal events.
        Supports four views — Month, Week, Day, and List — with category-based
        event filters, a mini navigation calendar in the sidebar, and an Add
        Event panel with a rich form.
      </p>

      {/* ── Live demo ─────────────────────────────────────────────────────── */}
      <h2 className="docs-category-subtitle">Default (Month view)</h2>
      <p className="docs-paragraph">
        Pass <code>initialEvents</code> to pre-populate the calendar. The
        component manages its own state internally — use <code>onEventAdd</code>{" "}
        to sync new events back to your data layer.
      </p>

      <div className="h-[680px] w-full overflow-hidden rounded-xl border border-ds-border-3">
        <EventCalendar
          initialEvents={sampleEvents}
          initialDate={new Date(2026, 4, 6)}
        />
      </div>

      <CodeBlock
        code={`import { EventCalendar } from 'erp-pro-ui';
import type { CalendarEvent } from 'erp-pro-ui';

const events: CalendarEvent[] = [
  {
    id: '1',
    title: 'Design Review',
    start: new Date(2026, 4, 5, 23, 35),
    end: new Date(2026, 4, 6, 23, 35),
    allDay: false,
    label: 'business',
  },
  // ...more events
];

export function MyCalendar() {
  return (
    <div style={{ height: 680 }}>
      <EventCalendar
        initialEvents={events}
        onEventAdd={(event) => console.log('Added:', event)}
      />
    </div>
  );
}`}
      />

      {/* ── Props ─────────────────────────────────────────────────────────── */}
      <h2 className="docs-category-subtitle">EventCalendar Props</h2>
      <div className="docs-props-table-wrapper">
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
              <td>initialEvents</td>
              <td>CalendarEvent[]</td>
              <td>[]</td>
              <td>Pre-populated event list.</td>
            </tr>
            <tr>
              <td>initialView</td>
              <td>"month" | "week" | "day" | "list"</td>
              <td>"month"</td>
              <td>Which view to open first.</td>
            </tr>
            <tr>
              <td>initialDate</td>
              <td>Date</td>
              <td>today</td>
              <td>The date the calendar focuses on initially.</td>
            </tr>
            <tr>
              <td>onEventAdd</td>
              <td>(event: CalendarEvent) =&gt; void</td>
              <td>—</td>
              <td>Called after the user submits the Add Event form.</td>
            </tr>
            <tr>
              <td>onEventUpdate</td>
              <td>(event: CalendarEvent) =&gt; void</td>
              <td>—</td>
              <td>Called when an event is updated.</td>
            </tr>
            <tr>
              <td>onEventDelete</td>
              <td>(id: string) =&gt; void</td>
              <td>—</td>
              <td>Called when an event is deleted.</td>
            </tr>
            <tr>
              <td>className</td>
              <td>string</td>
              <td>—</td>
              <td>Extra classes on the root container.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── CalendarEvent type ────────────────────────────────────────────── */}
      <h2 className="docs-category-subtitle">CalendarEvent type</h2>
      <CodeBlock
        code={`interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  label: 'personal' | 'business' | 'family' | 'holiday' | 'etc';
  url?: string;
  guests?: string;
  location?: string;
  description?: string;
}`}
      />

      <DocsButtonBar
        previous={{ route: "/ui-basics/dashboard-cards", label: "Dashboard Cards" }}
      />
    </section>
  );
};

export default EventCalendarDoc;
