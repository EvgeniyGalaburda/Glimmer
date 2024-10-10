export const formatMemberSinceData = (createdAt) => {
    const date = new Date(createdAt);
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `Joined ${month} ${year}`
};

export const formatPostDate = (createdAt) => {
    const date = new Date(createdAt);
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = String(date.getFullYear()).slice(-2);
    const createdAtTime = new Date(createdAt).toLocaleTimeString('en-US', {timeStyle:'short'});


    return `${day}/${month}/${year} ${createdAtTime}`;
}