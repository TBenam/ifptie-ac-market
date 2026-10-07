/**
 * Format a number as FCFA currency string
 * e.g. 48500 -> "48 500 FCFA"
 */
export function formatFCFA(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '0 FCFA';
  }
  return new Intl.NumberFormat('fr-FR').format(Math.round(amount)) + ' FCFA';
}

/**
 * Calculate discount percentage
 */
export function getDiscountPercentage(price: number, originalPrice?: number): number | null {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/**
 * Generate a pre-filled WhatsApp direct ordering URL
 */
export function generateWhatsAppOrderUrl(params: {
  productName?: string;
  price?: number;
  quantity?: number;
  customerName?: string;
  city?: string;
  neighborhood?: string;
  orderNumber?: string;
}): string {
  // Official IFPTIE Market WhatsApp Line (+237 Cameroon)
  const phone = '237699000000'; // Target Cameroon support number

  let message = `Bonjour IFPTIE Market ! 👋\n`;
  if (params.orderNumber) {
    message += `Je souhaite finaliser ma commande *#${params.orderNumber}* :\n`;
  } else if (params.productName) {
    message += `Je souhaite commander :\n`;
    message += `📦 *${params.productName}*\n`;
    if (params.price) message += `💰 Prix : *${formatFCFA(params.price)}*\n`;
    if (params.quantity) message += `🔢 Quantité : *${params.quantity}*\n`;
  }

  if (params.customerName) message += `👤 Nom : ${params.customerName}\n`;
  if (params.city) message += `📍 Ville : ${params.city} (${params.neighborhood || 'Centre'})\n`;
  
  message += `\nMerci de me confirmer la disponibilité et le délai de livraison !`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
