import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { buildNextFollowUpDate, type InquiryLeadPayload, type StoredInquiryLead } from "./types";

const DATA_DIR = path.join(process.cwd(), "data", "inquiries");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

async function ensureStore() {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(LEADS_FILE, "utf8");
  } catch {
    await writeFile(LEADS_FILE, "[]\n", "utf8");
  }
}

export async function readInquiryLeads(): Promise<StoredInquiryLead[]> {
  await ensureStore();
  const raw = await readFile(LEADS_FILE, "utf8");
  return JSON.parse(raw) as StoredInquiryLead[];
}

export async function appendInquiryLead(payload: InquiryLeadPayload): Promise<StoredInquiryLead> {
  await ensureStore();
  const leads = await readInquiryLeads();
  const createdAt = new Date().toISOString();
  const lead: StoredInquiryLead = {
    ...payload,
    id: `inq_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    createdAt,
    nextFollowUpDate: buildNextFollowUpDate(new Date(createdAt)),
    status: "New",
  };
  leads.push(lead);
  await writeFile(LEADS_FILE, `${JSON.stringify(leads, null, 2)}\n`, "utf8");
  return lead;
}

export async function markInquiryWebhookSynced(id: string): Promise<void> {
  await ensureStore();
  const leads = await readInquiryLeads();
  const index = leads.findIndex((lead) => lead.id === id);
  if (index === -1) return;
  leads[index] = { ...leads[index], status: "synced" };
  await writeFile(LEADS_FILE, `${JSON.stringify(leads, null, 2)}\n`, "utf8");
}

export async function markInquiryWebhookFailed(id: string): Promise<void> {
  await ensureStore();
  const leads = await readInquiryLeads();
  const index = leads.findIndex((lead) => lead.id === id);
  if (index === -1) return;
  leads[index] = { ...leads[index], status: "webhook_failed" };
  await writeFile(LEADS_FILE, `${JSON.stringify(leads, null, 2)}\n`, "utf8");
}
