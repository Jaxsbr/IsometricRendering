var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var Tile = (function () {
    function Tile(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Tile.prototype.draw = function (ctx) {
        var offsetX = 150;
        var offsetY = 150;
        var topPadding = 35;
        var x = this.x + offsetX;
        var y = this.y - offsetY;
        var p1 = this.getIsometricPoint(x, y);
        var p2 = this.getIsometricPoint(x + this.width, y);
        var p3 = this.getIsometricPoint(x + this.width, y + this.height);
        var p4 = this.getIsometricPoint(x, y + this.height);
        ctx.fillStyle = this.getColor();
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.lineTo(p4.x, p4.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    };
    Tile.prototype.getColor = function () {
        return 'blue';
    };
    Tile.prototype.getIsometricPoint = function (x, y) {
        return new Point(x - y, (x + y) / 2);
    };
    return Tile;
}());
var IsometricMap = (function () {
    function IsometricMap(canvas) {
        this.tileSize = 75;
        this.castleLoaded = false;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }
    IsometricMap.prototype.init = function () {
        var _this = this;
        this.castle = new Image(75, 75);
        this.castle.onload = (function () { return _this.imageLoaded(); });
        this.castle.src = 'castle.png';
        this.initGrid();
        this.loop();
    };
    IsometricMap.prototype.imageLoaded = function () {
        this.castleLoaded = true;
    };
    IsometricMap.prototype.loop = function () {
        var _this = this;
        //this.update();
        this.draw();
        requestAnimationFrame(function () { return _this.loop(); });
    };
    IsometricMap.prototype.initGrid = function () {
        this.grid = [];
        for (var row = 0; row < 4; row++) {
            this.grid[row] = [];
            for (var col = 0; col < 4; col++) {
                this.grid[row][col] = new Tile(col * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
            }
        }
    };
    IsometricMap.prototype.draw = function () {
        for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++) {
                this.grid[row][col].draw(this.ctx);
            }
        }
        if (this.castleLoaded) {
            var tile = this.grid[1][1];
            var x = tile.x + 150;
            var y = tile.y - 150;
            var isoPoint = tile.getIsometricPoint(x, y);
            this.ctx.drawImage(this.castle, isoPoint.x - (75 / 2), isoPoint.y - (75 / 2), tile.width, tile.height);
        }
    };
    return IsometricMap;
}());
window.onload = function () {
    var canvas = document.getElementById('myCanvas');
    var isometricMap = new IsometricMap(canvas);
    isometricMap.init();
};
//# sourceMappingURL=app.js.map