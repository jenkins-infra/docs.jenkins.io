export function getImageSrc(author, formats) {
    for (const format of formats) {
        const imgPath = `../../images/images/avatars/${author}.${format}`;
        const img = new Image();
        img.src = imgPath;
        if (img.width > 0) {
            return imgPath;
        }
    }
}
