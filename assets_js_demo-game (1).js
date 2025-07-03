
var config = {
  type: Phaser.AUTO,
  width: 400,
  height: 300,
  backgroundColor: '#222',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 300 } }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var player;
var cursors;

function preload () {
  this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png');
  this.load.image('ground', 'https://labs.phaser.io/assets/sprites/platform.png');
  this.load.image('star', 'https://labs.phaser.io/assets/sprites/star.png');
  this.load.image('dude', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
}

function create () {
  this.add.image(200, 150, 'sky');
  let ground = this.physics.add.staticGroup();
  ground.create(200, 290, 'ground').setScale(2).refreshBody();

  player = this.physics.add.sprite(200, 200, 'dude');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.physics.add.collider(player, ground);
  cursors = this.input.keyboard.createCursorKeys();
}

function update () {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
  } else {
    player.setVelocityX(0);
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}

var game = new Phaser.Game(config);
