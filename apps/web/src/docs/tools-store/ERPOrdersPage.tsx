import {
  BarBreakdownCard,
  CustomerLifecycleCard,
  DataTable,
  StatCard,
} from "erp-pro-ui";
import type {
  BarBreakdownCategory,
  BarBreakdownDataPoint,
  CustomerLifecycleDataPoint,
  CustomerLifecycleMetric,
  DataTableColumn,
  DataTableRowAction,
} from "erp-pro-ui";

// ── Types ──────────────────────────────────────────────────────────────────────

interface VendorInvoice {
  id: string;
  invoiceNo: string;
  datePlaced: string;
  dueDate: string;
  vendor: string;
  category: string;
  lineItems: number;
  totalValue: number;
  status: "draft" | "approved" | "processing" | "paid" | "overdue";
}

// ── Mock data ──────────────────────────────────────────────────────────────────

const INVOICES: VendorInvoice[] = [
  { id: "1",  invoiceNo: "INV-2025-0041", datePlaced: "2025-05-16", dueDate: "2025-05-30", vendor: "Amazon Web Services",  category: "Infrastructure",   lineItems: 12, totalValue: 18420.00, status: "processing" },
  { id: "2",  invoiceNo: "INV-2025-0040", datePlaced: "2025-05-15", dueDate: "2025-05-29", vendor: "Stripe",               category: "Payments",          lineItems: 1,  totalValue: 2188.00,  status: "paid"       },
  { id: "3",  invoiceNo: "INV-2025-0039", datePlaced: "2025-05-14", dueDate: "2025-05-28", vendor: "Google Cloud",         category: "Infrastructure",   lineItems: 8,  totalValue: 6240.00,  status: "approved"   },
  { id: "4",  invoiceNo: "INV-2025-0038", datePlaced: "2025-05-13", dueDate: "2025-05-27", vendor: "Twilio",               category: "Communications",    lineItems: 3,  totalValue: 1840.00,  status: "paid"       },
  { id: "5",  invoiceNo: "INV-2025-0037", datePlaced: "2025-05-13", dueDate: "2025-05-27", vendor: "HubSpot",              category: "Marketing",         lineItems: 2,  totalValue: 3960.00,  status: "paid"       },
  { id: "6",  invoiceNo: "INV-2025-0036", datePlaced: "2025-05-12", dueDate: "2025-05-26", vendor: "OpenAI",               category: "AI / ML",           lineItems: 1,  totalValue: 8240.00,  status: "paid"       },
  { id: "7",  invoiceNo: "INV-2025-0035", datePlaced: "2025-05-12", dueDate: "2025-05-31", vendor: "GitHub",               category: "Dev Tools",         lineItems: 4,  totalValue: 648.00,   status: "approved"   },
  { id: "8",  invoiceNo: "INV-2025-0034", datePlaced: "2025-05-11", dueDate: "2025-05-25", vendor: "Cloudflare",           category: "Infrastructure",   lineItems: 2,  totalValue: 412.00,   status: "paid"       },
  { id: "9",  invoiceNo: "INV-2025-0033", datePlaced: "2025-05-10", dueDate: "2025-05-24", vendor: "Intercom",             category: "Support",           lineItems: 1,  totalValue: 2860.00,  status: "paid"       },
  { id: "10", invoiceNo: "INV-2025-0032", datePlaced: "2025-05-10", dueDate: "2025-05-24", vendor: "Datadog",              category: "Observability",     lineItems: 3,  totalValue: 4280.00,  status: "paid"       },
  { id: "11", invoiceNo: "INV-2025-0031", datePlaced: "2025-05-09", dueDate: "2025-05-23", vendor: "SendGrid",             category: "Communications",    lineItems: 1,  totalValue: 1184.00,  status: "paid"       },
  { id: "12", invoiceNo: "INV-2025-0030", datePlaced: "2025-05-08", dueDate: "2025-05-22", vendor: "Amazon Web Services",  category: "Infrastructure",   lineItems: 10, totalValue: 16390.00, status: "paid"       },
  { id: "13", invoiceNo: "INV-2025-0029", datePlaced: "2025-05-07", dueDate: "2025-05-21", vendor: "Linear",               category: "Dev Tools",         lineItems: 1,  totalValue: 480.00,   status: "paid"       },
  { id: "14", invoiceNo: "INV-2025-0028", datePlaced: "2025-05-06", dueDate: "2025-05-20", vendor: "Mixpanel",             category: "Analytics",         lineItems: 1,  totalValue: 1050.00,  status: "paid"       },
  { id: "15", invoiceNo: "INV-2025-0027", datePlaced: "2025-05-05", dueDate: "2025-06-05", vendor: "Google Cloud",         category: "Infrastructure",   lineItems: 6,  totalValue: 5120.00,  status: "processing" },
  { id: "16", invoiceNo: "INV-2025-0026", datePlaced: "2025-05-17", dueDate: "2025-06-17", vendor: "Slack",                category: "Communications",    lineItems: 1,  totalValue: 2208.00,  status: "draft"      },
  { id: "17", invoiceNo: "INV-2025-0025", datePlaced: "2025-05-17", dueDate: "2025-06-17", vendor: "Figma",                category: "Dev Tools",         lineItems: 1,  totalValue: 2200.00,  status: "draft"      },
  { id: "18", invoiceNo: "INV-2025-0024", datePlaced: "2025-04-28", dueDate: "2025-05-12", vendor: "HubSpot",              category: "Marketing",         lineItems: 2,  totalValue: 3960.00,  status: "overdue"    },
  { id: "19", invoiceNo: "INV-2025-0023", datePlaced: "2025-05-02", dueDate: "2025-05-16", vendor: "Stripe",               category: "Payments",          lineItems: 1,  totalValue: 2288.00,  status: "paid"       },
  { id: "20", invoiceNo: "INV-2025-0022", datePlaced: "2025-05-01", dueDate: "2025-05-15", vendor: "OpenAI",               category: "AI / ML",           lineItems: 1,  totalValue: 7640.00,  status: "paid"       },
];

