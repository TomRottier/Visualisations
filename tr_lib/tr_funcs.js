tr_map = function (x, x0, x1, y0, y1) {
    return y0 + ((y1 - y0) / (x1 - x0)) * (x - x0);
}
