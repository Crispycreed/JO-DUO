import menu_win from "/src/js/MENU_WIN.js";


var player;
var player_menu;
var clavier;
let keyPressEvents = [];
let keyPressEvents2 = [];
var SCORE1 = 0;
var SCORE2 = 0;
var chrono = 0
let spacePressed = true;
let spaceEnabled = true;
let gameover = false;
const SPACE_KEY = " ";
const ENTER_KEY = "Enter";
const KEY_PRESS_DURATION = 1000;
var points = 0;
var points2 = 0;
var tour2 = 0;
var musique_de_chargement; //A
var musique_depart; //A
var musique_ambiance; //A
var volumedepart = 0.3;
var musique_sifflet; //A

export default class selection extends Phaser.Scene {

    constructor() {
        super({ key: "JUMP2" });
    }

    create() {

        SCORE1 = 0;
        SCORE2 = 0;
        chrono = 0
        points = 0;
        points2 = 0;
        tour2 = 0;
        volumedepart = 0.3;
        spacePressed = true;
        spaceEnabled = true;
        gameover = false;
        spaceEnabled = false;

        musique_depart = this.sound.add('321'); //A 
        musique_sifflet = this.sound.add('siffle');
        musique_de_chargement = this.sound.add('loading'); //A
        musique_ambiance = this.sound.add('jeuAmbiance')//A

        this.fin = this.sound.add('AH');//A
        musique_sifflet.volume = 0.8;
        this.fin.volume = 0.6; //A
        this.fin.stop(); //A

        musique_de_chargement.volume = 0.3; //A
        musique_de_chargement.stop(); //A
        musique_de_chargement.play(); //A

        this.loadingPage = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "LOADING_PAGE");
        this.loadingPage.setDepth(9998);

        player_menu = this.physics.add.sprite(100, 165, "img_player_menu");
        player_menu.setDepth(9999);
        player_menu.setCollideWorldBounds(true);
        player_menu.body.setAllowGravity(false);
        player_menu.anims.play("anim_player_menu", true);

        setTimeout(() => {
            this.loadingPage.setVisible(false);
            player_menu.destroy();
            spaceEnabled = true;
        }, 5000);

        this.tweens.add({
            targets: player_menu,
            x: player_menu.x + 220,
            duration: 2000,
            ease: 'Linear',
            repeat: 10,
            yoyo: false
        });

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        this.background = this.add.image(470, 135, "img_sky");

        const carteDuNiveau = this.add.tilemap("carte3");

        const tileset = carteDuNiveau.addTilesetImage("tuiles_de_jeu", "Phaser_tuilesdejeu");
        const fontTileset = carteDuNiveau.addTilesetImage("Font", "Phaser_Font");

        const Plan_intermediaire = carteDuNiveau.createLayer("Plan_intermediaire", tileset, 0);
        const Plan_milieu = carteDuNiveau.createLayer("Plan_milieu", tileset, 0);
        const Plan_devant = carteDuNiveau.createLayer("Plan_devant", tileset, 0);
        const Plan_font = carteDuNiveau.createLayer("Plan_font", [fontTileset, tileset], 0);

        this.logoepf = this.add.image(200, 195, "logo_epf");

        player = this.physics.add.sprite(47, 212, "img_perso2_1");

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        clavier = this.input.keyboard.createCursorKeys();

        Plan_devant.setCollisionByProperty({ estSolide: true });

        this.physics.add.collider(player, Plan_devant);
        this.physics.world.setBounds(0, 0, 2000, 300);
        this.cameras.main.setBounds(0, 0, 2000, 300);
        this.cameras.main.startFollow(player);

        this.input.keyboard.on('keydown', function (event) {
            keyPressEvents.push({ key: event.key, time: new Date().getTime() });
        });

        this.input.keyboard.on('keydown', function (event) {
            keyPressEvents2.push({ key: event.key, time: new Date().getTime() });
        });

