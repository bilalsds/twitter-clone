
export default (dateStr:string) => {
    let timestamp = dateStr;
    let date = new Date(timestamp);
    
    let timeString = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    console.log(timeString); // This will log time like "12:38 AM" or "12:38 PM"

    return timeString
    }