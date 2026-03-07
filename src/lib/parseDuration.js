const arabicToWestern = {
    '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
    '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
};
function normalizeDigits(str) {
    return str.replace(/[٠-٩]/g, (d) => arabicToWestern[d] || d);
}
export function parseDurationToSeconds(duration) {
    const normalized = normalizeDigits(duration).toLowerCase();
    if (normalized.includes('دقيقتان') || normalized.includes('دقيقتين')) {
        return 2 * 60;
    }
    if (normalized.includes('ثانيتان') || normalized.includes('ثانيتين')) {
        return 2;
    }
    const num = parseInt(normalized.replace(/[^0-9]/g, ''));
    if (normalized.includes('min') || normalized.includes('دقيق') || normalized.includes('دقائق')) {
        return !isNaN(num) ? num * 60 : 60;
    }
    if (normalized.includes('sec') || normalized.includes('ثاني') || normalized.includes('ثوان')) {
        return !isNaN(num) ? num : 30;
    }
    return !isNaN(num) ? num * 60 : 30;
}
