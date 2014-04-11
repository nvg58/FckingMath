var PlayLayer = cc.LayerColor.extend({
  colorArr: null,
  statement: null,
  scorelbn: null,
  first: 0,
  second: 0,
  res: 0,
  right: null,
  wrong: null,
  cooldown: null,
  gameoverLayerLoaded: false,
  ctor: function () {
    this._super();
    this.setKeyboardEnabled(true);
    this.keyboardArrows = {
      left : false,
      right : false,
      up : false,
      down : false
    }
  },
  init: function () {
    this._super();
    colorArr = [
      cc.c3b(22, 160, 133),
      cc.c3b(231, 76, 60),
      cc.c3b(241, 196, 15),
      cc.c3b(155, 89, 182),
      cc.c3b(41, 128, 185),
      cc.c3b(230, 126, 34),
      cc.c3b(243, 156, 18),
      cc.c3b(46, 204, 113),
      cc.c3b(52, 152, 219),
      cc.c3b(53, 152, 220),
      cc.c3b(39, 174, 96)
    ];
    statement = cc.LabelTTF.create("", f_lato, 70);
    statement.setColor(cc.WHITE);
    statement.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
    statement.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
    statement.setPosition(cc.p(screenSize.width / 2, screenSize.height / 1.5));
    this.addChild(statement);

    scorelbn = cc.LabelTTF.create("", f_lato, 60);
    scorelbn.setColor(cc.WHITE);
    scorelbn.setPosition(cc.p(screenSize.width - 40, screenSize.height - 40));
    this.addChild(scorelbn);

    right = cc.MenuItemSprite.create(
      cc.Sprite.create(s_right_n),
      cc.Sprite.create(s_right_s),
      this.onRightTouch, this
    );

    wrong = cc.MenuItemSprite.create(
      cc.Sprite.create(s_wrong_n),
      cc.Sprite.create(s_wrong_s),
      this.onWrongTouch, this
    );

    var offset = 200;
    right.setPosition(cc.p(screenSize.width / 2 - offset, offset));
    wrong.setPosition(cc.p(screenSize.width / 2 + offset, offset));
    var menu = cc.Menu.create(right, wrong);
    menu.setPosition(cc.p(0, 0));
    this.addChild(menu);

    cooldown = cc.ProgressTimer.create(cc.Sprite.create(s_loading));
    cooldown.setPosition(screenSize.width/2, screenSize.height-6);
    cooldown.setType(cc.PROGRESS_TIMER_TYPE_BAR);
    cooldown.setMidpoint(cc.p(0, 1));
//    cooldown.setBarChangeRate(cc.p(0, 0.5));
    this.addChild(cooldown, 2, TG_TIMER);

    score = 0;
    first = 0;
    second = 0;
    res = 0;

    this.setup();
  },
  loadGameOverLayer: function () {
    if (this.gameoverLayerLoaded)
      return;
//    cc.Director.getInstance().pause();
    cooldown.setPercentage(100);
    this.removeAllChildren();
    var gameover = new GameOvrScene();
    gameover.setPosition(cc.p(0, screenSize.height));
    gameover.runAction(cc.MoveTo.create(0.1, cc.p(0, 0)));
    var child;
    while ((child = this.getChildByTag(TAG_GAME_OVER)) != null)
      this.removeChild(child);
    this.addChild(gameover, 1, TAG_GAME_OVER);

//    cc.Director.getInstance().replaceScene(cc.TransitionMoveInT.create(0.15, new GameOverScene()));
    this.gameoverLayerLoaded = true;
    this.failSound();
  },
  setup: function () {
    var r = Math.floor((Math.random() * colorArr.length));
    this.setColor(colorArr[r]);


    var delta = [-5, -4, -3, -2, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5];
    first = Math.floor(Math.random() * delta.length + 1);
    second = Math.floor(Math.random() * delta.length + 1);
    res = first + second + delta[Math.floor(Math.random() * delta.length)];

    statement.setString(first + " + " + second + "\n = " + res);
    scorelbn.setString(score);

    cooldown.setPercentage(100);

    this.scheduleUpdate();
  },
  onRightTouch: function () {
    if (!this.gameoverLayerLoaded && first + second == res) {
      score++;
      this.setup();
      this.passedSound();
    } else {
      this.loadGameOverLayer();
    }
  },
  onWrongTouch: function () {
    if (!this.gameoverLayerLoaded && first + second != res) {
      score++;
      this.setup();
      this.passedSound();
    } else {
      this.loadGameOverLayer();
    }
  },
  update:function(dt){
    var now = cooldown.getPercentage();
//    cc.log(now);
    cooldown.setPercentage(now - 1.2);
    if (now <= 0){
      this.loadGameOverLayer();
      this.unscheduleUpdate();
    }
  },
  passedSound:function(){
    cc.AudioEngine.getInstance().playEffect(e_passed);
  },
  failSound:function(){
    cc.AudioEngine.getInstance().playEffect(e_fail);
  },
  onKeyUp:function(key){
    switch (key) {
      case 37:
        this.keyboardArrows.left = false;
        break;
      case 38:
        this.keyboardArrows.up = false;
        break;
      case 39:
        this.keyboardArrows.right = false;
        break;
      case 40:
        this.keyboardArrows.down = false;
        break;
    }
  },
  onKeyDown:function(key){
    switch (key) {
      case 37:
        this.keyboardArrows.left = true;
        this.onRightTouch();
        break;
      case 38:
        this.keyboardArrows.up = false;
        break;
      case 39:
        this.keyboardArrows.right = true;
        this.onWrongTouch();
        break;
      case 40:
        this.keyboardArrows.down = false;
        break;
    }
  }
});

var PlayScene = cc.Scene.extend({
  onEnter: function () {
    this._super();
    var layer = new PlayLayer();
    layer.init();
    this.addChild(layer);
  }
});