export function formatDate(inputString) {
    const parts = inputString.split("/");
    const datePart = parts[parts.length - 2];
    const dateComponents = datePart.split("-");
    const year = parseInt(dateComponents[0]);
    const month = parseInt(dateComponents[1]);
    const day = parseInt(dateComponents[2]);
    const formattedDate = new Date(year, month - 1, day);
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return `${
        monthNames[formattedDate.getMonth()]
    } ${formattedDate.getDate()}, ${formattedDate.getFullYear()}`;
}
