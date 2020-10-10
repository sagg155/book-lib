export const uuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        let r = 16 * Math.random() | 0,
            v = "x" === c ? r : 3 & (r | 8);
        return v.toString(16)
    });
};