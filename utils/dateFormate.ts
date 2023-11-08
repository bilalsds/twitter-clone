export default (dateStr:string) => {
const dateObj = new Date(dateStr);

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const formattedDate = `${monthNames[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

return formattedDate
}