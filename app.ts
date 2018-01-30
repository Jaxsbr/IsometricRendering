class IsometricMap {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    grid: Tile[][];
    tileSize: Point = new Point(50, 50);
    imagesLoaded: number = 0;
    totalImages: number = 2;
    castle: HTMLImageElement;
    tile: HTMLImageElement;
    mousePoint: Point;
    mouseText: string[];
    mapOffset: Point = new Point(this.tileSize.x * 4, this.tileSize.x * 2);

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }

    public init(): void {
        this.castle = new Image(75, 75);
        this.castle.onload = (() => this.imageLoaded());
        this.castle.src = 'castle.png';

        this.tile = new Image(100, 50);
        this.tile.onload = (() => this.imageLoaded());
        this.tile.src = 'tile.png';

        this.mousePoint = new Point(0, 0);
        this.mouseText = [];

        this.initGrid();
        this.loop();
    }

    imageLoaded() {
        this.imagesLoaded++;
    }

    loop() {
        if (this.imagesLoaded == this.totalImages) {
            this.update();
            this.draw();
        }
        requestAnimationFrame(() => this.loop());
    }

    initGrid(): void {
        this.grid = [];
        for (var row = 0; row < 4; row++) {
            this.grid[row] = [];
            for (var col = 0; col < 4; col++) {
                var bounds = new Rectangle(
                    (col * this.tileSize.x) + this.mapOffset.x,
                    (row * this.tileSize.y) - this.mapOffset.y,
                    this.tileSize.x,
                    this.tileSize.y);
                this.grid[row][col] = new Tile(bounds, this.tile);
            }
        }
    }

    update(): void {
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
    }

    draw(): void {
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
            this.mouseText.pop()
            i--;
        }
    }

    drawMap(): void {
        for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++) {
                this.grid[row][col].draw(this.ctx);
            }
        }
    }

    drawCastle(): void {
        var tile = this.grid[1][1];
        var x = tile.bounds.x;
        var y = tile.bounds.y;
        var isoPoint = this.getIsometricPoint(x, y);
        this.ctx.drawImage(
            this.castle,
            isoPoint.x - (this.tileSize.x / 2),
            isoPoint.y - (this.tileSize.y / 2),
            tile.bounds.width,
            tile.bounds.height);
    }

    mouseMove(mousePosition: Point): void {
        this.mousePoint.x = mousePosition.x - this.canvas.offsetLeft;
        this.mousePoint.y = mousePosition.y - this.canvas.offsetTop;
    }

    getIsometricPoint(x: number, y: number): Point {
        return new Point(x - y, (x + y) / 2);
    }

    getCartesianPoint(x: number, y: number): Point {        
        return new Point((2 * y + x) / 2, (2 * y - x) / 2)
    }
}

window.onload = () => {
    var canvas = document.getElementById('myCanvas');
    var isometricMap = new IsometricMap(canvas as HTMLCanvasElement);
    isometricMap.init();
    window.addEventListener('mousemove', function (e) { isometricMap.mouseMove(new Point(e.clientX, e.clientY)); });
};