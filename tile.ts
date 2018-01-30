class Tile {
    bounds: Rectangle;
    tile: HTMLImageElement;
    selected: boolean = false;

    constructor(bounds: Rectangle, tile: HTMLImageElement) {
        this.bounds = bounds;
        this.tile = tile;        
    }

    draw(ctx: CanvasRenderingContext2D): void {
        var iso = this.getIsometricPoint(this.bounds.x, this.bounds.y);
        if (!this.selected) {
            ctx.drawImage(this.tile, iso.x - this.bounds.width, iso.y, this.bounds.width * 2, this.bounds.height);
        }

        this.selected = false;

    }

    getColor(): string {
        return 'blue';
    }

    getIsometricPoint(x: number, y: number): Point {
        return new Point(x - y, (x + y) / 2);
    }
}