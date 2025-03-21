import {georgianMonths} from "./config.ts";

// Helper function to format the date in Georgian format
export const formatGeorgianDate = (date: string): string => {
    const formattedDueDate = new Date(date);
    const day = formattedDueDate.getDate();
    const month = formattedDueDate.getMonth();
    const year = formattedDueDate.getFullYear();
    return `${day} ${georgianMonths[month]}, ${year}`;
};

// Helper function to truncate long descriptions
export const truncateDescription = (description: string, maxLength: number = 1000): string => {
    return description.length > maxLength ? description.slice(0, maxLength) + '...' : description;
};


export const getColorFromMap = (map: Record<string, string>, id: string, defaultColor: string = '#000'): string => {
    return map[id] || defaultColor;
};



export const formatDueDateToGeorgian = (dueDate: string): string => {
    const georgianWeekdays = ['კვი', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'];
    const date = new Date(dueDate);
    const dayOfWeek = date.getDay();
    const weekdayGe = georgianWeekdays[dayOfWeek];
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1);
    const year = date.getFullYear();
    return `${weekdayGe} - ${day}/${month}/${year}`;
};
