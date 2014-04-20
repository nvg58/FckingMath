var StartLayer = cc.LayerColor.extend({
  screenSize: null,
  centerPos: null,
  ctor: function () {
    this._super();
    this.setKeyboardEnabled(true);
    this.keyboardArrows = {
      space : false
    }
  },
  init: function () {
    this._super();
    this.setColor(cc.c3b(44, 62, 80));
    screenSize = cc.Director.getInstance().getWinSize();
    centerPos = cc.p(screenSize.width / 2, screenSize.height / 2);

    var logo = cc.LabelTTF.create("FCKING MATH", f_lato, 70);
    logo.setColor(cc.WHITE);
    logo.setPosition(cc.p(screenSize.width/2,  screenSize.height - 200));
    this.addChild(logo);

    var startBtn = cc.MenuItemSprite.create(
      cc.Sprite.create(s_start_n),
      cc.Sprite.create(s_start_s),
      this.onPlay, this);
    var plus = cc.MenuItemSprite.create(
      cc.Sprite.create(s_plus_n),
      cc.Sprite.create(s_plus_s),
      this.onPLus, this);
    var multi = cc.MenuItemSprite.create(
      cc.Sprite.create(s_multi_n),
      cc.Sprite.create(s_multi_s),
      this.onMulti, this);

    var offsetY = startBtn.getContentSize().height + 20;
    var offsetX = startBtn.getContentSize().width / 2 + 40;
    startBtn.setPosition(centerPos);
    plus.setPosition(cc.p(screenSize.width / 2 - offsetX, screenSize.height / 2 - offsetY));
    multi.setPosition(cc.p(screenSize.width / 2 + offsetX, screenSize.height / 2 - offsetY));
    var menu = cc.Menu.create(startBtn, plus, multi);
    menu.setPosition(cc.p(0, 0));
    this.addChild(menu);
  },
  onPlay: function () {
    mode = Math.floor(Math.random());
    cc.log(mode);
    cc.Director.getInstance().replaceScene(cc.TransitionMoveInT.create(0.2, new PlayScene()));
  },
  onPLus: function () {
    mode = PLUS;
    cc.Director.getInstance().replaceScene(cc.TransitionMoveInT.create(0.2, new PlayScene()));
  },
  onMulti: function () {
    mode = MULTI;
    cc.Director.getInstance().replaceScene(cc.TransitionMoveInT.create(0.2, new PlayScene()));
  },
  onKeyDown:function(key){
    if (key == cc.KEY.space){
      this.keyboardArrows.space = true;
      this.onPlay();
    }
  },
  onKeyUp:function(key){
    if (key == cc.KEY.space){
      this.keyboardArrows.space = false;
    }
  }
});

var StartScene = cc.Scene.extend({
  onEnter: function () {
    this._super();
    var layer = new StartLayer();
    layer.init();
    this.addChild(layer);
  }
});