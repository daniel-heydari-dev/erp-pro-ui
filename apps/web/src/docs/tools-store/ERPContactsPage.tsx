import {
  DataTable,
  IncomeExpenseCard,
  StatCard,
  TopSellingItemsCard,
} from "erp-pro-ui";
import type {
  DataTableColumn,
  DataTableRowAction,
  IncomeExpenseDataPoint,
  TopSellingItem,
} from "erp-pro-ui";

// ── Types ──────────────────────────────────────────────────────────────────────

type ContactType = "customer" | "supplier" | "both";

interface Contact {
  id: string;
  name: string;
  type: ContactType;
  country: string;
  category: string;
  ar: number;    // accounts receivable (they owe us)
  ap: number;    // accounts payable (we owe them)
  lastActivity: string;
  status: "active" | "inactive";
}

// ── Mock data ──────────────────────────────────────────────────────────────────

const CONTACTS: Contact[] = [
  { id: "1",  name: "Müller Bau GmbH",        type: "customer",  country: "DE", category: "Construction",  ar: 8420.60, ap: 0,        lastActivity: "2025-05-17", status: "active"   },
  { id: "2",  name: "Bosch GmbH",              type: "supplier",  country: "DE", category: "Power Tools",   ar: 0,       ap: 7410.00,  lastActivity: "2025-05-16", status: "active"   },
  { id: "3",  name: "TechBuild Solutions",     type: "customer",  country: "AT", category: "Construction",  ar: 7364.00, ap: 0,        lastActivity: "2025-05-15", status: "active"   },
  { id: "4",  name: "Hilti AG",                type: "supplier",  country: "LI", category: "Power Tools",   ar: 0,       ap: 7456.00,  lastActivity: "2025-05-14", status: "active"   },
  { id: "5",  name: "Baumarkt Express",        type: "customer",  country: "DE", category: "Retail",        ar: 4427.10, ap: 0,        lastActivity: "2025-05-16", status: "active"   },
  { id: "6",  name: "Knipex GmbH",             type: "supplier",  country: "DE", category: "Hand Tools",    ar: 0,       ap: 4048.00,  lastActivity: "2025-05-13", status: "active"   },
  { id: "7",  name: "Stahl & Metall AG",        type: "customer",  country: "CH", category: "Manufacturing", ar: 4231.80, ap: 0,        lastActivity: "2025-05-12", status: "active"   },
  { id: "8",  name: "DeWalt Distribution",     type: "supplier",  country: "IE", category: "Power Tools",   ar: 0,       ap: 3064.00,  lastActivity: "2025-05-15", status: "active"   },
  { id: "9",  name: "Fischer Handwerk",        type: "customer",  country: "DE", category: "Trades",        ar: 2616.90, ap: 0,        lastActivity: "2025-05-15", status: "active"   },
  { id: "10", name: "Wera Tools",              type: "supplier",  country: "DE", category: "Hand Tools",    ar: 0,       ap: 3960.00,  lastActivity: "2025-05-13", status: "active"   },
  { id: "11", name: "KFZ-Werkstatt Vogel",     type: "customer",  country: "DE", category: "Automotive",    ar: 1876.45, ap: 0,        lastActivity: "2025-05-12", status: "active"   },
  { id: "12", name: "Makita Europe",           type: "supplier",  country: "NL", category: "Power Tools",   ar: 0,       ap: 5148.00,  lastActivity: "2025-05-10", status: "active"   },
  { id: "13", name: "Werkzeug Pro OHG",        type: "both",      country: "DE", category: "Wholesale",     ar: 1121.45, ap: 648.00,   lastActivity: "2025-05-16", status: "active"   },
  { id: "14", name: "Heizung & Sanitär KG",    type: "customer",  country: "DE", category: "Trades",        ar: 1124.75, ap: 0,        lastActivity: "2025-05-14", status: "active"   },
  { id: "15", name: "3M Europe",               type: "supplier",  country: "BE", category: "Accessories",   ar: 0,       ap: 1974.00,  lastActivity: "2025-05-12", status: "active"   },
  { id: "16", name: "Dachdecker Braun",        type: "customer",  country: "DE", category: "Trades",        ar: 2187.30, ap: 0,        lastActivity: "2025-05-13", status: "active"   },
  { id: "17", name: "Würth Group",             type: "supplier",  country: "DE", category: "Hardware",      ar: 0,       ap: 1608.00,  lastActivity: "2025-05-12", status: "active"   },
  { id: "18", name: "Schmidt Renovierung",     type: "customer",  country: "DE", category: "Trades",        ar: 437.80,  ap: 0,        lastActivity: "2025-05-17", status: "active"   },
  { id: "19", name: "Schreinerei Hofmann",     type: "customer",  country: "DE", category: "Carpentry",     ar: 0,       ap: 0,        lastActivity: "2025-05-11", status: "inactive" },
  { id: "20", name: "Fischer Group",           type: "supplier",  country: "DE", category: "Hardware",      ar: 0,       ap: 1072.00,  lastActivity: "2025-05-11", status: "active"   },
  { id: "21", name: "Weber Installationen",    type: "customer",  country: "DE", category: "Trades",        ar: 358.90,  ap: 0,        lastActivity: "2025-05-13", status: "active"   },
  { id: "22", name: "Elektro Maier",           type: "customer",  country: "DE", category: "Electrical",    ar: 2095.80, ap: 0,        lastActivity: "2025-05-14", status: "active"   },
  { id: "23", name: "Stanley Black&Decker",    type: "supplier",  country: "IE", category: "Hand Tools",    ar: 0,       ap: 1428.00,  lastActivity: "2025-05-10", status: "active"   },
  { id: "24", name: "Baumschulen Nord",        type: "customer",  country: "DE", category: "Landscaping",   ar: 0,       ap: 0,        lastActivity: "2025-05-10", status: "inactive" },
];