        this.chaine_panneau = this.add.image(120, 20, "img_chaine");
        this.chaine_panneau.angle = 90;
        this.chaine_panneau2 = this.add.image(280, 20, "img_chaine");
        this.chaine_panneau2.angle = 90;

        this.panneau_score = this.add.image(200, 80, "img_panneau");

        setInterval(() => {
            chrono++;
        }, 1000);

        this.text1 = this.add.text(124, 95, Math.round(this.game.config.point1) + ' pts', { fontSize: '16px', fill: '#0000FF', fontWeight: 'bold' });
        this.text1.setVisible(false);
        this.text2 = this.add.text(220, 95, Math.round(this.game.config.point2) + ' pts', { fontSize: '16px', fill: '#FF0000', fontWeight: 'bold' });
        this.text2.setVisible(false);

        if (this.game.config.tour == 2) {
            this.text3 = this.add.text(180, 55, "1/3", { fontSize: '22px', fill: '#fff', fontWeight: 'bold' });
        } else if (this.game.config.tour == 4) {
            this.text3 = this.add.text(180, 55, "2/3", { fontSize: '22px', fill: '#fff', fontWeight: 'bold' });
        } else if (this.game.config.tour == 6) {
            this.text3 = this.add.text(180, 55, "3/3", { fontSize: '22px', fill: '#fff', fontWeight: 'bold' });
        }

        this.text3.setVisible(false);
        this.text4 = this.add.text(132, 55, "Press space", { fontSize: '22px', fill: '#fff', fontWeight: 'bold' });
        this.text4.setVisible(true);
        this.text5 = this.add.text(115, 95, 'PLAYER 1', { fontSize: '16px', fill: '#0000FF', fontWeight: 'bold' });
        this.text5.setVisible(true);
        this.text6 = this.add.text(210, 95, 'PLAYER 2', { fontSize: '16px', fill: '#FF0000', fontWeight: 'bold' });
        this.text6.setVisible(true);

        this.text7 = this.add.text(195, 55, '3', { fontSize: '22px', fill: '#fff', fontWeight: 'bold' });
        this.text7.setVisible(false);
        this.text8 = this.add.text(195, 55, '2', { fontSize: '22px', fill: '#fff', fontWeight: 'bold' });
        this.text8.setVisible(false);
        this.text9 = this.add.text(195, 55, '1', { fontSize: '22px', fill: '#fff', fontWeight: 'bold' });
        this.text9.setVisible(false);
        this.text10 = this.add.text(190, 55, 'GO!', { fontSize: '22px', fill: '#fff', fontWeight: 'bold' });
        this.text10.setVisible(false);
        this.text11 = this.add.text(20, 203, '', { fontSize: '12px', fill: '#FF0000', fontWeight: 'bold' });
        this.text11.setVisible(false);
        this.text12 = this.add.text(20, 250, '', { fontSize: '12px', fill: '#FF0000', fontWeight: 'bold' });
        this.text12.setVisible(false);
        this.text13 = this.add.text(125, 55, 'FOOT FAULT !', { fontSize: '22px', fill: '#ff0000', fontWeight: 'bold' });
        this.text13.setVisible(false);
        this.text14 = this.add.text(137, 55, "+ " + points + ' pts', { fontSize: '22px', fill: '#fff', fontWeight: 'bold' })
        this.text14.setVisible(false);

        this.arrow1 = this.add.image(8, 210, "FLECHE");
        this.arrow1.setVisible(false);
        this.arrow2 = this.add.image(8, 258, "FLECHE");
        this.arrow2.setVisible(false);

        this.background.setScrollFactor(0.2);
        Plan_intermediaire.setScrollFactor(0.4);
        Plan_milieu.setScrollFactor(0.6);
        Plan_font.setScrollFactor(1);

