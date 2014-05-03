var GameOverLayer = cc.LayerColor.extend({
  playscene:null,
  ctor:function () {
    this._super();
    this.setKeyboardEnabled(true);
    this.keyboardArrows = {
      space : false
    }
  },
  init:function () {
//    this._super(cc.c4b(0, 0, 0, 180));
    this._super(cc.c3b(0, 0, 0));
    var offset = 18.0;
    var menuItemRestart = cc.MenuItemSprite.create(
      cc.Sprite.create(s_restart_n),
      cc.Sprite.create(s_restart_s),
      this.onRestart, this);
    var menuItemToStartScene = cc.MenuItemSprite.create(
      cc.Sprite.create(s_to_start_n),
      cc.Sprite.create(s_to_start_s),
      this.onGoingToStartScene, this);

    var gameoverDlg = cc.Sprite.create(s_gameover);
    gameoverDlg.setPosition(cc.p(screenSize.width / 2, screenSize.height / 1.5));
   gameoverDlg.setScale(1.5);

//    var defaults = sys.localStorage.getInstance();
    var bestScore = sys.localStorage.getItem("BestScore");
    bestScore = score > bestScore ? score : bestScore;
    sys.localStorage.setItem("BestScore", bestScore);

    var bestScoreLbn = cc.LabelTTF.create("0", f_lato, 20);
    bestScoreLbn.setColor(cc.WHITE);
    bestScoreLbn.setString(bestScore);
    bestScoreLbn.setPosition(cc.p(gameoverDlg.getContentSize().width / 2 + 17, gameoverDlg.getContentSize().height / 5));

    var newScoreLbn = cc.LabelTTF.create("0", f_lato, 20);
    newScoreLbn.setColor(cc.WHITE);
    newScoreLbn.setString(score);
    newScoreLbn.setPosition(cc.p(gameoverDlg.getContentSize().width / 2 + 10, gameoverDlg.getContentSize().height / 2.5));

    gameoverDlg.addChild(bestScoreLbn);
    gameoverDlg.addChild(newScoreLbn);
    this.addChild(gameoverDlg);

    var menu = cc.Menu.create(menuItemRestart, menuItemToStartScene);
    var offsetY = gameoverDlg.getContentSize().height / 2;
    var offsetX = gameoverDlg.getContentSize().width / 3;
    menuItemRestart.setPosition(cc.p(screenSize.width / 2 - offsetX, screenSize.height / 2 - offsetY));
    menuItemToStartScene.setPosition(cc.p(screenSize.width / 2 + offsetX, screenSize.height / 2 - offsetY));
    menu.setPosition(cc.p(0, 0));
    menu.setScale(1.5);
    this.addChild(menu);
  },
  onRestart:function(sender){
    this.removeAllChildren();
//    playscene = new PlayScene();
//    playscene.setVisible(false);
//
//    this.addChild(playscene, 1, TAG_PLAY_SCENE);
//
//    var startscene = new StartScene();
//    startscene.setPosition(cc.p(0, - screenSize.height));
//
//    this.addChild(startscene);
//    var seq = cc.Sequence.create(
//      cc.MoveTo.create(0.3, cc.p(0, 0)),
//      cc.DelayTime.create(0.25),
//      cc.CallFunc.create(this.loadPlayScene, this),
//      cc.MoveTo.create(0.2, cc.p(0, - screenSize.height)),
//      cc.CallFunc.create(this.removeStartScene, this)
//    );
//    startscene.runAction(seq);
    cc.Director.getInstance().replaceScene(cc.TransitionMoveInT.create(0.2, new PlayScene()));
    cc.AudioEngine.getInstance().playEffect(e_reload);
  },
  onGoingToStartScene:function(sender){
    this.removeAllChildren();
    cc.Director.getInstance().replaceScene(cc.TransitionMoveInB.create(0.2, new StartScene()));
  },
  loadPlayScene:function(sender){
    playscene.setVisible(true);
  },
  removeStartScene:function(sender){
//    sender.removeFromParent();

  },
  onKeyDown:function(key){
    if (key == cc.KEY.space){
      this.keyboardArrows.space = true;
      this.onRestart();
    }
  },
  onKeyUp:function(key){
    if (key == cc.KEY.space){
      this.keyboardArrows.space = false;
    }
  }
});

var GameOvrScene = cc.Scene.extend({
  onEnter: function () {
    this._super();
    var layer = new GameOverLayer();
    layer.init();
    this.addChild(layer);
  }
});