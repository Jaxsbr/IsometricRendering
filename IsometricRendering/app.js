var IsometricMap = (function () {
    function IsometricMap(canvas) {
        this.tileSize = new Point(50, 50);
        this.imagesLoaded = 0;
        this.totalImages = 2;
        this.mapOffset = new Point(this.tileSize.x * 4, this.tileSize.x * 2);
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }
    IsometricMap.prototype.init = function () {
        var _this = this;
        this.castle = new Image(75, 75);
        this.castle.onload = (function () { return _this.imageLoaded(); });
        this.castle.src = 'castle.png';
        this.tile = new Image(100, 50);
        this.tile.onload = (function () { return _this.imageLoaded(); });
        this.tile.src = 'tile.png';
        this.mousePoint = new Point(0, 0);
        this.mouseText = [];
        this.initGrid();
        this.loop();
    };
    IsometricMap.prototype.imageLoaded = function () {
        this.imagesLoaded++;
    };
    IsometricMap.prototype.loop = function () {
        var _this = this;
        if (this.imagesLoaded == this.totalImages) {
            this.update();
            this.draw();
        }
        requestAnimationFrame(function () { return _this.loop(); });
    };
    IsometricMap.prototype.initGrid = function () {
        this.grid = [];
        for (var row = 0; row < 4; row++) {
            this.grid[row] = [];
            for (var col = 0; col < 4; col++) {
                var bounds = new Rectangle((col * this.tileSize.x) + this.mapOffset.x, (row * this.tileSize.y) - this.mapOffset.y, this.tileSize.x, this.tileSize.y);
                this.grid[row][col] = new Tile(bounds, this.tile);
            }
        }
    };
    IsometricMap.prototype.update = function () {
        var screen = new Point(this.mousePoint.x, this.mousePoint.y);
        var cart = this.getCartesianPoint(screen.x, screen.y);
        cart.x -= this.mapOffset.x;
        cart.y += this.mapOffset.y;
        var col = Math.floor(cart.x / this.tileSize.x);
        var row = Math.floor(cart.y / this.tileSize.y);
        if ((col < 0 || col > 3) || (row < 0 || row > 3)) {
            // mouse out of grid bounds
            return;
        }
        this.grid[row][col].selected = true;
    };
    IsometricMap.prototype.draw = function () {
        this.ctx.clearRect(0, 0, 600, 300);
        this.drawMap();
        this.drawCastle();
        this.ctx.fillStyle = 'orange';
        var textY = 10;
        for (var i = 0; i < this.mouseText.length; i++) {
            this.ctx.fillText(this.mouseText[i], 200, textY);
            textY += 15;
        }
        for (var i = 0; i < this.mouseText.length; i++) {
            this.mouseText.pop();
            i--;
        }
    };
    IsometricMap.prototype.drawMap = function () {
        for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++) {
                this.grid[row][col].draw(this.ctx);
            }
        }
    };
    IsometricMap.prototype.drawCastle = function () {
        var tile = this.grid[1][1];
        var x = tile.bounds.x;
        var y = tile.bounds.y;
        var isoPoint = this.getIsometricPoint(x, y);
        this.ctx.drawImage(this.castle, isoPoint.x - (this.tileSize.x / 2), isoPoint.y - (this.tileSize.y / 2), tile.bounds.width, tile.bounds.height);
    };
    IsometricMap.prototype.mouseMove = function (mousePosition) {
        this.mousePoint.x = mousePosition.x - this.canvas.offsetLeft;
        this.mousePoint.y = mousePosition.y - this.canvas.offsetTop;
    };
    IsometricMap.prototype.getIsometricPoint = function (x, y) {
        return new Point(x - y, (x + y) / 2);
    };
    IsometricMap.prototype.getCartesianPoint = function (x, y) {
        return new Point((2 * y + x) / 2, (2 * y - x) / 2);
    };
    return IsometricMap;
}());
window.onload = function () {
    var canvas = document.getElementById('myCanvas');
    var isometricMap = new IsometricMap(canvas);
    isometricMap.init();
    window.addEventListener('mousemove', function (e) { isometricMap.mouseMove(new Point(e.clientX, e.clientY)); });
};
//# sourceMappingURL=app.js.map