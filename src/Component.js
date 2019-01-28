class Component {
  constructor(x, y, width, height, color, game, speedX) {
    // pozíció
    this.x = x;
    this.y = y;

    // méretek
    this.width = width;
    this.height = height;

    // kitöltőszín
    this.color = color;

    // játék
    this.game = game;
    this.context = game.GetContext();

    // sebesség
    this.speedX = typeof speedX == "undefined" ? 0 : speedX;
    this.speedY = 0;

    // gravitáció
    this.gravity = 0;
    this.gravitySpeed = 0;

    // max pozíció
    this.yMax = game.GetHeight() - this.height;
  }

  Move() {
    // gravitáció
    this.gravitySpeed = this.gravitySpeed + this.gravity;

    // pozíció
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY + this.gravitySpeed;

    // korlátok közé zárás
    let yMax = game.GetHeight() - this.height;
    this.y = Math.min(yMax, this.y);
    if (this.y == yMax) {
      this.gravitySpeed = 0;
    }

    this.y = Math.max(0, this.y);
    if (this.color == "red" && this.y == 0) {
      this.gravitySpeed = 0.05;
    }

    // kirajzolás
    this.Draw();
  }

  Draw() {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

  CrashWith(otherComponent) {
    // aktuális objektum
    let currentTop = this.y,
      currentRight = this.x + this.width,
      currentBottom = this.y + this.height,
      currentLeft = this.x;

    // másik objektum
    let otherTop = otherComponent.y,
      otherRight = otherComponent.x + otherComponent.width,
      otherBottom = otherComponent.y + otherComponent.height,
      otherLeft = otherComponent.x;

    // ütközés megállapítása
    if (
      otherRight < currentLeft ||
      currentRight < otherLeft ||
      otherTop > currentBottom ||
      currentTop > otherBottom
    ) {
      return false;
    }
    return true;
  }
}
