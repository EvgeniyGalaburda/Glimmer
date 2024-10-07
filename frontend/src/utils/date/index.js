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
    const createdAtDate = new Date(createdAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
    const createdAtTime = new Date(createdAt).toLocaleTimeString('en-US', {timeStyle:'short'});


    return `${createdAtDate} ${createdAtTime}`;
}