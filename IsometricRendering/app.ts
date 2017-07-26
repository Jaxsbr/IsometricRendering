class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Tile {
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(x: number, y: number, width: number, height: number) {        
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx: CanvasRenderingContext2D): void { 
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
    }

    getColor(): string {
        return 'blue';
    }

    getIsometricPoint(x: number, y: number): Point {
        return new Point(x - y, (x + y) / 2);
    }
}

class IsometricMap {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    grid: Tile[][];
    tileSize: number = 75;
    castleLoaded: boolean = false;
    castle: HTMLImageElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }

    public init(): void {
        this.castle = new Image(75, 75);
        this.castle.onload = (() => this.imageLoaded());  
        this.castle.src = 'castle.png';

        this.initGrid();        
        this.loop();
    }

    imageLoaded() {
        this.castleLoaded = true;
    }    

    loop() {
        //this.update();
        this.draw();

        requestAnimationFrame(() => this.loop());
    }

    initGrid(): void {
        this.grid = [];
        for (var row = 0; row < 4; row++) {
            this.grid[row] = [];
            for (var col = 0; col < 4; col++) {
                this.grid[row][col] = new Tile(col * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
            }
        }
    }

    draw(): void {
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
            this.ctx.drawImage(
                this.castle, isoPoint.x - (75 / 2), isoPoint.y - (75 / 2), tile.width, tile.height);
        }
    }
}

window.onload = () => {
    var canvas = document.getElementById('myCanvas');
    var isometricMap = new IsometricMap(canvas as HTMLCanvasElement);
    isometricMap.init();
};