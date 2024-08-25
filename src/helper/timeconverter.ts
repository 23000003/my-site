
export function formatTimestamp(timestamp: string): string {
    
    const date = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric',
        hour12: true,
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);

    return formatter.format(date);
}


export const getCurrentDate = (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

export const formatDateForComparison = (timestamp: string): string => {
    return timestamp.split('T')[0];
};

export const compareTimeDate = (current: string): string => {
    const now = new Date();
    const myCurrentDate = new Date(current);

    const diffMs = myCurrentDate.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); 

    if (diffHours > 0) {

        return `in ${diffHours} ${diffHours === 1 ? 'hour' : 'hours'}`;

    } else if (diffHours < 0) {

        return `${Math.abs(diffHours)} ${Math.abs(diffHours) === 1 ? 'hour' : 'hours'} ago`;
    
    } else {

        return 'now';

    }
};