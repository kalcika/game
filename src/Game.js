class Game {
  constructor() {
    // játéktér
    this.canvas = document.getElementById("game");
    this.canvas.width = 500;
    this.canvas.height = 250;

    // madár
    this.bird = new Component(10, 0, 20, 20, "red", this);
    this.SetBirdGravity(0.05);

    // akadályok
    this.obstacleCollection = [];
    this.minUpperHeight = 20;
    this.maxUpperHeight = 200;
    this.minGap = 40;
    this.maxGap = 80;
    this.obstacleWidth = 30;

    // időzítő
    this.tickCounter = 0;
    this.interval = setInterval(() => {
      this.Update();
    }, 20);

    // feliratkozás
    window.addEventListener("keydown", event => {
      if (event.code == "Space") {
        this.SetBirdGravity(-0.2);
      }
    });

    window.addEventListener("keyup", event => {
      this.SetBirdGravity(0.05);
    });
  }

  Update() {
    // game over vizsgálat
    if(this.IsGameOver()){
        clearInterval(this.interval);
        alert('Game Over');
        return;
    }
    
    //   takarítás
    this.Clear();

    // akadályok
    if (this.tickCounter % 150 == 0) {
      // felső akadály magassága
      let upperHeight =
        this.minUpperHeight +
        Math.round(Math.random() * (this.maxUpperHeight - this.minUpperHeight));

      // térköz
      let gap =
        this.minGap + Math.round(Math.random() * (this.maxGap - this.minGap));

      // alsó akadály magassága
      let lowerHeight = this.GetHeight() - upperHeight - gap;

      // elemek felvétele
      this.obstacleCollection.push(
        new Component(
          this.GetWidth(),
          0,
          this.obstacleWidth,
          upperHeight,
          "green",
          this,
          -1
        )
      );

      this.obstacleCollection.push(
        new Component(
          this.GetWidth(),
          upperHeight + gap,
          this.obstacleWidth,
          lowerHeight,
          "green",
          this,
          -1
        )
      );
    }

    // akadályok mozgatása
    this.obstacleCollection.forEach(obstacle => {
      obstacle.Move();
    });

    // madár mozgatás
    this.bird.Move();

    // időzítés
    this.tickCounter++;
  }

  IsGameOver() {
    for (let index = 0; index < this.obstacleCollection.length; index++) {
      if (this.bird.CrashWith(this.obstacleCollection[index])) {
        return true;
      }
    }

    return false;
  }

  Clear() {
    this.GetContext().clearRect(0, 0, this.GetWidth(), this.GetHeight());
  }

  GetWidth() {
    return this.canvas.width;
  }

  GetHeight() {
    return this.canvas.height;
  }

  GetContext() {
    return this.canvas.getContext("2d");
  }

  SetBirdGravity(newGravity) {
    this.bird.gravity = newGravity;
  }
}
