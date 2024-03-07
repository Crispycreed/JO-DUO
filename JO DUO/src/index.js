import menu from "/src/js/menu.js";
import menu2 from "/src/js/menu2.js";
import menu_win from "/src/js/MENU_WIN.js";
import menu_win_jump from "/src/js/MENU_WIN_JUMP.js";
import menu_win_hurdle from "/src/js/MENU_WIN_HURDLE.js";
import RUN from "/src/js/RUN.js";
import JUMP1 from "/src/js/JUMP1.js";
import JUMP2 from "/src/js/JUMP2.js";
import HURDLE from "/src/js/HURDLE.js";


var config = {

  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT, // ajustement automatique à la taille de l'écran
    autoCenter: Phaser.Scale.CENTER_BOTH // centrer le jeu sur l'écran
  },


  width: 400,
  height: 300,


  physics: {

    default: "arcade",
    arcade: {

      gravity: {
        y: 200 // gravité verticale : acceleration ddes corps en pixels par seconde
      },
      debug: false // permet de voir les hitbox et les vecteurs d'acceleration quand mis à true
    }
  },
  scene: [menu, menu2, menu_win, menu_win_jump, menu_win_hurdle, RUN, JUMP1, JUMP2, HURDLE],

  render: {
    pixelArt: true,
    antialias: true
  }
};



var game = new Phaser.Game(config);
game.scene.start("menu");




game.config.winner = "";
game.config.chronoWIN = "0";

game.config.tour = 1;
game.config.point1 = 0;
game.config.point2 = 0;