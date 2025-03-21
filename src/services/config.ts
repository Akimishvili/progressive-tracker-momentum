export const baseURL =  'https://momentum.redberryinternship.ge/api';
export const apiToken = '9e702f22-302d-418f-b912-eddaeb7f6246'


export const taskStatuses = [
    { id: 1, name: "დასაწყები", color: "#F7BC30" },
    { id: 2, name: "პროგრესში", color: "#FB5607" },
    { id: 3, name: "მზად ტესტირებისთვის", color: "#FF006E" },
    { id: 4, name: "დასრულებული", color: "#3A86FF" },
];

// Status color mapping
export const statusColors: { [key: number]: string } = {
    1: '#F7BC30', // Starting
    2: '#FB5607', // In Progress
    3: '#FF006E', // Ready for Testing
    4: '#3A86FF', // Completed
};

// Priority color mapping
export const priorityColors: { [key: number]: string } = {
    1: '#08A508', // Low priority
    2: '#FFBE0B', // Medium priority
    3: '#FA4D4D', // High priority
};

// Department color mapping
export const departmentColors: { [key: number]: string } = {
    1: '#4CAF50', // Admin department
    2: '#FF9800', // HR department
    3: '#2196F3', // Finance department
    4: '#9C27B0', // Sales & Marketing department
    5: '#3F51B5', // Logistics department
    6: '#00BCD4', // Tech department
    7: '#FF5722', // Media department
};

// Department shortened name mapping
export const departmentShortNames: { [key: number]: string } = {
    1: "ადმ. დეპ.",
    2: "ადამ. რეს.",
    3: "ფინანსები",
    4: "მარკეტინგი",
    5: "ლოჯისტიკა",
    6: "ინფ. ტექ.",
    7: "მედია"
};


export const georgianMonths = [
    'იანვ', 'თებ', 'მარტ', 'აპრ', 'მაი', 'ივნ',
    'ივლ', 'აგვ', 'სექტ', 'ოქტ', 'ნოე', 'დეკ'
];