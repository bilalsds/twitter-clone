export default (dateString : any) => {
    const now = new Date();
    const createdAt = new Date(dateString);
    const secondsPast = (now.getTime() - createdAt.getTime()) / 1000;

    if (secondsPast < 60) {
        return `${Math.floor(secondsPast)} sec ago`;
    }

    if (secondsPast < 3600) {
        return `${Math.floor(secondsPast / 60)} min ago`;
    }

    if (secondsPast <= 86400) {
        return `${Math.floor(secondsPast / 3600)} hr ago`;
    }

    if (secondsPast > 86400) {
        const daysPast = Math.floor(secondsPast / 86400);
        return `${daysPast} day${daysPast > 1 ? 's' : ''} ago`;
    }
}