// ── Aggregates ────────────────────────────────────────────────────────────────

const totalAR      = CONTACTS.reduce((s, c) => s + c.ar, 0);
const totalAP      = CONTACTS.reduce((s, c) => s + c.ap, 0);
const netBalance   = totalAR - totalAP;
const activeCount  = CONTACTS.filter((c) => c.status === "active").length;
const customerCount = CONTACTS.filter((c) => c.type === "customer" || c.type === "both").length;
const supplierCount = CONTACTS.filter((c) => c.type === "supplier" || c.type === "both").length;

// ── AR/AP by category ─────────────────────────────────────────────────────────

const CAT_ORDER = ["Construction", "Trades", "Wholesale", "Power Tools", "Hand Tools", "Accessories", "Hardware"];
const CAT_SHORT: Record<string, string> = {
  Construction: "Const.", Trades: "Trades", Wholesale: "Whole.", "Power Tools": "Power",
  "Hand Tools": "Hand", Accessories: "Acc.", Hardware: "HW",
};

const arApData: IncomeExpenseDataPoint[] = CAT_ORDER.map((cat) => {
  const ar = CONTACTS.filter((c) => c.category === cat).reduce((s, c) => s + c.ar, 0);
  const ap = CONTACTS.filter((c) => c.category === cat).reduce((s, c) => s + c.ap, 0);
  return { month: CAT_SHORT[cat] ?? cat, income: Math.round(ar), expense: Math.round(ap) };
}).filter((d) => d.income > 0 || d.expense > 0);

// ── Top AR contacts ───────────────────────────────────────────────────────────

const TOP_AR: TopSellingItem[] = [...CONTACTS]
  .filter((c) => c.ar > 0)
  .sort((a, b) => b.ar - a.ar)
  .slice(0, 8)
  .map((c) => ({
    id: c.id,
    name: c.name,
    category: c.category,
    qty: 0,
    revenue: Math.round(c.ar),
  }));

// ── Columns ───────────────────────────────────────────────────────────────────

