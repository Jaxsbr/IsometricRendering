var Tile = (function () {
    function Tile(bounds, tile) {
        this.selected = false;
        this.bounds = bounds;
        this.tile = tile;
    }
    Tile.prototype.draw = function (ctx) {
        var iso = this.getIsometricPoint(this.bounds.x, this.bounds.y);
        if (!this.selected) {
            ctx.drawImage(this.tile, iso.x - this.bounds.width, iso.y, this.bounds.width * 2, this.bounds.height);
        }
        //ctx.strokeStyle = 'red';
        //ctx.beginPath();        
        //ctx.strokeRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
        this.selected = false;
    };
    Tile.prototype.getColor = function () {
        return 'blue';
    };
    Tile.prototype.getIsometricPoint = function (x, y) {
        return new Point(x - y, (x + y) / 2);
    };
    return Tile;
}());
//# sourceMappingURL=tile.js.map