export function formatDate(date: Date): String {
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
}