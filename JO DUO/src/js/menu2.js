var player_menu;
var musique_ambiance; //A
var son_click; //A
var musique_de_fond; //A

export default class menu extends Phaser.Scene {
  constructor() {
    super({ key: "menu2" });
  }

  create() {

    this.game.config.winner = "";
    this.game.config.chronoWIN = "0";
    
    this.game.config.tour = 1;
    this.game.config.point1 = 0;
    this.game.config.point2 = 0;


    son_click = this.sound.add('click'); //A
    musique_de_fond = this.sound.add('audioBG'); //A   
    musique_ambiance = this.sound.add('jeuAmbiance')//A
    musique_de_fond.volume = 0.6; // A
    musique_de_fond.stop(); //A
    musique_de_fond.play(); //A
    musique_ambiance.stop(); //A

    this.add.image(200, 150, "menu_fond").setOrigin().setDepth();

    var BUTTON_RUN_1 = this.add.image(352, 105, "BUTTON_RUN_1").setDepth(1);
    var BUTTON_RUN_2 = this.add.image(352, 105, "BUTTON_RUN_2").setDepth(1).setVisible(false);
    var BUTTON_JUMP_1 = this.add.image(352, 150, "BUTTON_JUMP_1").setDepth(1);
    var BUTTON_JUMP_2 = this.add.image(352, 150, "BUTTON_JUMP_2").setDepth(1).setVisible(false);
    var BUTTON_HURDLE_1 = this.add.image(352, 195, "BUTTON_HURDLE_1").setDepth(1);
    var BUTTON_HURDLE_2 = this.add.image(352, 195, "BUTTON_HURDLE_2").setDepth(1).setVisible(false);

    BUTTON_RUN_1.setInteractive();
    BUTTON_RUN_2.setInteractive();
    BUTTON_JUMP_1.setInteractive();
    BUTTON_JUMP_2.setInteractive();
    BUTTON_HURDLE_1.setInteractive();
    BUTTON_HURDLE_2.setInteractive();

    BUTTON_RUN_1.on("pointerover", () => {
      BUTTON_RUN_1.setVisible(false);
      BUTTON_RUN_2.setVisible(true);
    });

    BUTTON_RUN_2.on("pointerout", () => {
      BUTTON_RUN_1.setVisible(true);
      BUTTON_RUN_2.setVisible(false);
    });

    BUTTON_RUN_2.on("pointerup", () => {
      this.scene.start("RUN");
      son_click.volume = 0.6; // A
      son_click.play(); //A
      musique_de_fond.stop(); //A
      this.scene.stop("menu");
    });

    BUTTON_JUMP_1.on("pointerover", () => {
      BUTTON_JUMP_1.setVisible(false);
      BUTTON_JUMP_2.setVisible(true);
    });

    BUTTON_JUMP_2.on("pointerout", () => {
      BUTTON_JUMP_1.setVisible(true);
      BUTTON_JUMP_2.setVisible(false);
    });

    BUTTON_JUMP_2.on("pointerup", () => {
      this.scene.start("JUMP1");
      son_click.volume = 0.6; // A
      son_click.play(); //A
      musique_de_fond.stop(); //A
      this.scene.stop("menu");
    });

    BUTTON_HURDLE_1.on("pointerover", () => {
      BUTTON_HURDLE_1.setVisible(false);
      BUTTON_HURDLE_2.setVisible(true);
    });

    BUTTON_HURDLE_2.on("pointerout", () => {
      BUTTON_HURDLE_1.setVisible(true);
      BUTTON_HURDLE_2.setVisible(false);
    });

    BUTTON_HURDLE_2.on("pointerup", () => {
      this.scene.start("HURDLE");
      son_click.volume = 0.6; // A
      son_click.play(); //A
      musique_de_fond.stop(); //A
      this.scene.stop("menu");
    });

    player_menu = this.physics.add.sprite(350, 260, "img_player_menu");
    player_menu.setCollideWorldBounds(true);
    player_menu.body.setAllowGravity(false);
    player_menu.body.setImmovable(true);

    player_menu.anims.play("anim_player_menu", true);



  }

}

