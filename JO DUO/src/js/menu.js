var player_menu;
var musique_ambiance; //A
var son_click; //A
var musique_de_fond; //A

export default class menu extends Phaser.Scene {
  constructor() {
    super({ key: "menu" });
  }

  preload() {
    this.load.image("menu_fond", "src/assets/MENU_JO.png");
    this.load.image("BUTTON_RUN_1", "src/assets/BUTTON_RUN_1.png");
    this.load.image("BUTTON_RUN_2", "src/assets/BUTTON_RUN_2.png");
    this.load.image("BUTTON_JUMP_1", "src/assets/BUTTON_JUMP_1.png");
    this.load.image("BUTTON_JUMP_2", "src/assets/BUTTON_JUMP_2.png");
    this.load.image("BUTTON_HURDLE_1", "src/assets/BUTTON_HURDLE_1.png");
    this.load.image("BUTTON_HURDLE_2", "src/assets/BUTTON_HURDLE_2.png");
    this.load.image("BUTTON_BACK_1", "src/assets/BUTTON_BACK_1.png");
    this.load.image("BUTTON_BACK_2", "src/assets/BUTTON_BACK_2.png");
    this.load.image("FLECHE", "src/assets/left-arrow.png");
    this.load.image("logo_epf", "src/assets/EPF_logo.png");
    this.load.image("Menu_Win", "src/assets/Menu_Win.png");
    this.load.audio('click', 'src/assets/CLICK.mp3');  //A
    this.load.audio('audioBG', 'src/assets/GAME_BG.mp3');  //A
    this.load.audio('loading', 'src/assets/LOADING.mp3');  //A
    this.load.audio('321', 'src/assets/321.mp3');  //A
    this.load.audio('jeuAmbiance', 'src/assets/jeuAmbiance.mp3');  //A
    this.load.audio('AH', 'src/assets/AH.mp3');  //A
    this.load.audio('siffle', 'src/assets/sifflet.mp3');  //A
    this.load.audio('2', 'src/assets/2.mp3');  //A

    this.load.spritesheet("img_player_menu", "src/assets/Athlete_NOIR.png", {
      frameWidth: 52,
      frameHeight: 43
    });

    this.load.image("LOADING_PAGE", "src/assets/LOADING_PAGE.png");

    this.load.image("img_sky", "src/assets/sky.png");
    this.load.image("img_sky2", "src/assets/sky2.png");
    this.load.image("Phaser_Font", "src/assets/Font.png");
    this.load.image("Phaser_tuilesdejeu", "src/assets/tuilesMap.png");
    this.load.image("img_panneau", "src/assets/panneau.png");
    this.load.image("img_chaine", "src/assets/chaine.png");

    this.load.tilemapTiledJSON("carte", "src/assets/map.tmj");
    this.load.tilemapTiledJSON("carte2", "src/assets/map2.tmj");
    this.load.tilemapTiledJSON("carte3", "src/assets/map3.tmj");

    this.load.spritesheet("img_perso1_1", "src/assets/Athlete1.png", {
      frameWidth: 52,
      frameHeight: 43
    });

    this.load.spritesheet("img_perso1_2", "src/assets/AthletePOS1.png", {
      frameWidth: 52,
      frameHeight: 43
    });

    this.load.spritesheet("img_perso2_1", "src/assets/Athlete2.png", {
      frameWidth: 52,
      frameHeight: 43
    });

    this.load.spritesheet("img_perso2_2", "src/assets/AthletePOS2.png", {
      frameWidth: 52,
      frameHeight: 43
    });

    this.load.spritesheet("img_perso1_jump", "src/assets/Athlete1_jump.png", {
      frameWidth: 46,
      frameHeight: 46
    });

    this.load.spritesheet("img_perso2_jump", "src/assets/Athlete2_jump.png", {
      frameWidth: 46,
      frameHeight: 46
    });


    this.load.spritesheet("img_perso1_hurdle", "src/assets/Athlete1_hurdle.png", {
      frameWidth: 46,
      frameHeight: 46
    });

    this.load.spritesheet("img_perso2_hurdle", "src/assets/Athlete2_hurdle.png", {
      frameWidth: 46,
      frameHeight: 46
    });

    this.load.spritesheet("img_perso1_win", "src/assets/Athlete1_win.png", {
      frameWidth: 27,
      frameHeight: 37
    });

    this.load.spritesheet("img_perso2_win", "src/assets/Athlete2_win.png", {
      frameWidth: 27,
      frameHeight: 37
    });

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

    //////////////////////////////////////////

    this.anims.create({
      key: "anim_player_menu",
      frames: this.anims.generateFrameNumbers("img_player_menu", { start: 1, end: 12 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "anim_tourne_droite1_1",
      frames: this.anims.generateFrameNumbers("img_perso1_1", { start: 1, end: 12 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "anim_tourne_droite1_2",
      frames: this.anims.generateFrameNumbers("img_perso1_1", { start: 1, end: 12 }),
      frameRate: 13,
      repeat: -1
    });

    this.anims.create({
      key: "anim_tourne_droite1_3",
      frames: this.anims.generateFrameNumbers("img_perso1_1", { start: 1, end: 12 }),
      frameRate: 17,
      repeat: -1
    });

    this.anims.create({
      key: "anim_sol1",
      frames: [{ key: "img_perso1_2", frame: 0 }],
      frameRate: 20
    });

    this.anims.create({
      key: "anim_tourne_droite2_1",
      frames: this.anims.generateFrameNumbers("img_perso2_1", { start: 1, end: 12 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "anim_tourne_droite2_2",
      frames: this.anims.generateFrameNumbers("img_perso2_1", { start: 1, end: 12 }),
      frameRate: 13,
      repeat: -1
    });

    this.anims.create({
      key: "anim_tourne_droite2_3",
      frames: this.anims.generateFrameNumbers("img_perso2_1", { start: 1, end: 12 }),
      frameRate: 17,
      repeat: -1
    });

    this.anims.create({
      key: "anim_sol2",
      frames: [{ key: "img_perso2_2", frame: 0 }],
      frameRate: 20
    });

    this.anims.create({
      key: "anim_saut1",
      frames: this.anims.generateFrameNumbers("img_perso1_jump", { start: 1, end: 3 }),
      frameRate: 2.25,
      repeat: -1
    });

    this.anims.create({
      key: "anim_saut2",
      frames: this.anims.generateFrameNumbers("img_perso2_jump", { start: 1, end: 3 }),
      frameRate: 2.25,
      repeat: -1
    });

    this.anims.create({
      key: "anim_player1_win",
      frames: this.anims.generateFrameNumbers("img_perso1_win", { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: "anim_player2_win",
      frames: this.anims.generateFrameNumbers("img_perso2_win", { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1
    });











    player_menu.anims.play("anim_player_menu", true);



  }

}

