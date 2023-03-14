const contextualTime = (date) => {
  const now = new Date();
  const diff = now - date;
  // 2000 milliseconds = 2 second
  if (diff <= 2000) {
    return "a few seconds ago";
  }
  // 60000 milliseconds = 1 minute
  if (diff < 60000) {
    return `${Math.floor(diff / 1000)} seconds ago`;
  }
  // 3600000 milliseconds = 1 hour
  if (diff < 3600000) {
    if (Math.floor(diff / 60000) === 1) {
      return "a minute ago";
    }
    return `${Math.floor(diff / 60000)} minutes ago`;
  }
  // 86400000 milliseconds = 1 day
  if (diff < 86400000) {
    if (Math.floor(diff / 3600000) === 1) {
      return "an hour ago";
    }
    return `${Math.floor(diff / 3600000)} hours ago`;
  }
  // 604800000 milliseconds = 1 week
  if (diff < 604800000) {
    if (Math.floor(diff / 86400000) === 1) {
      return "yesterday";
    }
    return `${Math.floor(diff / 86400000)} days ago`;
  }
  // 2419200000 milliseconds = 1 month
  if (diff < 2419200000) {
    if (Math.floor(diff / 604800000) === 1) {
      return "a week ago";
    }
    return `${Math.floor(diff / 604800000)} weeks ago`;
  }
  // 29030400000 milliseconds = 1 year
  if (diff < 29030400000) {
    if (Math.floor(diff / 2419200000) === 1) {
      return "a month ago";
    }
    return `${Math.floor(diff / 2419200000)} months ago`;
  }
  // 29030400000 milliseconds = 1 year
  if (Math.floor(diff / 29030400000) === 1) {
    return "a year ago";
  }
  return `${Math.floor(diff / 29030400000)} years ago`;
};

export default contextualTime;
