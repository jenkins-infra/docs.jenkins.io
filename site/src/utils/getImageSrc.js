export function getImageSrc(author, formats) {
    if (typeof window === "undefined") {
        return null;
    }

    for (const format of formats) {
        const imgPath = `../../static/images/images/avatars/${author}.${format}`;
        const img = new Image();
        img.src = imgPath;
        if (img.width > 0) {
            return imgPath;
        }
    }
}
