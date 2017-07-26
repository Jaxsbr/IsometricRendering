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

    draw(ctx: CanvasRenderingContext2D) {    
        //var p1 = this.GetIsoPoint(tileArea.X + 300, tileArea.Y - 300);
        //var p2 = this.GetIsoPoint(tileArea.X + 300 + tileArea.Width, tileArea.Y - 300);
        //var p3 = this.GetIsoPoint(tileArea.X + 300 + tileArea.Width, tileArea.Y + tileArea.Height - 300);
        //var p4 = this.GetIsoPoint(tileArea.X + 300, tileArea.Y + tileArea.Height - 300);

        var p1 = this.getIsometricPoint(this.x + this.width, this.y - this.height);
        var p2 = this.getIsometricPoint(this.x + this.width, this.y - this.height);
        var p3 = this.getIsometricPoint(this.x + this.width, this.y - this.height);
        var p4 = this.getIsometricPoint(this.x + this.width, this.y - this.height);


        ctx.beginPath();
        ctx.lineTo(p4.x, p4.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();
        ctx.fillStyle = this.getColor();
        ctx.fill();
    }

    getColor() {
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
    tileSize: number = 120;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }

    public init() {
        this.initGrid();
        this.draw();
    }

    initGrid() {
        this.grid = [];
        for (var row = 0; row < 4; row++) {
            this.grid[row] = [];
            for (var col = 0; col < 4; col++) {
                this.grid[row][col] = new Tile(col, row, this.tileSize, this.tileSize);
            }
        }
    }

    draw() {
        for (var row = 0; row < 4; row++) {
            this.grid[row] = [];
            for (var col = 0; col < 4; col++) {
                this.grid[row][col].draw(this.ctx);
            }
        }
    }
}

window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};