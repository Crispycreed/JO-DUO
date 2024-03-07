import menu_win from "/src/js/MENU_WIN.js";

var player;
var player2;
var player_menu;
var clavier;
var SCORE1 = 0;
var SCORE2 = 0;
var chrono = 0
let spacePressed = true;
let spaceEnabled = true;
let gameover = false;
const SPACE_KEY = " ";
const ENTER_KEY = "Enter";
const KEY_PRESS_DURATION = 1000;
const SPEED_MULTIPLIER = 15;
var alreadypress = false;
var speed = 1;
var musique_de_chargement; //A
var musique_depart; //A
var musique_ambiance; //A
var volumedepart = 0.3;
var monTimer;



export default class selection extends Phaser.Scene {

    constructor() {
        super({ key: "HURDLE" });
    }


    create() {


        SCORE1 = 0;
        SCORE2 = 0;
        chrono = 0
        spacePressed = true;
        spaceEnabled = true;
        gameover = false;
        speed = 1;
        alreadypress = false;
        spaceEnabled = false;
        volumedepart = 0.3;

        musique_depart = this.sound.add('321'); //A 
        musique_de_chargement = this.sound.add('loading'); //A
        musique_ambiance = this.sound.add('jeuAmbiance')//A

        this.fin = this.sound.add('AH');//A
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


        this.background = this.add.image(470, 135, "img_sky2");

        const carteDuNiveau = this.add.tilemap("carte2");

        const tileset = carteDuNiveau.addTilesetImage("tuiles_de_jeu", "Phaser_tuilesdejeu");
        const fontTileset = carteDuNiveau.addTilesetImage("Font", "Phaser_Font");

        const Plan_intermediaire = carteDuNiveau.createLayer("Plan_intermediaire", tileset, 0);
        const Plan_milieu = carteDuNiveau.createLayer("Plan_milieu", tileset, 0);
        const Plan_devant = carteDuNiveau.createLayer("Plan_devant", tileset, 0);
        const Plan_font = carteDuNiveau.createLayer("Plan_font", [fontTileset, tileset], 0);
        const Plan_devant2 = carteDuNiveau.createLayer("Plan_devant2", tileset, 0);
        const Plan_tomber = carteDuNiveau.createLayer("Plan_tomber", tileset, 0);
        const Plan_tomber2 = carteDuNiveau.createLayer("Plan_tomber2", tileset, 0);
        this.logoepf = this.add.image(200, 195, "logo_epf");

        player = this.physics.add.sprite(47, 212, "img_perso1_1");
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        player2 = this.physics.add.sprite((47), 260, "img_perso2_1");
        player2.setBounce(0.2);
        player2.setCollideWorldBounds(true);

        clavier = this.input.keyboard.createCursorKeys();

        Plan_devant.setCollisionByProperty({ estSolide: true });
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        Plan_devant2.setCollisionByProperty({ estSolide2: true });
        Plan_devant2.setVisible(false);
        this.physics.add.collider(player, Plan_devant);
        this.physics.add.collider(player2, Plan_devant2);

        Plan_tomber.setCollisionByProperty({ estTomber: true });
        Plan_tomber2.setCollisionByProperty({ estTomber2: true });
        this.physics.add.collider(player, Plan_tomber);
        this.physics.add.collider(player2, Plan_tomber2);
        Plan_tomber.setVisible(false);
        Plan_tomber2.setVisible(false);

        this.physics.world.setBounds(0, 0, 2000, 300);
        this.cameras.main.setBounds(0, 0, 2000, 300);
        this.cameras.main.startFollow(player);




        this.chaine_panneau = this.add.image(120, 20, "img_chaine");
        this.chaine_panneau.angle = 90;
        this.chaine_panneau2 = this.add.image(280, 20, "img_chaine");
        this.chaine_panneau2.angle = 90;

        this.panneau_score = this.add.image(200, 80, "img_panneau");

        setInterval(() => {
            chrono++;
        }, 1000);

        this.text1 = this.add.text(120, 95, SCORE1.toString() + ' Km.h', { fontSize: '16px', fill: '#0000FF', fontWeight: 'bold' });
        this.text1.setVisible(false);
        this.text2 = this.add.text(220, 95, SCORE2.toString() + ' Km.h', { fontSize: '16px', fill: '#FF0000', fontWeight: 'bold' });
        this.text2.setVisible(false);
        this.text3 = this.add.text(180, 55, chrono + " s", { fontSize: '22px', fill: '#fff', fontWeight: 'bold' });
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
        this.text5.setScrollFactor(0);
        this.text6.setScrollFactor(0);
        this.text3.setScrollFactor(0);
        this.text11.setScrollFactor(0);
        this.text12.setScrollFactor(0);
        this.arrow1.setScrollFactor(0);
        this.arrow2.setScrollFactor(0);


        monTimer = this.time.addEvent({
            delay: 1000, // ms
            callback: function () {
                if (alreadypress == true) {
                    speed += 0.5;
                }
            },
            args: [],
            callbackScope: this,
            repeat: -1
        });



    }




    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    update() {

        if (alreadypress == false) {

            if (clavier.space.isDown && spaceEnabled) {
                alreadypress = true;
                spaceEnabled = false;
                this.text4.setVisible(false);

                musique_depart.volume = volumedepart; //A
                musique_depart.stop(); //A
                musique_depart.play(); //A

                musique_ambiance.volume = 0.2; //A
                musique_ambiance.loop = true;
                musique_ambiance.stop(); //A
                musique_ambiance.play(); //A

                this.text7.setVisible(true);

                setTimeout(() => {
                    this.text7.setVisible(false);
                    this.text8.setVisible(true);
                    player.anims.play("anim_sol1");
                    player2.anims.play("anim_sol2");
                    setTimeout(() => {
                        this.text8.setVisible(false);
                        this.text9.setVisible(true);
                        player.setX(player.x + 1);
                        player2.setX(player2.x + 1);
                        setTimeout(() => {
                            this.text9.setVisible(false);
                            this.text10.setVisible(true);
                            setTimeout(() => {
                                spacePressed = false;
                                spaceEnabled = true;
                                this.text10.setVisible(false);
                                speed = 1;

                            }, 200);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }
        }

        let advancedPlayer = player.x > player2.x ? player : player2;
        this.cameras.main.startFollow(advancedPlayer);


        if (spacePressed == false & gameover == false) {

            this.text7.setVisible(false);
            this.text8.setVisible(false);
            this.text9.setVisible(false);
            this.text10.setVisible(false);
            this.text3.setVisible(true);
            this.text3.setText(chrono + " s");

            if (player.body.onFloor()) {
                player.setVelocityX(12 + 12 * speed);
                player.anims.play("anim_tourne_droite1_1", true);
            }

            if (player2.body.onFloor()) {
                player2.setVelocityX(12 + 12 * speed);
                player2.anims.play("anim_tourne_droite2_1", true);
            }



            if (clavier.left.isDown && player.body.onFloor()) {
                player.setVelocityY(-125);
                player.anims.play("anim_saut1", true);
            }

            if (clavier.right.isDown && player2.body.onFloor()) {
                player2.setVelocityY(-125);
                player2.anims.play("anim_saut2", true);
            }

            this.text1.setText(SCORE1.toString() + ' Km.h');
            this.text2.setText(SCORE2.toString() + ' Km.h');

        } else {
            chrono = 0;
        }




        if (player2.x - player.x > 210) {
            this.arrow1.setVisible(true);
            this.text11.setText(Math.floor((player2.x - player.x) / 15) - 13);
            this.text11.setVisible(true);

        } else {
            this.arrow1.setVisible(false);
            this.text11.setVisible(false);
        }

        if (player.x - player2.x > 210) {
            this.arrow2.setVisible(true);
            this.text12.setText(Math.floor((player.x - player2.x) / 15) - 13);
            this.text12.setVisible(true);

        } else {
            this.arrow2.setVisible(false);
            this.text12.setVisible(false);
        }

        if (player2.x > 1690) {
            player.setX(player.x - 1260);
            player2.setX(player2.x - 1260);
        }

        if (player.x > 1690) {
            player.setX(player.x - 1260);
            player2.setX(player2.x - 1260);
        }


        if (Math.abs(player.x - player2.x) > 210) {

            if (!musique_de_chargement.isPlaying) {
                musique_de_chargement.volume = 0.3; //A
                musique_de_chargement.play(); //A
            }


            if (player.x > player2.x) {
                this.game.config.winner = "PLAYER 1";
            } else {
                this.game.config.winner = "PLAYER 2";
            }
            this.game.config.point1 = chrono;
            monTimer.remove();
            gameover = true;
            alreadypress = false;
            musique_ambiance.stop(); //A
            this.scene.start("menu_win_hurdle");
            this.scene.stop("HURDLE");


        }


    }
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


