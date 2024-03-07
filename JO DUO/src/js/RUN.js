import menu_win from "/src/js/MENU_WIN.js";


var player;
var player2;
var player_menu;
var clavier;
var clicsParSeconde1 = 0;
var clicsParSeconde2 = 0;
let clicks = 0;
let keyPressEvents = [];
let keyPressEvents2 = [];
var SCORE1 = 0;
var SCORE2 = 0;
var chrono = 0
let spacePressed = true;
let spaceEnabled = true;
let gameover = false;
let spaceActivated = false;
const ENTER_KEY = "Enter";
const SPACE_KEY = " ";
const KEY_PRESS_DURATION = 1000;
var playerWIN = '';
var musique_de_chargement;
var musique_depart;
var musique_ambiance;
var musique_sifflet;



export default class selection extends Phaser.Scene {

    constructor() {
        super({ key: "RUN" });
        this.intervalID = null;
    }


    create() {

        playerWIN = '';
        clicsParSeconde1 = 0;
        clicsParSeconde2 = 0;
        clicks = 0;
        SCORE1 = 0;
        SCORE2 = 0;
        chrono = 0;
        spacePressed = true;
        spaceEnabled = true;
        gameover = false;
        spaceEnabled = false;
        spaceActivated = false;

        musique_depart = this.sound.add('321');
        musique_de_chargement = this.sound.add('loading'); 
        musique_sifflet = this.sound.add('siffle'); 
        musique_ambiance = this.sound.add('jeuAmbiance')

        this.fin = this.sound.add('AH');
        musique_sifflet.volume = 0.8;
        this.fin.volume = 0.6;
        this.fin.stop();

        musique_de_chargement.volume = 0.3;
        musique_de_chargement.stop();
        musique_de_chargement.play();

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

        const carteDuNiveau = this.add.tilemap("carte");

        const tileset = carteDuNiveau.addTilesetImage("tuiles_de_jeu", "Phaser_tuilesdejeu");
        const fontTileset = carteDuNiveau.addTilesetImage("Font", "Phaser_Font");

        const Plan_intermediaire = carteDuNiveau.createLayer("Plan_intermediaire", tileset, 0);
        const Plan_milieu = carteDuNiveau.createLayer("Plan_milieu", tileset, 0);
        const Plan_devant = carteDuNiveau.createLayer("Plan_devant", tileset, 0);
        const Plan_font = carteDuNiveau.createLayer("Plan_font", [fontTileset, tileset], 0);

        this.logoepf = this.add.image(200, 195, "logo_epf");

        player = this.physics.add.sprite(47, 212, "img_perso1_1");
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        player2 = this.physics.add.sprite((47), 260, "img_perso2_1");
        player2.setBounce(0.2);
        player2.setCollideWorldBounds(true);

        clavier = this.input.keyboard.createCursorKeys();

        Plan_devant.setCollisionByProperty({ estSolide: true });

        this.physics.add.collider(player, Plan_devant);
        this.physics.add.collider(player2, Plan_devant);
        this.physics.world.setBounds(0, 0, 2000, 300);
        this.cameras.main.setBounds(0, 0, 2000, 300);
        this.cameras.main.startFollow(player);

        this.input.keyboard.on('keydown', function (event) {
            if (!spaceActivated && event.key === " " && spaceEnabled) { 
                spaceActivated = true;
                console.log("La touche espace a été pressée pour la première fois.");
                this.text4.setVisible(false);

                musique_depart.volume = 0.3;
                musique_depart.stop();
                musique_depart.play();

                musique_ambiance.volume = 0.2;
                musique_ambiance.loop = true;
                musique_ambiance.stop();
                musique_ambiance.play();

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
                            }, 200);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }
        }.bind(this));

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

        if (gameover == false) {
            this.intervalID = setInterval(() => {
                chrono++;
            }, 1000);
        }

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
        this.text3.setScrollFactor(0);
        this.text11.setScrollFactor(0);
        this.text12.setScrollFactor(0);
        this.arrow1.setScrollFactor(0);
        this.arrow2.setScrollFactor(0);
    }




    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    update() {

        let advancedPlayer = player.x > player2.x ? player : player2;
        this.cameras.main.startFollow(advancedPlayer);

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
            this.text3.setText(chrono + " s");

            clicsParSeconde1 = getKeyPressCountG(SPACE_KEY)
            clicsParSeconde2 = getKeyPressCountG(ENTER_KEY);

            if (clicsParSeconde1 == 0) {
                player.setVelocityX(12 * 2);
                player.anims.play("anim_tourne_droite1_1", true);
                SCORE1 = 12;

            } else if (clicsParSeconde1 > 20) {
                player.setVelocityX(12 * 20);
                player.anims.play("anim_tourne_droite1_3", true);
                SCORE1 = 37;

            } else {
                player.setVelocityX(10 * clicsParSeconde1);
                player.anims.play("anim_tourne_droite1_2", true);
                SCORE1 = clicsParSeconde1 + 17;
            }

            if (clicsParSeconde2 == 0) {
                player2.setVelocityX(12 * 2);
                player2.anims.play("anim_tourne_droite2_1", true);
                SCORE2 = 12;
            } else if (clicsParSeconde2 > 20) {
                player2.setVelocityX(12 * 20);
                player2.anims.play("anim_tourne_droite2_3", true);
                SCORE2 = 37;
            } else {
                player2.setVelocityX(12 * clicsParSeconde2);
                player2.anims.play("anim_tourne_droite2_2", true);
                SCORE2 = clicsParSeconde2 + 17;
            }


            this.text1.setText(SCORE1.toString() + ' Km.h');
            this.text2.setText(SCORE2.toString() + ' Km.h');

        } else {
            if (gameover == false) {
                chrono = 0;
            }
        }

        if (player.x >= 1950 || player2.x >= 1950) {
            
            gameover = true;
            clearInterval(this.intervalID);

            musique_ambiance.stop();

            if (!musique_de_chargement.isPlaying) {
                musique_de_chargement.volume = 0.3;
                musique_de_chargement.play();
            }

            if (player.x >= 1950) {
                player2.anims.play("anim_sol2");
                player.setVelocityX(0);
                player2.setVelocityX(0);
                player.setX(player.x + 8);
                playerWIN = "PLAYER 1";
                this.game.config.chronoWIN = chrono;
                this.game.config.winner = playerWIN;
            } else {
                player.anims.play("anim_sol1");
                player.setVelocityX(0);
                player2.setVelocityX(0);
                player2.setX(player2.x + 8);
                playerWIN = "PLAYER 2";
                this.game.config.chronoWIN = chrono;
                this.game.config.winner = playerWIN;
            }

            const wait = (delay) => {
                return new Promise((resolve) => {
                    setTimeout(resolve, delay);
                });
            };

            wait(300)
                .then(() => {
                    player2.anims.play("anim_sol2");
                    player.anims.play("anim_sol1");
                    return wait(3000);
                })
                .then(() => {
                    this.scene.start("menu_win");
                    this.scene.stop("RUN");
                });
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

    }
}





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function getKeyPressCountG(key) {
    const currentTime = new Date().getTime();
    const startTime = currentTime - KEY_PRESS_DURATION;
    let count = 0;

    for (let i = 0; i < keyPressEvents.length; i++) {
        const event = keyPressEvents[i];
        if (event.key === key && event.time >= startTime && event.time <= currentTime) {
            count++;
        }
    }

    return count;
}

