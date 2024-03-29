var player_win;

export default class menu extends Phaser.Scene {
  constructor() {
    super({ key: "menu_win_hurdle" });
  }


  create() {

    player_win =

      this.add.image(200, 150, "Menu_Win").setOrigin().setDepth();

    var BUTTON_BACK_1 = this.add.image(260, 109, "BUTTON_BACK_1").setDepth(1);
    var BUTTON_BACK_2 = this.add.image(260, 109, "BUTTON_BACK_2").setDepth(1).setVisible(false);

    BUTTON_BACK_1.setInteractive();
    BUTTON_BACK_2.setInteractive();


    BUTTON_BACK_1.on("pointerover", () => {
      BUTTON_BACK_1.setVisible(false);
      BUTTON_BACK_2.setVisible(true);
    });

    BUTTON_BACK_2.on("pointerout", () => {
      BUTTON_BACK_1.setVisible(true);
      BUTTON_BACK_2.setVisible(false);
    });

    BUTTON_BACK_2.on("pointerup", () => {
      this.game.config.point1 = 0;
      this.scene.start("menu2");
      this.scene.stop("menu_win");
    });


    this.text2 = this.add.text(123, 100, this.game.config.point1 + ' s', { fontSize: '22px', fill: '#fff', fontWeight: 'bold' });
    this.text2.setVisible(true);

    if (this.game.config.winner == "PLAYER 1") {

      player_win = this.physics.add.sprite(200, 220, "img_perso1_win");
      player_win.anims.play("anim_player1_win", true);

      this.text1 = this.add.text(123, 53, this.game.config.winner + ' WIN', { fontSize: '22px', fill: '#0000ff', fontWeight: 'bold' });
      this.text1.setVisible(true);

    } else {

      player_win = this.physics.add.sprite(200, 220, "img_perso2_win");
      player_win.anims.play("anim_player2_win", true);

      this.text1 = this.add.text(123, 53, this.game.config.winner + ' WIN', { fontSize: '22px', fill: '#ff0000', fontWeight: 'bold' });
      this.text1.setVisible(true);
  
    }


    player_win.setCollideWorldBounds(true);
    player_win.body.setAllowGravity(false);
    player_win.body.setImmovable(true);



  }

}

