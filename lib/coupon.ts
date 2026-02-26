export function calculateCoupon(subtotal: number, code?: string): { discount: number; appliedCode: string | null } {
    if (!code) {
        return { discount: 0, appliedCode: null };
    }

    const normalizedCode = code.trim().toUpperCase();

    // As per requirement: Kupon FROZEN10, 10% disc, max Rp20.000
    if (normalizedCode === 'FROZEN10') {
        const discountAmount = subtotal * 0.1;
        const finalDiscount = Math.min(discountAmount, 20000); // max 20k
        return { discount: finalDiscount, appliedCode: normalizedCode };
    }

    return { discount: 0, appliedCode: null };
}