// ── Bar chart data (billed vs paid by category) ───────────────────────────────

const BAR_CATS: BarBreakdownCategory[] = [
  { key: "billed", label: "Billed",  color: "#6366f1" },
  { key: "paid",   label: "Paid",    color: "#22c55e" },
];

const CAT_ORDER = ["Infrastructure", "AI / ML", "Marketing", "Payments", "Communications", "Dev Tools"];
const CAT_SHORT: Record<string, string> = {
  "Infrastructure": "Infra", "AI / ML": "AI", "Marketing": "Mktg",
  "Payments": "Pay", "Communications": "Comm", "Dev Tools": "Dev",
};

const BAR_DATA: BarBreakdownDataPoint[] = CAT_ORDER.map((cat) => {
  const catInvoices = INVOICES.filter((i) => i.category === cat);
  const billed = catInvoices.reduce((s, i) => s + i.totalValue, 0);
  const paid   = INVOICES.filter((i) => i.category === cat && i.status === "paid").reduce((s, i) => s + i.totalValue, 0);
  return { name: CAT_SHORT[cat] ?? cat, billed: Math.round(billed), paid: Math.round(paid) };
});

// ── Customer lifecycle data ────────────────────────────────────────────────────

const LIFECYCLE_DATA: CustomerLifecycleDataPoint[] = [
  { label: "Jan", trials: 180, converted: 62,  churned: 8  },
  { label: "Feb", trials: 210, converted: 78,  churned: 11 },
  { label: "Mar", trials: 248, converted: 94,  churned: 9  },
  { label: "Apr", trials: 291, converted: 118, churned: 7  },
  { label: "May", trials: 340, converted: 143, churned: 6  },
];

const LIFECYCLE_METRICS: CustomerLifecycleMetric[] = [
  { label: "Trials",     value: 340, change: 16.8,  color: "#4F46E5" },
  { label: "Converted",  value: 143, change: 21.2,  color: "#10B981" },
  { label: "Churned",    value: 6,   change: -14.3, color: "#EF4444" },
  { label: "Conv. Rate", value: 42,  change: 1.8,   color: "#F59E0B" },
];

// ── Derived KPIs ──────────────────────────────────────────────────────────────

const totalBilled   = INVOICES.filter((i) => i.status !== "draft").reduce((s, i) => s + i.totalValue, 0);
const totalPaid     = INVOICES.filter((i) => i.status === "paid").reduce((s, i) => s + i.totalValue, 0);
const pendingCount  = INVOICES.filter((i) => i.status === "approved" || i.status === "processing").length;
const overdueCount  = INVOICES.filter((i) => i.status === "overdue").length;

// ── Columns ───────────────────────────────────────────────────────────────────

