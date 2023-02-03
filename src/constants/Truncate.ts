export const truncate = (string: string, n: number) => {
    return string?.length > n ? string.substring(0, n - 1) + "..." : string;
};