const TYPE_LABEL: Record<ContactType, string>  = { customer: "Customer", supplier: "Supplier", both: "Both" };
const TYPE_CLS:   Record<ContactType, string>  = {
  customer: "bg-blue-100  text-blue-700  dark:bg-blue-900/30  dark:text-blue-400",
  supplier: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  both:     "bg-amber-100 text-amber-700  dark:bg-amber-900/30  dark:text-amber-400",
};
const moneyFmt = (v: number) => v > 0 ? `€${v.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—";

const COLUMNS: DataTableColumn<Contact>[] = [
  {
    id: "name", label: "Contact",
    renderCell: ({ row }) => (
      <div>
        <p className="font-semibold text-sm text-ds-1">{row.name}</p>
        <p className="text-[11px] text-ds-3">{row.category} · {row.country}</p>
      </div>
    ),
  },
  {
    id: "type", label: "Type",
    filterable: true,
    renderCell: ({ row }) => (
      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${TYPE_CLS[row.type]}`}>
        {TYPE_LABEL[row.type]}
      </span>
    ),
  },
  {
    id: "ar", label: "Receivable (AR)",
    renderCell: ({ row }) => (
      <span className={`text-sm font-semibold ${row.ar > 0 ? "text-green-600 dark:text-green-400" : "text-ds-3"}`}>
        {moneyFmt(row.ar)}
      </span>
    ),
  },
  {
    id: "ap", label: "Payable (AP)",
    renderCell: ({ row }) => (
      <span className={`text-sm font-semibold ${row.ap > 0 ? "text-red-500 dark:text-red-400" : "text-ds-3"}`}>
        {moneyFmt(row.ap)}
      </span>
    ),
  },
  {
    id: "net", label: "Net Balance",
    renderCell: ({ row }) => {
      const net = row.ar - row.ap;
      return (
        <span className={`text-sm font-bold ${net > 0 ? "text-green-600 dark:text-green-400" : net < 0 ? "text-red-500 dark:text-red-400" : "text-ds-3"}`}>
          {net === 0 ? "—" : `${net > 0 ? "+" : ""}€${Math.abs(net).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        </span>
      );
    },
  },
  {
    id: "lastActivity", label: "Last Activity",
    renderCell: ({ row }) => <span className="text-sm text-ds-2">{row.lastActivity}</span>,
  },
  {
    id: "status", label: "Status",
    filterable: true,
    renderCell: ({ row }) => (
      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${row.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-ds-surface-2 text-ds-3"}`}>
        {row.status === "active" ? "Active" : "Inactive"}
      </span>
    ),
  },
];

const ROW_ACTIONS: DataTableRowAction<Contact>[] = [
  { id: "view",     label: "View contact"    },
  { id: "statement",label: "Account statement" },
  { id: "delete",   label: "Delete", variant: "destructive" },
];

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ERPContactsPage() {
  const netColor = netBalance >= 0 ? "#22c55e" : "#ef4444";

  return (
    <div className="space-y-5 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-ds-1">Contacts</h1>
        <p className="mt-1 text-sm text-ds-3">
          Customers, suppliers &amp; account balances · {activeCount} active contacts
        </p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard size="sm" title="Receivable (AR)"  value={`€${Math.round(totalAR / 1_000)}K`}    dateRange="outstanding"    badge={{ value: "+8.4%", direction: "up"   }} />
        <StatCard size="sm" title="Payable (AP)"     value={`€${Math.round(totalAP / 1_000)}K`}    dateRange="outstanding"    badge={{ value: "+3.1%", direction: "up"   }} />
        <StatCard
          size="sm"
          title="Net Balance"
          value={`${netBalance >= 0 ? "+" : ""}€${Math.round(Math.abs(netBalance) / 1_000)}K`}
          dateRange="AR minus AP"
          badge={{ value: netBalance >= 0 ? "Positive" : "Negative", direction: netBalance >= 0 ? "up" : "down" }}
        />
        <StatCard size="sm" title="Contacts"         value={`${customerCount}C / ${supplierCount}S`} dateRange="customers / suppliers" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <IncomeExpenseCard
            title="AR vs AP by Category"
            totalIncome={`€${Math.round(totalAR / 1_000)}K`}
            totalExpenses={`€${Math.round(totalAP / 1_000)}K`}
            incomeBadge={{ value: "+8.4%", direction: "up" }}
            expensesBadge={{ value: "+3.1%", direction: "up" }}
            data={arApData}
            periods={["Current"]}
            defaultPeriod="Current"
          />
        </div>
        <TopSellingItemsCard
          title="Top Receivables"
          subtitle="Contacts with highest AR balance"
          items={TOP_AR}
          showTrend={false}
          defaultMetric="revenue"
          labels={{ byRevenueLabel: "By AR Balance", byQtyLabel: "By Orders" }}
        />
      </div>

      {/* Contacts table */}
      <DataTable<Contact>
        columns={COLUMNS}
        data={CONTACTS}
        pageSize={10}
        rowActions={ROW_ACTIONS}
        showExportButton
        showRefreshButton
      />
    </div>
  );
}