        this.panneau_score.setScrollFactor(0);
        this.chaine_panneau.setScrollFactor(0);
        this.chaine_panneau2.setScrollFactor(0);
        this.text1.setScrollFactor(0);
        this.text2.setScrollFactor(0);
        this.text3.setScrollFactor(0);
        this.text11.setScrollFactor(0);
        this.text12.setScrollFactor(0);
        this.text13.setScrollFactor(0);
        this.text14.setScrollFactor(0);
        this.arrow1.setScrollFactor(0);
        this.arrow2.setScrollFactor(0);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    update() {

        this.cameras.main.startFollow(player);

        this.input.keyboard.on('keydown', function (event) {
            if (event.key === " " && spacePressed == true && spaceEnabled) { 
                spaceEnabled = false; 

                this.text4.setVisible(false);

                musique_depart.volume = volumedepart; //A
                musique_depart.stop(); //A
                musique_depart.play(); //A

                musique_ambiance.volume = 0.2;
                musique_ambiance.loop = true;
                musique_ambiance.stop();
                musique_ambiance.play();

                this.text7.setVisible(true);
                setTimeout(() => {
                    this.text7.setVisible(false);
                    this.text8.setVisible(true);
                    player.anims.play("anim_sol2");
                    setTimeout(() => {
                        this.text8.setVisible(false);
                        this.text9.setVisible(true);
                        player.setX(player.x + 1);
                        setTimeout(() => {
                            this.text9.setVisible(false);
                            this.text10.setVisible(true);
                            setTimeout(() => {
                                spacePressed = false;
                                spaceEnabled = true; 
                                this.text10.setVisible(false);
                                volumedepart = 0;
                            }, 200);
                        }, 1000);
                    }, 1000);
                }, 1000); 
            }
        }.bind(this));

        if (spacePressed == false & gameover == false) {

            this.text5.setVisible(false);
            this.text6.setVisible(false);
            this.text7.setVisible(false);
            this.text8.setVisible(false);
            this.text9.setVisible(false);
            this.text10.setVisible(false);
            this.text1.setVisible(true);
            this.text2.setVisible(true);
            this.text3.setVisible(true);

            if (player.body.onFloor()) {
                player.setVelocityX(125);
                player.anims.play("anim_tourne_droite2_2", true);
            }

            if (clavier.space.isDown && player.body.onFloor()) {
                player.setVelocityY(-125);
                player.anims.play("anim_saut2", true);
            }

        } else {
            if (gameover == false) {
                chrono = 0;
            }
        }
        if (player.x >= 800) {

            if(player.x > 810) {
                if (!musique_de_chargement.isPlaying) {
                    musique_de_chargement.volume = 0.3; //A
                    musique_de_chargement.play(); //A
                }
            }

            gameover = true;

            points = (player.x - 800)*2;
            this.text14.setText('+ ' + Math.round(points) + ' pts');
            this.text3.setVisible(false);
            this.text14.setVisible(true);

        }

        if (player.x >= 800 && player.body.onFloor()) {

            player.setVelocityX(0);
            player.anims.play("anim_sol2");

            if (player.x - 800 < 10) {

                musique_sifflet.play();
                
                this.text14.setVisible(false);
                points = 0;
                this.text3.setVisible(false);
                this.text13.setVisible(true);
            } else {
                points = (player.x - 800)*2;
                this.text14.setText('+ ' + Math.round(points) + ' pts');
                this.text3.setVisible(false);
                this.text14.setVisible(true);
            }

            points2 = this.game.config.point2;
            this.game.config.point2 = points2 + points;

            this.text1.setText(Math.round(this.game.config.point1) + ' pts');
            this.text2.setText(Math.round(this.game.config.point2) + ' pts');

            tour2 = this.game.config.tour;
            this.game.config.tour = tour2 + 1;
            
            if (this.game.config.tour < 6) {
                musique_ambiance.stop(); //A
                this.scene.start("JUMP1");
                this.scene.stop("JUMP2");
            
            } else {
                musique_ambiance.stop(); //A
                this.game.config.tour = 1;
                this.scene.start("menu_win_jump");
                this.scene.stop("JUMP2");
            }
        }
    }
}



