const sortPhotosInColumns = (photos) => {
    let i_ = [];
    let j_ = [];
    let k_ = [];
    for (let i = 0; i < Math.ceil(photos.length / 3); i++) {
        i_.push(photos[i + 2 * i]);

        if (photos[i + 1 + 2 * i]) {
            j_.push(photos[i + 1 + 2 * i]);
        }
        if (photos[i + 2 + 2 * i]) {
            k_.push(photos[i + 2 + 2 * i]);
        }
    }
    return [i_, j_, k_]
}
export default sortPhotosInColumns