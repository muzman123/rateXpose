export function formatTimeAgo(uploadedAt: string): string {
    const uploadedDate = new Date(uploadedAt); // Parse timestamptz date
    const currentDate = new Date();
  
    // Check if the uploaded date is today in the current timezone
    const isToday =
      uploadedDate.toLocaleDateString() === currentDate.toLocaleDateString();
  
    if (isToday) {
      // Return only the time if it's today
      return uploadedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  
    // Calculate the difference in days
    const timeDiff = currentDate.getTime() - uploadedDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
    return `${daysDiff} day${daysDiff > 1 ? 's' : ''} ago`;
  }
  