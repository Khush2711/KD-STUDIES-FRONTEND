const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", options)

    const hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour >= 12 ? "PM" : "AM";
    const formattedTime = `${hour % 12}:${minutetoString().padStart(2, "0")}  ${period}`

    return `${formattedDate} || ${formattedTime}`;
}