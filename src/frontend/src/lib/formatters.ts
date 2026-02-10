import { RiskTag } from '../backend';

export function formatCurrency(amount: bigint | number): string {
  const numAmount = typeof amount === 'bigint' ? Number(amount) : amount;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numAmount);
}

export function formatCouponRate(rate: number): string {
  return `${(rate / 100).toFixed(2)}%`;
}

export function formatTenure(months: bigint | number): string {
  const numMonths = typeof months === 'bigint' ? Number(months) : months;
  if (numMonths < 12) {
    return `${numMonths} month${numMonths !== 1 ? 's' : ''}`;
  }
  const years = Math.floor(numMonths / 12);
  const remainingMonths = numMonths % 12;
  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  }
  return `${years}y ${remainingMonths}m`;
}

export function formatDate(timestamp: bigint): string {
  const date = new Date(Number(timestamp) / 1_000_000);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function formatDateTime(timestamp: bigint): string {
  const date = new Date(Number(timestamp) / 1_000_000);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function getRatingColor(rating: number): string {
  const char = String.fromCharCode(rating);
  if (char === 'A') return 'text-green-600 dark:text-green-400';
  if (char === 'B') return 'text-blue-600 dark:text-blue-400';
  if (char === 'C') return 'text-yellow-600 dark:text-yellow-400';
  return 'text-muted-foreground';
}

export function getRiskTagLabel(tag: RiskTag): string {
  const labels: Record<RiskTag, string> = {
    [RiskTag.secured]: 'Secured',
    [RiskTag.unsecured]: 'Unsecured',
    [RiskTag.seniorSecured]: 'Senior Secured',
    [RiskTag.securedByMovableAssets]: 'Asset-Backed',
  };
  return labels[tag] || String(tag);
}