const STATUS_LABEL: Record<VendorInvoice["status"], string> = {
  draft: "Draft", approved: "Approved", processing: "Processing", paid: "Paid", overdue: "Overdue",
};
const STATUS_CLS: Record<VendorInvoice["status"], string> = {
  draft:      "bg-ds-surface-2 text-ds-3",
  approved:   "bg-blue-100   text-blue-700   dark:bg-blue-900/30   dark:text-blue-400",
  processing: "bg-amber-100  text-amber-700  dark:bg-amber-900/30  dark:text-amber-400",
  paid:       "bg-green-100  text-green-700  dark:bg-green-900/30  dark:text-green-400",
  overdue:    "bg-red-100    text-red-700    dark:bg-red-900/30    dark:text-red-400",
};

const fmtCost = (v: number) =>
  `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const COLUMNS: DataTableColumn<VendorInvoice>[] = [
  {
    id: "invoiceNo", label: "Invoice",
    renderCell: ({ row }) => <span className="font-mono text-xs font-semibold text-ds-1">{row.invoiceNo}</span>,
  },
  {
    id: "datePlaced", label: "Issued",
    renderCell: ({ row }) => <span className="text-sm text-ds-2">{row.datePlaced}</span>,
  },
  {
    id: "vendor", label: "Vendor",
    renderCell: ({ row }) => (
      <div>
        <p className="text-sm font-medium text-ds-1">{row.vendor}</p>
        <p className="text-[11px] text-ds-3">{row.category}</p>
      </div>
    ),
  },
  {
    id: "lineItems", label: "Lines",
    renderCell: ({ row }) => <span className="text-sm text-ds-3">{row.lineItems}</span>,
  },
  {
    id: "totalValue", label: "Amount",
    renderCell: ({ row }) => <span className="text-sm font-bold text-ds-1">{fmtCost(row.totalValue)}</span>,
  },
  {
    id: "dueDate", label: "Due",
    renderCell: ({ row }) => <span className="text-sm text-ds-2">{row.dueDate}</span>,
  },
  {
    id: "status", label: "Status",
    filterable: true,
    renderCell: ({ row }) => (
      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${STATUS_CLS[row.status]}`}>
        {STATUS_LABEL[row.status]}
      </span>
    ),
  },
];

const ROW_ACTIONS: DataTableRowAction<VendorInvoice>[] = [
  { id: "view",    label: "View invoice"        },
  { id: "approve", label: "Approve"             },
  { id: "dispute", label: "Dispute", variant: "destructive" },
];

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ERPOrdersPage() {
  return (
    <div className="space-y-5 p-6">
      <div>
        <h1 className="text-2xl font-bold text-ds-1">Vendor Costs</h1>
        <p className="mt-1 text-sm text-ds-3">
          Cloud &amp; software vendor invoices · {pendingCount} pending approval{overdueCount > 0 ? `, ${overdueCount} overdue` : ""}
        </p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard size="sm" title="Total Billed"  value={`$${Math.round(totalBilled / 1_000)}K`}  dateRange="active invoices"    badge={{ value: "+9.2%",  direction: "up"   }} />
        <StatCard size="sm" title="Paid"          value={`$${Math.round(totalPaid / 1_000)}K`}    dateRange="confirmed payments"  badge={{ value: "+6.8%",  direction: "up"   }} />
        <StatCard size="sm" title="Pending"       value={String(pendingCount)}                     dateRange="approval + processing" />
        <StatCard size="sm" title="Overdue"       value={String(overdueCount)}                     dateRange="past due date"       badge={overdueCount > 0 ? { value: "action needed", direction: "down" } : undefined} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BarBreakdownCard
            title="Billed vs Paid by Category"
            variant="full"
            headlines={[
              { label: "Total Billed",   value: `$${Math.round(totalBilled / 1_000)}K`  },
              { label: "Total Paid",     value: `$${Math.round(totalPaid / 1_000)}K`    },
            ]}
            metrics={[
              { label: "Outstanding", primary: `$${Math.round((totalBilled - totalPaid) / 1_000)}K` },
              { label: "Drafts",      primary: String(INVOICES.filter((i) => i.status === "draft").length) },
            ]}
            categories={BAR_CATS}
            data={BAR_DATA}
            periods={["This Month"]}
            defaultPeriod="This Month"
          />
        </div>
        <CustomerLifecycleCard
          title="Customer Lifecycle"
          data={{ "this-month": LIFECYCLE_DATA }}
          metrics={LIFECYCLE_METRICS}
          defaultPeriod="this-month"
        />
      </div>

      {/* Invoices table */}
      <DataTable<VendorInvoice>
        columns={COLUMNS}
        data={INVOICES}
        pageSize={10}
        rowActions={ROW_ACTIONS}
        showExportButton
        showRefreshButton
      />
    </div>
  );
}
