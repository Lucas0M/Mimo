export interface TimelineItem {
  id: string;
  capsuleId: string;
  imageUrl: string;
  caption: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export type CapsuleStatus = "DRAFT" | "PENDING_PAYMENT" | "ACTIVE" | "ARCHIVED";

export interface Capsule {
  id: string;
  title: string;
  slug: string;
  status: CapsuleStatus;
  recipientName: string | null;
  occasion: string | null;
  songUrl: string | null;
  songFileUrl: string | null; // <- adicionar essa linha
  letter: string;
  createdAt: string;
  updatedAt: string;
  timelineItems: TimelineItem[];
  editToken?: string;
}

export type CheckoutSessionStatus = "PENDING" | "PAID" | "CANCELED" | "EXPIRED";

export interface CheckoutSession {
  id: string;
  capsuleId: string;
  provider: string;
  status: CheckoutSessionStatus;
  providerChargeId: string | null;
  pixQrCode: string | null;
  pixCopyPaste: string | null;
  amount: number;
  currency: string;
  expiresAt: string | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCapsuleInput {
  title: string;
  recipientName?: string;
  occasion?: string;
  songUrl?: string;
  letter: string;
}
